import { Navigation } from "../widgets/navigation";
import { HeroSection } from "../widgets/hero-section";
import { FeaturesSection } from "../widgets/features-section";
import { ServicesSection } from "../widgets/services-section";
import { PricingSection } from "../widgets/pricing-section";
import { PortfolioSection } from "../widgets/portfolio-section";
import { ReviewsSection } from "../widgets/reviews-section";
import { FAQSection } from "../widgets/faq-section";
import { BookingSection } from "../widgets/booking-section";
import { ContactsSection } from "../widgets/contacts-section";
import { Footer } from "../widgets/footer";
import {
  SEO,
  StructuredData,
  organizationSchema,
  generateFAQSchema,
  breadcrumbsSchema,
  websiteSchema,
  generateReviewSchema,
} from "../shared/lib/seo";
import faqData from "../shared/data/faq.json";
import testimonialsData from "../shared/data/testimonials.json";

export function HomePage() {
  const faqSchema = generateFAQSchema(faqData);
  const reviewSchema = generateReviewSchema(testimonialsData);

  return (
    <div className="min-h-screen">
      <SEO />
      <StructuredData data={organizationSchema} />
      <StructuredData data={faqSchema} />
      <StructuredData data={breadcrumbsSchema} />
      <StructuredData data={websiteSchema} />
      <StructuredData data={reviewSchema} />

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
  );
}
