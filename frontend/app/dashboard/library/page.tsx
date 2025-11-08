"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  File, 
  FileText, 
  FileVideo, 
  Image as ImageIcon,
  Download,
  MoreHorizontal,
  Trash2
} from "lucide-react";

type MediaItem = {
  id: string;
  name: string;
  type: "image" | "video" | "document";
  date: string;
  size: string;
  status: "Authentic" | "Deepfake" | "Inconclusive";
  confidence: number;
};

export default function LibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<string>("all");
  
  const mediaItems: MediaItem[] = [
    {
      id: "1",
      name: "interview_clip.mp4",
      type: "video",
      date: "2023-06-10",
      size: "12.5 MB",
      status: "Authentic",
      confidence: 95
    },
    {
      id: "2",
      name: "social_post_image.jpg",
      type: "image",
      date: "2023-06-09",
      size: "1.8 MB",
      status: "Deepfake",
      confidence: 87
    },
    {
      id: "3",
      name: "official_document.pdf",
      type: "document",
      date: "2023-06-08",
      size: "3.2 MB",
      status: "Authentic",
      confidence: 91
    },
    {
      id: "4",
      name: "news_clip.mp4",
      type: "video",
      date: "2023-06-07",
      size: "18.2 MB",
      status: "Deepfake",
      confidence: 82
    },
    {
      id: "5",
      name: "press_release.pdf",
      type: "document",
      date: "2023-06-05",
      size: "2.1 MB",
      status: "Inconclusive",
      confidence: 60
    },
    {
      id: "6",
      name: "profile_picture.png",
      type: "image",
      date: "2023-06-03",
      size: "0.8 MB",
      status: "Authentic",
      confidence: 98
    },
  ];

  const filteredItems = mediaItems.filter(item => {
    // Filter by search query
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Filter by type
    const matchesFilter = selectedFilter === "all" || item.type === selectedFilter;
    
    return matchesSearch && matchesFilter;
  });

  const getIconByType = (type: string) => {
    switch(type) {
      case "image":
        return <ImageIcon className="h-5 w-5 text-blue-500" />;
      case "video":
        return <FileVideo className="h-5 w-5 text-accent" />;
      case "document":
        return <FileText className="h-5 w-5 text-orange-500" />;
      default:
        return <File className="h-5 w-5 text-gray-500" />;
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
        <Header title="Content Library" />
        
        {/* Search and Filters */}
        <div className="flex justify-between mb-6 flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search files..."
              className="pl-10 w-full"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            {["all", "image", "video", "document"].map((filter) => (
              <Button
                key={filter}
                variant={selectedFilter === filter ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedFilter(filter)}
                className="text-xs capitalize"
              >
                {filter === "all" ? "All Files" : filter}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              <span className="hidden sm:inline">Filters</span>
            </Button>
          </div>
        </div>

        {/* Content Grid */}
        <Card className="border border-border">
          {/* Table Header */}
          <div className="grid grid-cols-12 p-4 border-b border-border font-medium text-sm text-muted-foreground">
            <div className="col-span-5">Name</div>
            <div className="col-span-2 text-center">Date</div>
            <div className="col-span-2 text-center">Size</div>
            <div className="col-span-2 text-center">Status</div>
            <div className="col-span-1 text-right">Actions</div>
          </div>
          
          {/* Table Body */}
          {filteredItems.length === 0 ? (
            <div className="p-8 text-center text-muted-foreground">
              No files match your search criteria.
            </div>
          ) : (
            filteredItems.map((item) => (
              <div key={item.id} className="grid grid-cols-12 p-4 border-b border-border last:border-0 hover:bg-muted/20">
                <div className="col-span-5 flex items-center gap-3">
                  <div className="p-2 rounded-md bg-background border border-border">
                    {getIconByType(item.type)}
                  </div>
                  <div>
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-xs text-muted-foreground">{item.type}</p>
                  </div>
                </div>
                <div className="col-span-2 text-center flex items-center justify-center text-sm">
                  {new Date(item.date).toLocaleDateString()}
                </div>
                <div className="col-span-2 text-center flex items-center justify-center text-sm">
                  {item.size}
                </div>
                <div className="col-span-2 text-center flex items-center justify-center">
                  <span className={`text-xs px-2 py-1 rounded-full font-medium ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </div>
                <div className="col-span-1 text-right flex items-center justify-end gap-2">
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Download className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <MoreHorizontal className="h-4 w-4" />
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



