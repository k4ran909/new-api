import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, X } from 'lucide-react'

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState(false)
  if (dismissed) return null

  return (
    <div className='relative z-50 flex h-10 w-full items-center justify-center bg-[#0086ff] px-4 text-xs md:text-sm font-normal text-white shadow-sm'>
      <div className='flex items-center gap-2 md:gap-3 truncate'>
        <span className='hidden sm:inline-flex items-center rounded-full bg-white/20 px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider text-white'>
          ENDS SEP 30
        </span>
        <span className='truncate font-medium'>
          🎉 Top up $8, get $2 free (20% off)
        </span>
        <Link
          to='/sign-in'
          className='inline-flex items-center gap-1 font-medium underline underline-offset-2 hover:text-white/90 shrink-0 ml-1'
        >
          Claim Now <ArrowRight className='size-3.5' />
        </Link>
      </div>
      <button
        type='button'
        onClick={() => setDismissed(true)}
        className='absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white p-1 rounded transition-colors'
        aria-label='Dismiss announcement'
      >
        <X className='size-3.5' />
      </button>
    </div>
  )
}
