"use client"

import type React from "react"
import { useState, useRef, useEffect, useMemo } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Send, Volume2, VolumeX, Minimize2, Maximize2, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import { smoothScrollTo } from "@/utils/smoothScroll"
import Fuse from "fuse.js"

// Static responses database
const responses = {
  greeting: [
    "Hello! I'm Chirag's AI assistant. How can I help you learn more about him?",
    "Hi there! I'm here to answer questions about Chirag Bihani. What would you like to know?",
    "Welcome! I can tell you about Chirag's background, skills, projects, and experience. What interests you?",
  ],

  about: [
    "I am a Web Developer, and Passionate about Mathematics from Bikaner, Rajasthan, India. I completed B.Tech in CSE at PES Institute of Technology and Management with a CGPA of 9.10. I specialize in building next-generation applications with Fullstack technologies and API integrations.",
  ],

  experience: [
    "Chirag is currently working as a Trainee Engineer at Eton Solutions in Bengaluru since July 2025, where he's undergoing comprehensive full-stack development training and gaining hands-on experience in professional software engineering. Previously, he worked as a Software Developer at Vulcan Academy (Feb-Jun 2025) overseeing website development and team management, and as a Subject Master Expert at Vedantu (May-Aug 2023) solving JEE mathematics doubts for students.",
  ],

  birthday_info: ["Chirag's birthday is on 6th-Feb-2003."],

  BMI_info: ["Chirag's height is approx : 5'7 ft."],

  skills: [
    "Chirag has expertise in multiple areas: Frontend development with HTML, CSS, JavaScript, and React.js; Backend development using Python, Java, C, C++, Node.js, and Express.js; Database management with MySQL and MongoDB; AI/ML technologies including Machine Learning and Deep Learning; and additional skills in Cloud Computing, Microsoft Office, and Canva.",
  ],

  projects: [
    "Let me show you Chirag's amazing projects! I'll take you to the projects section where you can explore all his work in detail.",
  ],

  education: [
    "Chirag completed his B.Tech in Computer Science & Engineering at PES Institute of Technology & Management (2021-2025) with an impressive CGPA of 8.95. He completed his Intermediate from Shiksha High School, Bikaner with 81.40% and his 10th grade from Bikaner Boys' School with 89.40%.",
  ],

  certifications: [
    "Chirag holds several industry certifications including FullStack Development by Udemy, Data Science by IBM, Learning Fullstack with React.js by FreeCodeCamp, Beginning with Python by Udemy, Web Development by PESITM, and Introduction to Responsible AI by Google.",
  ],

  contact: ["Here are all the ways you can reach Chirag:"],

  resume: ["Here's Chirag's resume for you to download:"],

  github: ["Check out Chirag's GitHub profile to see his code and projects:"],

  email: ["You can email Chirag directly at the email address given below:"],

  linkedin: ["Connect with Chirag on LinkedIn:"],

  languages: [
    "I am a multilingual with Native proficiency in Hindi and marwadi, Professional working proficiency in English, and Limited understanding of Kannada.",
  ],

  default: [
    "I can help you learn about Chirag's background, experience, skills, projects, education, certifications, or contact information. What specific area would you like to know about?",
    "I'm here to provide information about Chirag's. You can ask me about his work experience, technical skills, projects, education, or how to contact him.",
    "Feel free to ask me about my professional background, his projects, technical expertise, or any other aspect of his career you're interested in!",
  ],
}

