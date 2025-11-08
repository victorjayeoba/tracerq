"use client";

import { Button } from "@/components/ui/button";
import { Search, TrendingUp, Globe, ArrowRight } from "lucide-react";
import Link from "next/link";

export default function TrackingCTA() {
  return (
    <div className="bg-gradient-to-r from-blue-50 via-purple-50 to-indigo-50 p-6 rounded-xl border border-blue-200 shadow-md">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
              <Search className="h-6 w-6 text-white" />
            </div>
            <div className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
              <TrendingUp className="h-3 w-3 text-white" />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-1">Track Social Media Origins</h3>
            <p className="text-sm text-gray-600">Find where content first appeared online with AI-powered tracing</p>
          </div>
        </div>
        <Button 
          size="lg" 
          className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105 font-semibold"
          asChild
        >
          <Link href="/dashboard/track" className="flex items-center gap-2">
            <Globe className="h-4 w-4" />
            Track Now
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>
      </div>
      
      {/* Feature highlights */}
      <div className="mt-4 grid grid-cols-3 gap-3">
        <div className="text-center">
          <div className="text-lg font-bold text-blue-600">24h</div>
          <div className="text-xs text-gray-600">Response Time</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-purple-600">100+</div>
          <div className="text-xs text-gray-600">Platforms</div>
        </div>
        <div className="text-center">
          <div className="text-lg font-bold text-indigo-600">99%</div>
          <div className="text-xs text-gray-600">Accuracy</div>
        </div>
      </div>
    </div>
  );
}
