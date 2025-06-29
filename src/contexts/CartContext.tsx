import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

interface CartItem {
  id: string;
  pizzaId: string;
  name: string;
  size: string;
  price: number;
  quantity: number;
  image: string;
  dough?: string;
  crust?: string;
  extras?: Array<{
    id: string;
    name: string;
    price: number;
  }>;
  notes?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  deliveryFee: number;
  discount: number;
  promoCode?: string;
  savedForLater: CartItem[];
  recentlyRemoved: CartItem[];
}

interface CartSummary {
  subtotal: number;
  deliveryFee: number;
  discount: number;
  tax: number;
  total: number;
  loyaltyDiscount: number;
  promoDiscount: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'id'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'UPDATE_ITEM'; payload: { id: string; updates: Partial<CartItem> } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] }
  | { type: 'APPLY_PROMO'; payload: { code: string; discount: number } }
  | { type: 'REMOVE_PROMO' }
  | { type: 'SAVE_FOR_LATER'; payload: string }
  | { type: 'MOVE_TO_CART'; payload: string }
  | { type: 'SET_DELIVERY_FEE'; payload: number }
  | { type: 'RESTORE_ITEM'; payload: CartItem };

const CartContext = createContext<{
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addItem: (item: Omit<CartItem, 'id'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  updateItem: (id: string, updates: Partial<CartItem>) => void;
  clearCart: () => void;
  getItemsCount: () => number;
  getCartSummary: () => CartSummary;
  applyPromoCode: (code: string) => Promise<boolean>;
  removePromoCode: () => void;
  saveForLater: (id: string) => void;
  moveToCart: (id: string) => void;
  restoreItem: (item: CartItem) => void;
  duplicateItem: (id: string) => void;
  getRecommendations: () => any[];
} | null>(null);

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.pizzaId === action.payload.pizzaId && 
                item.size === action.payload.size &&
                item.dough === action.payload.dough &&
                item.crust === action.payload.crust
      );

      let newItems;
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        const newItem = {
          ...action.payload,
          id: `${action.payload.pizzaId}-${action.payload.size}-${Date.now()}`
        };
        newItems = [...state.items, newItem];
      }

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;

      return { 
        ...state, 
        items: newItems, 
        total,
        deliveryFee
      };
    }

    case 'REMOVE_ITEM': {
      const itemToRemove = state.items.find(item => item.id === action.payload);
      const newItems = state.items.filter(item => item.id !== action.payload);
      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;
      
      return { 
        ...state, 
        items: newItems, 
        total,
        deliveryFee,
        recentlyRemoved: itemToRemove ? [itemToRemove, ...state.recentlyRemoved.slice(0, 4)] : state.recentlyRemoved
      };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;

      return { 
        ...state, 
        items: newItems, 
        total,
        deliveryFee
      };
    }

    case 'UPDATE_ITEM': {
      const newItems = state.items.map(item =>
        item.id === action.payload.id
          ? { ...item, ...action.payload.updates }
          : item
      );

      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;

      return { 
        ...state, 
        items: newItems, 
        total,
        deliveryFee
      };
    }

    case 'CLEAR_CART':
      return { 
        ...state, 
        items: [], 
        total: 0, 
        deliveryFee: 0,
        discount: 0,
        promoCode: undefined
      };

    case 'LOAD_CART': {
      const subtotal = action.payload.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;
      
      return { 
        ...state, 
        items: action.payload, 
        total,
        deliveryFee
      };
    }

    case 'APPLY_PROMO': {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const total = subtotal + state.deliveryFee - action.payload.discount;
      
      return {
        ...state,
        discount: action.payload.discount,
        promoCode: action.payload.code,
        total
      };
    }

    case 'REMOVE_PROMO': {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const total = subtotal + state.deliveryFee;
      
      return {
        ...state,
        discount: 0,
        promoCode: undefined,
        total
      };
    }

    case 'SAVE_FOR_LATER': {
      const itemToSave = state.items.find(item => item.id === action.payload);
      if (!itemToSave) return state;

      const newItems = state.items.filter(item => item.id !== action.payload);
      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;

      return {
        ...state,
        items: newItems,
        savedForLater: [...state.savedForLater, itemToSave],
        total,
        deliveryFee
      };
    }

    case 'MOVE_TO_CART': {
      const itemToMove = state.savedForLater.find(item => item.id === action.payload);
      if (!itemToMove) return state;

      const newSavedItems = state.savedForLater.filter(item => item.id !== action.payload);
      const newCartItems = [...state.items, itemToMove];
      const subtotal = newCartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;

      return {
        ...state,
        items: newCartItems,
        savedForLater: newSavedItems,
        total,
        deliveryFee
      };
    }

    case 'SET_DELIVERY_FEE': {
      const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const total = subtotal + action.payload - state.discount;
      
      return {
        ...state,
        deliveryFee: action.payload,
        total
      };
    }

    case 'RESTORE_ITEM': {
      const newItems = [...state.items, action.payload];
      const subtotal = newItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
      const deliveryFee = subtotal >= 800 ? 0 : 200;
      const total = subtotal + deliveryFee - state.discount;
      
      return {
        ...state,
        items: newItems,
        recentlyRemoved: state.recentlyRemoved.filter(item => item.id !== action.payload.id),
        total,
        deliveryFee
      };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { 
    items: [], 
    total: 0, 
    deliveryFee: 0,
    discount: 0,
    savedForLater: [],
    recentlyRemoved: []
  });

  // Загружаем корзину из localStorage при инициализации
  useEffect(() => {
    const savedCart = localStorage.getItem('pizza-cart');
    const savedForLater = localStorage.getItem('pizza-saved-for-later');
    
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Ошибка при загрузке корзины:', error);
      }
    }

    if (savedForLater) {
      try {
        const savedItems = JSON.parse(savedForLater);
        // Здесь можно добавить загрузку сохраненных товаров
      } catch (error) {
        console.error('Ошибка при загрузке сохраненных товаров:', error);
      }
    }
  }, []);

  // Сохраняем корзину в localStorage при изменении
  useEffect(() => {
    localStorage.setItem('pizza-cart', JSON.stringify(state.items));
    localStorage.setItem('pizza-saved-for-later', JSON.stringify(state.savedForLater));
  }, [state.items, state.savedForLater]);

  const addItem = (item: Omit<CartItem, 'id'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const updateItem = (id: string, updates: Partial<CartItem>) => {
    dispatch({ type: 'UPDATE_ITEM', payload: { id, updates } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const getItemsCount = () => {
    return state.items.reduce((count, item) => count + item.quantity, 0);
  };

  const getCartSummary = (): CartSummary => {
    const subtotal = state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = state.deliveryFee;
    const tax = subtotal * 0.1; // 10% налог
    const loyaltyDiscount = 0; // Скидка по программе лояльности
    const promoDiscount = state.discount;
    const total = subtotal + deliveryFee + tax - loyaltyDiscount - promoDiscount;

    return {
      subtotal,
      deliveryFee,
      discount: state.discount,
      tax,
      total,
      loyaltyDiscount,
      promoDiscount
    };
  };

  const applyPromoCode = async (code: string): Promise<boolean> => {
    // Моковые промокоды
    const promoCodes = {
      'PIZZA20': { discount: 200, description: 'Скидка 200₽' },
      'FIRST10': { discount: 100, description: 'Скидка для новых клиентов' },
      'WEEKEND': { discount: 150, description: 'Выходная скидка' }
    };

    const promo = promoCodes[code as keyof typeof promoCodes];
    if (promo) {
      dispatch({ type: 'APPLY_PROMO', payload: { code, discount: promo.discount } });
      toast.success(`Промокод применен! ${promo.description}`);
      return true;
    } else {
      toast.error('Промокод не найден или недействителен');
      return false;
    }
  };

  const removePromoCode = () => {
    dispatch({ type: 'REMOVE_PROMO' });
    toast.success('Промокод удален');
  };

  const saveForLater = (id: string) => {
    dispatch({ type: 'SAVE_FOR_LATER', payload: id });
    toast.success('Товар сохранен на потом');
  };

  const moveToCart = (id: string) => {
    dispatch({ type: 'MOVE_TO_CART', payload: id });
    toast.success('Товар перемещен в корзину');
  };

  const restoreItem = (item: CartItem) => {
    dispatch({ type: 'RESTORE_ITEM', payload: item });
    toast.success('Товар восстановлен в корзине');
  };

  const duplicateItem = (id: string) => {
    const item = state.items.find(item => item.id === id);
    if (item) {
      const { id: _, ...itemWithoutId } = item;
      addItem(itemWithoutId);
      toast.success('Товар дублирован');
    }
  };

  const getRecommendations = () => {
    // Моковые рекомендации
    return [
      { id: '1', name: 'Кока-кола 0.5л', price: 120, image: '/api/placeholder/100/100' },
      { id: '2', name: 'Чесночный соус', price: 50, image: '/api/placeholder/100/100' },
      { id: '3', name: 'Картофель фри', price: 180, image: '/api/placeholder/100/100' }
    ];
  };

  return (
    <CartContext.Provider value={{
      state,
      dispatch,
      addItem,
      removeItem,
      updateQuantity,
      updateItem,
      clearCart,
      getItemsCount,
      getCartSummary,
      applyPromoCode,
      removePromoCode,
      saveForLater,
      moveToCart,
      restoreItem,
      duplicateItem,
      getRecommendations
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};