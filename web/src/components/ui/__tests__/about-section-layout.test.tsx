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
import { render, screen } from '@testing-library/react'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import { AboutSection3 } from '../about-section'

// jsdom has no IntersectionObserver; framer-motion's useInView requires one.
class IntersectionObserverMock {
  observe(): void {}
  unobserve(): void {}
  disconnect(): void {}
  takeRecords(): IntersectionObserverEntry[] {
    return []
  }
}

describe('AboutSection3 layout', () => {
  beforeEach(() => {
    vi.stubGlobal('IntersectionObserver', IntersectionObserverMock)
  })

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('renders the collaborate CTA as a single native button', () => {
    render(<AboutSection3 />)

    const cta = screen.getByRole('button', { name: /let's collaborate/i })

    expect(cta.tagName).toBe('BUTTON')
    expect(cta).toHaveAttribute('type', 'button')
    // The CTA must not be nested inside another interactive element.
    expect(cta.parentElement?.closest('button, a')).toBeNull()
  })

  it('renders social links with accessible names inside a wrapping row', () => {
    render(<AboutSection3 />)

    const links = ['Facebook', 'Instagram', 'LinkedIn', 'YouTube'].map((name) =>
      screen.getByRole('link', { name })
    )

    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
    // Wrapping keeps the icon row from overflowing into the badge on narrow screens.
    expect(links[0].parentElement).toHaveClass('flex-wrap')
  })
})
