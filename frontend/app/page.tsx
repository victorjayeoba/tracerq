"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Zap, Eye, Globe, Lock, TrendingUp, Search, FileText, FileCheck } from "lucide-react"
import ScrollTriggeredSteps from "@/components/scroll-triggered-steps"
import CardSwap, { Card as SwapCard } from "@/components/card-swap"
import StickyNav from "@/components/sticky-nav"
import GlassyLogo from "@/components/GlassyLogo"
import { useRouter } from "next/navigation"

export default function HomePage() {
  const router = useRouter();
  
  const handleSignup = () => {
    router.push('/signup');
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Sticky Navigation */}
      <StickyNav />
      
      {/* Empty spacer for fixed nav */}
      <div className="h-16"></div>

      {/* Hero Section */}
      <section id="hero" className="relative">
        <div className="min-h-[78vh] w-full bg-stone-50 relative">
          {/* Bottom Fade Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e7e5e4 1px, transparent 1px),
                linear-gradient(to bottom, #e7e5e4 1px, transparent 1px)
              `,
              backgroundSize: "20px 30px",
              // WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
              // maskImage: "radial-gradient(ellipse 70% 60% at 50% 100%, #000 60%, transparent 100%)",
            }}
          />

          {/* Hero Content */}
          <div className="relative z-10 pt-24 pb-16 px-4">
            <div className="max-w-7xl mx-auto flex flex-col gap-12 items-center">
              <div className="space-y-8 text-center w-full">
                <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold text-foreground leading-tight">
                  Protect Your <span className="text-accent">Online Legacy</span> from Deepfake Threats
                </h1>

                <div className="text-2xl sm:text-3xl font-bold text-accent italic">"Before you believe it, check it."</div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                  <Button 
                    size="lg" 
                    className="bg-accent text-accent-foreground hover:bg-accent/90 text-lg px-8 py-6"
                    onClick={handleSignup}
                  >
                    Try Free Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent text-lg px-8 py-6"
                    onClick={handleSignup}
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex justify-center space-x-6 pt-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-6 h-6 text-accent" />
                    <span className="text-base font-semibold text-foreground">85%+ Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-6 h-6 text-accent" />
                    <span className="text-base font-semibold text-foreground">Under 60 Seconds</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center w-full mt-8">
                <div className="relative w-full max-w-4xl">
                  <video
                    src="/hero-video.mp4"
                    className="w-full h-auto rounded-lg shadow-2xl border border-border"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-4 py-2 rounded-full text-base font-bold">
                    Live Demo
                  </div>
                </div>
              </div>

              {/* World Statistics Section */}
              <div className="w-full max-w-5xl mx-auto mt-12">
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl border border-stone-200 p-8 shadow-lg">
                  <h3 className="text-xl font-bold text-foreground mb-2 text-center">
                    Recent & Reliable Deepfake Data
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">98%</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        of deepfake videos tracked are non-consensual pornography (Security Heroes, 2023)
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">$450K</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        average organizational loss from deepfake fraud per incident (Regula, 2024)
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">$40B</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        projected AI-enabled fraud losses in U.S. by 2027, up from $12.3B in 2023 (Deloitte)
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">$603K</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        average loss per deepfake incident in financial services sector (Regula, 2024)
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">73%</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        accuracy rate for humans detecting fake speech - meaning detection is unreliable
                      </p>
                    </div>
                    <div className="text-center">
                      <div className="text-4xl font-bold text-accent mb-2">10%</div>
                      <p className="text-sm text-muted-foreground font-medium">
                        of organizations reported losses exceeding $1 million from deepfake fraud
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Why Act Now */}
      <section className="py-16 bg-card">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-4">Why Act Now? The Deepfake Crisis is Here</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto mb-12">
            AI content generation is exploding, public trust is falling, and the risks to your reputation and
            credibility have never been higher.
          </p>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <Card className="bg-background border-border">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-accent mb-2">62%</div>
                <div className="font-semibold text-lg text-foreground mb-4">People doubt what they see online</div>
                <ul className="text-left text-muted-foreground space-y-2">
                  <li>• Public trust is falling rapidly</li>
                  <li>• Misinformation spreads faster</li>
                  <li>• Reputation damage is permanent</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-accent mb-2">Free</div>
                <div className="font-semibold text-lg text-foreground mb-4">AI tools create fake content</div>
                <ul className="text-left text-muted-foreground space-y-2">
                  <li>• Easy-to-use deepfake tools</li>
                  <li>• No technical skills required</li>
                  <li>• Anyone can create fakes</li>
                </ul>
              </CardContent>
            </Card>

            <Card className="bg-background border-border">
              <CardContent className="p-6 text-center">
                <div className="text-5xl font-bold text-accent mb-2">Rising</div>
                <div className="font-semibold text-lg text-foreground mb-4">Legal and social risks</div>
                <ul className="text-left text-muted-foreground space-y-2">
                  <li>• Lawsuits from fake content</li>
                  <li>• Political manipulation</li>
                  <li>• Personal harm and trauma</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Complete Deepfake Detection Solution */}
      <section id="solutions" className="py-20 px-4 bg-gradient-to-b from-stone-50 to-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl sm:text-5xl font-bold text-foreground mb-6">
              Complete Online Legacy Protection Solution
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              Comprehensive tools to verify content authenticity and protect your digital reputation
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="bg-white border-2 border-stone-200 hover:border-accent hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <Search className="w-8 h-8 text-accent" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Forensic Analysis
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Frame-by-frame analysis, audio-visual mismatch detection, and metadata checking to flag manipulated media.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-stone-200 hover:border-accent hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <FileText className="w-8 h-8 text-accent" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Source Tracking
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Track where deepfake content first appeared online, identify perpetuators, and gather evidence for accountability.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-white border-2 border-stone-200 hover:border-accent hover:shadow-2xl transition-all duration-300 group">
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-accent/20 transition-colors">
                  <FileCheck className="w-8 h-8 text-accent" strokeWidth={2.5} />
                </div>
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Credibility Reports
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  Generate shareable PDF reports or links showing verification results with detailed credibility scores.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How Tracer Works - 3 Steps */}
      <section id="how-it-works">
      <ScrollTriggeredSteps />
      </section>

      {/* CTA with Stat */}
      {/* <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Protect Your Online Legacy Today</h2>
          <div className="mb-6">
            <GlassyLogo size={180} className="mb-4" logoSize="h-10" />
          </div>
          <p className="text-lg mb-8 opacity-90">
            Once false media spreads, the damage is hard to undo. Don't wait until your reputation is at risk—verify
            content authenticity before sharing with our AI-powered detection.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-accent text-accent-foreground hover:bg-accent/90"
              onClick={handleSignup}
            >
              Start Free Trial
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
              onClick={handleSignup}
            >
              Learn More
            </Button>
          </div>
          <div className="text-center">
            <div className="text-6xl font-bold mb-2">
              500<span className="text-4xl">+</span>
            </div>
            <p className="text-lg opacity-90">test users goal within first 2 months</p>
          </div>
        </div>
      </section> */}

      {/* Performance Metrics */}
      <section id="performance" className="py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-foreground mb-12">Reliable Performance You Can Trust</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-2">
                85<span className="text-4xl">%+</span>
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">Detection Accuracy</div>
              <p className="text-muted-foreground">85%+ accuracy for deepfake videos in our MVP version.</p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-2">
                &lt;60<span className="text-4xl">s</span>
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">Verification Time</div>
              <p className="text-muted-foreground">
                Complete analysis and credibility report generation in under 60 seconds per video.
              </p>
            </div>

            <div className="text-center">
              <div className="text-6xl font-bold text-accent mb-2">
                1K<span className="text-4xl">+</span>
              </div>
              <div className="text-xl font-semibold text-foreground mb-2">Educational Reach</div>
              <p className="text-muted-foreground">
                1,000+ people trained via our gamified education module in the first year.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Use Cases Grid */}
      <section id="use-cases" className="py-16 bg-card-bg relative overflow-hidden">
        {/* World Map Background */}
        <div 
          className="absolute inset-0 w-full h-full opacity-10"
          style={{
            backgroundImage: 'url("/World Map.svg")',
            backgroundSize: 'contain',
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center',
            backgroundAttachment: 'local'
          }}
        />
        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            Protecting Critical Stakeholders from Deepfake Threats
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left side - Text content */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-foreground">Empowering Those Who Shape Public Opinion</h3>
              <p className="text-lg text-muted-foreground">
                From newsrooms to courtrooms, from social media to classrooms—<img src="/tracer-logo.svg" alt="tЯacer" className="inline h-7" /> protects the people and
                institutions that society depends on for accurate information and fair judgment.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Real-time Verification</h4>
                    <p className="text-muted-foreground">Instant authenticity checks before content goes live</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Credibility Reports</h4>
                    <p className="text-muted-foreground">Shareable verification certificates for transparency</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Educational Tools</h4>
                    <p className="text-muted-foreground">Gamified learning to build digital literacy skills</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-accent mt-1 flex-shrink-0" />
                  <div>
                    <h4 className="font-semibold text-foreground">Origin Tracking</h4>
                    <p className="text-muted-foreground">Track content sources and alert or hold perpetrators accountable</p>
                  </div>
                </div>
              </div>
              <Button 
                size="lg" 
                className="bg-accent text-accent-foreground hover:bg-accent/90"
                onClick={handleSignup}
              >
                Explore All Use Cases
              </Button>
            </div>

            {/* Right side - CardSwap component */}
            <div className="flex justify-center">
              <div className="relative" style={{ height: "480px", width: "100%" }}>
                <CardSwap
                  width={400}
                  height={400}
                  cardDistance={35}
                  verticalDistance={40}
                  delay={4000}
                  pauseOnHover={true}
                >
                  <SwapCard className="bg-black border-stone-700 text-white p-8 flex flex-col justify-between">
                    <div>
                      <Shield className="w-12 h-12 text-accent mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Journalists & News</h3>
                      <p className="text-gray-300 text-lg mb-6">
                        Verify media authenticity before publishing to maintain credibility and prevent misinformation
                        spread.
                      </p>
                    </div>
                    <Button 
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-semibold"
                      onClick={handleSignup}
                    >
                      Protect Your Stories
                    </Button>
                  </SwapCard>
                  <SwapCard className="bg-black border-stone-700 text-white p-8 flex flex-col justify-between">
                    <div>
                      <TrendingUp className="w-12 h-12 text-accent mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Influencers & Public Figures</h3>
                      <p className="text-gray-300 text-lg mb-6">
                        Protect your personal brand and credibility from deepfake attacks and fabricated content.
                      </p>
                    </div>
                    <Button 
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-semibold"
                      onClick={handleSignup}
                    >
                      Safeguard Your Brand
                    </Button>
                  </SwapCard>
                  <SwapCard className="bg-black border-stone-700 text-white p-8 flex flex-col justify-between">
                    <div>
                      <Lock className="w-12 h-12 text-accent mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Legal Professionals</h3>
                      <p className="text-gray-300 text-lg mb-6">
                        Verify digital evidence authenticity, track content origins to identify perpetrators, and gather 
                        solid evidence for legal proceedings.
                      </p>
                    </div>
                    <Button 
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-semibold"
                      onClick={handleSignup}
                    >
                      Verify Evidence
                    </Button>
                  </SwapCard>
                  <SwapCard className="bg-black border-stone-700 text-white p-8 flex flex-col justify-between">
                    <div>
                      <Eye className="w-12 h-12 text-accent mb-6" />
                      <h3 className="text-2xl font-bold text-white mb-4">Students & Educators</h3>
                      <p className="text-gray-300 text-lg mb-6">
                        Learn to detect misinformation through our gamified education modules and build digital
                        literacy.
                      </p>
                    </div>
                    <Button 
                      className="bg-accent text-accent-foreground hover:bg-accent/90 w-full font-semibold"
                      onClick={handleSignup}
                    >
                      Start Learning
                    </Button>
                  </SwapCard>
                </CardSwap>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="max-w-md mx-auto text-center px-4">
          <h2 className="text-3xl font-bold mb-4">Join the Movement for Truth and Online Dignity</h2>
          {/* <div className="mb-6">
            <GlassyLogo size={100} className="mb-4" logoSize="h-12" />
          </div> */}
          <p className="mb-8 opacity-90">
            Help us build a world where truth prevails over deception. Join us today and be part of the solution to
            the deepfake crisis.
          </p>
          <Button 
            size="lg" 
            className="bg-accent text-accent-foreground hover:bg-accent/90"
            onClick={handleSignup}
          >
            Start Your Free Trial
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative border-t border-border">
        <div className="w-full bg-[#f8fafc] relative py-12">
          {/* Top Fade Grid Background */}
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundImage: `
                linear-gradient(to right, #e2e8f0 1px, transparent 1px),
                linear-gradient(to bottom, #e2e8f0 1px, transparent 1px)
              `,
              backgroundSize: "20px 30px",
              WebkitMaskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
              maskImage:
                "radial-gradient(ellipse 70% 60% at 50% 0%, #000 60%, transparent 100%)",
            }}
          />
          
          {/* Logo Background */}
          <div 
            className="absolute inset-0 z-0 opacity-10 overflow-hidden" 
            style={{
              backgroundImage: `url('/tracer-logo.svg')`,
              backgroundRepeat: "no-repeat",
              backgroundPosition: "100% 20%", /* x: 50%, y: 20% - position logo higher */
              backgroundSize: "1500px auto", /* Significantly larger logo */
            }}
          />

          {/* Footer Content */}
          <div className="relative z-10 max-w-7xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div>
            <h4 className="text-foreground font-semibold mb-4">SOLUTIONS</h4>
            <div className="space-y-2">
              <a href="/deepdetector" className="block text-muted-foreground hover:text-accent transition">
                DeepDetector
              </a>
              <a href="/waver" className="block text-muted-foreground hover:text-accent transition">
                Waver
              </a>
              <a href="/tracer" className="block text-muted-foreground hover:text-accent transition">
                    <img src="/tracer-logo.svg" alt="tЯacer" className="inline h-6" />
                  </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">INDUSTRY</h4>
            <div className="space-y-2">
              <a href="/banking" className="block text-muted-foreground hover:text-accent transition">
                Banking & Finance
              </a>
              <a href="/government" className="block text-muted-foreground hover:text-accent transition">
                Government
              </a>
              <a href="/media" className="block text-muted-foreground hover:text-accent transition">
                Media & Entertainment
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">USE CASES</h4>
            <div className="space-y-2">
              <a href="/kyc" className="block text-muted-foreground hover:text-accent transition">
                KYC Verification
              </a>
              <a href="/content" className="block text-muted-foreground hover:text-accent transition">
                Content Moderation
              </a>
              <a href="/security" className="block text-muted-foreground hover:text-accent transition">
                Security
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">LEARN</h4>
            <div className="space-y-2">
              <a href="/news" className="block text-muted-foreground hover:text-accent transition">
                News Room
              </a>
              <a href="/research" className="block text-muted-foreground hover:text-accent transition">
                Research
              </a>
              <a href="/docs" className="block text-muted-foreground hover:text-accent transition">
                Documentation
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-semibold mb-4">COMPANY</h4>
            <div className="space-y-2">
              <a href="/about" className="block text-muted-foreground hover:text-accent transition">
                About Us
              </a>
              <a href="/contact" className="block text-muted-foreground hover:text-accent transition">
                Contact Us
              </a>
              <a href="/careers" className="block text-muted-foreground hover:text-accent transition">
                Careers
              </a>
            </div>
          </div>
        </div>

            <div className="border-t border-border mt-8 pt-8 text-center text-sm">
              <p className="text-muted-foreground">&copy; 2025 <img src="/tracer-logo.svg" alt="tЯacer" className="inline h-5" />. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <a href="/privacy" className="text-muted-foreground hover:text-accent transition">
              Privacy Policy
            </a>
            <a href="/terms" className="text-muted-foreground hover:text-accent transition">
              Terms & Conditions
            </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}