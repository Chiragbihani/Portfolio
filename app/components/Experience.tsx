"use client"

import { motion } from "framer-motion"
import { Briefcase, Calendar, MapPin, Zap } from "lucide-react"
import SectionHeading from "./SectionHeading"

export default function Experience() {
  const experiences = [
    {
      period: "Jul 2025 - Present",
      role: "Trainee Engineer",
      company: "Eton Solutions",
      location: "Bengaluru, Karnataka",
      color: "indigo",
      projects: [
        {
          title: "🚀 Full-Stack Development Training",
          description:
            "Currently undergoing comprehensive training in modern web development technologies, learning industry best practices and working on real-world projects to enhance technical skills.",
        },
        {
          title: "💼 Professional Development",
          description:
            "Gaining hands-on experience in software engineering processes, code review practices, and collaborative development workflows in a professional environment.",
        },
        {
          title: "🔧 Technology Stack Mastery",
          description:
            "Expanding expertise in enterprise-level technologies and frameworks, focusing on scalable application development and modern software architecture patterns.",
        },
      ],
    },
    {
      period: "Feb 2025 - Jun 2025",
      role: "Software Developer",
      company: "Vulcan Academy",
      location: "Remote",
      color: "blue",
      projects: [
        {
          title: "🌐 Website Development & Maintenance",
          description:
            "Oversaw the creation of the foundation's website, including design, functionality, and content updates. Continuously ensuring the website aligns with the foundation's goals and provides an accessible, user-friendly experience.",
        },
        {
          title: "📋 Project Coordination & Team Management",
          description:
            "Responsible for overseeing and guiding the activities of the team. Assigned roles and ensured smooth communication across all projects, focusing on both short-term deliverables and long-term goals for the foundation.",
        },
      ],
    },
    {
      period: "May 2023 - Aug 2023",
      role: "Subject Master Expert",
      company: "Vedantu",
      location: "Remote",
      color: "violet",
      projects: [
        {
          title: "🌐 Doubt Solving Expert (JEE-MAINS, JEE-ADV.)",
          description:
            "Solved doubts of the students in real-time for mathematics questions asked in JEE-MAINS and JEE-ADVANCED. Provided detailed solutions for the doubts on regular basis.",
        },
      ],
    },
  ]

  return (
    <section id="experience" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-slate-900 to-slate-950 z-0"></div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading title="Experience" />

        <div className="max-w-5xl mx-auto">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              className="mb-12 relative"
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              {/* Timeline connector */}
              {index < experiences.length - 1 && (
                <div className="absolute top-16 bottom-0 left-8 w-0.5 bg-gradient-to-b from-indigo-500 to-blue-500">
                  <motion.div
                    className="absolute top-0 left-1/2 transform -translate-x-1/2 w-3 h-3 rounded-full bg-white"
                    animate={{
                      y: [0, 100, 200, 300, 400],
                      opacity: [1, 0.8, 0.6, 0.4, 0],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "linear",
                    }}
                  />
                </div>
              )}

              <div className="flex items-start">
                {/* Timeline dot */}
                <div className="relative">
                  <div className="w-16 h-16 rounded-full bg-slate-800 flex items-center justify-center z-10 relative border border-indigo-500/30">
                    <Briefcase className={`w-8 h-8 text-${exp.color}-400`} />
                  </div>
                </div>

                {/* Content */}
                <div className="ml-8 bg-slate-900/80 backdrop-blur-md p-6 rounded-2xl border border-indigo-500/20 flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white flex items-center gap-2 font-display">
                      <Zap className={`w-5 h-5 text-${exp.color}-400`} />
                      {exp.role}
                    </h3>
                    <div className="flex items-center text-indigo-400 mt-2 md:mt-0">
                      <Calendar className="w-4 h-4 mr-1" />
                      <span>{exp.period}</span>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6">
                    <div className="flex items-center mb-2 sm:mb-0">
                      <span className="text-xl text-slate-300 font-semibold">{exp.company}</span>
                    </div>
                    <div className="flex items-center text-slate-400">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{exp.location}</span>
                    </div>
                  </div>

                  {/* Current role indicator */}
                  {index === 0 && (
                    <div className="mb-4 px-3 py-1 bg-green-500/20 border border-green-500/30 rounded-full text-green-300 text-sm inline-flex items-center gap-2">
                      <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                      <span>Current Position</span>
                    </div>
                  )}

                  <div className="space-y-4">
                    {exp.projects.map((project, i) => (
                      <motion.div
                        key={i}
                        className="bg-slate-800/50 p-4 rounded-xl border border-slate-700/50 group hover:border-indigo-500/30 transition-colors duration-300"
                        whileHover={{ x: 5 }}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.3, delay: i * 0.1 + 0.2 }}
                      >
                        <h4 className="text-lg font-semibold text-white mb-2">{project.title}</h4>
                        <p className="text-slate-300">{project.description}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
