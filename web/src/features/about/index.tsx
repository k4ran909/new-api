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
import { useQuery } from '@tanstack/react-query'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { RichContent } from '@/components/rich-content'
import { AboutSection3 } from '@/components/ui/about-section'
import { Skeleton } from '@/components/ui/skeleton'
import { isHttpUrl, isLikelyHtml } from '@/lib/content-format'
import { requireServerSuccess } from '@/lib/server-error-message'

import { getAboutContent } from './api'

function ProjectAttributionFooter() {
  const { t } = useTranslation()
  const currentYear = new Date().getFullYear()

  return (
    <footer className='border-t border-border/40 bg-background/80 py-6 text-xs text-muted-foreground'>
      <div className='mx-auto max-w-[1240px] px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left'>
        <p>
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='font-semibold text-foreground hover:underline'
          >
            NewAPI
          </a>{' '}
          © {currentYear}{' '}
          <a
            href='https://github.com/QuantumNous'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground hover:underline'
          >
            QuantumNous
          </a>{' '}
          • {t('Based on')}{' '}
          <a
            href='https://github.com/songquanpeng/one-api'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground hover:underline'
          >
            One API
          </a>{' '}
          © 2023{' '}
          <a
            href='https://github.com/songquanpeng'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground hover:underline'
          >
            JustSong
          </a>
        </p>
        <p className='flex items-center gap-2'>
          <a
            href='https://github.com/QuantumNous/new-api/blob/main/LICENSE'
            target='_blank'
            rel='noopener noreferrer'
            className='hover:text-foreground hover:underline'
          >
            {t('AGPL v3.0 License')}
          </a>
          <span>•</span>
          <a
            href='https://github.com/QuantumNous/new-api'
            target='_blank'
            rel='noopener noreferrer'
            className='text-primary hover:underline'
          >
            {t('Repository')}
          </a>
        </p>
      </div>
    </footer>
  )
}

export function About() {
  const { t } = useTranslation()
  const { data, isLoading } = useQuery({
    queryKey: ['about-content'],
    queryFn: async () => requireServerSuccess(await getAboutContent()),
  })

  const rawContent = data?.data?.trim() ?? ''
  const hasContent = rawContent.length > 0
  const isUrl = hasContent && isHttpUrl(rawContent)
  const contentIsHtml = hasContent && isLikelyHtml(rawContent)

  if (isLoading) {
    return (
      <PublicLayout>
        <div className='mx-auto flex max-w-4xl flex-col gap-4 py-12'>
          <Skeleton className='h-8 w-[45%]' />
          <Skeleton className='h-4 w-full' />
          <Skeleton className='h-4 w-[90%]' />
          <Skeleton className='h-4 w-[80%]' />
        </div>
      </PublicLayout>
    )
  }

  if (!hasContent) {
    return (
      <PublicLayout showMainContainer={false}>
        <div className='relative min-h-[calc(100vh-3.5rem)] flex flex-col justify-between bg-background'>
          <div
            aria-hidden
            className='pointer-events-none absolute inset-x-0 top-0 h-[480px] opacity-25 dark:opacity-15'
            style={{
              background:
                'radial-gradient(ellipse 60% 40% at 50% 0%, oklch(0.72 0.18 250 / 60%) 0%, transparent 70%)',
              maskImage: 'linear-gradient(to bottom, black 40%, transparent 100%)',
              WebkitMaskImage:
                'linear-gradient(to bottom, black 40%, transparent 100%)',
            }}
          />
          <div className='relative mx-auto w-full max-w-[1240px] flex-1 px-4 pt-24 pb-10 sm:px-6 sm:pt-28 sm:pb-12 lg:px-8'>
            <AboutSection3 />
          </div>
          <ProjectAttributionFooter />
        </div>
      </PublicLayout>
    )
  }

  if (isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        <iframe
          src={rawContent}
          className='h-[calc(100vh-3.5rem)] w-full border-0'
          title={t('About')}
          sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts'
        />
      </PublicLayout>
    )
  }

  if (contentIsHtml) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode='html'
          htmlVariant='isolated'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </PublicLayout>
    )
  }

  return (
    <PublicLayout>
      <div className='mx-auto max-w-6xl px-4 py-8'>
        <RichContent
          mode='markdown'
          content={rawContent}
          className='prose-neutral dark:prose-invert max-w-none'
        />
      </div>
    </PublicLayout>
  )
}
