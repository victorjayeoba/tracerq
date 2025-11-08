"use client";

import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  LineChart, 
  PieChart,
  ArrowUpRight,
  ArrowDownRight,
  Calendar,
  Download
} from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Analyses",
      value: "1,293",
      change: "+12%",
      isPositive: true
    },
    {
      title: "Deepfakes Detected",
      value: "342",
      change: "+18%",
      isPositive: false
    },
    {
      title: "Avg. Detection Time",
      value: "48s",
      change: "-10%",
      isPositive: true
    },
    {
      title: "Detection Accuracy",
      value: "92%",
      change: "+2%",
      isPositive: true
    }
  ];

  return (
    <div className="w-full">
      <div className="w-full px-8 py-6 flex flex-col">
        {/* Page Header */}
        <Header title="Analytics Dashboard" />
        
        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat, index) => (
            <Card key={index} className="p-5 border border-border">
              <div className="flex justify-between items-start">
                <h3 className="text-sm font-medium text-muted-foreground">{stat.title}</h3>
                <div className="p-2 rounded-full bg-accent/10">
                  {index === 0 ? <BarChart3 className="w-4 h-4 text-accent" /> :
                   index === 1 ? <PieChart className="w-4 h-4 text-accent" /> :
                   index === 2 ? <LineChart className="w-4 h-4 text-accent" /> :
                                 <LineChart className="w-4 h-4 text-accent" />}
                </div>
              </div>
              <div className="mt-2">
                <div className="text-2xl font-bold">{stat.value}</div>
                <div className={`flex items-center text-xs mt-1 ${stat.isPositive ? 'text-green-600' : 'text-red-600'}`}>
                  {stat.isPositive ? 
                    <ArrowUpRight className="h-3 w-3 mr-1" /> : 
                    <ArrowDownRight className="h-3 w-3 mr-1" />
                  }
                  {stat.change} from last month
                </div>
              </div>
            </Card>
          ))}
        </div>
        
        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Main Chart */}
          <Card className="lg:col-span-2 border border-border p-5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium">Analysis Overview</h3>
                <p className="text-sm text-muted-foreground">Detection trends over time</p>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm" className="text-xs flex items-center gap-1">
                  <Calendar className="h-3 w-3" />
                  Last 30 days
                </Button>
                <Button variant="outline" size="icon" className="h-8 w-8">
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            <div className="h-64 flex items-center justify-center text-muted-foreground border-t border-border pt-4">
              {/* Placeholder for actual chart */}
              <div className="w-full h-full bg-muted/20 rounded-md flex items-center justify-center">
                <p className="text-sm">Detection Trends Chart</p>
              </div>
            </div>
          </Card>
          
          {/* Pie Chart */}
          <Card className="border border-border p-5">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h3 className="font-medium">Content Breakdown</h3>
                <p className="text-sm text-muted-foreground">Analysis by content type</p>
              </div>
              <Button variant="outline" size="icon" className="h-8 w-8">
                <Download className="h-4 w-4" />
              </Button>
            </div>
            
            <div className="h-64 flex items-center justify-center border-t border-border pt-4">
              {/* Placeholder for actual chart */}
              <div className="w-full h-full flex flex-col items-center justify-center">
                {/* Pie chart placeholder */}
                <div className="w-32 h-32 rounded-full border-8 border-accent relative mb-4">
                  <div className="absolute inset-0 border-8 border-transparent border-t-blue-500 rounded-full"></div>
                  <div className="absolute inset-0 border-8 border-transparent border-r-red-500 rounded-full"></div>
                </div>
                
                {/* Legend */}
                <div className="grid grid-cols-2 gap-2 w-full px-4">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-accent rounded-full"></div>
                    <span className="text-xs">Authentic (65%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-xs">Deepfake (28%)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                    <span className="text-xs">Inconclusive (7%)</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
        
        {/* Media Type Analysis */}
        <Card className="border border-border p-5 mb-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-medium">Media Type Analysis</h3>
              <p className="text-sm text-muted-foreground">Performance metrics by media type</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" className="text-xs">
                Last 30 days
              </Button>
            </div>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full">
              <thead>
                <tr className="border-b border-border text-left text-sm text-muted-foreground">
                  <th className="pb-3 font-medium">Media Type</th>
                  <th className="pb-3 font-medium">Analyses</th>
                  <th className="pb-3 font-medium">Deepfakes</th>
                  <th className="pb-3 font-medium">Accuracy</th>
                  <th className="pb-3 font-medium">Avg. Time</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3">Images</td>
                  <td className="py-3">584</td>
                  <td className="py-3">156</td>
                  <td className="py-3">94%</td>
                  <td className="py-3">32s</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3">Videos</td>
                  <td className="py-3">429</td>
                  <td className="py-3">143</td>
                  <td className="py-3">88%</td>
                  <td className="py-3">58s</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3">Audio</td>
                  <td className="py-3">208</td>
                  <td className="py-3">31</td>
                  <td className="py-3">91%</td>
                  <td className="py-3">45s</td>
                </tr>
                <tr>
                  <td className="py-3">Documents</td>
                  <td className="py-3">72</td>
                  <td className="py-3">12</td>
                  <td className="py-3">95%</td>
                  <td className="py-3">28s</td>
                </tr>
              </tbody>
            </table>
          </div>
        </Card>
      </div>
    </div>
  );
}



