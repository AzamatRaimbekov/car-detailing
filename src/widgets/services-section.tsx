import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, ChevronDown, ChevronUp } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../shared/ui'
import { formatPrice, formatDuration, trackEvent } from '../shared/lib/utils'
import type { Service } from '../shared/lib/types'
import servicesData from '../shared/data/services.json'

const services = servicesData as Service[]

const categories = {
  exterior: 'Exterior',
  interior: 'Interior', 
  protection: 'Protection',
  addons: 'Additional'
}

const tagLabels = {
  hit: 'Popular',
  new: 'New',
  sale: 'Sale'
}

export function ServicesSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categories>('exterior')
  const [expandedService, setExpandedService] = useState<string | null>(null)

  const filteredServices = services.filter(service => service.category === activeCategory)

  const handleServiceExpand = (serviceId: string) => {
    setExpandedService(expandedService === serviceId ? null : serviceId)
    trackEvent('view_service', { serviceId, category: activeCategory })
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category as keyof typeof categories)
    setExpandedService(null)
    trackEvent('switch_category', { category })
  }

  return (
    <section 
      id="services" 
      className="section-padding bg-white"
      aria-label="Services - Our car detailing services"
    >
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-graphite-900 mb-4">
            Our
            <span className="text-gradient ml-3">Services</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            Full range of car detailing services - from basic wash to premium ceramic and PPF protection
          </p>
        </motion.div>

        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="grid w-full grid-cols-4 mb-12 h-14 bg-graphite-100">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="text-base font-medium data-[state=active]:bg-gold-500 data-[state=active]:text-white"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categories).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {filteredServices.map((service) => (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card className="h-full group hover:shadow-xl transition-all duration-300 border-0 bg-gradient-to-br from-white to-graphite-50">
                      <CardHeader className="pb-4">
                        <div className="flex justify-between items-start mb-2">
                          <CardTitle className="text-xl font-bold text-graphite-900 group-hover:text-gold-600 transition-colors">
                            {service.title}
                          </CardTitle>
                          {service.tag && (
                            <Badge variant={service.tag as any} className="ml-2">
                              {tagLabels[service.tag]}
                            </Badge>
                          )}
                        </div>
                        <p className="text-graphite-600 text-sm leading-relaxed">
                          {service.short}
                        </p>
                      </CardHeader>

                      <CardContent className="pt-0">
                        <div className="flex justify-between items-center mb-4">
                          <div className="text-2xl font-bold text-gold-600">
                            {formatPrice(service.priceFrom)}
                          </div>
                          {service.durationHours && (
                            <div className="flex items-center text-graphite-500 text-sm">
                              <Clock className="w-4 h-4 mr-1" />
                              {formatDuration(service.durationHours)}
                            </div>
                          )}
                        </div>

                        <Button
                          variant="outline"
                          className="w-full group-hover:bg-gold-50 group-hover:border-gold-300 transition-colors"
                          onClick={() => handleServiceExpand(service.id)}
                        >
                          Details
                          {expandedService === service.id ? (
                            <ChevronUp className="w-4 h-4 ml-2" />
                          ) : (
                            <ChevronDown className="w-4 h-4 ml-2" />
                          )}
                        </Button>

                        <AnimatePresence>
                          {expandedService === service.id && (
                            <motion.div
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="mt-4 pt-4 border-t border-graphite-200"
                            >
                              <h4 className="font-semibold text-graphite-900 mb-2">
                                What's included:
                              </h4>
                              <ul className="space-y-1 text-sm text-graphite-600">
                                {service.details.map((detail, index) => (
                                  <li key={index} className="flex items-start">
                                    <span className="w-1.5 h-1.5 bg-gold-500 rounded-full mt-2 mr-2 flex-shrink-0" />
                                    {detail}
                                  </li>
                                ))}
                              </ul>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <p className="text-graphite-600 mb-6">
            Can't find the service you need? Contact us for a personalized consultation
          </p>
          <Button
            variant="liquid"
            size="lg"
            onClick={() => {
              trackEvent('cta_click', { source: 'services', action: 'consultation' })
              // Scroll to contacts or open consultation form
            }}
          >
            Get Consultation
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
