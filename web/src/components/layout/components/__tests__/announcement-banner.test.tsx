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
import { cleanup, fireEvent, render, screen } from '@testing-library/react'
import { afterEach, describe, expect, it } from 'vitest'

import { AnnouncementBanner } from '../announcement-banner'

afterEach(() => {
  cleanup()
})

async function renderBanner() {
  const router = createRouter({
    routeTree: createRootRoute({
      component: () => <AnnouncementBanner />,
    }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  render(<RouterProvider router={router} />)
  return screen.findByRole('region', { name: 'Announcement' })
}

describe('AnnouncementBanner', () => {
  it('uses theme primary tokens instead of a hardcoded colour', async () => {
    const banner = await renderBanner()

    expect(banner).toHaveClass('bg-primary', 'text-primary-foreground')
    expect(banner.className).not.toMatch(/#[0-9a-f]{3,6}/i)
  })

  it('links the claim action to sign-in when signed out', async () => {
    await renderBanner()

    const link = screen.getByRole('link', { name: /Claim Now/ })
    expect(link).toHaveAttribute('href', '/sign-in')
  })

  it('removes the banner when the dismiss button is clicked', async () => {
    await renderBanner()

    fireEvent.click(
      screen.getByRole('button', { name: 'Dismiss announcement' })
    )

    expect(
      screen.queryByRole('region', { name: 'Announcement' })
    ).not.toBeInTheDocument()
  })
})
