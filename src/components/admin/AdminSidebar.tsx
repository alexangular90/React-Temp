import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Pizza, 
  ShoppingCart, 
  Users, 
  Settings,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface AdminSidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const AdminSidebar = ({ collapsed, onToggle }: AdminSidebarProps) => {
  const location = useLocation();

  const menuItems = [
    {
      title: 'Панель управления',
      href: '/admin',
      icon: LayoutDashboard,
    },
    {
      title: 'Пиццы',
      href: '/admin/pizzas',
      icon: Pizza,
    },
    {
      title: 'Заказы',
      href: '/admin/orders',
      icon: ShoppingCart,
    },
    {
      title: 'Пользователи',
      href: '/admin/users',
      icon: Users,
    },
    {
      title: 'Настройки',
      href: '/admin/settings',
      icon: Settings,
    },
  ];

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
      <nav className="flex-1 p-4">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <li key={item.href}>
                <Link
                  to={item.href}
                  className={cn(
                    "flex items-center space-x-3 px-3 py-2 rounded-lg transition-colors",
                    isActive
                      ? "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
                      : "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  )}
                >
                  <item.icon className="h-5 w-5 flex-shrink-0" />
                  {!collapsed && <span className="font-medium">{item.title}</span>}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default AdminSidebar;