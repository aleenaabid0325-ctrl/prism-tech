'use client'

import { createContext, useContext, useMemo, useReducer, type ReactNode } from 'react'
import { products, type Product } from '@/lib/products'

export type CartItem = { product: Product; qty: number }
export type Order = {
  id: string
  date: string
  items: CartItem[]
  total: number
  status: 'Delivered' | 'Shipped' | 'Processing'
}

type State = {
  cart: CartItem[]
  wishlist: string[]
  orders: Order[]
}

type Action =
  | { type: 'ADD'; product: Product; qty?: number }
  | { type: 'REMOVE'; id: string }
  | { type: 'SET_QTY'; id: string; qty: number }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_WISH'; id: string }
  | { type: 'PLACE_ORDER' }

function seedOrders(): Order[] {
  return [
    {
      id: 'VLT-90241',
      date: 'Aug 22, 2026',
      status: 'Delivered',
      total: 628,
      items: [
        { product: products[0], qty: 1 },
        { product: products[6], qty: 1 },
      ],
    },
    {
      id: 'VLT-88117',
      date: 'Jul 03, 2026',
      status: 'Delivered',
      total: 1099,
      items: [{ product: products[3], qty: 1 }],
    },
  ]
}

const initialState: State = { cart: [], wishlist: ['nova-watch', 'echo-speaker'], orders: seedOrders() }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'ADD': {
      const existing = state.cart.find((i) => i.product.id === action.product.id)
      if (existing) {
        return {
          ...state,
          cart: state.cart.map((i) =>
            i.product.id === action.product.id ? { ...i, qty: i.qty + (action.qty ?? 1) } : i,
          ),
        }
      }
      return { ...state, cart: [...state.cart, { product: action.product, qty: action.qty ?? 1 }] }
    }
    case 'REMOVE':
      return { ...state, cart: state.cart.filter((i) => i.product.id !== action.id) }
    case 'SET_QTY':
      return {
        ...state,
        cart: state.cart
          .map((i) => (i.product.id === action.id ? { ...i, qty: Math.max(1, action.qty) } : i))
          .filter((i) => i.qty > 0),
      }
    case 'CLEAR_CART':
      return { ...state, cart: [] }
    case 'TOGGLE_WISH':
      return {
        ...state,
        wishlist: state.wishlist.includes(action.id)
          ? state.wishlist.filter((w) => w !== action.id)
          : [...state.wishlist, action.id],
      }
    case 'PLACE_ORDER': {
      if (state.cart.length === 0) return state
      const total = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0)
      const order: Order = {
        id: 'VLT-' + Math.floor(10000 + Math.random() * 89999),
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: '2-digit', year: 'numeric' }),
        status: 'Processing',
        total,
        items: state.cart,
      }
      return { ...state, cart: [], orders: [order, ...state.orders] }
    }
    default:
      return state
  }
}

type StoreContext = {
  cart: CartItem[]
  wishlist: string[]
  orders: Order[]
  cartCount: number
  cartTotal: number
  add: (product: Product, qty?: number) => void
  remove: (id: string) => void
  setQty: (id: string, qty: number) => void
  clearCart: () => void
  toggleWish: (id: string) => void
  isWished: (id: string) => boolean
  placeOrder: () => void
}

const Ctx = createContext<StoreContext | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  const value = useMemo<StoreContext>(() => {
    const cartCount = state.cart.reduce((s, i) => s + i.qty, 0)
    const cartTotal = state.cart.reduce((s, i) => s + i.product.price * i.qty, 0)
    return {
      cart: state.cart,
      wishlist: state.wishlist,
      orders: state.orders,
      cartCount,
      cartTotal,
      add: (product, qty) => dispatch({ type: 'ADD', product, qty }),
      remove: (id) => dispatch({ type: 'REMOVE', id }),
      setQty: (id, qty) => dispatch({ type: 'SET_QTY', id, qty }),
      clearCart: () => dispatch({ type: 'CLEAR_CART' }),
      toggleWish: (id) => dispatch({ type: 'TOGGLE_WISH', id }),
      isWished: (id) => state.wishlist.includes(id),
      placeOrder: () => dispatch({ type: 'PLACE_ORDER' }),
    }
  }, [state])

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>
}

export function useStore() {
  const ctx = useContext(Ctx)
  if (!ctx) throw new Error('useStore must be used within CartProvider')
  return ctx
}
