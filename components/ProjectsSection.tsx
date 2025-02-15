"use client";

import { motion } from "framer-motion";
import { Project } from "@/types";
import { PROJECTS } from "@/constants";

const ProjectCard = ({ project }: { project: Project }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      viewport={{ once: true }}
      whileHover={{ y: -5 }}
      className="group relative"
    >
      <div 
        className={`relative rounded-xl ${project.color} p-6 md:p-8 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] transition-all hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] overflow-hidden`}
      >

        {/* Content Container */}
        <div className="relative z-10">
          {/* Platform Badge */}
          <div className="absolute top-4 right-4 bg-black text-white px-4 py-1.5 rounded-full text-sm font-bold transform rotate-2">
            {project.tags[0]}
          </div>

          <div className="mt-8">
            <h3 className="text-3xl font-black mb-3 text-black">
              {project.title}
            </h3>
            <p className="text-black/80 mb-6 font-medium text-lg leading-relaxed">
              {project.description}
            </p>
          </div>

          {/* Tags Container */}
          <div className="flex flex-wrap gap-2 mb-8">
            {project.tags.slice(1).map((tag: string) => (
              <span
                key={tag}
                className="px-3 py-1.5 text-sm font-bold rounded-full bg-white/90 text-black border-2 border-black transform hover:rotate-2 transition-transform"
              >
                {tag}
              </span>
            ))}
          </div>

        </div>
      </div>
    </motion.div>
  );
};

export default function ProjectsSection() {
  return (
    <section className="py-24 px-4">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-block bg-[#FFE66D] px-8 py-3 rounded-2xl border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] mb-8 transform -rotate-1">
            <h2 className="text-4xl md:text-5xl font-black text-black">
              Featured Projects
            </h2>
          </div>
          <p className="text-xl md:text-2xl font-medium dark:text-white text-black max-w-3xl mx-auto leading-relaxed">
            Here are some of my recent projects that showcase my skills in web development,
            machine learning, and creative coding.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-12">
          {PROJECTS.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <ProjectCard project={project} />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 