import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import Header from './components/Header'
import CartProvider from './components/CartContest'

import { getCart, clearCart } from '@/api/cart'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export const dynamic = 'force-dynamic'

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const clearCartAction = async () => {
    'use server'
    return await clearCart()
  }

  const cart = await getCart()

  return (
    <html lang='en'>
      <body className={inter.className}>
        <CartProvider cart={cart}>
          <Header clearCartAction={clearCartAction} />
          <main className='mx-auto max-w-3xl'>{children}</main>
        </CartProvider>
      </body>
    </html>
  )
}
