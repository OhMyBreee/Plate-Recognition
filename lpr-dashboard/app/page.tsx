"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Camera, Upload, Search, Clock, Car, CheckCircle, XCircle, AlertCircle, Dot } from 'lucide-react';
import { Navbar } from "@/components/navbar"
import Hero from "@/components/hero"
import DotAnimation from "@/components/dot-animation"
import { Type_writer_hero } from '@/components/type-writer-hero'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { MousePointer2 , Github } from 'lucide-react';
export default function LPRDashboard() {
  const [activeTab, setActiveTab] = useState('live');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [detectedPlate, setDetectedPlate] = useState(null);
  const [recentDetections, setRecentDetections] = useState([
    { id: 1, plate: 'ABC-1234', time: '2 mins ago', confidence: 98, status: 'allowed' },
    { id: 2, plate: 'XYZ-5678', time: '5 mins ago', confidence: 95, status: 'allowed' },
    { id: 3, plate: 'DEF-9012', time: '8 mins ago', confidence: 92, status: 'blocked' },
    { id: 4, plate: 'GHI-3456', time: '12 mins ago', confidence: 97, status: 'allowed' },
  ]);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const detectionIntervalRef = useRef(null);

  // Start camera
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment', width: 1280, height: 720 } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsCameraActive(true);
        startDetection();
      }
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Could not access camera. Please check permissions.');
    }
  };
  // Stop camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
      setIsCameraActive(false);
      setDetectedPlate(null);
      if (detectionIntervalRef.current) {
        clearInterval(detectionIntervalRef.current);
      }
    }
  };

  // Simulate plate detection
  const detectPlate = () => {
    // This is a simulation - in production, you'd send frames to your ML backend
    const mockPlates = ['ABC-1234', 'XYZ-5678', 'DEF-9012', 'GHI-3456', 'JKL-7890', 'MNO-2345'];
    const randomPlate = mockPlates[Math.floor(Math.random() * mockPlates.length)];
    const confidence = Math.floor(Math.random() * (99 - 85) + 85);
    const status = Math.random() > 0.2 ? 'allowed' : 'blocked';

    // Only detect occasionally (30% chance per check)
    if (Math.random() > 0.7) {
      const detection = {
        plate: randomPlate,
        confidence: confidence,
        status: status,
        timestamp: Date.now()
      };
      
      setDetectedPlate(detection);

      // Add to recent detections
      const newDetection = {
        id: Date.now(),
        plate: randomPlate,
        time: 'Just now',
        confidence: confidence,
        status: status
      };

      setRecentDetections(prev => [newDetection, ...prev.slice(0, 9)]);

      // Clear detection after 3 seconds
      setTimeout(() => {
        setDetectedPlate(null);
      }, 3000);
    }
  };

  // Start detection loop
  const startDetection = () => {
    detectionIntervalRef.current = setInterval(() => {
      detectPlate();
    }, 2000); // Check every 2 seconds
  };

  // Cleanup on unmount or tab change
  useEffect(() => {
    if (activeTab !== 'live') {
      stopCamera();
    }
    return () => {
      stopCamera();
    };
  }, [activeTab]);

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(URL.createObjectURL(file));
      setIsProcessing(true);
      setTimeout(() => setIsProcessing(false), 2000);
    }
  };

  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Header */}
      <div className='lg:px-16 py-4 w-full backdrop-blur-sm top-0 z-10 sticky'>
        <Navbar></Navbar>
      </div>
      <div className='w-full h-screen flex justify-center items-center ' id = "hero">
        <DotAnimation></DotAnimation>
        <div className='flex flex-col w-fit items-center space-y-3 px-3 py-3'>
          <Type_writer_hero></Type_writer_hero>
          <div className = "flex flex space-x-4">
            <Button variant = "outline" size="sm" className = "text-foreground">
              <Link href="/inference" className='flex w-fit space-x-3 items-center justify-center'>
                <div>Try Now!</div><MousePointer2/>
              </Link>
            </Button>
            <Button variant = "outline" size="sm" className = "text-foreground" >
              <Link href="https://github.com/OhMyBreee/Plate-Recognition" className='flex w-fit space-x-3 items-center justify-center' target="_blank">
                <Github/>
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* <header className="bg-slate-800/50 backdrop-blur-sm border-b border-slate-700 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-500 p-2 rounded-lg">
                <Car className="w-6 h-6 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-white">LPR System</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className={`flex items-center space-x-2 ${isCameraActive ? 'bg-green-500/20' : 'bg-slate-700/50'} px-3 py-1 rounded-full`}>
                <div className={`w-2 h-2 ${isCameraActive ? 'bg-green-500 animate-pulse' : 'bg-slate-500'} rounded-full`}></div>
                <span className={`${isCameraActive ? 'text-green-400' : 'text-slate-400'} text-sm font-medium`}>
                  {isCameraActive ? 'Live' : 'Offline'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </header> */}
      {/* <Hero className="relative flex flex-col md:flex-row items-center justify-center h-screen px-6 w-screen"></Hero> */}
      {/* <FlickeringGrid className="relative flex flex-col md:flex-row items-center justify-center h-screen px-6 w-screen"></FlickeringGrid> */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Card */}
        <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6 mb-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="flex items-center space-x-4">
              <Camera className="w-10 h-10 text-blue-400 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-sm">Total Scanned</p>
                <p className="text-2xl font-bold text-white mt-1">1,247</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <Clock className="w-10 h-10 text-purple-400 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-sm">Today</p>
                <p className="text-2xl font-bold text-white mt-1">{recentDetections.length}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <CheckCircle className="w-10 h-10 text-green-400 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-sm">Accuracy</p>
                <p className="text-2xl font-bold text-white mt-1">96%</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <XCircle className="w-10 h-10 text-red-400 flex-shrink-0" />
              <div>
                <p className="text-slate-400 text-sm">Blocked</p>
                <p className="text-2xl font-bold text-white mt-1">{recentDetections.filter(d => d.status === 'blocked').length}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Camera/Upload */}
          <div className="lg:col-span-2">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl overflow-hidden">
              {/* Tabs */}
              <div className="flex border-b border-slate-700">
                <button
                  onClick={() => setActiveTab('live')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'live'
                      ? 'bg-slate-700/50 text-white border-b-2 border-blue-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <Camera className="w-4 h-4 inline mr-2" />
                  Live Camera
                </button>
                <button
                  onClick={() => setActiveTab('upload')}
                  className={`flex-1 px-6 py-4 text-sm font-medium transition-colors ${
                    activeTab === 'upload'
                      ? 'bg-slate-700/50 text-white border-b-2 border-blue-500'
                      : 'text-slate-400 hover:text-white hover:bg-slate-700/30'
                  }`}
                >
                  <Upload className="w-4 h-4 inline mr-2" />
                  Upload Image
                </button>
              </div>

              {/* Content Area */}
              <div className="p-6">
                {activeTab === 'live' ? (
                  <div className="space-y-4">
                    <div className="relative aspect-video bg-slate-900 rounded-lg overflow-hidden">
                      <video
                        ref={videoRef}
                        autoPlay
                        playsInline
                        className="w-full h-full object-cover"
                      />
                      <canvas ref={canvasRef} className="hidden" />
                      
                      {!isCameraActive && (
                        <div className="absolute inset-0 flex items-center justify-center bg-slate-900">
                          <div className="text-center">
                            <Camera className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                            <p className="text-slate-400 text-lg mb-4">Camera is off</p>
                            <button
                              onClick={startCamera}
                              className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg transition-colors"
                            >
                              Start Camera
                            </button>
                          </div>
                        </div>
                      )}

                      {/* Detection Overlay */}
                      {detectedPlate && (
                        <div className="absolute top-4 left-4 right-4 bg-slate-900/90 backdrop-blur-sm border-2 border-green-500 rounded-lg p-4 animate-pulse">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="text-gree``n-400 text-sm font-medium mb-1">DETECTED</p>
                              <p className="text-white text-3xl font-bold font-mono">{detectedPlate.plate}</p>
                            </div>
                            <div className="text-right">
                              <p className="text-slate-400 text-sm">Confidence</p>
                              <p className="text-white text-2xl font-bold">{detectedPlate.confidence}%</p>
                            </div>
                          </div>
                          <div className="mt-3 pt-3 border-t border-slate-700">
                            <div className="flex items-center justify-between">
                              <span className={`text-sm font-medium ${detectedPlate.status === 'allowed' ? 'text-green-400' : 'text-red-400'}`}>
                                {detectedPlate.status === 'allowed' ? '✓ ALLOWED' : '✗ BLOCKED'}
                              </span>
                              {detectedPlate.status === 'allowed' ? (
                                <CheckCircle className="w-5 h-5 text-green-400" />
                              ) : (
                                <AlertCircle className="w-5 h-5 text-red-400" />
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>

                    {isCameraActive && (
                      <div className="flex justify-center">
                        <button
                          onClick={stopCamera}
                          className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-lg transition-colors"
                        >
                          Stop Camera
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <div>
                    {!selectedImage ? (
                      <label className="aspect-video bg-slate-900 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-600 hover:border-blue-500 transition-colors cursor-pointer">
                        <input
                          type="file"
                          accept="image/*"
                          onChange={handleImageUpload}
                          className="hidden"
                        />
                        <div className="text-center">
                          <Upload className="w-16 h-16 text-slate-600 mx-auto mb-4" />
                          <p className="text-slate-400 text-lg mb-2">Upload an image</p>
                          <p className="text-slate-500 text-sm">Click to browse or drag and drop</p>
                        </div>
                      </label>
                    ) : (
                      <div className="space-y-4">
                        <div className="aspect-video bg-slate-900 rounded-lg overflow-hidden">
                          <img src={selectedImage} alt="Uploaded" className="w-full h-full object-contain" />
                        </div>
                        {isProcessing ? (
                          <div className="flex items-center justify-center space-x-2 text-blue-400">
                            <div className="w-4 h-4 border-2 border-blue-400 border-t-transparent rounded-full animate-spin"></div>
                            <span>Processing image...</span>
                          </div>
                        ) : (
                          <div className="bg-slate-900 rounded-lg p-4 border border-green-500/30">
                            <div className="flex items-center space-x-2 mb-2">
                              <CheckCircle className="w-5 h-5 text-green-400" />
                              <span className="text-green-400 font-medium">Detection Complete</span>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mt-4">
                              <div>
                                <p className="text-slate-400 text-sm">License Plate</p>
                                <p className="text-white text-xl font-bold mt-1">ABC-1234</p>
                              </div>
                              <div>
                                <p className="text-slate-400 text-sm">Confidence</p>
                                <p className="text-white text-xl font-bold mt-1">98%</p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column - Recent Detections */}
          <div className="lg:col-span-1">
            <div className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-white">Recent Detections</h2>
                <Search className="w-5 h-5 text-slate-400" />
              </div>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {recentDetections.map((detection) => (
                  <div
                    key={detection.id}
                    className="bg-slate-900/50 rounded-lg p-4 border border-slate-700 hover:border-slate-600 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-white font-mono font-bold text-lg">
                        {detection.plate}
                      </span>
                      {detection.status === 'allowed' ? (
                        <CheckCircle className="w-5 h-5 text-green-400" />
                      ) : (
                        <AlertCircle className="w-5 h-5 text-red-400" />
                      )}
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-slate-400">{detection.time}</span>
                      <span className="text-blue-400">{detection.confidence}% confidence</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}