'use client'

import { TimelineContent } from '@/components/ui/timeline-animation'
import { VerticalCutReveal } from '@/components/ui/vertical-cut-reveal'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'

export function AboutSection3() {
  const heroRef = useRef<HTMLDivElement>(null)

  const revealVariants = {
    visible: (i: number) => ({
      y: 0,
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        duration: 0.4,
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      y: -12,
      opacity: 0,
    },
  }

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      scale: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.1,
        duration: 0.45,
      },
    }),
    hidden: {
      filter: 'blur(8px)',
      scale: 0.98,
      opacity: 0,
    },
  }

  return (
    <section
      className="w-full max-w-5xl mx-auto"
      ref={heroRef}
    >
      <div className="rounded-3xl bg-card/80 backdrop-blur-xl border border-border/70 p-6 sm:p-8 md:p-10 shadow-xl text-card-foreground">
        {/* Header Bar: Badge on left, Social Icons on right */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-border/40">
          <TimelineContent
            as="div"
            animationNum={0}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-red-500/10 border border-red-500/25 text-red-500 text-xs font-semibold tracking-wider uppercase"
          >
            <span className="animate-spin text-xs">✱</span>
            <span>WHO I AM</span>
          </TimelineContent>

          <div className="flex items-center gap-2 sm:gap-2.5">
            <TimelineContent
              as="a"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted hover:border-red-500/40 hover:scale-105 flex items-center justify-center transition-all duration-200"
              aria-label="Facebook"
            >
              <img
                src="https://cdn.21st.dev/assets/mirror/72/720171c5f1b63d690045243006ee87b6d6ab779b85971b5bc9e3267dae5b4747.svg"
                alt="Facebook"
                width={16}
                height={16}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={1}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted hover:border-red-500/40 hover:scale-105 flex items-center justify-center transition-all duration-200"
              aria-label="Instagram"
            >
              <img
                src="https://cdn.21st.dev/assets/mirror/80/8060ef38a7f4c25ea5e8bf5df005a4472de35f56836c64442341a9e590591e56.svg"
                alt="Instagram"
                width={16}
                height={16}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={2}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.linkedin.com/naymur-rahman"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted hover:border-red-500/40 hover:scale-105 flex items-center justify-center transition-all duration-200"
              aria-label="LinkedIn"
            >
              <img
                src="https://cdn.21st.dev/assets/mirror/23/2371179e72304e6296cb7324ea9ea67a1ad6cb1fe3a35c40a689ed7bf6dd5064.svg"
                alt="LinkedIn"
                width={16}
                height={16}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </TimelineContent>
            <TimelineContent
              as="a"
              animationNum={3}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.youtube.com/naymurweb"
              target="_blank"
              rel="noopener noreferrer"
              className="w-8 h-8 rounded-xl border border-border/60 bg-muted/40 hover:bg-muted hover:border-red-500/40 hover:scale-105 flex items-center justify-center transition-all duration-200"
              aria-label="YouTube"
            >
              <img
                src="https://cdn.21st.dev/assets/mirror/37/3792b7e33f779b6c2819619228cdcc8d279b3020f19c34dc1ef311756eccbf22.svg"
                alt="YouTube"
                width={16}
                height={16}
                className="opacity-80 hover:opacity-100 transition-opacity"
              />
            </TimelineContent>
          </div>
        </div>

        {/* Clean, Full-Bleed Hero Image */}
        <TimelineContent
          as="div"
          animationNum={4}
          timelineRef={heroRef}
          customVariants={scaleVariants}
          className="relative w-full h-[200px] sm:h-[260px] md:h-[290px] rounded-2xl overflow-hidden border border-border/60 shadow-inner mb-6 group bg-muted/30"
        >
          <img
            src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            alt="Team collaborating on ideas"
            className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/10 to-transparent pointer-events-none" />
        </TimelineContent>

        {/* Structured Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 p-4 sm:p-5 rounded-2xl bg-muted/40 border border-border/60 mb-8">
          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col items-center sm:items-start p-2"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-500 tracking-tight">10+</span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">Years of Experience</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col items-center sm:items-start p-2 border-l border-border/40"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-500 tracking-tight">3M+</span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">Words Crafted</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={7}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col items-center sm:items-start p-2 border-t md:border-t-0 md:border-l border-border/40"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-500 tracking-tight">100+</span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">Global Brands</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={8}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col items-center sm:items-start p-2 border-t md:border-t-0 border-l border-border/40"
          >
            <span className="text-2xl sm:text-3xl lg:text-4xl font-black text-red-500 tracking-tight">30%</span>
            <span className="text-xs sm:text-sm font-medium text-muted-foreground mt-0.5">Higher Engagement</span>
          </TimelineContent>
        </div>

        {/* Narrative & Profile Row */}
        <div className="grid lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
          <div className="lg:col-span-2 flex flex-col justify-between">
            <div>
              <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight text-foreground mb-4 leading-tight">
                <VerticalCutReveal
                  splitBy="words"
                  staggerDuration={0.07}
                  staggerFrom="first"
                  reverse={true}
                  transition={{
                    type: 'spring',
                    stiffness: 240,
                    damping: 26,
                    delay: 0.15,
                  }}
                >
                  Crafting Words That Make a Difference.
                </VerticalCutReveal>
              </h2>

              <TimelineContent
                as="div"
                animationNum={9}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="grid sm:grid-cols-2 gap-4 sm:gap-6 text-sm text-muted-foreground leading-relaxed text-left"
              >
                <p>
                  My journey began as a passionate writer and evolved into a
                  strategic copywriting career. I specialize in transforming
                  complex ideas into compelling content that helps brands scale,
                  inspire trust, and build lasting market authority.
                </p>
                <p>
                  Every brand has a unique story, and I specialize in telling yours
                  with clarity and impact. By blending genuine creativity with
                  data-driven strategy, I craft copy that resonates deeply with audiences
                  and drives measurable engagement.
                </p>
              </TimelineContent>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="h-full p-6 rounded-2xl bg-muted/40 border border-border/60 flex flex-col justify-between text-left shadow-sm">
              <div>
                <TimelineContent
                  as="div"
                  animationNum={12}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-2xl font-black tracking-wider text-red-500"
                >
                  SANGVI
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={13}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mt-0.5 mb-3"
                >
                  Copywriter &amp; Content Strategist
                </TimelineContent>

                <div className="w-10 h-0.5 bg-red-500/50 rounded-full mb-4" />

                <TimelineContent
                  as="div"
                  animationNum={14}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="mb-5"
                >
                  <p className="text-sm font-medium text-foreground/90 leading-snug">
                    Ready to transform your brand's message into measurable results?
                  </p>
                </TimelineContent>
              </div>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="w-full inline-flex items-center justify-center gap-2.5 px-5 py-3 rounded-xl bg-red-600 hover:bg-red-500 text-white font-semibold text-sm transition-all duration-200 shadow-md hover:shadow-red-500/20 hover:scale-[1.02] active:scale-[0.98] cursor-pointer group"
              >
                <span>LET'S COLLABORATE</span>
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </TimelineContent>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection3
