"use client";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileText, X, Info, Sparkles, Shield, AlertTriangle, CheckCircle } from "lucide-react";

import { UploadedFile } from "@/types/dashboard";

interface FileListProps {
  files: UploadedFile[];
  onRemoveFile: (index: number) => void;
}

export default function FileList({ files, onRemoveFile }: FileListProps) {
  // Get status badge for file
  const getStatusBadge = (file: UploadedFile) => {
    if (!file.status || file.status === "analyzing") {
      return <Badge variant="outline" className="animate-pulse bg-blue-50 text-blue-700 border-blue-200">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-pulse"></div>
          Analyzing...
        </div>
      </Badge>;
    } else if (file.status === "authentic") {
      const confidence = file.confidence ? (file.confidence * 100).toFixed(1) : '0';
      return <Badge variant="default" className="bg-gradient-to-r from-green-500 to-emerald-600 text-white shadow-sm">
        <CheckCircle className="h-3 w-3 mr-1" />
        Authentic ({confidence}%)
      </Badge>;
    } else if (file.status === "fake") {
      const confidence = file.confidence ? (file.confidence * 100).toFixed(1) : '0';
      return <Badge variant="destructive" className="bg-gradient-to-r from-red-500 to-pink-600 shadow-sm">
        <AlertTriangle className="h-3 w-3 mr-1" />
        Deepfake ({confidence}%)
      </Badge>;
    } else {
      return <Badge variant="secondary" title={file.error} className="bg-amber-50 text-amber-700 border-amber-200">
        <Shield className="h-3 w-3 mr-1" />
        {file.error ? 'Error' : 'Inconclusive'}
      </Badge>;
    }
  };

  if (files.length === 0) return null;

  return (
    <div className="bg-card rounded-xl p-6 shadow-lg border border-border">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
          <FileText className="h-5 w-5 text-white" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Uploaded Files</h3>
          <p className="text-sm text-gray-600">Track your analysis progress and results</p>
        </div>
      </div>
      
      <div className="space-y-4">
        {files.map((file, i) => (
          <div key={i} className="bg-gradient-to-r from-gray-50 to-white rounded-xl p-5 hover:from-gray-100 hover:to-gray-50 transition-all duration-200 border border-gray-200 hover:border-gray-300 hover:shadow-md">
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-4 flex-1">
                <div className={`${file.color} rounded-xl w-12 h-12 flex items-center justify-center shadow-md`}>
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1 min-w-0 pr-4">
                      <h4 className="text-base font-semibold text-gray-800 truncate mb-2">{file.name}</h4>
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-sm text-gray-600 bg-gray-100 px-3 py-1 rounded-full">{file.size}</span>
                        {file.detectionMethod && (
                          <Badge variant="outline" className="text-xs px-3 py-1 h-6 bg-blue-50 text-blue-700 border-blue-200">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {file.detectionMethod}
                          </Badge>
                        )}
                      </div>
                      {file.modelsUsed && file.modelsUsed.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {file.modelsUsed.map((model, idx) => (
                            <Badge key={idx} variant="secondary" className="text-xs px-2 py-1 h-5 bg-purple-50 text-purple-700 border-purple-200">
                              {model}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>
                    <div className="flex-shrink-0">
                      {getStatusBadge(file)}
                    </div>
                  </div>
                  
                  {/* Progress bar or analysis dots */}
                  {file.progress < 100 ? (
                    <div className="mb-3">
                      <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                        <span>Processing...</span>
                        <span>{file.progress}%</span>
                      </div>
                      <Progress value={file.progress} className="h-2 bg-gray-200" />
                    </div>
                  ) : file.status === "analyzing" ? (
                    <div className="mb-3">
                      <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                        <span>Analyzing with AI models...</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse"></div>
                        <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse delay-100"></div>
                        <div className="h-2 w-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full animate-pulse delay-200"></div>
                      </div>
                    </div>
                  ) : null}
                  
                  {/* Detailed results for completed files */}
                  {file.status !== "analyzing" && file.status !== undefined && (
                    <div className="grid grid-cols-2 gap-4 bg-white rounded-lg p-3 border border-gray-100">
                      {file.confidence && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-800">{(file.confidence * 100).toFixed(1)}%</div>
                          <div className="text-xs text-gray-600">Confidence</div>
                        </div>
                      )}
                      {file.frameAnalysis && (
                        <div className="text-center">
                          <div className="text-lg font-bold text-gray-800">
                            {file.frameAnalysis.fakeFrames}/{file.frameAnalysis.totalFramesAnalyzed}
                          </div>
                          <div className="text-xs text-gray-600">Fake Frames</div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
              
              <div className="flex items-center gap-2 ml-4">
                {/* Detailed results button */}
                {file.status !== "analyzing" && file.status !== undefined && (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 bg-blue-50 text-blue-600 hover:bg-blue-100">
                        <Info className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[85vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                            <FileText className="h-4 w-4 text-white" />
                          </div>
                          Analysis Details - {file.name}
                        </DialogTitle>
                      </DialogHeader>
                      <div className="space-y-6">
                        {/* Basic Results */}
                        <div className="grid grid-cols-2 gap-6">
                          <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200">
                            <h4 className="font-semibold mb-3 text-green-800 flex items-center gap-2">
                              <CheckCircle className="h-4 w-4" />
                              Detection Result
                            </h4>
                            <div className="space-y-2">
                              <div className="flex items-center gap-2">
                                {getStatusBadge(file)}
                                <span className="text-sm font-medium">{file.result}</span>
                              </div>
                              <div className="space-y-1 text-sm">
                                <p className="text-green-700">
                                  <span className="font-medium">Confidence:</span> {file.confidence ? (file.confidence * 100).toFixed(2) : 'N/A'}%
                                </p>
                                <p className="text-green-700">
                                  <span className="font-medium">Fake Probability:</span> {file.fakeProbability ? (file.fakeProbability * 100).toFixed(2) : 'N/A'}%
                                </p>
                              </div>
                            </div>
                          </div>
                          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-200">
                            <h4 className="font-semibold mb-3 text-blue-800 flex items-center gap-2">
                              <Sparkles className="h-4 w-4" />
                              Detection Method
                            </h4>
                            <div className="space-y-2 text-sm">
                              <p className="text-blue-700 font-medium">{file.detectionMethod || 'N/A'}</p>
                              <p className="text-blue-600">
                                <span className="font-medium">Models:</span> {file.modelsUsed?.join(', ') || 'N/A'}
                              </p>
                            </div>
                          </div>
                        </div>
                        
                        {/* Individual Model Predictions */}
                        {file.individualPredictions && (
                          <div className="bg-gray-50 rounded-xl p-4">
                            <h4 className="font-semibold mb-4 text-gray-800">Individual Model Predictions</h4>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                              {Object.entries(file.individualPredictions).map(([model, prediction]: [string, any]) => (
                                <div key={model} className="bg-white rounded-lg p-3 border border-gray-200">
                                  <div className="flex items-center justify-between mb-2">
                                    <span className="font-medium text-sm text-gray-800">{model}</span>
                                    <Badge variant={prediction.is_fake ? "destructive" : "secondary"} className="text-xs">
                                      {prediction.is_fake ? "FAKE" : "REAL"}
                                    </Badge>
                                  </div>
                                  <div className="grid grid-cols-2 gap-2 text-xs text-gray-600">
                                    <div className="bg-green-50 rounded px-2 py-1">
                                      <span className="font-medium">Real:</span> {(prediction.real_probability * 100).toFixed(1)}%
                                    </div>
                                    <div className="bg-red-50 rounded px-2 py-1">
                                      <span className="font-medium">Fake:</span> {(prediction.fake_probability * 100).toFixed(1)}%
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                        
                        {/* Frame Analysis for Videos */}
                        {file.frameAnalysis && (
                          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-200">
                            <h4 className="font-semibold mb-4 text-purple-800">Frame Analysis</h4>
                            <div className="grid grid-cols-4 gap-4 mb-6">
                              <div className="text-center bg-white rounded-lg p-3 border border-purple-200">
                                <div className="text-2xl font-bold text-blue-600">{file.frameAnalysis.totalFramesAnalyzed}</div>
                                <div className="text-xs text-gray-600">Total Frames</div>
                              </div>
                              <div className="text-center bg-white rounded-lg p-3 border border-purple-200">
                                <div className="text-2xl font-bold text-red-600">{file.frameAnalysis.fakeFrames}</div>
                                <div className="text-xs text-gray-600">Fake Frames</div>
                              </div>
                              <div className="text-center bg-white rounded-lg p-3 border border-purple-200">
                                <div className="text-2xl font-bold text-green-600">{file.frameAnalysis.realFrames}</div>
                                <div className="text-xs text-gray-600">Real Frames</div>
                              </div>
                              <div className="text-center bg-white rounded-lg p-3 border border-purple-200">
                                <div className="text-2xl font-bold text-purple-600">{file.frameAnalysis.consistencyScore.toFixed(2)}</div>
                                <div className="text-xs text-gray-600">Consistency</div>
                              </div>
                            </div>
                            
                            {/* Frame Results */}
                            <div className="space-y-3 max-h-60 overflow-y-auto">
                              <h5 className="font-medium text-sm text-purple-800">Frame-by-Frame Results</h5>
                              {file.frameAnalysis.frameResults.map((frame, idx) => (
                                <div key={idx} className="flex items-center justify-between bg-white rounded-lg p-3 border border-purple-200">
                                  <span className="text-sm font-medium text-gray-800">Frame {frame.frameIndex}</span>
                                  <div className="flex items-center gap-3">
                                    <Badge variant={frame.isFake ? "destructive" : "secondary"} className="text-xs">
                                      {frame.isFake ? "FAKE" : "REAL"}
                                    </Badge>
                                    <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">
                                      {(frame.confidence * 100).toFixed(1)}%
                                    </span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </DialogContent>
                  </Dialog>
                )}
                
                {/* Remove file button */}
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className="h-9 w-9 bg-red-50 text-red-600 hover:bg-red-100"
                  onClick={() => onRemoveFile(i)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
