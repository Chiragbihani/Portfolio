"use client"
import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { GitlabIcon as GitHub, Linkedin, Mail } from "lucide-react"
import { smoothScrollTo } from "@/utils/smoothScroll"
import ChatBot from "./ChatBot"

// Enhanced typing animation component with blinking cursor
const TypingAnimation = ({ text, delay = 0 }: { text: string; delay?: number }) => {
  const [showCursor, setShowCursor] = useState(true)

  // Start cursor blinking after text animation completes
  useEffect(() => {
    const textAnimationDuration = delay + text.length * 0.05 + 0.1
    const timer = setTimeout(() => {
      const interval = setInterval(() => {
        setShowCursor((prev) => !prev)
      }, 500)
      return () => clearInterval(interval)
    }, textAnimationDuration * 1000)

    return () => clearTimeout(timer)
  }, [text, delay])

  return (
    <motion.span
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, delay }}
      className="inline-block"
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: delay + index * 0.05, duration: 0.1 }}
        >
          {char}
        </motion.span>
      ))}
      <motion.span
        className="text-indigo-400 ml-1"
        animate={{ opacity: showCursor ? 1 : 0 }}
        transition={{ duration: 0.1 }}
      >
        |
      </motion.span>
    </motion.span>
  )
}

export default function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-slate-950 pt-20"
    >
      {/* Background elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-slate-900 to-slate-950 z-0"></div>

      {/* Grid pattern */}
      <div className="absolute inset-0 opacity-10">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      <div className="container mx-auto px-6 relative z-10 flex flex-col lg:flex-row items-center">
        {/* Text content */}
        <motion.div
          className="lg:w-1/2 text-center lg:text-left mb-12 lg:mb-0"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-sm md:text-base uppercase tracking-widest text-indigo-400 mb-4 font-mono"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            HI
          </motion.p>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 font-display">
            <span className="text-white">
              <TypingAnimation text="I'm Chirag Bihani" />
            </span>
          </h1>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-3 mb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <span className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full text-blue-300 border border-blue-500/20">
              Software Developer
            </span>
            <span className="px-4 py-2 bg-slate-800/80 backdrop-blur-sm rounded-full text-violet-300 border border-violet-500/20">
              Front-end Engineer
            </span>
          </motion.div>

          <motion.p
            className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto lg:mx-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
          >
            Building next-generation applications with AI and MERN. Chat with my AI assistant to learn more about my
            experience and projects.
          </motion.p>

          <motion.div
            className="flex flex-wrap justify-center lg:justify-start gap-4 mb-10"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
          >
            <a
              href="https://www.linkedin.com/in/chirag-bihani-1a3b2a256/"
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href="mailto:chiragbihani131206@gmail.com"
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
              aria-label="Email Contact"
            >
              <Mail className="w-6 h-6" />
            </a>
            <a
              href="https://github.com/ChiragBihani/"
              className="p-3 rounded-full bg-slate-800/80 backdrop-blur-sm border border-slate-700 hover:bg-indigo-600 hover:border-indigo-500 transition-all duration-300"
              aria-label="GitHub Profile"
            >
              <GitHub className="w-6 h-6" />
            </a>
          </motion.div>

          <motion.div
            className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <a
              href="https://drive.google.com/file/d/171bOeA0Kfy3hC05eAT2bqIdtLl-f7DIL/view?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Download Resume</span>
              <motion.span animate={{ x: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                →
              </motion.span>
            </a>
            <button
              onClick={() => smoothScrollTo("about")}
              className="px-8 py-3 border border-indigo-500 text-indigo-300 hover:bg-indigo-600/20 rounded-full transition-all duration-300 flex items-center justify-center gap-2"
            >
              <span>Explore My Work</span>
              <motion.span animate={{ y: [0, 5, 0] }} transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}>
                ↓
              </motion.span>
            </button>
          </motion.div>
        </motion.div>

        {/* AI ChatBot */}
        <motion.div
          className="lg:w-1/2 w-full"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <ChatBot />
        </motion.div>
      </div>
    </section>
  )
}
