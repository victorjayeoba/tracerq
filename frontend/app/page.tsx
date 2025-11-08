"use client";

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Shield, Zap, Eye, Globe, Lock, TrendingUp } from "lucide-react"
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
          <div className="relative z-10 py-16 px-4">
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-8 text-center lg:text-left">
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground leading-[0.95]">
                  Protect Your <span className="text-accent">Online Legacy</span> from Deepfake Threats
                </h1>
                <p className="text-lg text-muted-foreground max-w-2xl">
                 <img src="/tracer-logo.svg" alt="tЯacer" className="inline h-7" />helps you quickly verify content authenticity, protecting you from deepfakes and false media.

                </p>
                <div className="text-xl font-semibold text-accent italic">"Before you believe it, check it."</div>
                <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                  <Button 
                    size="lg" 
                    className="bg-accent text-accent-foreground hover:bg-accent/90"
                    onClick={handleSignup}
                  >
                    Try Free Demo
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-accent text-accent hover:bg-accent hover:text-accent-foreground bg-transparent"
                    onClick={handleSignup}
                  >
                    Learn More
                  </Button>
                </div>
                <div className="flex justify-center lg:justify-start space-x-6 pt-8">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">85%+ Accuracy</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Zap className="w-5 h-5 text-accent" />
                    <span className="text-sm text-muted-foreground">Under 60 Seconds</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end">
                <div className="relative">
                  <video
                    src="/hero-video.mp4"
                    className="w-full h-auto max-w-lg rounded-lg shadow-2xl border border-border"
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute -top-4 -right-4 bg-accent text-accent-foreground px-3 py-1 rounded-full text-sm font-semibold">
                    Live Demo
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
      <section id="solutions" className="py-16 px-4 relative">
        {/* Background SVG */}
        <div className="absolute inset-0 w-full h-full">
          <svg xmlns="http://www.w3.org/2000/svg" version="1.1" xmlnsXlink="http://www.w3.org/1999/xlink" xmlnsSvgjs="http://svgjs.dev/svgjs" width="100%" height="100%" preserveAspectRatio="none" viewBox="0 0 1440 560" className="w-full h-full">
            <g mask="url(&quot;#SvgjsMask1001&quot;)" fill="none">
              <rect width="1440" height="560" x="0" y="0" fill="rgba(120, 66, 18, 1)"></rect>
              <path d="M0,465.83C104.288,468.484,215.426,527.818,306.431,476.816C397.722,425.654,432.004,310.53,457.992,209.158C481.096,119.036,455.997,28.401,445.077,-63.992C433.839,-159.075,456.04,-268.473,393.019,-340.553C330.02,-412.607,220.396,-413.407,125.96,-428.979C41.682,-442.876,-42.324,-447.134,-125.08,-425.982C-210.099,-404.251,-286.444,-362.878,-353.608,-306.403C-430.372,-241.855,-509.614,-173.318,-539.442,-77.56C-571.521,25.426,-567.834,140.741,-523.522,239.085C-479.112,337.647,-395.768,418.504,-296.568,461.469C-203.969,501.575,-100.878,463.262,0,465.83" fill="#60350e"></path>
              <path d="M1440 908.47C1502.761 894.712 1552.872 854.386 1605.549 817.5989999999999 1656.1390000000001 782.27 1709.73 750.559 1741.699 697.781 1776.088 641.008 1797.69 575.506 1792.2649999999999 509.352 1786.666 441.074 1754.586 378.024 1711.133 325.062 1666.877 271.121 1608.195 233.358 1543.795 206.50799999999998 1473.331 177.12900000000002 1397.019 142.65699999999998 1323.569 163.474 1249.969 184.334 1203.1779999999999 253.93599999999998 1158.179 315.8 1116.272 373.413 1079.963 436.356 1073.476 507.302 1067.166 576.305 1098.461 640.002 1122.595 704.954 1148.658 775.1 1157.164 861.688 1220.159 902.0799999999999 1283.15 942.469 1366.909 924.492 1440 908.47" fill="#904f16"></path>
            </g>
            <defs>
              <mask id="SvgjsMask1001">
                <rect width="1440" height="560" fill="#ffffff"></rect>
              </mask>
            </defs>
          </svg>
        </div>
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-lg">Complete Online Legacy Protection Solution</h2>
          {/* <p className="text-muted-foreground mb-12 max-w-3xl mx-auto">
            <img src="/tracer-logo.svg" alt="tЯacer" className="inline h-7" /> detects deepfake videos, AI-generated images, and fabricated evidence. Upload or link content to
            check authenticity before sharing and protect your digital reputation.
          </p> */}
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="group relative h-64 overflow-hidden border-border hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-120"
                style={{ backgroundImage: 'url(/analysis.png)' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#744a12]/95 via-[#744a12]/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-500 group-hover:mb-4 drop-shadow-2xl">
                  Forensic Analysis
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white text-base font-medium transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 drop-shadow-lg">
                    Frame-by-frame analysis, audio-visual mismatch detection, and metadata checking to flag manipulated media.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group relative h-64 overflow-hidden border-border hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-120"
                style={{ backgroundImage: 'url(/source.png)' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#744a12]/95 via-[#744a12]/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-500 group-hover:mb-4 drop-shadow-2xl">
                  Source Tracking
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white text-base font-medium transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 drop-shadow-lg">
                    Track where deepfake content first appeared online, identify perpetuators, and gather evidence for accountability.
                  </p>
                </div>
              </div>
            </Card>

            <Card className="group relative h-64 overflow-hidden border-border hover:shadow-xl transition-all duration-500 cursor-pointer">
              <div 
                className="absolute inset-0 bg-center bg-no-repeat transition-transform duration-500 group-hover:scale-120"
                style={{ backgroundImage: 'url(/report.png)' }}
              ></div>
              <div className="absolute inset-0 bg-gradient-to-t from-[#744a12]/95 via-[#744a12]/40 to-transparent"></div>
              
              {/* Content */}
              <div className="relative z-10 h-full flex flex-col justify-end p-6">
                <h3 className="text-2xl font-bold text-white mb-3 transition-all duration-500 group-hover:mb-4 drop-shadow-2xl">
                  Credibility Reports
                </h3>
                <div className="overflow-hidden">
                  <p className="text-white text-base font-medium transform translate-y-8 opacity-0 transition-all duration-500 group-hover:translate-y-0 group-hover:opacity-100 drop-shadow-lg">
                    Generate shareable PDF reports or links showing verification results with detailed credibility scores.
                  </p>
                </div>
              </div>
            </Card>

            {/* <Card className="bg-card border-border hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-6 h-6 text-accent" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Browser Plugin & API</h3>
                <p className="text-muted-foreground">
                  Seamless integration for newsrooms and platforms to run checks without leaving their workflow.
                </p>
              </CardContent>
            </Card> */}
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