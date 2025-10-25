// Mevcut takımları Sanity'ye eklemek için script
// Bu script'i bir kez çalıştırın, sonra silin

const teams = [
  {
    name: "Genç (A) Takım",
    slug: "genc-a-takim",
    description: "En deneyimli genç oyuncularımızdan oluşan A takımımız. Liderlik ve teknik mükemmellik odaklı antrenmanlar.",
    ageGroup: "Genç",
    level: "A",
    achievements: "3 Şampiyonluk",
    order: 1
  },
  {
    name: "Yıldız (A) Takım",
    slug: "yildiz-a-takim",
    description: "Yıldız kategorisinde en başarılı oyuncularımız. Stratejik oyun ve takım uyumu geliştiriyoruz.",
    ageGroup: "Yıldız",
    level: "A",
    achievements: "2 Şampiyonluk",
    order: 2
  },
  {
    name: "Küçük Takım",
    slug: "kucuk-takim",
    description: "Temel voleybol becerilerini öğrenen küçük yaş grubumuz. Eğlenceli ve öğretici antrenmanlar.",
    ageGroup: "Küçük",
    level: "Tek",
    achievements: "1 Şampiyonluk",
    order: 3
  },
  {
    name: "Midi (A) Takım",
    slug: "midi-a-takim",
    description: "Midi kategorisinde A seviyesi oyuncularımız. Teknik gelişim ve takım çalışması odaklı.",
    ageGroup: "Midi",
    level: "A",
    achievements: "2 Şampiyonluk",
    order: 4
  },
  {
    name: "Genç (B) Takım",
    slug: "genc-b-takim",
    description: "Genç kategorisinde B seviyesi oyuncularımız. Gelişim odaklı antrenman programları.",
    ageGroup: "Genç",
    level: "B",
    achievements: "1 Şampiyonluk",
    order: 5
  },
  {
    name: "Yıldız (B) Takım",
    slug: "yildiz-b-takim",
    description: "Yıldız kategorisinde B seviyesi oyuncularımız. Temel becerilerin pekiştirilmesi.",
    ageGroup: "Yıldız",
    level: "B",
    achievements: "Yeni Takım",
    order: 6
  },
  {
    name: "Küçük (2010) Takım",
    slug: "kucuk-2010-takim",
    description: "2010 doğumlu küçük oyuncularımız. Temel voleybol eğitimi ve motor beceri gelişimi.",
    ageGroup: "Küçük",
    level: "2010",
    achievements: "Yeni Takım",
    order: 7
  },
  {
    name: "Küçük (2011) Takım",
    slug: "kucuk-2011-takim",
    description: "2011 doğumlu küçük oyuncularımız. Oyun temelli öğrenme yaklaşımı.",
    ageGroup: "Küçük",
    level: "2011",
    achievements: "Yeni Takım",
    order: 8
  },
  {
    name: "Minik Takım",
    slug: "minik-takim",
    description: "En küçük yaş grubumuz. Voleybola ilk adım atan minik sporcularımız.",
    ageGroup: "Minik",
    level: "Tek",
    achievements: "Yeni Takım",
    order: 9
  }
];

// Bu script'i Sanity Studio'da çalıştırmak için:
// 1. Studio'yu açın
// 2. Browser console'u açın (F12)
// 3. Bu kodu yapıştırın ve çalıştırın

console.log("Takımları Sanity'ye eklemek için bu script'i çalıştırın...");
console.log("Teams data:", teams);
