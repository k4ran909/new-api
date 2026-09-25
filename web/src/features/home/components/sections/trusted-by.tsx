import { useTranslation } from 'react-i18next'

interface PartnerLogo {
  name: string
  label: string
  sub?: string
  color?: string
  symbol?: string
}

const PARTNERS: PartnerLogo[] = [
  { name: 'Cursor', label: 'Cursor', sub: 'IDE', color: '#3b82f6', symbol: '✦' },
  { name: 'Claude Code', label: 'Claude Code', sub: 'CLI', color: '#d97706', symbol: '✳' },
  { name: 'Cherry Studio', label: 'Cherry Studio', sub: 'Client', color: '#ec4899', symbol: '🍒' },
  { name: 'OpenCode', label: 'OpenCode', sub: 'Agent', color: '#10b981', symbol: '⚡' },
  { name: 'Epsilla', label: 'Epsilla', sub: 'Enterprise', color: '#9333ea', symbol: '◆' },
  { name: 'Higgsfield', label: 'Higgsfield', sub: 'Video AI', color: '#8b5cf6', symbol: '▲' },
  { name: 'Bake AI', label: 'Bake AI', sub: 'Infra', color: '#f59e0b', symbol: '◈' },
  { name: 'Storyverse', label: 'Storyverse', sub: 'Creative', color: '#06b6d4', symbol: '✦' },
  { name: 'MiroMind', label: 'MiroMind', sub: 'Analytics', color: '#0284c7', symbol: '●' },
  { name: 'FlowGPT', label: 'FlowGPT', sub: 'Community', color: '#10a37f', symbol: '❖' },
  { name: 'WayC', label: 'WayC', sub: 'Cloud', color: '#2563eb', symbol: '▲' },
  { name: 'Stanford', label: 'Stanford AI', sub: 'Research', color: '#dc2626', symbol: '★' },
]

export function TrustedBy() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 py-16 md:py-20 border-y border-border/40 bg-muted/20'>
      <div className='mx-auto max-w-7xl px-6 text-center'>
        <p className='text-xs font-semibold uppercase tracking-widest text-[#0086ff] mb-2'>
          {t('ECOSYSTEM & ADOPTION')}
        </p>
        <h3 className='text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-3'>
          {t('Trusted by Developers & Teams Scaling AI')}
        </h3>
        <p className='text-xs md:text-sm text-muted-foreground max-w-xl mx-auto mb-10'>
          {t('Powering high-concurrency routing, caching, and failover across modern AI stacks.')}
        </p>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-4 items-center justify-items-center'>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className='group flex items-center justify-between px-2.5 sm:px-3.5 py-2 sm:py-2.5 w-full h-12 sm:h-13 rounded-xl border border-border/60 bg-card/70 hover:border-[#0086ff]/50 hover:bg-card hover:shadow-xs transition-all duration-200'
            >
              <div className='flex items-center gap-2 min-w-0'>
                <span
                  className='size-5 sm:size-6 rounded-md flex items-center justify-center text-[10px] sm:text-xs font-bold text-white shrink-0 shadow-2xs'
                  style={{ backgroundColor: partner.color || '#64748b' }}
                >
                  {partner.symbol || '✦'}
                </span>
                <span className='font-semibold text-xs sm:text-sm text-foreground/90 group-hover:text-foreground tracking-tight truncate'>
                  {partner.label}
                </span>
              </div>
              {partner.sub && (
                <span className='hidden sm:inline-block text-[10px] font-mono text-muted-foreground/70 bg-muted px-1.5 py-0.5 rounded shrink-0 ml-1'>
                  {partner.sub}
                </span>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

