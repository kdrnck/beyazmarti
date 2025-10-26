import { defineConfig } from 'sanity'
import { structureTool } from 'sanity/structure'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'

export default defineConfig({
  name: 'beyazmarti',
  title: 'Beyaz Martı Spor Kulübü',
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title('İçerik')
          .items([
            S.listItem()
              .title('Blog Yazıları')
              .child(S.documentTypeList('post').title('Blog Yazıları')),
            S.listItem()
              .title('Yazarlar')
              .child(S.documentTypeList('author').title('Yazarlar')),
            S.listItem()
              .title('Etiketler')
              .child(S.documentTypeList('tag').title('Etiketler')),
            S.divider(),
            S.listItem()
              .title('Takımlar')
              .child(S.documentTypeList('team').title('Takımlar')),
            S.listItem()
              .title('Oyuncular')
              .child(S.documentTypeList('player').title('Oyuncular')),
                S.listItem()
                  .title('Yönetim Kurulu')
                  .child(S.documentTypeList('boardMember').title('Yönetim Kurulu Üyeleri')),
                S.listItem()
                  .title('Teknik Ekip')
                  .child(S.documentTypeList('staff').title('Teknik Ekip Üyeleri')),
            S.listItem()
              .title('Rakip Takımlar')
              .child(S.documentTypeList('opponentTeam').title('Rakip Takımlar')),
            S.listItem()
              .title('Maçlar')
              .child(S.documentTypeList('match').title('Maçlar')),
            S.listItem()
              .title('Formalar')
              .child(S.documentTypeList('jersey').title('Formalar')),
            S.divider(),
            S.listItem()
              .title('Görseller')
              .child(S.documentTypeList('imageAsset').title('Görsel Varlıkları')),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
