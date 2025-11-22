import { motion } from 'framer-motion'
import { Phone, MapPin, Clock, Mail, Instagram, MessageCircle, ExternalLink, Facebook } from 'lucide-react'
import { Button } from '../shared/ui'
import { scrollToElement, trackEvent } from '../shared/lib/utils'
import contactsData from '../shared/data/contacts.json'
import brandData from '../shared/data/brand.json'

// TikTok Icon Component
const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
    className={className}
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M19.589 6.686a4.793 4.793 0 0 1-3.77-4.245V2h-3.445v13.672a2.896 2.896 0 0 1-5.201 1.743l-.002-.001.002.001a2.895 2.895 0 0 1 3.183-4.51v-3.5a6.329 6.329 0 0 0-1.195 5.257c-1.094 3.465-4.767 5.954-8.468 4.883a6.33 6.33 0 0 0 1.287-11.63l.011-.001v3.351c-.141-.031-.293-.05-.445-.05a2.894 2.894 0 1 0 2.893 2.894c-.027 0-.053-.002-.08-.004v-.002h-.08v-3.507a6.329 6.329 0 0 0 5.18 5.58v3.508a2.896 2.896 0 0 1-2.363 2.843 2.899 2.899 0 0 1-3.623-2.831c0-1.179.694-2.233 1.785-2.717v3.69a4.798 4.798 0 0 0 7.94 3.494c1.785-1.749 2.125-4.445.79-6.599v-7.067c1.093.844 2.379 1.335 3.77 1.335v3.671h-.001z" />
  </svg>
)

const navItems = [
  { id: 'services', label: 'Services' },
  { id: 'pricing', label: 'Pricing' },
  { id: 'portfolio', label: 'Portfolio' },
  { id: 'reviews', label: 'Reviews' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contacts', label: 'Contacts' },
]

const services = [
  'Ceramic Coating',
  'PPF Protection Film',
  'Body Polishing',
  'Interior Deep Clean',
  'Headlight Restoration',
  'Interior Detailing'
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
      <div className="container mx-auto container-padding py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-8">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center space-x-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-gold-500 to-gold-600 rounded-xl flex items-center justify-center">
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
            <div className="flex flex-wrap gap-3">
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
              {brandData.socialMedia.tiktok && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick('tiktok', brandData.socialMedia.tiktok!)}
                  className="text-gray-400 hover:text-black hover:bg-gray-400/10"
                >
                  <TikTokIcon className="w-5 h-5" />
                </Button>
              )}
              {brandData.socialMedia.facebook && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleSocialClick('facebook', brandData.socialMedia.facebook!)}
                  className="text-gray-400 hover:text-blue-500 hover:bg-blue-500/10"
                >
                  <Facebook className="w-5 h-5" />
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
            <h4 className="text-lg font-semibold mb-6">Navigation</h4>
            <ul className="space-y-3">
              {navItems.map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => handleNavClick(item.id)}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-200 text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
              <li>
                <a
                  href="/policy"
                  className="text-gray-300 hover:text-gold-400 transition-colors duration-200"
                >
                  Privacy Policy
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
            <h4 className="text-lg font-semibold mb-6">Popular Services</h4>
            <ul className="space-y-3">
              {services.map((service) => (
                <li key={service}>
                  <button
                    onClick={() => handleNavClick('services')}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-200 text-left"
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
            <h4 className="text-lg font-semibold mb-6">Contacts</h4>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="min-w-0">
                  <p className="text-gray-300 text-sm leading-relaxed break-words">
                    {contactsData.address}
                  </p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-gold-400 flex-shrink-0" />
                <button
                  onClick={() => handleContactClick('phone', contactsData.phone)}
                  className="text-gray-300 hover:text-gold-400 transition-colors duration-200 font-medium break-all text-left"
                >
                  {contactsData.phone}
                </button>
              </div>

              {contactsData.email && (
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gold-400 flex-shrink-0" />
                  <button
                    onClick={() => handleContactClick('email', contactsData.email!)}
                    className="text-gray-300 hover:text-gold-400 transition-colors duration-200 break-all text-left text-sm"
                  >
                    {contactsData.email}
                  </button>
                </div>
              )}

              <div className="flex items-start space-x-3">
                <Clock className="w-5 h-5 text-gold-400 mt-0.5 flex-shrink-0" />
                <div className="text-gray-300 text-sm min-w-0">
                  <p className="break-words">Mon-Fri: {contactsData.workingHours.weekdays}</p>
                  <p className="break-words">Sat-Sun: {contactsData.workingHours.weekends}</p>
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
          className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-gray-700"
        >
          <h4 className="text-base md:text-lg font-semibold mb-4 md:mb-6 text-center">Certified Partners</h4>
          <div className="flex flex-wrap justify-center items-center gap-4 md:gap-8 opacity-60">
            {brandData.certifications.map((cert) => (
              <div
                key={cert.name}
                className="text-gray-400 hover:text-gold-400 transition-colors cursor-pointer font-semibold text-sm md:text-base"
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
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0 gap-4">
            <div className="text-gray-400 text-sm text-center md:text-left">
              © {currentYear} {brandData.name}. All rights reserved.
            </div>
            
            <div className="flex flex-wrap items-center justify-center gap-4 md:gap-6 text-sm">
              <a
                href="/policy"
                className="text-gray-400 hover:text-gold-400 transition-colors duration-200"
              >
                Privacy Policy
              </a>
              <button
                onClick={() => handleNavClick('contacts')}
                className="text-gray-400 hover:text-gold-400 transition-colors duration-200 flex items-center space-x-1"
              >
                <span>Contacts</span>
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
        className="fixed bottom-20 md:bottom-24 lg:bottom-8 right-4 md:right-8 w-12 h-12 bg-gold-500 hover:bg-gold-600 text-white rounded-full shadow-lg flex items-center justify-center transition-colors duration-200 z-30 lg:z-30"
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
