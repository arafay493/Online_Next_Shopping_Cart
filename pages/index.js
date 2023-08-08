import Banner from "@/components/Banner";
import ContactSection from "@/components/ContactSection";
import FeaturedItems from "@/components/FeaturedItems";
import ItemsSection from "@/components/ItemsSection";
import Head from "next/head";

export default function Home() {
  return (
    <div className="overflow-hidden">
      <Head>
        <title>Next Cart</title>
      </Head>
      <Banner />
      <FeaturedItems />
      <ItemsSection />
      <ContactSection />
    </div>
  );
}