// Enhanced keywords mapping with more comprehensive coverage
const keywordMap: Record<string, string[]> = {
  greeting: ["hello", "hi", "hey", "greetings", "good morning", "good afternoon", "good evening", "howdy"],
  about: [
    "about",
    "who",
    "introduction",
    "background",
    "tell me about",
    "describe",
    "info",
    "information",
    "tell me about him",
    "i want to know about him",
    "what is his name",
  ],
  experience: [
    "experience",
    "his experience",
    "his career",
    "i want to know about his experience",
    "tell me about his career",
    "tell me about his experience",
    "what is his experience",
    "chirag's experience",
    "work",
    "job",
    "career",
    "employment",
    "position",
    "role",
    "professional",
    "eton",
    "trainee",
    "vulcan",
    "vedantu",
    "workplace",
    "company",
    "employer",
  ],
  skills: [
    "skills",
    "what are the skills of him",
    "tell me about his skills",
    "what are the skillset of chirag",
    "what is the expertise of chirag",
    "how much skills he has",
    "what technologies he works on",
    "what techstack he is well versed with",
    "technologies",
    "tech stack",
    "programming",
    "languages",
    "frameworks",
    "abilities",
    "expertise",
    "technical",
    "coding",
    "development",
    "tools",
    "techstack",
  ],
  projects: [
    "projects",
    "portfolio",
    "work samples",
    "applications",
    "development",
    "built",
    "created",
    "apps",
    "websites",
    "code",
    "github projects",
    "what are the projects of chirag",
    "show me the projects of him",
    "tell me about his projects",
    "i want to know about his projects",
  ],
  education: [
    "education",
    "degree",
    "university",
    "college",
    "academic",
    "study",
    "qualification",
    "school",
    "btech",
    "b.tech",
    "bachelor",
    "graduation",
    "cgpa",
    "marks",
    "percentage",
    "educational",
    "academics",
    "learning",
    "studied",
    "institute",
    "pesitm",
    "what is chirag's education",
    "his education",
    "tell me about his education",
    "i want to know about his education",
  ],
  certifications: [
    "certifications",
    "his certificatons",
    "what certifications he has done",
    "tell me about his certifications",
    "his courses",
    "certificates",
    "credentials",
    "achievements",
    "awards",
    "certified",
    "certification",
    "course",
    "training",
  ],
  contact: [
    "contact",
    "what is his contact",
    "his contact",
    "how can i contact him",
    "i want to contact him",
    "how can i reach out to him",
    "how can i get in touch with him",
    "i want to reach out to him",
    "i want to connect with him",
    "reach",
    "phone",
    "connect",
    "contact information",
    "get in touch",
    "reach out",
    "call",
    "message",
    "communicate",
  ],
  resume: [
    "resume",
    "cv",
    "curriculum vitae",
    "download resume",
    "download cv",
    "i want to see his resume",
    "give me his resume",
    "his resume",
    "his CV",
    "I want to download his resume",
    "take me through his resume",
  ],
  github: [
    "github",
    "git",
    "code",
    "repository",
    "repos",
    "source code",
    "i want to check his github profile",
    "take me through his github repos",
    "take me to his github account",
  ],
  email: [
    "email",
    "mail",
    "send email",
    "e-mail",
    "gmail",
    "i want to send him a email",
    "his email",
    "his mail id",
    "his email id ",
    "his email account",
    "i want to connect to him with email",
    "what is his email",
    "what is his email id",
    "what is his mail id",
  ],
  linkedin: [
    "linkedin",
    "professional network",
    "connect linkedin",
    "i want to check his linkedin account",
    "i want to check his linkedin profile",
    "what is his linkedin profile",
    "take me to his linkedin account",
    "show me his linkedin profile",
  ],
  languages: [
    "languages",
    "speak",
    "linguistic",
    "communication",
    "hindi",
    "english",
    "kannada",
    "what languages he speaks",
    "what all languages he know",
    "which language he speaks",
    "which languages he is proficient with ",
  ],
  BMI_info: ["height", "length", "body type", "BMI", "tall", "physical", "what is his height", "his height"],
  birthday_info: [
    "birthday",
    "birth day",
    "bday",
    "born year",
    "age",
    "birth date",
    "his birthday",
    "what is his birthday",
    "tell me about his birthday",
    "tell me about his born date",
    "what is his birth date",
  ],
}

// Links database
const links = {
  resume: "https://drive.google.com/file/d/171bOeA0Kfy3hC05eAT2bqIdtLl-f7DIL/view?usp=sharing",
  github: "https://github.com/ChiragBihani/",
  email: "mailto:chiragbihani131206@gmail.com",
  linkedin: "https://www.linkedin.com/in/chirag-bihani-1a3b2a256/",
  phone: "tel:+917726823592",
}

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
  link?: string
  linkText?: string
  additionalLinks?: Array<{ url: string; text: string }>
  isProjectRedirect?: boolean
}

