"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Calendar,
  Download,
  FileType,
  FileText,
  FileVideo,
  Image as ImageIcon,
  Info,
  ExternalLink
} from "lucide-react";

interface HistoryItem {
  id: string;
  name: string;
  type: "image" | "video" | "document" | "url";
  date: string;
  status: "Authentic" | "Deepfake" | "Inconclusive";
  confidence: number;
}

export default function HistoryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [dateFilter, setDateFilter] = useState("all");
  
  const historyItems: HistoryItem[] = [
    {
      id: "1",
      name: "interview_clip.mp4",
      type: "video",
      date: "2023-06-10",
      status: "Authentic",
      confidence: 95
    },
    {
      id: "2",
      name: "instagram_post.jpg",
      type: "image",
      date: "2023-06-09",
      status: "Deepfake",
      confidence: 87
    },
    {
      id: "3",
      name: "https://youtube.com/watch?v=example",
      type: "url",
      date: "2023-06-08",
      status: "Authentic",
      confidence: 91
    },
    {
      id: "4",
      name: "conference_speech.mp4",
      type: "video",
      date: "2023-06-05",
      status: "Deepfake",
      confidence: 82
    },
    {
      id: "5",
      name: "press_release.pdf",
      type: "document",
      date: "2023-05-28",
      status: "Inconclusive",
      confidence: 60
    },
    {
      id: "6",
      name: "profile_image.png",
      type: "image",
      date: "2023-05-20",
      status: "Authentic",
      confidence: 98
    },
    {
      id: "7",
      name: "https://twitter.com/user/status/123456789",
      type: "url",
      date: "2023-05-15",
      status: "Deepfake",
      confidence: 89
    },
  ];

  // Filter by date
  const getFilteredItems = () => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    const lastMonth = new Date(today);
    lastMonth.setMonth(today.getMonth() - 1);
    
    return historyItems.filter(item => {
      const itemDate = new Date(item.date);
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      
      let matchesDate = true;
      if (dateFilter === "today") {
        matchesDate = itemDate.toDateString() === today.toDateString();
      } else if (dateFilter === "week") {
        matchesDate = itemDate >= lastWeek;
      } else if (dateFilter === "month") {
        matchesDate = itemDate >= lastMonth;
      }
      
      return matchesSearch && matchesDate;
    });
  };

  const filteredItems = getFilteredItems();

  const getIconByType = (type: string) => {
    switch(type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case "video":
        return <FileVideo className="h-5 w-5 text-accent" />;
      case "document":
        return <FileText className="h-5 w-5 text-orange-500" />;
      case "url":
        return <ExternalLink className="h-5 w-5 text-purple-500" />;
      default:
        return <FileType className="h-5 w-5 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case "Authentic":
        return "text-green-600 bg-green-50";
      case "Deepfake":
        return "text-red-600 bg-red-50";
      case "Inconclusive":
        return "text-amber-600 bg-amber-50";
      default:
        return "text-gray-600 bg-gray-50";
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-8 py-6 flex flex-col">
        {/* Page Header */}
        <Header title="Analysis History" />
        
        {/* Search and Filters */}
        <div className="flex justify-between mb-6 flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search history..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button
              variant={dateFilter === "all" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter("all")}
              className="text-xs"
            >
              All Time
            </Button>
            <Button
              variant={dateFilter === "month" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter("month")}
              className="text-xs"
            >
              Last Month
            </Button>
            <Button
              variant={dateFilter === "week" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter("week")}
              className="text-xs"
            >
              Last Week
            </Button>
            <Button
              variant={dateFilter === "today" ? "default" : "outline"}
              size="sm"
              onClick={() => setDateFilter("today")}
              className="text-xs"
            >
              Today
            </Button>
            <Button variant="outline" size="sm" className="gap-1">
              <Calendar className="h-4 w-4" />
              <span className="hidden sm:inline">Calendar</span>
            </Button>
          </div>
        </div>

        {/* History Items */}
        <Card className="border border-border">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-4 border-b border-border font-medium text-sm text-muted-foreground">
            <div className="col-span-5">Content</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-2 text-center">Confidence</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          
          {/* Table Body */}
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No history items match your search criteria.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 p-4 border-b border-border last:border-0 hover:bg-muted/20">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background border border-border">
                    {getIconByType(item.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm truncate max-w-xs">{item.name}</p>
                    <p className="text-xs text-muted-foreground capitalize">{item.type}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center flex items-center justify-center text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="col-span-2 text-center flex items-center justify-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="col-span-2 text-center flex items-center justify-center">
                  <div className="w-full max-w-[100px]">
                    <div className="flex justify-between mb-1">
                      <span className="text-xs">{item.confidence}%</span>
                    </div>
                    <div className="h-1.5 bg-muted rounded-full">
                      <div 
                        className={`h-full rounded-full ${
                          item.status === 'Authentic' ? 'bg-green-500' : 
                          item.status === 'Deepfake' ? 'bg-red-500' : 'bg-amber-500'
                        }`} 
                        style={{ width: `${item.confidence}%` }}
                      />
                    </div>
                  </div>
                </div>
                <div className="col-span-1 text-right flex items-center justify-end gap-1">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Info className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))
          )}
        </Card>
      </div>
    </div>
  );
}



