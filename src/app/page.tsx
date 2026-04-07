import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Services from "@/components/sections/Services";
import Works from "@/components/sections/Works";
import Blog from "@/components/sections/Blog";
import Stats from "@/components/sections/Stats";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import AIBuiltModal from "@/components/ui/AIBuiltModal";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <Works />
        <Blog />
        <Stats />
        <Contact />
      </main>
      <Footer />
      <AIBuiltModal />
    </>
  );
}
