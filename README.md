# Beyaz Martı Spor Kulübü

Modern, responsive ve performanslı spor kulübü web sitesi. Next.js 15, Sanity CMS ve Tailwind CSS ile geliştirilmiştir.

## 🚀 Özellikler

- **Modern Stack**: Next.js 15, TypeScript, Tailwind CSS
- **CMS**: Sanity Studio ile kolay içerik yönetimi
- **Responsive**: Tüm cihazlarda mükemmel görünüm
- **ISR**: On-demand revalidation ile hızlı güncellemeler
- **SEO**: Optimize edilmiş meta veriler

## 📋 Teknoloji Stack

- **Frontend**: Next.js 15, React 19, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui
- **CMS**: Sanity v3, GROQ
- **Deployment**: Vercel

## 🛠️ Kurulum

### 1. Bağımlılıkları Yükle

```bash
npm install
```

### 2. Environment Variables

`.env.local` dosyası oluşturun ve `.env.example` dosyasındaki değerleri doldurun:

```bash
cp .env.example .env.local
```

Gerekli değişkenler:
- `NEXT_PUBLIC_SANITY_PROJECT_ID`: Sanity proje ID'si
- `NEXT_PUBLIC_SANITY_DATASET`: Sanity dataset adı
- `SANITY_API_TOKEN`: Sanity API token
- `REVALIDATE_SECRET`: Webhook güvenlik anahtarı

### 3. Sanity Studio'yu Başlat

```bash
npm run studio
```

Studio `http://localhost:3333` adresinde çalışacak.

### 4. Development Server

```bash
npm run dev
```

Uygulama `http://localhost:3000` adresinde çalışacak.

## 📝 Sanity Şemaları

### Blog Sistemi
- **post**: Blog yazıları (başlık, içerik, yazar, etiketler)
- **author**: Yazarlar (ad, avatar, biyografi)
- **tag**: Etiketler (başlık, slug)

### Takım Sistemi
- **team**: Takımlar (ad, yaş grubu, seviye, başarılar)
- **player**: Oyuncular (ad, pozisyon, forma no, yaş, fotoğraf, takım etiketi)
- **boardMember**: Yönetim kurulu üyeleri
- **staff**: Teknik ekip üyeleri
- **opponentTeam**: Rakip takımlar
- **match**: Maçlar (tarih, rakip, sonuç, set skorları)
- **jersey**: Formalar (ad, resimler)

## 🔄 ISR Revalidation

Sanity webhook'ları ile otomatik revalidation:

1. **Sanity Studio'da Webhook Oluştur**:
   - URL: `https://yourdomain.com/api/revalidate`
   - Method: POST
   - Body: `{"secret": "your_revalidate_secret", "type": "post", "slug": "{{slug.current}}"}`

2. **Desteklenen Revalidation Tipleri**:
   - `post`: Blog yazıları
   - `match`: Maçlar
   - `player`: Oyuncular
   - `boardMember`: Yönetim kurulu
   - `staff`: Teknik ekip
   - `jersey`: Formalar

## 📱 Sayfalar

### Statik Sayfalar
- `/`: Ana sayfa (hero + son blog yazıları + son maç)
- `/kulup-hakkinda`: Kulüp tanıtımı ve formalar
- `/yonetim-kurulu`: Yönetim kurulu
- `/teknik-ekip`: Teknik kadro
- `/takimlarimiz`: Takım listesi
- `/hazirlik-gruplari`: Hazırlık grupları
- `/iletisim`: İletişim
- `/maclar`: Maçlar

### Dinamik Sayfalar
- `/blog`: Blog listesi
- `/blog/[slug]`: Blog detayı
- `/takimlarimiz/[slug]`: Takım detayı
- `/studio`: Sanity Studio

## 🚀 Deployment

### Vercel'e Deploy

1. Projeyi GitHub'a push edin
2. Vercel'e bağlayın
3. Environment variables'ları ekleyin
4. Deploy edin

### Environment Variables (Production)

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token
REVALIDATE_SECRET=your_random_secret
```

## 📊 GROQ Queries

### Oyuncuları Takıma Göre Getir
```groq
*[_type == "player" && teamTag->slug.current == $teamSlug] | order(number asc) {
  _id,
  name,
  position,
  number,
  age,
  bio,
  photo{
    asset->{
      _id,
      url
    },
    alt
  }
}
```

### Son Maç
```groq
*[_type == "match"] | order(date desc)[0] {
  _id,
  date,
  result,
  set1,
  set2,
  set3,
  set4,
  set5,
  hasSet4,
  hasSet5,
  homeTeam->{
    name,
    logo{
      asset->{
        _id,
        url
      },
      alt
    }
  },
  awayTeam->{
    name,
    logo{
      asset->{
        _id,
        url
      },
      alt
    }
  }
}
```

## 🤝 Katkıda Bulunma

1. Fork edin
2. Feature branch oluşturun (`git checkout -b feature/amazing-feature`)
3. Commit edin (`git commit -m 'Add amazing feature'`)
4. Push edin (`git push origin feature/amazing-feature`)
5. Pull Request oluşturun

## 📄 Lisans

Bu proje MIT lisansı altında lisanslanmıştır.