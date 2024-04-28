import { create } from 'zustand';
import { persist } from 'zustand/middleware'

const useCartStore = create(persist(
  (set) => ({
    cart: [],
    cartTotal: 0,
    totalItems: 0,
    addToCart: ({ product, quantity }) => set((state) => {
      console.log(product)
      const existingProductIndex = state.cart.findIndex((item) => item.productId === product.productId);
      const additionalQuantity = parseInt(quantity, 10);
      if (existingProductIndex !== -1) {
        // If the product already exists, increment the quantity
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += additionalQuantity;
        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
      } else {
        // If the product doesn't exist, add it to the cart with the initial quantity
        const newProduct = { ...product, quantity: additionalQuantity };
        return {
          cart: [...state.cart, newProduct],
          cartTotal: calculateCartTotal([...state.cart, newProduct]),
          totalItems: calculateTotalItems([...state.cart, newProduct]),
        };
      }
    }),
    setCartQuantity: ({ productId, quantity }) => set((state) => {
      const existingProductIndex = state.cart.findIndex((item) => item.productId === productId);
      const newQuantity = parseInt(quantity, 10);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity = newQuantity;
        return {
          cart: updatedCart,
          cartTotal: calculateCartTotal(updatedCart),
          totalItems: calculateTotalItems(updatedCart),
        };
      }
      // Optionally handle the case where the product is not found in the cart
    }),
    removeFromCart: (productId) => set((state) => {
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
));

function calculateCartTotal(cart) {
  return cart.reduce((total, item) => total + (item.items[0]?.price?.regular * item.quantity || 0), 0);
}

function calculateTotalItems(cart) {
  return cart.reduce((total, item) => total + item.quantity, 0);
}

export default useCartStore;