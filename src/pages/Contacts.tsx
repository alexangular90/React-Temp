import { useState } from 'react';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const Contacts = () => {
  const [contactForm, setContactForm] = useState({
    name: '',
    phone: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Здесь будет отправка формы
    toast.success('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
    setContactForm({ name: '', phone: '', email: '', subject: '', message: '' });
  };

  const contacts = [
    {
      icon: Phone,
      title: 'Телефоны',
      items: [
        { label: 'Горячая линия заказов', value: '+7 (999) 123-45-67' },
        { label: 'Служба поддержки', value: '+7 (999) 234-56-78' },
        { label: 'Отдел качества', value: '+7 (999) 345-67-89' }
      ]
    },
    {
      icon: Mail,
      title: 'Email',
      items: [
        { label: 'Общие вопросы', value: 'info@pizzaexpress.com' },
        { label: 'Сотрудничество', value: 'partner@pizzaexpress.com' },
        { label: 'Жалобы и предложения', value: 'feedback@pizzaexpress.com' }
      ]
    },
    {
      icon: Clock,
      title: 'Время работы',
      items: [
        { label: 'Понедельник - Воскресенье', value: '10:00 - 23:00' },
        { label: 'Прием заказов', value: '10:00 - 22:30' },
        { label: 'Служба поддержки', value: '9:00 - 24:00' }
      ]
    }
  ];

  const locations = [
    {
      name: 'Основная пиццерия',
      address: 'г. Москва, ул. Примерная, 123',
      phone: '+7 (999) 123-45-67',
      workingHours: '10:00 - 23:00',
      features: ['Доставка', 'Самовывоз', 'Зал на 50 мест', 'Парковка', 'Wi-Fi'],
      isMain: true
    },
    {
      name: 'Филиал "Центральный"',
      address: 'г. Москва, пр. Центральный, 456',
      phone: '+7 (999) 234-56-78',
      workingHours: '11:00 - 22:00',
      features: ['Самовывоз', 'Зал на 30 мест', 'Терминал оплаты'],
      isMain: false
    },
    {
      name: 'Точка самовывоза "Северная"',
      address: 'г. Москва, ул. Северная, 789',
      phone: '+7 (999) 345-67-89',
      workingHours: '12:00 - 21:00',
      features: ['Только самовывоз', 'Парковка', 'Быстрое обслуживание'],
      isMain: false
    }
  ];

  const socialLinks = [
    { name: 'ВКонтакте', url: '#', icon: '🔵' },
    { name: 'Telegram', url: '#', icon: '💙' },
    { name: 'Instagram', url: '#', icon: '📷' },
    { name: 'WhatsApp', url: '#', icon: '💚' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Контакты</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Свяжитесь с нами любым удобным способом. Мы всегда готовы помочь и ответить на ваши вопросы.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
          {/* Контактная информация */}
          <div className="lg:col-span-1 space-y-6">
            {contacts.map((contact, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <contact.icon className="h-5 w-5 text-red-600" />
                    <span>{contact.title}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {contact.items.map((item, itemIndex) => (
                      <div key={itemIndex}>
                        <p className="text-sm text-gray-600">{item.label}</p>
                        <p className="font-medium">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Социальные сети */}
            <Card>
              <CardHeader>
                <CardTitle>Мы в социальных сетях</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-3">
                  {socialLinks.map((social, index) => (
                    <a
                      key={index}
                      href={social.url}
                      className="flex items-center space-x-2 p-3 border rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <span className="text-xl">{social.icon}</span>
                      <span className="text-sm font-medium">{social.name}</span>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Форма обратной связи */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Send className="h-5 w-5 text-red-600" />
                  <span>Форма обратной связи</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="subject">Тема обращения *</Label>
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

                  <Button type="submit" className="w-full bg-red-600 hover:bg-red-700">
                    <Send className="h-4 w-4 mr-2" />
                    Отправить сообщение
                  </Button>

                  <p className="text-xs text-gray-500 text-center">
                    Нажимая "Отправить сообщение", вы соглашаетесь с обработкой персональных данных
                  </p>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Наши адреса */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Наши адреса</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {locations.map((location, index) => (
              <Card key={index} className={location.isMain ? 'ring-2 ring-red-500' : ''}>
                {location.isMain && (
                  <div className="bg-red-500 text-white text-center py-2 text-sm font-medium">
                    Основная пиццерия
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    <span>{location.name}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-600">Адрес</p>
                      <p className="font-medium">{location.address}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Телефон</p>
                      <p className="font-medium">{location.phone}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Время работы</p>
                      <p className="font-medium">{location.workingHours}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">Услуги</p>
                      <div className="flex flex-wrap gap-1">
                        {location.features.map((feature, featureIndex) => (
                          <span
                            key={featureIndex}
                            className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded"
                          >
                            {feature}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Карта */}
        <section>
          <Card>
            <CardHeader>
              <CardTitle className="text-center">Как нас найти</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-200 h-96 rounded-lg flex items-center justify-center">
                <div className="text-center text-gray-600">
                  <MapPin className="h-12 w-12 mx-auto mb-4" />
                  <p className="text-lg font-medium">Интерактивная карта</p>
                  <p className="text-sm">Здесь будет размещена карта с нашими адресами</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>

        {/* Часто задаваемые вопросы */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Часто задаваемые вопросы</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Как долго готовится заказ?</h3>
                <p className="text-gray-600 text-sm">
                  Время приготовления составляет 15-20 минут. Доставка занимает дополнительно 15-30 минут в зависимости от района.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Можно ли изменить заказ после оформления?</h3>
                <p className="text-gray-600 text-sm">
                  Да, вы можете изменить заказ в течение 5 минут после оформления, позвонив по телефону горячей линии.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Есть ли скидки для постоянных клиентов?</h3>
                <p className="text-gray-600 text-sm">
                  Да, у нас действует программа лояльности. За каждый заказ вы получаете баллы, которые можно потратить на скидки.
                </p>
              </CardContent>
            </Card>
            
            <Card>
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Что делать, если заказ не понравился?</h3>
                <p className="text-gray-600 text-sm">
                  Мы гарантируем качество наших блюд. Если заказ не соответствует ожиданиям, мы заменим его или вернем деньги.
                </p>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default Contacts;