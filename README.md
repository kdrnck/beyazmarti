# Beyaz Martı Spor Kulübü

Modern ve responsive spor kulübü web sitesi. Voleybol branşında faaliyet gösteren kulübün resmi web platformu.

## 🏐 Hakkında

Beyaz Martı Spor Kulübü, 2015 yılında kurulmuş ve voleybol branşında faaliyet gösteren bir spor kulübüdür. Kulübümüz, genç sporcuların gelişimini destekleyerek onları hem spor hem de karakter açısından geleceğe hazırlamaktadır.

## ✨ Özellikler

- **Modern Tasarım**: Responsive ve kullanıcı dostu arayüz
- **İçerik Yönetimi**: Sanity CMS ile kolay içerik güncellemeleri
- **Takım Bilgileri**: Tüm takımlarımızın detaylı bilgileri ve oyuncu profilleri
- **Blog Sistemi**: Kulüp haberleri ve duyuruları
- **Maç Sonuçları**: Güncel maç sonuçları ve istatistikler
- **Yönetim Bilgileri**: Yönetim kurulu ve teknik ekip bilgileri

## 🎯 Takımlarımız

- **Genç (A) Takım**: En deneyimli genç oyuncularımız
- **Genç (B) Takım**: Gelişim odaklı antrenman programları
- **Yıldız (A) Takım**: Stratejik oyun ve takım uyumu
- **Yıldız (B) Takım**: Temel becerilerin pekiştirilmesi
- **Küçük Takım**: Temel voleybol becerileri
- **Küçük (2010) Takım**: 2010 doğumlu sporcular
- **Küçük (2011) Takım**: 2011 doğumlu sporcular
- **Midi (A) Takım**: Teknik gelişim odaklı
- **Midi (B) Takım**: Temel seviye antrenmanlar
- **Minik Takım**: Voleybola ilk adım atan minik sporcular
- **Hazırlık Grupları**: Sporcu gelişim programları

## 🏆 Başarılarımız

- **15+ Şampiyonluk**
- **200+ Aktif Sporcu**
- **10+ Yıllık Deneyim**

## 📱 Sayfalar

- **Ana Sayfa**: Kulüp tanıtımı ve son haberler
- **Kulüp Hakkında**: Kulüp tarihçesi, vizyon ve misyon
- **Takımlarımız**: Tüm takımlarımızın bilgileri
- **Yönetim Kurulu**: Yönetim kadromuz
- **Teknik Ekip**: Antrenörlerimiz ve teknik kadro
- **Hazırlık Grupları**: Sporcu gelişim programları
- **Maçlar**: Güncel maç sonuçları
- **Blog**: Kulüp haberleri ve duyuruları
- **İletişim**: İletişim bilgileri

## 🛠️ Teknoloji

- **Next.js 15**: Modern React framework
- **TypeScript**: Tip güvenliği
- **Tailwind CSS**: Utility-first CSS framework
- **Sanity CMS**: Headless content management
- **Vercel**: Hosting ve deployment

## 🔄 Anında Güncelleme Sistemi (ISR + Warm Cache Revalidation)

Bu proje, içerik yayınlandıktan hemen sonra sitede güncel verinin görünmesi için **ISR (Incremental Static Regeneration)** ve **warm cache revalidation** kullanmaktadır.

### Nasıl Çalışır?

**Halka Açık Sayfalar:**
- Sayfalar cache'lenmiş olarak servis edilir (hızlı yüklenme)
- Her 60 saniyede otomatik yenilenir (ISR fallback)
- Sanity webhook tetiklendiğinde ilgili cache anında temizlenir ve warm-up yapılır (3-5 saniye)

### 🔗 Sanity Webhook Kurulumu

**1. Sanity Studio'da Webhook Oluştur:**
- URL: `https://your-domain.vercel.app/api/revalidate`
- Method: `POST`
- HTTP Headers:
  ```
  x-revalidate-secret: <REVALIDATE_SECRET>
  ```
- Trigger: `create`, `update`, `publish` eventleri
- Document types: `post`, `match`, `player`, `boardMember`, `staff`, `team`, `hazirlikGrupuResim`, `jersey`, `clubStats`

### 🔑 Ortam Değişkenleri (Environment Variables)

```bash
# Revalidation Secret (webhook için)
openssl rand -base64 32
REVALIDATE_SECRET=<generated-secret>

# Preview Secret (staff önizleme için)
openssl rand -base64 32
PREVIEW_SECRET=<generated-secret>

# Sanity API Read Token (taslak verileri için)
# https://sanity.io/manage adresinden alın
SANITY_API_READ_TOKEN=<your-read-token>

# Sanity Project Bilgileri
NEXT_PUBLIC_SANITY_PROJECT_ID=<your-project-id>
NEXT_PUBLIC_SANITY_DATASET=production
```

### 🔄 Manuel Revalidation

Bir sayfayı manuel olarak yenilemek için:

```bash
curl "https://your-domain.vercel.app/api/revalidate?secret=<REVALIDATE_SECRET>&path=/blog"
```

### 📋 Cache Tag Sistemi

Her içerik türü için özel cache tag'leri:
- `posts` - Blog yazıları listesi
- `post:${slug}` - Belirli bir blog yazısı  
- `matches` - Maçlar listesi
- `teams` - Takımlar listesi
- `team:${slug}` - Belirli bir takım
- `players` - Oyuncular listesi
- `team:${slug}:players` - Bir takımın oyuncuları
- `boardMembers` - Yönetim kurulu
- `staff` - Teknik ekip
- `hazirlik-gruplari` - Hazırlık grupları
- `jerseys` - Formalar
- `stats` - Kulüp istatistikleri
- `about` - Hakkında sayfası
- `home` - Ana sayfa

### ⚡ Performans

- **Public kullanıcılar**: Cache'lenmiş sayfalar = anında yükleme
- **Staff**: Preview mode = taslak içerikleri anında görme
- **Yayınlanma**: Webhook = anında güncelleme (1-2 saniye)

## 📞 İletişim

- **Adres**: Bahçeköy Merkez, Orman Fakültesi No:2, 34473 Sarıyer/İstanbul
- **Telefon**: 0212 954 08 73
- **E-posta**: info@beyazmarti.org

## 🎨 Renk Paleti

- **Ana Renk**: Lacivert (#1e40af)
- **Vurgu Rengi**: Kırmızı (#dc2626)
- **Arka Plan**: Beyaz (#ffffff)
- **Metin**: Koyu gri (#374151)

---

*Beyaz Martı Spor Kulübü - Sporun gücüyle geleceğe hazırlıyoruz.*