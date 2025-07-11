"use client"

import { motion } from "framer-motion"
import { ArrowRight, Github, Zap, Target, FileText, BarChart, Download, Play, CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

export default function HowItWorksPage() {
  const steps = [
    {
      number: "01",
      title: "Paste Your Repository URL",
      description:
        "Simply copy and paste your GitHub repository URL into Code2Pitch. Our system will automatically fetch and analyze your project.",
      icon: <Github className="w-12 h-12" />,
      details: [
        "Supports public and private repositories",
        "Works with any programming language",
        "Analyzes README, code structure, and dependencies",
        "Secure processing with no code storage",
      ],
    },
    {
      number: "02",
      title: "AI Analyzes Your Code",
      description:
        "Our advanced AI examines your codebase to understand the problem you're solving, your technical approach, and the value you're creating.",
      icon: <Zap className="w-12 h-12" />,
      details: [
        "Code pattern recognition and analysis",
        "Technology stack identification",
        "Feature and functionality extraction",
        "Architecture and design pattern detection",
      ],
    },
    {
      number: "03",
      title: "Generate Pitch Materials",
      description:
        "Based on the analysis, we create a comprehensive pitch deck, demo script, and executive summary tailored for investors.",
      icon: <FileText className="w-12 h-12" />,
      details: [
        "Professional pitch deck with 10-15 slides",
        "Structured demo script with talking points",
        "Executive summary for quick overview",
        "Market analysis and competitive positioning",
      ],
    },
    {
      number: "04",
      title: "Review and Customize",
      description:
        "Review the generated materials, make any necessary adjustments, and customize the branding to match your style.",
      icon: <Target className="w-12 h-12" />,
      details: [
        "Edit content directly in the platform",
        "Customize colors and branding",
        "Add your own images and logos",
        "Preview before finalizing",
      ],
    },
    {
      number: "05",
      title: "Export and Present",
      description:
        "Download your pitch materials in multiple formats and you're ready to present to investors, mentors, or stakeholders.",
      icon: <Download className="w-12 h-12" />,
      details: ["PDF presentation format", "PowerPoint slides", "Markdown documentation", "Print-ready formats"],
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
              How Code2Pitch
              <span className="block text-gray-600">Transforms Your Code</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              From repository to investor-ready pitch in just 5 simple steps. No technical writing skills required.
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              <Play className="mr-2 w-5 h-5" />
              Watch Demo
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Steps Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-20"
          >
            {steps.map((step, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div
                  className={`flex flex-col ${index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} items-center gap-12`}
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-6">
                      <div className="text-6xl font-bold text-gray-200">{step.number}</div>
                      <div className="p-3 bg-gray-100 rounded-lg">{step.icon}</div>
                    </div>
                    <h3 className="text-3xl font-bold mb-4">{step.title}</h3>
                    <p className="text-lg text-gray-600 mb-6">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span className="text-gray-600">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className="flex-1">
                    <Card className="border-2 border-gray-200 shadow-lg">
                      <CardContent className="p-8">
                        <div className="bg-gray-50 rounded-lg p-6 h-64 flex items-center justify-center">
                          <div className="text-center">
                            {step.icon}
                            <div className="mt-4 text-lg font-semibold text-gray-600">Step {step.number} Preview</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">From Code to Pitch in Minutes</h2>
            <p className="text-xl text-gray-600">See how fast you can go from repository to presentation.</p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-300"></div>

            {[
              { time: "0:00", action: "Paste repository URL" },
              { time: "0:30", action: "AI begins code analysis" },
              { time: "1:00", action: "Content generation starts" },
              { time: "1:30", action: "Pitch deck created" },
              { time: "2:00", action: "Ready to present!" },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative flex items-center mb-8">
                <div className={`flex-1 ${index % 2 === 0 ? "text-right pr-8" : "text-left pl-8 ml-auto"}`}>
                  <div className="bg-white p-4 rounded-lg shadow-md border-2 border-gray-200">
                    <div className="font-bold text-lg">{item.time}</div>
                    <div className="text-gray-600">{item.action}</div>
                  </div>
                </div>
                <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-black rounded-full border-4 border-white shadow-lg"></div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* What You Get Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">What You Get</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Complete pitch materials ready for any presentation scenario.
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
                icon: <FileText className="w-8 h-8" />,
                title: "Pitch Deck",
                description: "10-15 professional slides covering problem, solution, market, and ask",
                features: [
                  "Problem statement",
                  "Solution overview",
                  "Market analysis",
                  "Business model",
                  "Financial projections",
                ],
              },
              {
                icon: <Play className="w-8 h-8" />,
                title: "Demo Script",
                description: "Structured walkthrough of your product with key talking points",
                features: [
                  "Feature highlights",
                  "User journey",
                  "Technical benefits",
                  "Q&A preparation",
                  "Timing guidance",
                ],
              },
              {
                icon: <BarChart className="w-8 h-8" />,
                title: "Executive Summary",
                description: "One-page overview perfect for investor meetings and follow-ups",
                features: [
                  "Company overview",
                  "Market opportunity",
                  "Competitive advantage",
                  "Team highlights",
                  "Investment ask",
                ],
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-gray-200 hover:border-black transition-colors duration-300 h-full">
                  <CardContent className="p-8">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-4 text-center">{item.title}</h3>
                    <p className="text-gray-600 mb-6 text-center">{item.description}</p>
                    <ul className="space-y-2">
                      {item.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span className="text-sm text-gray-600">{feature}</span>
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

      {/* CTA Section */}
      <section className="py-20 bg-black text-white px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Try It Yourself?</h2>
            <p className="text-xl text-gray-300 mb-8">
              See how easy it is to transform your code into a compelling pitch.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg">
              Start Your Free Pitch
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
