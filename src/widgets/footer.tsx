import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Mail, Instagram, MessageCircle, ExternalLink } from 'lucide-react'
import { Button } from '../shared/ui'
import { scrollToElement, trackEvent } from '../shared/lib/utils'
import contactsData from '../shared/data/contacts.json'
import brandData from '../shared/data/brand.json'

const navItems = [
  { id: 'services', label: 'Услуги' },
  { id: 'pricing', label: 'Цены' },
  { id: 'portfolio', label: 'Портфолио' },
  { id: 'reviews', label: 'Отзывы' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacts', label: 'Контакты' },
]

const services = [
  'Керамическое покрытие',
  'PPF защитная пленка',
  'Полировка кузова',
  'Химчистка салона',
  'Восстановление фар',
  'Детейлинг салона'
]

export function Footer() {
  const currentYear = new Date().getFullYear()

  const handleNavClick = (sectionId: string) => {
    trackEvent('footer_nav_click', { section: sectionId })
    scrollToElement(sectionId)
  }

  const handleSocialClick = (platform: string, url: string) => {
    trackEvent('social_click', { platform, source: 'footer' })
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleContactClick = (type: string, value: string) => {
    trackEvent('footer_contact_click', { type })
    if (type === 'phone') {
      window.location.href = `tel:${value}`
    } else if (type === 'email') {
      window.location.href = `mailto:${value}`
    }
  }

  return (
    <footer className="bg-gradient-to-br from-graphite-900 via-graphite-800 to-graphite-900 text-white">
      {/* Main Footer Content */}
      <div className="container mx-auto container-padding py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-liquid-gloss-500 to-liquid-gloss-600 rounded-xl flex items-center justify-center">
                <span className="text-white font-bold text-xl">P</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">{brandData.name}</h3>
                <p className="text-gray-400">{brandData.city}</p>
              </div>
            </div>
            <p className="text-gray-300 mb-6 leading-relaxed">
              {brandData.description}
            </p>
            <div className="flex space-x-4">
              {brandData.socialMedia.instagram && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick('instagram', brandData.socialMedia.instagram!)}
                  className="text-gray-400 hover:text-pink-400 hover:bg-pink-400/10"
                >
                  <Instagram className="w-5 h-5" />
                </Button>
              )}
              {brandData.socialMedia.whatsapp && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick('whatsapp', brandData.socialMedia.whatsapp!)}
                  className="text-gray-400 hover:text-green-400 hover:bg-green-400/10"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              )}
              {brandData.socialMedia.telegram && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick('telegram', brandData.socialMedia.telegram!)}
                  className="text-gray-400 hover:text-blue-400 hover:bg-blue-400/10"
                >
                  <MessageCircle className="w-5 h-5" />
                </Button>
              )}
            </div>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h4 className="text-lg font-semibold mb-6">Навигация</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-gray-300 hover:text-liquid-gloss-400 transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/policy"
                  className="text-gray-300 hover:text-liquid-gloss-400 transition-colors duration-200"
                >
                  Политика конфиденциальности
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h4 className="text-lg font-semibold mb-6">Популярные услуги</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-gray-300 hover:text-liquid-gloss-400 transition-colors duration-200 text-left"
                  >
                    {service}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h4 className="text-lg font-semibold mb-6">Контакты</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-liquid-gloss-400 mt-0.5 flex-shrink-0" />
                <div>
                  <p className="text-gray-300 text-sm leading-relaxed">
                    {contactsData.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-liquid-gloss-400 flex-shrink-0" />
                <button
                  onClick={() => handleContactClick('phone', contactsData.phone)}
                  className="text-gray-300 hover:text-liquid-gloss-400 transition-colors duration-200 font-medium"
                >
                  {contactsData.phone}
                </button>
              </div>

              {contactsData.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-liquid-gloss-400 flex-shrink-0" />
                  <button
                    onClick={() => handleContactClick('email', contactsData.email!)}
                    className="text-gray-300 hover:text-liquid-gloss-400 transition-colors duration-200"
                  >
                    {contactsData.email}
                  </button>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-liquid-gloss-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm">
                  <p>Пн-Пт: {contactsData.workingHours.weekdays}</p>
                  <p>Сб-Вс: {contactsData.workingHours.weekends}</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Certifications */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-12 pt-8 border-t border-gray-700"
        >
          <h4 className="text-lg font-semibold mb-6 text-center">Сертифицированные партнеры</h4>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {brandData.certifications.map((cert) => (
              <div
                key={cert.name}
                className="text-gray-400 hover:text-liquid-gloss-400 transition-colors cursor-pointer font-semibold"
              >
                {cert.name}
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700">
        <div className="container mx-auto container-padding py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-sm">
              © {currentYear} {brandData.name}. Все права защищены.
            </div>
            
            <div className="flex items-center space-x-6 text-sm">
              <a
                href="/policy"
                className="text-gray-400 hover:text-liquid-gloss-400 transition-colors duration-200"
              >
                Политика конфиденциальности
              </a>
              <button
                onClick={() => handleNavClick('contacts')}
                className="text-gray-400 hover:text-liquid-gloss-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Контакты</span>
                <ExternalLink className="w-3 h-3" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Back to Top Button */}
      <motion.button
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => {
          trackEvent('back_to_top_click')
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}
        className="fixed bottom-20 lg:bottom-8 right-8 w-12 h-12 bg-liquid-gloss-500 hover:bg-liquid-gloss-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-30"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </motion.button>
    </footer>
  )
}
