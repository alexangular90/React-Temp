import { Clock, Truck, ChefHat, Shield, CheckCircle, Star, Users, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const HowWeWork = () => {
  const orderProcess = [
    {
      step: 1,
      title: 'Оформление заказа',
      description: 'Выберите пиццу в нашем меню, настройте размер и дополнения, укажите адрес доставки',
      icon: CheckCircle,
      time: '2-3 минуты',
      details: [
        'Удобный интерфейс сайта и приложения',
        'Возможность настройки каждой пиццы',
        'Сохранение любимых заказов',
        'Различные способы оплаты'
      ]
    },
    {
      step: 2,
      title: 'Подтверждение',
      description: 'Наш оператор свяжется с вами для подтверждения заказа и уточнения деталей',
      icon: Users,
      time: '1-2 минуты',
      details: [
        'Быстрое подтверждение заказа',
        'Уточнение времени доставки',
        'Возможность изменить заказ',
        'SMS-уведомления о статусе'
      ]
    },
    {
      step: 3,
      title: 'Приготовление',
      description: 'Наши повара готовят вашу пиццу из свежих ингредиентов по традиционным рецептам',
      icon: ChefHat,
      time: '15-20 минут',
      details: [
        'Свежее тесто каждый день',
        'Качественные ингредиенты',
        'Контроль температуры печи',
        'Проверка качества готового продукта'
      ]
    },
    {
      step: 4,
      title: 'Доставка',
      description: 'Курьер доставит горячую пиццу прямо к вашей двери в течение 45 минут',
      icon: Truck,
      time: '20-25 минут',
      details: [
        'Термосумки для сохранения температуры',
        'Отслеживание курьера в реальном времени',
        'Бесконтактная доставка при необходимости',
        'Гарантия времени доставки'
      ]
    }
  ];

  const qualityStandards = [
    {
      title: 'Свежие ингредиенты',
      description: 'Ежедневные поставки свежих продуктов от проверенных поставщиков',
      icon: Shield,
      metrics: ['100% натуральные продукты', 'Ежедневный контроль качества', 'Сертификаты соответствия']
    },
    {
      title: 'Традиционные рецепты',
      description: 'Аутентичные итальянские рецепты, адаптированные под российские вкусы',
      icon: Award,
      metrics: ['15+ лет совершенствования рецептов', 'Консультации итальянских шеф-поваров', 'Регулярные дегустации']
    },
    {
      title: 'Контроль температуры',
      description: 'Строгое соблюдение температурных режимов на всех этапах приготовления',
      icon: Clock,
      metrics: ['Печи при температуре 450°C', 'Контроль времени выпечки', 'Термоконтроль доставки']
    },
    {
      title: 'Гигиена и безопасность',
      description: 'Высочайшие стандарты чистоты и безопасности пищевых продуктов',
      icon: Shield,
      metrics: ['Сертификат HACCP', 'Регулярные санитарные проверки', 'Обучение персонала']
    }
  ];

  const deliveryZones = [
    { zone: 'Центральный район', time: '25-35 мин', fee: 'Бесплатно', coverage: 95 },
    { zone: 'Северный район', time: '30-40 мин', fee: '150 ₽', coverage: 88 },
    { zone: 'Южный район', time: '35-45 мин', fee: '200 ₽', coverage: 82 },
    { zone: 'Восточный район', time: '30-40 мин', fee: '150 ₽', coverage: 90 },
    { zone: 'Западный район', time: '35-45 мин', fee: '200 ₽', coverage: 85 }
  ];

  const teamRoles = [
    {
      role: 'Пиццайоло',
      description: 'Мастера приготовления пиццы с многолетним опытом',
      responsibilities: ['Приготовление теста', 'Формовка пиццы', 'Контроль выпечки', 'Проверка качества'],
      training: '200+ часов обучения'
    },
    {
      role: 'Менеджер смены',
      description: 'Координирует работу кухни и следит за качеством',
      responsibilities: ['Контроль процессов', 'Управление командой', 'Связь с клиентами', 'Решение проблем'],
      training: '120+ часов обучения'
    },
    {
      role: 'Курьер',
      description: 'Обеспечивает быструю и безопасную доставку',
      responsibilities: ['Доставка заказов', 'Общение с клиентами', 'Контроль качества', 'Обратная связь'],
      training: '40+ часов обучения'
    },
    {
      role: 'Оператор',
      description: 'Принимает заказы и консультирует клиентов',
      responsibilities: ['Прием заказов', 'Консультации', 'Решение вопросов', 'Координация доставки'],
      training: '80+ часов обучения'
    }
  ];

  const technologies = [
    {
      name: 'Система управления заказами',
      description: 'Автоматизированная система отслеживания заказов от оформления до доставки'
    },
    {
      name: 'Мобильное приложение',
      description: 'Удобное приложение для заказа с функциями отслеживания и программой лояльности'
    },
    {
      name: 'GPS-трекинг курьеров',
      description: 'Отслеживание местоположения курьеров в реальном времени'
    },
    {
      name: 'Система контроля качества',
      description: 'Цифровые чек-листы и контроль соблюдения стандартов'
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
              Как мы работаем
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Узнайте о наших процессах, стандартах качества и технологиях, которые делают нас лучшими
            </p>
          </div>
        </div>
      </section>

      {/* Процесс заказа */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">От заказа до доставки</h2>
            <p className="text-lg text-gray-600">
              Пошаговый процесс обработки вашего заказа
            </p>
          </div>
          
          <div className="space-y-12">
            {orderProcess.map((step, index) => (
              <div key={step.step} className="relative">
                {index < orderProcess.length - 1 && (
                  <div className="absolute left-8 top-20 w-0.5 h-24 bg-red-200"></div>
                )}
                
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0">
                    <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white">
                      <step.icon className="h-8 w-8" />
                    </div>
                  </div>
                  
                  <div className="flex-1">
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-xl">
                            Шаг {step.step}: {step.title}
                          </CardTitle>
                          <Badge variant="outline">
                            <Clock className="h-3 w-3 mr-1" />
                            {step.time}
                          </Badge>
                        </div>
                        <p className="text-gray-600">{step.description}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {step.details.map((detail, i) => (
                            <div key={i} className="flex items-center space-x-2">
                              <CheckCircle className="h-4 w-4 text-green-600" />
                              <span className="text-sm text-gray-700">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Стандарты качества */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Стандарты качества</h2>
            <p className="text-lg text-gray-600">
              Наши принципы обеспечения высочайшего качества продукции
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {qualityStandards.map((standard, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mr-4">
                      <standard.icon className="h-6 w-6 text-red-600" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900">{standard.title}</h3>
                  </div>
                  <p className="text-gray-700 mb-4">{standard.description}</p>
                  <div className="space-y-2">
                    {standard.metrics.map((metric, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <Star className="h-4 w-4 text-yellow-500" />
                        <span className="text-sm text-gray-600">{metric}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Зоны доставки */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Зоны доставки</h2>
            <p className="text-lg text-gray-600">
              Покрытие и время доставки по районам города
            </p>
          </div>
          
          <div className="space-y-6">
            {deliveryZones.map((zone, index) => (
              <Card key={index}>
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                    <div>
                      <h3 className="font-semibold text-gray-900">{zone.zone}</h3>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Clock className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{zone.time}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Truck className="h-4 w-4 text-gray-400" />
                      <span className="text-gray-700">{zone.fee}</span>
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm text-gray-600">Покрытие</span>
                        <span className="text-sm font-medium">{zone.coverage}%</span>
                      </div>
                      <Progress value={zone.coverage} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Наша команда */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наша команда</h2>
            <p className="text-lg text-gray-600">
              Профессионалы, которые обеспечивают качество на каждом этапе
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {teamRoles.map((role, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center justify-between">
                    <span>{role.role}</span>
                    <Badge variant="secondary">{role.training}</Badge>
                  </CardTitle>
                  <p className="text-gray-600">{role.description}</p>
                </CardHeader>
                <CardContent>
                  <h4 className="font-semibold text-gray-900 mb-3">Обязанности:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {role.responsibilities.map((resp, i) => (
                      <div key={i} className="flex items-center space-x-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm text-gray-700">{resp}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Технологии */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Наши технологии</h2>
            <p className="text-lg text-gray-600">
              Современные решения для улучшения сервиса
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <Card key={index} className="p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">{tech.name}</h3>
                  <p className="text-gray-700">{tech.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Гарантии */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-8">Наши гарантии</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-4xl font-bold mb-2">45 мин</div>
              <div className="text-red-100">Гарантия времени доставки или пицца бесплатно</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">100%</div>
              <div className="text-red-100">Возврат денег, если пицца не понравилась</div>
            </div>
            <div>
              <div className="text-4xl font-bold mb-2">24/7</div>
              <div className="text-red-100">Поддержка клиентов в любое время</div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HowWeWork;