import { MapPin, Clock, DollarSign, Users, TrendingUp, Award, Send, Heart, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';
import { toast } from 'sonner';

const Careers = () => {
  const [applicationForm, setApplicationForm] = useState({
    name: '',
    email: '',
    phone: '',
    position: '',
    experience: '',
    coverLetter: '',
    resume: null as File | null
  });

  const vacancies = [
    {
      id: 1,
      title: 'Пиццайоло',
      department: 'Кухня',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '60,000 - 80,000 ₽',
      experience: '1-3 года',
      description: 'Ищем опытного пиццайоло для работы в нашем ресторане. Знание традиционных итальянских рецептов приветствуется.',
      requirements: [
        'Опыт работы пиццайоло от 1 года',
        'Знание технологии приготовления пиццы',
        'Умение работать в команде',
        'Ответственность и пунктуальность'
      ],
      benefits: [
        'Официальное трудоустройство',
        'Медицинская страховка',
        'Обучение и развитие',
        'Скидки на продукцию'
      ],
      urgent: true
    },
    {
      id: 2,
      title: 'Менеджер ресторана',
      department: 'Управление',
      location: 'Санкт-Петербург',
      type: 'Полная занятость',
      salary: '80,000 - 120,000 ₽',
      experience: '3-5 лет',
      description: 'Требуется опытный менеджер для управления рестораном. Ответственность за операционную деятельность и команду.',
      requirements: [
        'Опыт управления рестораном от 3 лет',
        'Высшее образование',
        'Навыки управления персоналом',
        'Знание основ финансового планирования'
      ],
      benefits: [
        'Высокая заработная плата',
        'Бонусная система',
        'Карьерный рост',
        'Корпоративное обучение'
      ],
      urgent: false
    },
    {
      id: 3,
      title: 'Курьер',
      department: 'Доставка',
      location: 'Екатеринбург',
      type: 'Гибкий график',
      salary: '40,000 - 60,000 ₽',
      experience: 'Без опыта',
      description: 'Ищем курьеров для доставки пиццы. Возможность работы на своем или корпоративном транспорте.',
      requirements: [
        'Водительские права категории B',
        'Знание города',
        'Коммуникабельность',
        'Пунктуальность'
      ],
      benefits: [
        'Гибкий график',
        'Еженедельные выплаты',
        'Топливные карты',
        'Страхование'
      ],
      urgent: true
    },
    {
      id: 4,
      title: 'Маркетолог',
      department: 'Маркетинг',
      location: 'Москва',
      type: 'Полная занятость',
      salary: '70,000 - 100,000 ₽',
      experience: '2-4 года',
      description: 'Требуется маркетолог для развития бренда и привлечения клиентов. Работа с digital-каналами и офлайн-активностями.',
      requirements: [
        'Опыт в digital-маркетинге от 2 лет',
        'Знание SMM и контекстной рекламы',
        'Аналитические навыки',
        'Креативность'
      ],
      benefits: [
        'Творческая работа',
        'Современный офис',
        'Обучение за счет компании',
        'Дружная команда'
      ],
      urgent: false
    },
    {
      id: 5,
      title: 'Администратор зала',
      department: 'Обслуживание',
      location: 'Новосибирск',
      type: 'Полная занятость',
      salary: '35,000 - 50,000 ₽',
      experience: 'Без опыта',
      description: 'Ищем администратора зала для работы с гостями. Обучение предоставляется.',
      requirements: [
        'Приятная внешность',
        'Коммуникабельность',
        'Стрессоустойчивость',
        'Желание развиваться'
      ],
      benefits: [
        'Обучение с нуля',
        'Карьерный рост',
        'Дружный коллектив',
        'Чаевые'
      ],
      urgent: false
    },
    {
      id: 6,
      title: 'IT-разработчик',
      department: 'IT',
      location: 'Москва (удаленно)',
      type: 'Полная занятость',
      salary: '120,000 - 180,000 ₽',
      experience: '3+ лет',
      description: 'Ищем разработчика для развития наших digital-продуктов: сайта, мобильного приложения и внутренних систем.',
      requirements: [
        'Опыт с React/Node.js от 3 лет',
        'Знание TypeScript',
        'Опыт с базами данных',
        'Понимание архитектуры приложений'
      ],
      benefits: [
        'Удаленная работа',
        'Высокая зарплата',
        'Современный стек технологий',
        'Интересные проекты'
      ],
      urgent: true
    }
  ];

  const benefits = [
    {
      icon: DollarSign,
      title: 'Конкурентная зарплата',
      description: 'Достойная оплата труда и прозрачная система премирования'
    },
    {
      icon: TrendingUp,
      title: 'Карьерный рост',
      description: 'Четкие перспективы развития и продвижения по службе'
    },
    {
      icon: Heart,
      title: 'Медицинская страховка',
      description: 'Полный пакет медицинского страхования для сотрудников'
    },
    {
      icon: Award,
      title: 'Обучение и развитие',
      description: 'Корпоративные тренинги и оплата внешнего обучения'
    },
    {
      icon: Users,
      title: 'Дружная команда',
      description: 'Поддерживающий коллектив и комфортная рабочая атмосфера'
    },
    {
      icon: Star,
      title: 'Корпоративные льготы',
      description: 'Скидки на продукцию, корпоративные мероприятия'
    }
  ];

  const testimonials = [
    {
      name: 'Анна Петрова',
      position: 'Менеджер ресторана',
      text: 'Работаю в PizzaExpress уже 5 лет. Начинала администратором, сейчас управляю рестораном. Компания действительно дает возможности для роста!',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg'
    },
    {
      name: 'Михаил Сидоров',
      position: 'Шеф-повар',
      text: 'Здесь я могу реализовать свой творческий потенциал. Руководство поддерживает новые идеи и инициативы. Отличная команда!',
      image: 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg'
    },
    {
      name: 'Елена Козлова',
      position: 'Маркетолог',
      text: 'PizzaExpress - это не просто работа, это семья. Здесь ценят каждого сотрудника и создают условия для профессионального развития.',
      image: 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg'
    }
  ];

  const handleSubmitApplication = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
    setApplicationForm({
      name: '',
      email: '',
      phone: '',
      position: '',
      experience: '',
      coverLetter: '',
      resume: null
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Карьера в PizzaExpress
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Присоединяйтесь к нашей команде и станьте частью успешной истории!
            </p>
          </div>
        </div>
      </section>

      {/* Почему мы */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Почему стоит работать с нами</h2>
            <p className="text-lg text-gray-600">
              Мы создаем лучшие условия для развития и самореализации наших сотрудников
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <benefit.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-600">
                    {benefit.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Вакансии */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Открытые вакансии</h2>
            <p className="text-lg text-gray-600">
              Найдите позицию, которая подходит именно вам
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {vacancies.map((vacancy) => (
              <Card key={vacancy.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl text-gray-900 mb-2">
                        {vacancy.title}
                        {vacancy.urgent && (
                          <Badge className="ml-2 bg-red-600">Срочно</Badge>
                        )}
                      </CardTitle>
                      <Badge variant="secondary">{vacancy.department}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-gray-700">{vacancy.description}</p>
                    
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span>{vacancy.location}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span>{vacancy.type}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <DollarSign className="h-4 w-4 text-gray-400" />
                        <span>{vacancy.salary}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Users className="h-4 w-4 text-gray-400" />
                        <span>{vacancy.experience}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Требования:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {vacancy.requirements.map((req, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-red-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {req}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Мы предлагаем:</h4>
                      <ul className="text-sm text-gray-600 space-y-1">
                        {vacancy.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-start">
                            <span className="w-2 h-2 bg-green-600 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                    
                    <Button className="w-full bg-red-600 hover:bg-red-700">
                      Откликнуться на вакансию
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Отзывы сотрудников */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Что говорят наши сотрудники</h2>
            <p className="text-lg text-gray-600">
              Реальные отзывы от членов нашей команды
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-6">
                <CardContent className="pt-6">
                  <div className="flex items-center mb-4">
                    <img
                      src={testimonial.image}
                      alt={testimonial.name}
                      className="w-12 h-12 rounded-full object-cover mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                      <p className="text-sm text-gray-600">{testimonial.position}</p>
                    </div>
                  </div>
                  <p className="text-gray-700 italic">"{testimonial.text}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Форма заявки */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Отправить заявку</h2>
            <p className="text-lg text-gray-600">
              Не нашли подходящую вакансию? Отправьте нам свое резюме!
            </p>
          </div>
          
          <Card>
            <CardContent className="p-6">
              <form onSubmit={handleSubmitApplication} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="name">Имя *</Label>
                    <Input
                      id="name"
                      value={applicationForm.name}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, name: e.target.value }))}
                      placeholder="Ваше имя"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={applicationForm.email}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                      required
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <Label htmlFor="phone">Телефон *</Label>
                    <Input
                      id="phone"
                      value={applicationForm.phone}
                      onChange={(e) => setApplicationForm(prev => ({ ...prev, phone: e.target.value }))}
                      placeholder="+7 (999) 123-45-67"
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="position">Желаемая позиция</Label>
                    <Select
                      value={applicationForm.position}
                      onValueChange={(value) => setApplicationForm(prev => ({ ...prev, position: value }))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Выберите позицию" />
                      </SelectTrigger>
                      <SelectContent>
                        {vacancies.map((vacancy) => (
                          <SelectItem key={vacancy.id} value={vacancy.title}>
                            {vacancy.title}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">Другая позиция</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="experience">Опыт работы</Label>
                  <Textarea
                    id="experience"
                    value={applicationForm.experience}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, experience: e.target.value }))}
                    placeholder="Расскажите о своем опыте работы"
                    rows={3}
                  />
                </div>
                
                <div>
                  <Label htmlFor="coverLetter">Сопроводительное письмо</Label>
                  <Textarea
                    id="coverLetter"
                    value={applicationForm.coverLetter}
                    onChange={(e) => setApplicationForm(prev => ({ ...prev, coverLetter: e.target.value }))}
                    placeholder="Расскажите, почему хотите работать в PizzaExpress"
                    rows={4}
                  />
                </div>
                
                <div>
                  <Label htmlFor="resume">Резюме</Label>
                  <Input
                    id="resume"
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => setApplicationForm(prev => ({ 
                      ...prev, 
                      resume: e.target.files ? e.target.files[0] : null 
                    }))}
                  />
                  <p className="text-sm text-gray-500 mt-1">
                    Поддерживаемые форматы: PDF, DOC, DOCX (макс. 5 МБ)
                  </p>
                </div>
                
                <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                  <Send className="h-4 w-4 mr-2" />
                  Отправить заявку
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Careers;