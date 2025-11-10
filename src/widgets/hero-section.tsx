import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, ArrowDown } from 'lucide-react'
import { Button } from '../shared/ui'
import { scrollToElement, trackEvent } from '../shared/lib/utils'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop&q=80',
    title: 'Премиальный детейлинг',
    subtitle: 'в Бишкеке',
    description: 'Профессиональный уход за вашим автомобилем с использованием материалов премиум-класса'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&q=80',
    title: 'Керамическое покрытие',
    subtitle: '9H защита на 3 года',
    description: 'Долговременная защита лакокрасочного покрытия с официальной гарантией'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920&h=1080&fit=crop&q=80',
    title: 'PPF защитная пленка',
    subtitle: 'Невидимая броня для вашего авто',
    description: 'Антигравийная защита от сколов, царапин и химических воздействий'
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const handleBookingClick = () => {
    trackEvent('cta_click', { source: 'hero', action: 'booking' })
    scrollToElement('booking')
  }

  const handlePricingClick = () => {
    trackEvent('cta_click', { source: 'hero', action: 'pricing' })
    scrollToElement('pricing')
  }

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Background Slides */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentSlide}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 1 }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-button p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-button p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              setCurrentSlide(index)
              setIsAutoPlaying(false)
            }}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-liquid-gloss-400 scale-125' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.8, delay: 0.2 }}
              >
                <motion.h1 
                  className="text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                >
                  {heroSlides[currentSlide].title}
                  <br />
                  <span className="text-gradient">
                    {heroSlides[currentSlide].subtitle}
                  </span>
                </motion.h1>
                
                <motion.p 
                  className="text-xl md:text-2xl text-gray-200 mb-8 max-w-2xl"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                >
                  <Button
                    variant="liquid"
                    size="xl"
                    onClick={handleBookingClick}
                    className="shine-effect"
                  >
                    Записаться на услугу
                  </Button>
                  
                  <Button
                    variant="glass"
                    size="xl"
                    onClick={handlePricingClick}
                    className="group"
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    Посмотреть прайс
                  </Button>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 right-8 z-20"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="flex flex-col items-center text-white/70">
          <span className="text-sm mb-2 rotate-90 origin-center">Scroll</span>
          <ArrowDown className="w-5 h-5" />
        </div>
      </motion.div>

      {/* Auto-play control */}
      <button
        onClick={() => setIsAutoPlaying(!isAutoPlaying)}
        className="absolute top-8 right-8 z-20 glass-button p-2 rounded-full text-white/70 hover:text-white transition-colors"
        aria-label={isAutoPlaying ? 'Pause slideshow' : 'Play slideshow'}
      >
        {isAutoPlaying ? (
          <div className="w-4 h-4 flex gap-1">
            <div className="w-1 h-4 bg-current"></div>
            <div className="w-1 h-4 bg-current"></div>
          </div>
        ) : (
          <Play className="w-4 h-4" />
        )}
      </button>
    </section>
  )
}
