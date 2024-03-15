import { unstable_noStore as noStore } from 'next/cache'
import prisma from './prisma'

export async function fetchPosts() {
  // equivalent to doing fetch, cache: no-store
  noStore()

  try {
    const data = await prisma.post.findMany({
      include: {
        comments: {
          include: {
            user: true,
          },
          orderBy: {
            createdAt: 'desc',
          },
        },
        likes: {
          include: {
            user: true,
          },
        },
        savedBy: true,
        user: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch posts')
  }
}

export async function fetchProfile(username: string) {
  noStore()

  try {
    const data = await prisma.user.findUnique({
      where: {
        username,
      },
      include: {
        posts: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        saved: {
          orderBy: {
            createdAt: 'desc',
          },
        },
        followedBy: {
          include: {
            follower: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
        following: {
          include: {
            following: {
              include: {
                following: true,
                followedBy: true,
              },
            },
          },
        },
      },
    })

    return data
  } catch (error) {
    console.error('Database Error:', error)
    throw new Error('Failed to fetch profile')
  }
}
