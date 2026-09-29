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
import { afterEach, describe, expect, it, vi } from 'vitest'

import { AuthButtons, type AuthButtonsProps } from '../auth-buttons'

afterEach(() => {
  cleanup()
})

async function renderAuthButtons(props: AuthButtonsProps = {}) {
  const router = createRouter({
    routeTree: createRootRoute({
      component: () => <AuthButtons {...props} />,
    }),
    history: createMemoryHistory({ initialEntries: ['/'] }),
  })
  await router.load()
  return render(<RouterProvider router={router} />)
}

describe('AuthButtons', () => {
  it('renders sign in and sign up as links to their auth routes', async () => {
    await renderAuthButtons()

    expect(
      await screen.findByRole('link', { name: 'Sign in' })
    ).toHaveAttribute('href', '/sign-in')
    expect(screen.getByRole('link', { name: 'Sign up' })).toHaveAttribute(
      'href',
      '/sign-up'
    )
  })

  it('uses the same height for both buttons in the default size', async () => {
    await renderAuthButtons()

    const signIn = await screen.findByRole('link', { name: 'Sign in' })
    const signUp = screen.getByRole('link', { name: 'Sign up' })
    expect(signIn).toHaveClass('h-9')
    expect(signUp).toHaveClass('h-9')
  })

  it('uses the compact height for both buttons when compact is set', async () => {
    await renderAuthButtons({ compact: true })

    const signIn = await screen.findByRole('link', { name: 'Sign in' })
    const signUp = screen.getByRole('link', { name: 'Sign up' })
    expect(signIn).toHaveClass('h-7')
    expect(signUp).toHaveClass('h-7')
  })

  it('calls onNavigate when a link is clicked so a mobile menu can close', async () => {
    const onNavigate = vi.fn()
    await renderAuthButtons({ onNavigate })

    fireEvent.click(await screen.findByRole('link', { name: 'Sign in' }))

    expect(onNavigate).toHaveBeenCalledTimes(1)
  })
})
