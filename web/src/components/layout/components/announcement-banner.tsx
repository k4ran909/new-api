/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { Link } from '@tanstack/react-router'
import { ArrowRight, X } from 'lucide-react'
import { useState } from 'react'
import { useTranslation } from 'react-i18next'

import { Button } from '@/components/ui/button'
import { useAuthStore } from '@/stores/auth-store'

export function AnnouncementBanner() {
  const { t } = useTranslation()
  const [dismissed, setDismissed] = useState(false)
  const user = useAuthStore((state) => state.auth.user)

  if (dismissed) return null

  return (
    <div
      data-slot='announcement-banner'
      role='region'
      aria-label={t('Announcement')}
      className='bg-primary text-primary-foreground relative flex h-10 w-full items-center justify-center px-10 text-xs font-normal shadow-sm md:text-sm'
    >
      <div className='flex min-w-0 items-center gap-2 md:gap-3'>
        <span className='bg-primary-foreground/20 hidden shrink-0 items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold tracking-wider uppercase sm:inline-flex'>
          {t('Ends Sep 30')}
        </span>
        <span className='truncate font-medium'>
          <span aria-hidden='true'>🎉 </span>
          {t('Top up $8, get $2 free (20% off)')}
        </span>
        <Link
          to={user ? '/wallet' : '/sign-in'}
          className='hover:text-primary-foreground/85 ml-1 inline-flex shrink-0 items-center gap-1 font-medium underline underline-offset-2'
        >
          {t('Claim Now')}
          <ArrowRight className='size-3.5' aria-hidden='true' />
        </Link>
      </div>
      <Button
        type='button'
        variant='ghost'
        size='icon-sm'
        onClick={() => setDismissed(true)}
        aria-label={t('Dismiss announcement')}
        className='text-primary-foreground/80 hover:bg-primary-foreground/15 hover:text-primary-foreground dark:hover:bg-primary-foreground/15 absolute top-1/2 right-2 -translate-y-1/2'
      >
        <X className='size-3.5' aria-hidden='true' />
      </Button>
    </div>
  )
}
