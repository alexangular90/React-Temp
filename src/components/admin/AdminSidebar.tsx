import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pizza, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight,
  BarChart3,
  FileText,
  Gift,
  MessageSquare,
  Bell,
  Shield,
  Database,
  Truck,
  CreditCard,
  Calendar,
  HelpCircle
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();
  const { hasPermission, hasRole } = useAuth();

  const menuSections = [
    {
      title: 'Основное',
      items: [
        {
          title: 'Панель управления',
          href: '/admin',
          icon: LayoutDashboard,
          permission: 'view_analytics'
        }
      ]
    },
    {
      title: 'Продажи',
      items: [
        {
          title: 'Заказы',
          href: '/admin/orders',
          icon: ShoppingCart,
          permission: 'view_orders',
          badge: '12'
        },
        {
          title: 'Пиццы',
          href: '/admin/pizzas',
          icon: Pizza,
          permission: 'manage_pizzas'
        },
        {
          title: 'Промокоды',
          href: '/admin/promotions',
          icon: Gift,
          permission: 'manage_promotions'
        }
      ]
    },
    {
      title: 'Аналитика',
      items: [
        {
          title: 'Аналитика',
          href: '/admin/analytics',
          icon: BarChart3,
          permission: 'view_analytics'
        },
        {
          title: 'Отчеты',
          href: '/admin/reports',
          icon: FileText,
          permission: 'view_reports'
        }
      ]
    },
    {
      title: 'Клиенты',
      items: [
        {
          title: 'Пользователи',
          href: '/admin/users',
          icon: Users,
          permission: 'view_customers'
        },
        {
          title: 'Отзывы',
          href: '/admin/reviews',
          icon: MessageSquare,
          permission: 'manage_reviews'
        },
        {
          title: 'Уведомления',
          href: '/admin/notifications',
          icon: Bell,
          permission: 'manage_notifications'
        }
      ]
    },
    {
      title: 'Операции',
      items: [
        {
          title: 'Доставка',
          href: '/admin/delivery',
          icon: Truck,
          permission: 'manage_delivery'
        },
        {
          title: 'Платежи',
          href: '/admin/payments',
          icon: CreditCard,
          permission: 'manage_payments'
        },
        {
          title: 'Расписание',
          href: '/admin/schedule',
          icon: Calendar,
          permission: 'manage_schedule'
        }
      ]
    },
    {
      title: 'Система',
      items: [
        {
          title: 'Настройки',
          href: '/admin/settings',
          icon: Settings,
          permission: 'manage_settings'
        },
        {
          title: 'Безопасность',
          href: '/admin/security',
          icon: Shield,
          permission: 'manage_system',
          adminOnly: true
        },
        {
          title: 'База данных',
          href: '/admin/database',
          icon: Database,
          permission: 'manage_system',
          adminOnly: true
        },
        {
          title: 'Поддержка',
          href: '/admin/support',
          icon: HelpCircle,
          permission: 'view_support'
        }
      ]
    }
  ];

  const isActive = (href: string) => {
    if (href === '/admin') {
      return location.pathname === '/admin';
    }
    return location.pathname.startsWith(href);
  };

  const canAccessItem = (item: any) => {
    if (item.adminOnly && !hasRole('admin')) {
      return false;
    }
    return !item.permission || hasPermission(item.permission);
  };

  return (
    <div className={cn(
      "bg-card border-r transition-all duration-300 flex flex-col",
      collapsed ? "w-16" : "w-64"
    )}>
      {/* Header */}
      <div className="p-4 border-b flex items-center justify-between">
        {!collapsed && (
          <div className="flex items-center space-x-2">
            <Pizza className="h-6 w-6 text-red-600" />
            <span className="font-bold text-lg">Admin Panel</span>
          </div>
        )}
        <Button
          variant="ghost"
          size="sm"
          onClick={onToggle}
          className="ml-auto"
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 overflow-y-auto">
        <div className="space-y-6">
          {menuSections.map((section, sectionIndex) => {
            const visibleItems = section.items.filter(canAccessItem);
            
            if (visibleItems.length === 0) return null;

            return (
              <div key={sectionIndex}>
                {!collapsed && (
                  <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    {section.title}
                  </h3>
                )}
                <ul className="space-y-1">
                  {visibleItems.map((item, itemIndex) => (
                    <li key={itemIndex}>
                      <Link
                        to={item.href}
                        className={cn(
                          "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors group",
                          isActive(item.href)
                            ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                            : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                        )}
                      >
                        <item.icon className="h-5 w-5 flex-shrink-0" />
                        {!collapsed && (
                          <>
                            <span className="font-medium flex-1">{item.title}</span>
                            {item.badge && (
                              <Badge variant="secondary" className="text-xs">
                                {item.badge}
                              </Badge>
                            )}
                          </>
                        )}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Footer */}
      {!collapsed && (
        <div className="p-4 border-t">
          <div className="text-xs text-gray-500">
            <p>PizzaExpress Admin</p>
            <p>v2.0.0</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminSidebar;