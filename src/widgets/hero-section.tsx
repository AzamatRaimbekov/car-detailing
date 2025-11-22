import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Play, ArrowDown } from 'lucide-react'
import { Button } from '../shared/ui'
import { scrollToElement, trackEvent } from '../shared/lib/utils'

const heroSlides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1920&h=1080&fit=crop&q=80',
    title: 'Premium Car Detailing',
    subtitle: 'in America',
    description: 'Professional car care using premium materials and advanced technologies for maximum protection and shine'
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1920&h=1080&fit=crop&q=80',
    title: 'Ceramic Coating',
    subtitle: '9H Protection for 3 Years',
    description: 'Long-lasting protection for your paintwork with official warranty and unmatched durability'
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1571068316344-75bc76f77890?w=1920&h=1080&fit=crop&q=80',
    title: 'PPF Protection Film',
    subtitle: 'Invisible Armor for Your Car',
    description: 'Paint protection film that guards against chips, scratches, and chemical damage'
  }
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [direction, setDirection] = useState(0) // -1 for prev, 1 for next

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setDirection(1)
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextSlide = () => {
    setDirection(1)
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const prevSlide = () => {
    setDirection(-1)
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
    setIsAutoPlaying(false)
  }

  const goToSlide = (index: number) => {
    setDirection(index > currentSlide ? 1 : -1)
    setCurrentSlide(index)
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

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? '100%' : '-100%',
    }),
    center: {
      x: 0,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? '-100%' : '100%',
    }),
  }

  const contentVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 60 : -60,
      y: 30,
      opacity: 0,
    }),
    center: {
      x: 0,
      y: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction > 0 ? -60 : 60,
      y: -30,
      opacity: 0,
    }),
  }

  const textVariants = {
    enter: {
      opacity: 0,
      y: 20,
    },
    center: {
      opacity: 1,
      y: 0,
    },
    exit: {
      opacity: 0,
      y: -20,
    },
  }

  return (
    <section 
      className="relative h-screen overflow-hidden bg-black"
      aria-label="Hero section - Premium car detailing services"
    >
      {/* Background Slides */}
      <AnimatePresence custom={direction} initial={false}>
        <motion.div
          key={currentSlide}
          custom={direction}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{
            x: { type: 'spring', stiffness: 400, damping: 40 },
          }}
          className="absolute inset-0"
        >
          <div
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${heroSlides[currentSlide].image})` }}
            role="img"
            aria-label={`${heroSlides[currentSlide].title} - ${heroSlides[currentSlide].description}`}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-20 glass-button p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft className="w-6 h-6 text-white" />
      </button>
      
      <button
        onClick={nextSlide}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-20 glass-button p-3 rounded-full hover:bg-white/20 transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight className="w-6 h-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {heroSlides.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => goToSlide(index)}
            className={`relative rounded-full overflow-hidden ${
              index === currentSlide 
                ? 'bg-gold-500' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${index + 1}`}
            initial={false}
            animate={{
              width: index === currentSlide ? 32 : 12,
              height: 12,
            }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            {index === currentSlide && (
              <motion.div
                className="absolute inset-0 bg-white/30"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'linear',
                }}
              />
            )}
          </motion.button>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-4xl relative min-h-[400px]">
            <AnimatePresence custom={direction} initial={false}>
              <motion.div
                key={currentSlide}
                custom={direction}
                variants={contentVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: 'spring', stiffness: 350, damping: 35, mass: 0.8 },
                  y: { type: 'spring', stiffness: 350, damping: 35, mass: 0.8 },
                  opacity: { duration: 0.4 },
                }}
                className="absolute inset-0 flex flex-col justify-center"
              >
                <motion.h1 
                  className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-white mb-4"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.5,
                    delay: 0.1,
                    ease: [0.25, 0.46, 0.45, 0.94]
                  }}
                  itemProp="headline"
                >
                  {heroSlides[currentSlide].title}
                  <br />
                  <motion.span 
                    className="text-gradient inline-block"
                    variants={textVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    transition={{
                      duration: 0.5,
                      delay: 0.2,
                      ease: [0.25, 0.46, 0.45, 0.94]
                    }}
                  >
                    {heroSlides[currentSlide].subtitle}
                  </motion.span>
                </motion.h1>
                
                <motion.p 
                  className="text-base sm:text-lg md:text-xl lg:text-2xl text-gray-200 mb-8 max-w-2xl"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.4,
                    delay: 0.15,
                    ease: 'easeOut'
                  }}
                >
                  {heroSlides[currentSlide].description}
                </motion.p>
                
                <motion.div 
                  className="flex flex-col sm:flex-row gap-4"
                  variants={textVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    duration: 0.4,
                    delay: 0.2,
                    ease: 'easeOut'
                  }}
                >
                  <Button
                    variant="liquid"
                    size="xl"
                    onClick={handleBookingClick}
                    className="shine-effect"
                  >
                    Book Service
                  </Button>
                  
                  <Button
                    variant="glass"
                    size="xl"
                    onClick={handlePricingClick}
                    className="group"
                  >
                    <Play className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
                    View Pricing
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
