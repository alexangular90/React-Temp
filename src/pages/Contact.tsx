import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send, MessageCircle, Headphones, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Contact = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    type: 'general'
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const contactInfo = [
    {
      icon: Phone,
      title: 'Горячая линия',
      details: ['+7 (999) 123-45-67', 'Круглосуточно'],
      description: 'Для заказов и экстренных вопросов'
    },
    {
      icon: Mail,
      title: 'Email',
      details: ['info@pizzaexpress.com', 'support@pizzaexpress.com'],
      description: 'Для предложений и обратной связи'
    },
    {
      icon: MapPin,
      title: 'Главный офис',
      details: ['г. Москва, ул. Тверская, 15', 'БЦ "Центральный", 5 этаж'],
      description: 'Административный центр'
    },
    {
      icon: Clock,
      title: 'Время работы',
      details: ['Ежедневно 10:00 - 23:00', 'Доставка до 22:30'],
      description: 'Режим работы ресторанов'
    }
  ];

  const departments = [
    {
      name: 'Служба поддержки',
      phone: '+7 (999) 123-45-67',
      email: 'support@pizzaexpress.com',
      hours: '24/7',
      description: 'Помощь с заказами, жалобы, предложения'
    },
    {
      name: 'Отдел качества',
      phone: '+7 (999) 123-45-68',
      email: 'quality@pizzaexpress.com',
      hours: '9:00 - 18:00',
      description: 'Вопросы качества продукции'
    },
    {
      name: 'Корпоративные заказы',
      phone: '+7 (999) 123-45-69',
      email: 'corporate@pizzaexpress.com',
      hours: '9:00 - 18:00',
      description: 'Заказы для мероприятий и офисов'
    },
    {
      name: 'Франчайзинг',
      phone: '+7 (999) 123-45-70',
      email: 'franchise@pizzaexpress.com',
      hours: '9:00 - 18:00',
      description: 'Вопросы открытия франшизы'
    },
    {
      name: 'Пресс-служба',
      phone: '+7 (999) 123-45-71',
      email: 'press@pizzaexpress.com',
      hours: '9:00 - 18:00',
      description: 'Для СМИ и журналистов'
    },
    {
      name: 'HR отдел',
      phone: '+7 (999) 123-45-72',
      email: 'hr@pizzaexpress.com',
      hours: '9:00 - 18:00',
      description: 'Вопросы трудоустройства'
    }
  ];

  const faqCategories = [
    {
      title: 'Заказы и доставка',
      questions: [
        {
          q: 'Как сделать заказ?',
          a: 'Вы можете заказать через наш сайт, мобильное приложение или по телефону +7 (999) 123-45-67'
        },
        {
          q: 'Сколько времени занимает доставка?',
          a: 'Стандартное время доставки 30-45 минут. В час пик может увеличиваться до 60 минут.'
        },
        {
          q: 'Какая минимальная сумма заказа?',
          a: 'Минимальная сумма заказа составляет 500 рублей.'
        }
      ]
    },
    {
      title: 'Оплата',
      questions: [
        {
          q: 'Какие способы оплаты доступны?',
          a: 'Наличные курьеру, банковская карта курьеру, онлайн-оплата на сайте.'
        },
        {
          q: 'Можно ли оплатить картой при доставке?',
          a: 'Да, все наши курьеры оснащены мобильными терминалами для оплаты картой.'
        }
      ]
    },
    {
      title: 'Качество и состав',
      questions: [
        {
          q: 'Есть ли вегетарианские пиццы?',
          a: 'Да, у нас есть специальный раздел вегетарианских пицц в меню.'
        },
        {
          q: 'Указываете ли вы аллергены?',
          a: 'Да, информация об аллергенах указана в описании каждого блюда.'
        }
      ]
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Здесь будет отправка формы на сервер
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
      setContactForm({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
      });
    } catch (error) {
      toast.error('Ошибка при отправке сообщения');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Свяжитесь с нами
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Мы всегда готовы помочь и ответить на ваши вопросы
            </p>
          </div>
        </div>
      </section>

      {/* Контактная информация */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {contactInfo.map((info, index) => (
              <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                <CardContent className="pt-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-red-100 rounded-full mb-4">
                    <info.icon className="h-8 w-8 text-red-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-3">
                    {info.title}
                  </h3>
                  <div className="space-y-1 mb-3">
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-gray-700 font-medium">
                        {detail}
                      </p>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    {info.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Форма обратной связи */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Форма */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Напишите нам
              </h2>
              <Card>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="name">Имя *</Label>
                        <Input
                          id="name"
                          value={contactForm.name}
                          onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                          placeholder="Ваше имя"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone">Телефон *</Label>
                        <Input
                          id="phone"
                          value={contactForm.phone}
                          onChange={(e) => setContactForm(prev => ({ ...prev, phone: e.target.value }))}
                          placeholder="+7 (999) 123-45-67"
                          required
                        />
                      </div>
                    </div>
                    
                    <div>
                      <Label htmlFor="email">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={contactForm.email}
                        onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="type">Тип обращения</Label>
                      <Select
                        value={contactForm.type}
                        onValueChange={(value) => setContactForm(prev => ({ ...prev, type: value }))}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Выберите тип обращения" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="general">Общий вопрос</SelectItem>
                          <SelectItem value="order">Вопрос по заказу</SelectItem>
                          <SelectItem value="quality">Качество продукции</SelectItem>
                          <SelectItem value="delivery">Проблема с доставкой</SelectItem>
                          <SelectItem value="suggestion">Предложение</SelectItem>
                          <SelectItem value="complaint">Жалоба</SelectItem>
                          <SelectItem value="franchise">Франчайзинг</SelectItem>
                          <SelectItem value="career">Трудоустройство</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <Label htmlFor="subject">Тема сообщения *</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm(prev => ({ ...prev, subject: e.target.value }))}
                        placeholder="Кратко опишите суть вопроса"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="message">Сообщение *</Label>
                      <Textarea
                        id="message"
                        value={contactForm.message}
                        onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                        placeholder="Подробно опишите ваш вопрос или предложение"
                        rows={5}
                        required
                      />
                    </div>
                    
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-red-600 hover:bg-red-700"
                    >
                      {isSubmitting ? (
                        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                      ) : (
                        <Send className="h-4 w-4 mr-2" />
                      )}
                      {isSubmitting ? 'Отправка...' : 'Отправить сообщение'}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Отделы */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Наши отделы
              </h2>
              <div className="space-y-4">
                {departments.map((dept, index) => (
                  <Card key={index}>
                    <CardContent className="p-4">
                      <div className="flex items-start space-x-4">
                        <div className="flex-shrink-0">
                          <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                            <Headphones className="h-5 w-5 text-red-600" />
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-1">
                            {dept.name}
                          </h3>
                          <p className="text-sm text-gray-600 mb-2">
                            {dept.description}
                          </p>
                          <div className="space-y-1 text-sm">
                            <div className="flex items-center space-x-2">
                              <Phone className="h-3 w-3 text-gray-400" />
                              <span>{dept.phone}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Mail className="h-3 w-3 text-gray-400" />
                              <span>{dept.email}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <Clock className="h-3 w-3 text-gray-400" />
                              <span>{dept.hours}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Часто задаваемые вопросы
            </h2>
            <p className="text-lg text-gray-600">
              Ответы на самые популярные вопросы наших клиентов
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {faqCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="text-lg">{category.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {category.questions.map((faq, i) => (
                      <div key={i}>
                        <h4 className="font-medium text-gray-900 mb-2">
                          {faq.q}
                        </h4>
                        <p className="text-sm text-gray-600">
                          {faq.a}
                        </p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-gray-600 mb-4">
              Не нашли ответ на свой вопрос?
            </p>
            <Button variant="outline" size="lg">
              <MessageCircle className="h-4 w-4 mr-2" />
              Задать вопрос
            </Button>
          </div>
        </div>
      </section>

      {/* Карта (заглушка) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Как нас найти</h2>
            <p className="text-lg text-gray-600">
              Наш главный офис в центре Москвы
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Интерактивная карта</p>
              <p className="text-sm text-gray-500">г. Москва, ул. Тверская, 15</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;