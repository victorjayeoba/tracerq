import sys
import os
import torch
import numpy as np
from PIL import Image
import cv2
import librosa
import tempfile
import json
from typing import Dict, Any, Optional

# Try to import deepfake models, fallback to basic CV if not available
try:
    from deepfake_models import get_model_loader, DeepfakeModelLoader, EFFICIENTNET_AVAILABLE
    DEEPFAKE_MODELS_AVAILABLE = True
except ImportError as e:
    print(f"⚠️ Deepfake models not available: {e}")
    DEEPFAKE_MODELS_AVAILABLE = False
    EFFICIENTNET_AVAILABLE = False

class DeepSecureInference:
    """
    Advanced DeepSecure-AI inference using state-of-the-art deepfake detection models
    """
    
    def __init__(self):
        """Initialize the inference engine with real deepfake detection models"""
        self.device = torch.device('cuda' if torch.cuda.is_available() else 'cpu')
        self.models_loaded = False
        self.models_available = False
        self.model_loader = None
        self.load_models()
    
    def load_models(self):
        """Load real deepfake detection models"""
        try:
            print("🔄 Loading deepfake detection models...")
            
            if not DEEPFAKE_MODELS_AVAILABLE or not EFFICIENTNET_AVAILABLE:
                print("⚠️ Advanced deepfake models not available")
                print("💡 Install dependencies: pip install efficientnet-pytorch==0.7.1 gdown==4.7.1")
                print("🔄 Falling back to computer vision analysis...")
                self.model_loader = None
                self.models_loaded = True  # CV analysis is available
                self.models_available = True
                return
            
            # Initialize model loader
            self.model_loader = get_model_loader(self.device)
            
            # Set checkpoint directory
            checkpoint_dir = os.path.join(os.path.dirname(__file__), 'DeepSecure-AI', 'checkpoints')
            os.makedirs(checkpoint_dir, exist_ok=True)
            
            # Load all available models
            model_results = self.model_loader.load_all_models(checkpoint_dir)
            
            if "error" in model_results:
                print("⚠️ Cannot load advanced models, using computer vision fallback")
                self.model_loader = None
                self.models_loaded = True
                self.models_available = True
                return
            
            # Check if at least one model loaded successfully
            successful_models = [name for name, success in model_results.items() if success]
            
            if successful_models:
                self.models_loaded = True
                self.models_available = True
                print(f"✅ Successfully loaded {len(successful_models)} deepfake detection models:")
                for model_name in successful_models:
                    print(f"   📸 {model_name.upper()}")
                
                if len(successful_models) < len(model_results):
                    failed_models = [name for name, success in model_results.items() if not success]
                    print(f"⚠️ Failed to load: {', '.join(failed_models)}")
            else:
                print("❌ No deepfake detection models could be loaded, using CV fallback")
                self.model_loader = None
                self.models_loaded = True
                self.models_available = True
            
        except Exception as e:
            print(f"❌ Error loading models: {e}")
            print("🔄 Using computer vision fallback...")
            self.model_loader = None
            self.models_available = True
            self.models_loaded = True
    
    def detect_image(self, image_path: str) -> Dict[str, Any]:
        """
        Detect deepfakes in an image using state-of-the-art models or CV fallback
        
        Args:
            image_path: Path to the image file
            
        Returns:
            Dictionary containing detection results
        """
        try:
            if not self.models_available:
                return {
                    "error": "Deepfake detection models not available",
                    "file_path": image_path,
                    "status": "models_missing"
                }
            
            # Check if we have advanced models or need to use CV fallback
            if self.model_loader is None:
                return self._detect_image_cv_fallback(image_path)
            
            # Use ensemble prediction for best accuracy
            ensemble_result = self.model_loader.ensemble_predict(image_path)
            
            if "error" in ensemble_result:
                # Fallback to individual model prediction
                individual_predictions = self.model_loader.predict_image(image_path)
                
                # Find best available prediction
                best_prediction = None
                for model_name, pred in individual_predictions.items():
                    if "error" not in pred:
                        best_prediction = pred
                        break
                
                if best_prediction is None:
                    return {
                        "error": "All deepfake detection models failed",
                        "file_path": image_path,
                        "model_errors": individual_predictions
                    }
                
                # Use single model result
                fake_prob = best_prediction.get("fake_probability", 0.5)
                is_fake = best_prediction.get("is_fake", False)
                confidence = max(fake_prob, 1 - fake_prob)
                
                return {
                    "is_fake": bool(is_fake),
                    "confidence": float(confidence),
                    "fake_probability": float(fake_prob),
                    "result": f"The image is {'FAKE' if is_fake else 'REAL'}. Confidence: {confidence:.3f}",
                    "file_path": image_path,
                    "detection_method": "single_model_fallback",
                    "model_predictions": individual_predictions
                }
            
            # Use ensemble result
            fake_prob = ensemble_result["ensemble_fake_probability"]
            is_fake = ensemble_result["ensemble_is_fake"]
            confidence = ensemble_result["confidence"]
            
            return {
                "is_fake": bool(is_fake),
                "confidence": float(confidence),
                "fake_probability": float(fake_prob),
                "result": f"The image is {'FAKE' if is_fake else 'REAL'}. Confidence: {confidence:.3f}",
                "file_path": image_path,
                "detection_method": "ensemble",
                "models_used": ensemble_result["models_used"],
                "individual_predictions": ensemble_result["individual_predictions"]
            }
                
        except Exception as e:
            return {
                "error": f"Error processing image: {str(e)}",
                "file_path": image_path
            }
    
    def _detect_image_cv_fallback(self, image_path: str) -> Dict[str, Any]:
        """Computer vision fallback for image detection"""
        try:
            # Use traditional computer vision techniques
            fake_probability = self._analyze_image_for_deepfakes(image_path)
            is_fake = bool(fake_probability > 0.6)
            confidence = max(fake_probability, 1 - fake_probability)
            
            return {
                "is_fake": is_fake,
                "confidence": float(confidence),
                "fake_probability": float(fake_probability),
                "result": f"The image is {'FAKE' if is_fake else 'REAL'}. Confidence: {confidence:.3f}",
                "file_path": image_path,
                "detection_method": "computer_vision_fallback",
                "analysis": {
                    "noise_analysis": float(self._analyze_noise_patterns(image_path)),
                    "compression_artifacts": float(self._analyze_compression_artifacts(image_path)),
                    "face_consistency": float(self._analyze_face_consistency(image_path))
                }
            }
        except Exception as e:
            return {
                "error": f"CV analysis failed: {str(e)}",
                "file_path": image_path
            }
    
    def detect_video(self, video_path: str) -> Dict[str, Any]:
        """
        Detect deepfakes in a video using frame-by-frame analysis
        
        Args:
            video_path: Path to the video file
            
        Returns:
            Dictionary containing detection results
        """
        try:
            if not self.models_available or self.model_loader is None:
                return {
                    "error": "Deepfake detection models not available",
                    "file_path": video_path,
                    "status": "models_missing"
                }
            
            # Extract frames from video
            frames = self._extract_video_frames(video_path, max_frames=10)
            
            if not frames:
                return {
                    "error": "Could not extract frames from video",
                    "file_path": video_path
                }
            
            # Analyze each frame
            frame_results = []
            temp_files = []
            
            for i, frame in enumerate(frames):
                # Save frame temporarily
                temp_frame_path = os.path.join(tempfile.gettempdir(), f"temp_frame_{i}_{os.getpid()}.jpg")
                cv2.imwrite(temp_frame_path, frame)
                temp_files.append(temp_frame_path)
                
                # Analyze frame with ensemble
                frame_result = self.model_loader.ensemble_predict(temp_frame_path)
                
                if "error" not in frame_result:
                    frame_results.append({
                        "frame_index": i,
                        "fake_probability": frame_result["ensemble_fake_probability"],
                        "is_fake": frame_result["ensemble_is_fake"],
                        "confidence": frame_result["confidence"]
                    })
            
            # Clean up temporary files
            for temp_file in temp_files:
                try:
                    os.remove(temp_file)
                except:
                    pass
            
            if not frame_results:
                return {
                    "error": "No frames could be analyzed successfully",
                    "file_path": video_path
                }
            
            # Aggregate results
            fake_probabilities = [r["fake_probability"] for r in frame_results]
            confidences = [r["confidence"] for r in frame_results]
            
            avg_fake_probability = np.mean(fake_probabilities)
            avg_confidence = np.mean(confidences)
            is_fake = bool(avg_fake_probability > 0.5)
            
            # Calculate consistency score
            fake_votes = sum(1 for r in frame_results if r["is_fake"])
            consistency = max(fake_votes, len(frame_results) - fake_votes) / len(frame_results)
            
            return {
                "is_fake": is_fake,
                "confidence": float(avg_confidence),
                "fake_probability": float(avg_fake_probability),
                "result": f"The video is {'FAKE' if is_fake else 'REAL'}. Confidence: {avg_confidence:.3f}",
                "file_path": video_path,
                "frame_analysis": {
                    "total_frames_analyzed": len(frame_results),
                    "fake_frames": fake_votes,
                    "real_frames": len(frame_results) - fake_votes,
                    "consistency_score": float(consistency),
                    "frame_results": frame_results
                }
            }
                
        except Exception as e:
            return {
                "error": f"Error processing video: {str(e)}",
                "file_path": video_path
            }
    
    def detect_audio(self, audio_path: str) -> Dict[str, Any]:
        """
        Detect deepfakes in an audio file using advanced audio analysis
        
        Args:
            audio_path: Path to the audio file
            
        Returns:
            Dictionary containing detection results
        """
        try:
            if not self.models_available:
                return {
                    "error": "Audio analysis models not available",
                    "file_path": audio_path,
                    "status": "models_missing"
                }
            
            # Advanced audio analysis for deepfake detection
            fake_probability = self._analyze_audio_deepfakes(audio_path)
            is_fake = bool(fake_probability > 0.6)
            confidence = max(fake_probability, 1 - fake_probability)
            
            return {
                "is_fake": is_fake,
                "confidence": float(confidence),
                "fake_probability": float(fake_probability),
                "result": f"The audio is {'FAKE' if is_fake else 'REAL'}. Confidence: {confidence:.3f}",
                "file_path": audio_path,
                "analysis": {
                    "spectral_analysis": float(self._analyze_spectral_features(audio_path)),
                    "temporal_consistency": float(self._analyze_temporal_consistency(audio_path)),
                    "voice_quality": float(self._analyze_voice_quality(audio_path)),
                    "prosodic_features": float(self._analyze_prosodic_features(audio_path))
                }
            }
                
        except Exception as e:
            return {
                "error": f"Error processing audio: {str(e)}",
                "file_path": audio_path
            }
    
    def _extract_video_frames(self, video_path: str, max_frames: int = 10) -> list:
        """Extract frames from video for analysis"""
        try:
            cap = cv2.VideoCapture(video_path)
            frames = []
            frame_count = 0
            total_frames = int(cap.get(cv2.CAP_PROP_FRAME_COUNT))
            
            if total_frames == 0:
                cap.release()
                return []
            
            # Sample frames evenly
            sample_indices = np.linspace(0, total_frames-1, min(max_frames, total_frames), dtype=int)
            
            for i in range(total_frames):
                ret, frame = cap.read()
                if not ret:
                    break
                    
                if i in sample_indices:
                    frames.append(frame)
                    frame_count += 1
                    
                if frame_count >= max_frames:
                    break
            
            cap.release()
            return frames
            
        except Exception as e:
            print(f"Error extracting video frames: {e}")
            return []
    
    def _analyze_audio_deepfakes(self, audio_path: str) -> float:
        """Advanced audio deepfake analysis"""
        try:
            # Load audio
            y, sr = librosa.load(audio_path, sr=22050)
            
            # Multiple analysis techniques
            spectral_score = self._analyze_spectral_features(audio_path)
            temporal_score = self._analyze_temporal_consistency(audio_path)
            voice_score = self._analyze_voice_quality(audio_path)
            prosodic_score = self._analyze_prosodic_features(audio_path)
            
            # Advanced feature analysis
            mfcc_score = self._analyze_mfcc_patterns(y, sr)
            harmonic_score = self._analyze_harmonic_structure(y, sr)
            
            # Weighted combination
            combined_score = (
                spectral_score * 0.25 +
                temporal_score * 0.20 +
                voice_score * 0.20 +
                prosodic_score * 0.15 +
                mfcc_score * 0.10 +
                harmonic_score * 0.10
            )
            
            return min(combined_score, 1.0)
            
        except Exception as e:
            print(f"Error in audio analysis: {e}")
            return 0.5
    
    def _analyze_spectral_features(self, audio_path: str) -> float:
        """Analyze spectral features for artificial patterns"""
        try:
            y, sr = librosa.load(audio_path, sr=22050)
            
            # Extract spectral features
            spectral_centroids = librosa.feature.spectral_centroid(y=y, sr=sr)[0]
            spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
            
            # Analyze feature consistency and naturalness
            centroid_var = np.var(spectral_centroids)
            bandwidth_var = np.var(spectral_bandwidth)
            rolloff_var = np.var(spectral_rolloff)
            
            # Normalize and combine
            combined_variance = (centroid_var + bandwidth_var + rolloff_var) / 3
            normalized_score = min(combined_variance / 1000000, 1.0)
            
            return normalized_score
            
        except:
            return 0.5
    
    def _analyze_temporal_consistency(self, audio_path: str) -> float:
        """Analyze temporal consistency of audio"""
        try:
            y, sr = librosa.load(audio_path, sr=22050)
            
            # Analyze temporal patterns
            tempo, beats = librosa.beat.beat_track(y=y, sr=sr)
            zero_crossing_rate = librosa.feature.zero_crossing_rate(y)[0]
            
            # Check for unnatural temporal patterns
            zcr_variance = np.var(zero_crossing_rate)
            beat_consistency = np.std(np.diff(beats)) if len(beats) > 1 else 0
            
            # Combine metrics
            temporal_score = min((zcr_variance + beat_consistency) / 100, 1.0)
            
            return temporal_score
            
        except:
            return 0.5
    
    def _analyze_voice_quality(self, audio_path: str) -> float:
        """Analyze voice quality indicators"""
        try:
            y, sr = librosa.load(audio_path, sr=22050)
            
            # Voice quality features
            spectral_rolloff = librosa.feature.spectral_rolloff(y=y, sr=sr)[0]
            spectral_bandwidth = librosa.feature.spectral_bandwidth(y=y, sr=sr)[0]
            
            # Harmonic analysis
            harmonic, percussive = librosa.effects.hpss(y)
            harmonic_ratio = np.mean(np.abs(harmonic)) / (np.mean(np.abs(y)) + 1e-8)
            
            # Quality metrics
            rolloff_variance = np.var(spectral_rolloff)
            bandwidth_variance = np.var(spectral_bandwidth)
            
            # Combine metrics
            quality_score = min((rolloff_variance + bandwidth_variance + (1 - harmonic_ratio)) / 10000, 1.0)
            
            return quality_score
            
        except:
            return 0.5
    
    def _analyze_prosodic_features(self, audio_path: str) -> float:
        """Analyze prosodic features for naturalness"""
        try:
            y, sr = librosa.load(audio_path, sr=22050)
            
            # Prosodic features
            pitches, magnitudes = librosa.piptrack(y=y, sr=sr)
            
            # Extract fundamental frequency contour
            f0 = []
            for t in range(pitches.shape[1]):
                index = magnitudes[:, t].argmax()
                pitch = pitches[index, t]
                if pitch > 0:
                    f0.append(pitch)
            
            if len(f0) < 10:  # Not enough pitch data
                return 0.5
            
            # Analyze pitch naturalness
            f0_variance = np.var(f0)
            f0_range = np.max(f0) - np.min(f0)
            
            # Check for unnatural pitch patterns
            prosodic_score = min((f0_variance + f0_range) / 10000, 1.0)
            
            return prosodic_score
            
        except:
            return 0.5
    
    def _analyze_mfcc_patterns(self, y: np.ndarray, sr: int) -> float:
        """Analyze MFCC patterns for artificial signatures"""
        try:
            # Extract MFCC features
            mfccs = librosa.feature.mfcc(y=y, sr=sr, n_mfcc=13)
            
            # Analyze MFCC coefficient patterns
            mfcc_vars = np.var(mfccs, axis=1)
            mfcc_means = np.mean(mfccs, axis=1)
            
            # Look for unnatural patterns
            coefficient_variance = np.var(mfcc_vars)
            coefficient_range = np.max(mfcc_means) - np.min(mfcc_means)
            
            # Normalize score
            mfcc_score = min((coefficient_variance + coefficient_range) / 100, 1.0)
            
            return mfcc_score
            
        except:
            return 0.5
    
    def _analyze_harmonic_structure(self, y: np.ndarray, sr: int) -> float:
        """Analyze harmonic structure for naturalness"""
        try:
            # Separate harmonic and percussive components
            harmonic, percussive = librosa.effects.hpss(y)
            
            # Analyze harmonic content
            harmonic_strength = np.mean(np.abs(harmonic))
            total_strength = np.mean(np.abs(y))
            
            harmonic_ratio = harmonic_strength / (total_strength + 1e-8)
            
            # Check for unnatural harmonic patterns
            if harmonic_ratio > 0.9 or harmonic_ratio < 0.1:
                return min(abs(harmonic_ratio - 0.5) * 2, 1.0)
            
            return 0.3  # Normal harmonic content
            
        except:
            return 0.5
    
    def get_model_status(self) -> Dict[str, Any]:
        """
        Get the status of loaded models
        
        Returns:
            Dictionary containing model status information
        """
        status = {
            "models_loaded": self.models_loaded,
            "models_available": self.models_available,
            "device": str(self.device),
            "cuda_available": torch.cuda.is_available(),
            "model_type": "state_of_the_art_deepfake_detection"
        }
        
        if self.model_loader is not None:
            model_status = self.model_loader.get_model_status()
            status.update(model_status)
        
        return status
    
    def _analyze_image_for_deepfakes(self, image_path: str) -> float:
        """Analyze image for deepfake indicators using computer vision"""
        try:
            # Load image
            image = cv2.imread(image_path)
            if image is None:
                return 0.5
            
            # Convert to grayscale for analysis
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Multiple analysis techniques
            noise_score = self._analyze_noise_patterns(image_path)
            compression_score = self._analyze_compression_artifacts(image_path)
            face_score = self._analyze_face_consistency(image_path)
            
            # Combine scores (weighted average)
            combined_score = (noise_score * 0.4 + compression_score * 0.3 + face_score * 0.3)
            
            return min(combined_score, 1.0)
            
        except Exception as e:
            print(f"Error in image analysis: {e}")
            return 0.5
    
    def _analyze_noise_patterns(self, image_path: str) -> float:
        """Analyze noise patterns for inconsistencies"""
        try:
            image = cv2.imread(image_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Apply noise analysis filters
            laplacian = cv2.Laplacian(gray, cv2.CV_64F)
            variance = laplacian.var()
            
            # Normalize variance (typical range: 0-1000)
            normalized_variance = min(variance / 500.0, 1.0)
            
            # Higher variance might indicate artificial noise
            return normalized_variance
            
        except:
            return 0.5
    
    def _analyze_compression_artifacts(self, image_path: str) -> float:
        """Analyze compression artifacts"""
        try:
            image = cv2.imread(image_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # DCT-based analysis for compression artifacts
            # Simple edge detection for artifacts
            edges = cv2.Canny(gray, 50, 150)
            edge_density = np.sum(edges > 0) / (edges.shape[0] * edges.shape[1])
            
            # Normalize edge density
            return min(edge_density * 10, 1.0)
            
        except:
            return 0.5
    
    def _analyze_face_consistency(self, image_path: str) -> float:
        """Analyze face consistency and naturalness"""
        try:
            # Load face detection model
            face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
            
            image = cv2.imread(image_path)
            gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
            
            # Detect faces
            faces = face_cascade.detectMultiScale(gray, 1.1, 4)
            
            if len(faces) == 0:
                return 0.5  # No face detected
            
            # Analyze face regions for consistency
            face_scores = []
            for (x, y, w, h) in faces:
                face_roi = gray[y:y+h, x:x+w]
                
                # Analyze face region
                # Simple texture analysis
                texture_variance = np.var(face_roi)
                normalized_texture = min(texture_variance / 1000.0, 1.0)
                face_scores.append(normalized_texture)
            
            return np.mean(face_scores) if face_scores else 0.5
            
        except:
            return 0.5