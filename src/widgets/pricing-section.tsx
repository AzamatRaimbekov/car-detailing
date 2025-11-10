import { motion } from 'framer-motion'
import { Check, Star, ArrowRight } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle, Badge, Button } from '../shared/ui'
import { formatPrice, scrollToElement, trackEvent } from '../shared/lib/utils'
import type { Package } from '../shared/lib/types'
import packagesData from '../shared/data/packages.json'

const packages = packagesData as Package[]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
}

const itemVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6
    }
  }
}

export function PricingSection() {
  const handlePackageSelect = (packageId: string, packageTitle: string) => {
    trackEvent('select_package', { packageId, packageTitle })
    scrollToElement('booking')
  }

  return (
    <section id="pricing" className="section-padding bg-gradient-to-br from-graphite-900 via-graphite-800 to-graphite-900 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-10 w-72 h-72 bg-liquid-gloss-500 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-liquid-gloss-400 rounded-full blur-3xl" />
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
            Пакеты
            <span className="text-gradient ml-3">услуг</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Готовые решения для любых потребностей - от быстрого ухода до премиальной защиты
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.id}
              variants={itemVariants}
              whileHover={{ y: -10, scale: 1.02 }}
              transition={{ duration: 0.3 }}
              className="relative"
            >
              {pkg.best && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-10">
                  <Badge variant="hit" className="px-4 py-1 text-sm font-semibold">
                    <Star className="w-4 h-4 mr-1" />
                    Рекомендуем
                  </Badge>
                </div>
              )}

              <Card 
variant={pkg.best ? undefined : "glass"}
                className={`h-full group transition-all duration-300 border-0 ${
                  pkg.best 
                    ? 'bg-gradient-to-br from-liquid-gloss-500/20 to-liquid-gloss-600/10 border-2 border-liquid-gloss-400/50 shadow-2xl shadow-liquid-gloss-500/25' 
                    : 'hover:bg-white/15'
                }`}
              >
                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold text-white mb-2">
                    {pkg.title}
                  </CardTitle>
                  <p className="text-gray-300 text-sm mb-4">
                    {pkg.description}
                  </p>
                  <div className="text-4xl font-bold text-liquid-gloss-400 mb-2">
                    {formatPrice(pkg.priceFrom)}
                  </div>
                </CardHeader>

                <CardContent className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <h4 className="font-semibold text-white mb-4">Включено:</h4>
                    <ul className="space-y-3 mb-6">
                      {pkg.includes.map((item, itemIndex) => (
                        <li key={itemIndex} className="flex items-start text-gray-300 text-sm">
                          <Check className="w-4 h-4 text-liquid-gloss-400 mr-2 mt-0.5 flex-shrink-0" />
                          {item}
                        </li>
                      ))}
                    </ul>

                    {pkg.recommendedFor && (
                      <div className="mb-6">
                        <h5 className="font-medium text-white mb-2 text-sm">Рекомендуется для:</h5>
                        <div className="flex flex-wrap gap-1">
                          {pkg.recommendedFor.map((rec, recIndex) => (
                            <Badge key={recIndex} variant="glass" className="text-xs">
                              {rec}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  <Button
                    variant={pkg.best ? "liquid" : "glass"}
                    className="w-full group-hover:scale-105 transition-transform"
                    onClick={() => handlePackageSelect(pkg.id, pkg.title)}
                  >
                    Записаться на {pkg.title}
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <Card variant="glass" className="p-8 max-w-4xl mx-auto">
            <h3 className="text-2xl font-bold text-white mb-4">
              Индивидуальный подход
            </h3>
            <p className="text-gray-300 mb-6">
              Каждый автомобиль уникален. Мы можем составить персональный пакет услуг, 
              учитывающий особенности вашего авто и ваши потребности.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                variant="liquid"
                size="lg"
                onClick={() => {
                  trackEvent('cta_click', { source: 'pricing', action: 'custom_package' })
                  scrollToElement('booking')
                }}
              >
                Составить индивидуальный пакет
              </Button>
              <Button
                variant="glass"
                size="lg"
                onClick={() => {
                  trackEvent('cta_click', { source: 'pricing', action: 'consultation' })
                  // Open consultation modal or scroll to contacts
                }}
              >
                Получить консультацию
              </Button>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
