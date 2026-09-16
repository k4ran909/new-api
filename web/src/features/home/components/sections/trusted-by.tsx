import { useTranslation } from 'react-i18next'

interface PartnerLogo {
  name: string
  label: string
  color?: string
}

const PARTNERS: PartnerLogo[] = [
  { name: 'Higgsfield', label: 'Higgsfield' },
  { name: 'Epsilla', label: 'Epsilla', color: '#9333ea' },
  { name: 'Clawith', label: 'Clawith' },
  { name: 'Topify', label: 'Topify', color: '#ea580c' },
  { name: 'Bake AI', label: 'Bake AI', color: '#d97706' },
  { name: 'Storyverse', label: 'STORYVERSE' },
  { name: 'MiroMind', label: 'MiroMind', color: '#0284c7' },
  { name: 'Fellou', label: 'Fellou', color: '#ec4899' },
  { name: 'FlowGPT', label: 'FlowGPT' },
  { name: 'WayC', label: 'WAYC', color: '#2563eb' },
  { name: 'Stanford', label: 'Stanford' },
  { name: 'BotLearn.ai', label: 'BotLearn.ai', color: '#dc2626' },
]

export function TrustedBy() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 py-16 md:py-24 border-y border-border/40 bg-muted/20'>
      <div className='mx-auto max-w-7xl px-6 text-center'>
        <h3 className='text-2xl md:text-3xl font-medium tracking-tight text-foreground mb-12'>
          {t('Trusted By')}
        </h3>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 items-center justify-items-center'>
          {PARTNERS.map((partner) => (
            <div
              key={partner.name}
              className='group flex items-center justify-center p-3 w-full max-w-[180px] h-14 rounded-xl border border-transparent hover:border-border/60 hover:bg-card/60 transition-all duration-200'
            >
              <div className='flex items-center gap-2 text-muted-foreground group-hover:text-foreground transition-colors'>
                {partner.color ? (
                  <span
                    className='size-2.5 rounded-full shrink-0'
                    style={{ backgroundColor: partner.color }}
                  />
                ) : (
                  <span className='size-2 rounded-sm bg-current shrink-0 opacity-40' />
                )}
                <span className='font-semibold text-sm md:text-base tracking-tight'>
                  {partner.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
