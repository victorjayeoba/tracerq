export type FileType = "image" | "video" | "audio";

export interface UploadedFile {
  name: string;
  size: string;
  color: string;
  progress: number;
  status?: "analyzing" | "authentic" | "fake" | "inconclusive";
  preview?: string;
  confidence?: number;
  result?: string;
  error?: string;
  detectionMethod?: string;
  modelsUsed?: string[];
  fakeProbability?: number;
  individualPredictions?: Record<string, any>;
  frameAnalysis?: {
    totalFramesAnalyzed: number;
    fakeFrames: number;
    realFrames: number;
    consistencyScore: number;
    frameResults: Array<{
      frameIndex: number;
      fakeProbability: number;
      isFake: boolean;
      confidence: number;
    }>;
  };
  audioAnalysis?: {
    spectral_analysis: number;
    temporal_consistency: number;
    voice_quality: number;
    prosodic_features: number;
  };
}
