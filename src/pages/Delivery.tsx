import { MapPin, Clock, CreditCard, Truck, Phone, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Delivery = () => {
  const deliveryZones = [
    {
      name: 'Центральный район',
      time: '30-40 минут',
      fee: 'Бесплатно',
      minOrder: 'от 800₽',
      areas: ['Центр', 'Арбат', 'Тверская', 'Красная площадь'],
      color: 'bg-green-100 text-green-800'
    },
    {
      name: 'Северный район',
      time: '35-45 минут',
      fee: '150₽',
      minOrder: 'от 600₽',
      areas: ['Сокол', 'Аэропорт', 'Войковская', 'Водный стадион'],
      color: 'bg-blue-100 text-blue-800'
    },
    {
      name: 'Южный район',
      time: '40-50 минут',
      fee: '200₽',
      minOrder: 'от 600₽',
      areas: ['Нагорная', 'Тульская', 'Автозаводская', 'Коломенская'],
      color: 'bg-orange-100 text-orange-800'
    },
    {
      name: 'Восточный район',
      time: '35-45 минут',
      fee: '150₽',
      minOrder: 'от 600₽',
      areas: ['Измайлово', 'Соколиники', 'Преображенская', 'Семеновская'],
      color: 'bg-purple-100 text-purple-800'
    },
    {
      name: 'Западный район',
      time: '40-50 минут',
      fee: '200₽',
      minOrder: 'от 700₽',
      areas: ['Кунцево', 'Крылатское', 'Фили', 'Багратионовская'],
      color: 'bg-red-100 text-red-800'
    }
  ];

  const paymentMethods = [
    {
      title: 'Онлайн оплата',
      description: 'Банковской картой на сайте',
      icon: CreditCard,
      features: ['Visa, MasterCard, МИР', 'Безопасная оплата', 'Мгновенное подтверждение', 'Скидка 3%'],
      recommended: true
    },
    {
      title: 'Картой курьеру',
      description: 'Оплата при получении',
      icon: CreditCard,
      features: ['Visa, MasterCard, МИР', 'Бесконтактная оплата', 'Терминал у курьера', 'Чек на email'],
      recommended: false
    },
    {
      title: 'Наличными курьеру',
      description: 'Оплата наличными при получении',
      icon: Phone,
      features: ['Точная сумма приветствуется', 'Чек обязательно', 'Сдача с любой суммы', 'Без комиссии'],
      recommended: false
    }
  ];

  const pickupPoints = [
    {
      address: 'ул. Примерная, 123',
      workingHours: '10:00 - 23:00',
      phone: '+7 (999) 123-45-67',
      features: ['Парковка', 'Wi-Fi', 'Детская зона'],
      readyTime: '15-20 минут'
    },
    {
      address: 'пр. Центральный, 456',
      workingHours: '11:00 - 22:00',
      phone: '+7 (999) 234-56-78',
      features: ['Парковка', 'Терминал оплаты'],
      readyTime: '15-20 минут'
    }
  ];

  const deliverySteps = [
    {
      step: 1,
      title: 'Оформление заказа',
      description: 'Выберите пиццы, укажите адрес и способ оплаты',
      time: '2-3 минуты'
    },
    {
      step: 2,
      title: 'Подтверждение',
      description: 'Мы перезвоним для подтверждения заказа',
      time: '1-2 минуты'
    },
    {
      step: 3,
      title: 'Приготовление',
      description: 'Наши повара готовят вашу пиццу',
      time: '15-20 минут'
    },
    {
      step: 4,
      title: 'Доставка',
      description: 'Курьер везет горячую пиццу к вам',
      time: '15-25 минут'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Доставка и оплата</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Быстрая доставка горячей пиццы по всему городу. Удобные способы оплаты и гарантия качества.
          </p>
        </div>

        <Tabs defaultValue="delivery" className="space-y-8">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="delivery">Доставка</TabsTrigger>
            <TabsTrigger value="payment">Оплата</TabsTrigger>
            <TabsTrigger value="pickup">Самовывоз</TabsTrigger>
          </TabsList>

          {/* Доставка */}
          <TabsContent value="delivery" className="space-y-8">
            {/* Как работает доставка */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Как работает доставка</h2>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                {deliverySteps.map((step) => (
                  <Card key={step.step} className="text-center">
                    <CardContent className="p-6">
                      <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                        <span className="text-xl font-bold text-red-600">{step.step}</span>
                      </div>
                      <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                      <p className="text-gray-600 text-sm mb-2">{step.description}</p>
                      <Badge variant="outline" className="text-xs">{step.time}</Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Зоны доставки */}
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Зоны доставки</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {deliveryZones.map((zone, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{zone.name}</CardTitle>
                        <Badge className={zone.color}>{zone.fee}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Время доставки:</span>
                          <span className="font-medium">{zone.time}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Минимальный заказ:</span>
                          <span className="font-medium">{zone.minOrder}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block mb-2">Районы:</span>
                          <div className="flex flex-wrap gap-1">
                            {zone.areas.map((area, areaIndex) => (
                              <Badge key={areaIndex} variant="secondary" className="text-xs">
                                {area}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Условия доставки */}
            <section>
              <Card className="bg-blue-50">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Truck className="h-5 w-5 text-blue-600" />
                    <span>Условия бесплатной доставки</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Центральный район</h3>
                      <p className="text-gray-600 text-sm">Бесплатная доставка от 800₽</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-yellow-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-yellow-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Быстрая доставка</h3>
                      <p className="text-gray-600 text-sm">30-50 минут в зависимости от района</p>
                    </div>
                    <div className="text-center">
                      <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Phone className="h-8 w-8 text-red-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Отслеживание</h3>
                      <p className="text-gray-600 text-sm">SMS уведомления о статусе заказа</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Оплата */}
          <TabsContent value="payment" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Способы оплаты</h2>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {paymentMethods.map((method, index) => (
                  <Card key={index} className={`relative ${method.recommended ? 'ring-2 ring-red-500' : ''}`}>
                    {method.recommended && (
                      <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                        <Badge className="bg-red-500">Рекомендуем</Badge>
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex items-center space-x-3">
                        <div className="bg-red-100 rounded-full w-12 h-12 flex items-center justify-center">
                          <method.icon className="h-6 w-6 text-red-600" />
                        </div>
                        <div>
                          <CardTitle className="text-lg">{method.title}</CardTitle>
                          <p className="text-gray-600 text-sm">{method.description}</p>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {method.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-sm">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Безопасность платежей */}
            <section>
              <Card className="bg-green-50">
                <CardHeader>
                  <CardTitle className="text-center">Безопасность платежей</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                    <div>
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">SSL шифрование</h3>
                      <p className="text-gray-600 text-sm">Все данные передаются в зашифрованном виде</p>
                    </div>
                    <div>
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">PCI DSS</h3>
                      <p className="text-gray-600 text-sm">Соответствие стандартам безопасности</p>
                    </div>
                    <div>
                      <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-8 w-8 text-green-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Защита данных</h3>
                      <p className="text-gray-600 text-sm">Данные карт не сохраняются на наших серверах</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>

          {/* Самовывоз */}
          <TabsContent value="pickup" className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Точки самовывоза</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {pickupPoints.map((point, index) => (
                  <Card key={index}>
                    <CardHeader>
                      <CardTitle className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-red-600" />
                        <span>{point.address}</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Время работы:</span>
                          <span className="font-medium">{point.workingHours}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Телефон:</span>
                          <span className="font-medium">{point.phone}</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-gray-600">Время готовности:</span>
                          <span className="font-medium text-green-600">{point.readyTime}</span>
                        </div>
                        <div>
                          <span className="text-gray-600 block mb-2">Удобства:</span>
                          <div className="flex flex-wrap gap-1">
                            {point.features.map((feature, featureIndex) => (
                              <Badge key={featureIndex} variant="secondary" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            {/* Преимущества самовывоза */}
            <section>
              <Card className="bg-orange-50">
                <CardHeader>
                  <CardTitle className="text-center">Преимущества самовывоза</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
                    <div>
                      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Clock className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Быстрее</h3>
                      <p className="text-gray-600 text-sm">Готовность через 15-20 минут</p>
                    </div>
                    <div>
                      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CreditCard className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Дешевле</h3>
                      <p className="text-gray-600 text-sm">Без стоимости доставки</p>
                    </div>
                    <div>
                      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <CheckCircle className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Контроль</h3>
                      <p className="text-gray-600 text-sm">Проверите заказ перед оплатой</p>
                    </div>
                    <div>
                      <div className="bg-orange-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-3">
                        <Truck className="h-8 w-8 text-orange-600" />
                      </div>
                      <h3 className="font-semibold mb-2">Удобно</h3>
                      <p className="text-gray-600 text-sm">Парковка рядом с пиццерией</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </section>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Delivery;