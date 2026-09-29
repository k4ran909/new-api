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
import {
  createMemoryHistory,
  createRootRoute,
  createRouter,
  RouterProvider,
} from '@tanstack/react-router'
import { cleanup, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { VantageHero } from '../components/vantage-hero'

afterEach(() => {
  cleanup()
})

async function renderHero(isAuthenticated: boolean) {
  const router = createRouter({
    routeTree: createRootRoute({
      component: () => <VantageHero isAuthenticated={isAuthenticated} />,
    }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  return render(<RouterProvider router={router} />)
}

describe('VantageHero', () => {
  it('links signed-out visitors to sign up from the primary CTA', async () => {
    await renderHero(false)

    expect(
      await screen.findByRole('link', { name: 'Get Started' })
    ).toHaveAttribute('href', '/sign-up')
  })

  it('links signed-in users to the dashboard from the primary CTA', async () => {
    await renderHero(true)

    expect(
      await screen.findByRole('link', { name: 'Go to Dashboard' })
    ).toHaveAttribute('href', '/dashboard')
  })

  it('exposes the hero as a region labelled by its heading', async () => {
    await renderHero(false)

    const heading = await screen.findByRole('heading', { level: 1 })
    expect(heading).toHaveTextContent('Stop Digging')
    expect(screen.getByRole('region', { name: /Stop Digging/ })).toBe(
      screen.getByTestId('vantage-hero')
    )
  })

  it('renders as a scrollable in-flow section rather than a fixed overlay', async () => {
    await renderHero(false)

    // The hero must not trap the page: the class that used to be fixed is now
    // relative, so the sections below it are reachable by scrolling.
    const hero = await screen.findByTestId('vantage-hero')
    expect(hero.tagName).toBe('SECTION')
    expect(hero.closest('[style*="position: fixed"]')).toBeNull()
  })
})
