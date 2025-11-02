import { defineType, defineField } from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Blog Yazısı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'coverImage',
      title: 'Kapak Görseli',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Özet',
      type: 'text',
      rows: 3,
      validation: (Rule) => Rule.max(200),
    }),
    defineField({
      name: 'content',
      title: 'İçerik',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'H1', value: 'h1' },
            { title: 'H2', value: 'h2' },
            { title: 'H3', value: 'h3' },
            { title: 'H4', value: 'h4' },
            { title: 'Quote', value: 'blockquote' },
          ],
          lists: [
            { title: 'Bullet', value: 'bullet' },
            { title: 'Number', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Strong', value: 'strong' },
              { title: 'Emphasis', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'tag' } }],
    }),
    defineField({
      name: 'author',
      title: 'Yazar',
      type: 'reference',
      to: { type: 'author' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Yayın Tarihi',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'coverImage',
    },
    prepare(selection) {
      const { author } = selection
      return { ...selection, subtitle: author && `by ${author}` }
    },
  },
})

export const author = defineType({
  name: 'author',
  title: 'Yazar',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'avatar',
      title: 'Avatar',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
      rows: 3,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'avatar',
    },
  },
})

export const tag = defineType({
  name: 'tag',
  title: 'Etiket',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

export const player = defineType({
  name: 'player',
  title: 'Oyuncu',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'position',
      title: 'Pozisyon',
      type: 'string',
      options: {
        list: [
          { title: 'Pasör', value: 'setter' },
          { title: 'Smaçör', value: 'outside-hitter' },
          { title: 'Orta Oyuncu', value: 'middle-blocker' },
          { title: 'Libero', value: 'libero' },
          { title: 'Opposite', value: 'opposite' },
        ],
      },
    }),
    defineField({
      name: 'number',
      title: 'Forma Numarası',
      type: 'number',
      validation: (Rule) => Rule.min(1).max(99),
    }),
    defineField({
      name: 'birthYear',
      title: 'Doğum Yılı',
      type: 'string',
      placeholder: 'Örn: 2010',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Görsel için açıklayıcı metin (SEO için önemli)',
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'teamTag',
      title: 'Takım',
      type: 'reference',
      to: { type: 'team' },
      description: 'Oyuncunun ait olduğu takım',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif Oyuncu',
      type: 'boolean',
      initialValue: true,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'position',
      media: 'photo',
    },
  },
})

export const boardMember = defineType({
  name: 'boardMember',
  title: 'Yönetim Kurulu Üyesi',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Görev',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Görsel için açıklayıcı metin (SEO için önemli)',
        }
      ]
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'row',
      title: 'Satır',
      type: 'string',
      options: {
        list: [
          { title: '1. Satır (Asıl Yöneticiler)', value: '1' },
          { title: '2. Satır (Yardımcılar)', value: '2' },
        ],
      },
      initialValue: '1',
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})

export const opponentTeam = defineType({
  name: 'opponentTeam',
  title: 'Rakip Takım',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Takım Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'logo',
      title: 'Logo',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Görsel için açıklayıcı metin (SEO için önemli)',
        }
      ]
    }),
    defineField({
      name: 'city',
      title: 'Şehir',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'city',
      media: 'logo',
    },
  },
})

