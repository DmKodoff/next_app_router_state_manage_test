'use client'
import React, { useState, createContext } from 'react'
import { type Cart } from '@/api/types'

const useCartState = () => useState<Cart>({ products: [] })

export const CartContext = createContext<ReturnType<
  typeof useCartState
> | null>(null)

const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const cartState = useCartState()
  return (
    <CartContext.Provider value={cartState}>{children}</CartContext.Provider>
  )
}

export const useCart = () => {
  const cartState = React.useContext(CartContext)
  if (!cartState) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return cartState
}

export default CartProvider
