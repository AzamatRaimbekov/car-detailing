import { motion } from 'framer-motion'
import { MapPin, Phone, Clock, Navigation, MessageCircle } from 'lucide-react'
import { Card, CardContent, Button } from '../shared/ui'
import { trackEvent } from '../shared/lib/utils'
import contactsData from '../shared/data/contacts.json'

export function ContactsSection() {
  const handleDirectionsClick = () => {
    trackEvent('cta_click', { source: 'contacts', action: 'directions' })
    window.open(contactsData.mapUrl, '_blank')
  }

  const handlePhoneClick = () => {
    trackEvent('cta_click', { source: 'contacts', action: 'phone' })
    window.location.href = `tel:${contactsData.phone}`
  }

  const handleWhatsAppClick = () => {
    trackEvent('cta_click', { source: 'contacts', action: 'whatsapp' })
    window.open(`https://wa.me/${contactsData.whatsapp.replace(/[^0-9]/g, '')}`, '_blank')
  }

  const handleTelegramClick = () => {
    trackEvent('cta_click', { source: 'contacts', action: 'telegram' })
    window.open(`https://t.me/${contactsData.telegram.replace('@', '')}`, '_blank')
  }

  return (
    <section id="contacts" className="section-padding bg-white">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-graphite-900 mb-4">
            Наши
            <span className="text-gradient ml-3">контакты</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            Приезжайте к нам или свяжитесь любым удобным способом. Мы всегда готовы ответить на ваши вопросы
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Address */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-graphite-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center group-hover:bg-liquid-gloss-200 transition-colors">
                    <MapPin className="w-6 h-6 text-liquid-gloss-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-graphite-900 mb-2">Адрес</h3>
                    <p className="text-graphite-700 mb-3">{contactsData.address}</p>
                    <p className="text-graphite-600 text-sm mb-4">{contactsData.directions}</p>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleDirectionsClick}
                      className="group-hover:border-liquid-gloss-300 group-hover:text-liquid-gloss-600"
                    >
                      <Navigation className="w-4 h-4 mr-2" />
                      Построить маршрут
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Phone */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-graphite-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center group-hover:bg-liquid-gloss-200 transition-colors">
                    <Phone className="w-6 h-6 text-liquid-gloss-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-graphite-900 mb-2">Телефон</h3>
                    <p className="text-2xl font-bold text-liquid-gloss-600 mb-4">
                      {contactsData.phone}
                    </p>
                    <div className="flex flex-col sm:flex-row gap-2">
                      <Button
                        variant="liquid"
                        size="sm"
                        onClick={handlePhoneClick}
                      >
                        Позвонить
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleWhatsAppClick}
                        className="group-hover:border-green-300 group-hover:text-green-600"
                      >
                        <MessageCircle className="w-4 h-4 mr-2" />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleTelegramClick}
                        className="group-hover:border-blue-300 group-hover:text-blue-600"
                      >
                        Telegram
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Working Hours */}
            <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-graphite-50">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center group-hover:bg-liquid-gloss-200 transition-colors">
                    <Clock className="w-6 h-6 text-liquid-gloss-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-graphite-900 mb-4">Режим работы</h3>
                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-graphite-700">Понедельник - Пятница</span>
                        <span className="font-semibold text-graphite-900">
                          {contactsData.workingHours.weekdays}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-graphite-700">Суббота - Воскресенье</span>
                        <span className="font-semibold text-graphite-900">
                          {contactsData.workingHours.weekends}
                        </span>
                      </div>
                    </div>
                    <p className="text-graphite-600 text-sm mt-4">
                      Работаем без перерывов и выходных. Предварительная запись обязательна.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Email */}
            {contactsData.email && (
              <Card className="group hover:shadow-lg transition-all duration-300 border-0 bg-gradient-to-br from-white to-graphite-50">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center group-hover:bg-liquid-gloss-200 transition-colors">
                      <MessageCircle className="w-6 h-6 text-liquid-gloss-600" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-graphite-900 mb-2">Email</h3>
                      <a
                        href={`mailto:${contactsData.email}`}
                        className="text-liquid-gloss-600 hover:text-liquid-gloss-700 font-medium text-lg"
                      >
                        {contactsData.email}
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )}
          </motion.div>

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <Card className="overflow-hidden border-0 shadow-xl">
              <div className="relative h-96 lg:h-full min-h-[500px]">
                {/* Static map image as placeholder */}
                <div className="absolute inset-0 bg-gradient-to-br from-liquid-gloss-100 to-liquid-gloss-200 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="w-16 h-16 text-liquid-gloss-600 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-graphite-900 mb-2">
                      Prime Detail
                    </h3>
                    <p className="text-graphite-600 mb-4">
                      {contactsData.address}
                    </p>
                    <Button
                      variant="liquid"
                      onClick={handleDirectionsClick}
                    >
                      Открыть в картах
                    </Button>
                  </div>
                </div>

                {/* You can replace this with an actual embedded map */}
                {/* Example with Google Maps embed:
                <iframe
                  src={`https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${contactsData.coordinates.lat},${contactsData.coordinates.lng}`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
                */}
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="bg-gradient-to-br from-graphite-50 to-white rounded-2xl p-8 md:p-12">
            <h3 className="text-2xl md:text-3xl font-bold text-graphite-900 mb-4">
              Удобное расположение
            </h3>
            <p className="text-graphite-600 text-lg mb-6 max-w-3xl mx-auto">
              Наш детейлинг-центр расположен в удобном месте с легким доступом и парковкой. 
              Рядом есть кафе и торговые центры, где вы можете провести время, пока мы работаем с вашим автомобилем.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-liquid-gloss-600 font-bold">🚗</span>
                </div>
                <h4 className="font-semibold text-graphite-900 mb-1">Удобная парковка</h4>
                <p className="text-graphite-600 text-sm">Просторная парковка для любых автомобилей</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-liquid-gloss-600 font-bold">☕</span>
                </div>
                <h4 className="font-semibold text-graphite-900 mb-1">Зона ожидания</h4>
                <p className="text-graphite-600 text-sm">Комфортная зона с Wi-Fi и напитками</p>
              </div>
              <div className="text-center">
                <div className="w-12 h-12 bg-liquid-gloss-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                  <span className="text-liquid-gloss-600 font-bold">🛍️</span>
                </div>
                <h4 className="font-semibold text-graphite-900 mb-1">Рядом ТЦ</h4>
                <p className="text-graphite-600 text-sm">Магазины и кафе в шаговой доступности</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