export const match = defineType({
  name: 'match',
  title: 'Maç',
  type: 'document',
  fields: [
    defineField({
      name: 'showOnHomepage',
      title: 'Maç anasayfada gösterilsin mi?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'team',
      title: 'Grup/Takım',
      type: 'reference',
      to: { type: 'team' },
      description: 'Bu maç hangi takım/grup için?',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'status',
      title: 'Maç Durumu',
      type: 'string',
      options: {
        list: [
          { title: 'Gelecek Maç', value: 'upcoming' },
          { title: 'Geçmiş Maç', value: 'past' },
        ],
      },
      initialValue: 'upcoming',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Tarih',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'homeTeam',
      title: 'Ev Sahibi Takım',
      type: 'reference',
      to: { type: 'opponentTeam' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'awayTeam',
      title: 'Deplasman Takımı',
      type: 'reference',
      to: { type: 'opponentTeam' },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'result',
      title: 'Sonuç',
      type: 'string',
      placeholder: 'Örn: 3-1, 3-0',
      // Gelecek maç için zorunlu değil, geçmiş maç için zorunlu
      validation: (Rule) => Rule.custom((value, context) => {
        const status = (context?.parent as any)?.status
        if (status === 'past' && !value) return 'Geçmiş maçlarda sonuç zorunludur.'
        return true
      }),
    }),
    defineField({
      name: 'set1',
      title: '1. Set',
      type: 'string',
      placeholder: 'Örn: 25-23',
      validation: (Rule) => Rule.custom((value, context) => {
        const status = (context?.parent as any)?.status
        if (status === 'past' && !value) return 'Geçmiş maçlarda set sonuçları zorunludur.'
        return true
      }),
    }),
    defineField({
      name: 'set2',
      title: '2. Set',
      type: 'string',
      placeholder: 'Örn: 25-21',
      validation: (Rule) => Rule.custom((value, context) => {
        const status = (context?.parent as any)?.status
        if (status === 'past' && !value) return 'Geçmiş maçlarda set sonuçları zorunludur.'
        return true
      }),
    }),
    defineField({
      name: 'set3',
      title: '3. Set',
      type: 'string',
      placeholder: 'Örn: 25-19',
      validation: (Rule) => Rule.custom((value, context) => {
        const status = (context?.parent as any)?.status
        if (status === 'past' && !value) return 'Geçmiş maçlarda set sonuçları zorunludur.'
        return true
      }),
    }),
    defineField({
      name: 'hasSet4',
      title: '4. Set Var mı?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'set4',
      title: '4. Set',
      type: 'string',
      placeholder: 'Örn: 23-25',
      hidden: ({ document }) => !document?.hasSet4,
    }),
    defineField({
      name: 'hasSet5',
      title: '5. Set Var mı?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'set5',
      title: '5. Set',
      type: 'string',
      placeholder: 'Örn: 15-13',
      hidden: ({ document }) => !document?.hasSet5,
    }),
    defineField({
      name: 'venue',
      title: 'Saha',
      type: 'string',
      placeholder: 'Örn: Bahçeköy Spor Salonu',
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan Maç',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'awayTeam.name',
      subtitle: 'date',
      homeTeam: 'homeTeam.name',
      result: 'result',
    },
    prepare(selection) {
      const { title, subtitle, homeTeam, result } = selection
      return { 
        title: `${homeTeam} vs ${title}`,
        subtitle: `${result} - ${subtitle ? new Date(subtitle).toLocaleDateString('tr-TR') : 'Tarih yok'}`,
      }
    },
  },
})

export const team = defineType({
  name: 'team',
  title: 'Takım',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Takım Adı',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Açıklama',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'ageGroup',
      title: 'Yaş Grubu',
      type: 'string',
      placeholder: 'Örn: Genç, Yıldız, Küçük',
    }),
    defineField({
      name: 'level',
      title: 'Seviye',
      type: 'string',
      placeholder: 'Örn: A, B, Tek, 2010, 2011',
    }),
    defineField({
      name: 'achievements',
      title: 'Başarılar',
      type: 'string',
      placeholder: 'Örn: 3 Şampiyonluk',
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif Takım',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'ageGroup',
    },
  },
})

export const imageAsset = defineType({
  name: 'imageAsset',
  title: 'Görsel Varlığı',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'r2Key',
      title: 'R2 Key',
      type: 'string',
      description: 'Cloudflare R2\'deki dosya yolu',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      description: 'Görselin tam URL\'si',
    }),
    defineField({
      name: 'ownerRef',
      title: 'Sahip Referansı',
      type: 'reference',
      to: [
        { type: 'player' },
        { type: 'boardMember' },
        { type: 'opponentTeam' },
      ],
    }),
    defineField({
      name: 'class',
      title: 'Sınıf',
      type: 'string',
      options: {
        list: [
          { title: 'A Takım Oyuncusu', value: 'a-team-player' },
          { title: 'Yönetim Kurulu', value: 'board' },
          { title: 'Rakip Takım', value: 'opponent' },
          { title: 'Blog Görseli', value: 'blog' },
          { title: 'Maç Görseli', value: 'match' },
          { title: 'Genel', value: 'general' },
        ],
      },
    }),
    defineField({
      name: 'tags',
      title: 'Etiketler',
      type: 'array',
      of: [{ type: 'string' }],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'class',
    },
  },
})

