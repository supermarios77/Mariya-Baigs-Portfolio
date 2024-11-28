import { Certificate } from "@/components/Certificate";
import Hero from "@/components/Hero";

export default function Home() {
  return (
    <div className="mt-20 flex items-center justify-center p-4 flex-col">
      <Hero />
      <Certificate />
    </div>
  );
}
