import { Users, Award, Clock, Heart } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const About = () => {
  const principles = [
    {
      icon: Heart,
      title: 'Качество превыше всего',
      description: 'Мы используем только свежие и натуральные ингредиенты от проверенных поставщиков'
    },
    {
      icon: Clock,
      title: 'Быстрота и точность',
      description: 'Готовим каждую пиццу на заказ и доставляем точно в срок'
    },
    {
      icon: Users,
      title: 'Забота о клиентах',
      description: 'Каждый клиент для нас важен, мы ценим ваше доверие и стремимся его оправдать'
    },
    {
      icon: Award,
      title: 'Постоянное развитие',
      description: 'Мы постоянно совершенствуем рецепты и внедряем новые технологии'
    }
  ];

  const team = [
    {
      name: 'Алексей Петров',
      position: 'Шеф-повар',
      experience: '15 лет опыта',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Мария Сидорова',
      position: 'Менеджер по качеству',
      experience: '8 лет опыта',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg'
    },
    {
      name: 'Дмитрий Козлов',
      position: 'Технолог',
      experience: '12 лет опыта',
      image: 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg'
    }
  ];

  const achievements = [
    { number: '50,000+', label: 'Довольных клиентов' },
    { number: '5', label: 'Лет на рынке' },
    { number: '30+', label: 'Видов пиццы' },
    { number: '4.8', label: 'Средний рейтинг' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">О нас</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Мы — команда профессионалов, которая создает лучшую пиццу в городе уже более 5 лет
          </p>
        </div>

        {/* История компании */}
        <section className="mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Наша история</h2>
              <div className="space-y-4 text-gray-700">
                <p>
                  PizzaExpress начала свою историю в 2019 году с небольшой пиццерии в центре города. 
                  Наша цель была проста — готовить настоящую итальянскую пиццу из качественных 
                  ингредиентов и доставлять её быстро и горячей.
                </p>
                <p>
                  За годы работы мы завоевали доверие тысяч клиентов, расширили меню и улучшили 
                  сервис доставки. Сегодня мы гордимся тем, что стали одной из самых популярных 
                  пиццерий в городе.
                </p>
                <p>
                  Наш секрет прост: мы готовим каждую пиццу с душой, используем только свежие 
                  ингредиенты и никогда не идем на компромиссы в вопросах качества.
                </p>
              </div>
            </div>
            <div>
              <img
                src="https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg"
                alt="Наша кухня"
                className="rounded-lg shadow-lg w-full h-96 object-cover"
              />
            </div>
          </div>
        </section>

        {/* Наши принципы */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши принципы</h2>
            <p className="text-lg text-gray-600">
              Ценности, которыми мы руководствуемся в работе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {principles.map((principle, index) => (
              <Card key={index} className="text-center h-full">
                <CardContent className="p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <principle.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {principle.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {principle.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Достижения */}
        <section className="mb-16 bg-red-600 text-white rounded-lg p-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-4">Наши достижения</h2>
            <p className="text-red-100">
              Цифры, которыми мы гордимся
            </p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold mb-2">
                  {achievement.number}
                </div>
                <div className="text-red-100">
                  {achievement.label}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Команда */}
        <section className="mb-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-lg text-gray-600">
              Профессионалы, которые создают вкус
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">
                    {member.name}
                  </h3>
                  <p className="text-red-600 font-medium mb-2">
                    {member.position}
                  </p>
                  <p className="text-gray-600 text-sm">
                    {member.experience}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Фото кухни */}
        <section className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша кухня</h2>
            <p className="text-lg text-gray-600">
              Здесь рождается вкус
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <img
              src="https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg"
              alt="Кухня 1"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1395964/pexels-photo-1395964.jpeg"
              alt="Кухня 2"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
            <img
              src="https://images.pexels.com/photos/1395966/pexels-photo-1395966.jpeg"
              alt="Кухня 3"
              className="rounded-lg shadow-lg w-full h-64 object-cover"
            />
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;