// Core domain types
export interface Service {
  id: string;
  title: string;
  category: 'exterior' | 'interior' | 'protection' | 'addons';
  short: string;
  details: string[];
  durationHours?: number;
  priceFrom: number;
  tag?: 'hit' | 'new' | 'sale';
  image?: string;
}

export interface Package {
  id: string;
  title: string;
  includes: string[];
  priceFrom: number;
  best?: boolean;
  recommendedFor?: string[];
  description?: string;
}

export interface PortfolioItem {
  id: string;
  title: string;
  category: 'polishing' | 'ceramic' | 'interior' | 'ppf';
  beforeImage: string;
  afterImage: string;
  description?: string;
  services: string[];
}

export interface Testimonial {
  id: string;
  name: string;
  car: string;
  rating: number;
  text: string;
  verified?: boolean;
  date?: string;
  avatar?: string;
}

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  workingHours: {
    weekdays: string;
    weekends: string;
  };
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface BrandConfig {
  name: string;
  city: string;
  logo?: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
  };
  socialMedia: {
    instagram?: string;
    facebook?: string;
    telegram?: string;
    whatsapp?: string;
  };
}

export interface BookingFormData {
  name: string;
  phone: string;
  carModel?: string;
  service?: string;
  package?: string;
  preferredDate?: string;
  preferredTime?: string;
  comment?: string;
}

// UI Component types
export interface ButtonProps {
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link' | 'glass';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  disabled?: boolean;
  type?: 'button' | 'submit' | 'reset';
}

export interface CardProps {
  className?: string;
  children: React.ReactNode;
  variant?: 'default' | 'glass' | 'elevated';
}

// Language types
export type Language = 'ru' | 'en';

export interface TranslationStrings {
  hero: {
    title: string;
    subtitle: string;
    ctaBooking: string;
    ctaPricing: string;
  };
  navigation: {
    services: string;
    pricing: string;
    portfolio: string;
    reviews: string;
    faq: string;
    contacts: string;
    booking: string;
  };
  services: {
    title: string;
    subtitle: string;
    categories: {
      exterior: string;
      interior: string;
      protection: string;
      addons: string;
    };
    priceFrom: string;
    duration: string;
    hours: string;
    details: string;
  };
  pricing: {
    title: string;
    subtitle: string;
    recommended: string;
    book: string;
    includes: string;
  };
  portfolio: {
    title: string;
    subtitle: string;
    filters: {
      all: string;
      polishing: string;
      ceramic: string;
      interior: string;
      ppf: string;
    };
    before: string;
    after: string;
  };
  reviews: {
    title: string;
    subtitle: string;
    verified: string;
  };
  faq: {
    title: string;
    subtitle: string;
  };
  booking: {
    title: string;
    subtitle: string;
    form: {
      name: string;
      phone: string;
      carModel: string;
      service: string;
      package: string;
      preferredDate: string;
      preferredTime: string;
      comment: string;
      submit: string;
    };
    success: string;
    error: string;
  };
  contacts: {
    title: string;
    address: string;
    phone: string;
    workingHours: string;
    weekdays: string;
    weekends: string;
  };
  footer: {
    copyright: string;
    privacy: string;
  };
}

// Analytics events
export type AnalyticsEvent = 
  | 'cta_click'
  | 'submit_booking'
  | 'open_pricing'
  | 'open_gallery'
  | 'switch_lang'
  | 'view_service'
  | 'select_package'
  | 'open_portfolio_item';
