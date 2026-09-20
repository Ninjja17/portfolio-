"use client";

import React, { useEffect, useRef, useState, useCallback } from "react";

interface AsciifyImageProps {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  radius?: number;
  scale?: number;
  spacing?: number;
  glow?: number;
  aberration?: number;
  contrast?: number;
  brightness?: number;
  baseStrength?: number;
  showBadge?: boolean;
  objectPosition?: [number, number];
}

const CHARSETS = {
  ascii: [
    0,         // ' '
    4194304,   // '.' (bottom dot)
    4096,      // '·' (center dot)
    131200,    // ':' (colon)
    14336,     // '-' (dash)
    145536,    // '+' (plus)
    459200,    // '=' (equal)
    469440,    // '*' (asterisk)
    4357252,   // '#' (hash)
    18157905,  // '%' (percent)
    11512810,  // '@' (at)
    33554431,  // '█' (full block)
  ],
  blocks: [0, 328000, 22041621, 22369621, 11512810, 33554431],
  binary: [0, 4591758, 15324974],
};

const VERT_SHADER = `#version 300 es
precision highp float;
layout(location = 0) in vec2 aPos;
out vec2 vUv;
void main() {
  vUv = aPos * 0.5 + 0.5;
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG_SHADER = `#version 300 es
precision highp float;
in vec2 vUv;
out vec4 outColor;

uniform sampler2D uContent;
uniform vec2 uResolution;
uniform float uGlyphPx;
uniform float uSpacing;
uniform uint uGlyphs[16];
uniform int uGlyphCount;
uniform float uRadius;
uniform float uSoftness;
uniform vec2 uPointer;
uniform float uActive;
uniform vec3 uBg;
uniform float uBgOpacity;
uniform float uContrast;
uniform float uBrightness;
uniform float uInvert;
uniform float uStrength;
uniform float uBase;
uniform float uAberration;
uniform vec2 uUvScale;
uniform vec2 uUvOffset;
uniform float uTime;

#define S(a, b, t) smoothstep(a, b, t)

float glyphBit(int index, ivec2 p) {
  if (p.x < 0 || p.x > 4 || p.y < 0 || p.y > 4) return 0.0;
  uint bits = uGlyphs[index];
  return float((bits >> uint((4 - p.x) + 5 * p.y)) & 1u);
}

