import { Certificate } from "@/components/Certificate";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="lg:px-40 py-10 lg:py-20">
      <Hero />
      <Certificate />
    </div>
  );
}
