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

import { useNavigate } from '@tanstack/react-router'
import { useEffect, useState } from 'react'
import { toast } from 'sonner'

import { useSystemConfig } from '@/hooks/use-system-config'
import { useAuthStore } from '@/stores/auth-store'

import './vantage-landing.css'

export function Home() {
  const navigate = useNavigate()
  const { auth } = useAuthStore()
  const isAuthenticated = !!auth.user
  const { systemName } = useSystemConfig()

  const [menuOpen, setMenuOpen] = useState(false)
  const [contactModalOpen, setContactModalOpen] = useState(false)
  const [isMotionPending, setIsMotionPending] = useState(true)

  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' })

  // Motion choreography
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsMotionPending(false)
      return
    }

    const timer = setTimeout(() => {
      setIsMotionPending(false)
    }, 1600)

    return () => clearTimeout(timer)
  }, [])

  // Keyboard navigation & Escape dismiss
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (contactModalOpen) setContactModalOpen(false)
        else if (menuOpen) setMenuOpen(false)
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [contactModalOpen, menuOpen])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    toast.success('Thank you! Your message has been received.')
    setContactModalOpen(false)
    setContactForm({ name: '', email: '', message: '' })
  }

  const handlePrimaryCtaClick = () => {
    if (isAuthenticated) {
      void navigate({ to: '/dashboard' })
    } else {
      void navigate({ to: '/sign-up' })
    }
  }

  const handleSignUpClick = () => {
    if (isAuthenticated) {
      void navigate({ to: '/dashboard' })
    } else {
      void navigate({ to: '/sign-up' })
    }
  }

  return (
    <main className="vantage-viewport">
      <section
        className={`vantage-screen ${isMotionPending ? 'motion-pending' : ''}`}
        id="screen"
      >
        <video
          className="background"
          autoPlay
          muted
          loop
          playsInline
          disablePictureInPicture
          aria-hidden="true"
        >
          <source
            src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260808_064556_051587f1-74a1-4336-8c05-4dde3594ed05.mp4"
            type="video/mp4"
          />
        </video>

        <header className={`header ${menuOpen ? 'menu-open' : ''}`}>
          <a
            className="brand"
            href="/"
            onClick={(e) => {
              e.preventDefault()
              void navigate({ to: '/' })
            }}
            aria-label={`${systemName || 'Vantage'} home`}
          >
            <svg
              width="25"
              height="25"
              viewBox="0 0 25 25"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <clipPath id="react-brand-disc">
                  <circle cx="12.5" cy="12.5" r="12.5" />
                </clipPath>
              </defs>
              <g clipPath="url(#react-brand-disc)">
                <rect width="25" height="25" fill="#ededed" />
                <polygon points="12.5,2 21,12.5 12.5,23 4,12.5" fill="#050606" />
                <polygon points="12.5,2 18,9 12.5,12.5 7,9" fill="#737778" />
                <polygon points="12.5,12.5 21,12.5 15,19 12.5,23" fill="#0a0b0b" />
                <polygon points="4,12.5 12.5,12.5 10,19 12.5,23" fill="#fafafa" />
                <polygon points="10,9 12.5,4 15,9 12.5,14" fill="#ededed" />
              </g>
            </svg>
          </a>

          <div className="header-actions" id="tablet-navigation">
            <nav className="nav">
              <button
                type="button"
                className="nav-link active"
                onClick={() => {
                  setMenuOpen(false)
                  void navigate({ to: '/' })
                }}
              >
                Home
              </button>
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  setMenuOpen(false)
                  void navigate({ to: '/about' })
                }}
              >
                About
              </button>
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  setMenuOpen(false)
                  void navigate({ to: '/pricing' })
                }}
              >
                Services
              </button>
              <button
                type="button"
                className="nav-link"
                onClick={() => {
                  setMenuOpen(false)
                  setContactModalOpen(true)
                }}
              >
                Contact
              </button>
            </nav>

            <div className="time-panel">
              <span className="time-label">Timezone</span>
              <span className="time-value">9:47 PM&nbsp; • &nbsp;14 July 2026</span>
            </div>

            <button
              className="sign-up"
              type="button"
              onClick={handleSignUpClick}
            >
              {isAuthenticated ? 'Console' : 'Sign Up'}
            </button>
          </div>

          <button
            className="menu-toggle"
            type="button"
            aria-label="Toggle navigation"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              stroke="#fff"
              strokeWidth="1.75"
              strokeLinecap="round"
            >
              <line className="menu-line-top" x1="3" y1="7" x2="17" y2="7" />
              <line className="menu-line-bottom" x1="3" y1="13" x2="17" y2="13" />
            </svg>
          </button>
        </header>

        <section className="hero">
          <div className="hero-content">
            <h1 className="hero-title">
              <span className="line line-one">
                <span className="line-reveal">Stop Digging</span>
              </span>
              <span className="line line-two">
                <span className="line-reveal">Through Dashboards.</span>
              </span>
            </h1>

            <p className="hero-copy">
              Your metrics are scattered across a dozen dashboards.<br />
              Vantage bring them into one clear signal, so every<br />
              decision is backed by data you actually trust.
            </p>

            <button
              className="primary-cta"
              type="button"
              onClick={handlePrimaryCtaClick}
            >
              <span className="label">
                {isAuthenticated ? 'Go to Console' : 'Get Started'}
              </span>
              <span className="arrow-box">
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="#fff"
                  strokeWidth="1.75"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M2.5 7h9M7.5 3l4 4-4 4" />
                </svg>
              </span>
            </button>
          </div>
        </section>
      </section>

      {/* Contact Modal */}
      {contactModalOpen && (
        <div
          className="vantage-modal-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Contact Vantage"
        >
          <div
            className="vantage-modal-backdrop"
            onClick={() => setContactModalOpen(false)}
          />
          <div className="vantage-modal-container vantage-contact-wrap">
            <div className="vantage-modal-header">
              <div className="vantage-modal-title-wrap">
                <span
                  className="vantage-modal-status-dot"
                  style={{ background: '#00ff88', boxShadow: '0 0 12px #00ff88' }}
                />
                <span className="vantage-modal-title">
                  Contact {systemName || 'Vantage'}
                </span>
              </div>
              <button
                className="vantage-modal-close"
                type="button"
                aria-label="Close contact dialog"
                onClick={() => setContactModalOpen(false)}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                >
                  <path d="M2 2l10 10M12 2L2 12" />
                </svg>
              </button>
            </div>
            <form className="vantage-contact-body" onSubmit={handleContactSubmit}>
              <div className="vantage-field-group">
                <label className="vantage-field-label" htmlFor="v-name">
                  Name
                </label>
                <input
                  id="v-name"
                  className="vantage-input"
                  type="text"
                  placeholder="Your name or team"
                  value={contactForm.name}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, name: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="vantage-field-group">
                <label className="vantage-field-label" htmlFor="v-email">
                  Email
                </label>
                <input
                  id="v-email"
                  className="vantage-input"
                  type="email"
                  placeholder="you@company.com"
                  value={contactForm.email}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, email: e.target.value }))
                  }
                  required
                />
              </div>
              <div className="vantage-field-group">
                <label className="vantage-field-label" htmlFor="v-message">
                  Message
                </label>
                <textarea
                  id="v-message"
                  className="vantage-textarea"
                  placeholder="Tell us about your questions or requirements..."
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm((prev) => ({ ...prev, message: e.target.value }))
                  }
                  required
                />
              </div>
              <button className="vantage-submit-btn" type="submit">
                Send Message
              </button>
            </form>
          </div>
        </div>
      )}
    </main>
  )
}
