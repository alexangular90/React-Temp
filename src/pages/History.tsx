import { Calendar, Award, MapPin, Users, TrendingUp, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const History = () => {
  const timeline = [
    {
      year: '2009',
      title: 'Начало пути',
      description: 'Открытие первой пиццерии PizzaExpress в центре Москвы на Тверской улице. Команда из 8 человек и мечта о настоящей итальянской пицце.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['Первый ресторан', '8 сотрудников', 'Авторские рецепты'],
      milestone: true
    },
    {
      year: '2010',
      title: 'Первые успехи',
      description: 'Получение первых положительных отзывов и признания клиентов. Разработка фирменного стиля и уникальных рецептов.',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      achievements: ['1000+ довольных клиентов', 'Фирменный стиль', 'Первые награды']
    },
    {
      year: '2011',
      title: 'Расширение меню',
      description: 'Добавление новых видов пиццы, разработка линейки напитков и десертов. Привлечение итальянского шеф-повара.',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      achievements: ['20 видов пиццы', 'Итальянский шеф-повар', 'Расширенное меню']
    },
    {
      year: '2012',
      title: 'Запуск доставки',
      description: 'Создание службы доставки и первого call-центра. Гарантия доставки за 45 минут или пицца бесплатно.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      achievements: ['Служба доставки', 'Call-центр', 'Гарантия времени'],
      milestone: true
    },
    {
      year: '2013',
      title: 'Второй ресторан',
      description: 'Открытие второго ресторана в Санкт-Петербурге. Начало федерального расширения сети.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['2 города', 'Федеральная сеть', '50+ сотрудников']
    },
    {
      year: '2014',
      title: 'Технологический прорыв',
      description: 'Запуск первого сайта для онлайн-заказов. Внедрение системы лояльности для постоянных клиентов.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      achievements: ['Онлайн-заказы', 'Программа лояльности', 'CRM система']
    },
    {
      year: '2015',
      title: 'Региональное развитие',
      description: 'Расширение в 5 крупных городов России. Открытие 10 новых ресторанов за год.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['5 городов', '12 ресторанов', '200+ сотрудников'],
      milestone: true
    },
    {
      year: '2016',
      title: 'Качество и стандарты',
      description: 'Получение сертификата качества ISO. Внедрение единых стандартов обслуживания во всех ресторанах.',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      achievements: ['Сертификат ISO', 'Единые стандарты', 'Контроль качества']
    },
    {
      year: '2017',
      title: 'Инновации в кухне',
      description: 'Внедрение новых технологий приготовления. Запуск линейки веганских и безглютеновых пицц.',
      image: 'https://images.pexels.com/photos/1146760/pexels-photo-1146760.jpeg',
      achievements: ['Веганское меню', 'Новые технологии', 'Здоровое питание']
    },
    {
      year: '2018',
      title: 'Юбилейный рубеж',
      description: 'Открытие 50-го ресторана. Празднование с клиентами и запуск специальных акций.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['50 ресторанов', '15 городов', '1000+ сотрудников'],
      milestone: true
    },
    {
      year: '2019',
      title: 'Цифровая трансформация',
      description: 'Полное обновление IT-инфраструктуры. Интеграция с популярными сервисами доставки.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      achievements: ['Новая IT-система', 'Интеграции', 'Автоматизация']
    },
    {
      year: '2020',
      title: 'Вызовы пандемии',
      description: 'Адаптация к новым условиям. Усиление службы доставки и запуск бесконтактной доставки.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      achievements: ['Бесконтактная доставка', 'Санитарные меры', 'Поддержка команды']
    },
    {
      year: '2021',
      title: 'Мобильные технологии',
      description: 'Запуск мобильного приложения с функциями заказа, отслеживания и программы лояльности.',
      image: 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg',
      achievements: ['Мобильное приложение', '100K+ скачиваний', 'Push-уведомления'],
      milestone: true
    },
    {
      year: '2022',
      title: 'Признание отрасли',
      description: 'Получение премии "Лучшая пиццерия года" и "Лучший работодатель в сфере общепита".',
      image: 'https://images.pexels.com/photos/315755/pexels-photo-315755.jpeg',
      achievements: ['Премия года', 'Лучший работодатель', 'Отраслевое признание']
    },
    {
      year: '2023',
      title: 'Экологические инициативы',
      description: 'Запуск программы экологической ответственности. Переход на биоразлагаемую упаковку.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['Эко-упаковка', 'Зеленые технологии', 'Социальная ответственность']
    },
    {
      year: '2024',
      title: 'Новые горизонты',
      description: 'Присутствие в 25 городах России. Планы международного расширения и новые форматы ресторанов.',
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      achievements: ['25 городов', '100+ ресторанов', 'Международные планы'],
      milestone: true
    }
  ];

  const stats = [
    { label: 'Лет на рынке', value: '15', icon: Calendar },
    { label: 'Ресторанов открыто', value: '100+', icon: MapPin },
    { label: 'Городов присутствия', value: '25', icon: TrendingUp },
    { label: 'Сотрудников', value: '2000+', icon: Users },
    { label: 'Довольных клиентов', value: '1M+', icon: Star },
    { label: 'Наград получено', value: '15', icon: Award }
  ];

  const achievements = [
    {
      year: '2015',
      title: 'Лучшая пиццерия Москвы',
      organization: 'Ресторанная премия "Золотая вилка"'
    },
    {
      year: '2018',
      title: 'Лучший франчайзинговый проект',
      organization: 'Выставка "Бизнес и Франчайзинг"'
    },
    {
      year: '2020',
      title: 'Предприниматель года',
      organization: 'Деловая премия "Лидер отрасли"'
    },
    {
      year: '2022',
      title: 'Лучшая пиццерия России',
      organization: 'Национальная ресторанная премия'
    },
    {
      year: '2022',
      title: 'Лучший работодатель',
      organization: 'HR-премия "Лучшие кадровые практики"'
    },
    {
      year: '2023',
      title: 'Экологическая ответственность',
      organization: 'Премия "Зеленый бизнес"'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              История нашей компании
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              15 лет роста, развития и служения лучшей пиццей в России
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Временная линия */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наш путь к успеху</h2>
            <p className="text-lg text-gray-600">
              Ключевые моменты в истории развития PizzaExpress
            </p>
          </div>
          
          <div className="relative">
            {/* Вертикальная линия */}
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200 hidden lg:block"></div>
            
            <div className="space-y-12">
              {timeline.map((event, index) => (
                <div key={index} className={`relative flex items-center ${
                  index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
                }`}>
                  {/* Контент */}
                  <div className={`w-full lg:w-5/12 ${
                    index % 2 === 0 ? 'lg:pr-8 lg:text-right' : 'lg:pl-8 lg:text-left'
                  }`}>
                    <Card className={`p-6 ${event.milestone ? 'border-red-500 border-2' : ''}`}>
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant={event.milestone ? 'default' : 'secondary'} className={
                          event.milestone ? 'bg-red-600' : ''
                        }>
                          {event.year}
                        </Badge>
                        {event.milestone && (
                          <Award className="h-5 w-5 text-red-600" />
                        )}
                      </div>
                      
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        {event.title}
                      </h3>
                      
                      <p className="text-gray-700 mb-4">
                        {event.description}
                      </p>
                      
                      <div className="flex flex-wrap gap-2">
                        {event.achievements.map((achievement, i) => (
                          <Badge key={i} variant="outline" className="text-xs">
                            {achievement}
                          </Badge>
                        ))}
                      </div>
                    </Card>
                  </div>
                  
                  {/* Центральная точка */}
                  <div className="hidden lg:block relative z-10 w-6 h-6 bg-red-600 rounded-full border-4 border-white shadow-lg">
                    {event.milestone && (
                      <div className="absolute -inset-2 bg-red-600 rounded-full opacity-20 animate-pulse"></div>
                    )}
                  </div>
                  
                  {/* Изображение */}
                  <div className={`w-full lg:w-5/12 mt-4 lg:mt-0 ${
                    index % 2 === 0 ? 'lg:pl-8' : 'lg:pr-8'
                  }`}>
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-48 object-cover rounded-lg shadow-md"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Награды и достижения */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Награды и признание</h2>
            <p className="text-lg text-gray-600">
              Наши достижения подтверждают качество и профессионализм
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-yellow-100 rounded-full mb-4">
                    <Award className="h-8 w-8 text-yellow-600" />
                  </div>
                  <Badge variant="outline" className="mb-3">
                    {achievement.year}
                  </Badge>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {achievement.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {achievement.organization}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Будущее */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Наше будущее</h2>
          <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
            Мы продолжаем расти и развиваться, ставя перед собой амбициозные цели: 
            выход на международный рынок, открытие 200 ресторанов к 2030 году и 
            сохранение лидерства в качестве и инновациях.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-3xl font-bold mb-2">2025</div>
              <div className="text-red-100">Выход в страны СНГ</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2027</div>
              <div className="text-red-100">150 ресторанов в России</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">2030</div>
              <div className="text-red-100">Международная сеть</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default History;