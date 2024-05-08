import { create, SetState } from 'zustand';
import { persist } from 'zustand/middleware';

interface Product {
  productId: string;
  price: { regular: number };
  [key: string]: any;
}

interface CartItem extends Product {
  quantity: number;
}

interface CartState {
  cart: CartItem[];
  cartTotal: number;
  totalItems: number;
  addToCart: (args: { product: Product; quantity: number }) => void;
  setCartQuantity: (args: { productId: string; quantity: number }) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

const useCartStore = create<CartState>(
  persist(
    (set: SetState<CartState>) => ({
      cart: [],
      cartTotal: 0,
      totalItems: 0,
      addToCart: ({ product, quantity }: { product: Product; quantity: number }) =>
        set((state: CartState) => {
          const existingProductIndex = state.cart.findIndex(
            (item) => item.productId === product.productId
          );
          const additionalQuantity = quantity;
          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity += additionalQuantity;
            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              totalItems: calculateTotalItems(updatedCart),
            };
          } else {
            const newProduct = { ...product, quantity: additionalQuantity };
            return {
              cart: [...state.cart, newProduct],
              cartTotal: calculateCartTotal([...state.cart, newProduct]),
              totalItems: calculateTotalItems([...state.cart, newProduct]),
            };
          }
        }),
      setCartQuantity: ({ productId, quantity }: { productId: string; quantity: number }) =>
        set((state: CartState) => {
          const existingProductIndex = state.cart.findIndex(
            (item) => item.productId === productId
          );
          const newQuantity = quantity;
          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity = newQuantity;
            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              totalItems: calculateTotalItems(updatedCart),
            };
          }
          return state;
        }),
      removeFromCart: (productId: string) =>
        set((state: CartState) => {
          const updatedCart = state.cart.filter(
            (item) => item.productId !== productId
          );
          return {
            cart: updatedCart,
            cartTotal: calculateCartTotal(updatedCart),
            totalItems: calculateTotalItems(updatedCart),
          };
        }),
      clearCart: () => set({ cart: [], cartTotal: 0, totalItems: 0 }),
    }),
    { name: 'cart-storage' }
  )
);

function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce(
    (total, item) => total + (item.price?.regular * item.quantity || 0),
    0
  );
}

function calculateTotalItems(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export default useCartStore;