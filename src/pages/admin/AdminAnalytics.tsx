import { useState, useEffect } from 'react';
import { TrendingUp, TrendingDown, DollarSign, ShoppingCart, Users, Pizza, Calendar, BarChart3 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, BarChart, Bar, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend } from 'recharts';

const AdminAnalytics = () => {
  const [selectedPeriod, setSelectedPeriod] = useState('7days');
  const [loading, setLoading] = useState(false);

  // Моковые данные для аналитики
  const salesData = [
    { date: '2024-01-01', revenue: 15000, orders: 45, customers: 38 },
    { date: '2024-01-02', revenue: 18000, orders: 52, customers: 44 },
    { date: '2024-01-03', revenue: 22000, orders: 61, customers: 55 },
    { date: '2024-01-04', revenue: 19000, orders: 48, customers: 41 },
    { date: '2024-01-05', revenue: 25000, orders: 68, customers: 62 },
    { date: '2024-01-06', revenue: 28000, orders: 75, customers: 68 },
    { date: '2024-01-07', revenue: 32000, orders: 82, customers: 74 }
  ];

  const popularPizzas = [
    { name: 'Маргарита', orders: 156, revenue: 78000, percentage: 25 },
    { name: 'Пепперони', orders: 134, revenue: 73700, percentage: 22 },
    { name: 'Четыре сыра', orders: 98, revenue: 63700, percentage: 16 },
    { name: 'Мясная', orders: 87, revenue: 60900, percentage: 14 },
    { name: 'Гавайская', orders: 76, revenue: 45600, percentage: 12 },
    { name: 'Другие', orders: 89, revenue: 35600, percentage: 11 }
  ];

  const hourlyData = [
    { hour: '10:00', orders: 5 },
    { hour: '11:00', orders: 8 },
    { hour: '12:00', orders: 15 },
    { hour: '13:00', orders: 22 },
    { hour: '14:00', orders: 18 },
    { hour: '15:00', orders: 12 },
    { hour: '16:00', orders: 9 },
    { hour: '17:00', orders: 14 },
    { hour: '18:00', orders: 28 },
    { hour: '19:00', orders: 35 },
    { hour: '20:00', orders: 32 },
    { hour: '21:00', orders: 25 },
    { hour: '22:00', orders: 18 }
  ];

  const paymentMethods = [
    { name: 'Онлайн', value: 45, color: '#ef4444' },
    { name: 'Карта курьеру', value: 35, color: '#f97316' },
    { name: 'Наличные', value: 20, color: '#eab308' }
  ];

  const deliveryZones = [
    { zone: 'Центральный', orders: 145, avgTime: 32, revenue: 87000 },
    { zone: 'Северный', orders: 98, avgTime: 38, revenue: 58800 },
    { zone: 'Южный', orders: 76, avgTime: 42, revenue: 45600 },
    { zone: 'Восточный', orders: 89, avgTime: 36, revenue: 53400 },
    { zone: 'Западный', orders: 67, avgTime: 45, revenue: 40200 }
  ];

  const kpiData = [
    {
      title: 'Общая выручка',
      value: '₽285,000',
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'text-green-600'
    },
    {
      title: 'Количество заказов',
      value: '1,247',
      change: '+8.3%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'text-blue-600'
    },
    {
      title: 'Новые клиенты',
      value: '156',
      change: '+15.2%',
      trend: 'up',
      icon: Users,
      color: 'text-purple-600'
    },
    {
      title: 'Средний чек',
      value: '₽1,285',
      change: '-2.1%',
      trend: 'down',
      icon: BarChart3,
      color: 'text-orange-600'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Аналитика и отчеты</h1>
          <p className="text-muted-foreground">Анализ продаж и эффективности бизнеса</p>
        </div>
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
      </div>

      {/* KPI карточки */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {kpiData.map((kpi, index) => (
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
            </CardContent>
          </Card>

          {/* Заказы по часам */}
          <Card>
            <CardHeader>
              <CardTitle>Заказы по часам</CardTitle>
            </CardHeader>
            <CardContent>
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
            </CardContent>
          </Card>

          {/* Способы оплаты */}
          <Card>
            <CardHeader>
              <CardTitle>Способы оплаты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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
                
                <div className="space-y-4">
                  {paymentMethods.map((method, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div 
                          className="w-4 h-4 rounded-full" 
                          style={{ backgroundColor: method.color }}
                        />
                        <span className="font-medium">{method.name}</span>
                      </div>
                      <Badge variant="secondary">{method.value}%</Badge>
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
                {popularPizzas.map((pizza, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="text-2xl font-bold text-gray-400">#{index + 1}</div>
                      <div>
                        <h3 className="font-semibold">{pizza.name}</h3>
                        <p className="text-sm text-gray-600">{pizza.orders} заказов</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{pizza.revenue.toLocaleString()} ₽</p>
                      <Badge variant="secondary">{pizza.percentage}%</Badge>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="customers" className="space-y-6">
          {/* Статистика клиентов */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-blue-600" />
                <h3 className="text-2xl font-bold">1,247</h3>
                <p className="text-gray-600">Всего клиентов</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <TrendingUp className="h-12 w-12 mx-auto mb-4 text-green-600" />
                <h3 className="text-2xl font-bold">156</h3>
                <p className="text-gray-600">Новых за месяц</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-6 text-center">
                <BarChart3 className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="text-2xl font-bold">3.2</h3>
                <p className="text-gray-600">Среднее заказов</p>
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
                {deliveryZones.map((zone, index) => (
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
                      <p className="text-xl font-bold">{zone.revenue.toLocaleString()} ₽</p>
                      <p className="text-sm text-gray-600">выручка</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminAnalytics;