import { useState } from 'react'
import { Sparkles, Plus, X, HelpCircle, ArrowRight } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { useStatus } from '@/hooks/use-status'

interface FaqItem {
  id: string
  question: string
  answer: string
  link?: { text: string; href: string }
}

export function Faq() {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const { status } = useStatus()
  const brandName = systemName || 'TokenRouter'
  const docsUrl = (status?.docs_link as string | undefined) || 'https://docs.newapi.pro'

  const [openIndex, setOpenIndex] = useState<number | null>(0) // Default first item open like TokenRouter

  const FAQ_ITEMS: FaqItem[] = [
    {
      id: '1',
      question: `1. What is ${brandName}?`,
      answer: `${brandName} is a unified AI gateway for accessing leading AI models across text, image, video, and audio. Instead of integrating with multiple model providers one by one, developers and enterprises can connect through ${brandName} and manage model access through a single interface. ${brandName} helps simplify model integration, centralize usage management, and provide a consistent way to access a broad range of AI capabilities.`,
      link: { text: t('Read Full Guide'), href: docsUrl },
    },
    {
      id: '2',
      question: `2. Why should I choose ${brandName}?`,
      answer: `${brandName} provides multi-channel automatic failover, centralized billing across dozens of upstream providers, granular token quotas, zero-retention data privacy guarantees, and competitive per-million token pricing with smart response caching.`,
    },
    {
      id: '3',
      question: "3. Is my team's data secure?",
      answer: `Yes. All requests and prompt outputs routed through ${brandName} are zero-retention. We do not store or train foundation models on your proprietary prompt content or inference outputs.`,
    },
    {
      id: '4',
      question: '4. How do I get support or report a bug?',
      answer: `You can reach our dedicated engineering and support team directly via Discord, email ticket, or GitHub issues. Enterprise customers receive dedicated Slack channels with SLA guarantees.`,
    },
    {
      id: '5',
      question: `5. How is usage billed on ${brandName}?`,
      answer: `Usage is billed strictly on a pay-as-you-go consumption model measured in tokens (input tokens, output tokens, and cache read tokens). There are no hidden subscription commitments.`,
    },
    {
      id: '6',
      question: `6. How often does ${brandName} add new models?`,
      answer: `New models from DeepSeek, OpenAI, Anthropic, Google, Meta, and open-weight providers are benchmarked and added within 24 to 48 hours of public launch.`,
    },
    {
      id: '7',
      question: `7. Does ${brandName} charge a platform fee?`,
      answer: `No hidden platform fees. You only pay for the tokens and compute resources your workloads consume based on transparent pricing rates.`,
    },
    {
      id: '8',
      question: '8. Can I request higher RPM or TPM limits?',
      answer: `Yes. If you have enterprise workloads requiring high concurrency, reach out to our team or submit a quota increase request in your console to unlock custom RPM and TPM allocations.`,
    },
    {
      id: '9',
      question: '9. What happens if a model provider goes down?',
      answer: `${brandName}'s intelligent router automatically reroutes requests to alternative upstream providers or backup channel clusters within milliseconds, maintaining 99.9% application uptime.`,
    },
    {
      id: '10',
      question: `10. What payment and currency options does ${brandName} support?`,
      answer: `We support major credit cards, Stripe, wire transfers, crypto payments (USDT/USDC), and corporate invoicing for annual contracts.`,
    },
  ]

  const toggleItem = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className='relative z-10 py-20 md:py-28'>
      <div className='mx-auto max-w-5xl px-6'>
        {/* Category Pill Badge */}
        <div className='flex justify-center mb-4'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/20 px-3 py-1 text-xs font-semibold tracking-wider text-[#0086ff] uppercase'>
            <Sparkles className='size-3.5' />
            <span>{t('FAQ')}</span>
          </div>
        </div>

        {/* Section Heading */}
        <h2 className='text-3xl sm:text-4xl md:text-5xl lg:text-[56px] font-medium tracking-tight text-foreground text-center leading-[1.15]'>
          {t('Frequently Asked Questions')}
        </h2>

        {/* Subtitle */}
        <p className='mt-4 text-base sm:text-lg text-muted-foreground text-center max-w-2xl mx-auto leading-relaxed'>
          {t(
            "Quick answers to the questions developers ask most. Don't see yours? The full documentation has deeper guides, references."
          )}
        </p>

        {/* Accordion Container */}
        <div className='mt-12 space-y-3'>
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index
            return (
              <div
                key={item.id}
                className='rounded-xl border border-border/80 bg-card/60 transition-all overflow-hidden'
              >
                <button
                  type='button'
                  onClick={() => toggleItem(index)}
                  className='w-full flex items-center justify-between p-5 md:p-6 text-left focus:outline-hidden'
                >
                  <span className='text-base md:text-lg font-medium text-foreground pr-4'>
                    {item.question}
                  </span>
                  <span
                    className={`size-7 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                      isOpen
                        ? 'bg-[#0086ff] text-white'
                        : 'bg-muted/70 text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {isOpen ? <X className='size-4' /> : <Plus className='size-4' />}
                  </span>
                </button>

                {isOpen && (
                  <div className='px-5 pb-6 md:px-6 pt-0 text-sm md:text-base text-muted-foreground leading-relaxed border-t border-border/40 mt-1'>
                    <p className='pt-3'>{item.answer}</p>
                    {item.link && (
                      <div className='mt-4'>
                        <a
                          href={item.link.href}
                          target='_blank'
                          rel='noopener noreferrer'
                          className='inline-flex items-center gap-1 text-sm font-medium text-[#0086ff] hover:underline'
                        >
                          {item.link.text} <ArrowRight className='size-3.5' />
                        </a>
                      </div>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>

        {/* Bottom Help Banner */}
        <div className='mt-10 rounded-xl border border-border/80 bg-muted/30 p-5 md:p-6 flex flex-col sm:flex-row items-center justify-between gap-4'>
          <div className='flex items-center gap-3 text-center sm:text-left'>
            <div className='size-9 rounded-full bg-[#0086ff]/10 text-[#0086ff] flex items-center justify-center shrink-0'>
              <HelpCircle className='size-5' />
            </div>
            <div>
              <h4 className='text-sm md:text-base font-semibold text-foreground'>
                {t('Still Have Questions?')}
              </h4>
              <p className='text-xs md:text-sm text-muted-foreground'>
                {t('Browse the full documentation for guides, references and end-to-end code samples.')}
              </p>
            </div>
          </div>
          <a
            href={docsUrl}
            target='_blank'
            rel='noopener noreferrer'
            className='inline-flex items-center gap-1.5 h-9 px-4 rounded-full bg-[#0086ff] hover:bg-[#006fd6] text-white text-xs font-medium shrink-0 transition-colors shadow-xs'
          >
            <span>{t('Open Docs')}</span>
            <ArrowRight className='size-3.5' />
          </a>
        </div>
      </div>
    </section>
  )
}
