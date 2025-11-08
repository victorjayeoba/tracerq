"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Crown, Star, TrendingUp, Shield } from "lucide-react";

export default function UpgradePlan() {
  return (
    <Card className="p-6 shadow-lg border border-border rounded-xl flex-1 relative overflow-hidden">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg flex items-center justify-center">
            <Crown className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Plan Status</h3>
            <p className="text-sm text-gray-600">Current subscription</p>
          </div>
        </div>
        <Badge variant="outline" className="bg-gradient-to-r from-amber-500/10 to-orange-500/10 text-amber-700 border-amber-300 px-3 py-1">
          <Star className="h-3 w-3 mr-1" />
          Free Trial
        </Badge>
      </div>
      
      {/* Enhanced Usage Visualization */}
      <div className="mb-6">
        <div className="flex justify-between items-center">
          <div className="flex-1 h-28">
            <svg viewBox="0 0 100 100" className="h-full w-full">
              <defs>
                <linearGradient id="usageGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f59e0b" />
                  <stop offset="50%" stopColor="#f97316" />
                  <stop offset="100%" stopColor="#ea580c" />
                </linearGradient>
                <filter id="glow">
                  <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                  <feMerge> 
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Background circle */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="#f3f4f6" 
                strokeWidth="8"
              />
              
              {/* Progress circle with glow effect */}
              <circle 
                cx="50" cy="50" r="40" 
                fill="none" 
                stroke="url(#usageGradient)" 
                strokeWidth="8"
                strokeDasharray="251.2"
                strokeDashoffset="251.2"
                transform="rotate(-90 50 50)"
                className="transition-all duration-1000 ease-out"
                filter="url(#glow)"
              />
              
              {/* Center text */}
              <text 
                x="50" y="45" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="18"
                fontWeight="700"
                fill="#f59e0b"
              >
                0%
              </text>
              <text 
                x="50" y="60" 
                dominantBaseline="middle" 
                textAnchor="middle" 
                fontSize="10"
                fill="#6b7280"
              >
                used
              </text>
            </svg>
          </div>
          
          <div className="flex-1 pl-4">
            <div className="space-y-3 mb-4">
              <div>
                <p className="text-sm font-semibold text-gray-800">Trial period</p>
                <p className="text-xs text-gray-600">Check your subscription details</p>
              </div>
            </div>
            
            <div className="space-y-2">
              <div className="flex items-center text-xs text-gray-600 gap-2">
                <span className="w-3 h-3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full shadow-sm"></span>
                <span>Usage (0%)</span>
              </div>
              <div className="flex items-center text-xs text-gray-600 gap-2">
                <span className="w-3 h-3 bg-gray-300 rounded-full"></span>
                <span>Remaining (100%)</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Upgrade Button */}
      <Button className="w-full bg-gradient-to-r from-amber-500 to-orange-600 text-white text-sm h-11 mb-4 shadow-lg hover:shadow-xl transition-all hover:scale-[1.02] font-semibold">
        <Zap className="h-4 w-4 mr-2" /> 
        Upgrade Now
      </Button>
      
      {/* Benefits */}
      <div className="space-y-3 mb-4">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Shield className="h-3 w-3 text-green-500" />
          <span>Unlimited verifications</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <TrendingUp className="h-3 w-3 text-blue-500" />
          <span>Priority support</span>
        </div>
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Star className="h-3 w-3 text-purple-500" />
          <span>Advanced AI models</span>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute -bottom-8 -right-8 w-28 h-28 bg-gradient-to-r from-amber-500/10 to-orange-500/10 rounded-full blur-xl"></div>
      <div className="absolute -top-4 -left-4 w-16 h-16 bg-gradient-to-r from-amber-400/20 to-orange-400/20 rounded-full blur-lg"></div>
    </Card>
  );
}
