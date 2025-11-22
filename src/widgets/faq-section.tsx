import { motion } from 'framer-motion'
import { HelpCircle } from 'lucide-react'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../shared/ui'
import type { FAQItem } from '../shared/lib/types'
import faqData from '../shared/data/faq.json'

const faq = faqData as FAQItem[]

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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  }
}

export function FAQSection() {
  return (
    <section 
      id="faq" 
      className="section-padding bg-gradient-to-br from-white to-graphite-50"
      aria-label="FAQ - Frequently asked questions"
    >
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl flex items-center justify-center">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-graphite-900 mb-4">
            Frequently Asked
            <span className="text-gradient ml-3">Questions</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            Answers to the most popular questions about our services, materials and work processes
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="max-w-4xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {faq.map((item, index) => (
              <motion.div
                key={item.id}
                variants={itemVariants}
              >
                <AccordionItem
                  value={item.id}
                  className="bg-white rounded-xl border-0 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
                >
                  <AccordionTrigger className="px-6 py-5 text-left hover:no-underline hover:bg-graphite-50 transition-colors duration-200">
                    <div className="flex items-start space-x-4">
                      <div className="w-8 h-8 bg-gold-100 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        <span className="text-gold-600 font-bold text-sm">
                          {String(index + 1).padStart(2, '0')}
                        </span>
                      </div>
                      <span className="text-lg font-semibold text-graphite-900 pr-4">
                        {item.question}
                      </span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-6">
                    <div className="ml-12">
                      <p className="text-graphite-700 leading-relaxed text-base">
                        {item.answer}
                      </p>
                      {item.category && (
                        <div className="mt-4">
                          <span className="inline-block px-3 py-1 bg-gold-100 text-gold-700 rounded-full text-sm font-medium">
                            {item.category}
                          </span>
                        </div>
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-16"
        >
          <div className="bg-gradient-to-br from-gold-500 to-gold-600 rounded-2xl p-8 md:p-12 text-white">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Can't find the answer to your question?
            </h3>
            <p className="text-gold-100 mb-6 text-lg">
              Contact us in any convenient way, and we will provide detailed consultation on all questions
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:+15551234567"
                className="inline-flex items-center justify-center px-6 py-3 bg-white text-gold-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                Call Us
              </a>
              <a
                href="https://wa.me/15551234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                WhatsApp Us
              </a>
              <a
                href="https://t.me/primedetail_kg"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors duration-200"
              >
                Telegram
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
