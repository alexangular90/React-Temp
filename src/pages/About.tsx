import { Users, Award, Clock, MapPin, Phone, Mail, Target, Heart, Zap } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const stats = [
    { label: 'Лет на рынке', value: '15+', icon: Clock },
    { label: 'Довольных клиентов', value: '50,000+', icon: Users },
    { label: 'Пицц продано', value: '500,000+', icon: Award },
    { label: 'Городов присутствия', value: '25', icon: MapPin }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Качество превыше всего',
      description: 'Мы используем только свежие ингредиенты и следуем традиционным рецептам'
    },
    {
      icon: Zap,
      title: 'Быстрая доставка',
      description: 'Гарантируем доставку горячей пиццы в течение 45 минут'
    },
    {
      icon: Users,
      title: 'Забота о клиентах',
      description: 'Каждый клиент для нас важен, мы ценим ваше доверие'
    }
  ];

  const team = [
    {
      name: 'Алексей Иванов',
      position: 'Основатель и CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      description: 'Более 20 лет опыта в ресторанном бизнесе'
    },
    {
      name: 'Мария Петрова',
      position: 'Шеф-повар',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      description: 'Выпускница кулинарной академии в Италии'
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Директор по развитию',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      description: 'Отвечает за расширение сети и качество сервиса'
    }
  ];

  const milestones = [
    { year: '2009', event: 'Открытие первой пиццерии в Москве' },
    { year: '2012', event: 'Запуск службы доставки' },
    { year: '2015', event: 'Расширение в 5 городов России' },
    { year: '2018', event: 'Открытие 50-го ресторана' },
    { year: '2020', event: 'Запуск мобильного приложения' },
    { year: '2022', event: 'Получение премии "Лучшая пиццерия года"' },
    { year: '2024', event: 'Присутствие в 25 городах России' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              О нас
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Мы создаем не просто пиццу — мы создаем моменты радости и объединяем людей за вкусной едой
            </p>
          </div>
        </div>
      </section>

      {/* Статистика */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                  <stat.icon className="h-8 w-8 text-red-600" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Наша история */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  Все началось в 2009 году с маленькой пиццерии в центре Москвы. Наш основатель, 
                  Алексей Иванов, мечтал принести в Россию настоящий вкус итальянской пиццы.
                </p>
                <p>
                  За 15 лет мы выросли из небольшого семейного бизнеса в одну из крупнейших 
                  сетей пиццерий в России. Но наши ценности остались неизменными: качество, 
                  свежесть и забота о каждом клиенте.
                </p>
                <p>
                  Сегодня PizzaExpress — это 100+ ресторанов в 25 городах России, более 
                  1000 сотрудников и миллионы довольных клиентов.
                </p>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
                alt="Наша история"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Наши ценности */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-lg text-gray-600">
              Принципы, которыми мы руководствуемся в работе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <value.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600">
                    {value.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Команда */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-lg text-gray-600">
              Люди, которые делают PizzaExpress особенным
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center overflow-hidden">
                <div className="relative">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-64 object-cover"
                  />
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <Badge variant="secondary" className="mb-3">
                    {member.position}
                  </Badge>
                  <p className="text-gray-600">
                    {member.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Временная линия */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наш путь</h2>
            <p className="text-lg text-gray-600">
              Ключевые моменты в истории компании
            </p>
          </div>
          
          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-red-200"></div>
            <div className="space-y-8">
              {milestones.map((milestone, index) => (
                <div key={index} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}>
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                    <Card className="p-4">
                      <div className="text-2xl font-bold text-red-600 mb-2">{milestone.year}</div>
                      <div className="text-gray-700">{milestone.event}</div>
                    </Card>
                  </div>
                  <div className="relative z-10 w-4 h-4 bg-red-600 rounded-full border-4 border-white shadow"></div>
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Контакты */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Свяжитесь с нами</h2>
          <p className="text-xl text-red-100 mb-8">
            Есть вопросы или предложения? Мы всегда рады услышать от вас!
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Phone className="mr-2 h-5 w-5" />
              +7 (999) 123-45-67
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
              <Mail className="mr-2 h-5 w-5" />
              info@pizzaexpress.com
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;