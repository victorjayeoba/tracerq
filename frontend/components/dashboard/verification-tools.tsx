"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Image, Video, BarChart2, Clock, Sparkles, Shield, Zap } from "lucide-react";

export default function VerificationTools() {
  return (
    <Card className="p-6 shadow-lg border border-border rounded-xl">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <Sparkles className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Verification Tools</h3>
          <p className="text-sm text-gray-600">Advanced analysis capabilities</p>
        </div>
      </div>
      
      <div className="space-y-3">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full h-12 justify-start text-sm font-medium bg-gradient-to-r from-blue-500 to-blue-600 text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-md"
                variant="default"
              >
                <span className="mr-3"><Image className="h-5 w-5" /></span>
                Image Analyzer
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="p-3">
              <div className="space-y-1">
                <p className="font-semibold">Image Analyzer</p>
                <p className="text-xs">Analyze images for manipulation and AI generation</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full h-12 justify-start text-sm font-medium bg-gradient-to-r from-purple-500 to-purple-600 text-white transition-all duration-200 hover:scale-[1.02] hover:shadow-lg shadow-md"
                variant="default"
              >
                <span className="mr-3"><Video className="h-5 w-5" /></span>
                Video Detector
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="p-3">
              <div className="space-y-1">
                <p className="font-semibold">Video Detector</p>
                <p className="text-xs">Detect deepfakes and synthetic videos</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full h-12 justify-start text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                variant="outline"
              >
                <span className="mr-3"><BarChart2 className="h-5 w-5" /></span>
                Content Analytics
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="p-3">
              <div className="space-y-1">
                <p className="font-semibold">Content Analytics</p>
                <p className="text-xs">View detailed analysis reports and insights</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button 
                className="w-full h-12 justify-start text-sm font-medium bg-white text-gray-700 border-2 border-gray-200 hover:border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-[1.02] hover:shadow-md"
                variant="outline"
              >
                <span className="mr-3"><Clock className="h-5 w-5" /></span>
                Verification History
              </Button>
            </TooltipTrigger>
            <TooltipContent side="left" className="p-3">
              <div className="space-y-1">
                <p className="font-semibold">Verification History</p>
                <p className="text-xs">Access your complete verification history</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Quick Stats */}
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600">24/7</div>
            <div className="text-xs text-gray-600">AI Monitoring</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600">99.9%</div>
            <div className="text-xs text-gray-600">Accuracy Rate</div>
          </div>
        </div>
      </div>
    </Card>
  );
}
