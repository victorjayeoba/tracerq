"use client";

import { useState, useCallback } from "react";
import Header from "@/components/dashboard/header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Search, 
  Link as LinkIcon,
  Upload, 
  ArrowRight,
  UploadCloud,
  Clock,
  Globe,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Calendar,
  MapPin,
  CheckCircle2
} from "lucide-react";
import { useDropzone } from "react-dropzone";

interface TrackSource {
  id: number;
  platform: string;
  date: string;
  time: string;
  url: string;
  engagement: {
    likes: number;
    shares: number;
    comments: number;
  };
  location: string;
  isVerified: boolean;
  isExpanded: boolean;
}

interface AnalysisResult {
  claim: string;
  assessment: {
    verdict: string;
    confidence: number;
    reasoning: string;
  };
  origin: {
    status: string;
    url?: string;
    context: string;
    firstSeen?: string;
  };
  forensicData?: {
    bestGuess: string;
    detectedObjects: string[];
  };
}


export default function TrackPage() {
  const [url, setUrl] = useState("");
  const [claim, setClaim] = useState("");
  const [isTracking, setIsTracking] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [trackSources, setTrackSources] = useState<TrackSource[]>([]);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);

  // Toggle expansion for a single item, collapse others
  const toggleExpansion = (id: number) => {
    setTrackSources(sources => 
      sources.map(source => ({
        ...source,
        isExpanded: source.id === id ? !source.isExpanded : false
      }))
    );
  };

  // Handle file drop and analysis
  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    // Check if user has entered a claim
    if (!claim.trim()) {
      alert('Please enter a claim to verify before uploading content.');
      return;
    }

    const file = acceptedFiles[0];
    setUploadedFile(file);
    setIsTracking(true);
    setShowResults(false);

    try {
      // Create FormData for API request
      const formData = new FormData();
      formData.append('image', file);
      formData.append('claim', claim);

      // Call the production analysis API
      const response = await fetch('https://tracerapi.opulentencounters.com/analyze', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status}`);
      }

      const result: AnalysisResult = await response.json();
      setAnalysisResult(result);
      setIsTracking(false);
      setShowResults(true);

    } catch (error) {
      console.error('Analysis failed:', error);
      setAnalysisResult({
        claim: claim,
        assessment: {
          verdict: "Analysis Failed",
          confidence: 0,
          reasoning: `Analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        },
        origin: {
          status: "ANALYSIS_FAILED",
          context: "Could not analyze the content due to an error"
        }
      });
      setIsTracking(false);
      setShowResults(true);
    }
  }, [claim]);

  // Configure dropzone - only accept images and videos
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: {
      'image/*': [],
      'video/*': []
    }
  });

  // Handle URL tracking (download and analyze)
  const handleTrackUrl = async () => {
    if (!url) return;

    setIsTracking(true);
    setShowResults(false);

    try {
      // For now, show that URL tracking needs implementation
      // In a full implementation, you'd download the file from the URL
      setAnalysisResult({
        claim: claim || 'Analyze content from URL',
        assessment: {
          verdict: "UNCERTAIN",
          confidence: 0,
          reasoning: "URL analysis is not yet implemented. Please upload the file directly for analysis."
        },
        origin: {
          status: "URL_NOT_SUPPORTED",
          context: "Direct file upload is required for content analysis"
        }
      });
      setIsTracking(false);
      setShowResults(true);

    } catch (error) {
      console.error('URL analysis failed:', error);
      setAnalysisResult({
        claim: claim || 'Analyze content from URL',
        assessment: {
          verdict: "UNCERTAIN",
          confidence: 0,
          reasoning: `URL analysis failed: ${error instanceof Error ? error.message : 'Unknown error'}`
        },
        origin: {
          status: "ANALYSIS_FAILED",
          context: "Could not analyze content from URL"
        }
      });
      setIsTracking(false);
      setShowResults(true);
    }
  };

  // Render platform icon
  const getPlatformIcon = (platform: string) => {
    switch(platform.toLowerCase()) {
      default:
        return <Globe className="h-5 w-5 text-accent" />;
    }
  };

  return (
    <div className="w-full">
      <div className="w-full px-8 py-6">
        {/* Page Header */}
        <Header title="Track Content" />
        
        {/* Flexible Layout */}
        <div className={`flex ${showResults ? "gap-6" : ""}`}>
          {/* Track Content Card - Shrinks when results are shown */}
          <Card className={`border border-border p-6 ${showResults ? "w-1/2" : "w-full"}`}>
            <h2 className="text-lg font-medium mb-2">Content Tracking</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Track content across the web to verify its origin and authenticity.
            </p>
            
            <Tabs defaultValue="upload" className="w-full">
              <TabsList className="grid grid-cols-2 mb-6">
                <TabsTrigger value="upload" className="flex items-center gap-2">
                  <Upload className="h-4 w-4" /> Upload Content
                </TabsTrigger>
                <TabsTrigger value="url" className="flex items-center gap-2">
                  <LinkIcon className="h-4 w-4" /> Track by URL
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="upload" className="mt-0">
                {/* Claim Input */}
                <div className="mb-6">
                  <label htmlFor="claim" className="block text-sm font-medium mb-2">
                    Claim to Verify
                  </label>
                  <Input
                    id="claim"
                    type="text"
                    placeholder="Enter the claim you want to verify (e.g., 'This video shows a real event')"
                    className="w-full"
                    value={claim}
                    onChange={(e) => setClaim(e.target.value)}
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    Describe what you want to verify about the content. This helps our AI understand the context.
                  </p>
                </div>

                {/* Upload Area */}
                <div 
                  {...getRootProps()} 
                  className={`
                    border-2 border-dashed ${isDragActive ? 'border-primary' : 'border-border'} 
                    rounded-lg bg-background flex flex-col items-center justify-center 
                    p-12 mb-4 cursor-pointer hover:bg-muted/20 transition-colors
                    ${showResults ? "h-48" : "h-64"}
                  `}
                >
                  <input {...getInputProps()} />
                  <div className={`rounded-full bg-accent/10 p-4 mb-4 ${showResults ? "p-2" : ""}`}>
                    <UploadCloud className={`text-accent ${showResults ? "h-6 w-6" : "h-10 w-10"}`} />
                  </div>
                  <p className={`font-medium mb-2 ${showResults ? "text-sm" : "text-lg"}`}>Drop your files here</p>
                  <p className="text-sm text-muted-foreground mb-4">or click to browse</p>
                  {!showResults && (
                    <div className="flex flex-wrap gap-2 justify-center text-xs text-muted-foreground">
                      <span className="px-2 py-1 bg-background border border-border rounded-full">Images</span>
                      <span className="px-2 py-1 bg-background border border-border rounded-full">Videos</span>
                    </div>
                  )}
                </div>
                
                {isTracking && (
                  <div className="flex justify-center items-center py-4">
                    <div className="flex items-center gap-3">
                      <div className="h-4 w-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
                      <p className="text-sm">Analyzing content...</p>
                    </div>
                  </div>
                )}
              </TabsContent>
              
              <TabsContent value="url" className="mt-0">
                {/* URL Input */}
                <div className="mb-6">
                  <div className="relative">
                    <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      type="url"
                      placeholder="Enter content URL (feature coming soon)"
                      className="pl-10"
                      value={url}
                      onChange={(e) => setUrl(e.target.value)}
                    />
                  </div>
                  <p className="text-xs text-muted-foreground mt-2">
                    URL analysis feature coming soon. For now, please upload files directly.
                  </p>
                </div>
                
                <Button 
                  className="w-full bg-accent text-accent-foreground hover:bg-accent/90 flex items-center justify-center gap-2"
                  onClick={handleTrackUrl}
                  disabled={!url || isTracking}
                >
                  {isTracking ? (
                    <>
                      <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Analyzing...
                    </>
                  ) : (
                    <>
                      <Search className="h-4 w-4" />
                      Analyze Content
                    </>
                  )}
                </Button>
              </TabsContent>
            </Tabs>
          </Card>
          
          {/* Results Section */}
          {showResults && analysisResult && (
            <div className="w-1/2">
              <Card className="border border-border p-6 h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Search className="h-5 w-5 text-accent" />
                  <h2 className="text-lg font-medium">Analysis Results</h2>
                </div>

                {/* Claim Display */}
                <div className="mb-6">
                  <h3 className="text-sm font-medium mb-2">Claim Verified</h3>
                  <p className="text-sm text-muted-foreground bg-muted/20 p-3 rounded-md">
                    "{analysisResult.claim}"
                  </p>
                </div>

                {/* Assessment Results */}
                <div className="space-y-4">
                  <div className="bg-background border border-border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <div className={`w-3 h-3 rounded-full ${
                        analysisResult.assessment.verdict === 'AGREES' ? 'bg-green-500' :
                        analysisResult.assessment.verdict === 'DISAGREES' ? 'bg-red-500' :
                        'bg-yellow-500'
                      }`}></div>
                      <h4 className="font-medium text-sm">Assessment</h4>
                    </div>

                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Verdict:</span>
                        <span className={`text-sm font-medium px-2 py-1 rounded-full ${
                          analysisResult.assessment.verdict === 'AGREES'
                            ? 'bg-green-100 text-green-800'
                            : analysisResult.assessment.verdict === 'DISAGREES'
                            ? 'bg-red-100 text-red-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}>
                          {analysisResult.assessment.verdict}
                        </span>
                      </div>



                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Reasoning:</p>
                        <p className="text-sm">{analysisResult.assessment.reasoning}</p>
                      </div>
                    </div>
                  </div>

                  {/* Forensic Data */}
                  {analysisResult.forensicData && (
                    <div className="bg-background border border-border rounded-lg p-4">
                      <h4 className="font-medium text-sm mb-3">Forensic Analysis</h4>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Best Guess:</span>
                          <span className="text-sm font-medium px-2 py-1 rounded-full bg-purple-100 text-purple-800">
                            {analysisResult.forensicData.bestGuess}
                          </span>
                        </div>
                        
                        <div className="pt-2 border-t border-border">
                          <p className="text-xs text-muted-foreground mb-2">Detected Objects:</p>
                          <div className="flex flex-wrap gap-2">
                            {analysisResult.forensicData.detectedObjects.map((object, index) => (
                              <span key={index} className="text-xs px-2 py-1 bg-muted rounded-full">
                                {object}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Origin Analysis */}
                  <div className="bg-background border border-border rounded-lg p-4">
                    <h4 className="font-medium text-sm mb-3">Origin Analysis</h4>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-muted-foreground">Status:</span>
                        <span className="text-sm font-medium">{analysisResult.origin.status}</span>
                      </div>
                      {analysisResult.origin.url && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Source URL:</span>
                          <a
                            href={analysisResult.origin.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm font-medium text-blue-600 hover:text-blue-800 underline truncate max-w-[200px]"
                          >
                            {analysisResult.origin.url}
                          </a>
                        </div>
                      )}
                      {analysisResult.origin.firstSeen && (
                        <div className="flex justify-between items-center">
                          <span className="text-sm text-muted-foreground">Analysis Time:</span>
                          <span className="text-sm font-medium">{analysisResult.origin.firstSeen}</span>
                        </div>
                      )}
                      <div className="pt-2 border-t border-border">
                        <p className="text-xs text-muted-foreground mb-1">Context:</p>
                        <p className="text-sm">{analysisResult.origin.context}</p>
                      </div>
                    </div>
                  </div>

                  {/* File Info */}
                  {uploadedFile && (
                    <div className="bg-accent/5 p-4 rounded-md">
                      <h4 className="text-sm font-medium mb-2">File Analyzed</h4>
                      <p className="text-xs text-muted-foreground">
                        {uploadedFile.name} ({(uploadedFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </div>
              </Card>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}