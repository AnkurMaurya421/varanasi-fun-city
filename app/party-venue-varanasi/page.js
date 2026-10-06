import { getService } from "@/servicesConfig";
import { buildServiceMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage/ServicePage";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const service = getService("party-venue-varanasi");

export const metadata = buildServiceMetadata(service);

export default function Page() {
  return (
    <>
      <Navbar />
      <main>
        <ServicePage service={service} />
      </main>
      <Footer />
      <Chatbot />
    </>
  );
}
