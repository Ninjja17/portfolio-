import FloatingNav from "@/components/FloatingNav";
import Hero from "@/components/Hero";
import TechMarquee from "@/components/TechMarquee";
import ScrollRevealAbout from "@/components/ScrollRevealAbout";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      <FloatingNav />
      <Hero />
      <TechMarquee />
      <ScrollRevealAbout />
      <Projects />
      <Certifications />
      <Footer />
    </main>
  );
}