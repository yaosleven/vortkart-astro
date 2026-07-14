// ============================================================
// VortKart® Global Site Configuration
// Edit this file to update site-wide settings
// ============================================================

export const SITE = {
  name: 'VortKart®',
  fullName: 'VortKart® International',
  tagline: 'Commercial Go Kart Manufacturer & Track Design Solutions',
  description:
    'VortKart® is a factory-direct commercial go kart manufacturer offering rental go karts, racing chassis, and complete turnkey karting solutions for operators worldwide.',
  url: 'https://vortkart.com',
  ogImage: '/images/og-default.jpg',
};

export const CONTACT = {
  phone: '+86 177 1999 3371',
  phoneRaw: '+8617719993371',
  whatsapp: '+8617719993371',
  email: 'info@vortkart.com',
  supportEmail: 'info@vortkart.com',

  // Legal / operating entity — shown on the Contact page only
  legalName: 'Zhengzhou Zhuoyuan Amusement Equipment Co., Ltd.',

  // Head office
  officeAddress: 'Room 1303, Yunxi Center, High-tech Zone, Zhengzhou, Henan, China',
  officeCity: 'Zhengzhou, Henan, China',

  // Manufacturing facility
  factoryAddress:
    '560m south of the National Highway 310 & Xingmi Road (Auxiliary Road) intersection, Xingyang, Zhengzhou, Henan, China',
  factoryCity: 'Xingyang, Zhengzhou, Henan, China',

  // Compact footer address lines (kept short so each address stays 2 lines)
  officeLine1: 'Room 1303, Yunxi Center,',
  officeLine2: 'High-tech Zone, Zhengzhou, Henan, China',
  factoryLine1: "Nat'l Highway 310 & Xingmi Rd,",
  factoryLine2: 'Xingyang, Zhengzhou, Henan, China',

  // Primary address used for JSON-LD / legal pages (head office)
  address: 'Room 1303, Yunxi Center, High-tech Zone, Zhengzhou, Henan, China',

  hours: 'Mon-Fri 08:00-19:00 CST (UTC+8)',
};

export const SOCIAL = {
  facebook: '',
  instagram: '',
  linkedin: '',
  youtube: '',
};

// Analytics & Google Ads conversion tracking.
// Fill in your real IDs to activate tracking. Empty strings = tracking disabled (no scripts injected).
export const ANALYTICS = {
  ga4Id: '',            // GA4 Measurement ID, e.g. 'G-XXXXXXXXXX'
  adsId: '',            // Google Ads ID, e.g. 'AW-XXXXXXXXXX'
  // Conversion label for the Quote Form submission (from Google Ads > Conversions).
  // Format used at fire time: `${adsId}/${quoteConversionLabel}`
  quoteConversionLabel: '', // e.g. 'abcDEFghIJ-klMNoPqr'
};

export const NAV = [
  { label: 'Home',      href: '/' },
  { label: 'Factory',   href: '/factory' },
  { label: 'Services',  href: '/services' },
  { label: 'Factory',   href: '/factory' },
  { label: 'Portfolio', href: '/portfolio' },
  { label: 'Blog',      href: '/blog' },
  { label: 'Contact',   href: '/contact' },
];

export const STATS = [
  { value: '120+', label: 'Track Projects' },
  { value: '60+',  label: 'Countries Served' },
  { value: '98%',  label: 'Client Retention' },
  { value: '15+',  label: 'Years Experience' },
];
