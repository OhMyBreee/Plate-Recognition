'use client'; 

import React from 'react';
import Navbar from "@/components/navbar"
import DotAnimation from "@/components/dot-animation"
import { Type_writer_hero } from '@/components/type-writer-hero'
import { Button } from "@/components/ui/button"
import Link from 'next/link';
import { MousePointer2 , Github } from 'lucide-react';
import Madeby from '@/components/madeby';

// Halaman utama (Root: "/") hanya menampilkan Hero Section
export default function HomePage() {
  return (
    <div className="min-h-screen bg-background text-white flex flex-col">
      {/* Header */}
      <div className='lg:px-16 py-4 w-full backdrop-blur-sm top-0 z-10 sticky'>
        <Navbar></Navbar>
      </div>
      
      {/* Hero Section */}
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
    </div>
  );
}