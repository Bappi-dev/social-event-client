import GallerySection from "@/components/sheard/GallerySection";
import Banner from "../components/sheard/Banner";
import WhyChooseUs from "../components/sheard/WhyChooseUs";
import SubscriptionSection from "@/components/sheard/SubscriptionSection";
import RecentEvents from "@/components/sheard/RecentEvents";

export default function Home() {
  return (
    <div>
      <Banner />
      <WhyChooseUs />
      <RecentEvents />
      <GallerySection />
      <SubscriptionSection />
    </div>
  );
}
