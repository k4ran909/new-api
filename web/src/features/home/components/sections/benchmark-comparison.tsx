import { Link } from '@tanstack/react-router'
import { Check, X, Minus, Sparkles, ArrowRight, ShieldCheck, Zap } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface ComparisonRow {
  feature: string
  description: string
  tokenRouter: {
    status: 'yes' | 'highlight'
    text: string
  }
  directApi: {
    status: 'no' | 'partial' | 'yes'
    text: string
  }
  hyperscalers: {
    status: 'no' | 'partial' | 'yes'
    text: string
  }
}

const COMPARISON_ROWS: ComparisonRow[] = [
  {
    feature: 'First-Token Latency (TTFT)',
    description: 'Time to deliver the first token over global edge anycast network',
    tokenRouter: {
      status: 'highlight',
      text: '< 20ms (32 Global Edge POPs)',
    },
    directApi: {
      status: 'partial',
      text: '60ms – 150ms',
    },
    hyperscalers: {
      status: 'partial',
      text: '90ms – 240ms',
    },
  },
  {
    feature: 'Automated Sub-5ms Failover',
    description: 'Automatic traffic rerouting when an upstream provider experiences 429/500/504',
    tokenRouter: {
      status: 'yes',
      text: 'Instant zero-downtime multi-channel failover',
    },
    directApi: {
      status: 'no',
      text: 'Throws 504 / 429; user request fails',
    },
    hyperscalers: {
      status: 'partial',
      text: 'Requires manual multi-region infra architecture',
    },
  },
  {
    feature: 'Model Diversity in 1 Endpoint',
    description: 'Access DeepSeek, Claude, GPT, Gemini, Llama, and Qwen via 1 single key',
    tokenRouter: {
      status: 'yes',
      text: '100+ Models across 12 foundation providers',
    },
    directApi: {
      status: 'no',
      text: 'Single provider locked per contract',
    },
    hyperscalers: {
      status: 'partial',
      text: 'Limited subset; delayed model updates',
    },
  },
  {
    feature: 'OpenAI Drop-In Compatibility',
    description: 'Zero code changes needed; replace baseURL and API key only',
    tokenRouter: {
      status: 'yes',
      text: '100% Native Drop-In (Cursor, Claude Code, Python, TS)',
    },
    directApi: {
      status: 'partial',
      text: 'Each provider has custom parameters & SDKs',
    },
    hyperscalers: {
      status: 'no',
      text: 'Requires heavy proprietary AWS Boto3 / Azure SDKs',
    },
  },
  {
    feature: 'Unified Invoicing & Token Balances',
    description: 'One single balance and credit card across all foundation models',
    tokenRouter: {
      status: 'yes',
      text: '1 Shared Wallet for all 100+ LLMs',
    },
    directApi: {
      status: 'no',
      text: '6+ separate credit cards & invoicing portals',
    },
    hyperscalers: {
      status: 'partial',
      text: 'Complex monthly cloud enterprise billing',
    },
  },
  {
    feature: 'Cost Optimization & High Discounting',
    description: 'Blended cost savings and dynamic routing to the lowest latency provider',
    tokenRouter: {
      status: 'highlight',
      text: 'Up to 70% cheaper than direct provider rates',
    },
    directApi: {
      status: 'no',
      text: 'Full retail list price only',
    },
    hyperscalers: {
      status: 'no',
      text: 'Minimum monthly spend commits & surge pricing',
    },
  },
  {
    feature: 'Enterprise Zero-Retention SLA',
    description: 'Guarantee that prompts and completions are never stored or used for model training',
    tokenRouter: {
      status: 'yes',
      text: 'Zero-data retention guaranteed by SLA',
    },
    directApi: {
      status: 'partial',
      text: 'Subject to each vendor terms & training opt-outs',
    },
    hyperscalers: {
      status: 'yes',
      text: 'Enterprise privacy compliant',
    },
  },
]

