import { getLiveService } from "@/lib/siteConfigStore";
import { buildServiceMetadata } from "@/lib/seo";
import ServicePage from "@/components/ServicePage/ServicePage";
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer/Footer";
import Chatbot from "@/components/Chatbot/Chatbot";

const SLUG = "event-venue-varanasi";

export async function generateMetadata() {
  return buildServiceMetadata(await getLiveService(SLUG));
}

export default async function Page() {
  const service = await getLiveService(SLUG);
  return PageBody(service);
}

function PageBody(service) {
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
