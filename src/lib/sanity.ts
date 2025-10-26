import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

const builder = imageUrlBuilder(client)

export function urlFor(source: any) {
  return builder.image(source)
}

// Helper: retry wrapper for Sanity fetch to reduce transient empty states
export async function fetchWithRetry<T>(query: string, params: any = {}, attempts = 2): Promise<T> {
  let lastError: any
  for (let i = 0; i < attempts; i++) {
    try {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore sanity client returns any
      const data: T = await client.fetch(query, params)
      return data
    } catch (err) {
      lastError = err
      // small delay before retry
      await new Promise((r) => setTimeout(r, 200 * (i + 1)))
    }
  }
  throw lastError
}

// GROQ Queries
export const queries = {
  // Blog queries
  posts: `*[_type == "post"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{name, avatar},
    tags[]->{title, slug},
    featured
  }`,
  
  latestPosts: `*[_type == "post"] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{name, avatar},
    tags[]->{title, slug}
  }`,
  
  featuredPosts: `*[_type == "post" && featured == true] | order(publishedAt desc)[0...3] {
    _id,
    title,
    slug,
    excerpt,
    coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{name, avatar}
  }`,
  
  postBySlug: `*[_type == "post" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    content,
    excerpt,
    coverImage{
      asset->{
        _id,
        url
      },
      alt
    },
    publishedAt,
    author->{name, avatar, bio},
    tags[]->{title, slug}
  }`,
  
  // Player queries
  playersByTeam: `*[_type == "player" && teamTag->slug.current == $teamSlug && isActive == true] | order(number asc) {
    _id,
    name,
    position,
    number,
    age,
    bio,
    teamTag->{
      _id,
      name,
      slug
    },
    photo{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  allPlayers: `*[_type == "player" && isActive == true] | order(teamTag asc, number asc) {
    _id,
    name,
    position,
    number,
    age,
    teamTag,
    photo{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  // Board members
  boardMembers: `*[_type == "boardMember"] | order(order asc) {
    _id,
    name,
    role,
    bio,
    photo{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
  
  // Matches
  latestMatch: `*[_type == "match"] | order(date desc)[0] {
    _id,
    date,
    homeTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    awayTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    result,
    set1,
    set2,
    set3,
    hasSet4,
    set4,
    hasSet5,
    set5,
    venue
  }`,
  
  allMatches: `*[_type == "match"] | order(date desc) {
    _id,
    date,
    status,
    showOnHomepage,
    homeTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    awayTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    result,
    set1,
    set2,
    set3,
    hasSet4,
    set4,
    hasSet5,
    set5,
    venue
  }`,
  
  featuredMatches: `*[_type == "match" && featured == true] | order(date desc)[0...3] {
    _id,
    date,
    homeTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    awayTeam->{
      name,
      logo{
        asset->{
          _id,
          url
        },
        alt
      }
    },
    result,
    set1,
    set2,
    set3,
    hasSet4,
    set4,
    hasSet5,
    set5,
    venue
  }`,

  // Club stats (singleton) and derived team count
  clubStats: `*[_type == "clubStats"][0]{
    championships,
    activeAthletes,
    experienceYears
  }`,
  teamsCount: `count(*[_type == "team" && isActive == true])`,
  
  // Homepage matches (dynamic blocks)
  homepageUpcomingMatches: `*[_type == "match" && showOnHomepage == true && status == "upcoming"] | order(date asc) {
    _id,
    date,
    venue,
    homeTeam->{
      name,
      logo{ asset->{ _id, url }, alt }
    },
    awayTeam->{
      name,
      logo{ asset->{ _id, url }, alt }
    }
  }`,
  homepagePastMatches: `*[_type == "match" && showOnHomepage == true && status == "past"] | order(date desc) {
    _id,
    date,
    venue,
    result,
    set1, set2, set3, hasSet4, set4, hasSet5, set5,
    homeTeam->{
      name,
      logo{ asset->{ _id, url }, alt }
    },
    awayTeam->{
      name,
      logo{ asset->{ _id, url }, alt }
    }
  }`,
  
  // Image assets by class
  imagesByClass: `*[_type == "imageAsset" && class == $class] {
    _id,
    title,
    url,
    r2Key,
    ownerRef->{name},
    tags
  }`,
  
  // Debug: All players with team info
  allPlayersWithTeams: `*[_type == "player" && isActive == true] {
    _id,
    name,
    teamTag->{
      _id,
      name,
      slug
    }
  }`,
  
  // Teams
  teams: `*[_type == "team" && isActive == true] | order(order asc) {
    _id,
    name,
    slug,
    description,
    ageGroup,
    level,
    achievements
  }`,
  
  teamBySlug: `*[_type == "team" && slug.current == $slug && isActive == true][0] {
    _id,
    name,
    slug,
    description,
    ageGroup,
    level,
    achievements
  }`,

  // Staff
  staff: `*[_type == "staff" && isActive == true] | order(order asc) {
    _id,
    name,
    role,
    bio,
    experience,
    certifications,
    photo{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,

  // Jerseys
  jerseys: `*[_type == "jersey"] | order(order asc) {
    _id,
    name,
    description,
    image1{
      asset->{
        _id,
        url
      },
      alt
    },
    image2{
      asset->{
        _id,
        url
      },
      alt
    },
    featured
  }`,

  // Hazırlık Grupları Resimleri
  hazirlikGrupuResimler: `*[_type == "hazirlikGrupuResim" && gallery == "hazirlik-gruplari"] | order(order asc) {
    _id,
    title,
    gallery,
    image{
      asset->{
        _id,
        url
      },
      alt
    }
  }`,
}
