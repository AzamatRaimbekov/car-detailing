import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Calendar,
  Clock,
  Car,
  User,
  Phone,
  MessageSquare,
  Send,
  CheckCircle,
} from "lucide-react";
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
  SelectValue,
} from "../shared/ui";
import { formatPhone, trackEvent } from "../shared/lib/utils";
// import type { BookingFormData } from '../shared/lib/types'
import servicesData from "../shared/data/services.json";
import packagesData from "../shared/data/packages.json";

const bookingSchema = z.object({
  name: z.string().min(2, "Name must contain at least 2 characters"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  carModel: z.string().optional(),
  service: z.string().optional(),
  package: z.string().optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  comment: z.string().optional(),
});

type BookingForm = z.infer<typeof bookingSchema>;

const timeSlots = [
  "09:00",
  "10:00",
  "11:00",
  "12:00",
  "13:00",
  "14:00",
  "15:00",
  "16:00",
  "17:00",
  "18:00",
  "19:00",
];

export function BookingSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    // watch,
    reset,
  } = useForm<BookingForm>({
    resolver: zodResolver(bookingSchema),
  });

  // const selectedService = watch('service')
  // const selectedPackage = watch('package')

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);

    try {
      // Format phone number
      const formattedData = {
        ...data,
        phone: formatPhone(data.phone),
      };

      // Track form submission
      trackEvent("submit_booking", {
        service: data.service,
        package: data.package,
        hasDate: !!data.preferredDate,
        hasTime: !!data.preferredTime,
      });

      // Формируем сообщение для WhatsApp
      //       const whatsappMessage = `
      // 🚗 Новая заявка на детейлинг

      // 👤 Имя: ${data.name}
      // 📞 Телефон: ${formatPhone(data.phone)}
      // ${data.carModel ? `🚙 Автомобиль: ${data.carModel}` : ''}
      // ${data.service ? `🔧 Услуга: ${data.service}` : ''}
      // ${data.package ? `📦 Пакет: ${data.package}` : ''}
      // ${data.preferredDate ? `📅 Предпочтительная дата: ${data.preferredDate}` : ''}
      // ${data.preferredTime ? `⏰ Предпочтительное время: ${data.preferredTime}` : ''}
      // ${data.comment ? `💬 Комментарий: ${data.comment}` : ''}
      //       `.trim()

      // Отправляем в WhatsApp
      // const whatsappNumber = '996700748167'
      // const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`
      // window.open(whatsappUrl, '_blank')

      // Submit to Formspree or other service (параллельно с WhatsApp)
      const formspreeEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;
      const telegramWebhook = import.meta.env.VITE_TG_WEBHOOK;

      if (formspreeEndpoint) {
        const response = await fetch(formspreeEndpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formattedData),
        });

        if (!response.ok) {
          throw new Error("Failed to submit form");
        }
      }

      // Send to Telegram if webhook is configured (параллельно с WhatsApp)
      if (telegramWebhook) {
        const message = `
🚗 New Detailing Request

👤 Name: ${data.name}
📞 Phone: ${formatPhone(data.phone)}
${data.carModel ? `🚙 Car: ${data.carModel}` : ""}
${data.service ? `🔧 Service: ${data.service}` : ""}
${data.package ? `📦 Package: ${data.package}` : ""}
${data.preferredDate ? `📅 Date: ${data.preferredDate}` : ""}
${data.preferredTime ? `⏰ Time: ${data.preferredTime}` : ""}
${data.comment ? `💬 Comment: ${data.comment}` : ""}
        `.trim();

        await fetch(telegramWebhook, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            text: message,
            parse_mode: "HTML",
          }),
        });
      }

      setIsSubmitted(true);
      reset();
    } catch (error) {
      console.error("Error submitting form:", error);
      alert(
        "An error occurred while submitting the request. Please try again or contact us by phone."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <section id="booking" className="section-padding bg-gray-50">
        <div className="container mx-auto container-padding">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-2xl mx-auto text-center"
          >
            <Card className="p-12 shadow-lg">
              <CardContent className="p-0">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: "spring" }}
                  className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6"
                >
                  <CheckCircle className="w-10 h-10 text-white" />
                </motion.div>
                <h2 className="text-3xl font-bold text-graphite-900 mb-4">
                  Request Sent!
                </h2>
                <p className="text-graphite-600 text-lg mb-8">
                  Thank you for your inquiry! We will contact you within 15
                  minutes to clarify details and confirm your appointment.
                </p>
                <div className="space-y-4">
                  <p className="text-graphite-700 font-medium">
                    Or contact us right now:
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <a
                      href="tel:+996555123456"
                      className="inline-flex items-center justify-center px-6 py-3 bg-graphite-900 text-white rounded-lg font-semibold hover:bg-graphite-800 transition-colors"
                    >
                      <Phone className="w-4 h-4 mr-2" />
                      +996 555 123 456
                    </a>
                    <a
                      href="https://wa.me/996555123456"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center px-6 py-3 bg-green-500 text-white rounded-lg font-semibold hover:bg-green-600 transition-colors"
                    >
                      WhatsApp
                    </a>
                  </div>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setIsSubmitted(false)}
                  className="mt-8 border-graphite-300 text-graphite-700 hover:bg-graphite-50"
                >
                  Submit Another Request
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section
      id="booking"
      className="section-padding bg-gray-50"
      aria-label="Booking - Book a car detailing service"
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
            Book a<span className="text-gold-600 ml-3">Service</span>
          </h2>
          <p className="text-xl text-graphite-600 max-w-3xl mx-auto">
            Leave a request and we will contact you within 15 minutes to clarify
            details
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <Card className="shadow-xl border border-gray-200">
            <CardHeader className="bg-white border-b border-gray-200">
              <CardTitle className="text-2xl text-graphite-900 text-center">
                Booking Form
              </CardTitle>
            </CardHeader>
            <CardContent className="bg-white p-6 md:p-8">
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      <User className="w-4 h-4 inline mr-2 text-graphite-600" />
                      Your Name *
                    </label>
                    <Input
                      {...register("name")}
                      placeholder="Enter your name"
                      className="bg-white border-gray-300 text-graphite-900 placeholder:text-gray-400 focus:border-gold-500 focus:ring-gold-500"
                    />
                    {errors.name && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.name.message}
                      </p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      <Phone className="w-4 h-4 inline mr-2 text-graphite-600" />
                      Phone Number *
                    </label>
                    <Input
                      {...register("phone")}
                      placeholder="+1 (555) 123-4567"
                      className="bg-white border-gray-300 text-graphite-900 placeholder:text-gray-400 focus:border-gold-500 focus:ring-gold-500"
                    />
                    {errors.phone && (
                      <p className="text-red-600 text-sm mt-1">
                        {errors.phone.message}
                      </p>
                    )}
                  </div>

                  {/* Car Model */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      <Car className="w-4 h-4 inline mr-2 text-graphite-600" />
                      Car Make and Model
                    </label>
                    <Input
                      {...register("carModel")}
                      placeholder="BMW X5, Mercedes C-Class..."
                      className="bg-white border-gray-300 text-graphite-900 placeholder:text-gray-400 focus:border-gold-500 focus:ring-gold-500"
                    />
                  </div>

                  {/* Service */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      Choose Service
                    </label>
                    <Select
                      onValueChange={(value) => setValue("service", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-graphite-900 focus:border-gold-500 focus:ring-gold-500 [&>span]:text-graphite-700">
                        <SelectValue
                          placeholder="Choose Service"
                          className="text-gray-500"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 text-graphite-900 shadow-xl">
                        {servicesData.map((service) => (
                          <SelectItem
                            key={service.id}
                            value={service.title}
                            className="text-graphite-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-graphite-900"
                          >
                            {service.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Package */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      Or Choose Package
                    </label>
                    <Select
                      onValueChange={(value) => setValue("package", value)}
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-graphite-900 focus:border-gold-500 focus:ring-gold-500 [&>span]:text-graphite-700">
                        <SelectValue
                          placeholder="Choose Package"
                          className="text-gray-500"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 text-graphite-900 shadow-xl">
                        {packagesData.map((pkg) => (
                          <SelectItem
                            key={pkg.id}
                            value={pkg.title}
                            className="text-graphite-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-graphite-900"
                          >
                            {pkg.title} - from ${pkg.priceFrom.toLocaleString()}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Preferred Date */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      <Calendar className="w-4 h-4 inline mr-2 text-graphite-600" />
                      Preferred Date
                    </label>
                    <Input
                      {...register("preferredDate")}
                      type="date"
                      min={new Date().toISOString().split("T")[0]}
                      className="bg-white border-gray-300 text-graphite-900 focus:border-gold-500 focus:ring-gold-500 [&::-webkit-calendar-picker-indicator]:opacity-70 [&::-webkit-calendar-picker-indicator]:cursor-pointer"
                    />
                  </div>

                  {/* Preferred Time */}
                  <div>
                    <label className="block text-graphite-700 font-semibold mb-2">
                      <Clock className="w-4 h-4 inline mr-2 text-graphite-600" />
                      Preferred Time
                    </label>
                    <Select
                      onValueChange={(value) =>
                        setValue("preferredTime", value)
                      }
                    >
                      <SelectTrigger className="bg-white border-gray-300 text-graphite-900 focus:border-gold-500 focus:ring-gold-500 [&>span]:text-graphite-700">
                        <SelectValue
                          placeholder="Choose Time"
                          className="text-gray-500"
                        />
                      </SelectTrigger>
                      <SelectContent className="bg-white border-gray-300 text-graphite-900 shadow-xl">
                        {timeSlots.map((time) => (
                          <SelectItem
                            key={time}
                            value={time}
                            className="text-graphite-700 hover:bg-gray-100 focus:bg-gray-100 focus:text-graphite-900"
                          >
                            {time}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                {/* Comment */}
                <div>
                  <label className="block text-graphite-700 font-semibold mb-2">
                    <MessageSquare className="w-4 h-4 inline mr-2 text-graphite-600" />
                    Additional Comments
                  </label>
                  <Textarea
                    {...register("comment")}
                    placeholder="Tell us about your car's condition, special requirements, or questions..."
                    className="bg-white border-gray-300 text-graphite-900 placeholder:text-gray-400 focus:border-gold-500 focus:ring-gold-500"
                    rows={4}
                  />
                </div>

                {/* Submit Button */}
                <div className="text-center pt-4">
                  <Button
                    type="submit"
                    size="xl"
                    disabled={isSubmitting}
                    className="bg-graphite-900 text-white hover:bg-graphite-800 font-semibold px-12 shadow-lg hover:shadow-xl transition-all"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
                        Sending...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Submit Request
                      </>
                    )}
                  </Button>
                </div>

                <p className="text-gray-500 text-sm text-center pt-4">
                  By clicking "Submit Request", you agree to our{" "}
                  <a
                    href="/policy"
                    className="text-gold-600 underline hover:text-gold-700 hover:no-underline font-medium"
                  >
                    Privacy Policy
                  </a>
                </p>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
