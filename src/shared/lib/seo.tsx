import { useEffect } from 'react'

interface SEOProps {
  title?: string
  description?: string
  keywords?: string
  image?: string
  url?: string
  type?: 'website' | 'article'
}

export function SEO({
  title = 'SHINE PORT - Premium Car Detailing in America',
  description = 'Professional car detailing in America: ceramic coating, PPF protection, polishing, interior deep clean. Quality warranty up to 24 months. Book online!',
  keywords = 'car detailing, detailing, ceramic coating, PPF, polishing, interior cleaning, America, car wash, car protection',
  image = '/images/og-image.jpg',
  url = 'https://shineport.us',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'SHINE PORT' },
      { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'SHINE PORT' },
      { property: 'og:locale', content: 'en_US' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional meta tags
      { name: 'theme-color', content: '#ffd700' },
      { name: 'msapplication-TileColor', content: '#ffd700' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'apple-mobile-web-app-title', content: 'SHINE PORT' },
      { name: 'format-detection', content: 'telephone=yes' },
      { name: 'geo.region', content: 'US-CA' },
      { name: 'geo.placename', content: 'Los Angeles' },
      { name: 'geo.position', content: '34.0522;-118.2437' },
      { name: 'ICBM', content: '34.0522, -118.2437' },
      { name: 'language', content: 'English' },
      { name: 'revisit-after', content: '7 days' },
      { name: 'rating', content: 'general' },
      
      // Enhanced Open Graph
      { property: 'og:image:width', content: '1200' },
      { property: 'og:image:height', content: '630' },
      { property: 'og:image:alt', content: title },
      
      // Enhanced Twitter
      { name: 'twitter:creator', content: '@shineport_us' },
      { name: 'twitter:site', content: '@shineport_us' },
      { name: 'twitter:image:alt', content: title },
    ]

    metaTags.forEach(({ name, property, content }) => {
      const selector = name ? `meta[name="${name}"]` : `meta[property="${property}"]`
      let meta = document.querySelector(selector) as HTMLMetaElement
      
      if (!meta) {
        meta = document.createElement('meta')
        if (name) meta.name = name
        if (property) meta.setAttribute('property', property)
        document.head.appendChild(meta)
      }
      
      meta.content = content
    })

    // Add canonical link
    let canonical = document.querySelector('link[rel="canonical"]') as HTMLLinkElement
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.rel = 'canonical'
      document.head.appendChild(canonical)
    }
    canonical.href = url

  }, [title, description, keywords, image, url, type])

  return null
}

export function StructuredData({ data }: { data: object }) {
  useEffect(() => {
    const script = document.createElement('script')
    script.type = 'application/ld+json'
    script.textContent = JSON.stringify(data)
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [data])

  return null
}

// Predefined structured data
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": "https://shineport.us/#organization",
  "name": "SHINE PORT",
  "alternateName": "SHINE PORT",
  "description": "Premium car detailing in America. Ceramic coating, PPF protection, polishing, interior deep clean.",
  "url": "https://shineport.us",
  "telephone": "+15551234567",
  "email": "info@shineport.us",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Main Street, Suite 5",
    "addressLocality": "Los Angeles",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 34.0522,
    "longitude": -118.2437
  },
  "openingHours": [
    "Mo-Fr 09:00-20:00",
    "Sa-Su 10:00-18:00"
  ],
  "priceRange": "$$",
  "image": "https://shineport.us/images/logo.jpg",
  "logo": "https://shineport.us/images/logo.jpg",
  "sameAs": [
    "https://instagram.com/primedetail_us",
    "https://t.me/primedetail_us"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Car Detailing Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "9H Ceramic Coating",
          "description": "Long-lasting body protection for 2-3 years"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PPF Protection Film",
          "description": "Anti-gravel protection against chips and scratches"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Body Polishing",
          "description": "Restore shine and remove defects"
        }
      }
    ]
  }
}

// Generate FAQ schema from FAQ data
export function generateFAQSchema(faqData: Array<{id: string, question: string, answer: string}>) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqData.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  }
}

// Breadcrumbs schema
export const breadcrumbsSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://shineport.us/"
    }
  ]
}

// Website schema
export const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "SHINE PORT",
  "url": "https://shineport.us",
  "potentialAction": {
    "@type": "SearchAction",
    "target": {
      "@type": "EntryPoint",
      "urlTemplate": "https://shineport.us/?s={search_term_string}"
    },
    "query-input": "required name=search_term_string"
  }
}

// Service schema generator
export function generateServiceSchema(service: {
  id: string,
  title: string,
  description: string,
  priceFrom: number,
  durationHours?: number,
  category: string
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    "serviceType": service.title,
    "description": service.description || service.title,
    "provider": {
      "@type": "LocalBusiness",
      "name": "SHINE PORT",
      "url": "https://shineport.us"
    },
    "areaServed": {
      "@type": "City",
      "name": "Los Angeles"
    },
    "offers": {
      "@type": "Offer",
      "price": service.priceFrom,
      "priceCurrency": "USD",
      "availability": "https://schema.org/InStock",
      "priceSpecification": {
        "@type": "UnitPriceSpecification",
        "price": service.priceFrom,
        "priceCurrency": "USD",
        "valueAddedTaxIncluded": true
      }
    },
    "category": service.category
  }
}

// Review schema generator
export function generateReviewSchema(reviews: Array<{
  id: string,
  name: string,
  text: string,
  rating: number,
  date?: string,
  car?: string
}>) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "SHINE PORT",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": reviews.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": reviews.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.rating.toString(),
        "bestRating": "5",
        "worstRating": "1"
      },
      "datePublished": review.date || new Date().toISOString()
    }))
  }
}
