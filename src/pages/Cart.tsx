import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCart } from '@/contexts/CartContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { state, updateQuantity, removeItem, clearCart } = useCart();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [orderData, setOrderData] = useState({
    customer: {
      name: '',
      phone: '',
      email: ''
    },
    delivery: {
      address: '',
      apartment: '',
      entrance: '',
      floor: '',
      comment: ''
    },
    paymentMethod: ''
  });

  const deliveryFee = state.total >= 1000 ? 0 : 200;
  const totalWithDelivery = state.total + deliveryFee;

  const handleInputChange = (section: 'customer' | 'delivery', field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleSubmitOrder = async () => {
    // Валидация
    if (!orderData.customer.name || !orderData.customer.phone || !orderData.customer.email) {
      toast.error('Заполните все обязательные поля');
      return;
    }

    if (!orderData.delivery.address) {
      toast.error('Укажите адрес доставки');
      return;
    }

    if (!orderData.paymentMethod) {
      toast.error('Выберите способ оплаты');
      return;
    }

    if (state.items.length === 0) {
      toast.error('Корзина пуста');
      return;
    }

    setIsSubmitting(true);

    try {
      const orderPayload = {
        ...orderData,
        items: state.items.map(item => ({
          pizza: item.pizzaId,
          size: item.size,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: totalWithDelivery,
        deliveryFee
      };

      const response = await fetch('http://localhost:5000/api/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(orderPayload)
      });

      if (response.ok) {
        const order = await response.json();
        clearCart();
        toast.success('Заказ успешно оформлен!');
        navigate('/order-tracking', { state: { orderNumber: order.orderNumber } });
      } else {
        throw new Error('Ошибка при создании заказа');
      }
    } catch (error) {
      console.error('Ошибка при оформлении заказа:', error);
      toast.error('Ошибка при оформлении заказа');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <ShoppingBag className="mx-auto h-12 w-12 text-gray-400 mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Корзина пуста</h2>
            <p className="text-gray-600 mb-6">Добавьте пиццы из нашего меню</p>
            <Button onClick={() => navigate('/menu')} className="bg-red-600 hover:bg-red-700">
              Перейти к меню
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Корзина</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Товары в корзине */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Ваш заказ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {state.items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h3 className="font-semibold">{item.name}</h3>
                      <p className="text-sm text-gray-600">{item.size}</p>
                      <p className="text-red-600 font-bold">{item.price} ₽</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-600 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Форма заказа */}
          <div className="space-y-6">
            {/* Контактная информация */}
            <Card>
              <CardHeader>
                <CardTitle>Контактная информация</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="name">Имя *</Label>
                  <Input
                    id="name"
                    value={orderData.customer.name}
                    onChange={(e) => handleInputChange('customer', 'name', e.target.value)}
                    placeholder="Ваше имя"
                  />
                </div>
                <div>
                  <Label htmlFor="phone">Телефон *</Label>
                  <Input
                    id="phone"
                    value={orderData.customer.phone}
                    onChange={(e) => handleInputChange('customer', 'phone', e.target.value)}
                    placeholder="+7 (999) 123-45-67"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={orderData.customer.email}
                    onChange={(e) => handleInputChange('customer', 'email', e.target.value)}
                    placeholder="your@email.com"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Адрес доставки */}
            <Card>
              <CardHeader>
                <CardTitle>Адрес доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="address">Адрес *</Label>
                  <Input
                    id="address"
                    value={orderData.delivery.address}
                    onChange={(e) => handleInputChange('delivery', 'address', e.target.value)}
                    placeholder="Улица, дом"
                  />
                </div>
                <div className="grid grid-cols-3 gap-2">
                  <div>
                    <Label htmlFor="apartment">Квартира</Label>
                    <Input
                      id="apartment"
                      value={orderData.delivery.apartment}
                      onChange={(e) => handleInputChange('delivery', 'apartment', e.target.value)}
                      placeholder="Кв."
                    />
                  </div>
                  <div>
                    <Label htmlFor="entrance">Подъезд</Label>
                    <Input
                      id="entrance"
                      value={orderData.delivery.entrance}
                      onChange={(e) => handleInputChange('delivery', 'entrance', e.target.value)}
                      placeholder="Под."
                    />
                  </div>
                  <div>
                    <Label htmlFor="floor">Этаж</Label>
                    <Input
                      id="floor"
                      value={orderData.delivery.floor}
                      onChange={(e) => handleInputChange('delivery', 'floor', e.target.value)}
                      placeholder="Эт."
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="comment">Комментарий</Label>
                  <Textarea
                    id="comment"
                    value={orderData.delivery.comment}
                    onChange={(e) => handleInputChange('delivery', 'comment', e.target.value)}
                    placeholder="Дополнительная информация для курьера"
                  />
                </div>
              </CardContent>
            </Card>

            {/* Способ оплаты */}
            <Card>
              <CardHeader>
                <CardTitle>Способ оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <Select
                  value={orderData.paymentMethod}
                  onValueChange={(value) => setOrderData(prev => ({ ...prev, paymentMethod: value }))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Выберите способ оплаты" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Наличные">Наличные курьеру</SelectItem>
                    <SelectItem value="Карта курьеру">Карта курьеру</SelectItem>
                    <SelectItem value="Онлайн">Онлайн оплата</SelectItem>
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Итого */}
            <Card>
              <CardHeader>
                <CardTitle>Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex justify-between">
                  <span>Сумма заказа:</span>
                  <span>{state.total} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{deliveryFee === 0 ? 'Бесплатно' : `${deliveryFee} ₽`}</span>
                </div>
                <div className="border-t pt-2">
                  <div className="flex justify-between font-bold text-lg">
                    <span>К оплате:</span>
                    <span>{totalWithDelivery} ₽</span>
                  </div>
                </div>
                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting}
                  className="w-full bg-red-600 hover:bg-red-700 mt-4"
                >
                  {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;