"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { ArrowLeft, Camera, CheckCircle, RefreshCw, Shield, Eye, ArrowRight, Upload } from "lucide-react"

interface KYCVerificationStepProps {
  onComplete: (data: any) => void
  onBack: () => void
}

export default function KYCVerificationStep({ onComplete, onBack }: KYCVerificationStepProps) {
  const [photoTaken, setPhotoTaken] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [photoData, setPhotoData] = useState<string | null>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [cameraActive, setCameraActive] = useState(false)
  const [isAnimating, setIsAnimating] = useState(false)
  const [showFileUpload, setShowFileUpload] = useState(false)

  const startCamera = async () => {
    try {
      // Check if getUserMedia is supported
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        throw new Error("Camera not supported in this browser")
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 640, min: 480 },
          height: { ideal: 480, min: 360 },
        },
        audio: false,
      })

      if (videoRef.current) {
        videoRef.current.srcObject = stream

        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current
            ?.play()
            .then(() => {
              setCameraActive(true)
            })
            .catch((playError) => {
              console.error("Error playing video:", playError)
              alert("Error starting video playback. Please try again.")
            })
        }
      }
    } catch (error) {
      console.error("Error accessing camera:", error)
      let errorMessage = "Unable to access camera. "

      if (error.name === "NotAllowedError") {
        errorMessage += "Please allow camera permissions and try again."
      } else if (error.name === "NotFoundError") {
        errorMessage += "No camera found on this device."
      } else if (error.name === "NotSupportedError") {
        errorMessage += "Camera not supported in this browser."
      } else {
        errorMessage += "Please check your camera permissions and ensure you're using HTTPS."
      }

      alert(errorMessage)
    }
  }

  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream
      stream.getTracks().forEach((track) => track.stop())
      videoRef.current.srcObject = null
      setCameraActive(false)
    }
  }

  const takePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current
      const video = videoRef.current
      const context = canvas.getContext("2d")

      // Set canvas dimensions to match video
      canvas.width = video.videoWidth
      canvas.height = video.videoHeight

      if (context) {
        // Flip the image horizontally to match the mirrored video
        context.scale(-1, 1)
        context.drawImage(video, -canvas.width, 0, canvas.width, canvas.height)

        const photoDataUrl = canvas.toDataURL("image/jpeg", 0.8)
        setPhotoData(photoDataUrl)
        setPhotoTaken(true)
        stopCamera()
      }
    }
  }

  const retakePhoto = () => {
    setPhotoTaken(false)
    setPhotoData(null)
    startCamera()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    // Simulate API call for KYC verification
    setTimeout(() => {
      onComplete({
        kycPhoto: photoData,
        verificationStatus: "pending",
        timestamp: new Date().toISOString(),
      })
      setIsLoading(false)
    }, 2000)
  }

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      if (file.size > 10 * 1024 * 1024) {
        alert("File size must be less than 10MB")
        return
      }

      if (!file.type.startsWith("image/")) {
        alert("Please select an image file")
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        const result = e.target?.result as string
        setPhotoData(result)
        setPhotoTaken(true)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <Card className="border-0 shadow-xl bg-white/95 backdrop-blur-sm overflow-hidden">
      <div className="h-1 bg-gradient-to-r from-emerald-500 to-teal-500"></div>

      <CardContent className="p-8">
        <form onSubmit={handleSubmit} className="space-y-8">
          <Alert className="border-blue-200 bg-blue-50">
            <Eye className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-800">
              Please take a clear selfie for identity verification. Make sure your face is well-lit, clearly visible,
              and you're looking directly at the camera.
            </AlertDescription>
          </Alert>

          <div className="space-y-6">
            {!photoTaken ? (
              <div className="text-center">
                {!cameraActive && !showFileUpload ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-400 transition-colors">
                    <div className="bg-blue-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <Camera className="h-12 w-12 text-blue-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Take Your Selfie</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      We need to verify your identity to comply with financial regulations. Your photo will be securely
                      stored and used only for verification purposes.
                    </p>

                    <div className="space-y-4">
                      <Button
                        type="button"
                        onClick={startCamera}
                        className="h-12 px-8 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Start Camera
                      </Button>

                      <div className="text-sm text-gray-500">or</div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowFileUpload(true)}
                        className="h-12 px-8 border-gray-300 hover:bg-gray-50"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Upload Photo
                      </Button>

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>• Ensure good lighting</p>
                        <p>• Look directly at the camera</p>
                        <p>• Remove sunglasses or hats</p>
                      </div>
                    </div>
                  </div>
                ) : showFileUpload ? (
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-12 hover:border-blue-400 transition-colors">
                    <div className="bg-green-100 rounded-full p-6 w-24 h-24 mx-auto mb-6 flex items-center justify-center">
                      <Upload className="h-12 w-12 text-green-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-3">Upload Your Photo</h3>
                    <p className="text-gray-600 mb-6 max-w-md mx-auto">
                      Please upload a clear photo of yourself for identity verification.
                    </p>

                    <div className="space-y-4">
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleFileUpload}
                        className="hidden"
                        id="photo-upload"
                      />
                      <label
                        htmlFor="photo-upload"
                        className="inline-flex items-center h-12 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-lg shadow-lg transition-all duration-200 cursor-pointer"
                      >
                        <Upload className="h-5 w-5 mr-2" />
                        Choose Photo
                      </label>

                      <div className="text-sm text-gray-500">or</div>

                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowFileUpload(false)}
                        className="h-12 px-8 border-gray-300 hover:bg-gray-50"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Use Camera Instead
                      </Button>

                      <div className="text-xs text-gray-500 space-y-1">
                        <p>• Accepted formats: JPG, PNG, HEIC</p>
                        <p>• Maximum file size: 10MB</p>
                        <p>• Ensure photo is clear and well-lit</p>
                      </div>
                    </div>
                  </div>
                ) : (
                  // Camera active view remains the same
                  <div className="space-y-6">
                    <div className="relative bg-gray-900 rounded-xl overflow-hidden shadow-2xl max-w-md mx-auto">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        muted
                        className="w-full aspect-[4/3] object-cover transform scale-x-[-1]"
                      />

                      <div className="absolute inset-0 pointer-events-none">
                        <div className="absolute inset-4 border-2 border-white/30 rounded-xl"></div>
                        <div className="absolute top-4 left-4 right-4">
                          <div className="bg-black/60 backdrop-blur-sm rounded-lg p-3 text-center">
                            <p className="text-white text-sm font-medium">Position your face within the frame</p>
                          </div>
                        </div>
                        <div className="absolute top-8 left-8 w-6 h-6 border-l-2 border-t-2 border-white/60"></div>
                        <div className="absolute top-8 right-8 w-6 h-6 border-r-2 border-t-2 border-white/60"></div>
                        <div className="absolute bottom-8 left-8 w-6 h-6 border-l-2 border-b-2 border-white/60"></div>
                        <div className="absolute bottom-8 right-8 w-6 h-6 border-r-2 border-b-2 border-white/60"></div>
                      </div>
                    </div>

                    <div className="flex gap-4 justify-center">
                      <Button
                        type="button"
                        onClick={takePhoto}
                        className="h-14 px-8 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold rounded-xl shadow-lg transition-all duration-200 transform hover:scale-105"
                      >
                        <Camera className="h-5 w-5 mr-2" />
                        Capture Photo
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={stopCamera}
                        className="h-14 px-6 border-gray-300 hover:bg-gray-50 rounded-xl"
                      >
                        Cancel
                      </Button>
                    </div>

                    <div className="text-center">
                      <p className="text-sm text-gray-600">Make sure your face is clearly visible and well-lit</p>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              // Photo taken view remains the same
              <div className="text-center space-y-6">
                <div className="bg-green-50 border border-green-200 rounded-xl p-6">
                  <div className="bg-green-100 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <CheckCircle className="h-8 w-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Photo Captured Successfully</h3>
                  <p className="text-green-700">Your photo has been captured and is ready for verification.</p>
                </div>

                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <img
                      src={photoData || "/placeholder.svg"}
                      alt="Captured photo"
                      className="w-64 h-48 object-cover rounded-xl border-4 border-gray-200 shadow-lg"
                    />
                    <div className="absolute -top-2 -right-2 bg-green-500 rounded-full p-2 shadow-lg">
                      <CheckCircle className="h-5 w-5 text-white" />
                    </div>
                  </div>
                </div>

                <div className="flex gap-4 justify-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={retakePhoto}
                    className="h-12 px-6 border-gray-300 hover:bg-gray-50"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Retake Photo
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setPhotoTaken(false)
                      setPhotoData(null)
                      setShowFileUpload(true)
                    }}
                    className="h-12 px-6 border-gray-300 hover:bg-gray-50"
                  >
                    <Upload className="h-4 w-4 mr-2" />
                    Upload Different Photo
                  </Button>
                </div>
              </div>
            )}
          </div>

          <canvas ref={canvasRef} className="hidden" />

          <Alert className="border-amber-200 bg-amber-50">
            <Shield className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-amber-800">
              <strong>Privacy Notice:</strong> Your photo will be used solely for identity verification purposes and
              will be stored securely in compliance with data protection regulations. We never share your personal
              information with third parties.
            </AlertDescription>
          </Alert>

          <div className="flex justify-between pt-8 border-t">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="h-12 px-6 border-gray-300 hover:bg-gray-50"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <Button
              type="submit"
              disabled={!photoTaken || isLoading || isAnimating}
              className={`h-12 px-8 font-semibold rounded-xl shadow-lg transition-all duration-300 transform ${
                photoTaken && !isLoading
                  ? "bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white hover:scale-105 hover:shadow-xl"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <RefreshCw className="h-4 w-4 mr-2 animate-spin" />
                  Completing Onboarding...
                </>
              ) : (
                <>
                  Complete Onboarding
                  <ArrowRight className="h-4 w-4 ml-2" />
                </>
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
