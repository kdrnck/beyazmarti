import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  const secret = request.nextUrl.searchParams.get('secret')
  const path = request.nextUrl.searchParams.get('path') || '/'

  // Verify secret
  if (secret !== process.env.PREVIEW_SECRET) {
    return NextResponse.json({ message: 'Invalid token' }, { status: 401 })
  }

  // Enable draft mode
  const dm = await draftMode()
  dm.enable()

  // Redirect to preview page
  redirect(`${path}?preview=1`)
}

