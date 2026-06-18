import Nav from "@/components/Nav";
import HeroSection from "@/components/HeroSection";
import AboutSection from "@/components/AboutSection";
import ServicesSection from "@/components/ServicesSection";
import WorksSection from "@/components/WorksSection";
import SkillsSection from "@/components/SkillsSection";
import GlobeSection from "@/components/GlobeSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <HeroSection />
        <AboutSection />
        <ServicesSection />
        <WorksSection />
        <SkillsSection />
        <GlobeSection />
        <ContactSection />
      </main>
      <Footer />
    </>
  );
}
