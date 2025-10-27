import { NextRequest, NextResponse } from 'next/server'
import { revalidatePath } from 'next/cache'

// Warm up the cache by fetching the path server-side
async function warmPath(path: string) {
  try {
    const baseUrl = process.env.PUBLIC_BASE_URL || process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
    const url = `${baseUrl}${path}`
    await fetch(url, { 
      method: 'GET', 
      cache: 'no-store', 
      headers: { 'x-warm': '1' } 
    })
  } catch (error) {
    console.error(`Failed to warm path ${path}:`, error)
  }
}

export async function GET(request: NextRequest) {
  try {
    const secret = request.nextUrl.searchParams.get('secret')
    const path = request.nextUrl.searchParams.get('path') || '/'

    // Verify secret
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
    }

    // Revalidate the specified path
    revalidatePath(path)

    // Warm the cache
    await warmPath(path)

    return NextResponse.json({ 
      ok: true,
      revalidated: [`path:${path}`],
      now: Date.now(),
      path
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { ok: false, error: 'Error revalidating' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Check secret from header or query params
    const secret = request.headers.get('x-revalidate-secret') || 
                   request.nextUrl.searchParams.get('secret')
    
    if (secret !== process.env.REVALIDATE_SECRET) {
      return NextResponse.json({ ok: false, error: 'Invalid secret' }, { status: 401 })
    }

    // Try to parse Sanity webhook body
    const body = await request.json().catch(() => ({} as any))
    
    // Extract document from different webhook formats
    const doc = body?.body?.current ?? body?.document ?? body?.document?._id ? body?.document : body
    
    const type = doc?._type || body?.type
    const slug = doc?.slug?.current ?? doc?.slug ?? body?.slug
    const _id = doc?._id

    const touched: string[] = []
    const pathsToWarm: string[] = []

    const hitPath = (p: string, type?: 'page' | 'layout') => { 
      revalidatePath(p, type)
      touched.push(`path:${p}`)
      pathsToWarm.push(p)
    }
    
    console.log('Revalidating:', { type, slug, _id })

    // Handle different document types - revalidate paths and related pages
    if (type === 'post') {
      if (slug) {
        hitPath(`/blog/${slug}`)
      }
      hitPath('/blog')
      hitPath('/')
    } 
    else if (type === 'match') {
      hitPath('/maclar')
      hitPath('/')
    }
    else if (type === 'player') {
      hitPath('/takimlarimiz')
      if (doc?.teamTag?.slug?.current) {
        hitPath(`/takimlarimiz/${doc.teamTag.slug.current}`)
      }
    }
    else if (type === 'boardMember') {
      hitPath('/yonetim-kurulu')
    }
    else if (type === 'staff') {
      hitPath('/teknik-ekip')
    }
    else if (type === 'team') {
      if (slug) {
        hitPath(`/takimlarimiz/${slug}`)
      }
      hitPath('/takimlarimiz')
    }
    else if (type === 'hazirlikGrupuResim') {
      hitPath('/hazirlik-gruplari')
    }
    else if (type === 'jersey') {
      hitPath('/kulup-hakkinda')
    }
    else if (type === 'clubStats') {
      hitPath('/')
      hitPath('/kulup-hakkinda')
    }
    else {
      // General revalidation - invalidate all paths
      hitPath('/')
      hitPath('/blog')
      hitPath('/maclar')
      hitPath('/takimlarimiz')
    }

    // Warm up all revalidated paths
    await Promise.all(pathsToWarm.map(p => warmPath(p)))

    return NextResponse.json({ 
      ok: true, 
      revalidated: touched,
      type,
      slug: slug || null,
      _id: _id || null
    })
  } catch (error) {
    console.error('Revalidation error:', error)
    return NextResponse.json(
      { ok: false, error: 'Error revalidating' },
      { status: 500 }
    )
  }
}
