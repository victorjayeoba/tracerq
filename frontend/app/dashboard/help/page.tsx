"use client";

import { useState } from "react";
import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  MessageSquare,
  Send,
  Search,
  ChevronDown,
  ChevronUp,
  User,
  FileText,
  Video
} from "lucide-react";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
}

interface FAQItem {
  question: string;
  answer: string;
  isOpen: boolean;
}

export default function HelpPage() {
  // Chat State
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: "assistant",
      content: "Hello! I'm your Tracer Assistant. How can I help you today with deepfake detection or content verification?",
      timestamp: new Date()
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  // FAQ State
  const [faqs, setFaqs] = useState<FAQItem[]>([
    {
      question: "How does Tracer detect deepfakes?",
      answer: "Tracer uses advanced AI algorithms to analyze visual inconsistencies, audio-visual synchronization issues, and metadata anomalies.",
      isOpen: false
    },
    {
      question: "What file formats are supported?",
      answer: "Images (JPG, PNG, WEBP), Videos (MP4, MOV, AVI), and Audio (MP3, WAV).",
      isOpen: false
    },
    {
      question: "How accurate is the detection?",
      answer: "Our technology achieves 85%+ accuracy on most content types.",
      isOpen: false
    },
    {
      question: "Can I track content origins?",
      answer: "Yes! Our Track feature lets you discover where and when content first appeared online.",
      isOpen: false
    }
  ]);
  const [searchQuery, setSearchQuery] = useState("");

  // Handle FAQ toggle with auto-closing of other FAQs
  const toggleFAQ = (index: number) => {
    setFaqs(faqs.map((faq, i) => 
      i === index ? {...faq, isOpen: !faq.isOpen} : {...faq, isOpen: false}
    ));
  };

  // Filter FAQs based on search
  const filteredFaqs = faqs.filter(faq => 
    faq.question.toLowerCase().includes(searchQuery.toLowerCase()) || 
    faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle chat message send
  const sendMessage = () => {
    if (!newMessage.trim()) return;

    // Add user message
    const userMessage: ChatMessage = {
      role: "user",
      content: newMessage,
      timestamp: new Date()
    };
    
    setMessages([...messages, userMessage]);
    setNewMessage("");
    setIsTyping(true);
    
    // Simulate AI response
    setTimeout(() => {
      let response = "";
      
      if (newMessage.toLowerCase().includes("deepfake")) {
        response = "Deepfakes are synthetic media where a person's likeness is replaced with someone else's using AI. Tracer can help detect these manipulations through our advanced analysis tools.";
      } else if (newMessage.toLowerCase().includes("track")) {
        response = "Our tracking feature helps you find where content originated online. You can upload a file or paste a URL to trace its digital footprint across the web.";
      } else if (newMessage.toLowerCase().includes("price") || newMessage.toLowerCase().includes("cost")) {
        response = "Tracer offers a free trial with limited verifications. Our premium plans start at $19/month for individuals and $49/month for business teams with additional features and priority support.";
      } else {
        response = "Thank you for your question. Our system analyzes content for manipulation signs using AI algorithms that detect inconsistencies invisible to the human eye. Would you like more specific information about our detection technology?";
      }

      const assistantMessage: ChatMessage = {
        role: "assistant",
        content: response,
        timestamp: new Date()
      };
      
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  return (
    <div className="w-full h-screen overflow-hidden">
      <div className="w-full px-8 py-6 flex flex-col h-full">
        {/* Page Header */}
        <Header title="Help & Support" />
        
        {/* Three column layout: Sidebar (already exists), Chat, FAQ */}
        <div className="flex gap-6 h-[calc(100vh-120px)]">
          {/* Chat Column - Main Feature */}
          <Card className="flex-grow border border-border p-6 flex flex-col">
            <div className="flex items-center gap-2 mb-4 flex-shrink-0">
              <MessageSquare className="h-5 w-5 text-accent" />
              <h2 className="text-lg font-medium">Chat Support</h2>
            </div>
            
            {/* Chat Messages - Take full available height */}
            <div className="bg-muted/20 rounded-md p-4 flex-grow overflow-y-auto mb-4">
              <div className="space-y-4">
                {messages.map((message, index) => (
                  <div 
                    key={index} 
                    className={`flex ${message.role === "user" ? "justify-end" : "justify-start"}`}
                  >
                    <div 
                      className={`max-w-[80%] p-3 rounded-lg ${
                        message.role === "user" 
                          ? "bg-accent text-accent-foreground" 
                          : "bg-background border border-border"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                      <p className="text-xs text-right mt-1 opacity-70">
                        {message.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
                      </p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-background border border-border max-w-[80%] p-3 rounded-lg">
                      <div className="flex space-x-2">
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" style={{animationDelay: '0.4s'}}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            
            {/* Message Input and Quick Help - Fixed at bottom */}
            <div className="flex-shrink-0">
              <div className="flex gap-2">
                <Input 
                  placeholder="Type your question here..." 
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                />
                <Button 
                  className="bg-accent text-accent-foreground"
                  onClick={sendMessage}
                  disabled={!newMessage.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>

              {/* Quick Help Options */}
              <div className="mt-4 pt-4 border-t border-border">
                <p className="text-sm text-muted-foreground mb-3">Common Questions</p>
                <div className="flex flex-wrap gap-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setNewMessage("How do I track content origins?")}
                  >
                    How to track content?
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setNewMessage("How accurate is deepfake detection?")}
                  >
                    Detection accuracy
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setNewMessage("What file formats are supported?")}
                  >
                    Supported formats
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="text-xs"
                    onClick={() => setNewMessage("How much does Tracer cost?")}
                  >
                    Pricing
                  </Button>
                </div>
              </div>
            </div>
          </Card>
          
          {/* FAQ Column - Side Column */}
          <div className="w-1/3 flex flex-col h-full">
            {/* FAQ Search */}
            <div className="relative mb-4 flex-shrink-0">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                type="text" 
                placeholder="Search FAQs..." 
                className="pl-10 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            {/* FAQ List - Take remaining height */}
            <Card className="border border-border p-4 flex-grow flex flex-col overflow-hidden">
              <h2 className="text-sm font-medium mb-4 flex items-center gap-2 flex-shrink-0">
                <FileText className="h-4 w-4 text-accent" />
                Frequently Asked Questions
              </h2>
              
              {filteredFaqs.length === 0 ? (
                <div className="text-center py-4 text-muted-foreground text-sm">
                  No results found for "{searchQuery}"
                </div>
              ) : (
                <div className="space-y-3 overflow-y-auto">
                  {filteredFaqs.map((faq, index) => (
                    <div key={index} className="border-b border-border last:border-b-0 pb-2 last:pb-0">
                      <button 
                        className="w-full flex justify-between items-center text-left py-2"
                        onClick={() => toggleFAQ(index)}
                      >
                        <h3 className="text-sm font-medium">{faq.question}</h3>
                        {faq.isOpen ? (
                          <ChevronUp className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-muted-foreground flex-shrink-0" />
                        )}
                      </button>
                      
                      {faq.isOpen && (
                        <div className="pb-2 text-muted-foreground text-xs">
                          {faq.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </Card>
            
            {/* Quick Resources */}
            <div className="grid grid-cols-2 gap-3 mt-4 flex-shrink-0">
              <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col items-center justify-center gap-2">
                <Video className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium">Tutorial Videos</span>
              </Button>
              <Button variant="outline" size="sm" className="h-auto py-3 flex flex-col items-center justify-center gap-2">
                <User className="h-4 w-4 text-accent" />
                <span className="text-xs font-medium">Contact Support</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}