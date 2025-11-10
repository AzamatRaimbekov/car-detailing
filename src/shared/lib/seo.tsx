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
  title = 'Prime Detail - Премиальный автодетейлинг в Бишкеке',
  description = 'Профессиональный автодетейлинг в Бишкеке: керамическое покрытие, PPF защита, полировка, химчистка салона. Гарантия качества до 24 месяцев. Записывайтесь онлайн!',
  keywords = 'автодетейлинг, детейлинг, керамическое покрытие, PPF, полировка, химчистка, Бишкек, автомойка, защита авто',
  image = '/images/og-image.jpg',
  url = 'https://primedetail.kg',
  type = 'website'
}: SEOProps) {
  useEffect(() => {
    // Update document title
    document.title = title

    // Update meta tags
    const metaTags = [
      { name: 'description', content: description },
      { name: 'keywords', content: keywords },
      { name: 'author', content: 'Prime Detail' },
      { name: 'robots', content: 'index, follow' },
      
      // Open Graph
      { property: 'og:title', content: title },
      { property: 'og:description', content: description },
      { property: 'og:image', content: image },
      { property: 'og:url', content: url },
      { property: 'og:type', content: type },
      { property: 'og:site_name', content: 'Prime Detail' },
      { property: 'og:locale', content: 'ru_RU' },
      
      // Twitter Card
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:title', content: title },
      { name: 'twitter:description', content: description },
      { name: 'twitter:image', content: image },
      
      // Additional meta tags
      { name: 'theme-color', content: '#0ea5e9' },
      { name: 'msapplication-TileColor', content: '#0ea5e9' },
      { name: 'apple-mobile-web-app-capable', content: 'yes' },
      { name: 'apple-mobile-web-app-status-bar-style', content: 'default' },
      { name: 'format-detection', content: 'telephone=yes' },
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
  "@id": "https://primedetail.kg/#organization",
  "name": "Prime Detail",
  "alternateName": "Прайм Детейл",
  "description": "Премиальный автодетейлинг в Бишкеке. Керамическое покрытие, PPF защита, полировка, химчистка салона.",
  "url": "https://primedetail.kg",
  "telephone": "+996555123456",
  "email": "info@primedetail.kg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "ул. Московская 123, бокс 5",
    "addressLocality": "Бишкек",
    "addressCountry": "KG"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 42.8746,
    "longitude": 74.5698
  },
  "openingHours": [
    "Mo-Fr 09:00-20:00",
    "Sa-Su 10:00-18:00"
  ],
  "priceRange": "$$",
  "image": "https://primedetail.kg/images/logo.jpg",
  "logo": "https://primedetail.kg/images/logo.jpg",
  "sameAs": [
    "https://instagram.com/primedetail_kg",
    "https://t.me/primedetail_kg"
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Услуги автодетейлинга",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Керамическое покрытие 9H",
          "description": "Долговременная защита кузова на 2-3 года"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "PPF защитная пленка",
          "description": "Антигравийная защита от сколов и царапин"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Полировка кузова",
          "description": "Восстановление блеска и удаление дефектов"
        }
      }
    ]
  }
}

export const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Сколько держится керамическое покрытие?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Керамическое покрытие 9H держится от 2 до 3 лет при правильном уходе. Срок службы зависит от условий эксплуатации автомобиля, частоты моек и качества используемых средств. Мы предоставляем гарантию на покрытие до 24 месяцев."
      }
    },
    {
      "@type": "Question",
      "name": "Чем отличается полировка от абразивной коррекции?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Абразивная коррекция - это процесс удаления дефектов лакокрасочного покрытия (царапины, потертости, окисление) с помощью абразивных паст. Полировка - финишный этап, придающий блеск и глубину цвета."
      }
    },
    {
      "@type": "Question",
      "name": "Нужен ли детейлинг новому автомобилю?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Да, новому автомобилю детейлинг очень полезен. Заводское покрытие часто имеет микродефекты от транспортировки и хранения. Профессиональная подготовка и нанесение защитных покрытий с самого начала обеспечат долговременную сохранность внешнего вида."
      }
    }
  ]
}