export function BenchmarkComparison() {
  const { t } = useTranslation()

  return (
    <section className='relative z-10 py-20 md:py-28 overflow-hidden'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='flex flex-col items-center text-center mb-14'>
          <div className='inline-flex items-center gap-2 rounded-full bg-[#0086ff]/10 border border-[#0086ff]/25 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#0086ff] mb-4 shadow-2xs'>
            <Zap className='size-3.5' />
            <span>✦ ARCHITECTURAL BENCHMARK</span>
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
            Why Developers Switch to TokenRouter
          </h2>
          <p className='text-muted-foreground mt-3 text-sm sm:text-base max-w-2xl'>
            See how TokenRouter’s high-performance edge architecture outperforms direct provider connections and legacy cloud wrappers in speed, reliability, and cost.
          </p>
        </div>

        {/* Comparison Table Card */}
        <div className='rounded-3xl border border-border/80 bg-card shadow-lg overflow-hidden'>
          <div className='overflow-x-auto'>
            <table className='w-full text-left border-collapse min-w-[760px]'>
              <thead>
                <tr className='border-b border-border/70 bg-muted/40'>
                  <th className='p-5 sm:p-6 text-sm font-semibold text-foreground w-[36%]'>
                    Capability / Benchmark
                  </th>
                  {/* TokenRouter Column */}
                  <th className='p-5 sm:p-6 text-sm font-semibold text-[#0086ff] bg-[#0086ff]/5 border-x border-[#0086ff]/20 w-[30%]'>
                    <div className='flex items-center gap-2'>
                      <span>TokenRouter Gateway</span>
                      <span className='rounded-full bg-[#0086ff] text-white px-2 py-0.5 text-[10px] font-bold tracking-wide uppercase'>
                        Recommended
                      </span>
                    </div>
                  </th>
                  <th className='p-5 sm:p-6 text-sm font-medium text-muted-foreground w-[17%]'>
                    Direct Provider APIs
                  </th>
                  <th className='p-5 sm:p-6 text-sm font-medium text-muted-foreground w-[17%]'>
                    AWS Bedrock / Azure
                  </th>
                </tr>
              </thead>
              <tbody className='divide-y divide-border/60'>
                {COMPARISON_ROWS.map((row, idx) => (
                  <tr
                    key={idx}
                    className='hover:bg-muted/20 transition-colors'
                  >
                    {/* Capability column */}
                    <td className='p-5 sm:p-6'>
                      <div className='font-semibold text-sm text-foreground'>
                        {row.feature}
                      </div>
                      <div className='text-xs text-muted-foreground mt-0.5 leading-relaxed'>
                        {row.description}
                      </div>
                    </td>

                    {/* TokenRouter column (highlighted) */}
                    <td className='p-5 sm:p-6 bg-[#0086ff]/5 border-x border-[#0086ff]/20'>
                      <div className='flex items-start gap-2.5'>
                        <div className='size-5 rounded-full bg-[#0086ff]/15 flex items-center justify-center shrink-0 mt-0.5 text-[#0086ff]'>
                          <Check className='size-3.5 stroke-[3]' />
                        </div>
                        <span
                          className={cn(
                            'text-xs font-semibold leading-relaxed',
                            row.tokenRouter.status === 'highlight'
                              ? 'text-[#0086ff] font-bold'
                              : 'text-foreground'
                          )}
                        >
                          {row.tokenRouter.text}
                        </span>
                      </div>
                    </td>

                    {/* Direct API column */}
                    <td className='p-5 sm:p-6'>
                      <div className='flex items-start gap-2'>
                        {row.directApi.status === 'no' && (
                          <div className='size-4 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5'>
                            <X className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        {row.directApi.status === 'partial' && (
                          <div className='size-4 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5'>
                            <Minus className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        {row.directApi.status === 'yes' && (
                          <div className='size-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5'>
                            <Check className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        <span className='text-xs text-muted-foreground leading-relaxed'>
                          {row.directApi.text}
                        </span>
                      </div>
                    </td>

                    {/* Hyperscalers column */}
                    <td className='p-5 sm:p-6'>
                      <div className='flex items-start gap-2'>
                        {row.hyperscalers.status === 'no' && (
                          <div className='size-4 rounded-full bg-destructive/10 text-destructive flex items-center justify-center shrink-0 mt-0.5'>
                            <X className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        {row.hyperscalers.status === 'partial' && (
                          <div className='size-4 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0 mt-0.5'>
                            <Minus className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        {row.hyperscalers.status === 'yes' && (
                          <div className='size-4 rounded-full bg-emerald-500/10 text-emerald-600 flex items-center justify-center shrink-0 mt-0.5'>
                            <Check className='size-3 stroke-[2.5]' />
                          </div>
                        )}
                        <span className='text-xs text-muted-foreground leading-relaxed'>
                          {row.hyperscalers.text}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Bottom Callout Banner */}
          <div className='p-5 sm:p-6 bg-muted/30 border-t border-border/70 flex flex-col sm:flex-row items-center justify-between gap-4'>
            <div className='flex items-center gap-3 text-left'>
              <div className='size-10 rounded-full bg-[#0086ff]/10 flex items-center justify-center text-[#0086ff] shrink-0'>
                <ShieldCheck className='size-5' />
              </div>
              <div>
                <h4 className='text-sm font-semibold text-foreground'>
                  Ready to upgrade your AI infrastructure?
                </h4>
                <p className='text-xs text-muted-foreground mt-0.5'>
                  Swap your endpoint URL in 30 seconds with 100% backward compatibility.
                </p>
              </div>
            </div>

            <Link
              to='/sign-up'
              className='inline-flex items-center justify-center h-10 px-6 rounded-full bg-[#0086ff] hover:bg-[#0073e6] text-white text-xs font-semibold transition-all shadow-[0_4px_12px_rgba(0,134,255,0.3)] hover:shadow-[0_6px_16px_rgba(0,134,255,0.4)] hover:-translate-y-0.5 shrink-0'
            >
              <span>Get Started Free</span>
              <ArrowRight className='size-3.5 ml-1.5' />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
