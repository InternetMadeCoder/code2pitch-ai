"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { ArrowRight, Github, Zap, Target, Users, CheckCircle, TrendingUp } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { generatePitch } from "../services/generatePitch";

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

export default function HomePage() {
  const [repoUrl, setRepoUrl] = useState("")
  const [result, setResult] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setLoading(true);
    setError("");
    setResult(null);
    try {
      const data = await generatePitch(repoUrl);
      setResult(data);
    } catch (err) {
      setError("Could not generate pitch. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-white text-black">
      <Header />
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            <h1 className="text-6xl md:text-7xl font-bold mb-6 leading-tight">
              From <span className="text-black bg-gradient-to-r from-gray-600 to-black bg-clip-text">Code</span> to{" "}
              <span className="relative">
                Pitch
                <motion.div
                  className="absolute -bottom-2 left-0 right-0 h-1 bg-black"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{ delay: 0.8, duration: 0.6 }}
                />
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Paste your GitHub repo → instantly get a clear pitch, demo script, and summary. Turn your code into
              investor-friendly language.
            </p>
          </motion.div>

          <form onSubmit={handleSubmit}>
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <input
              type="url"
              placeholder="https://github.com/username/repo"
              value={repoUrl}
              onChange={(e) => setRepoUrl(e.target.value)}
              className="px-6 py-2 border border-black rounded-lg w-full sm:w-96 text-lg focus:outline-none focus:border-black"
            />
            <Button
              size="lg"
                type="submit"
                disabled={loading}
              className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg"
            >
                {loading ? "Generating..." : "Generate Pitch"}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            </div>
          </form>
          {error && <p className="text-red-600 text-center mt-2">{error}</p>}
          {result && (
            <div className="max-w-4xl w-full mx-auto mt-8 bg-white border border-black rounded-lg p-8 shadow">
              <h2 className="text-2xl font-bold mb-2">Summary</h2>
              <p className="mb-4">{result.summary}</p>
              <h2 className="text-2xl font-bold mb-2">Elevator Pitch</h2>
              <p className="mb-4">{result.elevator_pitch}</p>
              <h2 className="text-2xl font-bold mb-2">Demo Script</h2>
              <p className="mb-4">{result.demo_script}</p>
              <h2 className="text-2xl font-bold mb-2">Tagline</h2>
              <p>{result.tagline}</p>
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              variant="outline"
              size="lg"
              className="border-black text-black hover:bg-black hover:text-white px-8 py-4 text-lg bg-transparent"
            >
              <Github className="mr-2 w-5 h-5" />
              View Demo
            </Button>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="relative"
          >
            <div className="bg-black rounded-lg p-8 shadow-2xl max-w-4xl mx-auto">
              <div className="bg-white rounded-lg p-6 text-left">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="ml-4 text-gray-500 text-sm">github.com/yourrepo</span>
                </div>
                <div className="space-y-2 text-sm font-mono">
                  <div className="text-gray-600">{"// Your messy code becomes..."}</div>
                  <div className="text-black font-semibold">🎯 Clear Value Proposition</div>
                  <div className="text-black font-semibold">📊 Market Analysis</div>
                  <div className="text-black font-semibold">💡 Demo Script</div>
                  <div className="text-black font-semibold">🚀 Investor Summary</div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
       {/* Stats Section */}
       <section className="py-20 bg-black text-white">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center"
          >
            {[
              { number: "10K+", label: "Repos Analyzed" },
              { number: "500+", label: "Successful Pitches" },
              { number: "95%", label: "Accuracy Rate" },
              { number: "2min", label: "Average Time" },
            ].map((stat, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-gray-400">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">The Developer's Dilemma</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              You build amazing things, but explaining them? That's the hard part.
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
                icon: <Target className="w-12 h-12" />,
                title: "Technical Jargon",
                description: "Your code is brilliant, but investors don't speak developer.",
              },
              {
                icon: <Users className="w-12 h-12" />,
                title: "Missing Context",
                description: "What problem does it solve? Why should anyone care?",
              },
              {
                icon: <TrendingUp className="w-12 h-12" />,
                title: "No Business Story",
                description: "Great tech needs a compelling business narrative.",
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-gray-200 hover:border-black transition-colors duration-300 h-full">
                  <CardContent className="p-8 text-center">
                    <div className="mb-4 flex justify-center">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-4">{item.title}</h3>
                    <p className="text-gray-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How Code2Pitch Works</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Three simple steps to transform your repository into a winning pitch.
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
                step: "01",
                title: "Paste Your Repo",
                description:
                  "Simply paste your GitHub repository URL. Our AI analyzes your code, README, and project structure.",
                icon: <Github className="w-8 h-8" />,
              },
              {
                step: "02",
                title: "AI Analysis",
                description:
                  "Advanced algorithms extract key features, identify the problem you're solving, and understand your tech stack.",
                icon: <Zap className="w-8 h-8" />,
              },
              {
                step: "03",
                title: "Get Your Pitch",
                description:
                  "Receive a professional pitch deck, demo script, and executive summary ready for investors.",
                icon: <Target className="w-8 h-8" />,
              },
            ].map((item, index) => (
              <motion.div key={index} variants={fadeInUp} className="relative">
                <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-transparent hover:border-black transition-colors duration-300">
                  <div className="text-6xl font-bold text-gray-200 mb-4">{item.step}</div>
                  <div className="flex items-center gap-3 mb-4">
                    {item.icon}
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                  </div>
                  <p className="text-gray-600">{item.description}</p>
                </div>
                {index < 2 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                    <ArrowRight className="w-8 h-8 text-gray-300" />
                  </div>
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Everything You Need to Pitch</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From technical analysis to investor-ready presentations.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {[
              "Automated Pitch Deck Generation",
              "Demo Script Creation",
              "Executive Summary",
              "Market Analysis",
              "Technical Architecture Overview",
              "Competitive Positioning",
              "Revenue Model Suggestions",
              "Investor FAQ Generation",
              "One-Click Export to PDF/PPT",
            ].map((feature, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <div className="flex items-center gap-3 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-200">
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  <span className="font-medium">{feature}</span>
                </div>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Turn Your Code Into Investment?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of developers who've successfully pitched their projects to investors and mentors.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg">
                Start Your Free Pitch
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-white text-white hover:bg-white hover:text-black px-8 py-4 text-lg bg-transparent"
              >
                View Pricing
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

     
      <Footer />
    </div>
  )
}
