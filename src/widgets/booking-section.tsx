import { useState } from 'react'
import { motion } from 'framer-motion'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Calendar, Clock, Car, User, Phone, MessageSquare, Send, CheckCircle } from 'lucide-react'
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  Button, 
  Input, 
  Textarea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '../shared/ui'
import { formatPhone, trackEvent } from '../shared/lib/utils'
// import type { BookingFormData } from '../shared/lib/types'
import servicesData from '../shared/data/services.json'
import packagesData from '../shared/data/packages.json'

const bookingSchema = z.object({
  name: z.string().min(2, 'Имя должно содержать минимум 2 символа'),
  phone: z.string().min(10, 'Введите корректный номер телефона'),
  carModel: z.string().optional(),
  service: z.string().optional(),
  package: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  comment: z.string().optional(),
})

type BookingForm = z.infer<typeof bookingSchema>

const timeSlots = [
  '09:00', '10:00', '11:00', '12:00', '13:00', '14:00', 
  '15:00', '16:00', '17:00', '18:00', '19:00'
]

export function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // watch,
    reset
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema)
  })

  // const selectedService = watch('service')
  // const selectedPackage = watch('package')

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true)
    
    try {
      // Format phone number
      const formattedData = {
        ...data,
        phone: formatPhone(data.phone)
      }

      // Track form submission
      trackEvent('submit_booking', {
        service: data.service,
        package: data.package,
        hasDate: !!data.preferredDate,
        hasTime: !!data.preferredTime
      })

      // Submit to Formspree or other service
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT
      const telegramWebhook = import.meta.env.VITE_TG_WEBHOOK

      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formattedData),
        })

        if (!response.ok) {
          throw new Error('Failed to submit form')
        }
      }

      // Send to Telegram if webhook is configured
      if (telegramWebhook) {
        const message = `
🚗 Новая заявка на детейлинг

👤 Имя: ${data.name}
📞 Телефон: ${formatPhone(data.phone)}
${data.carModel ? `🚙 Автомобиль: ${data.carModel}` : ''}
${data.service ? `🔧 Услуга: ${data.service}` : ''}
${data.package ? `📦 Пакет: ${data.package}` : ''}
${data.preferredDate ? `📅 Дата: ${data.preferredDate}` : ''}
${data.preferredTime ? `⏰ Время: ${data.preferredTime}` : ''}
${data.comment ? `💬 Комментарий: ${data.comment}` : ''}
        `.trim()

        await fetch(telegramWebhook, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            text: message,
            parse_mode: 'HTML'
          }),
        })
      }

      // Fallback to mailto if no endpoints configured
      if (!formspreeEndpoint && !telegramWebhook) {
        const subject = 'Заявка на детейлинг от ' + data.name
        const body = `
Имя: ${data.name}
Телефон: ${formatPhone(data.phone)}
Автомобиль: ${data.carModel || 'Не указан'}
Услуга: ${data.service || 'Не выбрана'}
Пакет: ${data.package || 'Не выбран'}
Предпочитаемая дата: ${data.preferredDate || 'Не указана'}
Предпочитаемое время: ${data.preferredTime || 'Не указано'}
Комментарий: ${data.comment || 'Нет'}
        `.trim()

        window.location.href = `mailto:info@primedetail.kg?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      }

      setIsSubmitted(true)
      reset()
    } catch (error) {
      console.error('Error submitting form:', error)
      alert('Произошла ошибка при отправке заявки. Пожалуйста, попробуйте еще раз или свяжитесь с нами по телефону.')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSubmitted) {
    return (
      <section id="booking" className="section-padding bg-gradient-to-br from-liquid-gloss-500 to-liquid-gloss-600">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card variant="glass" className="p-12">
              <CardContent className="p-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-white mb-4">
                  Заявка отправлена!
                </h2>
                <p className="text-liquid-gloss-100 text-lg mb-8">
                  Спасибо за обращение! Мы свяжемся с вами в течение 15 минут для уточнения деталей и подтверждения записи.
                </p>
                <div className="space-y-4">
                  <p className="text-white font-medium">
                    Или свяжитесь с нами прямо сейчас:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+996555123456"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white text-liquid-gloss-600 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +996 555 123 456
                    </a>
                    <a
                      href="https://wa.me/996555123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-white/20 text-white border border-white/30 rounded-lg font-semibold hover:bg-white/30 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <Button
                  variant="glass"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8"
                >
                  Отправить еще одну заявку
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    )
  }

  return (
    <section id="booking" className="section-padding bg-gradient-to-br from-liquid-gloss-500 to-liquid-gloss-600">
      <div className="container mx-auto container-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Записаться на
            <span className="text-white/90 ml-3">услугу</span>
          </h2>
          <p className="text-xl text-liquid-gloss-100 max-w-3xl mx-auto">
            Оставьте заявку, и мы свяжемся с вами в течение 15 минут для уточнения деталей
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card variant="glass">
            <CardHeader>
              <CardTitle className="text-2xl text-white text-center">
                Форма записи
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <User className="w-4 h-4 inline mr-2" />
                      Ваше имя *
                    </label>
                    <Input
                      {...register('name')}
                      placeholder="Введите ваше имя"
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 focus:bg-white/20"
                    />
                    {errors.name && (
                      <p className="text-red-300 text-sm mt-1">{errors.name.message}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Phone className="w-4 h-4 inline mr-2" />
                      Номер телефона *
                    </label>
                    <Input
                      {...register('phone')}
                      placeholder="+996 555 123 456"
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 focus:bg-white/20"
                    />
                    {errors.phone && (
                      <p className="text-red-300 text-sm mt-1">{errors.phone.message}</p>
                    )}
                  </div>

                  {/* Car Model */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Car className="w-4 h-4 inline mr-2" />
                      Марка и модель авто
                    </label>
                    <Input
                      {...register('carModel')}
                      placeholder="BMW X5, Mercedes C-Class..."
                      className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 focus:bg-white/20"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Выберите услугу
                    </label>
                    <Select onValueChange={(value) => setValue('service', value)}>
                      <SelectTrigger className="bg-white/15 border-white/30 text-white focus:border-white/50 focus:ring-white/30 focus:bg-white/20 [&>span]:text-white">
                        <SelectValue placeholder="Выберите услугу" className="text-white/70" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphite-900 border-white/30 text-white shadow-xl">
                        {servicesData.map((service) => (
                          <SelectItem key={service.id} value={service.title} className="text-white hover:bg-white/15 focus:bg-white/15 focus:text-white">
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Package */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      Или выберите пакет
                    </label>
                    <Select onValueChange={(value) => setValue('package', value)}>
                      <SelectTrigger className="bg-white/15 border-white/30 text-white focus:border-white/50 focus:ring-white/30 focus:bg-white/20 [&>span]:text-white">
                        <SelectValue placeholder="Выберите пакет" className="text-white/70" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphite-900 border-white/30 text-white shadow-xl">
                        {packagesData.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.title} className="text-white hover:bg-white/15 focus:bg-white/15 focus:text-white">
                            {pkg.title} - от {pkg.priceFrom.toLocaleString()} сом
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Calendar className="w-4 h-4 inline mr-2" />
                      Предпочитаемая дата
                    </label>
                    <Input
                      {...register('preferredDate')}
                      type="date"
                      min={new Date().toISOString().split('T')[0]}
                      className="bg-white/15 border-white/30 text-white focus:border-white/50 focus:ring-white/30 focus:bg-white/20 [&::-webkit-calendar-picker-indicator]:invert [&::-webkit-calendar-picker-indicator]:opacity-80"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-white font-medium mb-2">
                      <Clock className="w-4 h-4 inline mr-2" />
                      Предпочитаемое время
                    </label>
                    <Select onValueChange={(value) => setValue('preferredTime', value)}>
                      <SelectTrigger className="bg-white/15 border-white/30 text-white focus:border-white/50 focus:ring-white/30 focus:bg-white/20 [&>span]:text-white">
                        <SelectValue placeholder="Выберите время" className="text-white/70" />
                      </SelectTrigger>
                      <SelectContent className="bg-graphite-900 border-white/30 text-white shadow-xl">
                        {timeSlots.map((time) => (
                          <SelectItem key={time} value={time} className="text-white hover:bg-white/15 focus:bg-white/15 focus:text-white">
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-white font-medium mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2" />
                    Дополнительные пожелания
                  </label>
                  <Textarea
                    {...register('comment')}
                    placeholder="Расскажите о состоянии автомобиля, особых требованиях или вопросах..."
                    className="bg-white/15 border-white/30 text-white placeholder:text-white/60 focus:border-white/50 focus:ring-white/30 focus:bg-white/20"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center">
                  <Button
                    type="submit"
                    size="xl"
                    disabled={isSubmitting}
                    className="bg-white text-liquid-gloss-600 hover:bg-gray-100 font-semibold px-12"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-liquid-gloss-600 mr-2"></div>
                        Отправляем...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Отправить заявку
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-liquid-gloss-100 text-sm text-center">
                  Нажимая кнопку "Отправить заявку", вы соглашаетесь с{' '}
                  <a href="/policy" className="underline hover:no-underline">
                    политикой конфиденциальности
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  )
}
