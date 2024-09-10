import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';

// Define the structure of a product in the cart
export interface CartItem {
  productId: string;
  quantity: number;
  description?: string; // Add this line
  items: Array<{ 
    price: { regular: number },
    image?: { url: string }  // Add this line
  }>;
  // Add other product properties as needed
}

// Define the structure of the cart state
export interface CartState {
  cart: CartItem[];
  cartTotal: number;
  totalItems: number;
  addToCart: (args: { product: CartItem; quantity: number }) => void;
  setCartQuantity: (args: { productId: string; quantity: number }) => void;
  removeFromCart: (productId: string) => void;
  clearCart: () => void;
}

// Define the type for the persist middleware
type CartPersist = (
  config: (set: any, get: any, api: any) => CartState,
  options: PersistOptions<CartState>
) => (set: any, get: any, api: any) => CartState;

const useCartStore = create(
  (persist as unknown as CartPersist)(
    (set) => ({
      cart: [],
      cartTotal: 0,
      totalItems: 0,
      addToCart: ({ product, quantity }: { product: CartItem; quantity: number }) => 
        set((state: CartState) => {
          console.log(product);
          const existingProductIndex = state.cart.findIndex((item) => item.productId === product.productId);
          const additionalQuantity = parseInt(quantity.toString(), 10);
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
          const existingProductIndex = state.cart.findIndex((item) => item.productId === productId);
          const newQuantity = parseInt(quantity.toString(), 10);
          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cart];
            updatedCart[existingProductIndex].quantity = newQuantity;
            return {
              cart: updatedCart,
              cartTotal: calculateCartTotal(updatedCart),
              totalItems: calculateTotalItems(updatedCart),
            };
          }
          return state; // Return the current state if product not found
        }),
      removeFromCart: (productId: string) => 
        set((state: CartState) => {
          const updatedCart = state.cart.filter((item) => item.productId !== productId);
          return {
            cart: updatedCart,
            cartTotal: calculateCartTotal(updatedCart),
            totalItems: calculateTotalItems(updatedCart),
          };
        }),
      clearCart: () => set({ cart: [], cartTotal: 0, totalItems: 0 }),
    }),
    {
      name: 'cart-storage', // unique name for the store
    }
  )
);

function calculateCartTotal(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + (item.items[0]?.price?.regular * item.quantity || 0), 0);
}

function calculateTotalItems(cart: CartItem[]): number {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export default useCartStore;