"use client"

import { motion } from "framer-motion"
import { Mail, MessageSquare, Phone, MapPin, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-white text-black">
      <Header />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }}>
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
              Have questions about Code2Pitch? Need help with your pitch? We're here to help you succeed.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Options */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16"
          >
            {[
              {
                icon: <Mail className="w-8 h-8" />,
                title: "Email Support",
                description: "Get help with technical issues or general questions",
                contact: "support@code2pitch.com",
                action: "Send Email",
              },
              {
                icon: <MessageSquare className="w-8 h-8" />,
                title: "Live Chat",
                description: "Chat with our team for immediate assistance",
                contact: "Available 9 AM - 6 PM PST",
                action: "Start Chat",
              },
              {
                icon: <Phone className="w-8 h-8" />,
                title: "Enterprise Sales",
                description: "Discuss custom solutions for your organization",
                contact: "+1 (555) 123-4567",
                action: "Schedule Call",
              },
            ].map((option, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card className="border-2 border-gray-200 hover:border-black transition-colors duration-300 text-center h-full">
                  <CardHeader>
                    <div className="mx-auto mb-4 p-3 bg-gray-100 rounded-lg w-fit">{option.icon}</div>
                    <CardTitle className="text-xl">{option.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 mb-4">{option.description}</p>
                    <p className="font-semibold mb-4">{option.contact}</p>
                    <Button
                      variant="outline"
                      className="border-black text-black hover:bg-black hover:text-white bg-transparent"
                    >
                      {option.action}
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {/* Contact Form */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="border-2 border-gray-200">
                <CardHeader>
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                  <p className="text-gray-600">Fill out the form below and we'll get back to you within 24 hours.</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" type="email" placeholder="john@example.com" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="subject">Subject</Label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a topic" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General Question</SelectItem>
                        <SelectItem value="technical">Technical Support</SelectItem>
                        <SelectItem value="billing">Billing Question</SelectItem>
                        <SelectItem value="enterprise">Enterprise Sales</SelectItem>
                        <SelectItem value="partnership">Partnership</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">Message</Label>
                    <Textarea id="message" placeholder="Tell us how we can help you..." className="min-h-[120px]" />
                  </div>

                  <Button className="w-full bg-black text-white hover:bg-gray-800">
                    <Send className="mr-2 w-4 h-4" />
                    Send Message
                  </Button>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">Frequently Asked Questions</h3>
                <div className="space-y-4">
                  {[
                    {
                      question: "How quickly can I get my pitch?",
                      answer: "Most pitches are generated within 2-3 minutes of submitting your repository URL.",
                    },
                    {
                      question: "Can you help with pitch presentation?",
                      answer:
                        "Yes! Our team offers pitch coaching and presentation training for Pro and Team plan users.",
                    },
                    {
                      question: "Do you support private repositories?",
                      answer: "Yes, we support both public and private GitHub repositories with secure processing.",
                    },
                    {
                      question: "What if I'm not satisfied?",
                      answer: "We offer a 30-day money-back guarantee and will work with you to improve your pitch.",
                    },
                  ].map((faq, index) => (
                    <div key={index} className="border-l-4 border-gray-200 pl-4">
                      <h4 className="font-semibold mb-2">{faq.question}</h4>
                      <p className="text-gray-600 text-sm">{faq.answer}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-gray-50 rounded-lg p-6">
                <div className="flex items-center gap-3 mb-4">
                  <MapPin className="w-6 h-6" />
                  <h3 className="text-xl font-semibold">Our Office</h3>
                </div>
                <div className="space-y-2 text-gray-600">
                  <p>Code2Pitch Inc.</p>
                  <p>123 Innovation Drive</p>
                  <p>San Francisco, CA 94105</p>
                  <p>United States</p>
                </div>
              </div>

              <div className="bg-black text-white rounded-lg p-6">
                <h3 className="text-xl font-semibold mb-4">Need Immediate Help?</h3>
                <p className="text-gray-300 mb-4">
                  Check out our comprehensive help center with guides, tutorials, and troubleshooting tips.
                </p>
                <Button
                  variant="outline"
                  className="border-white text-white hover:bg-white hover:text-black bg-transparent"
                >
                  Visit Help Center
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
