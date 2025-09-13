"use client"

import type React from "react"

import { motion, AnimatePresence } from "framer-motion"
import { useState } from "react"
import {
  ExternalLink,
  Github,
  Cpu,
  Globe,
  MessageSquare,
  Headphones,
  Utensils,
  Flag as Flask,
  Calculator,
  Tractor as TicTacToe,
  Sparkles,
  Bot,
  Braces,
  Code,
  Database,
  Gamepad2,
  BookOpen,
  Zap,
  Brain,
} from "lucide-react"
import SectionHeading from "./SectionHeading"

// 3D Card effect component
const Card3D = ({ children }: { children: React.ReactNode }) => {
  const [rotateX, setRotateX] = useState(0)
  const [rotateY, setRotateY] = useState(0)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateXValue = (y - centerY) / 10
    const rotateYValue = (centerX - x) / 10

    setRotateX(rotateXValue)
    setRotateY(rotateYValue)
  }

  const handleMouseLeave = () => {
    setRotateX(0)
    setRotateY(0)
  }

  return (
    <motion.div
      className="h-full perspective-1000"
      style={{
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
        transition: "transform 0.1s ease",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  )
}

export default function Projects() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const categories = [
    { id: "AI", label: "AI & ML", icon: <Cpu className="w-4 h-4" /> },
    { id: "Web", label: "Web Apps", icon: <Globe className="w-4 h-4" /> },
    { id: "Tools", label: "Tools", icon: <Braces className="w-4 h-4" /> },
    { id: "Apps", label: "Apps", icon: <Gamepad2 className="w-4 h-4" /> },
  ]

  const projects = [
    {
      title: "MindfulAssist",
      description:
        "Advanced Mental Health ChatBot which tells your mental health and based on it tells you the suggestions and provides you further assistance with music and podcast.",
      techStack: "ReactJS, Python, OpenAI API",
      link: "https://github.com/Chiragbihani/MindfullAssist-A-Mental-Health-Assistant",
      icon: <Bot className="w-6 h-6 text-indigo-400" />,
      type: "github",
      category: "AI",
      featured: true,
    },
    {
      title: "Iot BlockChain Manager",
      description: "enhances the security of Internet of Things (IoT) networks by integrating Practical Byzantine Fault Tolerance (PBFT) consensus with Elliptic Curve Cryptography (ECC).",
      techStack: "Python , JavaScript , BlockChain Tools",
      link: "https://github.com/Chiragbihani/IoT_blockchain_manager",
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      type: "github",
      category: "Tools",
    },
    
    {
      title: "Portfolio Website",
      description: "Personal portfolio website showcasing projects, skills, and professional experience",
      techStack: "Next.js, React, Tailwind CSS, Framer Motion",
      link: "https://github.com/ChiragBihani/portfolio",
      icon: <Globe className="w-6 h-6 text-purple-400" />,
      type: "github",
      category: "Web",
      featured: true,
    },
    {
      title: "Loan Management",
      description: "Real-time Loan management application with bi-directional notification alerts",
      techStack: "Angular, Json-server, MaterialApp",
      link: "https://github.com/Chiragbihani/loan-app",
      icon: <Zap className="w-6 h-6 text-yellow-400" />,
      type: "github",
      category: "Web",
    },
    
    {
      title: "College ERP Master",
      description: "To Manage the assessment and college based activities",
      techStack: "React.js, SQL, Tailwind",
      link: "https://github.com/Chiragbihani/College-ERP-master",
      icon: <Code className="w-6 h-6 text-green-400" />,
      type: "github",
      category: "Web",
    },
    {
      title: "Student Management System",
      description: "Comprehensive system for managing student records, grades, and academic information",
      techStack: "Database Management, CRUD Operations, Python",
      link: "https://github.com/Chiragbihani/Student-Database-Management",
      icon: <Database className="w-6 h-6 text-indigo-400" />,
      type: "github",
      category: "Web",
    },
    {
      title: "RouteOptimisation",
      description: "Mobile Application to find the cost/time effective route and mode of transport and estimated fair and estimated time of arrival for you.",
      techStack: "React.js, APIs",
      link: "https://github.com/Chiragbihani/Route-optimization-for-Cabs-and-Public-Transports",
      icon: <Code className="w-6 h-6 text-indigo-400" />,
      type: "github",
      category: "Apps",
    },
  ]

  const filteredProjects = activeCategory ? projects.filter((project) => project.category === activeCategory) : projects

  return (
    <section id="projects" className="py-20 relative overflow-hidden bg-slate-950">
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/10 via-slate-900 to-slate-950 z-0"></div>

      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-5">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <SectionHeading
          title="Projects"
          subtitle="Explore my portfolio of web applications, AI solutions, and development tools from GitHub"
        />

        {/* Category filters */}
        <motion.div
          className="flex flex-wrap justify-center gap-4 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <button
            onClick={() => setActiveCategory(null)}
            className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
              activeCategory === null ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-300 hover:bg-slate-700"
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>All Projects ({projects.length})</span>
          </button>

          {categories.map((category) => {
            const count = projects.filter((p) => p.category === category.id).length
            return (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={`px-4 py-2 rounded-full flex items-center gap-2 transition-all duration-300 ${
                  activeCategory === category.id
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-800 text-slate-300 hover:bg-slate-700"
                }`}
              >
                {category.icon}
                <span>
                  {category.label} ({count})
                </span>
              </button>
            )
          })}
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.title}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="h-full"
              >
                <Card3D>
                  {/* Card with 3D effect */}
                  <div className="bg-slate-900/80 backdrop-blur-md rounded-2xl border border-indigo-500/20 h-full flex flex-col overflow-hidden relative">
                    {/* Featured badge */}
                    {project.featured && (
                      <div className="absolute top-4 right-4 px-2 py-1 bg-indigo-500/20 backdrop-blur-sm rounded-full text-xs text-indigo-300 flex items-center gap-1 border border-indigo-500/30 z-10">
                        <Sparkles className="w-3 h-3" />
                        <span>Featured</span>
                      </div>
                    )}

                    {/* Content */}
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center mb-4">
                        <div className="p-3 rounded-full bg-slate-800 mr-4 border border-indigo-500/20">
                          {project.icon}
                        </div>
                        <h3 className="text-xl font-bold text-white font-display">{project.title}</h3>
                      </div>

                      <p className="text-slate-300 mb-4 flex-grow">{project.description}</p>
                      <p className="text-sm text-slate-400 mb-6 font-mono">{project.techStack}</p>

                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium transition-all duration-300 hover:scale-105"
                      >
                        <Github className="w-4 h-4" />
                        View on GitHub
                      </a>
                    </div>
                  </div>
                </Card3D>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* GitHub Profile Link */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <a
            href="https://github.com/ChiragBihani"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-lg transition-all duration-300 border border-slate-600 hover:border-indigo-500"
          >
            <Github className="w-5 h-5" />
            <span>View All Repositories on GitHub</span>
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  )
}
