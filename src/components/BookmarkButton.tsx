'use client'

import { bookmarkPost } from '@/lib/actions'
import { PostWithExtras } from '@/lib/definitions'
import { cn } from '@/lib/utils'
import ActionIcon from '@/components/ActionIcon'
import { SavedPost } from '@prisma/client'
import { Bookmark } from 'lucide-react'
import { useOptimistic } from 'react'

type Props = {
  post: PostWithExtras
  userId?: string
}

const BookmarkButton = ({ post, userId }: Props) => {
  const predicate = (like: SavedPost) => like.userId === userId && like.postId === post.id

  const [optimisticBookmarks, addOptimisticBookmark] = useOptimistic<SavedPost[]>(
    post.savedBy,
    // @ts-ignore
    (state: SavedPost[], newBookmark: SavedPost) =>
      //   here we check if the bookmark already exists, if it does, we remove it, if it doesn't, we add it
      state.some(predicate) ? state.filter((bookmark) => bookmark.userId !== userId) : [...state, newBookmark]
  )

  async function onSubmit(formData: FormData) {
    const postId = formData.get('postId')
    addOptimisticBookmark({ postId, userId })
    await bookmarkPost(postId)
  }

  return (
    <form action={onSubmit} className="ml-auto">
      <input type="hidden" name="postId" value={post.id} />

      <ActionIcon>
        <Bookmark
          className={cn('h-6 w-6', {
            'dark:fill-white fill-black': optimisticBookmarks.some(predicate),
          })}
        />
      </ActionIcon>
    </form>
  )
}

export default BookmarkButton
