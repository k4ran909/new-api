import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'

interface CTAProps {
  className?: string
  isAuthenticated?: boolean
}

export function CTA(_props: CTAProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandName = systemName || 'TokenRouter'

  return (
    <section className='relative z-10 py-24 md:py-32 text-center overflow-hidden border-t border-border/40'>
      <div className='mx-auto max-w-4xl px-6'>
        {/* Main Heading */}
        <h2 className='text-3xl sm:text-4xl md:text-[46px] font-medium tracking-tight text-foreground leading-tight'>
          {t('Ready to Roll {{brandName}} Out Across Your Org?', { brandName })}
        </h2>

        {/* Dual Button Group */}
        <div className='mt-10 flex flex-wrap items-center justify-center gap-4'>
          <Link
            to='/about'
            className='inline-flex items-center justify-center min-w-[170px] h-12 px-7 rounded-full bg-[#0086ff] hover:bg-[#006fd6] text-white font-medium text-base transition-all shadow-sm'
          >
            <span>{t('Talk to Sales')}</span>
            <ArrowRight className='size-4 ml-2' />
          </Link>

          <Link
            to='/sign-up'
            className='inline-flex items-center justify-center min-w-[130px] h-12 px-7 rounded-full border border-border/80 bg-card hover:bg-muted/40 text-foreground font-medium text-base transition-all shadow-2xs'
          >
            <span>{t('Start Free')}</span>
          </Link>
        </div>
      </div>
    </section>
  )
}
