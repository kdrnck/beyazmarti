# Beyaz Martı Spor Kulübü

AI generated readme file

Modern, responsive ve performanslı spor kulübü web platformu. Next.js 15, TypeScript ve Sanity CMS ile geliştirilmiş.

![Next.js](https://img.shields.io/badge/Next.js-15-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-CSS-38bdf8?logo=tailwind-css)
![Sanity](https://img.shields.io/badge/Sanity-CMS-f03e2f?logo=sanity)

## Hakkında

Beyaz Martı Spor Kulübü, 2015 yılında kurulmuş ve voleybol branşında faaliyet gösteren bir spor kulübüdür. Kulübümüz, genç sporcuların gelişimini destekleyerek onları hem spor hem de karakter açısından geleceğe hazırlamaktadır.

## Bazı Özellikler

- **Server-Side Rendering (SSR)** - Next.js 15 App Router ile optimize edilmiş sayfa yüklemeleri
- **Headless CMS** - Sanity ile güçlü içerik yönetimi
- **ISR & On-Demand Revalidation** - Webhook entegrasyonu ile anında içerik güncellemeleri
- **Responsive Design** - Tüm cihazlarda mükemmel görüntüleme deneyimi
- **TypeScript** - Tip güvenliği ve daha iyi geliştirici deneyimi
- **SEO Optimized** - Metadata, sitemap ve robots.txt desteği
- **Image Optimization** - Next.js Image bileşeni ile optimize edilmiş görseller
- **Audio Player** - Takım marşı için özel geliştirilmiş müzik çalar

## Tech Stack

### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework (App Router)
- **[TypeScript](https://www.typescriptlang.org/)** - Tip güvenliği
- **[Tailwind CSS](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Radix UI](https://www.radix-ui.com/)** - Accessible UI primitives

### Backend & CMS
- **[Sanity CMS](https://www.sanity.io/)** - Headless content management
- **[Next.js API Routes](https://nextjs.org/docs/app/building-your-application/routing/route-handlers)** - Backend API endpoints

### Deployment & Hosting
- **[Vercel](https://vercel.com/)** - Deployment platform
- **[Cloudflare R2](https://www.cloudflare.com/products/r2/)** - Image & asset storage (optional)

### Renk Paleti
```css
--primary: #243B9F      /* Lacivert */
--primary-dark: #1B2C78 /* Koyu Lacivert */
--accent: #9F0000       /* Kırmızı */
--background: #0B1020   /* Koyu Arka Plan */
```

### Typography
- **Headings**: Manrope (Google Fonts)
- **Body**: Inter (Google Fonts)

### Bileşenler
- Glassmorphism efektleri
- Smooth transitions ve animations
- Custom audio player UI
- Responsive navigation
- Modal ve dialog bileşenleri


## 🔄 Cache & Revalidation

Proje, ISR (Incremental Static Regeneration) ve on-demand revalidation kullanır:

- **Statik sayfalar** otomatik olarak cache'lenir
- **Sanity webhook** tetiklendiğinde ilgili cache'ler temizlenir
- **Revalidation API** ile manuel cache temizleme

## 📄 License

Bu proje özel mülkiyettedir ve Beyaz Martı Spor Kulübü'ne aittir.

**[www.beyazmarti.org](https://www.beyazmarti.org)** | Sporun gücüyle geleceğe hazırlıyoruz.