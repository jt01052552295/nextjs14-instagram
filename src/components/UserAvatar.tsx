import { Avatar } from '@/components/ui/avatar'
import type { AvatarProps } from '@radix-ui/react-avatar'
import type { User } from 'next-auth'
import Image from 'next/image'

type Props = Partial<AvatarProps> & {
  user: User | undefined
}

const UserAvatar = ({ user, ...avatarProps }: Props) => {
  return (
    <Avatar className="relative h-8 w-8" {...avatarProps}>
      <Image src={user?.image || '/next.svg'} fill sizes="100" alt={`${user?.name}'s profile picture`} className="rounded-full object-cover" />
    </Avatar>
  )
}

export default UserAvatar
