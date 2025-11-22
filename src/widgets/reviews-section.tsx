import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Quote, CheckCircle } from 'lucide-react'
import { Card, CardContent, Badge, Button } from '../shared/ui'
import type { Testimonial } from '../shared/lib/types'
import testimonialsData from '../shared/data/testimonials.json'

const testimonials = testimonialsData as Testimonial[]

export function ReviewsSection() {
  const [currentReview, setCurrentReview] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)

  useEffect(() => {
    if (!isAutoPlaying) return

    const interval = setInterval(() => {
      setCurrentReview((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [isAutoPlaying])

  const nextReview = () => {
    setCurrentReview((prev) => (prev + 1) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const prevReview = () => {
    setCurrentReview((prev) => (prev - 1 + testimonials.length) % testimonials.length)
    setIsAutoPlaying(false)
  }

  const goToReview = (index: number) => {
    setCurrentReview(index)
    setIsAutoPlaying(false)
  }

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`w-5 h-5 ${
          i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
        }`}
      />
    ))
  }

  return (
    <section 
      id="reviews" 
      className="section-padding bg-gradient-to-br from-graphite-900 via-graphite-800 to-graphite-900 relative overflow-hidden"
      aria-label="Reviews - Client testimonials and reviews"
    >
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold-500 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gold-400 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto container-padding relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Client
            <span className="text-gradient ml-3">Reviews</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Over 1000 satisfied clients trust us with their cars. Read their reviews about our work
          </p>
        </motion.div>

        {/* Main review display */}
        <div className="relative max-w-4xl mx-auto mb-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentReview}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Card variant="glass" className="p-8 md:p-12 text-center">
                <CardContent className="p-0">
                  <Quote className="w-12 h-12 text-gold-400 mx-auto mb-6 opacity-50" />
                  
                  <div className="flex justify-center mb-6">
                    {renderStars(testimonials[currentReview].rating)}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-white leading-relaxed mb-8 font-light">
                    "{testimonials[currentReview].text}"
                  </blockquote>

                  <div className="flex items-center justify-center space-x-4">
                    <div className="text-center">
                      <div className="flex items-center justify-center space-x-2 mb-1">
                        <h4 className="text-lg font-semibold text-white">
                          {testimonials[currentReview].name}
                        </h4>
                        {testimonials[currentReview].verified && (
                          <Badge variant="verified" className="text-xs">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Verified
                          </Badge>
                        )}
                      </div>
                      <p className="text-gold-400 font-medium">
                        {testimonials[currentReview].car}
                      </p>
                      {testimonials[currentReview].date && (
                        <p className="text-gray-400 text-sm mt-1">
                          {new Date(testimonials[currentReview].date!).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </AnimatePresence>

          {/* Navigation arrows */}
          <Button
            variant="glass"
            size="icon"
            onClick={prevReview}
            className="absolute left-4 top-1/2 -translate-y-1/2 -translate-x-full"
          >
            <ChevronLeft className="w-5 h-5" />
          </Button>
          
          <Button
            variant="glass"
            size="icon"
            onClick={nextReview}
            className="absolute right-4 top-1/2 -translate-y-1/2 translate-x-full"
          >
            <ChevronRight className="w-5 h-5" />
          </Button>
        </div>

        {/* Review thumbnails */}
        <div className="flex justify-center space-x-4 mb-8 overflow-x-auto pb-4">
          {testimonials.map((review, index) => (
            <motion.button
              key={review.id}
              onClick={() => goToReview(index)}
              className={`flex-shrink-0 p-4 rounded-lg transition-all duration-300 ${
                index === currentReview
                  ? 'bg-gold-500/20 border-2 border-gold-400'
                  : 'bg-white/5 border border-white/10 hover:bg-white/10'
              }`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <div className="text-center min-w-[120px]">
                <div className="flex justify-center mb-2">
                  {renderStars(review.rating)}
                </div>
                <p className="text-white font-medium text-sm mb-1">
                  {review.name}
                </p>
                <p className="text-gray-400 text-xs">
                  {review.car}
                </p>
              </div>
            </motion.button>
          ))}
        </div>

        {/* Indicators */}
        <div className="flex justify-center space-x-2 mb-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToReview(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentReview
                  ? 'bg-gold-400 scale-125'
                  : 'bg-white/30 hover:bg-white/50'
              }`}
            />
          ))}
        </div>

        {/* Auto-play control */}
        <div className="text-center">
          <Button
            variant="glass"
            size="sm"
            onClick={() => setIsAutoPlaying(!isAutoPlaying)}
            className="text-white/70 hover:text-white"
          >
            {isAutoPlaying ? 'Stop Autoplay' : 'Start Autoplay'}
          </Button>
        </div>

        {/* Statistics */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
        >
          <Card variant="glass" className="p-6">
            <div className="text-3xl font-bold text-gold-400 mb-2">1000+</div>
            <div className="text-white text-sm">Satisfied Clients</div>
          </Card>
          <Card variant="glass" className="p-6">
            <div className="text-3xl font-bold text-gold-400 mb-2">5.0</div>
            <div className="text-white text-sm">Average Rating</div>
          </Card>
          <Card variant="glass" className="p-6">
            <div className="text-3xl font-bold text-gold-400 mb-2">98%</div>
            <div className="text-white text-sm">Recommend Us</div>
          </Card>
          <Card variant="glass" className="p-6">
            <div className="text-3xl font-bold text-gold-400 mb-2">5+</div>
            <div className="text-white text-sm">Years Experience</div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
