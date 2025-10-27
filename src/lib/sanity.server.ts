import { createClient } from 'next-sanity'
import { draftMode } from 'next/headers'

// Server-only client that respects draft mode for preview functionality
export async function getPreviewClient() {
  const dm = await draftMode()
  const isDraft = dm.isEnabled

  return createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
    apiVersion: '2024-01-01',
    useCdn: !isDraft, // Disable CDN for draft mode
    perspective: isDraft ? 'previewDrafts' : 'published',
    token: isDraft ? process.env.SANITY_API_READ_TOKEN : undefined,
    stega: {
      enabled: isDraft,
    },
  })
}

// Server-only fetch with preview support
export async function fetchWithPreview<T>(
  query: string,
  params: any = {},
  tags?: string[]
): Promise<T> {
  const dm = await draftMode()
  const isDraft = dm.isEnabled
  const client = await getPreviewClient()
  
  const options: any = isDraft 
    ? { cache: 'no-store' as const }
    : tags 
      ? { next: { tags } }
      : undefined
  
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore sanity client returns any
  return await client.fetch(query, params, options)
}

