import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, Eye } from 'lucide-react'
import { Card, Badge, Button, Tabs, TabsList, TabsTrigger, TabsContent } from '../shared/ui'
import { trackEvent } from '../shared/lib/utils'
import type { PortfolioItem } from '../shared/lib/types'
import portfolioData from '../shared/data/portfolio.json'

const portfolio = portfolioData as PortfolioItem[]

const categories = {
  all: 'All Works',
  polishing: 'Polishing',
  ceramic: 'Ceramic',
  interior: 'Interior',
  ppf: 'PPF Film'
}

export function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<keyof typeof categories>('all')
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null)
  const [imageView, setImageView] = useState<'before' | 'after'>('before')

  const filteredPortfolio = activeCategory === 'all' 
    ? portfolio 
    : portfolio.filter(item => item.category === activeCategory)

  const handleItemClick = (item: PortfolioItem) => {
    setSelectedItem(item)
    setImageView('before')
    trackEvent('open_portfolio_item', { itemId: item.id, category: item.category })
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category as keyof typeof categories)
    trackEvent('filter_portfolio', { category })
  }

  const nextItem = () => {
    if (!selectedItem) return
    const currentIndex = filteredPortfolio.findIndex(item => item.id === selectedItem.id)
    const nextIndex = (currentIndex + 1) % filteredPortfolio.length
    setSelectedItem(filteredPortfolio[nextIndex])
    setImageView('before')
  }

  const prevItem = () => {
    if (!selectedItem) return
    const currentIndex = filteredPortfolio.findIndex(item => item.id === selectedItem.id)
    const prevIndex = (currentIndex - 1 + filteredPortfolio.length) % filteredPortfolio.length
    setSelectedItem(filteredPortfolio[prevIndex])
    setImageView('before')
  }

  return (
    <section 
      id="portfolio" 
      className="section-padding bg-gradient-to-br from-white to-graphite-50"
      aria-label="Portfolio - Our car detailing work examples"
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
            <span className="text-gradient ml-3">Portfolio</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            Our work results speak for themselves. See how our clients' cars are transformed
          </p>
        </motion.div>

        <Tabs value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="flex w-full overflow-x-auto mb-12 h-auto min-h-14 bg-graphite-100 p-1 md:grid md:grid-cols-5">
            {Object.entries(categories).map(([key, label]) => (
              <TabsTrigger
                key={key}
                value={key}
                className="text-xs sm:text-sm md:text-base font-medium whitespace-nowrap px-2 sm:px-3 py-2 md:py-3 data-[state=active]:bg-gold-500 data-[state=active]:text-white flex-shrink-0"
              >
                {label}
              </TabsTrigger>
            ))}
          </TabsList>

          {Object.keys(categories).map((category) => (
            <TabsContent key={category} value={category} className="mt-0">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {filteredPortfolio.map((item, index) => (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    whileHover={{ y: -5 }}
                  >
                    <Card 
                      className="group cursor-pointer overflow-hidden border-0 bg-white shadow-lg hover:shadow-2xl transition-all duration-300"
                      onClick={() => handleItemClick(item)}
                    >
                      <div className="relative aspect-[4/3] overflow-hidden">
                        <img
                          src={item.beforeImage}
                          alt={`${item.title} - Before detailing service. ${item.description}`}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                          width={800}
                          height={600}
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute bottom-4 left-4 right-4 transform translate-y-4 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          <Badge variant="glass" className="mb-2">
                            {categories[item.category as keyof typeof categories]}
                          </Badge>
                          <h3 className="text-white font-semibold text-sm line-clamp-2">
                            {item.title}
                          </h3>
                        </div>
                        <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="glass-button p-2 rounded-full">
                            <Eye className="w-4 h-4 text-white" />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </TabsContent>
          ))}
        </Tabs>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="relative max-w-6xl w-full max-h-[90vh] bg-white rounded-2xl overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex justify-between items-center p-6 border-b border-graphite-200">
                <div>
                  <h3 className="text-2xl font-bold text-graphite-900 mb-1">
                    {selectedItem.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">
                      {categories[selectedItem.category as keyof typeof categories]}
                    </Badge>
                    {selectedItem.services.map((service, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {service}
                      </Badge>
                    ))}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setSelectedItem(null)}
                  className="text-graphite-500 hover:text-graphite-700"
                >
                  <X className="w-6 h-6" />
                </Button>
              </div>

              {/* Image comparison */}
              <div className="relative">
                <div className="flex">
                  <div className="flex-1 relative">
                    <img
                      src={imageView === 'before' ? selectedItem.beforeImage : selectedItem.afterImage}
                      alt={`${selectedItem.title} - ${imageView === 'before' ? 'Before' : 'After'} detailing service. ${selectedItem.description}. Services: ${selectedItem.services.join(', ')}`}
                      className="w-full h-[60vh] object-cover"
                      width={1200}
                      height={800}
                    />
                    <div className="absolute top-4 left-4">
                      <Badge variant={imageView === 'before' ? 'destructive' : 'default'}>
                        {imageView === 'before' ? 'Before' : 'After'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {/* Before/After toggle */}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2">
                  <div className="flex bg-black/50 backdrop-blur-sm rounded-full p-1">
                    <Button
                      variant={imageView === 'before' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setImageView('before')}
                      className="rounded-full text-white"
                    >
                      Before
                    </Button>
                    <Button
                      variant={imageView === 'after' ? 'default' : 'ghost'}
                      size="sm"
                      onClick={() => setImageView('after')}
                      className="rounded-full text-white"
                    >
                      After
                    </Button>
                  </div>
                </div>

                {/* Navigation arrows */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={prevItem}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronLeft className="w-6 h-6" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={nextItem}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/20"
                >
                  <ChevronRight className="w-6 h-6" />
                </Button>
              </div>

              {/* Description */}
              {selectedItem.description && (
                <div className="p-6 border-t border-graphite-200">
                  <p className="text-graphite-600">
                    {selectedItem.description}
                  </p>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
