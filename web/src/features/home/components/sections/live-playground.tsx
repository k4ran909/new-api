import { useState, useRef, useEffect, useMemo } from 'react'
import { Link } from '@tanstack/react-router'
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Zap,
  Activity,
  Code2,
  Terminal,
  Sparkles,
  ArrowRight,
  Sliders,
  Flame,
} from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { cn } from '@/lib/utils'
import { useSystemConfig } from '@/hooks/use-system-config'

interface LivePlaygroundProps {
  isAuthenticated?: boolean
}

interface ModelOption {
  id: string
  name: string
  provider: string
  tag: string
  latency: string
  promptPrice: string
  completionPrice: string
  color: string
  icon: string
  providerBadge: string
}

const MODELS: ModelOption[] = [
  {
    id: 'deepseek-chat',
    name: 'DeepSeek V3',
    provider: 'DeepSeek',
    tag: '671B MoE',
    latency: '12ms',
    promptPrice: '$0.14',
    completionPrice: '$0.28',
    color: '#2563eb',
    icon: '⚡',
    providerBadge: 'DeepSeek',
  },
  {
    id: 'deepseek-reasoner',
    name: 'DeepSeek R1',
    provider: 'DeepSeek',
    tag: 'Open Reasoning',
    latency: '18ms',
    promptPrice: '$0.55',
    completionPrice: '$2.19',
    color: '#3b82f6',
    icon: '🧠',
    providerBadge: 'DeepSeek',
  },
  {
    id: 'claude-3-5-sonnet',
    name: 'Claude 3.5 Sonnet',
    provider: 'Anthropic',
    tag: 'Coding Leader',
    latency: '22ms',
    promptPrice: '$3.00',
    completionPrice: '$15.00',
    color: '#d97706',
    icon: '◈',
    providerBadge: 'Anthropic',
  },
  {
    id: 'gpt-4o',
    name: 'GPT-4o',
    provider: 'OpenAI',
    tag: 'Omni Frontier',
    latency: '18ms',
    promptPrice: '$2.50',
    completionPrice: '$10.00',
    color: '#10a37f',
    icon: '✳',
    providerBadge: 'OpenAI',
  },
  {
    id: 'gemini-2.0-flash',
    name: 'Gemini 2.0 Flash',
    provider: 'Google',
    tag: '1M Speedster',
    latency: '14ms',
    promptPrice: '$0.10',
    completionPrice: '$0.40',
    color: '#4285f4',
    icon: '◆',
    providerBadge: 'Google',
  },
  {
    id: 'llama-3.3-70b',
    name: 'Llama 3.3 70B',
    provider: 'Meta',
    tag: 'Open Enterprise',
    latency: '16ms',
    promptPrice: '$0.20',
    completionPrice: '$0.40',
    color: '#16a34a',
    icon: '▲',
    providerBadge: 'Meta',
  },
]

interface PresetPrompt {
  id: string
  title: string
  prompt: string
  responses: Record<string, string>
}

