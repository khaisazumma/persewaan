import type { CartItem } from './types'

const CART_KEY = 'wexplore_cart'

export function getCart(): CartItem[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(CART_KEY)
    return data ? JSON.parse(data) : []
  } catch {
    return []
  }
}

export function saveCart(cart: CartItem[]): void {
  if (typeof window === 'undefined') return
  localStorage.setItem(CART_KEY, JSON.stringify(cart))
  dispatchCartUpdate()
}

export function addToCart(item: CartItem): void {
  const cart = getCart()
  const existingIndex = cart.findIndex(
    c => c.id === item.id && c.type === item.type && c.durasi === item.durasi
  )

  if (existingIndex >= 0) {
    cart[existingIndex].qty += item.qty
  } else {
    cart.push(item)
  }

  saveCart(cart)
}

export function removeFromCart(id: string, type: string): void {
  const cart = getCart().filter(item => !(item.id === id && item.type === type))
  saveCart(cart)
}

export function updateQty(id: string, type: string, qty: number): void {
  const cart = getCart()
  const item = cart.find(item => item.id === id && item.type === type)
  if (item) {
    item.qty = Math.max(1, qty)
    saveCart(cart)
  }
}

export function clearCart(): void {
  saveCart([])
}

export function getCartCount(): number {
  return getCart().reduce((sum, item) => sum + item.qty, 0)
}

export function getCartTotal(): number {
  return getCart().reduce((sum, item) => sum + (item.harga * item.qty), 0)
}

export function getPackageSubtotal(): number {
  return getCart()
    .filter(item => item.type === 'package')
    .reduce((sum, item) => sum + (item.harga * item.qty), 0)
}

export function getProductSubtotal(): number {
  return getCart()
    .filter(item => item.type === 'product')
    .reduce((sum, item) => sum + (item.harga * item.qty), 0)
}

function dispatchCartUpdate(): void {
  if (typeof window === 'undefined') return
  window.dispatchEvent(new CustomEvent('cartUpdated'))
}
