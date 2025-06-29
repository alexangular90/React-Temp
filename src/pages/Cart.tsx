import { useState } from 'react';
import { Minus, Plus, Trash2, ShoppingBag, Heart, Copy, RotateCcw, Gift, Percent, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { 
    state, 
    updateQuantity, 
    removeItem, 
    clearCart, 
    getCartSummary,
    applyPromoCode,
    removePromoCode,
    saveForLater,
    moveToCart,
    restoreItem,
    duplicateItem,
    getRecommendations,
    updateItem
  } = useCart();
  
  const { state: authState } = useAuth();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [selectedDeliveryTime, setSelectedDeliveryTime] = useState('asap');
  
  const [orderData, setOrderData] = useState({
    customer: {
      name: authState.user?.name || '',
      phone: authState.user?.phone || '',
      email: authState.user?.email || ''
    },
    delivery: {
      address: authState.user?.addresses?.[0]?.address || '',
      apartment: authState.user?.addresses?.[0]?.apartment || '',
      entrance: authState.user?.addresses?.[0]?.entrance || '',
      floor: authState.user?.addresses?.[0]?.floor || '',
      comment: ''
    },
    paymentMethod: authState.user?.preferences?.favoritePaymentMethod || ''
  });

  const cartSummary = getCartSummary();
  const recommendations = getRecommendations();

  const deliveryTimeOptions = [
    { value: 'asap', label: 'Как можно скорее (30-45 мин)' },
    { value: '1hour', label: 'Через 1 час' },
    { value: '2hours', label: 'Через 2 часа' },
    { value: 'evening', label: 'Вечером (18:00-20:00)' }
  ];

  const handleInputChange = (section: 'customer' | 'delivery', field: string, value: string) => {
    setOrderData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleApplyPromo = async () => {
    if (promoCode.trim()) {
      const success = await applyPromoCode(promoCode.trim());
      if (success) {
        setPromoCode('');
      }
    }
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
          price: item.price,
          extras: item.extras,
          notes: item.notes
        })),
        totalAmount: cartSummary.total,
        deliveryFee: cartSummary.deliveryFee,
        discount: cartSummary.discount,
        promoCode: state.promoCode,
        deliveryTime: selectedDeliveryTime
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

  if (state.items.length === 0 && state.savedForLater.length === 0 && state.recentlyRemoved.length === 0) {
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
          {/* Основное содержимое корзины */}
          <div className="lg:col-span-2 space-y-6">
            {/* Товары в корзине */}
            {state.items.length > 0 && (
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <CardTitle>Ваш заказ ({state.items.length})</CardTitle>
                  <Button variant="outline" size="sm" onClick={clearCart}>
                    Очистить корзину
                  </Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-20 h-20 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.name}</h3>
                        <p className="text-sm text-gray-600">{item.size}</p>
                        {item.dough && <p className="text-xs text-gray-500">Тесто: {item.dough}</p>}
                        {item.crust && <p className="text-xs text-gray-500">Край: {item.crust}</p>}
                        {item.extras && item.extras.length > 0 && (
                          <p className="text-xs text-gray-500">
                            Дополнительно: {item.extras.map(e => e.name).join(', ')}
                          </p>
                        )}
                        {item.notes && (
                          <p className="text-xs text-gray-500">Примечание: {item.notes}</p>
                        )}
                        <p className="text-red-600 font-bold">{item.price} ₽</p>
                      </div>
                      
                      <div className="flex flex-col space-y-2">
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
                        
                        <div className="flex space-x-1">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => duplicateItem(item.id)}
                            title="Дублировать"
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => saveForLater(item.id)}
                            title="Сохранить на потом"
                          >
                            <Heart className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-700"
                            title="Удалить"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Сохраненные товары */}
            {state.savedForLater.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Сохранено на потом ({state.savedForLater.length})</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.savedForLater.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-gray-50">
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
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => moveToCart(item.id)}
                        >
                          В корзину
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Недавно удаленные */}
            {state.recentlyRemoved.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Недавно удаленные</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {state.recentlyRemoved.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg bg-red-50">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded opacity-60"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-700">{item.name}</h3>
                        <p className="text-sm text-gray-500">{item.size}</p>
                        <p className="text-red-600 font-bold">{item.price} ₽</p>
                      </div>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => restoreItem(item)}
                      >
                        <RotateCcw className="h-4 w-4 mr-2" />
                        Восстановить
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            )}

            {/* Рекомендации */}
            {recommendations.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Рекомендуем добавить</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {recommendations.map((item) => (
                      <div key={item.id} className="border rounded-lg p-4 text-center">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-16 h-16 object-cover rounded mx-auto mb-2"
                        />
                        <h4 className="font-medium">{item.name}</h4>
                        <p className="text-red-600 font-bold">{item.price} ₽</p>
                        <Button size="sm" className="mt-2 bg-red-600 hover:bg-red-700">
                          Добавить
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Боковая панель с формой заказа */}
          <div className="space-y-6">
            {/* Промокод */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Percent className="h-5 w-5 text-green-600" />
                  <span>Промокод</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {state.promoCode ? (
                  <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                    <div>
                      <p className="font-medium text-green-800">{state.promoCode}</p>
                      <p className="text-sm text-green-600">Скидка {state.discount}₽</p>
                    </div>
                    <Button variant="ghost" size="sm" onClick={removePromoCode}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ) : (
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Введите промокод"
                      value={promoCode}
                      onChange={(e) => setPromoCode(e.target.value)}
                    />
                    <Button onClick={handleApplyPromo} variant="outline">
                      Применить
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Время доставки */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-blue-600" />
                  <span>Время доставки</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Select value={selectedDeliveryTime} onValueChange={setSelectedDeliveryTime}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {deliveryTimeOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </CardContent>
            </Card>

            {/* Итого */}
            <Card>
              <CardHeader>
                <CardTitle>Итого</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex justify-between">
                  <span>Сумма заказа:</span>
                  <span>{cartSummary.subtotal} ₽</span>
                </div>
                <div className="flex justify-between">
                  <span>Доставка:</span>
                  <span>{cartSummary.deliveryFee === 0 ? 'Бесплатно' : `${cartSummary.deliveryFee} ₽`}</span>
                </div>
                {cartSummary.discount > 0 && (
                  <div className="flex justify-between text-green-600">
                    <span>Скидка:</span>
                    <span>-{cartSummary.discount} ₽</span>
                  </div>
                )}
                <Separator />
                <div className="flex justify-between font-bold text-lg">
                  <span>К оплате:</span>
                  <span>{cartSummary.total} ₽</span>
                </div>
                
                {authState.user?.loyaltyPoints && (
                  <div className="p-3 bg-purple-50 rounded-lg">
                    <p className="text-sm text-purple-800">
                      <Gift className="h-4 w-4 inline mr-1" />
                      У вас {authState.user.loyaltyPoints} бонусных баллов
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Форма заказа */}
            <Tabs defaultValue="delivery" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="delivery">Доставка</TabsTrigger>
                <TabsTrigger value="pickup">Самовывоз</TabsTrigger>
              </TabsList>

              <TabsContent value="delivery" className="space-y-6">
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
                    <CardTitle className="flex items-center space-x-2">
                      <MapPin className="h-5 w-5" />
                      <span>Адрес доставки</span>
                    </CardTitle>
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
                        <SelectItem value="cash">Наличные курьеру</SelectItem>
                        <SelectItem value="card">Карта курьеру</SelectItem>
                        <SelectItem value="online">Онлайн оплата</SelectItem>
                      </SelectContent>
                    </Select>
                  </CardContent>
                </Card>

                <Button
                  onClick={handleSubmitOrder}
                  disabled={isSubmitting || state.items.length === 0}
                  className="w-full bg-red-600 hover:bg-red-700"
                  size="lg"
                >
                  {isSubmitting ? 'Оформление...' : 'Оформить заказ'}
                </Button>
              </TabsContent>

              <TabsContent value="pickup" className="space-y-6">
                <Card>
                  <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold mb-2">Самовывоз</h3>
                    <p className="text-gray-600 mb-4">
                      Заберите заказ в одной из наших пиццерий
                    </p>
                    <div className="space-y-3 text-left">
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">ул. Примерная, 123</h4>
                        <p className="text-sm text-gray-600">Готовность: 15-20 мин</p>
                      </div>
                      <div className="p-3 border rounded-lg">
                        <h4 className="font-medium">пр. Центральный, 456</h4>
                        <p className="text-sm text-gray-600">Готовность: 15-20 мин</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;