import { Calendar, Gift, Percent, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Link } from 'react-router-dom';

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
  conditions: string[];
  type: 'discount' | 'combo' | 'gift' | 'loyalty';
  isActive: boolean;
}

const Promotions = () => {
  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'Две пиццы по цене одной!',
      description: 'При заказе любой большой пиццы - вторая такая же в подарок! Идеально для компании друзей или семейного ужина.',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      discount: '50%',
      validUntil: '31.12.2024',
      conditions: [
        'Акция действует на большие пиццы',
        'Вторая пицца должна быть такой же или дешевле',
        'Не суммируется с другими скидками',
        'Действует при заказе от 1000₽'
      ],
      type: 'discount',
      isActive: true
    },
    {
      id: '2',
      title: 'Комбо "Семейный ужин"',
      description: '2 средние пиццы + 2 напитка + десерт = всего 1499₽. Экономия до 500₽!',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
      discount: '30%',
      validUntil: '15.01.2025',
      conditions: [
        'В комбо входят любые 2 средние пиццы',
        'Напитки: кола, спрайт, фанта (0.5л)',
        'Десерт на выбор из доступных',
        'Доставка включена'
      ],
      type: 'combo',
      isActive: true
    },
    {
      id: '3',
      title: 'Бесплатная доставка',
      description: 'При заказе от 800₽ доставляем бесплатно в любую точку города!',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      discount: 'FREE',
      validUntil: 'Постоянно',
      conditions: [
        'Минимальная сумма заказа 800₽',
        'Действует по всему городу',
        'Время доставки 30-45 минут',
        'Работает ежедневно'
      ],
      type: 'gift',
      isActive: true
    },
    {
      id: '4',
      title: 'Программа лояльности',
      description: 'Накапливайте баллы с каждого заказа и получайте скидки до 15%!',
      image: 'https://images.pexels.com/photos/1653877/pexels-photo-1653877.jpeg',
      discount: '15%',
      validUntil: 'Постоянно',
      conditions: [
        '1 рубль = 1 балл',
        '100 баллов = 50₽ скидка',
        'Баллы начисляются после доставки',
        'Срок действия баллов - 1 год'
      ],
      type: 'loyalty',
      isActive: true
    },
    {
      id: '5',
      title: 'Пицца дня со скидкой 25%',
      description: 'Каждый день новая пицца со скидкой! Следите за обновлениями.',
      image: 'https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg',
      discount: '25%',
      validUntil: 'Ежедневно',
      conditions: [
        'Скидка действует только на пиццу дня',
        'Пицца дня меняется каждые 24 часа',
        'Скидка действует на все размеры',
        'Количество ограничено'
      ],
      type: 'discount',
      isActive: true
    },
    {
      id: '6',
      title: 'Студенческая скидка 20%',
      description: 'Студентам очной формы обучения скидка 20% при предъявлении студенческого билета.',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg',
      discount: '20%',
      validUntil: 'Постоянно',
      conditions: [
        'Необходим действующий студенческий билет',
        'Скидка на весь заказ',
        'Не суммируется с другими акциями',
        'Действует при самовывозе и доставке'
      ],
      type: 'discount',
      isActive: true
    }
  ];

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'discount': return Percent;
      case 'combo': return Users;
      case 'gift': return Gift;
      case 'loyalty': return Calendar;
      default: return Percent;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'discount': return 'bg-red-100 text-red-800';
      case 'combo': return 'bg-blue-100 text-blue-800';
      case 'gift': return 'bg-green-100 text-green-800';
      case 'loyalty': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeName = (type: string) => {
    switch (type) {
      case 'discount': return 'Скидка';
      case 'combo': return 'Комбо';
      case 'gift': return 'Подарок';
      case 'loyalty': return 'Лояльность';
      default: return 'Акция';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Акции и скидки</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Выгодные предложения, которые сделают ваш заказ еще вкуснее и доступнее
          </p>
        </div>

        {/* Активные акции */}
        <section className="mb-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {promotions.filter(promo => promo.isActive).map((promotion) => {
              const TypeIcon = getTypeIcon(promotion.type);
              
              return (
                <Card key={promotion.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={promotion.image}
                      alt={promotion.title}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={getTypeColor(promotion.type)}>
                        <TypeIcon className="h-3 w-3 mr-1" />
                        {getTypeName(promotion.type)}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-yellow-500 text-black font-bold">
                        {promotion.discount}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-xl">{promotion.title}</CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <p className="text-gray-600 mb-4">{promotion.description}</p>
                    
                    <div className="mb-4">
                      <h4 className="font-semibold text-sm text-gray-900 mb-2">Условия акции:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {promotion.conditions.map((condition, index) => (
                          <li key={index} className="flex items-start">
                            <span className="text-red-500 mr-2">•</span>
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-500">
                        <Calendar className="h-4 w-4 inline mr-1" />
                        До {promotion.validUntil}
                      </div>
                      <Link to="/menu">
                        <Button className="bg-red-600 hover:bg-red-700">
                          Заказать
                        </Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>

        {/* Сезонные предложения */}
        <section className="mb-12">
          <Card className="bg-gradient-to-r from-orange-500 to-red-600 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Зимние предложения</h2>
              <p className="text-xl mb-6 text-orange-100">
                Согрейтесь нашими горячими новинками! Специальные зимние пиццы с согревающими специями.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Пицца "Зимняя сказка"</h3>
                  <p className="text-sm text-orange-100">С корицей и яблоками</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Пицца "Согревающая"</h3>
                  <p className="text-sm text-orange-100">С острым перцем и имбирем</p>
                </div>
                <div className="bg-white bg-opacity-20 rounded-lg p-4">
                  <h3 className="font-bold mb-2">Пицца "Новогодняя"</h3>
                  <p className="text-sm text-orange-100">С клюквой и индейкой</p>
                </div>
              </div>
              <Link to="/menu">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  Попробовать зимние новинки
                </Button>
              </Link>
            </CardContent>
          </Card>
        </section>

        {/* Информация о накопительной программе */}
        <section className="mb-12">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-center">Программа лояльности PizzaExpress</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
                <div>
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">1</span>
                  </div>
                  <h3 className="font-semibold mb-2">Регистрируйтесь</h3>
                  <p className="text-gray-600 text-sm">Создайте аккаунт и начните накапливать баллы с первого заказа</p>
                </div>
                <div>
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">2</span>
                  </div>
                  <h3 className="font-semibold mb-2">Заказывайте</h3>
                  <p className="text-gray-600 text-sm">За каждый рубль получайте 1 балл. Баллы начисляются автоматически</p>
                </div>
                <div>
                  <div className="bg-red-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl font-bold text-red-600">3</span>
                  </div>
                  <h3 className="font-semibold mb-2">Экономьте</h3>
                  <p className="text-gray-600 text-sm">Тратьте баллы на скидки: 100 баллов = 50₽ скидка</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Подписка на новости */}
        <section>
          <Card className="bg-gray-900 text-white">
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Не пропустите новые акции!</h2>
              <p className="text-gray-300 mb-6">
                Подпишитесь на нашу рассылку и узнавайте о новых акциях и скидках первыми
              </p>
              <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Ваш email"
                  className="flex-1 px-4 py-2 rounded-lg text-gray-900"
                />
                <Button className="bg-red-600 hover:bg-red-700">
                  Подписаться
                </Button>
              </div>
              <p className="text-xs text-gray-400 mt-4">
                Нажимая "Подписаться", вы соглашаетесь с обработкой персональных данных
              </p>
            </CardContent>
          </Card>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Promotions;