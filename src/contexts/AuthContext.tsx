import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { toast } from 'sonner';

interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'customer' | 'admin' | 'manager' | 'operator';
  avatar?: string;
  addresses: Array<{
    id: string;
    address: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    isDefault: boolean;
  }>;
  preferences: {
    notifications: boolean;
    newsletter: boolean;
    favoritePaymentMethod: string;
  };
  loyaltyPoints: number;
  totalOrders: number;
  createdAt: string;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
  permissions: string[];
}

type AuthAction =
  | { type: 'LOGIN_START' }
  | { type: 'LOGIN_SUCCESS'; payload: { user: User; permissions: string[] } }
  | { type: 'LOGIN_FAILURE' }
  | { type: 'LOGOUT' }
  | { type: 'UPDATE_USER'; payload: User }
  | { type: 'SET_LOADING'; payload: boolean };

const AuthContext = createContext<{
  state: AuthState;
  dispatch: React.Dispatch<AuthAction>;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: any) => Promise<boolean>;
  logout: () => void;
  updateProfile: (userData: any) => Promise<boolean>;
  hasPermission: (permission: string) => boolean;
  hasRole: (role: string) => boolean;
} | null>(null);

const authReducer = (state: AuthState, action: AuthAction): AuthState => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, loading: true };
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        user: action.payload.user,
        permissions: action.payload.permissions,
        isAuthenticated: true,
        loading: false
      };
    case 'LOGIN_FAILURE':
      return { ...state, loading: false };
    case 'LOGOUT':
      return {
        user: null,
        isAuthenticated: false,
        loading: false,
        permissions: []
      };
    case 'UPDATE_USER':
      return { ...state, user: action.payload };
    case 'SET_LOADING':
      return { ...state, loading: action.payload };
    default:
      return state;
  }
};

const getRolePermissions = (role: string): string[] => {
  const permissions = {
    customer: ['view_menu', 'place_order', 'view_orders', 'leave_review'],
    operator: ['view_menu', 'place_order', 'view_orders', 'manage_orders', 'view_customers'],
    manager: [
      'view_menu', 'place_order', 'view_orders', 'manage_orders', 'view_customers',
      'manage_pizzas', 'view_analytics', 'manage_promotions', 'view_reports'
    ],
    admin: [
      'view_menu', 'place_order', 'view_orders', 'manage_orders', 'view_customers',
      'manage_pizzas', 'view_analytics', 'manage_promotions', 'view_reports',
      'manage_users', 'manage_settings', 'view_logs', 'manage_system'
    ]
  };
  return permissions[role as keyof typeof permissions] || [];
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    isAuthenticated: false,
    loading: true,
    permissions: []
  });

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('auth_token');
      if (token) {
        // В реальном приложении здесь будет проверка токена на сервере
        const userData = localStorage.getItem('user_data');
        if (userData) {
          const user = JSON.parse(userData);
          const permissions = getRolePermissions(user.role);
          dispatch({ type: 'LOGIN_SUCCESS', payload: { user, permissions } });
        }
      }
    } catch (error) {
      console.error('Ошибка проверки авторизации:', error);
    } finally {
      dispatch({ type: 'SET_LOADING', payload: false });
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      // Моковая авторизация
      const mockUsers = [
        {
          id: '1',
          name: 'Администратор',
          email: 'admin@pizzaexpress.com',
          phone: '+7 (999) 000-00-00',
          role: 'admin' as const,
          avatar: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
          addresses: [],
          preferences: {
            notifications: true,
            newsletter: true,
            favoritePaymentMethod: 'card'
          },
          loyaltyPoints: 0,
          totalOrders: 0,
          createdAt: '2024-01-01'
        },
        {
          id: '2',
          name: 'Менеджер',
          email: 'manager@pizzaexpress.com',
          phone: '+7 (999) 111-11-11',
          role: 'manager' as const,
          avatar: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
          addresses: [],
          preferences: {
            notifications: true,
            newsletter: false,
            favoritePaymentMethod: 'cash'
          },
          loyaltyPoints: 0,
          totalOrders: 0,
          createdAt: '2024-01-01'
        },
        {
          id: '3',
          name: 'Иван Петров',
          email: 'user@example.com',
          phone: '+7 (999) 123-45-67',
          role: 'customer' as const,
          addresses: [
            {
              id: '1',
              address: 'ул. Ленина, 123',
              apartment: '45',
              entrance: '2',
              floor: '5',
              isDefault: true
            }
          ],
          preferences: {
            notifications: true,
            newsletter: true,
            favoritePaymentMethod: 'card'
          },
          loyaltyPoints: 250,
          totalOrders: 15,
          createdAt: '2023-06-15'
        }
      ];

      const user = mockUsers.find(u => u.email === email);
      
      if (user && password === '123456') {
        const permissions = getRolePermissions(user.role);
        
        localStorage.setItem('auth_token', 'mock_token_' + user.id);
        localStorage.setItem('user_data', JSON.stringify(user));
        
        dispatch({ type: 'LOGIN_SUCCESS', payload: { user, permissions } });
        toast.success('Вход выполнен успешно!');
        return true;
      } else {
        dispatch({ type: 'LOGIN_FAILURE' });
        toast.error('Неверный email или пароль');
        return false;
      }
    } catch (error) {
      dispatch({ type: 'LOGIN_FAILURE' });
      toast.error('Ошибка при входе в систему');
      return false;
    }
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      // Моковая регистрация
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        role: 'customer',
        addresses: [],
        preferences: {
          notifications: true,
          newsletter: false,
          favoritePaymentMethod: 'card'
        },
        loyaltyPoints: 0,
        totalOrders: 0,
        createdAt: new Date().toISOString()
      };

      const permissions = getRolePermissions(newUser.role);
      
      localStorage.setItem('auth_token', 'mock_token_' + newUser.id);
      localStorage.setItem('user_data', JSON.stringify(newUser));
      
      dispatch({ type: 'LOGIN_SUCCESS', payload: { user: newUser, permissions } });
      toast.success('Регистрация прошла успешно!');
      return true;
    } catch (error) {
      toast.error('Ошибка при регистрации');
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_data');
    dispatch({ type: 'LOGOUT' });
    toast.success('Вы вышли из системы');
  };

  const updateProfile = async (userData: any): Promise<boolean> => {
    try {
      if (state.user) {
        const updatedUser = { ...state.user, ...userData };
        localStorage.setItem('user_data', JSON.stringify(updatedUser));
        dispatch({ type: 'UPDATE_USER', payload: updatedUser });
        toast.success('Профиль обновлен');
        return true;
      }
      return false;
    } catch (error) {
      toast.error('Ошибка при обновлении профиля');
      return false;
    }
  };

  const hasPermission = (permission: string): boolean => {
    return state.permissions.includes(permission);
  };

  const hasRole = (role: string): boolean => {
    return state.user?.role === role;
  };

  return (
    <AuthContext.Provider value={{
      state,
      dispatch,
      login,
      register,
      logout,
      updateProfile,
      hasPermission,
      hasRole
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};