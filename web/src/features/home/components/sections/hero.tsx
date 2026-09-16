import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Sparkles,
  Copy,
  Check,
  CheckCircle2,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { Button } from '@/components/ui/button'
import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const LIVE_MODELS = [
  {
    id: 'wan3.0-video',
    name: 'wan3.0-video',
    desc: 'Wan · video generation model',
    icon: '✦',
    color: '#8b5cf6',
  },
  {
    id: 'deepseek-v4-pro',
    name: 'deepseek/deepseek-v4-pro-0813',
    desc: 'DeepSeek · reasoning model',
    icon: '⚡',
    color: '#3b82f6',
  },
  {
    id: 'nemotron-3.5',
    name: 'nvidia/nemotron-3.5-lightning',
    desc: 'Nemotron · foundation model',
    icon: '▲',
    color: '#10b981',
  },
  {
    id: 'gpt-5.6-sol',
    name: 'openai/gpt-5.6-sol',
    desc: 'GPT · frontier model',
    icon: '✳',
    color: '#14b8a6',
  },
  {
    id: 'claude-opus-5',
    name: 'anthropic/claude-opus-5-fast',
    desc: 'Claude · reasoning model',
    icon: '◈',
    color: '#f97316',
  },
]

export function Hero(props: HeroProps) {
  const { isAuthenticated } = props
  const { t } = useTranslation()
  const { status } = useStatus()
  const { systemName } = useSystemConfig()
  const brandName = systemName || 'TokenRouter'
  const docsUrl =
    (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const [copied, setCopied] = useState(false)

  const baseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/v1`
    }
    return 'https://api.tokenrouter.com/v1'
  }, [])

  const handleCopyEndpoint = async () => {
    try {
      await navigator.clipboard.writeText(baseUrl)
      setCopied(true)
      toast.success(t('Endpoint copied to clipboard'))
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('Failed to copy'))
    }
  }

  return (
    <section className='relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden'>
      {/* Subtle radial atmosphere glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 size-[650px] rounded-full bg-[#0086ff]/10 blur-[120px] -z-10'
      />

      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          {/* Left Column: Core Value Proposition */}
          <div className='lg:col-span-7 flex flex-col items-start text-left'>
            {/* Category Pill Badge */}
            <div className='inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/25 px-3 py-1 text-xs font-semibold tracking-wider text-[#0086ff] uppercase mb-4'>
              <Sparkles className='size-3.5' />
              <span>{brandName.toUpperCase()}</span>
            </div>

            {/* H1 Main Heading */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[64px] font-medium tracking-tight text-foreground leading-[1.12] mb-3'>
              One {brandName}
              <br />
              All Models
            </h1>

            {/* Subtitle */}
            <div className='flex items-center gap-2 text-lg sm:text-xl text-muted-foreground font-normal mb-6'>
              <span>Faster</span>
              <span>·</span>
              <span>Better</span>
              <span>·</span>
              <span>Cheaper</span>
            </div>

            {/* Instruction Label */}
            <p className='text-base sm:text-lg text-foreground/80 mb-3'>
              {t('Just switch your base URL.')}
            </p>

            {/* Interactive Endpoint Copy Box */}
            <div className='w-full max-w-lg flex items-center justify-between gap-3 p-1.5 pl-4 rounded-full border border-border/80 bg-card shadow-xs'>
              <div className='flex items-center gap-2.5 truncate'>
                <span className='size-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0' />
                <span className='font-mono text-xs sm:text-sm text-foreground/90 truncate select-all'>
                  {baseUrl}
                </span>
              </div>
              <button
                type='button'
                onClick={handleCopyEndpoint}
                className='inline-flex items-center gap-1.5 h-9 px-4 rounded-full border border-border/80 bg-background hover:bg-muted text-foreground text-xs font-medium shrink-0 transition-colors cursor-pointer'
              >
                {copied ? (
                  <>
                    <Check className='size-3.5 text-[#10b981]' />
                    <span>{t('Copied')}</span>
                  </>
                ) : (
                  <>
                    <Copy className='size-3.5 text-muted-foreground' />
                    <span>{t('Copy')}</span>
                  </>
                )}
              </button>
            </div>

            {/* Zero-retention Guarantee */}
            <div className='mt-4 flex flex-col sm:flex-row sm:items-center gap-1.5 text-xs sm:text-sm text-muted-foreground'>
              <div className='flex items-center gap-1.5'>
                <ShieldCheck className='size-4 text-[#0086ff] shrink-0' />
                <span>
                  {t('Inputs from you and outputs from AI are zero-retention!')}
                </span>
              </div>
              <Link
                to='/privacy-policy'
                className='text-[#0086ff] hover:underline font-medium sm:ml-1 inline-flex items-center'
              >
                {t('Checkout Our Policy')} ↗
              </Link>
            </div>

            {/* Hero CTA Button Group */}
            <div className='mt-8 flex flex-wrap items-center gap-3'>
              <Link
                to={isAuthenticated ? '/tokens' : '/sign-up'}
                className='inline-flex items-center justify-center h-11 px-6 rounded-full bg-[#0086ff] hover:bg-[#006fd6] text-white font-medium text-sm transition-all shadow-sm'
              >
                <span>{t('Get API Key')}</span>
                <ArrowRight className='size-4 ml-1.5' />
              </Link>

              <a
                href={docsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center h-11 px-6 rounded-full border border-border/80 bg-transparent hover:bg-muted/40 text-foreground font-medium text-sm transition-all'
              >
                <span>{t('Read Docs')}</span>
              </a>
            </div>

            {/* 3-Metric Trust Row */}
            <div className='mt-12 pt-8 border-t border-border/40 grid grid-cols-3 gap-6 sm:gap-10 w-full max-w-lg'>
              <div>
                <div className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                  99.9%
                </div>
                <div className='text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5'>
                  {t('UPTIME')}
                </div>
              </div>
              <div>
                <div className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                  Smart
                </div>
                <div className='text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5'>
                  {t('CACHING')}
                </div>
              </div>
              <div>
                <div className='text-2xl sm:text-3xl font-bold tracking-tight text-foreground'>
                  Always-On
                </div>
                <div className='text-[11px] sm:text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5'>
                  {t('ROUTING')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Real-Time Interactive Model Widget */}
          <div className='lg:col-span-5 flex justify-center lg:justify-end'>
            <div className='w-full max-w-md rounded-2xl border border-border/80 bg-card p-6 shadow-lg backdrop-blur-xs'>
              {/* Widget Header */}
              <div className='flex items-center justify-between pb-4 mb-4 border-b border-border/50'>
                <h3 className='text-base font-semibold text-foreground'>
                  {t('Unified Model Access')}
                </h3>
                <Link
                  to='/pricing'
                  className='inline-flex items-center gap-1 text-xs font-medium text-[#0086ff] hover:underline'
                >
                  <span>{t('View All Models')}</span>
                  <ChevronRight className='size-3.5' />
                </Link>
              </div>

              {/* Model Stack Items */}
              <div className='space-y-2.5'>
                {LIVE_MODELS.map((m) => (
                  <div
                    key={m.id}
                    className='group flex items-center justify-between p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-[#0086ff]/40 hover:bg-card transition-all cursor-default'
                  >
                    <div className='flex items-center gap-3 truncate'>
                      <div
                        className='size-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-xs'
                        style={{ backgroundColor: m.color }}
                      >
                        {m.icon}
                      </div>
                      <div className='truncate text-left'>
                        <div className='text-xs sm:text-sm font-semibold text-foreground truncate'>
                          {m.name}
                        </div>
                        <div className='text-[11px] text-muted-foreground truncate'>
                          {m.desc}
                        </div>
                      </div>
                    </div>
                    <span className='size-2 rounded-full bg-[#0086ff] animate-pulse shrink-0 ml-2' />
                  </div>
                ))}
              </div>

              {/* Widget Bottom Callout Box */}
              <div className='mt-4 p-3 rounded-lg bg-muted/40 border border-border/40 text-center text-xs text-muted-foreground leading-relaxed'>
                {t(
                  'Route once. Scale across models with better pricing, better stability, and simpler integration.'
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
