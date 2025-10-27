import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  // Disable draft mode
  draftMode().disable()

  // Redirect to home page without preview
  const path = request.nextUrl.searchParams.get('path') || '/'
  redirect(path)
}

