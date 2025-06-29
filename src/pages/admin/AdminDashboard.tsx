import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Pizza,
  DollarSign,
  Clock
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalPizzas: number;
  recentOrders: any[];
  popularPizzas: any[];
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalPizzas: 0,
    recentOrders: [],
    popularPizzas: []
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Получаем статистику заказов
      const ordersResponse = await fetch('http://localhost:5000/api/orders');
      const orders = await ordersResponse.json();
      
      // Получаем пиццы
      const pizzasResponse = await fetch('http://localhost:5000/api/pizzas');
      const pizzas = await pizzasResponse.json();

      const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      const recentOrders = orders.slice(0, 5);

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: 0, // Пока нет API для пользователей
        totalPizzas: pizzas.length,
        recentOrders,
        popularPizzas: pizzas.slice(0, 5)
      });
    } catch (error) {
      console.error('Ошибка при загрузке данных дашборда:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый': return 'bg-blue-100 text-blue-800';
      case 'Подтвержден': return 'bg-yellow-100 text-yellow-800';
      case 'Готовится': return 'bg-orange-100 text-orange-800';
      case 'В пути': return 'bg-purple-100 text-purple-800';
      case 'Доставлен': return 'bg-green-100 text-green-800';
      case 'Отменен': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Панель управления</h1>
        <p className="text-muted-foreground">Обзор деятельности пиццерии</p>
      </div>

      {/* Статистические карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Всего заказов</CardTitle>
            <ShoppingCart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalOrders}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +12% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выручка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalRevenue.toLocaleString()} ₽</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +8% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Пользователи</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
            <p className="text-xs text-muted-foreground">
              <TrendingUp className="h-3 w-3 inline mr-1" />
              +5% с прошлого месяца
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Пиццы в меню</CardTitle>
            <Pizza className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalPizzas}</div>
            <p className="text-xs text-muted-foreground">
              Активных позиций
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Последние заказы */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Clock className="h-5 w-5" />
              <span>Последние заказы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.recentOrders.map((order) => (
                <div key={order._id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <p className="font-medium">#{order.orderNumber}</p>
                    <p className="text-sm text-muted-foreground">{order.customer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleString('ru-RU')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{order.totalAmount} ₽</p>
                    <Badge className={getStatusColor(order.status)}>
                      {order.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Популярные пиццы */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Pizza className="h-5 w-5" />
              <span>Популярные пиццы</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {stats.popularPizzas.map((pizza) => (
                <div key={pizza._id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <img
                    src={pizza.image}
                    alt={pizza.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium">{pizza.name}</p>
                    <p className="text-sm text-muted-foreground">{pizza.category}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">⭐ {pizza.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({pizza.reviewCount} отзывов)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">от {pizza.sizes[0]?.price} ₽</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;