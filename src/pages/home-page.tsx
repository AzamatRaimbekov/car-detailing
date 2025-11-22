import { Suspense, lazy } from "react";
import { Navigation } from "../widgets/navigation";
import { HeroSection } from "../widgets/hero-section";
import { FeaturesSection } from "../widgets/features-section";
import { ServicesSection } from "../widgets/services-section";
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

// Lazy load below-the-fold widgets for better initial load performance
const PricingSection = lazy(() =>
  import("../widgets/pricing-section").then((module) => ({
    default: module.PricingSection,
  }))
);
const PortfolioSection = lazy(() =>
  import("../widgets/portfolio-section").then((module) => ({
    default: module.PortfolioSection,
  }))
);
const ReviewsSection = lazy(() =>
  import("../widgets/reviews-section").then((module) => ({
    default: module.ReviewsSection,
  }))
);
const FAQSection = lazy(() =>
  import("../widgets/faq-section").then((module) => ({
    default: module.FAQSection,
  }))
);
const BookingSection = lazy(() =>
  import("../widgets/booking-section").then((module) => ({
    default: module.BookingSection,
  }))
);
const ContactsSection = lazy(() =>
  import("../widgets/contacts-section").then((module) => ({
    default: module.ContactsSection,
  }))
);

// Loading placeholder for lazy-loaded sections
const SectionLoader = () => (
  <div className="min-h-[400px] flex items-center justify-center">
    <div className="w-12 h-12 border-4 border-gold-500 border-t-transparent rounded-full animate-spin"></div>
  </div>
);

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
        <Suspense fallback={<SectionLoader />}>
          <PricingSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <PortfolioSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ReviewsSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <FAQSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <BookingSection />
        </Suspense>
        <Suspense fallback={<SectionLoader />}>
          <ContactsSection />
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
