
"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { UploadCloud, X, Info, Image, Video, Music, Play, Download, Sparkles, Eye } from "lucide-react";
import { useDropzone } from "react-dropzone";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, HelpCircle } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";


import { FileType, UploadedFile } from "@/types/dashboard";

interface FileUploadAreaProps {
  files: UploadedFile[];
  onFilesAdded: (files: UploadedFile[]) => void;
  onFileProcessed: (fileIndex: number, updatedFile: Partial<UploadedFile>) => void;
  API_BASE_URL: string;
}

// Sample files for users to try
const SAMPLE_FILES = {
  real: {
    image: [
      { name: "real-elon-musk.jpg", description: "Authentic portrait photo", type: "image", path: "/real-elon-musk.jpg" }
    ],
    video: [
      { name: "real-video.mp4", description: "Authentic interview footage", type: "video", path: "/real-video.mp4" }
    ],
    audio: [
      { name: "Coming Soon", description: "Audio analysis feature coming soon", type: "audio", path: "" }
    ]
  },
  fake: {
    image: [
      { name: "fake-elon-musk.jpg", description: "AI-generated celebrity", type: "image", path: "/fake-elon-musk.jpg" }
    ],
    video: [
      { name: "fake-speech.mp4", description: "Authentic interview footage", type: "video", path: "/fake-speech.mp4" }
    ],
    audio: [
      { name: "Coming Soon", description: "Audio analysis feature coming soon", type: "audio", path: "" }
    ]
  }
};

