import { Mail, Phone, Linkedin, Award, Calendar, MapPin } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const Team = () => {
  const leadership = [
    {
      name: 'Алексей Иванов',
      position: 'Основатель и CEO',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg',
      bio: 'Более 20 лет опыта в ресторанном бизнесе. Выпускник МГУ, MBA в области управления. Основал PizzaExpress в 2009 году с целью принести в Россию настоящий вкус итальянской пиццы.',
      achievements: ['Предприниматель года 2020', 'Лучший CEO ресторанного бизнеса 2022'],
      email: 'a.ivanov@pizzaexpress.com',
      phone: '+7 (999) 100-00-01',
      experience: '20+ лет',
      location: 'Москва'
    },
    {
      name: 'Мария Петрова',
      position: 'Шеф-повар и директор по качеству',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg',
      bio: 'Выпускница кулинарной академии в Неаполе, Италия. Специализируется на традиционной итальянской кухне. Отвечает за разработку рецептов и контроль качества во всех ресторанах сети.',
      achievements: ['Золотая медаль международного конкурса пиццайоло', 'Сертификат Ассоциации настоящей неапольской пиццы'],
      email: 'm.petrova@pizzaexpress.com',
      phone: '+7 (999) 100-00-02',
      experience: '15+ лет',
      location: 'Москва'
    },
    {
      name: 'Дмитрий Сидоров',
      position: 'Директор по развитию',
      image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg',
      bio: 'Отвечает за стратегическое планирование и расширение сети. Под его руководством компания открыла более 80 новых ресторанов. Эксперт в области франчайзинга и развития бизнеса.',
      achievements: ['Лучший проект расширения 2021', 'Эксперт года в области франчайзинга'],
      email: 'd.sidorov@pizzaexpress.com',
      phone: '+7 (999) 100-00-03',
      experience: '12+ лет',
      location: 'Санкт-Петербург'
    }
  ];

  const departments = [
    {
      name: 'Операционная команда',
      description: 'Обеспечивает бесперебойную работу всех ресторанов',
      members: [
        { name: 'Анна Козлова', position: 'Операционный директор', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg' },
        { name: 'Сергей Морозов', position: 'Региональный менеджер', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
        { name: 'Елена Волкова', position: 'Менеджер по качеству', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg' }
      ]
    },
    {
      name: 'IT и технологии',
      description: 'Разрабатывает и поддерживает все технологические решения',
      members: [
        { name: 'Михаил Новиков', position: 'CTO', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg' },
        { name: 'Ольга Смирнова', position: 'Lead Developer', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg' },
        { name: 'Андрей Попов', position: 'DevOps Engineer', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }
      ]
    },
    {
      name: 'Маркетинг и PR',
      description: 'Продвигает бренд и привлекает новых клиентов',
      members: [
        { name: 'Виктория Лебедева', position: 'Директор по маркетингу', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg' },
        { name: 'Игорь Васильев', position: 'SMM-менеджер', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg' },
        { name: 'Татьяна Орлова', position: 'PR-менеджер', image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg' }
      ]
    },
    {
      name: 'Служба доставки',
      description: 'Обеспечивает быструю и качественную доставку',
      members: [
        { name: 'Роман Федоров', position: 'Руководитель службы доставки', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' },
        { name: 'Алексей Кузнецов', position: 'Диспетчер', image: 'https://images.pexels.com/photos/2182970/pexels-photo-2182970.jpeg' },
        { name: 'Николай Соколов', position: 'Старший курьер', image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg' }
      ]
    }
  ];

  const values = [
    'Качество превыше всего',
    'Клиент в центре внимания',
    'Командная работа',
    'Постоянное развитие',
    'Честность и открытость',
    'Инновации и творчество'
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Наша команда
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Познакомьтесь с людьми, которые делают PizzaExpress лучшей пиццерией в России
            </p>
          </div>
        </div>
      </section>

      {/* Руководство */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Руководство компании</h2>
            <p className="text-lg text-gray-600">
              Опытные лидеры, которые определяют стратегию развития
            </p>
          </div>
          
          <div className="space-y-12">
            {leadership.map((leader, index) => (
              <Card key={index} className="overflow-hidden">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  <div className="lg:col-span-1">
                    <img
                      src={leader.image}
                      alt={leader.name}
                      className="w-full h-80 lg:h-full object-cover"
                    />
                  </div>
                  <div className="lg:col-span-2 p-6">
                    <div className="flex flex-col h-full">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-2">
                              {leader.name}
                            </h3>
                            <Badge variant="secondary" className="text-sm">
                              {leader.position}
                            </Badge>
                          </div>
                          <div className="flex space-x-2">
                            <Button variant="outline" size="sm">
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Phone className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm">
                              <Linkedin className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        
                        <p className="text-gray-700 mb-6">
                          {leader.bio}
                        </p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                          <div className="flex items-center space-x-2">
                            <Calendar className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">Опыт: {leader.experience}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <MapPin className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">{leader.location}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Mail className="h-4 w-4 text-red-600" />
                            <span className="text-sm text-gray-600">{leader.email}</span>
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-2 flex items-center">
                            <Award className="h-4 w-4 text-red-600 mr-2" />
                            Достижения
                          </h4>
                          <ul className="space-y-1">
                            {leader.achievements.map((achievement, i) => (
                              <li key={i} className="text-sm text-gray-600 flex items-center">
                                <span className="w-2 h-2 bg-red-600 rounded-full mr-2"></span>
                                {achievement}
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Отделы */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши отделы</h2>
            <p className="text-lg text-gray-600">
              Каждый отдел играет важную роль в успехе компании
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {departments.map((dept, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-xl text-gray-900">{dept.name}</CardTitle>
                  <p className="text-gray-600">{dept.description}</p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {dept.members.map((member, i) => (
                      <div key={i} className="flex items-center space-x-4">
                        <img
                          src={member.image}
                          alt={member.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium text-gray-900">{member.name}</h4>
                          <p className="text-sm text-gray-600">{member.position}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Ценности команды */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши ценности</h2>
            <p className="text-lg text-gray-600">
              Принципы, которые объединяют нашу команду
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((value, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-red-600 font-bold text-lg">{index + 1}</span>
                  </div>
                  <h3 className="font-semibold text-gray-900">{value}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Присоединяйтесь к команде */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Присоединяйтесь к нашей команде!</h2>
          <p className="text-xl text-red-100 mb-8">
            Мы всегда ищем талантливых и мотивированных людей
          </p>
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
            Посмотреть вакансии
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Team;