const PRESETS: PresetPrompt[] = [
  {
    id: 'rate-limiter',
    title: '⚡ High-Concurrency Rate Limiter (Go)',
    prompt: 'Implement a thread-safe token bucket rate limiter in Go supporting per-API-key bursts.',
    responses: {
      'deepseek-chat': `package ratelimit

import (
	"sync"
	"time"
)

// TokenBucket holds rate-limiting state per client key
type TokenBucket struct {
	capacity   float64
	tokens     float64
	refillRate float64 // tokens per second
	lastRefill time.Time
	mu         sync.Mutex
}

func NewBucket(capacity, refillRate float64) *TokenBucket {
	return &TokenBucket{
		capacity:   capacity,
		tokens:     capacity,
		refillRate: refillRate,
		lastRefill: time.Now(),
	}
}

func (tb *TokenBucket) Allow(tokens float64) bool {
	tb.mu.Lock()
	defer tb.mu.Unlock()

	now := time.Now()
	elapsed := now.Sub(tb.lastRefill).Seconds()
	tb.lastRefill = now

	// Refill tokens up to maximum capacity
	tb.tokens += elapsed * tb.refillRate
	if tb.tokens > tb.capacity {
		tb.tokens = tb.capacity
	}

	if tb.tokens >= tokens {
		tb.tokens -= tokens
		return true // Request allowed
	}
	return false // Rate limit exceeded (HTTP 429)
}`,
      'claude-3-5-sonnet': `// Production-Ready Concurrent Token Bucket Rate Limiter
package ratelimiter

import (
	"sync"
	"time"
)

type Limiter struct {
	mu         sync.RWMutex
	buckets    map[string]*bucket
	rate       float64
	burst      float64
	cleanupTicker *time.Ticker
}

type bucket struct {
	tokens     float64
	lastUpdate time.Time
}

func New(rate, burst float64) *Limiter {
	return &Limiter{
		buckets: make(map[string]*bucket),
		rate:    rate,
		burst:   burst,
	}
}

func (l *Limiter) Allow(key string) bool {
	l.mu.Lock()
	defer l.mu.Unlock()

	b, exists := l.buckets[key]
	now := time.Now()

	if !exists {
		l.buckets[key] = &bucket{tokens: l.burst - 1, lastUpdate: now}
		return true
	}

	delta := now.Sub(b.lastUpdate).Seconds()
	b.tokens = min(l.burst, b.tokens+delta*l.rate)
	b.lastUpdate = now

	if b.tokens >= 1.0 {
		b.tokens -= 1.0
		return true
	}
	return false
}`,
      default: `// High-Performance Token Bucket Implementation
// Zero allocations in the hot path, sub-microsecond check latency.
package main

import (
	"fmt"
	"sync"
	"time"
)

type TokenBucket struct {
	sync.Mutex
	capacity float64
	tokens   float64
	rate     float64
	updated  time.Time
}

func (b *TokenBucket) Allow() bool {
	b.Lock()
	defer b.Unlock()

	now := time.Now()
	b.tokens = min(b.capacity, b.tokens+now.Sub(b.updated).Seconds()*b.rate)
	b.updated = now

	if b.tokens >= 1 {
		b.tokens--
		return true
	}
	return false
}

func main() {
	tb := &TokenBucket{capacity: 100, tokens: 100, rate: 20, updated: time.Now()}
	fmt.Printf("Permitted: %v\\n", tb.Allow())
}`,
    },
  },
  {
    id: 'sql-indexing',
    title: '🔍 PostgreSQL Indexing & Optimization',
    prompt: 'How do you optimize a slow query scanning 50M rows filtering on tenant_id, status, and created_at?',
    responses: {
      default: `### Composite B-Tree & Partial Index Strategy

For high-throughput multi-tenant workloads scanning 50M rows:

\`\`\`sql
-- 1. Create a selective composite index with equality columns first, followed by range:
CREATE INDEX CONCURRENTLY idx_orders_tenant_status_created
ON orders (tenant_id, status, created_at DESC)
INCLUDE (total_amount, currency);

-- 2. If status queries typically check for pending/processing only:
CREATE INDEX CONCURRENTLY idx_orders_active_queue
ON orders (tenant_id, created_at DESC)
WHERE status IN ('pending', 'processing');
\`\`\`

#### Key Performance Gains:
1. **Index-Only Scan**: By appending frequently selected columns in \`INCLUDE\`, PostgreSQL avoids reading the heap table entirely.
2. **Index Locality**: Tenant partitioning ensures disk reads are sequential and cache hits stay above 99.2%.
3. **Execution Plan**: Drops \`Seq Scan\` (3,800ms) down to an \`Index Scan\` (< 4ms).`,
    },
  },
  {
    id: 'jwt-auth',
    title: '🛡️ OAuth2 PKCE vs JWT Best Practices',
    prompt: 'What are the essential security trade-offs between opaque bearer tokens and stateless JWTs in distributed microservices?',
    responses: {
      default: `### Opaque Tokens vs. Stateless JWTs: Architectural Decision Guide

| Metric | Stateless JWT | Opaque Reference Token |
| :--- | :--- | :--- |
| **Revocation Speed** | Difficult (requires Redis blocklist) | Instant (central auth DB lookup) |
| **Internal Latency** | **Sub-millisecond** (local public key verify) | Network roundtrip to introspection |
| **Payload Size** | 400B – 2KB (affects header overhead) | ~32 bytes (minimal bandwidth) |
| **Compromise Blast** | Valid until \`exp\` timestamp | Immediately killable at API Gateway |

#### Best Practice Architecture:
- **Client to Gateway**: Use short-lived (15m) JWTs with refresh token rotation + PKCE.
- **Gateway to Downstream**: TokenRouter validates the token once at the edge, hydrates tenant headers, and forwards high-speed gRPC requests internally.`,
    },
  },
  {
    id: 'quantum-computing',
    title: '⚛️ Quantum Computing in Plain English',
    prompt: 'Explain quantum superposition and entanglement using an everyday analogy.',
    responses: {
      default: `### Superposition & Entanglement: The Coin Analogy

#### 1. Superposition: The Spinning Coin
- **Classical Bit**: A coin resting flat on a table. It is definitively **Heads (0)** or **Tails (1)**.
- **Qubit in Superposition**: A coin spinning rapidly on the tabletop. While spinning, it's not simply Heads or Tails—it possesses a mathematical probability of collapsing into either state the moment you slap your hand down on it.

#### 2. Entanglement: Telepathic Dice
Imagine two enchanted dice rolled on opposite sides of the planet:
- Separately, each die lands on a random number from 1 to 6.
- But if they are **entangled**, the instant die A reveals a \`6\`, die B instantly shows a \`6\`—with 100% correlation, regardless of light-years of separation.

**Why it matters for AI & Encryption**: Quantum computers evaluate entire multidimensional solution spaces simultaneously rather than testing possibilities one by one.`,
    },
  },
]

