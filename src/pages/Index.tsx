import { Link } from 'react-router-dom';
import { ArrowRight, Clock, Truck, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Index = () => {
  const features = [
    {
      icon: Clock,
      title: 'Быстрая доставка',
      description: 'Доставляем горячую пиццу за 30-45 минут'
    },
    {
      icon: Star,
      title: 'Качественные ингредиенты',
      description: 'Используем только свежие и натуральные продукты'
    },
    {
      icon: Truck,
      title: 'Бесплатная доставка',
      description: 'При заказе от 1000 рублей доставка бесплатно'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-6xl font-bold mb-6">
                Лучшая пицца в городе
              </h1>
              <p className="text-xl mb-8 text-red-100">
                Свежие ингредиенты, традиционные рецепты и быстрая доставка. 
                Закажите сейчас и получите горячую пиццу уже через 30 минут!
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/menu">
                  <Button size="lg" className="bg-white text-red-600 hover:bg-gray-100">
                    Посмотреть меню
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </Link>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
                  Позвонить: +7 (999) 123-45-67
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg"
                alt="Вкусная пицца"
                className="rounded-lg shadow-2xl"
              />
            </div>
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
              Мы заботимся о качестве и скорости доставки
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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

      {/* Популярные пиццы */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные пиццы
            </h2>
            <p className="text-lg text-gray-600">
              Самые любимые вкусы наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            {[
              {
                name: 'Маргарита',
                image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
                price: 'от 450 ₽'
              },
              {
                name: 'Пепперони',
                image: 'https://images.pexels.com/photos/2147491/pexels-photo-2147491.jpeg',
                price: 'от 550 ₽'
              },
              {
                name: 'Четыре сыра',
                image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
                price: 'от 650 ₽'
              }
            ].map((pizza, index) => (
              <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                <img
                  src={pizza.image}
                  alt={pizza.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-lg font-semibold mb-2">{pizza.name}</h3>
                  <p className="text-red-600 font-bold">{pizza.price}</p>
                </div>
              </div>
            ))}
          </div>
          
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

      <Footer />
    </div>
  );
};

export default Index;