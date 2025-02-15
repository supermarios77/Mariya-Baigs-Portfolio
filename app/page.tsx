import Hero from "@/components/Hero";
import ProjectsSection from "@/components/ProjectsSection";

export default function Home() {
  return (
    <div className="flex flex-col">
      <div className="mt-20 flex items-center justify-center p-4">
        <Hero />
      </div>
      <ProjectsSection />
    </div>
  );
}