float hash21(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

vec4 sampleFringe(vec2 uv, vec2 off) {
  vec4 c = texture(uContent, uv);
  c.r = texture(uContent, uv + off).r;
  c.b = texture(uContent, uv - off).b;
  return c;
}

void main() {
  vec2 uv = vUv;
  float cellPx = (5.0 + 2.0 * uSpacing) * uGlyphPx;
  vec2 frag = uv * uResolution;
  vec2 cell = floor(frag / cellPx);
  vec2 cellUv = (cell + 0.5) * cellPx / uResolution;

  float aspect = uResolution.x / uResolution.y;
  float dist = length((cellUv - uPointer) * vec2(aspect, 1.0));
  float radius = max(uRadius * uActive, 1e-4);
  float inner = radius * (1.0 - clamp(uSoftness, 0.0, 1.0));
  float lens = (1.0 - S(inner, radius, dist)) * uActive;
  
  // Ambient pulse when idle so the ASCII canvas is visibly alive
  float ambientPulse = uBase * (0.85 + 0.15 * sin(uTime * 2.5 + cell.y * 0.15 + cell.x * 0.08));
  float mask = clamp(max(lens, ambientPulse), 0.0, 1.0) * clamp(uStrength, 0.0, 1.0);

  // Canvas UI stippled dither edge
  float apply = mask < 0.003 ? 0.0 : step(hash21(cell), mask);
  if (apply < 0.5) {
    outColor = vec4(0.0);
    return;
  }

  vec2 textureUv = vec2(cellUv.x * uUvScale.x + uUvOffset.x, (1.0 - cellUv.y) * uUvScale.y + uUvOffset.y);
  if (textureUv.x < 0.001 || textureUv.x > 0.999 || textureUv.y < 0.001 || textureUv.y > 0.999) {
    outColor = vec4(0.0);
    return;
  }

  vec2 lensDir = (cellUv - uPointer) * vec2(aspect, 1.0);
  float fringeAmp = max(uActive, S(0.0, 0.25, uBase));
  vec2 fringe = normalize(lensDir + 1e-5) * clamp(uAberration, 0.0, 1.0) * 0.007 * S(uRadius * 0.15, uRadius, dist) * fringeAmp;
  fringe = vec2(fringe.x / aspect, -fringe.y);

  vec4 pixel = sampleFringe(textureUv, fringe);
  float lum = dot(pixel.rgb, vec3(0.299, 0.587, 0.114));
  float amount = clamp((lum - 0.5) * uContrast + 0.5 + uBrightness, 0.0, 1.0);
  amount = mix(amount, 1.0 - amount, clamp(uInvert, 0.0, 1.0));

  int index = min(int(amount * float(uGlyphCount)), uGlyphCount - 1);
  ivec2 local = ivec2(floor((frag - cell * cellPx) / uGlyphPx));
  int pad = int(uSpacing);
  float on = glyphBit(index, ivec2(local.x - pad, local.y - pad));

  // High-contrast cybernetic phosphor palette
  vec3 phosphorEmerald = vec3(0.12, 0.98, 0.62); // Matrix emerald
  vec3 phosphorWhite   = vec3(0.95, 0.98, 1.00); // Bright HUD white
  vec3 photoColor      = clamp(pixel.rgb * 2.2, 0.0, 1.0);

  // Blend natural photo tones with glowing phosphor matrix
  vec3 charColor = mix(phosphorEmerald, photoColor, 0.5);
  charColor = mix(charColor, phosphorWhite, smoothstep(0.6, 0.95, lum));
  // Guarantee crisp readability even in the deepest black shadows
  charColor = max(charColor, phosphorEmerald * 0.45);

  // Dark terminal background within the lens reveals the glowing ASCII characters
  vec3 bgCol = vec3(0.04, 0.06, 0.05);

  vec3 col = mix(bgCol, charColor, on);
  // Background within lens is 82% opaque to give deep contrast, glyph dots are 100% opaque
  float cellAlpha = mix(0.82, 1.0, on);
  float alpha = mask * cellAlpha;

  outColor = vec4(col * alpha, alpha);
}
`;

export default function AsciifyImage({
  src,
  alt,
  className = "",
  imgClassName = "",
  radius = 0.44,
  scale = 1.6,
  spacing = 1.0,
  glow = 0.8,
  aberration = 0.6,
  contrast = 1.35,
  brightness = 0.06,
  baseStrength = 0.12,
  showBadge = false,
  objectPosition = [0.5, 0.5],
}: AsciifyImageProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const textureRef = useRef<WebGLTexture | null>(null);
  const uniformsRef = useRef<Record<string, WebGLUniformLocation | null>>({});
  const naturalSizeRef = useRef<{ w: number; h: number }>({ w: 0, h: 0 });

  const [isHovered, setIsHovered] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const startTimeRef = useRef<number>(Date.now());
  const targetPointerRef = useRef<{ x: number; y: number; active: number }>({
    x: 0.5,
    y: 0.5,
    active: 0.32,
  });
  const currentPointerRef = useRef<{ x: number; y: number; active: number }>({
    x: 0.5,
    y: 0.5,
    active: 0.32,
  });
  const animFrameRef = useRef<number | null>(null);

  // Load Image into Texture safely and reliably
  const loadTexture = useCallback((gl: WebGL2RenderingContext, imageSrc: string) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      if (!glRef.current) return;
      if (!textureRef.current) {
        textureRef.current = gl.createTexture();
      }
      gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
      naturalSizeRef.current = { w: img.naturalWidth, h: img.naturalHeight };
      setImageLoaded(true);
    };
    img.src = imageSrc;
    if (img.complete && img.naturalWidth > 0) {
      img.onload(new Event("load") as any);
    }
  }, []);

  // Setup WebGL Context & Shaders
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
    });
    if (!gl) {
      console.warn("WebGL2 not supported, skipping Asciify shader");
      return;
    }
    glRef.current = gl;

    // Vertex shader
    const vs = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vs, VERT_SHADER);
    gl.compileShader(vs);
    if (!gl.getShaderParameter(vs, gl.COMPILE_STATUS)) {
      console.error("VS error:", gl.getShaderInfoLog(vs));
      return;
    }

    // Fragment shader
    const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fs, FRAG_SHADER);
    gl.compileShader(fs);
    if (!gl.getShaderParameter(fs, gl.COMPILE_STATUS)) {
      console.error("FS error:", gl.getShaderInfoLog(fs));
      return;
    }

    // Program
    const program = gl.createProgram()!;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error("Program link error:", gl.getProgramInfoLog(program));
      return;
    }
    programRef.current = program;
    gl.useProgram(program);

    // Quad geometry
    const quadVBO = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, quadVBO);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW
    );
    gl.enableVertexAttribArray(0);
    gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

    // Cache Uniforms
    const uniformNames = [
      "uContent",
      "uResolution",
      "uGlyphPx",
      "uSpacing",
      "uGlyphs",
      "uGlyphCount",
      "uRadius",
      "uSoftness",
      "uPointer",
      "uActive",
      "uBg",
      "uBgOpacity",
      "uContrast",
      "uBrightness",
      "uInvert",
      "uStrength",
      "uBase",
      "uAberration",
      "uUvScale",
      "uUvOffset",
      "uTime",
    ];
    const uniforms: Record<string, WebGLUniformLocation | null> = {};
    for (const name of uniformNames) {
      uniforms[name] = gl.getUniformLocation(program, name);
    }
    uniformsRef.current = uniforms;

    // Pass static uniforms
    const glyphs = CHARSETS.ascii;
    const glyphsArray = new Uint32Array(16);
    for (let i = 0; i < glyphs.length; i++) {
      glyphsArray[i] = glyphs[i];
    }
    gl.uniform1uiv(uniforms.uGlyphs, glyphsArray);
    gl.uniform1i(uniforms.uGlyphCount, glyphs.length);
    gl.uniform1f(uniforms.uSpacing, spacing);
    gl.uniform1f(uniforms.uSoftness, 0.88);
    gl.uniform3f(uniforms.uBg, 0.02, 0.02, 0.02);
    gl.uniform1f(uniforms.uBgOpacity, 0.0);
    gl.uniform1f(uniforms.uInvert, 0.0);
    gl.uniform1f(uniforms.uStrength, 1.0);
    gl.uniform1i(uniforms.uContent, 0);

    // Initial texture load
    loadTexture(gl, src);

    return () => {
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
    };
  }, [spacing, src, loadTexture]);

  // Update texture when src changes
  useEffect(() => {
    if (glRef.current) {
      loadTexture(glRef.current, src);
    }
  }, [src, loadTexture]);

  // Render Loop with smooth lerp and ambient scan
  useEffect(() => {
    const gl = glRef.current;
    const program = programRef.current;
    const canvas = canvasRef.current;
    const uniforms = uniformsRef.current;
    if (!gl || !program || !canvas) return;

    let running = true;

    const render = () => {
      if (!running) return;

      const elapsed = (Date.now() - startTimeRef.current) * 0.001;

      // Ambient idle orbital motion when mouse is not over the card
      if (!isHovered) {
        const ambientX = 0.5 + 0.16 * Math.cos(elapsed * 0.75);
        const ambientY = 0.5 + 0.12 * Math.sin(elapsed * 0.95);
        targetPointerRef.current.x = ambientX;
        targetPointerRef.current.y = ambientY;
        targetPointerRef.current.active = 0.32;
      }

      const curr = currentPointerRef.current;
      const target = targetPointerRef.current;

      // Lerp pointer & active
      curr.x += (target.x - curr.x) * 0.18;
      curr.y += (target.y - curr.y) * 0.18;
      curr.active += (target.active - curr.active) * 0.14;

      // Handle Resize / Retina
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.round(canvas.clientWidth * dpr);
      const displayHeight = Math.round(canvas.clientHeight * dpr);

      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
        gl.viewport(0, 0, displayWidth, displayHeight);
      }

      gl.useProgram(program);

      // Set Dynamic Uniforms
      gl.uniform2f(uniforms.uResolution, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uGlyphPx, scale * dpr);
      gl.uniform1f(uniforms.uRadius, radius);
      gl.uniform2f(uniforms.uPointer, curr.x, curr.y);
      gl.uniform1f(uniforms.uActive, curr.active);
      gl.uniform1f(uniforms.uContrast, contrast);
      gl.uniform1f(uniforms.uBrightness, brightness);
      gl.uniform1f(uniforms.uAberration, aberration);
      gl.uniform1f(uniforms.uBase, baseStrength);
      gl.uniform1f(uniforms.uTime, elapsed);

      // Compute exact object-cover UV transformation
      const nat = naturalSizeRef.current;
      let uvScaleX = 1.0;
      let uvScaleY = 1.0;
      let uvOffsetX = 0.0;
      let uvOffsetY = 0.0;
      if (nat.w > 0 && nat.h > 0) {
        const cW = canvas.width;
        const cH = canvas.height;
        const coverScale = Math.max(cW / nat.w, cH / nat.h);
        const covW = nat.w * coverScale;
        const covH = nat.h * coverScale;
        const offX = (covW - cW) * objectPosition[0];
        const offY = (covH - cH) * objectPosition[1];
        uvScaleX = cW / covW;
        uvScaleY = cH / covH;
        uvOffsetX = offX / covW;
        uvOffsetY = offY / covH;
      }
      gl.uniform2f(uniforms.uUvScale, uvScaleX, uvScaleY);
      gl.uniform2f(uniforms.uUvOffset, uvOffsetX, uvOffsetY);

      if (textureRef.current) {
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, textureRef.current);
      }

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Draw ASCII matrix
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [radius, scale, contrast, brightness, aberration, baseStrength, isHovered, objectPosition]);

  // Pointer Handlers
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;

    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;

    targetPointerRef.current.x = Math.max(0, Math.min(1, x));
    targetPointerRef.current.y = Math.max(0, Math.min(1, 1.0 - y)); // WebGL UV flip
    targetPointerRef.current.active = 1.0;
    setIsHovered(true);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerMove(e);
  };

  const handlePointerLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      ref={containerRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      className={`relative w-full h-full select-none overflow-hidden ${className}`}
    >
      {/* Base Original Photo */}
      <img
        ref={imgRef}
        src={src}
        alt={alt}
        crossOrigin="anonymous"
        style={{
          objectPosition: `${objectPosition[0] * 100}% ${objectPosition[1] * 100}%`,
        }}
        className={`w-full h-full object-cover transition-opacity duration-300 ${
          isHovered ? "opacity-75" : "opacity-95"
        } ${imgClassName}`}
      />

      {/* WebGL Canvas Asciify Overlay */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 w-full h-full z-10"
      />
    </div>
  );
}

