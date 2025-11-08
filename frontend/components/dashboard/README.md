# Dashboard Components

This directory contains the modular components that make up the dashboard page. The components have been split from the original monolithic dashboard page for better maintainability and reusability.

## Component Structure

### Main Components

#### `FileUploadArea`
- **Purpose**: Handles file drag & drop, file type selection, and file preview
- **Props**:
  - `files`: Array of uploaded files
  - `onFilesAdded`: Callback when new files are added
  - `onFileProcessed`: Callback when file processing is updated
  - `API_BASE_URL`: Base URL for the API endpoints
- **Features**:
  - Drag & drop file upload
  - File type tabs (Image, Video, Audio)
  - File preview thumbnails
  - Progress tracking
  - API integration for file processing

#### `FileList`
- **Purpose**: Displays the list of uploaded files with their analysis results
- **Props**:
  - `files`: Array of uploaded files
  - `onRemoveFile`: Callback to remove a file
- **Features**:
  - File status badges
  - Progress bars
  - Detailed analysis results
  - Modal dialogs for detailed information
  - File removal functionality

#### `VerificationTools`
- **Purpose**: Shows available verification tools and analysis options
- **Features**:
  - Image Analyzer
  - Video Detector
  - Content Analytics
  - Verification History
  - Tooltips for each tool

#### `UpgradePlan`
- **Purpose**: Displays current plan status and upgrade options
- **Features**:
  - Usage visualization with circular progress
  - Plan status badge
  - Upgrade button
  - Usage statistics

#### `TrackingCTA`
- **Purpose**: Call-to-action for social media tracking features
- **Features**:
  - Promotional message
  - Link to tracking page
  - Visual icon and description

### Shared Types

#### `UploadedFile` Interface
Located in `@/types/dashboard.ts`, this interface defines the structure for uploaded files:

```typescript
interface UploadedFile {
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
}
```

## Usage Example

```tsx
import FileUploadArea from "@/components/dashboard/file-upload-area";
import FileList from "@/components/dashboard/file-list";
import VerificationTools from "@/components/dashboard/verification-tools";
import UpgradePlan from "@/components/dashboard/upgrade-plan";

export default function DashboardPage() {
  const [files, setFiles] = useState<UploadedFile[]>([]);
  
  const handleFilesAdded = useCallback((newFiles: UploadedFile[]) => {
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const handleFileProcessed = useCallback((fileIndex: number, updatedFile: Partial<UploadedFile>) => {
    setFiles(prev => {
      const updated = [...prev];
      if (updated[fileIndex]) {
        updated[fileIndex] = { ...updated[fileIndex], ...updatedFile };
      }
      return updated;
    });
  }, []);

  return (
    <div className="flex gap-6">
      <div className="w-2/3">
        <FileUploadArea 
          files={files}
          onFilesAdded={handleFilesAdded}
          onFileProcessed={handleFileProcessed}
          API_BASE_URL="http://your-api-url"
        />
        <FileList 
          files={files}
          onRemoveFile={(index) => setFiles(prev => prev.filter((_, i) => i !== index))}
        />
      </div>
      <div className="w-1/3">
        <VerificationTools />
        <UpgradePlan />
      </div>
    </div>
  );
}
```

## Benefits of This Structure

1. **Maintainability**: Each component has a single responsibility
2. **Reusability**: Components can be used in other parts of the application
3. **Testing**: Easier to write unit tests for individual components
4. **Performance**: Better code splitting and lazy loading opportunities
5. **Team Development**: Multiple developers can work on different components simultaneously
6. **Type Safety**: Shared interfaces ensure consistency across components

## File Organization

```
frontend/components/dashboard/
├── README.md
├── file-upload-area.tsx
├── file-list.tsx
├── verification-tools.tsx
├── upgrade-plan.tsx
├── tracking-cta.tsx
└── header.tsx (existing)

frontend/types/
└── dashboard.ts
```

## Dependencies

All components use the shared UI components from `@/components/ui/` and follow the established design system patterns. The components are built with TypeScript and use React hooks for state management.