export function LivePlayground(props: LivePlaygroundProps) {
  const { isAuthenticated } = props
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()
  const brandName = systemName || 'TokenRouter'
  const [selectedModelId, setSelectedModelId] = useState('deepseek-chat')
  const [activePresetId, setActivePresetId] = useState('rate-limiter')
  const [inputPrompt, setInputPrompt] = useState(PRESETS[0].prompt)
  const [streamedText, setStreamedText] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [hasStreamed, setHasStreamed] = useState(false)
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState<'stream' | 'raw' | 'json' | 'curl' | 'python'>('stream')

  const baseUrl = useMemo(() => {
    if (typeof window !== 'undefined') {
      return `${window.location.origin}/v1`
    }
    return 'https://llm.fluxnat.dev/v1'
  }, [])

  // Telemetry metrics
  const [ttft, setTtft] = useState(14)
  const [throughput, setThroughput] = useState(184)
  const [tokenCount, setTokenCount] = useState(0)

  const streamIntervalRef = useRef<NodeJS.Timeout | null>(null)

  const selectedModel = useMemo(() => {
    return MODELS.find((m) => m.id === selectedModelId) || MODELS[0]
  }, [selectedModelId])

  const targetResponse = useMemo(() => {
    const preset = PRESETS.find((p) => p.id === activePresetId)
    if (!preset) return PRESETS[0].responses.default
    return preset.responses[selectedModelId] || preset.responses.default
  }, [activePresetId, selectedModelId])

  const startStream = (textToStream: string) => {
    if (streamIntervalRef.current) {
      clearInterval(streamIntervalRef.current)
    }

    setIsStreaming(true)
    setStreamedText('')
    setHasStreamed(true)

    // Randomize telemetry slightly for realism
    const randomTtft = Math.floor(Math.random() * 8) + 12
    const randomThroughput = Math.floor(Math.random() * 40) + 170
    setTtft(randomTtft)
    setThroughput(randomThroughput)

    let index = 0
    const chunkSize = 4 // characters per tick
    const speedMs = 15

    streamIntervalRef.current = setInterval(() => {
      index += chunkSize
      if (index >= textToStream.length) {
        setStreamedText(textToStream)
        setTokenCount(Math.round(textToStream.length / 3.8))
        setIsStreaming(false)
        if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
      } else {
        setStreamedText(textToStream.slice(0, index))
        setTokenCount(Math.round(index / 3.8))
      }
    }, speedMs)
  }

  // Auto-run once on mount
  useEffect(() => {
    startStream(targetResponse)
    return () => {
      if (streamIntervalRef.current) clearInterval(streamIntervalRef.current)
    }
  }, [])

  const handleSelectPreset = (preset: PresetPrompt) => {
    setActivePresetId(preset.id)
    setInputPrompt(preset.prompt)
    const response = preset.responses[selectedModelId] || preset.responses.default
    startStream(response)
  }

  const handleSelectModel = (modelId: string) => {
    setSelectedModelId(modelId)
    const preset = PRESETS.find((p) => p.id === activePresetId) || PRESETS[0]
    const response = preset.responses[modelId] || preset.responses.default
    startStream(response)
  }

  const handleRunStream = () => {
    startStream(targetResponse)
  }

  const handleReset = () => {
    startStream(targetResponse)
  }

  const handleCopy = async (content: string) => {
    try {
      await navigator.clipboard.writeText(content)
      setCopied(true)
      toast.success(t('Copied to clipboard'))
      setTimeout(() => setCopied(false), 2000)
    } catch {
      toast.error(t('Failed to copy'))
    }
  }

  const jsonResponse = useMemo(() => {
    return JSON.stringify(
      {
        id: `chatcmpl-tr-${Math.random().toString(36).substring(2, 9)}`,
        object: 'chat.completion',
        created: Math.floor(Date.now() / 1000),
        model: selectedModel.id,
        choices: [
          {
            index: 0,
            message: {
              role: 'assistant',
              content: streamedText,
            },
            finish_reason: isStreaming ? null : 'stop',
          },
        ],
        usage: {
          prompt_tokens: Math.round(inputPrompt.length / 4),
          completion_tokens: tokenCount,
          total_tokens: Math.round(inputPrompt.length / 4) + tokenCount,
        },
        router_metadata: {
          ttft_ms: ttft,
          provider: selectedModel.provider,
          upstream_latency_ms: ttft + 8,
          cost_usd: (
            ((tokenCount * parseFloat(selectedModel.completionPrice.replace('$', ''))) / 1_000_000)
          ).toFixed(6),
        },
      },
      null,
      2
    )
  }, [selectedModel, streamedText, isStreaming, inputPrompt, tokenCount, ttft])

  const curlSnippet = useMemo(() => {
    const envKey = `${brandName.toUpperCase().replace(/[^A-Z0-9]/g, '_')}_API_KEY`
    return `curl ${baseUrl}/chat/completions \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer $${envKey}" \\
  -d '{
    "model": "${selectedModel.id}",
    "messages": [
      {"role": "user", "content": ${JSON.stringify(inputPrompt)}}
    ],
    "stream": true
  }'`
  }, [baseUrl, brandName, selectedModel.id, inputPrompt])

  const pythonSnippet = useMemo(() => {
    return `from openai import OpenAI

client = OpenAI(
    base_url="${baseUrl}",
    api_key="your_api_key_here",
)

stream = client.chat.completions.create(
    model="${selectedModel.id}",
    messages=[{"role": "user", "content": ${JSON.stringify(inputPrompt)}}],
    stream=True,
)

for chunk in stream:
    print(chunk.choices[0].delta.content or "", end="", flush=True)`
  }, [baseUrl, selectedModel.id, inputPrompt])

  const routerCost = useMemo(() => {
    const rate = parseFloat(selectedModel.completionPrice.replace('$', ''))
    const cost = (tokenCount * rate) / 1_000_000
    return cost.toFixed(5)
  }, [tokenCount, selectedModel])

  return (
    <section className='relative z-10 py-20 md:py-28 overflow-hidden bg-muted/20 border-y border-border/60'>
      {/* Background glow */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 [background-image:radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,134,255,0.08)_0%,transparent_70%)] dark:[background-image:radial-gradient(ellipse_60%_50%_at_50%_0%,rgba(0,134,255,0.14)_0%,transparent_70%)]'
      />

      <div className='mx-auto max-w-7xl px-6'>
        {/* Section Header */}
        <div className='flex flex-col items-center text-center mb-12'>
          <div className='inline-flex items-center gap-2 rounded-full bg-[#0086ff]/10 border border-[#0086ff]/25 px-3.5 py-1 text-xs font-semibold tracking-wide text-[#0086ff] mb-4 shadow-2xs'>
            <Sparkles className='size-3.5' />
            <span>✦ INTERACTIVE PLAYGROUND</span>
          </div>

          <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground'>
            {t('Experience Instant Routing. Live.')}
          </h2>
          <p className='text-muted-foreground mt-3 text-sm sm:text-base max-w-2xl'>
            {t(
              'Select a flagship model, run a prompt, and watch {{brandName}} deliver sub-20ms first-token latency with real-time streaming and automatic multi-provider failover.',
              { brandName }
            )}
          </p>
        </div>

        {/* Playground Container Card */}
        <div className='rounded-3xl border border-border/80 bg-card/95 backdrop-blur-xl shadow-xl overflow-hidden'>
          {/* Top Bar: Model Selector Pills */}
          <div className='p-4 sm:p-5 border-b border-border/70 bg-muted/30'>
            <div className='flex items-center justify-between gap-4 mb-3'>
              <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground flex items-center gap-1.5'>
                <Sliders className='size-3.5 text-[#0086ff]' />
                Select Model Engine
              </span>
              <div className='flex items-center gap-2'>
                <span className='size-2 rounded-full bg-[#10b981] animate-pulse' />
                <span className='text-xs font-medium text-muted-foreground'>
                  Routing Pool Online
                </span>
              </div>
            </div>

            {/* Scrollable Model Pills */}
            <div className='flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none'>
              {MODELS.map((m) => {
                const isSelected = m.id === selectedModelId
                return (
                  <button
                    key={m.id}
                    type='button'
                    onClick={() => handleSelectModel(m.id)}
                    className={cn(
                      'inline-flex items-center gap-2 h-10 px-3.5 rounded-full border text-xs font-medium whitespace-nowrap transition-all cursor-pointer shrink-0',
                      isSelected
                        ? 'border-[#0086ff] bg-[#0086ff]/10 text-[#0086ff] shadow-xs font-semibold ring-1 ring-[#0086ff]/30'
                        : 'border-border/80 bg-background/80 hover:bg-muted text-foreground/80'
                    )}
                  >
                    <span>{m.icon}</span>
                    <span>{m.name}</span>
                    <span
                      className={cn(
                        'text-[10px] px-1.5 py-0.5 rounded-full uppercase tracking-wider',
                        isSelected
                          ? 'bg-[#0086ff] text-white'
                          : 'bg-muted text-muted-foreground'
                      )}
                    >
                      {m.tag}
                    </span>
                    <span className='text-[11px] font-mono text-muted-foreground'>
                      {m.latency}
                    </span>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Middle: Prompt Input & Presets */}
          <div className='p-4 sm:p-6 border-b border-border/70 bg-card'>
            <div className='flex flex-wrap items-center gap-2 mb-3'>
              <span className='text-xs font-semibold uppercase tracking-wider text-muted-foreground'>
                Prompt Presets:
              </span>
              {PRESETS.map((p) => {
                const isActive = p.id === activePresetId
                return (
                  <button
                    key={p.id}
                    type='button'
                    onClick={() => handleSelectPreset(p)}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs transition-colors cursor-pointer border',
                      isActive
                        ? 'bg-[#0086ff] border-[#0086ff] text-white font-medium shadow-2xs'
                        : 'border-border/70 bg-muted/50 hover:bg-muted text-muted-foreground hover:text-foreground'
                    )}
                  >
                    {p.title}
                  </button>
                )
              })}
            </div>

            {/* Prompt Text Input Area */}
            <div className='relative rounded-2xl border border-border/80 bg-background/60 p-3.5 focus-within:border-[#0086ff] focus-within:ring-1 focus-within:ring-[#0086ff]/30 transition-all'>
              <textarea
                value={inputPrompt}
                onChange={(e) => setInputPrompt(e.target.value)}
                rows={2}
                className='w-full resize-none bg-transparent text-sm text-foreground placeholder:text-muted-foreground focus:outline-none'
                placeholder='Type a prompt or select a preset above...'
              />
              <div className='flex items-center justify-between pt-2 border-t border-border/40 mt-2'>
                <div className='flex items-center gap-2 text-xs text-muted-foreground'>
                  <span>Prompt: ~{Math.round(inputPrompt.length / 4)} tokens</span>
                  <span>·</span>
                  <span className='font-mono text-[#0086ff]'>
                    {selectedModel.promptPrice}/M
                  </span>
                </div>

                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    onClick={handleReset}
                    disabled={isStreaming}
                    className='inline-flex items-center gap-1.5 h-8 px-3 rounded-full border border-border/70 bg-background hover:bg-muted text-xs font-medium text-muted-foreground hover:text-foreground transition-colors cursor-pointer'
                  >
                    <RotateCcw className='size-3.5' />
                    <span>Reset</span>
                  </button>

                  <button
                    type='button'
                    onClick={handleRunStream}
                    disabled={isStreaming}
                    className={cn(
                      'inline-flex items-center gap-2 h-8 px-4 rounded-full text-xs font-medium text-white transition-all cursor-pointer shadow-xs',
                      isStreaming
                        ? 'bg-[#0086ff]/60 cursor-not-allowed'
                        : 'bg-[#0086ff] hover:bg-[#0073e6] hover:shadow-[0_4px_12px_rgba(0,134,255,0.35)]'
                    )}
                  >
                    {isStreaming ? (
                      <>
                        <span className='size-2 rounded-full bg-white animate-ping' />
                        <span>Streaming...</span>
                      </>
                    ) : (
                      <>
                        <Play className='size-3.5 fill-white' />
                        <span>Run Stream ⚡</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Response Output Area */}
          <div className='p-4 sm:p-6 bg-muted/10 min-h-[340px] flex flex-col justify-between'>
            <div>
              {/* Output Tab Switcher & Copy Button */}
              <div className='flex items-center justify-between gap-3 border-b border-border/60 pb-3 mb-4'>
                <div className='flex items-center gap-1.5 overflow-x-auto scrollbar-none'>
                  <button
                    type='button'
                    onClick={() => setActiveTab('stream')}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      activeTab === 'stream'
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    ✨ Streamed Output
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('raw')}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      activeTab === 'raw'
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    📜 Raw Markdown
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('json')}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      activeTab === 'json'
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    📦 Response JSON
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('curl')}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      activeTab === 'curl'
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    💻 cURL
                  </button>
                  <button
                    type='button'
                    onClick={() => setActiveTab('python')}
                    className={cn(
                      'h-7 px-3 rounded-full text-xs font-medium transition-colors cursor-pointer',
                      activeTab === 'python'
                        ? 'bg-foreground text-background font-semibold'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                    )}
                  >
                    🐍 Python SDK
                  </button>
                </div>

                <button
                  type='button'
                  onClick={() => {
                    if (activeTab === 'stream' || activeTab === 'raw') handleCopy(streamedText)
                    if (activeTab === 'json') handleCopy(jsonResponse)
                    if (activeTab === 'curl') handleCopy(curlSnippet)
                    if (activeTab === 'python') handleCopy(pythonSnippet)
                  }}
                  className='inline-flex items-center gap-1.5 h-7 px-3 rounded-full border border-border/70 bg-background hover:bg-muted text-foreground text-xs font-medium shrink-0 transition-colors cursor-pointer'
                >
                  {copied ? (
                    <>
                      <Check className='size-3 text-[#10b981]' />
                      <span className='text-[#10b981] font-semibold'>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className='size-3 text-muted-foreground' />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>

              {/* Tab Contents */}
              {activeTab === 'stream' && (
                <div className='font-mono text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap leading-relaxed select-text bg-background/60 p-4 rounded-xl border border-border/50 max-h-[360px] overflow-y-auto'>
                  {streamedText}
                  {isStreaming && (
                    <span className='inline-block w-2 h-4 ml-1 bg-[#0086ff] animate-pulse align-middle' />
                  )}
                </div>
              )}

              {activeTab === 'raw' && (
                <pre className='font-mono text-xs sm:text-sm text-muted-foreground whitespace-pre-wrap p-4 rounded-xl bg-background/60 border border-border/50 max-h-[360px] overflow-y-auto'>
                  {streamedText}
                </pre>
              )}

              {activeTab === 'json' && (
                <pre className='font-mono text-xs sm:text-sm text-[#0086ff] dark:text-[#60a5fa] whitespace-pre-wrap p-4 rounded-xl bg-background/80 border border-border/50 max-h-[360px] overflow-y-auto'>
                  {jsonResponse}
                </pre>
              )}

              {activeTab === 'curl' && (
                <pre className='font-mono text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap p-4 rounded-xl bg-background/80 border border-border/50 max-h-[360px] overflow-y-auto'>
                  {curlSnippet}
                </pre>
              )}

              {activeTab === 'python' && (
                <pre className='font-mono text-xs sm:text-sm text-foreground/90 whitespace-pre-wrap p-4 rounded-xl bg-background/80 border border-border/50 max-h-[360px] overflow-y-auto'>
                  {pythonSnippet}
                </pre>
              )}
            </div>

            {/* Bottom Telemetry Bar */}
            <div className='mt-6 pt-4 border-t border-border/60 flex flex-wrap items-center justify-between gap-3'>
              <div className='flex flex-wrap items-center gap-3 sm:gap-6'>
                <div className='flex items-center gap-1.5 text-xs'>
                  <span className='size-2 rounded-full bg-[#10b981]' />
                  <span className='text-muted-foreground'>TTFT:</span>
                  <span className='font-mono font-semibold text-[#10b981]'>
                    {ttft}ms
                  </span>
                </div>

                <div className='flex items-center gap-1.5 text-xs'>
                  <Zap className='size-3 text-[#0086ff]' />
                  <span className='text-muted-foreground'>Throughput:</span>
                  <span className='font-mono font-semibold text-foreground'>
                    {throughput} tok/s
                  </span>
                </div>

                <div className='flex items-center gap-1.5 text-xs'>
                  <Activity className='size-3 text-muted-foreground' />
                  <span className='text-muted-foreground'>Tokens:</span>
                  <span className='font-mono font-semibold text-foreground'>
                    {tokenCount} tokens
                  </span>
                </div>

                <div className='flex items-center gap-1.5 text-xs'>
                  <span className='text-muted-foreground'>Cost:</span>
                  <span className='font-mono font-semibold text-foreground'>
                    ${routerCost}
                  </span>
                </div>
              </div>

              <div className='flex items-center gap-2'>
                <span className='inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[11px] font-semibold text-[#10b981]'>
                  <Flame className='size-3' />
                  <span>72% cheaper than direct API</span>
                </span>

                <Link
                  to={isAuthenticated ? '/keys' : '/sign-up'}
                  className='inline-flex items-center gap-1 text-xs font-semibold text-[#0086ff] hover:underline'
                >
                  <span>{isAuthenticated ? t('View API Keys') : t('Get Free Key')}</span>
                  <ArrowRight className='size-3' />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
