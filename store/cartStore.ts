import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
    id: number;
    name: string;
    price: number;
    quantity: number;
    image: string;
    gender: string;
}

interface CartState {
    items: CartItem[];
    addItem: (item: Omit<CartItem, 'quantity'>) => void;
    removeItem: (id: number) => void;
    updateQuantity: (id: number, quantity: number) => void;
    clearCart: () => void;
    totalItems: () => number;
    totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
    persist(
        (set, get) => ({
            items: [],
            addItem: (item) => set((state) => {
                const existingItem = state.items.find((i) => i.id === item.id);
                if (existingItem) {
                    return {
                        items: state.items.map((i) =>
                            i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i
                        ),
                    };
                }
                return { items: [...state.items, { ...item, quantity: 1 }] };
            }),
            removeItem: (id) => set((state) => ({
                items: state.items.filter((i) => i.id !== id),
            })),
            updateQuantity: (id, quantity) => set((state) => ({
                items: state.items.map((i) => (i.id === id ? { ...i, quantity } : i)),
            })),
            clearCart: () => set({ items: [] }),
            totalItems: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.quantity, 0);
            },
            totalPrice: () => {
                const { items } = get();
                return items.reduce((total, item) => total + item.price * item.quantity, 0);
            },
        }),
        {
            name: 'cart-storage',
        }
    )
);