// Avatar with Lip Sync Component
const LipSyncAvatar = ({
  isListening,
  isSpeaking,
  isMuted,
}: {
  isListening: boolean
  isSpeaking: boolean
  isMuted: boolean
}) => {
  const [mouthScale, setMouthScale] = useState(1)
  const animationRef = useRef<number>()

  useEffect(() => {
    if (isSpeaking && !isMuted) {
      // Lip sync animation
      const animate = () => {
        const time = Date.now() * 0.01
        const mouthMovement = Math.abs(Math.sin(time * 0.5)) * 0.3 + 0.7
        setMouthScale(mouthMovement)
        animationRef.current = requestAnimationFrame(animate)
      }
      animate()
    } else {
      setMouthScale(1)
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [isSpeaking, isMuted])

  const getBorderColor = () => {
    if (isSpeaking && !isMuted) return "#4f46e5"
    if (isListening) return "#06b6d4"
    return "rgba(79, 70, 229, 0.3)"
  }

  const getBoxShadow = () => {
    if (isSpeaking && !isMuted) return "0 0 30px rgba(79, 70, 229, 0.6)"
    if (isListening) return "0 0 30px rgba(6, 182, 212, 0.6)"
    return "0 0 15px rgba(79, 70, 229, 0.3)"
  }

  return (
    <div className="relative">
      <motion.div
        className="relative w-48 h-48 rounded-full overflow-hidden border-4 shadow-2xl"
        animate={{
          borderColor: getBorderColor(),
          boxShadow: getBoxShadow(),
        }}
        transition={{ duration: 0.3 }}
      >
        <Image
          src="/images/avatar.jpg"
          alt="Chirag Bihani"
          width={192}
          height={192}
          className="w-full h-full object-cover"
          priority
        />

        {/* Lip Sync Overlay */}
        {isSpeaking && !isMuted && (
          <div
            className="absolute bottom-12 left-1/2 transform -translate-x-1/2 w-8 h-4 bg-red-500 rounded-full opacity-50 transition-transform duration-100"
            style={{
              transform: `translateX(-50%) scaleY(${mouthScale}) scaleX(${1 + (1 - mouthScale) * 0.3})`,
            }}
          />
        )}

        {/* Muted Indicator */}
        {isMuted && (
          <motion.div
            className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <VolumeX className="w-12 h-12 text-white" />
          </motion.div>
        )}
      </motion.div>

      {/* Audio Waves */}
      {isSpeaking && !isMuted && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="absolute border-2 border-indigo-400 border-opacity-30 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.6, 0.2, 0.6],
              }}
              transition={{
                duration: 1.5,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
              style={{
                width: 200 + i * 20,
                height: 200 + i * 20,
              }}
            />
          ))}
        </div>
      )}

      {/* Listening Indicator */}
      {isListening && (
        <motion.div
          className="absolute -top-4 left-1/2 transform -translate-x-1/2 flex space-x-1"
          animate={{ y: [0, -5, 0] }}
          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
        >
          {[0, 1, 2].map((i) => (
            <motion.div
              key={i}
              className="w-2 h-2 bg-cyan-400 rounded-full"
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.5, 1, 0.5],
              }}
              transition={{
                duration: 1,
                repeat: Number.POSITIVE_INFINITY,
                delay: i * 0.2,
              }}
            />
          ))}
        </motion.div>
      )}
    </div>
  )
}

