import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath, revalidateTag } from 'next/cache'

export async function POST(request: NextRequest) {
  try {
    const { secret, type, slug } = await request.json()

    // Verify secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ message: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate based on type
    switch (type) {
      case 'post':
        if (slug) {
          // Revalidate specific blog post
          revalidatePath(`/blog/${slug}`)
          revalidatePath('/blog')
        } else {
          // Revalidate blog index
          revalidatePath('/blog')
        }
        break

      case 'match':
        if (slug) {
          // Revalidate specific match (if we had match detail pages)
          revalidatePath(`/matches/${slug}`)
        }
        // Always revalidate home page for featured matches
        revalidatePath('/')
        break

      case 'player':
        // Revalidate team pages and home page
        revalidatePath('/takimlarimiz')
        revalidatePath('/takimlarimiz/[slug]', 'page')
        break

      case 'boardMember':
        // Revalidate about pages
        revalidatePath('/yonetim-kurulu')
        break

      default:
        // General revalidation
        revalidatePath('/')
        revalidatePath('/blog')
        revalidatePath('/takimlarimiz')
    }

    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      type,
      slug: slug || 'all'
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { error: 'Error revalidating' },
      { status: 500 }
    )
  }
}
