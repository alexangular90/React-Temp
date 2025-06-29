import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Search, Clock, CheckCircle, Truck, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    address: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
  };
  items: Array<{
    pizza: {
      name: string;
      image: string;
    };
    size: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryFee: number;
  status: string;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  createdAt: string;
}

const OrderTracking = () => {
  const location = useLocation();
  const [orderNumber, setOrderNumber] = useState('');
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Если пришли с номером заказа из состояния
    if (location.state?.orderNumber) {
      setOrderNumber(location.state.orderNumber);
      searchOrder(location.state.orderNumber);
    }
  }, [location.state]);

  const searchOrder = async (orderNum?: string) => {
    const searchOrderNumber = orderNum || orderNumber;
    
    if (!searchOrderNumber.trim()) {
      toast.error('Введите номер заказа');
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/orders/number/${searchOrderNumber}`);
      
      if (response.ok) {
        const orderData = await response.json();
        setOrder(orderData);
      } else if (response.status === 404) {
        toast.error('Заказ не найден');
        setOrder(null);
      } else {
        throw new Error('Ошибка при поиске заказа');
      }
    } catch (error) {
      console.error('Ошибка при поиске заказа:', error);
      toast.error('Ошибка при поиске заказа');
      setOrder(null);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый':
        return 'bg-blue-100 text-blue-800';
      case 'Подтвержден':
        return 'bg-yellow-100 text-yellow-800';
      case 'Готовится':
        return 'bg-orange-100 text-orange-800';
      case 'В пути':
        return 'bg-purple-100 text-purple-800';
      case 'Доставлен':
        return 'bg-green-100 text-green-800';
      case 'Отменен':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusSteps = (currentStatus: string) => {
    const steps = [
      { status: 'Новый', icon: Clock, label: 'Заказ принят' },
      { status: 'Подтвержден', icon: CheckCircle, label: 'Подтвержден' },
      { status: 'Готовится', icon: Clock, label: 'Готовится' },
      { status: 'В пути', icon: Truck, label: 'В пути' },
      { status: 'Доставлен', icon: MapPin, label: 'Доставлен' }
    ];

    const currentIndex = steps.findIndex(step => step.status === currentStatus);
    
    return steps.map((step, index) => ({
      ...step,
      completed: index <= currentIndex,
      active: index === currentIndex
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Отследить заказ</h1>
        
        {/* Поиск заказа */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Введите номер заказа</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex gap-4">
              <Input
                value={orderNumber}
                onChange={(e) => setOrderNumber(e.target.value)}
                placeholder="Например: ORD-1234567890-1"
                className="flex-1"
              />
              <Button 
                onClick={() => searchOrder()}
                disabled={loading}
                className="bg-red-600 hover:bg-red-700"
              >
                <Search className="h-4 w-4 mr-2" />
                {loading ? 'Поиск...' : 'Найти'}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Информация о заказе */}
        {order && (
          <div className="space-y-6">
            {/* Статус заказа */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>Заказ #{order.orderNumber}</CardTitle>
                  <Badge className={getStatusColor(order.status)}>
                    {order.status}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <h3 className="font-semibold mb-2">Информация о заказе</h3>
                    <p className="text-sm text-gray-600">
                      Дата: {new Date(order.createdAt).toLocaleString('ru-RU')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Ожидаемое время доставки: {new Date(order.estimatedDeliveryTime).toLocaleString('ru-RU')}
                    </p>
                    <p className="text-sm text-gray-600">
                      Способ оплаты: {order.paymentMethod}
                    </p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Адрес доставки</h3>
                    <p className="text-sm text-gray-600">
                      {order.delivery.address}
                      {order.delivery.apartment && `, кв. ${order.delivery.apartment}`}
                      {order.delivery.entrance && `, под. ${order.delivery.entrance}`}
                      {order.delivery.floor && `, эт. ${order.delivery.floor}`}
                    </p>
                    {order.delivery.comment && (
                      <p className="text-sm text-gray-600 mt-1">
                        Комментарий: {order.delivery.comment}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Прогресс заказа */}
            <Card>
              <CardHeader>
                <CardTitle>Статус заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  {getStatusSteps(order.status).map((step, index) => (
                    <div key={step.status} className="flex flex-col items-center flex-1">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed 
                          ? 'bg-green-500 text-white' 
                          : step.active 
                            ? 'bg-blue-500 text-white' 
                            : 'bg-gray-200 text-gray-400'
                      }`}>
                        <step.icon className="h-5 w-5" />
                      </div>
                      <span className={`text-xs mt-2 text-center ${
                        step.completed || step.active ? 'text-gray-900' : 'text-gray-400'
                      }`}>
                        {step.label}
                      </span>
                      {index < getStatusSteps(order.status).length - 1 && (
                        <div className={`absolute h-0.5 w-full top-5 left-1/2 ${
                          step.completed ? 'bg-green-500' : 'bg-gray-200'
                        }`} style={{ zIndex: -1 }} />
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Состав заказа */}
            <Card>
              <CardHeader>
                <CardTitle>Состав заказа</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {order.items.map((item, index) => (
                    <div key={index} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.pizza.image}
                        alt={item.pizza.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.pizza.name}</h3>
                        <p className="text-sm text-gray-600">{item.size}</p>
                        <p className="text-sm text-gray-600">Количество: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">{item.price * item.quantity} ₽</p>
                      </div>
                    </div>
                  ))}
                  
                  <div className="border-t pt-4">
                    <div className="flex justify-between mb-2">
                      <span>Сумма заказа:</span>
                      <span>{order.totalAmount - order.deliveryFee} ₽</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span>Доставка:</span>
                      <span>{order.deliveryFee === 0 ? 'Бесплатно' : `${order.deliveryFee} ₽`}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg">
                      <span>Итого:</span>
                      <span>{order.totalAmount} ₽</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
};

export default OrderTracking;