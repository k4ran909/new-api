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
import { useTranslation } from 'react-i18next'

import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export interface AuthButtonsProps {
  /** `overlay` is for dark media backgrounds such as the landing hero video. */
  tone?: 'default' | 'overlay'
  /** Smaller buttons for tight mobile headers. */
  compact?: boolean
  className?: string
  /** Called when either link is activated (e.g. to close a mobile menu). */
  onNavigate?: () => void
}

/**
 * Shared "Sign in" / "Sign up" pair used by the public header and the landing page.
 * Rendered as real links (navigation), styled with the project button variants.
 */
export function AuthButtons(props: AuthButtonsProps) {
  const { t } = useTranslation()
  const isOverlay = props.tone === 'overlay'
  const size = props.compact ? 'sm' : 'lg'

  return (
    <div
      data-slot='auth-buttons'
      className={cn('flex items-center gap-2', props.className)}
    >
      <Link
        to='/sign-in'
        onClick={props.onNavigate}
        className={cn(
          buttonVariants({ variant: 'outline', size }),
          'rounded-full px-4 font-medium',
          isOverlay &&
            'border-white/30 bg-white/10 text-white backdrop-blur-md hover:bg-white/20 hover:text-white dark:border-white/30 dark:bg-white/10 dark:hover:bg-white/20'
        )}
      >
        {t('Sign in')}
      </Link>
      <Link
        to='/sign-up'
        onClick={props.onNavigate}
        className={cn(
          buttonVariants({ size }),
          'hover:bg-primary/85 rounded-full px-4 font-semibold shadow-sm'
        )}
      >
        {t('Sign up')}
      </Link>
    </div>
  )
}
