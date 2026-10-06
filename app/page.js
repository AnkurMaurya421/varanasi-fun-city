import Navbar from "@/components/Navbar/Navbar";
import Hero from "@/components/Hero/Hero";
import About from "@/components/About/About";
import Timings from "@/components/Timings/Timings";
import Pricing from "@/components/Pricing/Pricing";
import Rides from "@/components/Rides/Rides";
import Occasions from "@/components/Occasions/Occasions";
import Testimonials from "@/components/Testimonials/Testimonials";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <About />
        <Timings />
        <Pricing />
        <Rides />
        <Occasions />
        <Testimonials />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
