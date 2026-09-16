import { useState, useMemo } from 'react'
import { Check, Copy, Terminal, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { useSystemConfig } from '@/hooks/use-system-config'

type TabKey = 'python' | 'typescript' | 'curl' | 'cursor' | 'cherry'

export function CodePreview() {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandName = systemName || 'TokenRouter'
  const [activeTab, setActiveTab] = useState<TabKey>('python')
  const [copied, setCopied] = useState(false)

  const baseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/v1`
    }
    return 'https://api.tokenrouter.com/v1'
  }, [])

  const TABS: { id: TabKey; label: string; icon: string }[] = [
    { id: 'python', label: 'Python (openai)', icon: '🐍' },
    { id: 'typescript', label: 'TypeScript / Node', icon: '⚡' },
    { id: 'curl', label: 'cURL', icon: '🌐' },
    { id: 'cursor', label: 'Cursor / Windsurf', icon: '💻' },
    { id: 'cherry', label: 'Claude Code / Cherry', icon: '🍒' },
  ]

  const SNIPPETS: Record<TabKey, string> = {
    python: `# pip install openai
from openai import OpenAI

# 1. Point base_url to ${brandName}
client = OpenAI(
    base_url="${baseUrl}",
    api_key="sk-your-token-here",
)

# 2. Call any model (OpenAI, Claude, DeepSeek, Gemini, Llama)
response = client.chat.completions.create(
    model="deepseek-v3", # or "gpt-4o", "claude-3-5-sonnet", etc.
    messages=[
        {"role": "system", "content": "You are a helpful AI assistant."},
        {"role": "user", "content": "Explain unified model routing."}
    ],
    temperature=0.7,
)

print(response.choices[0].message.content)`,

    typescript: `// npm install openai
import OpenAI from "openai";

// 1. Initialize client with ${brandName} endpoint
const client = new OpenAI({
  baseURL: "${baseUrl}",
  apiKey: "sk-your-token-here",
});

// 2. Stream completions seamlessly
const stream = await client.chat.completions.create({
  model: "claude-3-5-sonnet",
  messages: [{ role: "user", content: "Write a high-performance HTTP server" }],
  stream: true,
});

for await (const chunk of stream) {
  process.stdout.write(chunk.choices[0]?.delta?.content || "");
}`,

    curl: `# Direct cURL invocation
curl ${baseUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer sk-your-token-here" \\
  -d '{
    "model": "gpt-4o",
    "messages": [
      {
        "role": "user",
        "content": "Hello world from ${brandName}!"
      }
    ]
  }'`,

    cursor: `// In Cursor or Windsurf Settings -> OpenAI API Key:
// 1. Set Override OpenAI Base URL:
//    ${baseUrl}

// 2. Set OpenAI API Key:
//    sk-your-token-here

// 3. In Models Settings, add your favored model IDs:
//    - gpt-4o
//    - claude-3-5-sonnet
//    - deepseek-v3
//    - gemini-1.5-pro`,

    cherry: `// Cherry Studio / NextChat / OpenCode / Claude Code Setup:
// Provider: OpenAI Compatible
// API Host / Base URL: ${baseUrl}
// API Key: sk-your-token-here
// Models: gpt-4o, claude-3-5-sonnet, deepseek-v3, nemotron-3.5`,
  }

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(SNIPPETS[activeTab])
      setCopied(true)
      toast.success(t('Snippet copied to clipboard!'))
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('Failed to copy'))
    }
  }

  return (
    <section className='relative z-10 py-20 md:py-28 overflow-hidden border-t border-border/40 bg-card/20'>
      <div className='mx-auto max-w-6xl px-6'>
        {/* Category Pill Badge */}
        <div className='flex justify-center mb-4'>
          <div className='inline-flex items-center gap-1.5 rounded-full bg-[#eef6ff] dark:bg-[#0086ff]/10 border border-[#0086ff]/25 px-3 py-1 text-xs font-semibold tracking-wider text-[#0086ff] uppercase'>
            <Sparkles className='size-3.5' />
            <span>{t('ZERO CODE CHANGES')}</span>
          </div>
        </div>

        {/* Section Heading */}
        <div className='text-center max-w-3xl mx-auto'>
          <h2 className='text-3xl sm:text-4xl md:text-5xl font-medium tracking-tight text-foreground leading-tight'>
            {t('100% OpenAI Compatible')}
          </h2>
          <p className='mt-4 text-base sm:text-lg text-muted-foreground leading-relaxed'>
            {t(
              'Switching is as simple as updating your base URL. Drop into your existing Python, TypeScript, LangChain, Cursor, or AI agent workflow without refactoring a single line of business logic.'
            )}
          </p>
        </div>

        {/* Code Terminal Box */}
        <div className='mt-12 rounded-2xl border border-border/80 bg-card/95 shadow-xl backdrop-blur-md overflow-hidden'>
          {/* Top Bar with Language Tabs */}
          <div className='flex flex-wrap items-center justify-between gap-2 px-4 py-3 border-b border-border/60 bg-muted/40'>
            <div className='flex items-center gap-1.5 overflow-x-auto py-1 scrollbar-none'>
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  type='button'
                  onClick={() => setActiveTab(tab.id)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all shrink-0 cursor-pointer ${
                    activeTab === tab.id
                      ? 'bg-[#0086ff] text-white shadow-xs'
                      : 'border border-border/70 bg-background/60 text-muted-foreground hover:text-foreground hover:border-[#0086ff]/40'
                  }`}
                >
                  <span>{tab.icon}</span>
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <button
              type='button'
              onClick={handleCopy}
              className='inline-flex items-center gap-1.5 h-8 px-3.5 rounded-full border border-border/70 bg-background hover:bg-muted text-foreground text-xs font-medium shrink-0 transition-colors shadow-2xs cursor-pointer'
            >
              {copied ? (
                <>
                  <Check className='size-3.5 text-[#10b981]' />
                  <span className='text-[#10b981] font-medium'>{t('Copied')}</span>
                </>
              ) : (
                <>
                  <Copy className='size-3.5 text-muted-foreground' />
                  <span>{t('Copy Snippet')}</span>
                </>
              )}
            </button>
          </div>

          {/* Terminal Code Body */}
          <div className='p-5 sm:p-6 bg-muted/20 font-mono text-xs sm:text-sm leading-relaxed overflow-x-auto text-foreground/90 select-all'>
            <pre>
              <code>{SNIPPETS[activeTab]}</code>
            </pre>
          </div>

          {/* Bottom Bar Info */}
          <div className='px-5 py-3 border-t border-border/50 bg-muted/30 flex items-center justify-between text-xs text-muted-foreground'>
            <div className='flex items-center gap-2'>
              <Terminal className='size-3.5 text-[#0086ff]' />
              <span>Base URL: <strong className='text-foreground'>{baseUrl}</strong></span>
            </div>
            <span className='text-[#10b981] font-semibold flex items-center gap-1.5'>
              <span className='size-1.5 rounded-full bg-[#10b981] animate-ping' />
              Automatic Upstream Failover Enabled
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
