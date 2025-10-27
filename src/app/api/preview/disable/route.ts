import { draftMode } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { redirect } from 'next/navigation'

export async function GET(request: NextRequest) {
  // Disable draft mode
  const dm = await draftMode()
  dm.disable()

  // Redirect to home page without preview
  const path = request.nextUrl.searchParams.get('path') || '/'
  redirect(path)
}

