"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import { CheckCircle, Upload, Zap, Eye } from "lucide-react"

interface Step {
  id: number
  title: string
  description: string
  mockupContent: React.ReactNode
}

const steps: Step[] = [
  {
    id: 1,
    title: "Upload Media Instantly",
    description:
      "Drag and drop images, videos, or audio files directly into Tracer. No complicated steps—just a seamless, user-friendly interface to start detection within seconds.",
    mockupContent: (
      <div className="bg-white rounded-lg shadow-xl border border-stone-200 p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-stone-900">Upload Your Media</h3>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Upload className="w-5 h-5 text-amber-700" />
          </div>
        </div>
        <div className="border-2 border-dashed border-stone-300 rounded-lg p-12 text-center">
          <Upload className="w-16 h-16 text-stone-400 mx-auto mb-6" />
          <p className="text-lg text-stone-600 mb-3">Drag & drop your files here</p>
          <p className="text-md text-stone-500">or click to browse</p>
        </div>
        <div className="mt-6 text-sm text-stone-500">Supported: JPG, PNG, MP4, MP3, WAV</div>
      </div>
    ),
  },
  {
    id: 2,
    title: "AI-Powered Real-Time Analysis",
    description:
      "Tracer immediately analyzes your uploaded media with industry-leading AI. DeepDetector scans images and videos while Waver handles audio, giving you accurate insights in seconds.",
    mockupContent: (
      <div className="bg-white rounded-lg shadow-xl border border-stone-200 p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-stone-900">Analysis in Progress</h3>
          <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
            <Zap className="w-5 h-5 text-amber-700" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">
              <Eye className="w-8 h-8 text-stone-600" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-medium text-stone-900">DeepDetector Analysis</div>
              <div className="w-full bg-stone-200 rounded-full h-3 mt-2">
                <div className="bg-amber-600 h-3 rounded-full w-3/4 animate-pulse"></div>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <div className="w-16 h-16 bg-stone-100 rounded-lg flex items-center justify-center">
              <Zap className="w-8 h-8 text-stone-600" />
            </div>
            <div className="flex-1">
              <div className="text-lg font-medium text-stone-900">Waver Audio Check</div>
              <div className="w-full bg-stone-200 rounded-full h-3 mt-2">
                <div className="bg-amber-600 h-3 rounded-full w-1/2 animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <div className="text-3xl font-bold text-amber-700">47s</div>
          <div className="text-md text-stone-500">remaining</div>
        </div>
      </div>
    ),
  },
  {
    id: 3,
    title: "Transparent, Explainable Results",
    description:
      "Tracer shows you why a file is flagged. Our explainable AI pinpoints manipulated areas, giving clear visual feedback so you can act with confidence.",
    mockupContent: (
      <div className="bg-white rounded-lg shadow-xl border border-stone-200 p-6 w-full max-w-xl">
        <div className="flex items-center justify-between mb-8">
          <h3 className="text-xl font-semibold text-stone-900">Analysis Complete</h3>
          <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-5 h-5 text-green-700" />
          </div>
        </div>
        <div className="space-y-6">
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="flex items-center space-x-3 mb-3">
              <CheckCircle className="w-6 h-6 text-green-600" />
              <span className="font-semibold text-green-800 text-lg">Authentic Content</span>
            </div>
            <div className="text-3xl font-bold text-green-700 mb-2">92.4%</div>
            <div className="text-md text-green-600">Credibility Score</div>
          </div>
          <div className="space-y-3">
            <div className="flex justify-between text-md">
              <span className="text-stone-600">Facial Analysis</span>
              <span className="text-green-600 font-medium">✓ Passed</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="text-stone-600">Audio Consistency</span>
              <span className="text-green-600 font-medium">✓ Passed</span>
            </div>
            <div className="flex justify-between text-md">
              <span className="text-stone-600">Metadata Check</span>
              <span className="text-green-600 font-medium">✓ Passed</span>
            </div>
          </div>
        </div>
        <button className="w-full mt-6 bg-amber-700 text-white py-3 px-4 rounded-lg hover:bg-amber-800 transition-colors text-lg">
          Download Report
        </button>
      </div>
    ),
  },
]

export default function ScrollTriggeredSteps() {
  const [activeStep, setActiveStep] = useState(1)
  const stepRefs = useRef<HTMLDivElement[]>([])

  useEffect(() => {
    const observers = stepRefs.current.map((ref, index) => {
      if (!ref) return null

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveStep(steps[index].id)
          }
        },
        {
          threshold: 0.6,
          rootMargin: "-20% 0px -20% 0px",
        },
      )

      observer.observe(ref)
      return observer
    })

    return () => {
      observers.forEach((observer) => observer?.disconnect())
    }
  }, [])

  const activeStepData = steps.find((step) => step.id === activeStep) || steps[0]

  return (
    <section className="py-16 bg-card">
      <div className="max-w-3xl mx-auto text-center mb-16 px-4">
        <h2 className="text-3xl font-bold text-foreground mb-4">Effortless Deepfake Detection in 3 Steps!</h2>
      </div>

      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Sticky Mockup - Left Side */}
          <div className="lg:sticky lg:top-24 lg:h-fit flex justify-center items-center">
            <div className="transition-all duration-500 ease-in-out w-full md:w-[90%] lg:w-[95%] xl:w-[85%]">
              {activeStepData.mockupContent}
            </div>
          </div>

          {/* Scrollable Steps - Right Side */}
          <div className="space-y-32">
            {steps.map((step, index) => (
              <div 
                key={step.id} 
                ref={(el) => { if (el) stepRefs.current[index] = el; }} 
                className="space-y-6"
              >
                <div className="flex items-center space-x-4">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg transition-colors duration-300 ${
                      activeStep === step.id ? "bg-accent text-accent-foreground" : "bg-stone-200 text-stone-600"
                    }`}
                  >
                    {step.id}
                  </div>
                  <h3 className="text-2xl font-semibold text-foreground">{step.title}</h3>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed pl-16">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
