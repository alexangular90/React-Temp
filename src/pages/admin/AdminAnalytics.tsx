import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Pizza, Calendar, BarChart3, RefreshCw } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';
import { toast } from 'sonner';

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [loading, setLoading] = useState(false);
  const [kpiData, setKpiData] = useState(null);
  const [salesData, setSalesData] = useState([]);
  const [popularPizzas, setPopularPizzas] = useState([]);
  const [hourlyData, setHourlyData] = useState([]);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [deliveryZones, setDeliveryZones] = useState([]);
  const [customerStats, setCustomerStats] = useState(null);

  useEffect(() => {
    fetchAnalyticsData();
  }, [selectedPeriod]);

  const fetchAnalyticsData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchKPI(),
        fetchSalesChart(),
        fetchPopularPizzas(),
        fetchHourlyData(),
        fetchPaymentMethods(),
        fetchDeliveryZones(),
        fetchCustomerStats()
      ]);
    } catch (error) {
      console.error('Ошибка при загрузке аналитики:', error);
      toast.error('Ошибка при загрузке данных аналитики');
    } finally {
      setLoading(false);
    }
  };

  const fetchKPI = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/kpi?period=${selectedPeriod}`);
      const data = await response.json();
      setKpiData(data);
    } catch (error) {
      console.error('Ошибка при загрузке KPI:', error);
    }
  };

  const fetchSalesChart = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/sales-chart?period=${selectedPeriod}`);
      const data = await response.json();
      setSalesData(data);
    } catch (error) {
      console.error('Ошибка при загрузке графика продаж:', error);
    }
  };

  const fetchPopularPizzas = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/popular-pizzas?period=${selectedPeriod}`);
      const data = await response.json();
      setPopularPizzas(data);
    } catch (error) {
      console.error('Ошибка при загрузке популярных пицц:', error);
    }
  };

  const fetchHourlyData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/hourly-orders?period=${selectedPeriod}`);
      const data = await response.json();
      setHourlyData(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных по часам:', error);
    }
  };

  const fetchPaymentMethods = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/payment-methods?period=${selectedPeriod}`);
      const data = await response.json();
      setPaymentMethods(data);
    } catch (error) {
      console.error('Ошибка при загрузке способов оплаты:', error);
    }
  };

  const fetchDeliveryZones = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/delivery-zones?period=${selectedPeriod}`);
      const data = await response.json();
      setDeliveryZones(data);
    } catch (error) {
      console.error('Ошибка при загрузке данных по районам:', error);
    }
  };

  const fetchCustomerStats = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/analytics/customers?period=${selectedPeriod}`);
      const data = await response.json();
      setCustomerStats(data);
    } catch (error) {
      console.error('Ошибка при загрузке статистики клиентов:', error);
    }
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('ru-RU', {
      style: 'currency',
      currency: 'RUB',
      minimumFractionDigits: 0
    }).format(value);
  };

  const formatChange = (change) => {
    const sign = change >= 0 ? '+' : '';
    return `${sign}${change.toFixed(1)}%`;
  };

  const kpiCards = kpiData ? [
    {
      title: 'Общая выручка',
      value: formatCurrency(kpiData.revenue.value),
      change: formatChange(kpiData.revenue.change),
      trend: kpiData.revenue.trend,
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Количество заказов',
      value: kpiData.orders.value.toString(),
      change: formatChange(kpiData.orders.change),
      trend: kpiData.orders.trend,
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Новые клиенты',
      value: kpiData.newCustomers.value.toString(),
      change: formatChange(kpiData.newCustomers.change),
      trend: kpiData.newCustomers.trend,
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Средний чек',
      value: formatCurrency(kpiData.avgCheck.value),
      change: formatChange(kpiData.avgCheck.change),
      trend: kpiData.avgCheck.trend,
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ] : [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Аналитика и отчеты</h1>
          <p className="text-muted-foreground">Анализ продаж и эффективности бизнеса</p>
        </div>
        <div className="flex items-center space-x-4">
          <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7days">Последние 7 дней</SelectItem>
              <SelectItem value="30days">Последние 30 дней</SelectItem>
              <SelectItem value="3months">Последние 3 месяца</SelectItem>
              <SelectItem value="year">Текущий год</SelectItem>
            </SelectContent>
          </Select>
          <Button 
            variant="outline" 
            onClick={fetchAnalyticsData}
            disabled={loading}
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
            Обновить
          </Button>
        </div>
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiCards.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">{kpi.title}</p>
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <div className="flex items-center mt-2">
                    {kpi.trend === 'up' ? (
                      <TrendingUp className="h-4 w-4 text-green-600 mr-1" />
                    ) : (
                      <TrendingDown className="h-4 w-4 text-red-600 mr-1" />
                    )}
                    <span className={`text-sm ${kpi.trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.change}
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full bg-gray-100 ${kpi.color}`}>
                  <kpi.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Tabs defaultValue="sales" className="space-y-6">
        <TabsList>
          <TabsTrigger value="sales">Продажи</TabsTrigger>
          <TabsTrigger value="products">Товары</TabsTrigger>
          <TabsTrigger value="customers">Клиенты</TabsTrigger>
          <TabsTrigger value="delivery">Доставка</TabsTrigger>
        </TabsList>

        <TabsContent value="sales" className="space-y-6">
          {/* График продаж */}
          <Card>
            <CardHeader>
              <CardTitle>Динамика продаж</CardTitle>
            </CardHeader>
            <CardContent>
              {salesData.length > 0 ? (
                <ChartContainer
                  config={{
                    revenue: { label: "Выручка", color: "#ef4444" },
                    orders: { label: "Заказы", color: "#3b82f6" }
                  }}
                  className="h-80"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={salesData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="date" />
                      <YAxis yAxisId="left" />
                      <YAxis yAxisId="right" orientation="right" />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#ef4444" strokeWidth={2} />
                      <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#3b82f6" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-80 flex items-center justify-center text-gray-500">
                  {loading ? 'Загрузка данных...' : 'Нет данных для отображения'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Заказы по часам */}
          <Card>
            <CardHeader>
              <CardTitle>Заказы по часам</CardTitle>
            </CardHeader>
            <CardContent>
              {hourlyData.length > 0 ? (
                <ChartContainer
                  config={{
                    orders: { label: "Заказы", color: "#f97316" }
                  }}
                  className="h-64"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={hourlyData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="hour" />
                      <YAxis />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Bar dataKey="orders" fill="#f97316" />
                    </BarChart>
                  </ResponsiveContainer>
                </ChartContainer>
              ) : (
                <div className="h-64 flex items-center justify-center text-gray-500">
                  {loading ? 'Загрузка данных...' : 'Нет данных для отображения'}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Способы оплаты */}
          <Card>
            <CardHeader>
              <CardTitle>Способы оплаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {paymentMethods.length > 0 ? (
                  <ChartContainer
                    config={{
                      online: { label: "Онлайн", color: "#ef4444" },
                      card: { label: "Карта", color: "#f97316" },
                      cash: { label: "Наличные", color: "#eab308" }
                    }}
                    className="h-64"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={paymentMethods}
                          cx="50%"
                          cy="50%"
                          outerRadius={80}
                          dataKey="value"
                          label={({ name, value }) => `${name}: ${value}%`}
                        >
                          {paymentMethods.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color} />
                          ))}
                        </Pie>
                        <ChartTooltip />
                      </PieChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                ) : (
                  <div className="h-64 flex items-center justify-center text-gray-500">
                    {loading ? 'Загрузка данных...' : 'Нет данных для отображения'}
                  </div>
                )}
                
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: method.color }}
                        />
                        <div>
                          <span className="font-medium">{method.name}</span>
                          <p className="text-sm text-gray-600">{method.count} заказов</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge variant="secondary">{method.value}%</Badge>
                        <p className="text-sm text-gray-600">{formatCurrency(method.revenue)}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="products" className="space-y-6">
          {/* Популярные пиццы */}
          <Card>
            <CardHeader>
              <CardTitle>Популярные пиццы</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularPizzas.length > 0 ? (
                  popularPizzas.map((pizza, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                        <div>
                          <h3 className="font-semibold">{pizza.name}</h3>
                          <p className="text-sm text-gray-600">{pizza.orders} заказов • {pizza.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-bold">{formatCurrency(pizza.revenue)}</p>
                        <Badge variant="secondary">{pizza.percentage}%</Badge>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {loading ? 'Загрузка данных...' : 'Нет данных для отображения'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Статистика клиентов */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold">
                  {customerStats ? customerStats.totalCustomers : '...'}
                </h3>
                <p className="text-gray-600">Всего клиентов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold">
                  {customerStats ? customerStats.newCustomers : '...'}
                </h3>
                <p className="text-gray-600">Новых за период</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold">
                  {customerStats ? customerStats.avgOrders.toFixed(1) : '...'}
                </h3>
                <p className="text-gray-600">Среднее заказов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <DollarSign className="h-12 w-12 mx-auto mb-4 text-orange-600" />
                <h3 className="text-2xl font-bold">
                  {customerStats ? formatCurrency(customerStats.avgSpent) : '...'}
                </h3>
                <p className="text-gray-600">Средняя сумма</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="delivery" className="space-y-6">
          {/* Статистика доставки */}
          <Card>
            <CardHeader>
              <CardTitle>Статистика по районам</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deliveryZones.length > 0 ? (
                  deliveryZones.map((zone, index) => (
                    <div key={index} className="grid grid-cols-4 gap-4 p-4 border rounded-lg">
                      <div>
                        <h3 className="font-semibold">{zone.zone}</h3>
                        <p className="text-sm text-gray-600">район</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold">{zone.orders}</p>
                        <p className="text-sm text-gray-600">заказов</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold">{zone.avgTime} мин</p>
                        <p className="text-sm text-gray-600">среднее время</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xl font-bold">{formatCurrency(zone.revenue)}</p>
                        <p className="text-sm text-gray-600">выручка</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    {loading ? 'Загрузка данных...' : 'Нет данных для отображения'}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;