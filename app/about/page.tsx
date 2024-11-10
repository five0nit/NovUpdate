"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronDown, ChevronUp, Brain, Gift, Database, BarChart, Zap } from "lucide-react"

export default function About() {
    const [isMissionExpanded, setIsMissionExpanded] = useState(false)

    const toggleMission = () => {
        setIsMissionExpanded(!isMissionExpanded)
    }

    const mission = {
        title: "Our Mission",
        content: "We're on a mission to make energy upgrades easy and affordable for every Aussie homeowner. No more confusing quotes or endless phone calls. We do the hard yakka for you, so you can sit back, relax, and watch the savings roll in."
    }

    const easyAs = {
        icon: <Zap className="w-8 h-8 text-primary mr-3" />,
        title: "Easy as",
        description: "Our website is a piece of cake to use. No tech degree required - just answer a few questions, and we'll do the rest."
    }

    const reasons = [
        {
            icon: <Brain className="w-8 h-8 text-primary mb-4" />,
            title: "Fair Comparisons",
            description: "Our smart system crunches the numbers to find you the best deal. No bias, no hidden fees - just honest, competitive quotes."
        },
        {
            icon: <Database className="w-8 h-8 text-primary mb-4" />,
            title: "Your Data, Your Rules",
            description: "We're crystal clear about how we use your info. It's only for getting you better quotes, and we never flog it off to others."
        },
        {
            icon: <Gift className="w-8 h-8 text-primary mb-4" />,
            title: "Share More, Save More",
            description: "The more details you give us about your home and energy needs, the better deals we can find. Plus, you'll earn rewards for being thorough!"
        },
        {
            icon: <BarChart className="w-8 h-8 text-primary mb-4" />,
            title: "Refer a Mate, Get Paid",
            description: "Know someone who could use cheaper energy? Refer them to us, and we'll give you a fair go of the savings. It's our way of saying thanks for spreading the word."
        },
    ]

    return (
        <div className="container mx-auto py-12 px-4 md:px-6 text-center">
            <motion.h1
                className="text-4xl font-bold mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                About Oz Quotes
            </motion.h1>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
            >
                <Card className="mb-12">
                    <CardContent className="p-6">
                        <p className="text-lg text-muted-foreground">
                            G'day! Oz Quotes is here to help Aussie homeowners like you get the best deals on energy upgrades.
                            We're talking solar panels, batteries, and other money-saving tech for your home.
                            We've got a clever system that compares quotes from top providers, so you don't have to.
                        </p>
                    </CardContent>
                </Card>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mb-12"
            >
                <Card className="overflow-hidden">
                    <Button
                        variant="ghost"
                        className="w-full justify-between p-6 text-left"
                        onClick={toggleMission}
                    >
                        <h2 className="text-2xl font-bold">{mission.title}</h2>
                        {isMissionExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
                    </Button>
                    {isMissionExpanded && (
                        <CardContent className="p-6">
                            <p className="text-muted-foreground">{mission.content}</p>
                        </CardContent>
                    )}
                </Card>
            </motion.div>

            <motion.h2
                className="text-3xl font-bold mb-8"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
            >
                Why Choose Oz Quotes?
            </motion.h2>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="mb-6"
            >
                <Card className="border-primary">
                    <CardContent className="p-6">
                        <div className="flex items-center justify-center">
                            {easyAs.icon}
                            <h3 className="text-xl font-bold text-primary">{easyAs.title}</h3>
                        </div>
                        <p className="text-muted-foreground mt-2">{easyAs.description}</p>
                    </CardContent>
                </Card>
            </motion.div>

            <div className="grid gap-6 sm:grid-cols-2">
                {reasons.map((reason, index) => (
                    <motion.div
                        key={reason.title}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 * (index + 6) }}
                    >
                        <Card className="h-full">
                            <CardContent className="p-6 flex flex-col items-center h-full">
                                {reason.icon}
                                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                                <p className="text-muted-foreground flex-grow">{reason.description}</p>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </div>
    )

  return (
    <div className="container mx-auto py-12 px-4 md:px-6 text-center">
      <motion.h1 
        className="text-4xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        About Oz Quotes
      </motion.h1>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <Card className="mb-12">
          <CardContent className="p-6">
            <p className="text-lg text-muted-foreground">
              G'day! Oz Quotes is here to help Aussie homeowners like you get the best deals on energy upgrades.
              We're talking solar panels, batteries, and other money-saving tech for your home. 
              We've got a clever system that compares quotes from top providers, so you don't have to.  
            </p>
          </CardContent>
        </Card>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="mb-12"
      >
        <Card className="overflow-hidden">
          <Button
            variant="ghost"
            className="w-full justify-between p-6 text-left"
            onClick={toggleMission}
          >
            <h2 className="text-2xl font-bold">{mission.title}</h2>
            {isMissionExpanded ? <ChevronUp className="h-6 w-6" /> : <ChevronDown className="h-6 w-6" />}
          </Button>
          {isMissionExpanded && (
            <CardContent className="p-6">
              <p className="text-muted-foreground">{mission.content}</p>
            </CardContent>
          )}
        </Card>
      </motion.div>

      <motion.h2
        className="text-3xl font-bold mb-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        Why Choose Oz Quotes?
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="mb-6"
      >
        <Card className="border-primary">
          <CardContent className="p-6">
            <div className="flex items-center justify-center">
              {easyAs.icon}
              <h3 className="text-xl font-bold text-primary">{easyAs.title}</h3>
            </div>
            <p className="text-muted-foreground mt-2">{easyAs.description}</p>
          </CardContent>
        </Card>
      </motion.div>

      <div className="grid gap-6 sm:grid-cols-2">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 * (index + 6) }}
          >
            <Card className="h-full">
              <CardContent className="p-6 flex flex-col items-center h-full">
                {reason.icon}
                <h3 className="text-xl font-bold mb-2">{reason.title}</h3>
                <p className="text-muted-foreground flex-grow">{reason.description}</p>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}