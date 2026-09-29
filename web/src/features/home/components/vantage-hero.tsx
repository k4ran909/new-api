/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/

import { Link } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'

import '../vantage-landing.css'

const HERO_VIDEO_SRC =
  'https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4'

type VantageHeroProps = {
  isAuthenticated: boolean
}

export function VantageHero(props: VantageHeroProps) {
  const { t } = useTranslation()
  const [isMotionPending, setIsMotionPending] = useState(true)

  // Entrance choreography; skipped entirely when the user prefers reduced motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMotionPending(false)
      return
    }

    const timer = setTimeout(() => setIsMotionPending(false), 1600)
    return () => clearTimeout(timer)
  }, [])

  return (
    <section
      className='vantage-viewport'
      aria-labelledby='vantage-hero-title'
      data-testid='vantage-hero'
    >
      <div className={`vantage-screen ${isMotionPending ? 'motion-pending' : ''}`}>
        <video
          className='background'
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden='true'
        >
          <source src={HERO_VIDEO_SRC} type='video/mp4' />
        </video>

        <div className='hero'>
          <div className='hero-content'>
            <h1 className='hero-title' id='vantage-hero-title'>
              <span className='line line-one'>
                <span className='line-reveal'>{t('Stop Digging')}</span>
              </span>
              <span className='line line-two'>
                <span className='line-reveal'>{t('Through Dashboards.')}</span>
              </span>
            </h1>

            <p className='hero-copy'>
              {t(
                'Your metrics are scattered across a dozen dashboards. Bring them into one clear signal, so every decision is backed by data you actually trust.'
              )}
            </p>

            <Link
              className='primary-cta'
              to={props.isAuthenticated ? '/dashboard' : '/sign-up'}
            >
              <span className='label'>
                {props.isAuthenticated ? t('Go to Dashboard') : t('Get Started')}
              </span>
              <span className='arrow-box' aria-hidden='true'>
                <svg
                  width='14'
                  height='14'
                  viewBox='0 0 14 14'
                  fill='none'
                  stroke='#fff'
                  strokeWidth='1.75'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                >
                  <path d='M2.5 7h9M7.5 3l4 4-4 4' />
                </svg>
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
