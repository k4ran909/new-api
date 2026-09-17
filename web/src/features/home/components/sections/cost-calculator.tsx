import { useState, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import { Calculator, ArrowRight, DollarSign, TrendingDown, Percent, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { cn } from '@/lib/utils'

interface PricingModelConfig {
  id: string
  name: string
  provider: string
  directInputRate: number // per 1M tokens
  directOutputRate: number // per 1M tokens
  routerInputRate: number // per 1M tokens
  routerOutputRate: number // per 1M tokens
}

const CALCULATOR_MODELS: PricingModelConfig[] = [
  {
    id: 'deepseek-v3',
    name: 'DeepSeek V3 (MoE)',
    provider: 'DeepSeek',
    directInputRate: 0.27,
    directOutputRate: 1.1,
    routerInputRate: 0.14,
    routerOutputRate: 0.28,
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o Frontier',
    provider: 'OpenAI',
    directInputRate: 2.5,
    directOutputRate: 10.0,
    routerInputRate: 1.85,
    routerOutputRate: 7.4,
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    directInputRate: 3.0,
    directOutputRate: 15.0,
    routerInputRate: 2.2,
    routerOutputRate: 11.5,
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    directInputRate: 0.15,
    directOutputRate: 0.6,
    routerInputRate: 0.1,
    routerOutputRate: 0.4,
  },
]

export function CostCalculator() {
  const { t } = useTranslation()
  const [selectedModelId, setSelectedModelId] = useState('deepseek-v3')
  const [inputTokensM, setInputTokensM] = useState(50) // in Millions
  const [outputTokensM, setOutputTokensM] = useState(25) // in Millions

  const model = useMemo(() => {
    return (
      CALCULATOR_MODELS.find((m) => m.id === selectedModelId) ||
      CALCULATOR_MODELS[0]
    )
  }, [selectedModelId])

  const { directCost, routerCost, savingsAmount, savingsPercentage } =
    useMemo(() => {
      const direct =
        inputTokensM * model.directInputRate +
        outputTokensM * model.directOutputRate
      const router =
        inputTokensM * model.routerInputRate +
        outputTokensM * model.routerOutputRate
      const savings = Math.max(0, direct - router)
      const percent = direct > 0 ? (savings / direct) * 100 : 0

      return {
        directCost: direct.toFixed(2),
        routerCost: router.toFixed(2),
        savingsAmount: savings.toFixed(2),
        savingsPercentage: percent.toFixed(1),
      }
    }, [inputTokensM, outputTokensM, model])

  return (
    <section className='relative z-10 py-20 md:py-28 overflow-hidden bg-muted/30 border-t border-border/60'>
      <div className='mx-auto max-w-7xl px-6'>
        {/* Header */}
        <div className='flex flex-col items-center text-center mb-14'>
          <div className='inline-flex items-center gap-2 rounded-full bg-[#0086ff]/10 border border-[#0086ff]/25 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#0086ff] mb-4 shadow-2xs'>
            <Calculator className='size-3.5' />
            <span>✦ ROI & SAVINGS ESTIMATOR</span>
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
            Calculate Your Monthly Savings
          </h2>
          <p className='text-muted-foreground mt-3 text-sm sm:text-base max-w-2xl'>
            See immediate infrastructure return-on-investment by routing your traffic through TokenRouter’s high-efficiency smart-route gateway.
          </p>
        </div>

        {/* Interactive Calculator Container */}
        <div className='grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto'>
          {/* Controls Column (7 cols) */}
          <div className='lg:col-span-7 rounded-3xl border border-border/80 bg-card p-6 sm:p-8 shadow-lg flex flex-col justify-between'>
            <div>
              {/* Model Choice */}
              <div className='mb-6'>
                <label className='block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2.5'>
                  Select Foundation Model
                </label>
                <div className='grid grid-cols-2 sm:grid-cols-4 gap-2'>
                  {CALCULATOR_MODELS.map((m) => {
                    const isSelected = m.id === selectedModelId
                    return (
                      <button
                        key={m.id}
                        type='button'
                        onClick={() => setSelectedModelId(m.id)}
                        className={cn(
                          'p-2.5 rounded-2xl border text-left transition-all cursor-pointer',
                          isSelected
                            ? 'border-[#0086ff] bg-[#0086ff]/10 text-[#0086ff] font-semibold ring-1 ring-[#0086ff]/30 shadow-xs'
                            : 'border-border/80 bg-muted/40 hover:bg-muted text-foreground/80'
                        )}
                      >
                        <div className='text-xs font-bold truncate'>{m.name}</div>
                        <div className='text-[10px] text-muted-foreground mt-0.5 truncate'>
                          {m.provider}
                        </div>
                      </button>
                    )
                  })}
                </div>
              </div>

              {/* Slider 1: Monthly Input Tokens */}
              <div className='mb-6'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Monthly Input Tokens
                  </span>
                  <span className='font-mono text-sm font-bold text-[#0086ff]'>
                    {inputTokensM} Million Tokens
                  </span>
                </div>
                <input
                  type='range'
                  min='1'
                  max='500'
                  step='1'
                  value={inputTokensM}
                  onChange={(e) => setInputTokensM(Number(e.target.value))}
                  className='w-full accent-[#0086ff] h-2 bg-muted rounded-lg cursor-pointer'
                />
                <div className='flex justify-between text-[11px] text-muted-foreground mt-1'>
                  <span>1M</span>
                  <span>100M</span>
                  <span>250M</span>
                  <span>500M</span>
                </div>
              </div>

              {/* Slider 2: Monthly Output Tokens */}
              <div className='mb-4'>
                <div className='flex items-center justify-between mb-2'>
                  <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                    Monthly Output Tokens
                  </span>
                  <span className='font-mono text-sm font-bold text-[#0086ff]'>
                    {outputTokensM} Million Tokens
                  </span>
                </div>
                <input
                  type='range'
                  min='1'
                  max='250'
                  step='1'
                  value={outputTokensM}
                  onChange={(e) => setOutputTokensM(Number(e.target.value))}
                  className='w-full accent-[#0086ff] h-2 bg-muted rounded-lg cursor-pointer'
                />
                <div className='flex justify-between text-[11px] text-muted-foreground mt-1'>
                  <span>1M</span>
                  <span>50M</span>
                  <span>125M</span>
                  <span>250M</span>
                </div>
              </div>
            </div>

            {/* Hint footnote */}
            <div className='pt-4 border-t border-border/60 text-xs text-muted-foreground'>
              <span>* Pricing estimates include token cache hits and dynamic failover optimization.</span>
            </div>
          </div>

          {/* Results Column (5 cols) */}
          <div className='lg:col-span-5 rounded-3xl border border-[#0086ff]/30 bg-gradient-to-br from-card via-card to-[#0086ff]/5 p-6 sm:p-8 shadow-xl flex flex-col justify-between relative overflow-hidden'>
            {/* Ambient corner aura */}
            <div
              aria-hidden
              className='pointer-events-none absolute -top-12 -right-12 size-40 rounded-full bg-[#0086ff]/15 blur-2xl'
            />

            <div>
              <div className='flex items-center justify-between gap-2 mb-6'>
                <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                  Estimated Cost Breakdown
                </span>
                <span className='inline-flex items-center gap-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 px-2.5 py-0.5 text-xs font-bold text-[#10b981]'>
                  <TrendingDown className='size-3' />
                  <span>{savingsPercentage}% Cheaper</span>
                </span>
              </div>

              {/* Direct Cost vs TokenRouter Cost */}
              <div className='space-y-3 mb-6'>
                <div className='flex items-center justify-between p-3.5 rounded-2xl bg-muted/40 border border-border/70'>
                  <div>
                    <div className='text-xs text-muted-foreground'>Direct Provider Cost</div>
                    <div className='text-xs font-medium text-foreground/80 mt-0.5'>
                      Standard retail pricing
                    </div>
                  </div>
                  <div className='font-mono text-base font-bold line-through text-muted-foreground'>
                    ${directCost}
                  </div>
                </div>

                <div className='flex items-center justify-between p-3.5 rounded-2xl bg-[#0086ff]/10 border border-[#0086ff]/30'>
                  <div>
                    <div className='text-xs font-semibold text-[#0086ff]'>
                      TokenRouter Smart Rate
                    </div>
                    <div className='text-xs text-muted-foreground mt-0.5'>
                      With multi-upstream discount
                    </div>
                  </div>
                  <div className='font-mono text-xl font-bold text-foreground'>
                    ${routerCost}
                    <span className='text-xs font-normal text-muted-foreground'>/mo</span>
                  </div>
                </div>
              </div>

              {/* Total Dollar Savings Highlight */}
              <div className='p-4 rounded-2xl bg-[#10b981]/10 border border-[#10b981]/25 text-left mb-6'>
                <div className='text-xs font-semibold uppercase tracking-wider text-[#10b981] flex items-center gap-1.5'>
                  <Sparkles className='size-3.5' />
                  <span>Net Estimated Monthly Savings</span>
                </div>
                <div className='font-mono text-3xl font-extrabold text-[#10b981] mt-1'>
                  +${savingsAmount}
                  <span className='text-xs font-semibold text-muted-foreground ml-1'>
                    / month saved
                  </span>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div>
              <Link
                to='/sign-up'
                className='w-full inline-flex items-center justify-center h-12 px-6 rounded-full bg-[#0086ff] hover:bg-[#0073e6] text-white text-sm font-semibold transition-all shadow-[0_4px_14px_rgba(0,134,255,0.35)] hover:shadow-[0_6px_20px_rgba(0,134,255,0.45)] hover:-translate-y-0.5 active:translate-y-0 cursor-pointer'
              >
                <span>Start Saving with TokenRouter</span>
                <ArrowRight className='size-4 ml-2' />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
