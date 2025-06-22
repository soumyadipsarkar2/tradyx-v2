"use client"

import type React from "react"

import { useEffect, useRef, useState } from "react"
import { motion, useInView, useAnimation, useScroll } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  ArrowRight,
  Menu,
  X,
  Shield,
  Target,
  Eye,
  Users,
  TrendingUp,
  Gift,
  DollarSign,
  Award,
  Car,
  Lock,
  Globe,
  Zap,
  Crown,
  Gem,
  Trophy,
  ChevronDown,
  CheckCircle,
  ArrowUpRight,
  Sparkles,
  Rocket,
  Brain,
  Heart,
  Lightbulb,
  Building,
  Network,
  Wallet,
  CreditCard,
  Clock,
  Phone,
  Mail,
  MapPin,
} from "lucide-react"
import Image from "next/image"

// Animated Counter Component
const AnimatedCounter = ({
  end,
  duration = 2,
  suffix = "",
  prefix = "",
}: {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}) => {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      let startTime: number
      const animate = (currentTime: number) => {
        if (!startTime) startTime = currentTime
        const progress = Math.min((currentTime - startTime) / (duration * 1000), 1)

        setCount(Math.floor(progress * end))

        if (progress < 1) {
          requestAnimationFrame(animate)
        }
      }
      requestAnimationFrame(animate)
    }
  }, [inView, end, duration])

  return (
    <span ref={ref}>
      {prefix}
      {count.toLocaleString()}
      {suffix}
    </span>
  )
}

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("home")

  const navItems = [
    { name: "Home", href: "home" },
    { name: "About", href: "about" },
    { name: "Mission", href: "mission" },
    { name: "Vision", href: "vision" },
    { name: "Team", href: "team" },
    { name: "Founder", href: "founder" },
    { name: "Business", href: "business" },
    { name: "Rewards", href: "rewards" },
    { name: "Terms", href: "terms" },
  ]

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      const navbarHeight = 80
      const elementPosition = element.offsetTop - navbarHeight
      window.scrollTo({
        top: elementPosition,
        behavior: "smooth",
      })
    }
    setIsOpen(false)
  }

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map((item) => item.href)
      const scrollPosition = window.scrollY + 150

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8 }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900 border-b border-emerald-200/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <motion.div
            className="flex items-center cursor-pointer"
            onClick={() => scrollToSection("home")}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image src="/images/logo.png" alt="TRADY X" width={50} height={50} className="w-10 h-10 sm:w-20 sm:h-12" />
          </motion.div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-8">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`text-xs lg:text-sm font-medium transition-colors duration-300 relative ${
                  activeSection === item.href ? "text-emerald-400" : "text-gray-300 hover:text-emerald-400"
                }`}
                whileHover={{ y: -2 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
                {activeSection === item.href && (
                  <motion.div
                    layoutId="activeSection"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-emerald-400"
                    initial={false}
                    transition={{ duration: 0.3 }}
                  />
                )}
              </motion.button>
            ))}
          </div>

          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="hidden md:block">
            <Button
              onClick={() => window.open("https://tradyx.pro", "_blank")}
              className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-4 lg:px-6 py-2 text-xs lg:text-sm rounded-full transition-all duration-300 shadow-lg hover:shadow-emerald-500/25"
            >
              Get Started
              <ArrowRight className="ml-2 w-3 h-3 lg:w-4 lg:h-4" />
            </Button>
          </motion.div>

          <motion.button
            className="md:hidden text-gray-300"
            onClick={() => setIsOpen(!isOpen)}
            whileTap={{ scale: 0.95 }}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </motion.button>
        </div>

        <motion.div
          initial={false}
          animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden overflow-hidden"
        >
          <div className="py-4 space-y-4">
            {navItems.map((item) => (
              <motion.button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`block w-full text-left text-sm font-medium transition-colors duration-200 ${
                  activeSection === item.href ? "text-emerald-400" : "text-gray-300 hover:text-emerald-400"
                }`}
                whileHover={{ x: 10 }}
                transition={{ duration: 0.2 }}
              >
                {item.name}
              </motion.button>
            ))}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="pt-4">
              <Button
                onClick={() => window.open("https://tradyx.pro", "_blank")}
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-2 rounded-full transition-all duration-300"
              >
                Get Started
                <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </motion.nav>
  )
}

const AnimatedSection = ({
  children,
  className = "",
  delay = 0,
  id,
}: { children: React.ReactNode; className?: string; delay?: number; id?: string }) => {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref}
      id={id}
      animate={controls}
      initial="hidden"
      variants={{
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 0.8,
            ease: "easeOut",
            delay: delay,
          },
        },
        hidden: { opacity: 0, y: 60 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

const IconCard = ({
  icon: Icon,
  title,
  description,
  delay = 0,
}: { icon: any; title: string; description: string; delay?: number }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      viewport={{ once: true }}
      whileHover={{ y: -5, scale: 1.02 }}
      className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100"
    >
      <div className="flex flex-col sm:flex-row items-center sm:items-start space-y-2 sm:space-y-0 sm:space-x-4 mb-4">
        <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl">
          <Icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
        </div>
        <h3 className="text-base lg:text-lg font-semibold text-gray-800 text-center sm:text-left">{title}</h3>
      </div>
      <p className="text-sm lg:text-base text-gray-600 leading-relaxed text-center sm:text-left">{description}</p>
    </motion.div>
  )
}

export default function TradyXLanding() {
  const { scrollYProgress } = useScroll()

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      const navHeight = 80
      window.scrollTo({ top: el.offsetTop - navHeight, behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-emerald-50 text-gray-800 overflow-x-hidden relative">
      <Navbar />

      {/* Animated Background Elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 lg:w-2 lg:h-2 bg-emerald-300/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -100, 0],
              opacity: [0, 1, 0],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Number.POSITIVE_INFINITY,
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      {/* Hero Section - Dark Background with Logo */}
      <section
        id="home"
        className="relative min-h-screen flex items-center justify-center px-4 pt-16 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-8 lg:gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-6 lg:mb-8"
            >
              <Image
                src="/images/logo.png"
                alt="TRADY X Logo"
                width={80}
                height={80}
                className="w-40 h-16 lg:w-40 lg:h-20 drop-shadow-lg"
              />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent"
            >
              TRADY X Pro
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="text-lg sm:text-xl lg:text-2xl mb-6 lg:mb-8 text-gray-300 leading-relaxed"
            >
              Empowering Your Financial Future Through Innovation
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                size="lg"
                onClick={() => window.open("https://tradyx.pro", "_blank")}
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
              >
                Get Started Today
                <ArrowRight className="ml-2 group-hover:translate-x-1 transition-transform w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => scrollTo("about")}
                className="border-emerald-400 text-emerald-400 hover:bg-emerald-400 hover:text-gray-900 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-full transition-all duration-300"
              >
                Learn More
                <ChevronDown className="ml-2 w-4 h-4 lg:w-5 lg:h-5" />
              </Button>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative"
          >
            <div className="relative bg-white/10 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-2xl border border-emerald-200/20">
              <div className="grid grid-cols-3 gap-4 lg:gap-6 mb-6 lg:mb-8">
                {[
                  { icon: Shield, label: "Secure" },
                  { icon: TrendingUp, label: "Profitable" },
                  { icon: Globe, label: "Global" },
                ].map((item, index) => (
                  <motion.div
                    key={item.label}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                    className="text-center"
                  >
                    <div className="p-3 lg:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-2 mx-auto w-fit">
                      <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                    </div>
                    <p className="text-xs lg:text-sm font-medium text-gray-300">{item.label}</p>
                  </motion.div>
                ))}
              </div>
              <div className="text-center">
                <p className="text-base lg:text-lg font-semibold text-white mb-2">
                  Join <AnimatedCounter end={50000} suffix="+" /> Traders
                </p>
                <p className="text-sm lg:text-base text-gray-300">
                  Your true value is determined by how much more you give in value than you take in payment
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <AnimatedSection id="about" className="py-12 lg:py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              About TRADY X
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Leading the revolution in cryptocurrency trading with cutting-edge technology and unparalleled expertise
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Rocket,
                title: "Innovation First",
                description: "Pioneering the future of digital finance with revolutionary trading solutions",
              },
              {
                icon: Shield,
                title: "Bank-Grade Security",
                description: "Military-grade encryption and multi-layer security protocols protect your assets",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "Building a global network of successful traders and financial innovators",
              },
              {
                icon: Trophy,
                title: "Proven Results",
                description: "Track record of consistent returns and satisfied clients worldwide",
              },
            ].map((item, index) => (
              <IconCard
                key={item.title}
                icon={item.icon}
                title={item.title}
                description={item.description}
                delay={index * 0.1}
              />
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Mission Section */}
      <AnimatedSection id="mission" className="py-12 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center mb-4 lg:mb-6">
                <Target className="w-8 h-8 lg:w-12 lg:h-12 text-emerald-600 mr-3 lg:mr-4" />
                <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  Our Mission
                </h2>
              </div>
              <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                We are committed to excellence in everything we do. By constantly innovating and staying ahead of
                industry trends, we ensure that our clients have access to the best tools, resources, and expertise. Our
                unwavering dedication to your financial well-being is the cornerstone of our success, and we look
                forward to being your trusted partner on your path to financial prosperity.
              </p>
              <div className="space-y-3 lg:space-y-4">
                {[
                  { icon: Brain, text: "Cutting-edge AI-powered trading algorithms" },
                  { icon: Heart, text: "Dedicated to client financial well-being" },
                  { icon: Lightbulb, text: "Continuous innovation and improvement" },
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <item.icon className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-3" />
                    <span className="text-sm lg:text-base text-gray-700">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
                <div className="grid grid-cols-2 gap-4 lg:gap-6 mb-6 lg:mb-8">
                  {[
                    { icon: Building, label: "Global Reach", value: 50, suffix: "+ Countries" },
                    { icon: Users, label: "Active Users", value: 100, suffix: "K+" },
                    { icon: DollarSign, label: "Trading Volume", value: 2, suffix: "B+" },
                    { icon: Award, label: "Success Rate", value: 94, suffix: "%" },
                  ].map((stat, index) => (
                    <motion.div
                      key={stat.label}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center"
                    >
                      <stat.icon className="w-6 h-6 lg:w-8 lg:h-8 mx-auto mb-2" />
                      <div className="text-xl lg:text-2xl font-bold">
                        <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                      </div>
                      <div className="text-xs lg:text-sm opacity-90">{stat.label}</div>
                    </motion.div>
                  ))}
                </div>
                <p className="text-center text-sm lg:text-lg font-medium">
                  TRADY X boasts a top-notch team and cutting-edge, user-friendly software. Our in-house developed
                  technology is the result of years of experience and a deep understanding of your needs.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Vision Section */}
      <AnimatedSection id="vision" className="py-12 lg:py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-2 lg:order-1"
            >
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-3xl p-6 lg:p-8 text-white shadow-2xl">
                <div className="text-center mb-6 lg:mb-8">
                  <Eye className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-4" />
                  <h3 className="text-xl lg:text-2xl font-bold">Future-Ready Platform</h3>
                </div>
                <div className="grid grid-cols-2 gap-3 lg:gap-4">
                  {[
                    { icon: Zap, label: "Lightning Fast" },
                    { icon: Lock, label: "Ultra Secure" },
                    { icon: Globe, label: "Worldwide Access" },
                    { icon: Sparkles, label: "AI Powered" },
                  ].map((feature, index) => (
                    <motion.div
                      key={feature.label}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className="text-center p-3 lg:p-4 bg-white/10 rounded-xl backdrop-blur-sm"
                    >
                      <feature.icon className="w-5 h-5 lg:w-6 lg:h-6 mx-auto mb-2" />
                      <p className="text-xs lg:text-sm font-medium">{feature.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="order-1 lg:order-2"
            >
              <div className="flex items-center mb-4 lg:mb-6">
                <Eye className="w-8 h-8 lg:w-12 lg:h-12 text-blue-600 mr-3 lg:mr-4" />
                <h2 className="text-3xl lg:text-5xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  Our Vision
                </h2>
              </div>
              <p className="text-base lg:text-lg text-gray-600 mb-6 lg:mb-8 leading-relaxed">
                At TRADY X, our top priority is ensuring that our clients enjoy a seamless, pleasurable, and secure
                experience. We take numerous measures to safeguard your interests, providing you with the confidence and
                peace of mind to navigate the dynamic world of financial markets. Whether you are an experienced trader
                or just starting on your financial journey, we are here to guide you towards success.
              </p>
              <div className="space-y-3 lg:space-y-4">
                {[
                  "Seamless user experience across all platforms",
                  "Advanced security measures and protocols",
                  "24/7 expert support and guidance",
                  "Continuous platform evolution and improvement",
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="w-5 h-5 lg:w-6 lg:h-6 text-green-600 mr-3" />
                    <span className="text-sm lg:text-base text-gray-700">{item}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Team Section */}
      <AnimatedSection id="team" className="py-12 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
          >
            Expert Team
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-lg lg:text-xl text-gray-600 mb-12 lg:mb-16 max-w-3xl mx-auto"
          >
            Our world-class team of financial experts, developers, and strategists work tirelessly to deliver
            exceptional results
          </motion.p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {[
              {
                icon: Brain,
                title: "AI Specialists",
                description: "Machine learning experts developing next-generation trading algorithms",
                services: ["Algorithm Development", "Risk Analysis", "Market Prediction", "Performance Optimization"],
              },
              {
                icon: Shield,
                title: "Security Experts",
                description: "Cybersecurity professionals ensuring maximum protection of your assets",
                services: ["Penetration Testing", "Encryption Protocols", "Fraud Prevention", "Compliance Monitoring"],
              },
              {
                icon: TrendingUp,
                title: "Market Analysts",
                description: "Seasoned traders with decades of experience in global financial markets",
                services: ["Market Research", "Technical Analysis", "Strategy Development", "Risk Management"],
              },
              {
                icon: Users,
                title: "Support Team",
                description: "Dedicated customer success specialists available 24/7 for your needs",
                services: ["24/7 Support", "Account Management", "Training Programs", "Technical Assistance"],
              },
            ].map((team, index) => (
              <motion.div
                key={team.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <div className="p-3 lg:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4 mx-auto w-fit">
                  <team.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                </div>
                <h3 className="text-lg lg:text-xl font-bold text-gray-800 mb-3">{team.title}</h3>
                <p className="text-sm lg:text-base text-gray-600 mb-4">{team.description}</p>
                <div className="space-y-2">
                  {team.services.map((service, idx) => (
                    <div key={idx} className="flex items-center text-xs lg:text-sm text-gray-700">
                      <CheckCircle className="w-3 h-3 lg:w-4 lg:h-4 text-emerald-600 mr-2" />
                      {service}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Founder Section - Dark Background with Logo */}
      <AnimatedSection
        id="founder"
        className="relative overflow-hidden py-12 lg:py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
        <div className="relative z-10">
          <div className="max-w-7xl mx-auto relative z-10">
            <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <Image
                  src="/images/founder.jpg"
                  alt="Founder - Jirolu Saka Tama"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h2 className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  Meet Our Founder
                </h2>
                <h3 className="text-xl lg:text-2xl font-semibold text-gray-200 mb-4">Jirolu Saka Tama</h3>
                <p className="text-base lg:text-lg text-gray-300 mb-6 leading-relaxed">
                  Visionary leader with over 15 years of experience in financial markets and blockchain technology.
                  Committed to democratizing access to advanced trading tools and creating sustainable wealth for our
                  community.
                </p>
                <div className="space-y-3">
                  {[
                    "15+ Years Financial Markets Experience",
                    "Blockchain Technology Pioneer",
                    "Community-First Leadership",
                    "Innovation & Excellence Focus",
                  ].map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-400 mr-3" />
                      <span className="text-sm lg:text-base text-gray-300">{achievement}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </AnimatedSection>

      {/* Business Plan Section */}
      <AnimatedSection id="business" className="py-12 lg:py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Business Plan
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Strategic roadmap for sustainable growth and maximum returns
            </motion.p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: Rocket,
                title: "Phase 1: Foundation",
                timeline: "Q1-Q2 2024",
                features: [
                  "Platform Launch",
                  "Core Trading Features",
                  "Security Implementation",
                  "Initial User Onboarding",
                ],
              },
              {
                icon: TrendingUp,
                title: "Phase 2: Expansion",
                timeline: "Q3-Q4 2024",
                features: ["Advanced Analytics", "Mobile Application", "API Integration", "Global Market Access"],
              },
              {
                icon: Crown,
                title: "Phase 3: Innovation",
                timeline: "2025 & Beyond",
                features: ["AI Trading Bots", "DeFi Integration", "NFT Marketplace", "Metaverse Presence"],
              },
            ].map((phase, index) => (
              <motion.div
                key={phase.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="relative"
              >
                <Card className="h-full bg-white/80 backdrop-blur-sm border-emerald-100 hover:shadow-xl transition-all duration-300">
                  <CardHeader className="text-center pb-4">
                    <div className="p-3 lg:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4 mx-auto w-fit">
                      <phase.icon className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                    </div>
                    <CardTitle className="text-lg lg:text-xl font-bold text-gray-800">{phase.title}</CardTitle>
                    <p className="text-sm lg:text-base text-emerald-600 font-medium">{phase.timeline}</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {phase.features.map((feature, idx) => (
                        <div key={idx} className="flex items-center">
                          <CheckCircle className="w-4 h-4 lg:w-5 lg:h-5 text-emerald-600 mr-3" />
                          <span className="text-sm lg:text-base text-gray-700">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Rewards Section */}
      <AnimatedSection id="rewards" className="py-12 lg:py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Rewards & Bonuses
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Multiple income streams and reward tiers designed for maximum earning potential
            </motion.p>
          </div>

          {/* Types of Bonus */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-12 lg:mb-16">
            {[
              {
                icon: TrendingUp,
                title: "Trading Profit Bonus",
                description: "2% to 3% daily returns",
                detail: "Per Day @ 2X",
              },
              {
                icon: Users,
                title: "Direct Bonus",
                description: "Referral rewards",
                detail: "Instant payouts",
              },
              {
                icon: Network,
                title: "Level Profit Bonus",
                description: "Multi-level commissions",
                detail: "Up to 10 levels",
              },
              {
                icon: Gift,
                title: "Reward & Awards",
                description: "Achievement bonuses",
                detail: "Car funds & more",
              },
            ].map((bonus, index) => (
              <motion.div
                key={bonus.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100 text-center"
              >
                <div className="p-3 lg:p-4 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mb-4 mx-auto w-fit">
                  <bonus.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                </div>
                <h3 className="text-base lg:text-lg font-bold text-gray-800 mb-2">{bonus.title}</h3>
                <p className="text-sm lg:text-base text-gray-600 mb-2">{bonus.description}</p>
                <p className="text-sm lg:text-base text-emerald-600 font-medium">{bonus.detail}</p>
              </motion.div>
            ))}
          </div>

          {/* Level Profit Structure */}
          <div className="bg-white/80 backdrop-blur-sm rounded-3xl p-6 lg:p-8 shadow-xl border border-emerald-100 mb-12 lg:mb-16">
            <h3 className="text-xl lg:text-2xl font-bold text-center mb-6 lg:mb-8 text-gray-800">
              Level Profit Bonus Structure
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-3 lg:gap-4">
              {[
                { level: 1, percentage: 20 },
                { level: 2, percentage: 10 },
                { level: 3, percentage: 10 },
                { level: 4, percentage: 5 },
                { level: 5, percentage: 5 },
                { level: 6, percentage: 3 },
                { level: 7, percentage: 3 },
                { level: 8, percentage: 2 },
                { level: 9, percentage: 1 },
                { level: 10, percentage: 1 },
              ].map((level, index) => (
                <motion.div
                  key={level.level}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white rounded-xl p-3 lg:p-4 text-center"
                >
                  <div className="text-xs lg:text-sm font-medium mb-1">Level {level.level}</div>
                  <div className="text-base lg:text-lg font-bold">
                    <AnimatedCounter end={level.percentage} suffix="%" />
                  </div>
                </motion.div>
              ))}
            </div>
            <div className="text-center mt-4 lg:mt-6">
              <p className="text-sm lg:text-base text-gray-600">
                <strong>Requirements:</strong> 5 Direct • 2nd Level Open • Next 08 Direct 10th Level Open
              </p>
            </div>
          </div>

          {/* All Reward Tiers */}
          <div className="space-y-8 lg:space-y-12">
            <h3 className="text-2xl lg:text-3xl font-bold text-center mb-8 lg:mb-12 text-gray-800">
              Achievement Tiers
            </h3>

            {/* CORE Tier */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="relative">
                <Image
                  src="/images/core.jpg"
                  alt="CORE Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-200">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-500 to-gray-700 rounded-xl mr-4">
                    <Award className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">CORE Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={500} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={5} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={25} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={25000} />
                  </p>
                  <p className="text-emerald-600 font-semibold mt-4">Reward: Recognition Certificate</p>
                </div>
              </div>
            </motion.div>

            {/* BRONZE Tier */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-orange-200 order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-orange-400 to-orange-600 rounded-xl mr-4">
                    <Award className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">BRONZE Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={1000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={10} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={50} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={50000} />
                  </p>
                  <p className="text-orange-600 font-semibold mt-4">
                    Reward: $<AnimatedCounter end={2000} /> Cash Bonus
                  </p>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <Image
                  src="/images/bronze.jpg"
                  alt="BRONZE Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </motion.div>

            {/* SILVER Tier */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="relative">
                <Image
                  src="/images/silver.jpg"
                  alt="SILVER Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-gray-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-gray-400 to-gray-600 rounded-xl mr-4">
                    <Award className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">SILVER Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={2000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={15} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={100} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={125000} />
                  </p>
                  <div className="flex items-center mt-4">
                    <Car className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-2" />
                    <p className="text-emerald-600 font-semibold">
                      $<AnimatedCounter end={5000} /> Car Fund (Hyundai Venue)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* GOLD Tier */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-yellow-300 order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-xl mr-4">
                    <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">GOLD Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={4000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={20} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={200} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={300000} />
                  </p>
                  <div className="flex items-center mt-4">
                    <Car className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-2" />
                    <p className="text-emerald-600 font-semibold">
                      $<AnimatedCounter end={11000} /> Car Fund (Mahindra Thar)
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <Image
                  src="/images/gold.jpg"
                  alt="GOLD Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </motion.div>

            {/* CROWN Tier */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="relative">
                <Image
                  src="/images/crown.jpg"
                  alt="CROWN Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-purple-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-purple-500 to-purple-700 rounded-xl mr-4">
                    <Crown className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">CROWN Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={6000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={30} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={500} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={1500000} />
                  </p>
                  <div className="flex items-center mt-4">
                    <Car className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-2" />
                    <p className="text-emerald-600 font-semibold">
                      $<AnimatedCounter end={25000} /> Car Fund (BMW 3 Series)
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* EMERALD Tier */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-emerald-300 order-2 lg:order-1">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-emerald-700 rounded-xl mr-4">
                    <Gem className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">EMERALD Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={8000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={40} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={750} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={5000000} />
                  </p>
                  <div className="flex items-center mt-4">
                    <Car className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-2" />
                    <p className="text-emerald-600 font-semibold">
                      $<AnimatedCounter end={50000} /> Car Fund (Mercedes C-Class)
                    </p>
                  </div>
                </div>
              </div>
              <div className="relative order-1 lg:order-2">
                <Image
                  src="/images/emerald.jpg"
                  alt="EMERALD Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
            </motion.div>

            {/* TOPAZ Tier */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="grid lg:grid-cols-2 gap-6 lg:gap-8 items-center"
            >
              <div className="relative">
                <Image
                  src="/images/topaz.jpg"
                  alt="TOPAZ Tier"
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-xl w-full"
                />
              </div>
              <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 lg:p-8 shadow-lg border border-blue-300">
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl mr-4">
                    <Gem className="w-6 h-6 lg:w-8 lg:h-8 text-white" />
                  </div>
                  <h4 className="text-xl lg:text-2xl font-bold text-gray-800">TOPAZ Tier</h4>
                </div>
                <div className="space-y-2 text-sm lg:text-base text-gray-700">
                  <p>
                    <strong>Self Business:</strong> $<AnimatedCounter end={10000} />
                  </p>
                  <p>
                    <strong>Direct:</strong> <AnimatedCounter end={50} />
                  </p>
                  <p>
                    <strong>Team Size:</strong> <AnimatedCounter end={1000} />
                  </p>
                  <p>
                    <strong>Team Business:</strong> $<AnimatedCounter end={10000000} />
                  </p>
                  <div className="flex items-center mt-4">
                    <Car className="w-5 h-5 lg:w-6 lg:h-6 text-emerald-600 mr-2" />
                    <p className="text-emerald-600 font-semibold">Fully Paid Defender (Ex-Showroom)</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </AnimatedSection>

      {/* Terms Section */}
      <AnimatedSection id="terms" className="py-12 lg:py-20 px-4 bg-white/50 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12 lg:mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl lg:text-5xl font-bold mb-4 lg:mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent"
            >
              Terms & Conditions
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="text-lg lg:text-xl text-gray-600 max-w-3xl mx-auto"
            >
              Clear and transparent terms for a secure trading experience
            </motion.p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[
              {
                icon: DollarSign,
                title: "Minimum Withdrawal",
                detail: "$20 Multiple",
                description: "Flexible withdrawal amounts starting from $20",
              },
              {
                icon: Clock,
                title: "Withdrawal Timing",
                detail: "24 Hours",
                description: "Process withdrawals within 24 hours",
              },
              {
                icon: CreditCard,
                title: "Transaction Charge",
                detail: "5%",
                description: "Competitive transaction fees",
              },
              {
                icon: TrendingUp,
                title: "Working Limit",
                detail: "2X Working/Non-Working",
                description: "Balanced earning structure",
              },
              {
                icon: Users,
                title: "Withdrawal Requirements",
                detail: "5 Direct + 2 Levels Open",
                description: "Minimum team requirements for withdrawals",
              },
              {
                icon: Wallet,
                title: "Payment Method",
                detail: "BEP-20",
                description: "Secure blockchain-based payments",
              },
            ].map((term, index) => (
              <motion.div
                key={term.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-4 lg:p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-emerald-100"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl mr-3 lg:mr-4">
                    <term.icon className="w-5 h-5 lg:w-6 lg:h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-base lg:text-lg font-bold text-gray-800">{term.title}</h3>
                    <p className="text-sm lg:text-base text-emerald-600 font-semibold">{term.detail}</p>
                  </div>
                </div>
                <p className="text-sm lg:text-base text-gray-600">{term.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </AnimatedSection>

      {/* Thank You Section - Dark Background with Logo */}
      {/* <AnimatedSection className="py-12 lg:py-20 px-4 bg-gradient-to-br from-gray-900 via-gray-800 to-emerald-900 text-white">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="bg-gradient-to-br from-emerald-500 to-teal-500 rounded-3xl p-8 lg:p-12 text-white shadow-2xl"
          >
            <Sparkles className="w-12 h-12 lg:w-16 lg:h-16 mx-auto mb-6" />
            <h2 className="text-3xl lg:text-5xl font-bold mb-6">Thank You!</h2>
            <p className="text-lg lg:text-xl mb-8 opacity-90">
              Ready to start your journey with TRADY X? Join thousands of successful traders worldwide.
            </p>
            <Button
              size="lg"
              onClick={() => window.open("https://tradyx.pro", "_blank")}
              className="bg-white text-emerald-600 hover:bg-gray-100 px-6 lg:px-8 py-3 lg:py-4 text-base lg:text-lg rounded-full shadow-lg hover:shadow-xl transition-all duration-300 group"
            >
              Start Trading Now
              <ArrowUpRight className="ml-2 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform w-4 h-4 lg:w-5 lg:h-5" />
            </Button>
          </motion.div>
        </div>
      </AnimatedSection> */}

      {/* Footer - Dark Background with Logo */}
      <footer className="py-12 lg:py-16 px-4 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/20 to-teal-900/20" />
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8 mb-8 lg:mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center justify-center mb-6">
                <Image
                  src="/images/logo.png"
                  alt="TRADY X"
                  width={60}
                  height={60}
                  className="w-12 h-12 lg:w-15 lg:h-15"
                />
              </div>
              <p className="text-gray-400 text-center text-sm lg:text-base">
                Empowering your financial future through innovative crypto solutions.
              </p>
            </motion.div>

            {[
              {
                title: "Quick Links",
                links: [
                  { name: "About Us", href: "about" },
                  { name: "Mission", href: "mission" },
                  { name: "Vision", href: "vision" },
                  { name: "Rewards", href: "rewards" },
                ],
              },
              {
                title: "Legal",
                links: [
                  { name: "Terms & Conditions", href: "terms" },
                  { name: "Business Plan", href: "business" },
                  { name: "Expert Team", href: "team" },
                  { name: "Get Started", href: "https://tradyx.pro", external: true },
                ],
              },
              {
                title: "Contact",
                content: (
                  <div className="space-y-3 lg:space-y-4 text-gray-400">
                    <div className="flex items-center">
                      <Mail className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-emerald-400" />
                      <span className="text-sm lg:text-base">support@tradyx.com</span>
                    </div>
                    <div className="flex items-center">
                      <Phone className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-emerald-400" />
                      <span className="text-sm lg:text-base">+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center">
                      <MapPin className="w-4 h-4 lg:w-5 lg:h-5 mr-3 text-emerald-400" />
                      <span className="text-sm lg:text-base">Global Operations</span>
                    </div>
                  </div>
                ),
              },
            ].map((section, index) => (
              <motion.div
                key={section.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <h4 className="text-base lg:text-lg font-semibold text-white mb-4">{section.title}</h4>
                {section.links ? (
                  <ul className="space-y-2 text-gray-400">
                    {section.links.map((link) => (
                      <li key={link.name}>
                        <motion.button
                          onClick={() => {
                            if (link.external) {
                              window.open(link.href, "_blank")
                            } else {
                              const element = document.getElementById(link.href)
                              if (element) {
                                const navbarHeight = 80
                                const elementPosition = element.offsetTop - navbarHeight
                                window.scrollTo({
                                  top: elementPosition,
                                  behavior: "smooth",
                                })
                              }
                            }
                          }}
                          className="hover:text-emerald-400 transition-colors text-left text-sm lg:text-base"
                          whileHover={{ x: 5 }}
                          transition={{ duration: 0.2 }}
                        >
                          {link.name}
                        </motion.button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  section.content
                )}
              </motion.div>
            ))}
          </div>

          <motion.div
            className="border-t border-gray-700 pt-6 lg:pt-8 text-center"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <p className="text-gray-400 text-sm lg:text-base">
              © 2024 TRADY X. All rights reserved. | Empowering Your Financial Future
            </p>
          </motion.div>
        </div>
      </footer>

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-emerald-500 to-teal-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* Floating Action Button */}
      <motion.div
        className="fixed bottom-6 right-6 lg:bottom-8 lg:right-8 z-40"
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ delay: 2, duration: 0.5 }}
      >
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white p-3 lg:p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          <ArrowRight className="w-5 h-5 lg:w-6 lg:h-6 rotate-[-90deg]" />
        </motion.button>
      </motion.div>
    </div>
  )
}
