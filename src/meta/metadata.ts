import { Metadata } from "next";

export const meta: Metadata = {
  metadataBase: new URL('https://blog.alamondai.com'),
  title: "Alamondai Blog",
  description: "Discover insightful, actionable content on web development, tech trends, productivity, and digital growth. Stay ahead with practical guides, developer tips, and real-world project breakdowns.",
  icons: {
    icon: '/logo.png',
  },
  openGraph: {
    url: "https://www.alamondai.com",
    title: "Alamondai Blog",
    description: "Discover insightful, actionable content on web development, tech trends, productivity, and digital growth. Stay ahead with practical guides, developer tips, and real-world project breakdowns.",
    siteName: "Alamondai Blog",
    images: [
      {
        url: "/seo-image.png",
        width: 1200,
        height: 630,
      }
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Alamondai Blog",
    description: "Discover insightful, actionable content on web development, tech trends, productivity, and digital growth. Stay ahead with practical guides, developer tips, and real-world project breakdowns.",
    images: ['/seo-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: 'google',
    yandex: 'yandex',
    yahoo: 'yahoo',
    other: {
      me: ['nattynengeda@gmail.com', 'https://portfolio.alamondai.com']
    }
  },
  appleWebApp: {
    title: 'Alamondai Blog',
    statusBarStyle: 'black-translucent',
    startupImage: [
      '/logo.png'
    ]
  }
};