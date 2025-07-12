"use client"

import { motion } from "framer-motion"
import {
  ArrowRight,
  CheckCircle,
  Zap,
  Target,
  Users,
  FileText,
  BarChart,
  Lightbulb,
  Download,
  Clock,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"

const fadeInUp = {
  initial: { opacity: 0, y: 60 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 },
}

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

export default function FeaturesPage() {
  const features = [
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI-Powered Analysis",
      description:
        "Advanced algorithms analyze your codebase, README, and project structure to understand what you've built.",
      benefits: [
        "Code pattern recognition",
        "Technology stack identification",
        "Architecture analysis",
        "Feature extraction",
      ],
    },
    {
      icon: <FileText className="w-8 h-8" />,
      title: "Pitch Deck Generation",
      description:
        "Automatically create professional pitch decks with problem statement, solution, and market opportunity.",
      benefits: ["Professional templates", "Investor-focused content", "Visual storytelling", "Brand customization"],
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Demo Script Creation",
      description: "Get a structured demo script that highlights your product's key features and value proposition.",
      benefits: ["Step-by-step walkthrough", "Key talking points", "Technical explanations", "Q&A preparation"],
    },
    {
      icon: <BarChart className="w-8 h-8" />,
      title: "Market Analysis",
      description: "Receive insights about your target market, competition, and positioning strategy.",
      benefits: ["Market size estimation", "Competitive landscape", "Positioning strategy", "Growth opportunities"],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Investor Summary",
      description:
        "Executive summary tailored for investors, highlighting business potential and technical innovation.",
      benefits: ["Executive overview", "Financial projections", "Team highlights", "Investment ask"],
    },
    {
      icon: <Download className="w-8 h-8" />,
      title: "Multiple Export Formats",
      description: "Export your pitch materials in various formats including PDF, PowerPoint, and Markdown.",
      benefits: ["PDF presentations", "PowerPoint slides", "Markdown documents", "Custom branding"],
    },
  ]

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Powerful Features for
              <span className="block text-gray-600">Perfect Pitches</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Everything you need to transform your GitHub repository into a compelling investor presentation.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
          >
            {features.map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-gray-200 hover:border-black transition-all duration-300 h-full group">
                  <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="p-3 bg-gray-100 rounded-lg group-hover:bg-black group-hover:text-white transition-colors duration-300">
                        {feature.icon}
                      </div>
                      <CardTitle className="text-xl">{feature.title}</CardTitle>
                    </div>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {feature.benefits.map((benefit, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{benefit}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It All Works Together</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our integrated approach ensures every aspect of your pitch is cohesive and compelling.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {[
              {
                step: "Analyze",
                icon: <Lightbulb className="w-12 h-12" />,
                title: "Deep Code Analysis",
                description:
                  "AI examines your repository structure, dependencies, and documentation to understand your project's core value.",
              },
              {
                step: "Generate",
                icon: <FileText className="w-12 h-12" />,
                title: "Content Creation",
                description:
                  "Automatically generate pitch decks, demo scripts, and summaries tailored to your specific project and audience.",
              },
              {
                step: "Refine",
                icon: <Target className="w-12 h-12" />,
                title: "Polish & Export",
                description:
                  "Review, customize, and export your materials in multiple formats ready for any presentation scenario.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-center">
                  <div className="mb-6 flex justify-center">{item.icon}</div>
                  <div className="text-sm font-semibold text-gray-500 mb-2">{item.step.toUpperCase()}</div>
                  <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                  <p className="text-gray-600">{item.description}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Why Developers Choose Code2Pitch</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {[
              {
                icon: <Clock className="w-8 h-8" />,
                title: "Save Hours",
                description: "What takes days now takes minutes",
              },
              {
                icon: <Target className="w-8 h-8" />,
                title: "Investor Ready",
                description: "Professional quality presentations",
              },
              {
                icon: <Zap className="w-8 h-8" />,
                title: "No Learning Curve",
                description: "Just paste your repo URL and go",
              },
              {
                icon: <CheckCircle className="w-8 h-8" />,
                title: "Proven Results",
                description: "Used by 500+ successful pitches",
              },
            ].map((benefit, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="text-center p-6 border-2 border-gray-200 hover:border-black transition-colors duration-300">
                  <CardContent className="pt-6">
                    <div className="mb-4 flex justify-center">{benefit.icon}</div>
                    <h3 className="font-semibold mb-2">{benefit.title}</h3>
                    <p className="text-sm text-gray-600">{benefit.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-black text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Experience These Features?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Try Code2Pitch free and see how easy it is to create professional pitches.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg">
              Start Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
