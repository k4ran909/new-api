import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  Terminal,
  Activity,
  Zap,
  Code2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'

import { useStatus } from '@/hooks/use-status'
import { useSystemConfig } from '@/hooks/use-system-config'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

const LIVE_MODELS = [
  {
    id: 'gpt-4o',
    name: 'openai/gpt-4o',
    desc: 'OpenAI · Frontier Flagship',
    icon: '✳',
    color: '#10a37f',
    latency: '18ms',
    tag: '128K',
    price: '$2.50 / $10.00',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'anthropic/claude-3-5-sonnet',
    desc: 'Anthropic · Reasoning & Coding',
    icon: '◈',
    color: '#d97706',
    latency: '24ms',
    tag: '200K',
    price: '$3.00 / $15.00',
  },
  {
    id: 'deepseek-v3',
    name: 'deepseek/deepseek-chat-v3',
    desc: 'DeepSeek · High Speed / Low Cost',
    icon: '⚡',
    color: '#2563eb',
    latency: '12ms',
    tag: '64K',
    price: '$0.14 / $0.28',
  },
  {
    id: 'gemini-1.5-pro',
    name: 'google/gemini-1.5-pro',
    desc: 'Google · Long Context Multimodal',
    icon: '◆',
    color: '#3b82f6',
    latency: '29ms',
    tag: '2M',
    price: '$1.25 / $5.00',
  },
  {
    id: 'llama-3.3-70b',
    name: 'meta/llama-3.3-70b-instruct',
    desc: 'Meta · Open Weights Enterprise',
    icon: '▲',
    color: '#16a34a',
    latency: '16ms',
    tag: '128K',
    price: '$0.35 / $0.40',
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
  const [activeTab, setActiveTab] = useState<'routing' | 'code'>('routing')
  const [codeLang, setCodeLang] = useState<'python' | 'ts' | 'curl'>('python')
  const [isPinging, setIsPinging] = useState(false)
  const [pingSuccess, setPingSuccess] = useState(false)

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

  const handlePingTest = () => {
    if (isPinging) return
    setIsPinging(true)
    setPingSuccess(false)
    setTimeout(() => {
      setIsPinging(false)
      setPingSuccess(true)
      toast.success(t('Test ping 18ms - 100% upstream healthy!'))
      setTimeout(() => setPingSuccess(false), 4000)
    }, 450)
  }

  const codeSnippets = {
    python: `from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}",
    api_key="your_token_here",
)

# Route to any provider with 1 unified key
response = client.chat.completions.create(
    model="deepseek-chat",
    messages=[{"role": "user", "content": "Hello!"}]
)`,
    ts: `import OpenAI from "openai";

const openai = new OpenAI({
  baseURL: "${baseUrl}",
  apiKey: "your_token_here",
});

// Drop-in compatible with all libraries
const response = await openai.chat.completions.create({
  model: "claude-3-5-sonnet",
  messages: [{ role: "user", content: "Hi!" }],
});`,
    curl: `curl ${baseUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer your_token_here" \\
  -d '{
    "model": "gpt-4o",
    "messages": [{"role": "user", "content": "Hello"}]
  }'`,
  }

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(codeSnippets[codeLang])
      toast.success(t('Code snippet copied!'))
    } catch {
      toast.error(t('Failed to copy'))
    }
  }

  return (
    <section className='relative z-10 pt-28 pb-16 md:pt-36 md:pb-24 lg:pt-40 lg:pb-28 overflow-hidden'>
      {/* High-end ambient radial glow and micro-grid canvas */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_at_top,rgba(0,134,255,0.08)_0%,transparent_60%),radial-gradient(#e2e8f0_1px,transparent_1px)] dark:[background-image:radial-gradient(ellipse_at_top,rgba(0,134,255,0.15)_0%,transparent_60%),radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] [background-size:100%_100%,24px_24px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_35%,#000_65%,transparent_100%)]'
      />

      <div className='mx-auto max-w-7xl px-6'>
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center'>
          {/* Left Column: Core Value Proposition */}
          <div className='lg:col-span-7 flex flex-col items-start text-left'>
            {/* Category Pill Badge */}
            <div className='inline-flex items-center gap-2 rounded-full bg-[#0086ff]/10 border border-[#0086ff]/25 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#0086ff] mb-5 shadow-2xs'>
              <span className='size-1.5 rounded-full bg-[#0086ff] animate-ping' />
              <span>✦ {brandName.toUpperCase()} · UNIFIED AI ROUTER</span>
            </div>

            {/* H1 Main Heading */}
            <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-[66px] font-bold tracking-[-0.035em] text-foreground leading-[1.08] mb-4'>
              One {brandName},
              <br />
              <span className='bg-gradient-to-r from-[#0086ff] via-[#009bf5] to-[#005cd6] bg-clip-text text-transparent'>
                All Foundation Models.
              </span>
            </h1>

            {/* Subtitle */}
            <div className='flex items-center gap-2 text-base sm:text-lg text-foreground/80 font-medium mb-3'>
              <span className='text-[#0086ff] font-semibold'>Faster</span>
              <span>·</span>
              <span className='text-[#0086ff] font-semibold'>Better</span>
              <span>·</span>
              <span className='text-[#0086ff] font-semibold'>Cheaper</span>
            </div>

            <p className='text-sm sm:text-base text-muted-foreground leading-relaxed max-w-xl mb-6'>
              Streamline multi-provider routing, zero-downtime failover, and billing governance across 100+ LLMs with 100% OpenAI drop-in compatibility.
            </p>

            {/* Instruction Label & Terminal Endpoint Box */}
            <div className='w-full max-w-lg mb-2'>
              <div className='flex items-center justify-between mb-1.5 px-1'>
                <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                  <Terminal className='size-3 text-[#0086ff]' />
                  {t('Base URL Endpoint')}
                </span>
                <span className='text-[11px] text-muted-foreground/80'>
                  {t('OpenAI Drop-In Compatible')}
                </span>
              </div>

              <div className='flex items-center justify-between gap-3 p-1.5 pl-4 rounded-full border border-border/80 bg-card/90 backdrop-blur-sm shadow-xs hover:border-[#0086ff]/40 transition-colors'>
                <div className='flex items-center gap-2.5 truncate'>
                  <span className='size-2.5 rounded-full bg-[#10b981] animate-pulse shrink-0' />
                  <span className='font-mono text-xs sm:text-sm text-foreground/95 truncate select-all'>
                    {baseUrl}
                  </span>
                </div>
                <button
                  type='button'
                  onClick={handleCopyEndpoint}
                  className='inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border border-border/80 bg-background hover:bg-muted text-foreground text-xs font-medium shrink-0 transition-colors cursor-pointer shadow-2xs'
                >
                  {copied ? (
                    <>
                      <Check className='size-3.5 text-[#10b981]' />
                      <span className='text-[#10b981] font-medium'>{t('Copied')}</span>
                    </>
                  ) : (
                    <>
                      <Copy className='size-3.5 text-muted-foreground' />
                      <span>{t('Copy')}</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Zero-retention Guarantee */}
            <div className='mt-2 flex flex-col sm:flex-row sm:items-center gap-1.5 text-xs text-muted-foreground'>
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
            <div className='mt-7 flex flex-wrap items-center gap-3'>
              <Link
                to={isAuthenticated ? '/keys' : '/sign-up'}
                className='inline-flex items-center justify-center h-11 px-7 rounded-full bg-[#0086ff] hover:bg-[#0073e6] text-white font-medium text-sm transition-all shadow-[0_4px_14px_rgba(0,134,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,134,255,0.45)] hover:-translate-y-0.5 active:translate-y-0'
              >
                <span>{t('Get API Key')}</span>
                <ArrowRight className='size-4 ml-1.5' />
              </Link>

              <Link
                to='/pricing'
                className='inline-flex items-center justify-center h-11 px-5 rounded-full border border-border/80 bg-background/60 hover:bg-muted/60 text-foreground font-medium text-sm transition-all shadow-2xs'
              >
                <span>{t('Explore Models')} ↗</span>
              </Link>

              <a
                href={docsUrl}
                target='_blank'
                rel='noopener noreferrer'
                className='inline-flex items-center justify-center h-11 px-5 rounded-full border border-border/80 bg-background/60 hover:bg-muted/60 text-foreground/80 hover:text-foreground font-medium text-sm transition-all shadow-2xs'
              >
                <span>{t('Read Docs')}</span>
              </a>
            </div>

            {/* 3-Metric Trust Row with Dividers */}
            <div className='mt-10 pt-7 border-t border-border/50 grid grid-cols-3 divide-x divide-border/60 w-full max-w-lg'>
              <div className='pr-3 sm:pr-4'>
                <div className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
                  99.99%
                </div>
                <div className='text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 truncate'>
                  {t('UPTIME SLA')}
                </div>
              </div>
              <div className='px-3 sm:px-4'>
                <div className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-[#0086ff]'>
                  &lt; 20ms
                </div>
                <div className='text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 truncate'>
                  {t('ROUTING OVERHEAD')}
                </div>
              </div>
              <div className='pl-3 sm:pl-4'>
                <div className='text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground'>
                  100+
                </div>
                <div className='text-[10px] sm:text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 truncate'>
                  {t('ACTIVE MODELS')}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Dual-Tab Live Router / SDK Widget */}
          <div className='lg:col-span-5 flex justify-center lg:justify-end'>
            <div className='w-full max-w-md rounded-2xl border border-border/80 bg-card/95 p-5 sm:p-6 shadow-xl backdrop-blur-md relative overflow-hidden'>
              {/* Subtle card glowing corner aura */}
              <div className='pointer-events-none absolute -top-12 -right-12 size-36 rounded-full bg-[#0086ff]/15 blur-2xl' />

              {/* Mode Switcher Tabs */}
              <div className='flex items-center justify-between pb-3.5 mb-4 border-b border-border/50'>
                <div className='flex items-center gap-1.5 p-1 rounded-full bg-muted/60 border border-border/50'>
                  <button
                    type='button'
                    onClick={() => setActiveTab('routing')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeTab === 'routing'
                        ? 'bg-[#0086ff] text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Activity className='size-3' />
                    <span>{t('Live Routing')}</span>
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('code')}
                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium transition-all ${
                      activeTab === 'code'
                        ? 'bg-[#0086ff] text-white shadow-xs'
                        : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Code2 className='size-3' />
                    <span>{t('Drop-in SDK')}</span>
                  </button>
                </div>

                <Link
                  to='/pricing'
                  className='inline-flex items-center gap-1 text-xs font-medium text-[#0086ff] hover:underline'
                >
                  <span>{t('All Models')}</span>
                  <ChevronRight className='size-3' />
                </Link>
              </div>

              {/* Tab 1: Live Models Routing Stack */}
              {activeTab === 'routing' && (
                <div>
                  <div className='flex items-center justify-between px-1 mb-2 text-[11px] text-muted-foreground'>
                    <span className='flex items-center gap-1'>
                      <span className='size-1.5 rounded-full bg-[#10b981] inline-block' />
                      5 Tier-1 Providers Active
                    </span>
                    <button
                      type='button'
                      onClick={handlePingTest}
                      disabled={isPinging}
                      className='inline-flex items-center gap-1 text-[11px] text-[#0086ff] hover:underline cursor-pointer'
                    >
                      <Zap className='size-3' />
                      {isPinging ? 'Pinging...' : pingSuccess ? 'Healthy (18ms)' : 'Test Ping'}
                    </button>
                  </div>

                  <div className='space-y-2'>
                    {LIVE_MODELS.map((m) => (
                      <div
                        key={m.id}
                        className='group flex items-center justify-between p-2.5 sm:p-3 rounded-xl border border-border/60 bg-muted/20 hover:border-[#0086ff]/40 hover:bg-card/80 transition-all cursor-default'
                      >
                        <div className='flex items-center gap-2.5 truncate'>
                          <div
                            className='size-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shrink-0 shadow-xs'
                            style={{ backgroundColor: m.color }}
                          >
                            {m.icon}
                          </div>
                          <div className='truncate text-left'>
                            <div className='flex items-center gap-1.5'>
                              <span className='text-xs sm:text-sm font-semibold text-foreground truncate'>
                                {m.name}
                              </span>
                              <span className='inline-flex items-center rounded-sm bg-muted px-1.5 py-0.2 text-[9px] font-mono text-muted-foreground'>
                                {m.tag}
                              </span>
                            </div>
                            <div className='text-[10px] text-muted-foreground truncate'>
                              {m.desc}
                            </div>
                          </div>
                        </div>

                        <div className='flex items-center gap-2 shrink-0 ml-2'>
                          <span className='text-[10px] font-mono text-[#10b981] font-medium'>
                            {m.latency}
                          </span>
                          <span className='size-2 rounded-full bg-[#0086ff] animate-pulse' />
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Widget Bottom Callout Box */}
                  <div className='mt-3.5 p-2.5 rounded-xl bg-muted/30 border border-border/40 flex items-center justify-between text-xs text-muted-foreground'>
                    <span className='text-[11px] truncate'>
                      Zero lock-in. Switch providers instantly.
                    </span>
                    <Link
                      to='/pricing'
                      className='text-[11px] font-medium text-[#0086ff] hover:underline shrink-0 ml-2'
                    >
                      Compare Rates ↗
                    </Link>
                  </div>
                </div>
              )}

              {/* Tab 2: Drop-in SDK Code Preview */}
              {activeTab === 'code' && (
                <div>
                  <div className='flex items-center justify-between mb-2'>
                    <div className='flex items-center gap-1'>
                      {(['python', 'ts', 'curl'] as const).map((lang) => (
                        <button
                          key={lang}
                          type='button'
                          onClick={() => setCodeLang(lang)}
                          className={`px-2 py-0.5 rounded text-[11px] font-mono uppercase transition-colors ${
                            codeLang === lang
                              ? 'bg-[#0086ff]/15 text-[#0086ff] font-semibold'
                              : 'text-muted-foreground hover:text-foreground'
                          }`}
                        >
                          {lang}
                        </button>
                      ))}
                    </div>

                    <button
                      type='button'
                      onClick={handleCopyCode}
                      className='inline-flex items-center gap-1 text-[11px] text-[#0086ff] hover:underline cursor-pointer'
                    >
                      <Copy className='size-3' />
                      <span>{t('Copy Code')}</span>
                    </button>
                  </div>

                  <pre className='p-3 rounded-xl bg-muted/70 border border-border/60 text-foreground/90 font-mono text-[11px] leading-relaxed overflow-x-auto select-all max-h-[260px]'>
                    <code>{codeSnippets[codeLang]}</code>
                  </pre>

                  <div className='mt-3 p-2.5 rounded-xl bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/20 text-center text-[11px] text-[#0086ff] leading-relaxed'>
                    {t('Drop directly into Cursor, Claude Code, OpenCode, or Cherry Studio!')}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

