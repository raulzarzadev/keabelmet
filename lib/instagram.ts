export interface InstagramPost {
  id: string
  mediaUrl: string
  thumbnailUrl?: string
  permalink: string
  caption?: string
  mediaType: "IMAGE" | "VIDEO" | "CAROUSEL_ALBUM"
  timestamp: string
}

const INSTAGRAM_API = "https://graph.instagram.com"

function isConfigured(): boolean {
  return !!(process.env.INSTAGRAM_ACCESS_TOKEN && process.env.INSTAGRAM_USER_ID)
}

export async function getInstagramPosts(limit: number = 12): Promise<InstagramPost[] | null> {
  if (!isConfigured()) return null

  try {
    const token = process.env.INSTAGRAM_ACCESS_TOKEN
    const userId = process.env.INSTAGRAM_USER_ID
    const fields = "id,media_url,thumbnail_url,permalink,caption,media_type,timestamp"
    const url = `${INSTAGRAM_API}/${userId}/media?fields=${fields}&limit=${limit}&access_token=${token}`

    const res = await fetch(url, { next: { revalidate: 3600 } })
    if (!res.ok) return null

    const json = await res.json()
    if (!json.data) return null

    return json.data.map((post: any) => ({
      id: post.id,
      mediaUrl: post.media_url,
      thumbnailUrl: post.thumbnail_url || undefined,
      permalink: post.permalink,
      caption: post.caption || undefined,
      mediaType: post.media_type,
      timestamp: post.timestamp,
    }))
  } catch {
    return null
  }
}

export async function refreshInstagramToken(): Promise<string | null> {
  const token = process.env.INSTAGRAM_ACCESS_TOKEN
  if (!token) return null

  try {
    const url = `${INSTAGRAM_API}/refresh_access_token?grant_type=ig_refresh_token&access_token=${token}`
    const res = await fetch(url)
    if (!res.ok) return null
    const json = await res.json()
    return json.access_token || null
  } catch {
    return null
  }
}
