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

import { useCallback, useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'

import { PublicLayout } from '@/components/layout'
import { Footer } from '@/components/layout/components/footer'
import { RichContent } from '@/components/rich-content'
import { useTheme } from '@/context/theme-provider'
import { isLikelyHtml } from '@/lib/content-format'
import { useAuthStore } from '@/stores/auth-store'

import {
  Architecture,
  BenchmarkComparison,
  CodePreview,
  CostCalculator,
  CTA,
  Faq,
  Features,
  LivePlayground,
  TrustedBy,
} from './components'
import { VantageHero } from './components/vantage-hero'
import { useHomePageContent } from './hooks'

export function Home() {
  const { i18n, t } = useTranslation()
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const { resolvedTheme } = useTheme()
  const isAuthenticated = useAuthStore((state) => !!state.auth.user)
  const homeContent = useHomePageContent()

  const syncIframePreferences = useCallback(() => {
    try {
      iframeRef.current?.contentWindow?.postMessage(
        { themeMode: resolvedTheme },
        '*'
      )
      iframeRef.current?.contentWindow?.postMessage(
        { lang: i18n.language },
        '*'
      )
    } catch {
      // Cross-origin frames may reject access while navigating.
    }
  }, [i18n.language, resolvedTheme])

  useEffect(() => {
    if (homeContent.isUrl) {
      syncIframePreferences()
    }
  }, [homeContent.isUrl, syncIframePreferences])

  if (!homeContent.isLoaded) {
    return (
      <PublicLayout showMainContainer={false}>
        <main className='flex min-h-screen items-center justify-center'>
          <div className='text-muted-foreground' role='status'>
            {t('Loading...')}
          </div>
        </main>
      </PublicLayout>
    )
  }

  if (homeContent.content && homeContent.isUrl) {
    return (
      <PublicLayout showMainContainer={false}>
        {/*
          allow-top-navigation-by-user-activation: the custom home page URL is
          admin-configured (trusted); it lets target="_top" links navigate the
          top-level window on user click without granting same-origin access.
        */}
        <iframe
          ref={iframeRef}
          src={homeContent.content}
          className='h-screen w-full border-none'
          title={t('Custom Home Page')}
          sandbox='allow-forms allow-popups allow-popups-to-escape-sandbox allow-scripts allow-top-navigation-by-user-activation'
          onLoad={syncIframePreferences}
        />
      </PublicLayout>
    )
  }

  if (homeContent.content && isLikelyHtml(homeContent.content)) {
    return (
      <PublicLayout showMainContainer={false}>
        <RichContent
          mode='html'
          htmlVariant='isolated'
          content={homeContent.content}
          className='custom-home-content'
        />
      </PublicLayout>
    )
  }

  if (homeContent.content) {
    return (
      <PublicLayout>
        <div className='mx-auto max-w-6xl px-4 py-8'>
          <RichContent
            mode='markdown'
            content={homeContent.content}
            className='custom-home-content'
          />
        </div>
      </PublicLayout>
    )
  }

  return (
    <PublicLayout showMainContainer={false} headerProps={{ overlay: true }}>
      <main>
        <VantageHero isAuthenticated={isAuthenticated} />
        <TrustedBy />
        <Architecture isAuthenticated={isAuthenticated} />
        <LivePlayground isAuthenticated={isAuthenticated} />
        <CostCalculator />
        <BenchmarkComparison />
        <CodePreview />
        <Features />
        <Faq />
        <CTA isAuthenticated={isAuthenticated} />
      </main>
      <Footer />
    </PublicLayout>
  )
}