export default function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)
  const [isMuted, setIsMuted] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [voiceSupported, setVoiceSupported] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const currentUtteranceRef = useRef<SpeechSynthesisUtterance | null>(null)

  // Create Fuse instance for fuzzy search
  const fuse = useMemo(() => {
    type Doc = { id: string; category: string; text: string; keywords: string }
    const docs: Doc[] = (Object.entries(responses) as [string, string[]][]).flatMap(([category, arr]) =>
      arr.map((text, idx) => ({
        id: `${category}-${idx}`,
        category,
        text,
        keywords: keywordMap[category]?.join(" ") ?? "",
      })),
    )

    return new Fuse(docs, {
      keys: [
        { name: "keywords", weight: 0.7 },
        { name: "category", weight: 0.2 },
        { name: "text", weight: 0.1 },
      ],
      includeScore: true,
      threshold: 0.4,
      ignoreLocation: true,
      minMatchCharLength: 2,
      findAllMatches: true,
    })
  }, [])

  // Check voice support on mount
  useEffect(() => {
    const checkVoiceSupport = () => {
      const hasWebkitSpeech = "webkitSpeechRecognition" in window
      const hasSpeech = "SpeechRecognition" in window
      const isSecure = window.location.protocol === "https:" || window.location.hostname === "localhost"

      setVoiceSupported((hasWebkitSpeech || hasSpeech) && isSecure)
    }

    checkVoiceSupport()
  }, [])

  // Auto-scroll to bottom of messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Enhanced function to find best matching response using improved keyword scoring
  const findBestResponse = (
    userInput: string,
  ): {
    text: string
    link?: string
    linkText?: string
    isProjectRedirect?: boolean
    additionalLinks?: Array<{ url: string; text: string }>
  } => {
    const input = userInput.trim().toLowerCase()
    if (!input) return { text: responses.default[Math.floor(Math.random() * responses.default.length)] }

    // Tokenize input, remove punctuation
    const inputTokens = input
      .replace(/[^\w\s]/g, "")
      .split(/\s+/)
      .filter(Boolean)

    // Score each category by number of keyword matches
    let bestMatch = "default"
    let maxScore = 0

    Object.entries(keywordMap).forEach(([category, keywords]) => {
      let score = 0
      for (const keyword of keywords) {
        // Tokenize keyword for multi-word phrases
        const keywordTokens = keyword.toLowerCase().split(/\s+/)
        // If all tokens in keyword are present in inputTokens, count as a match
        if (keywordTokens.every((kt) => inputTokens.includes(kt))) {
          score++
        }
      }
      if (score > maxScore) {
        maxScore = score
        bestMatch = category
      }
    })

    // If no strong match, fallback to fuzzy search
    if (maxScore === 0) {
      const results = fuse.search(input, { limit: 3 })
      if (results.length > 0 && typeof results[0].score === "number" && results[0].score <= 0.6) {
        bestMatch = results[0].item.category
      }
    }

    // Get response text
    const responseArray = (responses as any)[bestMatch] ?? responses.default
    const responseText = responseArray[Math.floor(Math.random() * responseArray.length)]

    // Apply linking logic based on category
    switch (bestMatch) {
      case "resume":
        return { text: responseText, link: links.resume, linkText: "📄 Download Resume" }
      case "github":
        return { text: responseText, link: links.github, linkText: "🔗 View GitHub Profile" }
      case "email":
        return { text: responseText, link: links.email, linkText: "📧 chiragbihani131206@gmail.com" }
      case "linkedin":
        return { text: responseText, link: links.linkedin, linkText: "🔗 Connect on LinkedIn" }
      case "contact":
        return {
          text: `${responseText}\n\n📧 chiragbihani131206@gmail.com\n📱 +91 7726823592`,
          link: links.email,
          linkText: "📧 Send Email",
          additionalLinks: [
            { url: links.phone, text: "📱 Call Now" },
            { url: links.linkedin, text: "💼 LinkedIn Profile" },
            { url: links.github, text: "🔗 GitHub Profile" },
          ],
        }
      case "projects":
        return { text: responseText, isProjectRedirect: true }
      default:
        return { text: responseText }
    }
  }

  // Enhanced text-to-speech function with more humanized voice
  const speakText = (text: string) => {
    if (isMuted) return

    // Cancel any ongoing speech
    speechSynthesis.cancel()

    setIsSpeaking(true)

    // Clean text for speech (remove emojis and special characters)
    const cleanText = text.replace(/[📄🔗📧📱💼🎯]/gu, "").replace(/\n/g, " ")

    const utterance = new SpeechSynthesisUtterance(cleanText)
    utterance.rate = 0.85
    utterance.pitch = 1.0
    utterance.volume = 0.9

    // Wait for voices to load and select a more natural voice
    const setVoice = () => {
      const voices = speechSynthesis.getVoices()

      const preferredVoices = [
        voices.find((voice) => voice.name.includes("Samantha")),
        voices.find((voice) => voice.name.includes("Zira")),
        voices.find((voice) => voice.name.includes("Google US English") && voice.name.includes("Female")),
        voices.find((voice) => voice.name.includes("Microsoft Aria")),
        voices.find((voice) => voice.name.includes("Karen")),
        voices.find((voice) => voice.lang === "en-US" && voice.name.includes("Female")),
        voices.find((voice) => voice.lang === "en-US" && !voice.name.includes("Male")),
        voices.find((voice) => voice.lang.startsWith("en")),
      ]

      const selectedVoice = preferredVoices.find((voice) => voice) || voices[0]
      if (selectedVoice) {
        utterance.voice = selectedVoice
      }
    }

    if (speechSynthesis.getVoices().length === 0) {
      speechSynthesis.onvoiceschanged = () => {
        setVoice()
        speechSynthesis.speak(utterance)
      }
    } else {
      setVoice()
      speechSynthesis.speak(utterance)
    }

    utterance.onend = () => {
      setIsSpeaking(false)
      currentUtteranceRef.current = null
    }

    utterance.onerror = () => {
      setIsSpeaking(false)
      currentUtteranceRef.current = null
    }

    currentUtteranceRef.current = utterance
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: input.trim(),
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsLoading(true)

    // Simulate thinking time
    setTimeout(() => {
      const response = findBestResponse(input)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: response.text,
        timestamp: new Date(),
        link: response.link,
        linkText: response.linkText,
        isProjectRedirect: response.isProjectRedirect,
        additionalLinks: response.additionalLinks,
      }

      setMessages((prev) => [...prev, assistantMessage])
      setIsLoading(false)
      speakText(response.text)

      // Handle project redirect
      if (response.isProjectRedirect) {
        setTimeout(() => {
          smoothScrollTo("projects")
        }, 1000)
      }
    }, 500)

    setInput("")
  }

  // Simplified speech recognition without network dependency
  const startListening = () => {
    if (!voiceSupported) {
      const userInput = prompt("Voice input not available. Please type your question:")
      if (userInput && userInput.trim()) {
        setInput(userInput.trim())
      }
      return
    }

    try {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()

      recognition.continuous = false
      recognition.interimResults = false
      recognition.lang = "en-US"
      recognition.maxAlternatives = 1

      const timeout = setTimeout(() => {
        recognition.stop()
        setIsListening(false)
      }, 10000)

      recognition.onstart = () => {
        setIsListening(true)
      }

      recognition.onend = () => {
        clearTimeout(timeout)
        setIsListening(false)
      }

      recognition.onresult = (event: any) => {
        clearTimeout(timeout)
        if (event.results && event.results.length > 0) {
          const transcript = event.results[0][0].transcript
          setInput(transcript)
        }
        setIsListening(false)
      }

      recognition.onerror = (event: any) => {
        clearTimeout(timeout)
        setIsListening(false)
        console.log("Speech recognition error:", event.error)

        const userInput = prompt("Voice input failed. Please type your question:")
        if (userInput && userInput.trim()) {
          setInput(userInput.trim())
        }
      }

      recognition.start()
    } catch (error) {
      console.log("Speech recognition not available:", error)
      setIsListening(false)

      const userInput = prompt("Voice input not available. Please type your question:")
      if (userInput && userInput.trim()) {
        setInput(userInput.trim())
      }
    }
  }

  // Enhanced mute/unmute functionality
  const toggleMute = () => {
    setIsMuted(!isMuted)
    if (!isMuted) {
      speechSynthesis.cancel()
      setIsSpeaking(false)
      currentUtteranceRef.current = null
    }
  }

  // Stop speaking function
  const stopSpeaking = () => {
    speechSynthesis.cancel()
    setIsSpeaking(false)
    currentUtteranceRef.current = null
  }

  // Suggested questions
  const suggestedQuestions = [
    "What is his education?",
    "Tell me about his degree",
    "Where did he study?",
    "What are his skills?",
    "Show me his projects",
  ]

  return (
    <motion.div
      className="bg-slate-900 bg-opacity-90 backdrop-blur-md rounded-2xl border border-indigo-500 border-opacity-20 shadow-2xl overflow-hidden"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="bg-slate-800 bg-opacity-80 p-4 flex items-center justify-between border-b border-indigo-500 border-opacity-20">
        <div className="flex items-center gap-3">
          <div className={`w-3 h-3 rounded-full ${isMuted ? "bg-red-500" : "bg-green-500"} animate-pulse`}></div>
          <h3 className="text-white font-semibold">Ask me anything about Chirag Bihani</h3>
        </div>
        <div className="flex items-center gap-2">
          {isSpeaking && (
            <Button
              variant="ghost"
              size="sm"
              onClick={stopSpeaking}
              className="text-red-400 hover:text-red-300"
              title="Stop Speaking"
            >
              <div className="w-4 h-4 bg-red-400 rounded-sm"></div>
            </Button>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className={`${isMuted ? "text-red-400 hover:text-red-300" : "text-slate-400 hover:text-white"}`}
            title={isMuted ? "Unmute" : "Mute"}
          >
            {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(!isMinimized)}
            className="text-slate-400 hover:text-white"
            title={isMinimized ? "Maximize" : "Minimize"}
          >
            {isMinimized ? <Maximize2 className="w-4 h-4" /> : <Minimize2 className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {!isMinimized && (
          <motion.div
            initial={{ height: 0 }}
            animate={{ height: "auto" }}
            exit={{ height: 0 }}
            className="overflow-hidden"
          >
            <div className="p-6">
              {/* Avatar */}
              <div className="flex justify-center mb-6">
                <LipSyncAvatar isListening={isListening} isSpeaking={isSpeaking} isMuted={isMuted} />
              </div>

              {/* Chat Messages */}
              <div className="h-64 overflow-y-auto mb-4 space-y-4">
                {messages.length === 0 && (
                  <div className="text-center text-slate-400">
                    <p className="mb-4">👋 Hi! I'm Chirag's AI assistant.</p>
                    <p className="mb-4">Ask me anything about his background, skills, projects, or experience!</p>
                    <div className="grid grid-cols-1 gap-2">
                      {suggestedQuestions.slice(0, 3).map((question, index) => (
                        <button
                          key={index}
                          onClick={() => setInput(question)}
                          className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-2 rounded-lg transition-colors"
                        >
                          {question}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" ? "bg-indigo-600 text-white" : "bg-slate-800 text-slate-200"
                      }`}
                    >
                      <p className="text-sm whitespace-pre-line">{message.content}</p>

                      {/* Multiple links for contact */}
                      {message.role === "assistant" && message.additionalLinks && (
                        <div className="flex flex-wrap gap-2 mt-3">
                          {message.link && (
                            <a
                              href={message.link}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition-colors"
                            >
                              {message.linkText}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                          {message.additionalLinks.map((link, index) => (
                            <a
                              key={index}
                              href={link.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 px-3 py-2 bg-slate-700 hover:bg-slate-600 text-white text-xs rounded-lg transition-colors"
                            >
                              {link.text}
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          ))}
                        </div>
                      )}

                      {/* Single link for other messages */}
                      {message.role === "assistant" && message.link && !message.additionalLinks && (
                        <a
                          href={message.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 mt-3 px-3 py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-xs rounded-lg transition-colors"
                        >
                          {message.linkText}
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      )}

                      {/* Project redirect indicator */}
                      {message.role === "assistant" && message.isProjectRedirect && (
                        <div className="mt-3 px-3 py-2 bg-violet-600 text-white text-xs rounded-lg">
                          🚀 Redirecting to projects section...
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}

                {isLoading && (
                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex justify-start">
                    <div className="bg-slate-800 text-slate-200 p-3 rounded-lg">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"></div>
                        <div
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.1s" }}
                        ></div>
                        <div
                          className="w-2 h-2 bg-indigo-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0.2s" }}
                        ></div>
                      </div>
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex gap-2">
                <Input
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask about Chirag's experience, skills, projects..."
                  className="flex-1 bg-slate-800 border-slate-600 text-white placeholder-slate-400"
                  disabled={isLoading}
                />
                <Button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-indigo-600 hover:bg-indigo-700"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
