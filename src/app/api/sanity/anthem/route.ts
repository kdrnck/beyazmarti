import { NextResponse } from "next/server"

import { fetchWithRetry, queries } from "@/lib/sanity"

export async function GET() {
  try {
    const anthem = await fetchWithRetry(queries.clubAnthem, {}, 2, ["clubAnthem"])

    if (!anthem || !anthem?.audioFile?.asset?.url) {
      return NextResponse.json(
        { error: "Takım marşı bulunamadı" },
        { status: 404 }
      )
    }

    return NextResponse.json({ anthem })
  } catch (error) {
    console.error("Anthem fetch error:", error)
    return NextResponse.json(
      { error: "Takım marşı yüklenirken hata oluştu" },
      { status: 500 }
    )
  }
}

