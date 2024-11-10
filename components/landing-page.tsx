"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import {
  Brain,
  Gift,
  Database,
  BarChart,
  Zap,
  CheckCircle,
  Star,
  Shield,
  Wand2,
  TrendingUp,
  ArrowRight
} from "lucide-react";

function LandingPageComponent() {
  const aiFeatures = [
    {
      icon: <Wand2 className="h-8 w-8 text-primary" />,
      title: "AI Image Transformation",
      description: "Visualize your home's potential with our cutting-edge AI image diffusion technology. See renovations before they happen."
    },
    {
      icon: <Shield className="h-8 w-8 text-primary" />,
      title: "Smart Protection Algorithms",
      description: "Our AI ensures fair pricing and top-quality recommendations, protecting both homeowners and trades from unfair practices."
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-primary" />,
      title: "Intelligent Matching",
      description: "Advanced algorithms connect you with the most suitable trades, guaranteeing quality, reliability, and competitive pricing."
    }
  ];

  const beforeAfterImages = [
    {
      before: "/images/BeforeRenovation.svg",
      after: "/images/AfterRenovation.svg",
      description: "Home Renovation Transformation"
    }
  ];

  const testimonials = [
    {
      name: "Sarah Thompson",
      role: "Homeowner",
      quote: "OzQuotes transformed my home renovation experience. The AI visualization helped me make confident decisions and find the right trades.",
      avatar: "/images/testimonial-1.svg"
    },
    {
      name: "Michael Rodriguez",
      role: "Construction Professional",
      quote: "The intelligent matching system has connected me with high-quality projects and clients I wouldn't have found otherwise.",
      avatar: "/images/testimonial-2.svg"
    }
  ];

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary/10 to-primary/5">
        <div className="container mx-auto px-4 py-16 lg:py-24 grid md:grid-cols-2 items-center gap-12">
          <div>
            <motion.h1 
              className="text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              Revolutionize Your Home Improvement Journey
            </motion.h1>
            
            <motion.p 
              className="text-xl text-gray-600 mb-8"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              OzQuotes empowers homeowners and trades with AI-driven solutions, transforming how home improvements are planned, visualized, and executed.
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex space-x-4"
            >
              <Link 
                href="/projects" 
                className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary-dark transition-colors inline-flex items-center"
              >
                Get Started <ArrowRight className="ml-2" />
              </Link>
              <Link 
                href="/about" 
                className="border border-primary text-primary px-6 py-3 rounded-full hover:bg-primary/10 transition-colors"
              >
                More Info
              </Link>
            </motion.div>
          </div>
          
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
          >
            <Image 
              src="/images/hero-illustration.svg" 
              alt="Home Improvement AI Visualization" 
              width={600} 
              height={500} 
              className="rounded-xl shadow-2xl"
            />
          </motion.div>
        </div>
      </div>

      {/* AI Technology Showcase */}
      <div className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Revolutionizing Home Improvements with AI
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {aiFeatures.map((feature, index) => (
              <motion.div
                key={feature.title}
                className="bg-white p-6 rounded-xl shadow-md text-center"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <div className="flex justify-center mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-3 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>

          {/* Before and After Image Showcase */}
          <div className="grid md:grid-cols-1 gap-8">
            {beforeAfterImages.map((imageSet, index) => (
              <motion.div
                key={imageSet.description}
                className="bg-white p-6 rounded-xl shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                <h3 className="text-xl font-semibold mb-4 text-center">{imageSet.description}</h3>
                <div className="flex justify-center space-x-4">
                  <div>
                    <p className="text-center mb-2">Before</p>
                    <Image 
                      src={imageSet.before} 
                      alt="Before transformation" 
                      width={300} 
                      height={200} 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                  <div>
                    <p className="text-center mb-2">After</p>
                    <Image 
                      src={imageSet.after} 
                      alt="After transformation" 
                      width={300} 
                      height={200} 
                      className="rounded-lg shadow-md"
                    />
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* AI Technology Call to Action */}
          <motion.div
            className="text-center mt-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.6 }}
          >
            <Link 
              href="/renovate" 
              className="bg-primary text-white px-8 py-4 rounded-full text-lg font-semibold hover:bg-primary-dark transition-colors inline-flex items-center"
            >
              <Wand2 className="mr-2" /> Explore AI Visualization
            </Link>
          </motion.div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="bg-white py-16">
        <div className="container mx-auto px-4">
          <motion.h2
            className="text-3xl font-bold text-center mb-12 text-gray-900"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            What Our Users Say
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                className="bg-gray-50 p-8 rounded-xl shadow-md"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.3 }}
              >
                <div className="flex items-center mb-4">
                  <Image 
                    src={testimonial.avatar} 
                    alt={testimonial.name} 
                    width={64} 
                    height={64} 
                    className="rounded-full mr-4"
                  />
                  <div>
                    <h3 className="font-bold text-lg">{testimonial.name}</h3>
                    <p className="text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-800 italic">"{testimonial.quote}"</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Final Call to Action */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <motion.h2
            className="text-4xl font-bold mb-6"
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            Ready to Transform Your Home Improvement Experience?
          </motion.h2>
          <motion.p
            className="text-xl mb-8"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Join thousands of homeowners and trades professionals leveraging AI to simplify and enhance home improvements.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Link 
              href="/profile" 
              className="bg-white text-primary px-10 py-4 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Sign Up
            </Link>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LandingPageComponent;
