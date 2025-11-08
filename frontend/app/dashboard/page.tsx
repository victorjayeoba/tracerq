"use client";

import { useState, useCallback, useEffect } from "react";
import Header from "@/components/dashboard/header";
import FileUploadArea from "@/components/dashboard/file-upload-area";
import { UploadedFile } from "@/types/dashboard";

export default function DashboardPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  
  // API Configuration
  const API_BASE_URL = 'https://deepfake.opulentencounters.com'; // Change this to your VPS IP for production

  const handleFilesAdded = useCallback((newFiles: UploadedFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  // Handle file processed
  const handleFileProcessed = useCallback((fileIndex: number, updatedFile: Partial<UploadedFile>) => {
      setFiles(prev => {
        const updated = [...prev];
        if (updated[fileIndex]) {
        updated[fileIndex] = { ...updated[fileIndex], ...updatedFile };
        }
        return updated;
      });
  }, []);

  // Handle remove file
  const handleRemoveFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  }, []);

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.preview) URL.revokeObjectURL(file.preview);
      });
    };
  }, [files]);

  return (
    <div className="w-full">
      <div className="w-full px-8 py-6 flex flex-col">
        {/* Page Header */}
        <Header title="Welcome to Tracker!" />

        {/* Main Content - Full Width */}
        <div className="w-full max-w-6xl mx-auto">
          {/* File Upload Area with Results */}
          <FileUploadArea 
            files={files}
            onFilesAdded={handleFilesAdded}
            onFileProcessed={handleFileProcessed}
            API_BASE_URL={API_BASE_URL}
          />
        </div>
      </div>
    </div>
  );
}