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
        delay: i * 0.15,
        duration: 0.45,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      y: -14,
      opacity: 0,
    },
  }

  const scaleVariants = {
    visible: (i: number) => ({
      opacity: 1,
      filter: 'blur(0px)',
      transition: {
        delay: i * 0.15,
        duration: 0.45,
      },
    }),
    hidden: {
      filter: 'blur(10px)',
      opacity: 0,
    },
  }

  return (
    <section
      className="w-full py-4 sm:py-6 px-3 sm:px-6"
      ref={heroRef}
    >
      <div className="max-w-5xl mx-auto rounded-2xl bg-card border border-border/60 p-5 sm:p-7 md:p-8 shadow-sm text-card-foreground">
        {/* Header with badge & social links */}
        <div className="flex justify-between items-center mb-5 pb-3 border-b border-border/40">
          <div className="flex items-center gap-2">
            <span className="text-red-500 animate-spin text-sm leading-none">✱</span>
            <TimelineContent
              as="span"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="text-xs font-semibold tracking-wider uppercase text-muted-foreground"
            >
              Who I Am
            </TimelineContent>
          </div>

          <div className="flex items-center gap-2">
            <TimelineContent
              as="a"
              animationNum={0}
              timelineRef={heroRef}
              customVariants={revealVariants}
              href="https://www.facebook.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/80 flex items-center justify-center transition-colors"
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/80 flex items-center justify-center transition-colors"
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/80 flex items-center justify-center transition-colors"
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
              className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg border border-border/60 bg-muted/40 hover:bg-muted/80 flex items-center justify-center transition-colors"
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

        {/* Hero Artwork with Silhouette Cutout */}
        <TimelineContent
          as="figure"
          animationNum={4}
          timelineRef={heroRef}
          customVariants={scaleVariants}
          className="relative overflow-hidden rounded-xl border border-border/50 shadow-xs mb-5 max-h-[220px] sm:max-h-[260px] w-full bg-muted/30"
        >
          <svg
            className="w-full h-auto block"
            width="100%"
            height="100%"
            viewBox="0 0 100 40"
          >
            <defs>
              <clipPath id="clip-inverted" clipPathUnits="objectBoundingBox">
                <path
                  d="M0.0998072 1H0.422076H0.749756C0.767072 1 0.774207 0.961783 0.77561 0.942675V0.807325C0.777053 0.743631 0.791844 0.731953 0.799059 0.734076H0.969813C0.996268 0.730255 1.00088 0.693206 0.999875 0.675159V0.0700637C0.999875 0.0254777 0.985045 0.00477707 0.977629 0H0.902473C0.854975 0 0.890448 0.138535 0.850165 0.138535H0.0204424C0.00408849 0.142357 0 0.180467 0 0.199045V0.410828C0 0.449045 0.0136283 0.46603 0.0204424 0.469745H0.0523086C0.0696245 0.471019 0.0735527 0.497877 0.0733523 0.511146V0.915605C0.0723903 0.983121 0.090588 1 0.0998072 1Z"
                  fill="#D9D9D9"
                />
              </clipPath>
            </defs>
            <image
              clipPath="url(#clip-inverted)"
              preserveAspectRatio="xMidYMid slice"
              width="100%"
              height="100%"
              xlinkHref="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1600&q=80"
            />
          </svg>
        </TimelineContent>

        {/* Clean Compact Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 p-3.5 rounded-xl bg-muted/40 border border-border/50 mb-6 text-center sm:text-left">
          <TimelineContent
            as="div"
            animationNum={5}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col justify-center px-3 py-1"
          >
            <span className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight">10+</span>
            <span className="text-xs text-muted-foreground font-medium">Years Experience</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={6}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col justify-center px-3 py-1 border-l border-border/40"
          >
            <span className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight">3M+</span>
            <span className="text-xs text-muted-foreground font-medium">Words Crafted</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={7}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col justify-center px-3 py-1 border-t md:border-t-0 md:border-l border-border/40"
          >
            <span className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight">100+</span>
            <span className="text-xs text-muted-foreground font-medium">Global Brands</span>
          </TimelineContent>

          <TimelineContent
            as="div"
            animationNum={8}
            timelineRef={heroRef}
            customVariants={revealVariants}
            className="flex flex-col justify-center px-3 py-1 border-t md:border-t-0 border-l border-border/40"
          >
            <span className="text-xl sm:text-2xl font-bold text-red-500 tracking-tight">30%</span>
            <span className="text-xs text-muted-foreground font-medium">Higher Engagement</span>
          </TimelineContent>
        </div>

        {/* Main Content Grid */}
        <div className="grid md:grid-cols-3 gap-6 items-stretch">
          <div className="md:col-span-2 flex flex-col justify-between">
            <h1 className="text-xl sm:text-2xl md:text-3xl font-bold tracking-tight text-foreground mb-4 leading-tight">
              <VerticalCutReveal
                splitBy="words"
                staggerDuration={0.08}
                staggerFrom="first"
                reverse={true}
                transition={{
                  type: 'spring',
                  stiffness: 240,
                  damping: 28,
                  delay: 0.2,
                }}
              >
                Crafting Words That Make a Difference.
              </VerticalCutReveal>
            </h1>

            <TimelineContent
              as="div"
              animationNum={9}
              timelineRef={heroRef}
              customVariants={revealVariants}
              className="grid sm:grid-cols-2 gap-4 text-xs sm:text-sm text-muted-foreground leading-relaxed"
            >
              <p className="text-justify">
                My journey began as a passionate writer and evolved into a
                strategic copywriting career. I specialize in transforming
                ideas into compelling content that helps brands scale and build authority.
              </p>
              <p className="text-justify">
                Every brand has a story, and I specialize in telling yours
                with clarity and impact. By blending creativity with data-driven strategy,
                I write content that resonates deeply with target audiences.
              </p>
            </TimelineContent>
          </div>

          <div className="md:col-span-1">
            <div className="h-full p-4 sm:p-5 rounded-xl bg-muted/30 border border-border/50 flex flex-col justify-between text-left">
              <div>
                <TimelineContent
                  as="div"
                  animationNum={12}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-red-500 text-lg sm:text-xl font-bold tracking-wide"
                >
                  SANGVI
                </TimelineContent>
                <TimelineContent
                  as="div"
                  animationNum={13}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="text-muted-foreground text-xs font-medium mb-3"
                >
                  Copywriter | Content Strategist
                </TimelineContent>

                <TimelineContent
                  as="div"
                  animationNum={14}
                  timelineRef={heroRef}
                  customVariants={revealVariants}
                  className="mb-4"
                >
                  <p className="text-xs sm:text-sm font-medium text-foreground/90 leading-snug">
                    Ready to transform your brand's message into measurable results?
                  </p>
                </TimelineContent>
              </div>

              <TimelineContent
                as="button"
                animationNum={15}
                timelineRef={heroRef}
                customVariants={revealVariants}
                className="w-full inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-foreground text-background hover:opacity-90 transition-all font-semibold text-xs sm:text-sm shadow-xs cursor-pointer group"
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
