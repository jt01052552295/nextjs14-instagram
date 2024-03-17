'use client'

import { Clapperboard, Compass, Heart, Home, MessageCircle, PlusSquare, Search } from 'lucide-react'
import Link from 'next/link'
import { buttonVariants } from './ui/button'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

const links = [
  { name: 'Home', href: '/dashboard', icon: Home },
  {
    name: 'Search',
    href: '/dashboard/search',
    icon: Search,
    hideOnMobile: true,
    disabled: true,
  },
  { name: 'Explore', href: '/dashboard/explore', icon: Compass, disabled: true },
  {
    name: 'Reels',
    href: '/dashboard/reels',
    icon: Clapperboard,
    disabled: true,
  },
  {
    name: 'Messages',
    href: '/dashboard/messages',
    icon: MessageCircle,
    disabled: true,
  },
  {
    name: 'Notifications',
    href: '/dashboard/notifications',
    icon: Heart,
    hideOnMobile: true,
    disabled: true,
  },
  {
    name: 'Create',
    href: '/dashboard/create',
    icon: PlusSquare,
  },
]

const NavLinks = () => {
  const pathname = usePathname()

  return (
    <>
      {links.map((link) => {
        const LinkIcon = link.icon
        const isActive = pathname === link.href

        return (
          <Link
            key={link.name}
            href={link.disabled ? '#' : link.href}
            className={buttonVariants({
              variant: isActive ? 'secondary' : 'ghost',
              className: cn('navLink ', { 'hidden md:flex': link.hideOnMobile }, { 'opacity-50 cursor-not-allowed': link.disabled }),
              size: 'lg',
            })}
          >
            <LinkIcon className="w-6 " />
            <p
              className={`${cn('hidden lg:block', {
                'font-extrabold': isActive,
              })}`}
            >
              {link.name}
            </p>
          </Link>
        )
      })}
    </>
  )
}

export default NavLinks
