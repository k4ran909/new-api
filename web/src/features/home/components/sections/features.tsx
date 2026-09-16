import {
  Sparkles,
  Receipt,
  Users,
  GitFork,
  BarChart3,
  FileCheck2,
  Globe2,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { Link } from '@tanstack/react-router'

interface FeaturesProps {
  className?: string
}

export function Features(_props: FeaturesProps) {
  const { t } = useTranslation()

  const ENTERPRISE_CARDS = [
    {
      id: 'billing',
      icon: <Receipt className='size-5 text-[#0086ff]' />,
      title: t('Centralized Billing and Admin Control'),
      desc: t(
        'Run all company usage under one organization account with unified billing, unified permissions, and no more individual recharge or reimbursement workflows.'
      ),
      tags: [t('Unified Billing'), t('Org Admin'), t('No Reimbursement')],
    },
    {
      id: 'quota',
      icon: <Users className='size-5 text-[#0086ff]' />,
      title: t('Granular Quota by Member or Department'),
      desc: t(
        'Set, adjust, and monitor quota at different levels. Allocate usage budgets in real time by user, by team, or by department as business needs change.'
      ),
      tags: [t('Quota Control'), t('Per Team'), t('Real-Time Allocation')],
    },
    {
      id: 'failover',
      icon: <GitFork className='size-5 text-[#0086ff]' />,
      title: t('Always-On Routing with Multi-Channel Failover'),
      desc: t(
        'Combines multiple upstream providers with owned inference capacity, enabling automatic failover when one route degrades or becomes unavailable.'
      ),
      tags: [t('Failover'), t('Multi-Upstream'), t('High Availability')],
    },
    {
      id: 'analytics',
      icon: <BarChart3 className='size-5 text-[#0086ff]' />,
      title: t('Organization-Wide Analytics and Usage Insights'),
      desc: t(
        'Track activity, cost, and usage trends across the company. Analyze adoption by model, by member, and by time period with clear multi-dimensional dashboards.'
      ),
      tags: [t('Usage Trends'), t('Model Analytics'), t('Team Activity')],
    },
    {
      id: 'audit',
      icon: <FileCheck2 className='size-5 text-[#0086ff]' />,
      title: t('Audit-Ready Logs and Full Traceability'),
      desc: t(
        'Every request, token spend, and access record can be traced back to the user and model involved, supporting internal governance, review, and operational auditing.'
      ),
      tags: [t('Audit Logs'), t('Cost Traceability'), t('Access Records')],
    },
    {
      id: 'delivery',
      icon: <Globe2 className='size-5 text-[#0086ff]' />,
      title: t('Global Delivery for High Concurrency and Low Latency'),
      desc: t(
        'Global service nodes and close collaboration with model providers help deliver stable capacity, better concurrency handling, and lower-latency access across regions.'
      ),
      tags: [t('Global Nodes'), t('Low Latency'), t('High Concurrency')],
    },
  ]

  return (
    <section className='relative z-10 py-20 md:py-28 bg-card/30'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Category Pill Badge */}
        <div className='flex justify-start mb-4'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#0086ff] uppercase'>
            <Sparkles className='size-3.5' />
            <span>{t('ENTERPRISE-READY')}</span>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[60px] font-medium tracking-tight text-foreground leading-[1.12] max-w-3xl'>
          {t('Simple to Start, Powerful at Enterprise Scale')}
        </h2>

        {/* Subtitle & Sales Link */}
        <p className='mt-4 text-base sm:text-lg text-muted-foreground max-w-3xl leading-relaxed'>
          {t(
            'Start with simple model access. Add centralized billing, granular quota controls, audit-ready logs, and organization-wide visibility as your usage grows.'
          )}{' '}
          <Link to='/about' className='text-[#0086ff] hover:underline font-medium inline-block'>
            {t('Already at scale? Talk to sales.')}
          </Link>
        </p>

        {/* 6 Enterprise Cards Grid */}
        <div className='mt-14 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          {ENTERPRISE_CARDS.map((card) => (
            <div
              key={card.id}
              className='group flex flex-col justify-between p-7 md:p-8 rounded-2xl border border-border/80 bg-card hover:border-[#0086ff]/40 transition-all duration-200 shadow-xs hover:shadow-sm'
            >
              <div>
                {/* Icon Badge */}
                <div className='size-11 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 flex items-center justify-center mb-6 shadow-2xs'>
                  {card.icon}
                </div>

                {/* Card Title */}
                <h3 className='text-lg md:text-xl font-semibold text-foreground tracking-tight mb-3'>
                  {card.title}
                </h3>

                {/* Card Description */}
                <p className='text-sm md:text-[15px] text-muted-foreground leading-relaxed'>
                  {card.desc}
                </p>
              </div>

              {/* Pill Tags Row */}
              <div className='mt-8 flex flex-wrap gap-2 pt-4 border-t border-border/40'>
                {card.tags.map((tag) => (
                  <span
                    key={tag}
                    className='inline-flex items-center rounded-full bg-muted/60 dark:bg-muted/40 border border-border/50 px-2.5 py-1 text-[11px] font-medium text-muted-foreground'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
