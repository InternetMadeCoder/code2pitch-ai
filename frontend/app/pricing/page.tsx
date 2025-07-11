"use client"

import { motion } from "framer-motion"
import { ArrowRight, Check, Star, Zap } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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

export default function PricingPage() {
  const plans = [
    {
      name: "Free",
      price: "$0",
      period: "forever",
      description: "Perfect for trying out Code2Pitch",
      features: ["1 pitch per month", "Basic pitch deck", "Demo script", "PDF export", "Community support"],
      cta: "Get Started Free",
      popular: false,
    },
    {
      name: "Pro",
      price: "$29",
      period: "per month",
      description: "For developers who pitch regularly",
      features: [
        "10 pitches per month",
        "Advanced pitch decks",
        "Demo scripts & summaries",
        "All export formats",
        "Custom branding",
        "Priority support",
        "Market analysis",
        "Competitor insights",
      ],
      cta: "Start Pro Trial",
      popular: true,
    },
    {
      name: "Team",
      price: "$99",
      period: "per month",
      description: "For teams and organizations",
      features: [
        "Unlimited pitches",
        "Team collaboration",
        "Advanced analytics",
        "Custom templates",
        "White-label options",
        "Dedicated support",
        "API access",
        "SSO integration",
      ],
      cta: "Contact Sales",
      popular: false,
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
              Simple, Transparent
              <span className="block text-gray-600">Pricing</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Choose the plan that fits your needs. Start free and upgrade as you grow.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {plans.map((plan, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card
                  className={`relative border-2 transition-all duration-300 h-full ${
                    plan.popular ? "border-black shadow-2xl scale-105" : "border-gray-200 hover:border-black"
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <Badge className="bg-black text-white px-4 py-1">
                        <Star className="w-4 h-4 mr-1" />
                        Most Popular
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-8">
                    <CardTitle className="text-2xl font-bold mb-2">{plan.name}</CardTitle>
                    <div className="mb-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-gray-600 ml-2">{plan.period}</span>
                    </div>
                    <p className="text-gray-600">{plan.description}</p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button
                      className={`w-full ${
                        plan.popular
                          ? "bg-black text-white hover:bg-gray-800"
                          : "border-black text-black hover:bg-black hover:text-white"
                      }`}
                      variant={plan.popular ? "default" : "outline"}
                      size="lg"
                    >
                      {plan.cta}
                      {plan.name !== "Team" && <ArrowRight className="ml-2 w-4 h-4" />}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50 px-4">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Frequently Asked Questions</h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {[
              {
                question: "Can I try Code2Pitch for free?",
                answer: "Yes! Our free plan includes 1 pitch per month with basic features. No credit card required.",
              },
              {
                question: "What happens if I exceed my monthly limit?",
                answer: "You'll be prompted to upgrade to a higher plan. Your existing pitches remain accessible.",
              },
              {
                question: "Can I cancel my subscription anytime?",
                answer: "Absolutely. Cancel anytime from your account settings. No long-term commitments.",
              },
              {
                question: "Do you offer refunds?",
                answer: "Yes, we offer a 30-day money-back guarantee for all paid plans.",
              },
              {
                question: "Is my code secure?",
                answer:
                  "We only analyze your repository metadata and don't store your actual code. Everything is processed securely.",
              },
              {
                question: "Can I customize the generated pitches?",
                answer:
                  "Yes! All plans include editing capabilities. Pro and Team plans offer advanced customization options.",
              },
            ].map((faq, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-gray-200 hover:border-black transition-colors duration-300">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{faq.question}</h3>
                    <p className="text-gray-600">{faq.answer}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Enterprise Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Zap className="w-16 h-16 mx-auto mb-6" />
            <h2 className="text-4xl font-bold mb-6">Need Something Custom?</h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Large organization? Special requirements? We offer custom enterprise solutions with dedicated support and
              tailored features.
            </p>
            <Button size="lg" className="bg-black text-white hover:bg-gray-800 px-8 py-4 text-lg">
              Contact Enterprise Sales
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Start Pitching?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Join thousands of developers who've successfully pitched their projects.
            </p>
            <Button size="lg" className="bg-white text-black hover:bg-gray-200 px-8 py-4 text-lg">
              Start Your Free Trial
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
