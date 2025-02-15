import React from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { motion } from "framer-motion"
import Link from "next/link"

interface ProjectCardProps {
  id: number
  title: string
  description: string
  technologies: string[]
  color: string
}

export default function ProjectCard({ id, title, description, technologies, color }: ProjectCardProps) {
  return (
    <Link href={`/projects/${id}`} className="block h-full">
      <motion.div
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="h-full"
      >
        <Card className={`h-full overflow-hidden cursor-pointer ${color}`}>
          <CardContent className="p-6 h-full flex flex-col justify-between">
            <div>
              <h3 className="font-bold text-2xl mb-2 text-white">{title}</h3>
              <p className="text-white/80 mb-4">{description}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {technologies.map((tech) => (
                <Badge key={tech} variant="secondary" className="bg-white/20 text-white">
                  {tech}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </Link>
  )
}