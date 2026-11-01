import GallerySection from "@/components/sheard/GallerySection";
import Banner from "../components/sheard/Banner";
import WhyChooseUs from "../components/sheard/WhyChooseUs";
import SubscriptionSection from "@/components/sheard/SubscriptionSection";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <GallerySection />
      <SubscriptionSection />
    </div>
  );
}