export default function FileUploadArea({ 
  files, 
  onFilesAdded, 
  onFileProcessed, 
  API_BASE_URL 
}: FileUploadAreaProps) {
  const [selectedFileType, setSelectedFileType] = useState<FileType>("image");
  const [isDragging, setIsDragging] = useState(false);
  const analysisResultsRef = useRef<HTMLDivElement>(null);
  const prevFilesLength = useRef(files.length);

  // Handle file drop
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => {
      const fileObj: UploadedFile = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        color: getColorByFileType(file.name),
        progress: 0,
        status: "analyzing"
      };
      
      // Create preview for images and videos
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        fileObj.preview = URL.createObjectURL(file);
      }
      
      return fileObj;
    });
    
    onFilesAdded(newFiles);
    
    // Process files with real API
    newFiles.forEach((_, index) => {
      processFileWithAPI(acceptedFiles[index], files.length + index);
    });
  }, [files.length, onFilesAdded]);

  // Scroll to analysis results when new files are added
  useEffect(() => {
    if (files.length > prevFilesLength.current && analysisResultsRef.current) {
      analysisResultsRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    prevFilesLength.current = files.length;
  }, [files.length]);

  // Process file with DeepSecure-AI API
  const processFileWithAPI = async (file: File, fileIndex: number) => {
    try {
      // Determine file type and endpoint
      let endpoint = '';
      if (file.type.startsWith('image/')) {
        endpoint = '/detect/image';
      } else if (file.type.startsWith('video/')) {
        endpoint = '/detect/video';
      } else if (file.type.startsWith('audio/')) {
        endpoint = '/detect/audio';
      } else {
        throw new Error('Unsupported file type');
      }

      // Update progress to show upload starting
      onFileProcessed(fileIndex, { progress: 10 });

      // Create FormData
      const formData = new FormData();
      formData.append('file', file);

      // Update progress to show upload in progress
      onFileProcessed(fileIndex, { progress: 50 });

      // Make API call
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        body: formData,
      });

      // Update progress to show processing
      onFileProcessed(fileIndex, { progress: 80 });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();

             // Update file with results
       const updatedFile: Partial<UploadedFile> = {
         progress: 100,
         status: result.is_fake ? "fake" : "authentic",
         confidence: result.confidence,
         result: result.result,
         detectionMethod: result.detection_method,
         modelsUsed: result.models_used,
         fakeProbability: result.fake_probability,
         individualPredictions: result.individual_predictions,
         audioAnalysis: result.analysis, // Add audio-specific analysis
       };

      if (result.frame_analysis) {
        updatedFile.frameAnalysis = {
          totalFramesAnalyzed: result.frame_analysis.total_frames_analyzed,
          fakeFrames: result.frame_analysis.fake_frames,
          realFrames: result.frame_analysis.real_frames,
          consistencyScore: result.frame_analysis.consistency_score,
          frameResults: result.frame_analysis.frame_results.map((frame: any) => ({
            frameIndex: frame.frame_index,
            fakeProbability: frame.fake_probability,
            isFake: frame.is_fake,
            confidence: frame.confidence
          }))
        };
      }

      onFileProcessed(fileIndex, updatedFile);

    } catch (error) {
      console.error('Error processing file:', error);
      
      // Update file with error
      onFileProcessed(fileIndex, {
        progress: 100,
        status: "inconclusive",
        error: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  // Configure dropzone
  const { getRootProps, getInputProps, isDragActive } = useDropzone({ 
    onDrop,
    accept: getAcceptedFileTypes(selectedFileType),
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false),
    onDropAccepted: () => setIsDragging(false),
    onDropRejected: () => setIsDragging(false)
  });

  // Determine file color based on extension
  const getColorByFileType = (filename: string): string => {
    const ext = filename.split('.').pop()?.toLowerCase() || '';
    if (['jpg', 'jpeg', 'png', 'gif', 'webp', 'bmp', 'tiff'].includes(ext)) return 'bg-blue-500';
    if (['mp4', 'mov', 'avi', 'webm', 'mkv', 'flv', 'wmv'].includes(ext)) return 'bg-accent';
    if (['wav', 'mp3', 'flac', 'ogg', 'm4a', 'aac'].includes(ext)) return 'bg-green-500';
    if (['pdf', 'doc', 'docx'].includes(ext)) return 'bg-orange-500';
    if (['zip', 'rar', '7z'].includes(ext)) return 'bg-pink-500';
    return 'bg-slate-500';
  };

  // Get accepted file types based on selection
  function getAcceptedFileTypes(type: FileType): {[key: string]: string[]} {
    switch(type) {
      case 'image':
        return { 'image/*': ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.bmp', '.tiff'] };
      case 'video':
        return { 'video/*': ['.mp4', '.mov', '.avi', '.mkv', '.webm', '.flv', '.wmv'] };
      case 'audio':
        return { 'audio/*': ['.wav', '.mp3', '.flac', '.ogg', '.m4a', '.aac'] };
      default:
        return {};
    }
  }

  // Handle file browse click
  const handleBrowseClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    document.getElementById('fileInput')?.click();
  };

  // Handle sample file click
  const handleSampleClick = async (sampleFile: any) => {
    // Check if it's a "Coming Soon" item
    if (sampleFile.name === "Coming Soon" || !sampleFile.path) {
      return; // Do nothing for coming soon items
    }

    try {
      // Fetch the sample file from public folder
      const response = await fetch(sampleFile.path);
      const blob = await response.blob();
      
      // Create a File object from the blob
      const file = new File([blob], sampleFile.name, { type: blob.type });
      
      // Create file object for our state
      const fileObj: UploadedFile = {
        name: file.name,
        size: `${(file.size / 1024).toFixed(1)} KB`,
        color: getColorByFileType(file.name),
        progress: 0,
        status: "analyzing"
      };
      
      // Create preview for images and videos
      if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
        fileObj.preview = URL.createObjectURL(file);
      }
      
      // Add to files list
      onFilesAdded([fileObj]);
      
      // Process with API
      const fileIndex = files.length;
      processFileWithAPI(file, fileIndex);
      
    } catch (error) {
      console.error('Error loading sample file:', error);
    }
  };

  // Get status badge for file
  const getStatusBadge = (file: UploadedFile) => {
    if (!file.status || file.status === "analyzing") {
      return <Badge variant="outline" className="animate-pulse">Analyzing...</Badge>;
    } else if (file.status === "authentic") {
      const confidence = file.confidence ? (file.confidence * 100).toFixed(1) : '0';
      return <Badge variant="default" className="bg-green-500 hover:bg-green-600">
        Authentic ({confidence}%)
      </Badge>;
    } else if (file.status === "fake") {
      const confidence = file.confidence ? (file.confidence * 100).toFixed(1) : '0';
      return <Badge variant="destructive">
        Deepfake ({confidence}%)
      </Badge>;
    } else {
      return <Badge variant="secondary" title={file.error}>
        {file.error ? 'Error' : 'Inconclusive'}
      </Badge>;
    }
  };

  // Preview Dialog Component
  const PreviewDialog = ({ file, children }: { file: any, children: React.ReactNode }) => {
    return (
      <Dialog>
        <DialogTrigger asChild>
          {children}
        </DialogTrigger>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-semibold text-gray-800">
              Preview: {file.name}
            </DialogTitle>
          </DialogHeader>
          <div className="mt-4">
            {file.type === 'image' ? (
              <div className="flex justify-center">
                <img 
                  src={file.path} 
                  alt={file.name} 
                  className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-lg"
                />
              </div>
            ) : file.type === 'video' ? (
              <div className="flex justify-center">
                <div className="relative">
                  <video 
                    src={file.path} 
                    controls 
                    className="max-w-full max-h-[70vh] rounded-lg shadow-lg"
                    preload="metadata"
                    playsInline
                    webkit-playsinline="true"
                    onError={(e) => {
                      console.error('Video load error:', e);
                      console.log('Video path:', file.path);
                    }}
                    onLoadStart={() => console.log('Video loading started:', file.path)}
                    onLoadedMetadata={(e) => {
                      const video = e.target as HTMLVideoElement;
                      console.log('Video metadata loaded:', {
                        duration: video.duration,
                        videoWidth: video.videoWidth,
                        videoHeight: video.videoHeight,
                        readyState: video.readyState
                      });
                    }}
                  >
                    <source src={file.path} type="video/mp4" />
                    <source src={file.path} type="video/webm" />
                    <source src={file.path} type="video/ogg" />
                    <div className="p-4 text-center text-gray-600">
                      <p>Video file not found or not supported</p>
                      <p className="text-sm">Path: {file.path}</p>
                    </div>
                  </video>
                  <div className="absolute top-2 left-2 bg-black bg-opacity-75 text-white px-2 py-1 rounded text-xs">
                    VIDEO
                  </div>
                </div>
              </div>
            ) : file.type === 'audio' ? (
              <div className="flex justify-center">
                <audio 
                  src={file.path} 
                  controls 
                  className="w-full max-w-md"
                  preload="metadata"
                >
                  <source src={file.path} type="audio/mpeg" />
                  Your browser does not support the audio tag.
                </audio>
              </div>
            ) : null}
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">File Details</h4>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-medium text-gray-600">Name:</span>
                  <span className="ml-2 text-gray-800">{file.name}</span>
                </div>
                <div>
                  <span className="font-medium text-gray-600">Type:</span>
                  <span className="ml-2 text-gray-800 capitalize">{file.type}</span>
                </div>
                <div className="col-span-2">
                  <span className="font-medium text-gray-600">Description:</span>
                  <span className="ml-2 text-gray-800">{file.description}</span>
                </div>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    );
  };

  return (
    <div className="bg-card rounded-xl p-8 shadow-lg border border-border">
      <div className="flex justify-between items-center mb-6">
                 <div>
           <h2 className="text-2xl font-bold text-amber-900">
             Quick Analysis
           </h2>
           <p className="text-amber-700 mt-1">Upload files to verify authenticity with AI-powered detection</p>
         </div>
         
         <Tabs defaultValue="image" className="w-auto" onValueChange={(value) => setSelectedFileType(value as FileType)}>
           <TabsList className="grid grid-cols-3 h-10 bg-amber-50 p-1">
             <TabsTrigger value="image" className="text-sm flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:shadow-sm data-[state=active]:text-amber-900">
               <Image className="h-4 w-4" /> Image
             </TabsTrigger>
             <TabsTrigger value="video" className="text-sm flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:shadow-sm data-[state=active]:text-amber-900">
               <Video className="h-4 w-4" /> Video
             </TabsTrigger>
             <TabsTrigger value="audio" className="text-sm flex items-center gap-2 data-[state=active]:bg-amber-100 data-[state=active]:shadow-sm data-[state=active]:text-amber-900">
               <Music className="h-4 w-4" /> Audio
             </TabsTrigger>
           </TabsList>
         </Tabs>
      </div>
      
      {/* Enhanced Drop Zone */}
      <div 
        {...getRootProps()} 
        className={`
          border-3 border-dashed rounded-2xl bg-amber-50
          ${isDragging ? 'border-amber-600 bg-amber-100 scale-[1.02]' : isDragActive ? 'border-amber-500 bg-amber-75' : 'border-amber-300'} 
          flex flex-col items-center justify-center 
          p-16 mb-6 cursor-pointer hover:bg-amber-100 
          transition-all duration-300 ease-out
          relative overflow-hidden
        `}
      >
        {/* Animated background elements */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-4 left-4 w-20 h-20 bg-amber-400 rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-4 right-4 w-16 h-16 bg-amber-500 rounded-full blur-xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/4 w-12 h-12 bg-amber-600 rounded-full blur-lg animate-pulse delay-500"></div>
        </div>

        <input {...getInputProps()} id="fileInput" />
        
        {/* Enhanced upload icon */}
        <div className={`relative mb-6 transition-all duration-300 ${isDragging ? 'scale-125' : 'scale-100'}`}>
          <div className="absolute inset-0 bg-amber-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          <div className="relative bg-amber-800 rounded-full p-8 shadow-2xl">
            <UploadCloud className={`h-20 w-20 text-amber-50 ${isDragging ? 'animate-bounce' : ''}`} />
          </div>
        </div>

        {/* Enhanced text */}
        <div className="text-center mb-6">
          <h3 className="text-2xl font-bold text-amber-900 mb-2">
            {isDragging ? 'Drop your files here!' : 'Drop your files here'}
          </h3>
          <p className="text-amber-700 mb-4">or</p>
        <Button 
          onClick={handleBrowseClick}
            size="lg"
            className="bg-amber-800 hover:bg-amber-900 text-amber-50 px-8 py-3 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-105"
        >
          Browse Files
        </Button>
        </div>
        
        {/* Enhanced supported formats */}
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center gap-2 text-sm text-amber-600 hover:text-amber-800 transition-colors">
                <Info className="h-4 w-4" />
                <span className="font-medium">Supported formats</span>
                <Sparkles className="h-4 w-4 text-amber-600" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="top" className="p-3">
              <div className="space-y-1">
                <p className="font-semibold">Images:</p>
                <p className="text-xs">JPG, PNG, WEBP, GIF, BMP, TIFF</p>
                <p className="font-semibold mt-2">Videos:</p>
                <p className="text-xs">MP4, MOV, AVI, WEBM, MKV</p>
                <p className="font-semibold mt-2">Audio:</p>
                <p className="text-xs">WAV, MP3, FLAC, OGG, M4A</p>
              </div>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </div>

      {/* Sample Content Section */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
          <Play className="h-6 w-6 text-gray-600" />
          Try with Sample Content
          <span className="text-sm font-normal text-gray-600 ml-2">(Click any sample to test the system)</span>
        </h3>
        
        <div className="grid grid-cols-2 gap-6">
          {/* Real Content */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Authentic Content</h4>
                <p className="text-sm text-gray-600">Real, unmodified media files</p>
              </div>
            </div>
            <div className="space-y-3">
              {SAMPLE_FILES.real[selectedFileType].map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-400 transition-all duration-200 hover:shadow-md cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <PreviewDialog file={file}>
                      <div className="cursor-pointer">
                        {selectedFileType === 'image' ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <img src={file.path} alt={file.name} className="w-full h-full object-cover" />
                          </div>
                        ) : selectedFileType === 'video' ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center relative hover:shadow-md transition-shadow">
                            <video src={file.path} className="w-full h-full object-cover" muted>
                              <source src={file.path} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <Video className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors hover:shadow-md">
                            <Music className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </PreviewDialog>
                                         <div>
                       <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-700 transition-colors">{file.name}</p>
                       <p className="text-xs text-gray-600">{file.description}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     {file.name === "Coming Soon" ? (
                       <>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           disabled
                           className="text-gray-400 border-gray-200 cursor-not-allowed"
                         >
                           <Eye className="h-3 w-3 mr-2" />
                           Preview
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           disabled
                           className="text-gray-400 border-gray-200 cursor-not-allowed"
                         >
                           <Download className="h-3 w-3 mr-2" />
                           Coming Soon
                         </Button>
                       </>
                     ) : (
                       <>
                         <PreviewDialog file={file}>
                           <Button 
                             size="sm" 
                             variant="outline" 
                             className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-all"
                           >
                             <Eye className="h-3 w-3 mr-2" />
                             Preview
                           </Button>
                         </PreviewDialog>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 group-hover:border-gray-400 transition-all"
                           onClick={() => handleSampleClick(file)}
                         >
                           <Download className="h-3 w-3 mr-2" />
                           Try Sample
                         </Button>
                       </>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>

           {/* Fake Content */}
          <div className="bg-gray-50 rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gray-600 rounded-lg flex items-center justify-center">
                <AlertTriangle className="h-5 w-5 text-white" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-800">Synthetic Content</h4>
                <p className="text-sm text-gray-600">AI-generated or manipulated media</p>
              </div>
            </div>
            <div className="space-y-3">
              {SAMPLE_FILES.fake[selectedFileType].map((file, index) => (
                <div key={index} className="flex items-center justify-between bg-white rounded-lg p-4 border border-gray-200 hover:border-gray-400 transition-all duration-200 hover:shadow-md cursor-pointer group">
                  <div className="flex items-center gap-4">
                    <PreviewDialog file={file}>
                      <div className="cursor-pointer">
                        {selectedFileType === 'image' ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <img src={file.path} alt={file.name} className="w-full h-full object-cover" />
                          </div>
                        ) : selectedFileType === 'video' ? (
                          <div className="w-10 h-10 rounded-lg overflow-hidden border border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center relative hover:shadow-md transition-shadow">
                            <video src={file.path} className="w-full h-full object-cover" muted>
                              <source src={file.path} type="video/mp4" />
                            </video>
                            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                              <Video className="h-3 w-3 text-white" />
                            </div>
                          </div>
                        ) : (
                          <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center group-hover:bg-gray-200 transition-colors hover:shadow-md">
                            <Music className="h-5 w-5 text-gray-600" />
                          </div>
                        )}
                      </div>
                    </PreviewDialog>
                                         <div>
                       <p className="text-sm font-semibold text-gray-800 group-hover:text-gray-700 transition-colors">{file.name}</p>
                       <p className="text-xs text-gray-600">{file.description}</p>
                     </div>
                   </div>
                   <div className="flex gap-2">
                     {file.name === "Coming Soon" ? (
                       <>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           disabled
                           className="text-gray-400 border-gray-200 cursor-not-allowed"
                         >
                           <Eye className="h-3 w-3 mr-2" />
                           Preview
                         </Button>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           disabled
                           className="text-gray-400 border-gray-200 cursor-not-allowed"
                         >
                           <Download className="h-3 w-3 mr-2" />
                           Coming Soon
                         </Button>
                       </>
                     ) : (
                       <>
                         <PreviewDialog file={file}>
                           <Button 
                             size="sm" 
                             variant="outline" 
                             className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 transition-all"
                           >
                             <Eye className="h-3 w-3 mr-2" />
                             Preview
                           </Button>
                         </PreviewDialog>
                         <Button 
                           size="sm" 
                           variant="outline" 
                           className="text-gray-600 border-gray-300 hover:bg-gray-100 hover:text-gray-800 group-hover:border-gray-400 transition-all"
                           onClick={() => handleSampleClick(file)}
                         >
                           <Download className="h-3 w-3 mr-2" />
                           Try Sample
                         </Button>
                       </>
                     )}
                   </div>
                 </div>
               ))}
             </div>
           </div>
         </div>
      </div>

      {/* File Preview Area */}
      {files.length > 0 && files.some(f => f.preview) && (
        <div className="flex gap-3 overflow-x-auto py-3 mb-4">
          {files.filter(f => f.preview).map((file, i) => (
            <div key={`preview-${i}`} className="relative group flex-shrink-0">
              <div className="w-20 h-20 rounded-xl overflow-hidden border-2 border-gray-200 shadow-md hover:shadow-lg transition-shadow">
                {file.preview && (
                  file.name.match(/\.(jpg|jpeg|png|gif|webp)$/i) ? 
                    <img src={file.preview} alt={file.name} className="w-full h-full object-cover" /> :
                    <video src={file.preview} className="w-full h-full object-cover" />
                )}
              </div>
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center rounded-xl">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Handle remove file
                  }}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              {file.status && (
                <div className="absolute -bottom-1 -right-1 z-20">
                  {file.status === "authentic" && <CheckCircle className="h-5 w-5 text-green-500 bg-white rounded-full shadow-sm" />}
                  {file.status === "fake" && <AlertTriangle className="h-5 w-5 text-red-500 bg-white rounded-full shadow-sm" />}
                  {file.status === "inconclusive" && <HelpCircle className="h-5 w-5 text-amber-500 bg-white rounded-full shadow-sm" />}
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Analysis Results Section */}
      {files.length > 0 && (
        <div className="mt-8" ref={analysisResultsRef}>
          <h3 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center">
              <CheckCircle className="h-5 w-5 text-white" />
                  </div>
            Analysis Results
            <span className="text-sm font-normal text-gray-600 ml-2">({files.filter(f => f.status && f.status !== "analyzing").length} completed)</span>
          </h3>

          <div className="space-y-4">
            {files.map((file, index) => (
              <div key={index} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                                 {/* File Header */}
                 <div className="bg-gradient-to-r from-gray-50 to-gray-100 px-6 py-4 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                     <div className="flex items-center gap-4">
                       {file.preview && (file.name.match(/\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i) || (file.preview.startsWith('blob:') && file.name.match(/\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i))) ? (
                         <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                           <img src={file.preview} alt={file.name} className="w-full h-full object-cover" />
                         </div>
                       ) : file.preview && file.name.match(/\.(mp4|mov|avi|webm|mkv|flv|wmv)$/i) ? (
                         <div className="w-12 h-12 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm bg-gray-100 flex items-center justify-center relative">
                           <video src={file.preview} className="w-full h-full object-cover" muted>
                             <source src={file.preview} type="video/mp4" />
                           </video>
                           <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
                             <Video className="h-4 w-4 text-white" />
                           </div>
                         </div>
                       ) : (
                         <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${file.color}`}>
                           <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
                             {file.name.match(/\.(jpg|jpeg|png|gif|webp|bmp|tiff)$/i) && <Image className="h-5 w-5 text-gray-600" />}
                             {file.name.match(/\.(mp4|mov|avi|webm|mkv|flv|wmv)$/i) && <Video className="h-5 w-5 text-gray-600" />}
                             {file.name.match(/\.(wav|mp3|flac|ogg|m4a|aac)$/i) && <Music className="h-5 w-5 text-gray-600" />}
                           </div>
                         </div>
                       )}
                       <div>
                         <h4 className="font-semibold text-gray-800">{file.name}</h4>
                         <p className="text-sm text-gray-600">{file.size}</p>
                       </div>
                     </div>
                    <div className="flex items-center gap-3">
                      {file.status === "analyzing" && (
                        <Badge variant="outline" className="animate-pulse">Analyzing...</Badge>
                      )}
                      {file.status === "authentic" && (
                        <Badge className="bg-green-500 hover:bg-green-600 text-white">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Authentic
                        </Badge>
                      )}
                      {file.status === "fake" && (
                        <Badge variant="destructive">
                          <AlertTriangle className="h-3 w-3 mr-1" />
                          Deepfake
                        </Badge>
                      )}
                      {file.status === "inconclusive" && (
                        <Badge variant="secondary">
                          <HelpCircle className="h-3 w-3 mr-1" />
                          Inconclusive
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>

                {/* Results Content */}
                {file.status && file.status !== "analyzing" && (
                  <div className="p-6">
                    {/* Main Result Row */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">
                            {file.confidence ? (file.confidence * 100).toFixed(1) : '0'}%
                          </div>
                          <div className="text-sm text-gray-600 font-medium">Confidence</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">
                            {file.status === "authentic" ? "Real" : "Fake"}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">Detection</div>
                        </div>
                      </div>
                      
                      <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-gray-800 mb-1">
                            {file.detectionMethod || "AI Analysis"}
                          </div>
                          <div className="text-sm text-gray-600 font-medium">Method</div>
                        </div>
                      </div>
                    </div>

                    {/* Models Used */}
                    {file.modelsUsed && file.modelsUsed.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                          AI Models Used
                        </h5>
                        <div className="flex flex-wrap gap-2">
                          {file.modelsUsed.map((model, idx) => (
                            <Badge key={idx} variant="outline" className="bg-gray-50 text-gray-700 border-gray-200">
                              {model}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Individual Predictions */}
                    {file.individualPredictions && file.individualPredictions.length > 0 && (
                      <div className="mb-6">
                        <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                          <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                          Model Predictions
                        </h5>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {file.individualPredictions.map((pred: any, idx: number) => (
                              <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3 border border-gray-200">
                                <span className="text-sm font-medium text-gray-700">{pred.model_name}</span>
                                <div className="flex items-center gap-2">
                                  <span className={`text-sm font-semibold ${pred.prediction === 'real' ? 'text-gray-800' : 'text-gray-600'}`}>
                                    {pred.prediction === 'real' ? 'Real' : 'Fake'}
                                  </span>
                                  <span className="text-xs text-gray-500">({(pred.confidence * 100).toFixed(1)}%)</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                                         {/* Frame Analysis for Videos */}
                     {file.frameAnalysis && (
                       <div className="mb-6">
                         <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                           <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                           Frame Analysis
                         </h5>
                         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">{file.frameAnalysis.totalFramesAnalyzed}</div>
                               <div className="text-xs text-gray-600">Total Frames</div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">{file.frameAnalysis.realFrames}</div>
                               <div className="text-xs text-gray-600">Real Frames</div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">{file.frameAnalysis.fakeFrames}</div>
                               <div className="text-xs text-gray-600">Fake Frames</div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">{(file.frameAnalysis.consistencyScore * 100).toFixed(1)}%</div>
                               <div className="text-xs text-gray-600">Consistency</div>
                             </div>
                           </div>
                           
                           {/* Frame Results Table */}
                           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                             <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                               <h6 className="font-semibold text-gray-800 text-sm">Frame-by-Frame Results</h6>
                             </div>
                             <div className="max-h-32 overflow-y-auto">
                               <div className="grid grid-cols-4 gap-2 p-3 text-xs">
                                 <div className="font-semibold text-gray-700">Frame</div>
                                 <div className="font-semibold text-gray-700">Status</div>
                                 <div className="font-semibold text-gray-700">Confidence</div>
                                 <div className="font-semibold text-gray-700">Fake Prob.</div>
                                 {file.frameAnalysis.frameResults.slice(0, 10).map((frame: any, idx: number) => (
                                   <React.Fragment key={idx}>
                                     <div className="text-gray-600">#{frame.frameIndex}</div>
                                     <div className={frame.isFake ? 'text-gray-600' : 'text-gray-800'}>
                                       {frame.isFake ? 'Fake' : 'Real'}
                                     </div>
                                     <div className="text-gray-600">{(frame.confidence * 100).toFixed(1)}%</div>
                                     <div className="text-gray-600">{(frame.fakeProbability * 100).toFixed(1)}%</div>
                                   </React.Fragment>
                                 ))}
                               </div>
                             </div>
                           </div>
                         </div>
                       </div>
                     )}

                     {/* Audio Analysis for Audio Files */}
                     {file.audioAnalysis && (
                       <div className="mb-6">
                         <h5 className="font-semibold text-gray-800 mb-3 flex items-center gap-2">
                           <div className="w-2 h-2 bg-gray-600 rounded-full"></div>
                           Audio Analysis
                         </h5>
                         <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                           <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">
                                 {file.audioAnalysis.spectral_analysis === 1 ? '100%' : '0%'}
                               </div>
                               <div className="text-xs text-gray-600">Spectral Analysis</div>
                               <div className="text-xs text-gray-500 mt-1">
                                 {file.audioAnalysis.spectral_analysis === 1 ? 'Suspicious' : 'Normal'}
                               </div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">
                                 {(file.audioAnalysis.temporal_consistency * 100).toFixed(1)}%
                               </div>
                               <div className="text-xs text-gray-600">Temporal Consistency</div>
                               <div className="text-xs text-gray-500 mt-1">
                                 {file.audioAnalysis.temporal_consistency < 0.5 ? 'Inconsistent' : 'Consistent'}
                               </div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">
                                 {file.audioAnalysis.voice_quality === 1 ? '100%' : '0%'}
                               </div>
                               <div className="text-xs text-gray-600">Voice Quality</div>
                               <div className="text-xs text-gray-500 mt-1">
                                 {file.audioAnalysis.voice_quality === 1 ? 'Artificial' : 'Natural'}
                               </div>
                             </div>
                             <div className="text-center">
                               <div className="text-lg font-bold text-gray-800">
                                 {file.audioAnalysis.prosodic_features === 1 ? '100%' : '0%'}
                               </div>
                               <div className="text-xs text-gray-600">Prosodic Features</div>
                               <div className="text-xs text-gray-500 mt-1">
                                 {file.audioAnalysis.prosodic_features === 1 ? 'Synthetic' : 'Natural'}
                               </div>
                             </div>
                           </div>
                           
                           {/* Audio Analysis Details */}
                           <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
                             <div className="bg-gray-100 px-4 py-2 border-b border-gray-200">
                               <h6 className="font-semibold text-gray-800 text-sm">Analysis Breakdown</h6>
                             </div>
                             <div className="p-4 space-y-3">
                               <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium text-gray-700">Spectral Analysis</span>
                                 <div className="flex items-center gap-2">
                                   <div className="w-20 bg-gray-200 rounded-full h-2">
                                     <div 
                                       className={`h-2 rounded-full ${file.audioAnalysis.spectral_analysis === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                                       style={{ width: `${file.audioAnalysis.spectral_analysis * 100}%` }}
                                     ></div>
                                   </div>
                                   <span className="text-xs text-gray-600 w-12">
                                     {file.audioAnalysis.spectral_analysis === 1 ? 'Suspicious' : 'Normal'}
                                   </span>
                                 </div>
                               </div>
                               
                               <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium text-gray-700">Temporal Consistency</span>
                                 <div className="flex items-center gap-2">
                                   <div className="w-20 bg-gray-200 rounded-full h-2">
                                     <div 
                                       className={`h-2 rounded-full ${file.audioAnalysis.temporal_consistency < 0.5 ? 'bg-red-500' : 'bg-green-500'}`}
                                       style={{ width: `${file.audioAnalysis.temporal_consistency * 100}%` }}
                                     ></div>
                                   </div>
                                   <span className="text-xs text-gray-600 w-12">
                                     {file.audioAnalysis.temporal_consistency < 0.5 ? 'Inconsistent' : 'Consistent'}
                                   </span>
                                 </div>
                  </div>
                               
                    <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium text-gray-700">Voice Quality</span>
                                 <div className="flex items-center gap-2">
                                   <div className="w-20 bg-gray-200 rounded-full h-2">
                                     <div 
                                       className={`h-2 rounded-full ${file.audioAnalysis.voice_quality === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                                       style={{ width: `${file.audioAnalysis.voice_quality * 100}%` }}
                                     ></div>
                                   </div>
                                   <span className="text-xs text-gray-600 w-12">
                                     {file.audioAnalysis.voice_quality === 1 ? 'Artificial' : 'Natural'}
                                   </span>
                                 </div>
                    </div>
                               
                               <div className="flex items-center justify-between">
                                 <span className="text-sm font-medium text-gray-700">Prosodic Features</span>
                    <div className="flex items-center gap-2">
                                   <div className="w-20 bg-gray-200 rounded-full h-2">
                                     <div 
                                       className={`h-2 rounded-full ${file.audioAnalysis.prosodic_features === 1 ? 'bg-red-500' : 'bg-green-500'}`}
                                       style={{ width: `${file.audioAnalysis.prosodic_features * 100}%` }}
                                     ></div>
                                   </div>
                                   <span className="text-xs text-gray-600 w-12">
                                     {file.audioAnalysis.prosodic_features === 1 ? 'Synthetic' : 'Natural'}
                                   </span>
                                 </div>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
                     )}

                    {/* Error Display */}
                    {file.error && (
                      <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center gap-2 text-gray-800">
                          <AlertTriangle className="h-4 w-4" />
                          <span className="font-medium">Analysis Error</span>
                        </div>
                        <p className="text-gray-700 text-sm mt-1">{file.error}</p>
                      </div>
                    )}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
