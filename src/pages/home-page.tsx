import { Navigation } from '../widgets/navigation'
import { HeroSection } from '../widgets/hero-section'
import { FeaturesSection } from '../widgets/features-section'
import { ServicesSection } from '../widgets/services-section'
import { PricingSection } from '../widgets/pricing-section'
import { PortfolioSection } from '../widgets/portfolio-section'
import { ReviewsSection } from '../widgets/reviews-section'
import { FAQSection } from '../widgets/faq-section'
import { BookingSection } from '../widgets/booking-section'
import { ContactsSection } from '../widgets/contacts-section'
import { Footer } from '../widgets/footer'
import { SEO, StructuredData, organizationSchema, faqSchema } from '../shared/lib/seo'

export function HomePage() {
  return (
    <div className="min-h-screen">
      <SEO />
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      
      <Navigation />
      <main>
        <HeroSection />
        <FeaturesSection />
        <ServicesSection />
        <PricingSection />
        <PortfolioSection />
        <ReviewsSection />
        <FAQSection />
        <BookingSection />
        <ContactsSection />
      </main>
      <Footer />
    </div>
  )
}
