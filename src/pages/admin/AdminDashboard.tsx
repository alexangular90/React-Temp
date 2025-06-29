import { useEffect, useState } from 'react';
import { 
  TrendingUp, 
  Users, 
  ShoppingCart, 
  Pizza,
  DollarSign,
  Clock,
  RefreshCw
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

interface DashboardStats {
  totalOrders: number;
  totalRevenue: number;
  totalUsers: number;
  totalPizzas: number;
  recentOrders: any[];
  popularPizzas: any[];
  kpi: any;
}

const AdminDashboard = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    totalRevenue: 0,
    totalUsers: 0,
    totalPizzas: 0,
    recentOrders: [],
    popularPizzas: [],
    kpi: null
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    setLoading(true);
    try {
      // Получаем статистику заказов
      const ordersResponse = await fetch('http://localhost:5000/api/orders');
      const orders = await ordersResponse.json();
      
      // Получаем пиццы
      const pizzasResponse = await fetch('http://localhost:5000/api/pizzas');
      const pizzas = await pizzasResponse.json();

      // Получаем KPI данные
      const kpiResponse = await fetch('http://localhost:5000/api/analytics/kpi?period=7days');
      const kpiData = await kpiResponse.json();

      // Получаем популярные пиццы
      const popularResponse = await fetch('http://localhost:5000/api/analytics/popular-pizzas?period=30days');
      const popularPizzas = await popularResponse.json();

      const totalRevenue = orders.reduce((sum: number, order: any) => sum + order.totalAmount, 0);
      const recentOrders = orders.slice(0, 5);

      setStats({
        totalOrders: orders.length,
        totalRevenue,
        totalUsers: 0, // Пока нет API для пользователей
        totalPizzas: pizzas.length,
        recentOrders,
        popularPizzas: popularPizzas.slice(0, 5),
        kpi: kpiData
      });
    } catch (error) {
      console.error('Ошибка при загрузке данных дашборда:', error);
      toast.error('Ошибка при загрузке данных');
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

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatChange = (change: number) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
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
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Панель управления</h1>
          <p className="text-muted-foreground">Обзор деятельности пиццерии</p>
        </div>
        <Button variant="outline" onClick={fetchDashboardData} disabled={loading}>
          <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
          Обновить
        </Button>
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
            {stats.kpi && (
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {formatChange(stats.kpi.orders.change)} за период
              </p>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Выручка</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatCurrency(stats.totalRevenue)}</div>
            {stats.kpi && (
              <p className="text-xs text-muted-foreground">
                <TrendingUp className="h-3 w-3 inline mr-1" />
                {formatChange(stats.kpi.revenue.change)} за период
              </p>
            )}
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
                    <p className="font-bold">{formatCurrency(order.totalAmount)}</p>
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
              {stats.popularPizzas.map((pizza, index) => (
                <div key={pizza._id} className="flex items-center space-x-3 p-3 border rounded-lg">
                  <div className="text-lg font-bold text-gray-400">#{index + 1}</div>
                  <div className="flex-1">
                    <p className="font-medium">{pizza.name}</p>
                    <p className="text-sm text-muted-foreground">{pizza.category}</p>
                    <div className="flex items-center space-x-1">
                      <span className="text-sm">{pizza.orders} заказов</span>
                      <span className="text-sm text-muted-foreground">
                        ({pizza.percentage}%)
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold">{formatCurrency(pizza.revenue)}</p>
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