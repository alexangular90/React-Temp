import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Star, Shield, ChefHat, MapPin, Phone, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PizzaCard from '@/components/PizzaCard';
import { toast } from 'sonner';

interface Pizza {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  sizes: Array<{
    size: string;
    price: number;
    diameter: number;
  }>;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
}

interface Promotion {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  validUntil: string;
}

interface Review {
  id: string;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Index = () => {
  const [popularPizzas, setPopularPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    message: ''
  });

  useEffect(() => {
    fetchPopularPizzas();
  }, []);

  const fetchPopularPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pizzas');
      const data = await response.json();
      // Берем первые 6 пицц как популярные
      setPopularPizzas(data.slice(0, 6));
    } catch (error) {
      console.error('Ошибка при загрузке популярных пицц:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы обратной связи
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setContactForm({ name: '', phone: '', email: '', message: '' });
  };

  const promotions: Promotion[] = [
    {
      id: '1',
      title: 'Две пиццы по цене одной!',
      description: 'При заказе любой большой пиццы - вторая в подарок!',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      discount: '50%',
      validUntil: '31.12.2024'
    },
    {
      id: '2',
      title: 'Комбо "Семейный ужин"',
      description: '2 средние пиццы + напитки + десерт = 1499₽',
      image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
      discount: '30%',
      validUntil: '15.01.2025'
    },
    {
      id: '3',
      title: 'Бесплатная доставка',
      description: 'При заказе от 800₽ доставка бесплатно!',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      discount: 'FREE',
      validUntil: 'Постоянно'
    }
  ];

  const features = [
    {
      icon: Clock,
      title: 'Быстрая доставка',
      description: 'Доставляем горячую пиццу за 30-45 минут по всему городу'
    },
    {
      icon: ChefHat,
      title: 'Свежие ингредиенты',
      description: 'Используем только натуральные продукты и готовим на заказ'
    },
    {
      icon: Truck,
      title: 'Бесплатная доставка',
      description: 'При заказе от 800₽ доставляем бесплатно'
    },
    {
      icon: Shield,
      title: 'Гарантия качества',
      description: 'Если пицца не понравилась - вернем деньги или заменим'
    }
  ];

  const reviews: Review[] = [
    {
      id: '1',
      name: 'Анна Петрова',
      rating: 5,
      comment: 'Лучшая пицца в городе! Всегда заказываем здесь, никогда не подводят. Доставка быстрая, пицца горячая.',
      date: '2024-01-15'
    },
    {
      id: '2',
      name: 'Михаил Сидоров',
      rating: 5,
      comment: 'Отличное качество и вкус! Особенно нравится пепперони. Курьеры всегда вежливые и пунктуальные.',
      date: '2024-01-10'
    },
    {
      id: '3',
      name: 'Елена Козлова',
      rating: 4,
      comment: 'Хорошая пиццерия, вкусно готовят. Иногда немного задерживают доставку, но в целом довольна.',
      date: '2024-01-08'
    }
  ];

  const deliveryZones = [
    { name: 'Центральный район', time: '30-40 мин', fee: 'Бесплатно от 800₽' },
    { name: 'Северный район', time: '35-45 мин', fee: '150₽' },
    { name: 'Южный район', time: '40-50 мин', fee: '200₽' },
    { name: 'Восточный район', time: '35-45 мин', fee: '150₽' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Слайдер с акциями */}
      <section className="relative">
        <Carousel className="w-full">
          <CarouselContent>
            {promotions.map((promo) => (
              <CarouselItem key={promo.id}>
                <div className="relative h-96 md:h-[500px] bg-gradient-to-r from-red-600 to-red-800">
                  <div className="absolute inset-0 bg-black bg-opacity-40" />
                  <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center w-full">
                      <div className="text-white">
                        <Badge className="bg-yellow-500 text-black mb-4">
                          Скидка {promo.discount}
                        </Badge>
                        <h1 className="text-3xl md:text-5xl font-bold mb-4">
                          {promo.title}
                        </h1>
                        <p className="text-xl mb-6 text-red-100">
                          {promo.description}
                        </p>
                        <p className="text-sm mb-6 text-red-200">
                          Акция действует до {promo.validUntil}
                        </p>
                        <Link to="/menu">
                          <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                            Заказать сейчас
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </Button>
                        </Link>
                      </div>
                      <div className="hidden lg:block">
                        <img
                          src={promo.image}
                          alt={promo.title}
                          className="rounded-lg shadow-2xl w-full h-80 object-cover"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-4" />
          <CarouselNext className="right-4" />
        </Carousel>
      </section>

      {/* Быстрый заказ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Быстрый заказ
            </h2>
            <p className="text-lg text-gray-600">
              Оставьте заявку и мы перезвоним в течение 5 минут
            </p>
          </div>
          
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Ваше имя"
                    value={contactForm.name}
                    onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                    required
                  />
                  <Input
                    placeholder="Телефон"
                    value={contactForm.phone}
                    onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                    required
                  />
                </div>
                <Input
                  placeholder="Email (необязательно)"
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                />
                <Textarea
                  placeholder="Что хотите заказать? (необязательно)"
                  value={contactForm.message}
                  onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                />
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  Заказать обратный звонок
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Популярные пиццы */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Хиты продаж
            </h2>
            <p className="text-lg text-gray-600">
              Самые популярные пиццы среди наших клиентов
            </p>
          </div>
          
          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
              <p className="mt-2 text-gray-600">Загрузка популярных пицц...</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {popularPizzas.map((pizza) => (
                <PizzaCard key={pizza._id} pizza={pizza} />
              ))}
            </div>
          )}
          
          <div className="text-center">
            <Link to="/menu">
              <Button size="lg" className="bg-red-600 hover:bg-red-700">
                Посмотреть все пиццы
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Преимущества */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Почему выбирают нас
            </h2>
            <p className="text-lg text-gray-600">
              Мы заботимся о качестве и комфорте наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="text-center p-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <feature.icon className="h-8 w-8 text-red-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Зоны доставки и время работы */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Зоны доставки */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <MapPin className="h-5 w-5 text-red-600" />
                  <span>Зоны доставки</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {deliveryZones.map((zone, index) => (
                    <div key={index} className="flex justify-between items-center p-3 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{zone.name}</h4>
                        <p className="text-sm text-gray-600">Время: {zone.time}</p>
                      </div>
                      <Badge variant="outline">{zone.fee}</Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-6 p-4 bg-red-50 rounded-lg">
                  <p className="text-sm text-red-800">
                    <strong>Минимальный заказ:</strong> 500₽<br />
                    <strong>Бесплатная доставка:</strong> от 800₽
                  </p>
                </div>
              </CardContent>
            </Card>

            {/* Время работы и контакты */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Clock className="h-5 w-5 text-red-600" />
                  <span>Время работы</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="text-center p-6 bg-green-50 rounded-lg">
                    <h3 className="text-2xl font-bold text-green-800 mb-2">
                      Ежедневно с 10:00 до 23:00
                    </h3>
                    <p className="text-green-700">Принимаем заказы без выходных</p>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <Phone className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">+7 (999) 123-45-67</p>
                        <p className="text-sm text-gray-600">Горячая линия заказов</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Mail className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">info@pizzaexpress.com</p>
                        <p className="text-sm text-gray-600">Для вопросов и предложений</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <MapPin className="h-5 w-5 text-red-600" />
                      <div>
                        <p className="font-medium">г. Москва, ул. Примерная, 123</p>
                        <p className="text-sm text-gray-600">Основная пиццерия</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Отзывы */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Отзывы наших клиентов
            </h2>
            <p className="text-lg text-gray-600">
              Что говорят о нас те, кто уже попробовал нашу пиццу
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reviews.map((review) => (
              <Card key={review.id} className="h-full">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="flex space-x-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">
                      {new Date(review.date).toLocaleDateString('ru-RU')}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">"{review.comment}"</p>
                  <p className="font-medium text-gray-900">— {review.name}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <Button variant="outline" size="lg">
              Оставить отзыв
            </Button>
          </div>
        </div>
      </section>

      {/* Мобильные приложения */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Скачайте наше приложение
          </h2>
          <p className="text-xl mb-8 text-red-100">
            Заказывайте пиццу еще быстрее и получайте эксклюзивные скидки
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <img src="/api/placeholder/24/24" alt="App Store" className="mr-2" />
              App Store
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <img src="/api/placeholder/24/24" alt="Google Play" className="mr-2" />
              Google Play
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;