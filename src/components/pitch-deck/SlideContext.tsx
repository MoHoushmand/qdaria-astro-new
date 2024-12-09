'use client'

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react'

interface SlideContextProps {
  activeSlide: number
  setActiveSlide: (slide: number) => void
  slidesLength: number
  nextSlide: () => void
  prevSlide: () => void
}

const SlideContext = createContext<SlideContextProps | undefined>(undefined)

interface SlideProviderProps {
  children: React.ReactNode
  totalSlides?: number
}

export const SlideProvider: React.FC<SlideProviderProps> = ({ 
  children,
  totalSlides = 14 // Default number of slides
}) => {
  const [activeSlide, setActiveSlideState] = useState(0)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const setActiveSlide = useCallback((slide: number) => {
    if (slide >= 0 && slide < totalSlides) {
      setActiveSlideState(slide)
      // Update URL without page reload only on client side
      if (typeof window !== 'undefined') {
        const url = new URL(window.location.href)
        url.searchParams.set('slide', slide.toString())
        window.history.pushState({}, '', url)
      }
    }
  }, [totalSlides])

  const nextSlide = useCallback(() => {
    setActiveSlide((activeSlide + 1) % totalSlides)
  }, [activeSlide, totalSlides, setActiveSlide])

  const prevSlide = useCallback(() => {
    setActiveSlide((activeSlide - 1 + totalSlides) % totalSlides)
  }, [activeSlide, totalSlides, setActiveSlide])

  // Keyboard navigation
  useEffect(() => {
    if (!isMounted) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') {
        e.preventDefault()
        nextSlide()
      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
        e.preventDefault()
        prevSlide()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [nextSlide, prevSlide, isMounted])

  // Touch navigation
  useEffect(() => {
    if (!isMounted) return

    const handleTouchStart = (e: TouchEvent) => {
      setTouchStart(e.touches[0].clientX)
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStart === null) return

      const currentTouch = e.touches[0].clientX
      const diff = touchStart - currentTouch

      if (Math.abs(diff) > 50) { // Minimum swipe distance
        if (diff > 0) {
          nextSlide()
        } else {
          prevSlide()
        }
        setTouchStart(null)
      }
    }

    const handleTouchEnd = () => {
      setTouchStart(null)
    }

    window.addEventListener('touchstart', handleTouchStart)
    window.addEventListener('touchmove', handleTouchMove)
    window.addEventListener('touchend', handleTouchEnd)

    return () => {
      window.removeEventListener('touchstart', handleTouchStart)
      window.removeEventListener('touchmove', handleTouchMove)
      window.removeEventListener('touchend', handleTouchEnd)
    }
  }, [touchStart, nextSlide, prevSlide, isMounted])

  // URL handling
  useEffect(() => {
    if (!isMounted) return

    // Initialize with URL params
    const urlParams = new URLSearchParams(window.location.search)
    const initialSlide = parseInt(urlParams.get('slide') || '0')
    if (!isNaN(initialSlide) && initialSlide >= 0 && initialSlide < totalSlides) {
      setActiveSlideState(initialSlide)
    }

    // Handle browser back/forward
    const handlePopState = () => {
      const urlParams = new URLSearchParams(window.location.search)
      const slide = parseInt(urlParams.get('slide') || '0')
      if (!isNaN(slide) && slide >= 0 && slide < totalSlides) {
        setActiveSlideState(slide)
      }
    }

    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [totalSlides, isMounted])

  if (!isMounted) {
    return null
  }

  return (
    <SlideContext.Provider value={{ 
      activeSlide, 
      setActiveSlide, 
      slidesLength: totalSlides,
      nextSlide,
      prevSlide
    }}>
      {children}
    </SlideContext.Provider>
  )
}

export const useSlide = () => {
  const context = useContext(SlideContext)
  if (context === undefined) {
    throw new Error('useSlide must be used within a SlideProvider')
  }
  return context
}

export type { SlideContextProps, SlideProviderProps }