// Teknik Ekip Şeması
export const staff = defineType({
  name: 'staff',
  title: 'Teknik Ekip',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Ad Soyad',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Pozisyon',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'bio',
      title: 'Biyografi',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'photo',
      title: 'Fotoğraf',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Alt Text',
          description: 'Görsel için açıklayıcı metin (SEO için önemli)',
        }
      ]
    }),
    defineField({
      name: 'experience',
      title: 'Deneyim',
      type: 'string',
      placeholder: 'Örn: 10 yıl antrenörlük deneyimi',
    }),
    defineField({
      name: 'certifications',
      title: 'Sertifikalar',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
    defineField({
      name: 'section',
      title: 'Bölüm',
      type: 'string',
      options: {
        list: [
          { title: 'Baş Antrenör', value: 'bas-antrenor' },
          { title: 'Koordinatör', value: 'koordinator' },
          { title: 'Antrenör', value: 'antrenor' },
          { title: 'Yardımcı Antrenör', value: 'yardimci-antrenor' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'role',
      media: 'photo',
    },
  },
})

export const jersey = defineType({
  name: 'jersey',
  title: 'Forma',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Forma Adı',
      type: 'string',
      placeholder: 'Örn: Deplasman Forması, Minikler Forması',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image1',
      title: 'Forma Resmi 1',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: 'Resim için açıklayıcı metin',
        }),
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image2',
      title: 'Forma Resmi 2',
      type: 'image',
      options: {
        hotspot: true,
      },
      fields: [
        defineField({
          name: 'alt',
          title: 'Alt Metin',
          type: 'string',
          description: 'Resim için açıklayıcı metin',
        }),
      ],
    }),
    defineField({
      name: 'description',
      title: 'Forma Açıklaması',
      type: 'text',
      rows: 3,
      description: 'Forma hakkında detaylı açıklama',
    }),
    defineField({
      name: 'featured',
      title: 'Öne Çıkan Forma',
      type: 'boolean',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'name',
      media: 'image1',
    },
  },
})

export const hazirlikGrupuResim = defineType({
  name: 'hazirlikGrupuResim',
  title: 'Galeri Görseli',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'image',
      title: 'Görsel',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'gallery',
      title: 'Hangi Galeriye Ait?',
      type: 'string',
      options: {
        list: [
          { title: 'Hazırlık Grupları', value: 'hazirlik-gruplari' },
        ],
      },
      initialValue: 'hazirlik-gruplari',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'order',
      title: 'Sıralama',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      gallery: 'gallery',
      media: 'image',
    },
    prepare(selection) {
      const { title, gallery } = selection
      const galleryName = gallery === 'hazirlik-gruplari' ? 'Hazırlık Grupları' : gallery
      return { 
        ...selection, 
        subtitle: galleryName 
      }
    },
  },
})

// Club Stats (singleton)
export const clubStats = defineType({
  name: 'clubStats',
  title: 'Kulüp İstatistikleri',
  type: 'document',
  fields: [
    defineField({
      name: 'championships',
      title: 'Şampiyonluk Sayısı',
      type: 'number',
      initialValue: 15,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'activeAthletes',
      title: 'Aktif Sporcu Sayısı',
      type: 'number',
      initialValue: 200,
      validation: (Rule) => Rule.min(0),
    }),
    defineField({
      name: 'experienceYears',
      title: 'Deneyim (Yıl)',
      type: 'number',
      initialValue: 10,
      validation: (Rule) => Rule.min(0),
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Kulüp İstatistikleri' }
    },
  },
})

// Pop-up Schema
export const popup = defineType({
  name: 'popup',
  title: 'Pop-up',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Başlık',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'content',
      title: 'İçerik Metni',
      type: 'array',
      of: [
        {
          type: 'block',
          styles: [
            { title: 'Normal', value: 'normal' },
            { title: 'Başlık 1', value: 'h1' },
            { title: 'Başlık 2', value: 'h2' },
            { title: 'Başlık 3', value: 'h3' },
            { title: 'Alıntı', value: 'blockquote' },
          ],
          lists: [
            { title: 'Madde İşareti', value: 'bullet' },
            { title: 'Numara', value: 'number' },
          ],
          marks: {
            decorators: [
              { title: 'Kalın', value: 'strong' },
              { title: 'İtalik', value: 'em' },
            ],
            annotations: [
              {
                name: 'link',
                type: 'object',
                title: 'Link',
                fields: [
                  {
                    name: 'href',
                    type: 'url',
                    title: 'URL',
                  },
                ],
              },
            ],
          },
        },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: 'Alt Metin',
              description: 'Görsel için açıklayıcı metin (SEO için önemli)',
            },
          ],
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonText',
      title: 'Buton Metni',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'buttonLink',
      title: 'Buton Yönlendirme Sayfası',
      type: 'string',
      description: 'Örn: /blog, /iletisim, /takimlarimiz',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isActive',
      title: 'Aktif',
      type: 'boolean',
      initialValue: true,
      description: 'Pop-up\'ı göster/gizle',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      active: 'isActive',
    },
    prepare({ title, active }) {
      return {
        title: title || 'Pop-up',
        subtitle: active ? 'Aktif' : 'Pasif',
      }
    },
  },
})

// Export all schemas as an array
export const schemaTypes = [
  post,
  author,
  tag,
  player,
  boardMember,
  opponentTeam,
  match,
  team,
  staff,
  imageAsset,
  jersey,
  hazirlikGrupuResim,
  clubStats,
  popup,
]
