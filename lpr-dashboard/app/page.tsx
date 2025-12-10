<<<<<<< HEAD
'use client'; 

import React from 'react';
import Navbar from "@/components/navbar"
=======
"use client";

import  Navbar  from "@/components/navbar"
import Hero from "@/components/hero"
>>>>>>> 2878b72d9930b688ffa560146bd3fa4c4285c753
import DotAnimation from "@/components/dot-animation"
import { Type_writer_hero } from '@/components/type-writer-hero'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
<<<<<<< HEAD
import { MousePointer2 , Github } from 'lucide-react';
import Madeby from '@/components/madeby';

// Halaman utama (Root: "/") hanya menampilkan Hero Section
export default function HomePage() {
  return (
=======
import { MousePointer2 , Github, Book } from 'lucide-react';
import Madeby from '@/components/madeby';
export default function LPRDashboard() {
  return (
    // <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
>>>>>>> 2878b72d9930b688ffa560146bd3fa4c4285c753
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Header */}
      <div className='lg:px-16 py-4 w-full backdrop-blur-sm top-0 z-10 sticky'>
        <Navbar></Navbar>
      </div>
<<<<<<< HEAD
      
      {/* Hero Section */}
=======
>>>>>>> 2878b72d9930b688ffa560146bd3fa4c4285c753
      <div className='w-full h-screen flex justify-center items-center ' id = "hero">
        <DotAnimation></DotAnimation>
        <div className='flex flex-col w-fit items-center justify-center gap-4 px-3 py-3'>
          <Type_writer_hero></Type_writer_hero>
          <div className = "flex flex gap-x-4">
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
          <Madeby></Madeby>
        </div>
      </div>
<<<<<<< HEAD
=======

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
>>>>>>> 2878b72d9930b688ffa560146bd3fa4c4285c753
    </div>
  );
}