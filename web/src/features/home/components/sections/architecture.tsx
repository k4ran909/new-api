import { Link } from '@tanstack/react-router'
import { Sparkles, ArrowRight, User, Users, Cpu, Layers } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'

const PROVIDERS = [
  { name: 'OpenAI', icon: '✦', color: '#10a37f' },
  { name: 'Anthropic', icon: '✳', color: '#d97706' },
  { name: 'DeepSeek', icon: '⚡', color: '#2563eb' },
  { name: 'Google', icon: '◆', color: '#3b82f6' },
  { name: 'NVIDIA / Meta', icon: '▲', color: '#16a34a' },
]

const APPS = [
  { name: 'Cursor', label: 'Cursor' },
  { name: 'Claude Code', label: 'Claude Code' },
  { name: 'Windsurf', label: 'Windsurf' },
  { name: 'Cherry Studio', label: 'Cherry Studio' },
  { name: 'Custom Agents', label: 'Custom Agents' },
  { name: 'OpenCode', label: 'OpenCode' },
]

interface ArchitectureProps {
  isAuthenticated?: boolean
}

export function Architecture(props: ArchitectureProps) {
  const { isAuthenticated } = props
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandName = systemName || 'TokenRouter'

  return (
    <section className='relative z-10 py-20 md:py-28 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6 text-center'>
        {/* Category Pill Badge */}
        <div className='inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#0086ff] uppercase mb-4'>
          <Sparkles className='size-3.5' />
          <span>{t('ONE API LAYER')}</span>
        </div>

        {/* Section Heading */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-foreground leading-[1.15] max-w-4xl mx-auto'>
          {t('One API for Any AI App')}
        </h2>

        {/* Subtitle */}
        <p className='mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl mx-auto leading-relaxed'>
          {t(
            'Fully OpenAI-compatible, with one base URL and one API key to power Cursor, Claude Code, Windsurf, Cherry Studio, and autonomous agents — while managing all your token usage in one place.'
          )}
        </p>

        {/* Interactive Architecture Flow Diagram */}
        <div className='mt-14 max-w-5xl mx-auto p-6 md:p-10 rounded-2xl border border-border/80 bg-card/60 backdrop-blur-md shadow-md'>
          <div className='flex flex-col lg:flex-row items-center justify-between gap-8 md:gap-4'>
            {/* Left: Providers */}
            <div className='flex flex-row lg:flex-col gap-2.5 w-full lg:w-48 shrink-0 justify-center flex-wrap lg:flex-nowrap'>
              {PROVIDERS.map((p) => (
                <div
                  key={p.name}
                  className='flex items-center gap-2.5 px-3.5 py-2.5 rounded-xl border border-border/70 bg-card hover:border-[#0086ff]/50 transition-colors shadow-xs'
                >
                  <span
                    className='size-5 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0'
                    style={{ backgroundColor: p.color }}
                  >
                    {p.icon}
                  </span>
                  <span className='text-xs font-medium text-foreground truncate'>
                    {p.name}
                  </span>
                </div>
              ))}
            </div>

            {/* Dotted Flow Connector Left */}
            <div className='hidden lg:flex items-center justify-center flex-1'>
              <div className='w-full border-t-2 border-dashed border-[#0086ff]/40 relative'>
                <div className='absolute -right-1.5 -top-1.5 size-3 rounded-full bg-[#0086ff] animate-ping opacity-60' />
                <div className='absolute -right-1.5 -top-1.5 size-3 rounded-full bg-[#0086ff]' />
              </div>
            </div>

            {/* Center: TokenRouter Hub Node */}
            <div className='relative shrink-0 my-3 lg:my-0 group'>
              <div className='absolute -inset-3 rounded-full bg-[#0086ff]/25 blur-lg animate-pulse' />
              <div className='relative flex items-center gap-2.5 px-6 py-3.5 rounded-full bg-[#0086ff] text-white shadow-lg shadow-[#0086ff]/30 border border-white/25'>
                <div className='size-5 rounded-full bg-white text-[#0086ff] flex items-center justify-center font-bold text-xs shadow-2xs'>
                  ⚡
                </div>
                <span className='font-semibold text-sm tracking-tight'>
                  {brandName}
                </span>
                <span className='text-[10px] bg-white/20 px-2 py-0.5 rounded-full font-mono font-medium'>
                  Router
                </span>
              </div>
            </div>

            {/* Dotted Flow Connector Right */}
            <div className='hidden lg:flex items-center justify-center flex-1'>
              <div className='w-full border-t-2 border-dashed border-[#0086ff]/40 relative'>
                <div className='absolute -right-1.5 -top-1.5 size-3 rounded-full bg-[#0086ff] animate-ping opacity-60' />
                <div className='absolute -right-1.5 -top-1.5 size-3 rounded-full bg-[#0086ff]' />
              </div>
            </div>

            {/* Downstream Client Apps */}
            <div className='grid grid-cols-3 lg:grid-cols-2 gap-2 w-full lg:w-48 shrink-0'>
              {APPS.map((app) => (
                <div
                  key={app.name}
                  className='flex flex-col items-center justify-center p-2.5 rounded-xl border border-border/70 bg-card hover:border-[#0086ff]/50 transition-colors shadow-xs'
                >
                  <Cpu className='size-4 text-[#0086ff] mb-1' />
                  <span className='text-[11px] font-medium text-foreground truncate max-w-full'>
                    {app.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Dotted Connector to Users */}
            <div className='hidden lg:flex items-center justify-center px-2'>
              <div className='w-8 border-t-2 border-dashed border-border' />
            </div>

            {/* End Node: Users */}
            <div className='flex flex-col items-center justify-center px-4 py-3 rounded-xl border border-border/70 bg-card shrink-0 shadow-xs'>
              <Users className='size-5 text-[#0086ff] mb-1' />
              <span className='text-xs font-semibold text-foreground'>
                {t('Users')}
              </span>
            </div>
          </div>
        </div>

        {/* Section Action Button */}
        <div className='mt-8 flex justify-center'>
          <Link
            to={isAuthenticated ? '/tokens' : '/sign-up'}
            className='inline-flex items-center gap-2 h-11 px-8 rounded-full bg-[#0086ff] hover:bg-[#0073e6] text-white font-medium text-sm transition-all shadow-[0_4px_14px_rgba(0,134,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,134,255,0.45)] hover:-translate-y-0.5'
          >
            <span>{isAuthenticated ? t('View API Keys & Quota') : t('Claim Free Credits')}</span>
            <ArrowRight className='size-4' />
          </Link>
        </div>
      </div>
    </section>
  )
}
