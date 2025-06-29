import { useState } from 'react';
import { Search, ChevronDown, ChevronUp, MessageCircle, Phone, Mail } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const FAQ = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const categories = [
    { id: 'all', name: 'Все вопросы', count: 24 },
    { id: 'orders', name: 'Заказы', count: 8 },
    { id: 'delivery', name: 'Доставка', count: 6 },
    { id: 'payment', name: 'Оплата', count: 4 },
    { id: 'menu', name: 'Меню', count: 3 },
    { id: 'quality', name: 'Качество', count: 3 }
  ];

  const faqItems = [
    {
      id: '1',
      category: 'orders',
      question: 'Как сделать заказ?',
      answer: 'Вы можете сделать заказ несколькими способами: через наш сайт pizzaexpress.com, мобильное приложение PizzaExpress или по телефону +7 (999) 123-45-67. На сайте и в приложении вы можете выбрать пиццу, настроить размер и дополнения, указать адрес доставки и способ оплаты.',
      tags: ['заказ', 'сайт', 'приложение', 'телефон']
    },
    {
      id: '2',
      category: 'orders',
      question: 'Можно ли изменить или отменить заказ?',
      answer: 'Да, вы можете изменить или отменить заказ в течение 5 минут после оформления, пока он не поступил на кухню. Для этого свяжитесь с нами по телефону +7 (999) 123-45-67 или напишите в чат поддержки.',
      tags: ['отмена', 'изменение', 'заказ']
    },
    {
      id: '3',
      category: 'orders',
      question: 'Какая минимальная сумма заказа?',
      answer: 'Минимальная сумма заказа составляет 500 рублей. Это позволяет нам обеспечить экономически выгодную доставку и поддерживать высокое качество сервиса.',
      tags: ['минимальная сумма', 'заказ']
    },
    {
      id: '4',
      category: 'delivery',
      question: 'Сколько времени занимает доставка?',
      answer: 'Стандартное время доставки составляет 30-45 минут с момента подтверждения заказа. В час пик (18:00-21:00) время может увеличиваться до 60 минут. Мы всегда стараемся доставить заказ как можно быстрее.',
      tags: ['время доставки', 'час пик']
    },
    {
      id: '5',
      category: 'delivery',
      question: 'В какие районы вы доставляете?',
      answer: 'Мы доставляем по всему городу в пределах МКАД. Центральные районы - бесплатная доставка, удаленные районы - 150-200 рублей. Точную стоимость доставки вы увидите при оформлении заказа.',
      tags: ['зоны доставки', 'районы', 'стоимость']
    },
    {
      id: '6',
      category: 'delivery',
      question: 'Есть ли бесконтактная доставка?',
      answer: 'Да, мы предлагаем бесконтактную доставку. При оформлении заказа укажите это в комментариях. Курьер оставит заказ у двери, позвонит вам и отойдет на безопасное расстояние.',
      tags: ['бесконтактная доставка', 'безопасность']
    },
    {
      id: '7',
      category: 'payment',
      question: 'Какие способы оплаты доступны?',
      answer: 'Мы принимаем: наличные курьеру, банковские карты (курьеру или онлайн), Apple Pay, Google Pay, Samsung Pay. Онлайн-оплата доступна на сайте и в мобильном приложении.',
      tags: ['способы оплаты', 'карты', 'наличные']
    },
    {
      id: '8',
      category: 'payment',
      question: 'Можно ли оплатить картой при доставке?',
      answer: 'Да, все наши курьеры оснащены мобильными терминалами для приема банковских карт. Вы можете оплатить картой любого банка, включая бесконтактную оплату.',
      tags: ['оплата картой', 'терминал', 'курьер']
    },
    {
      id: '9',
      category: 'menu',
      question: 'Есть ли вегетарианские пиццы?',
      answer: 'Да, у нас есть специальный раздел вегетарианских пицц. Также мы можем приготовить любую пиццу без мяса по вашему желанию. Все вегетарианские позиции отмечены специальным значком в меню.',
      tags: ['вегетарианская', 'без мяса', 'меню']
    },
    {
      id: '10',
      category: 'menu',
      question: 'Можно ли заказать пиццу без глютена?',
      answer: 'К сожалению, в настоящее время мы не предлагаем безглютеновое тесто. Однако мы работаем над расширением меню и планируем добавить такие опции в ближайшем будущем.',
      tags: ['без глютена', 'тесто', 'аллергия']
    },
    {
      id: '11',
      category: 'quality',
      question: 'Из каких ингредиентов готовится пицца?',
      answer: 'Мы используем только свежие и качественные ингредиенты: натуральные томаты для соуса, моцареллу высшего сорта, свежие овощи и мясо от проверенных поставщиков. Тесто готовим ежедневно по традиционному рецепту.',
      tags: ['ингредиенты', 'качество', 'свежесть']
    },
    {
      id: '12',
      category: 'quality',
      question: 'Указываете ли вы информацию об аллергенах?',
      answer: 'Да, информация об аллергенах указана в описании каждого блюда на сайте и в приложении. Если у вас есть аллергия, обязательно сообщите об этом при заказе по телефону.',
      tags: ['аллергены', 'состав', 'безопасность']
    }
  ];

  const toggleExpanded = (id: string) => {
    setExpandedItems(prev => 
      prev.includes(id) 
        ? prev.filter(item => item !== id)
        : [...prev, id]
    );
  };

  const filteredFAQ = faqItems.filter(item => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = searchQuery === '' || 
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    return matchesCategory && matchesSearch;
  });

  const popularQuestions = faqItems.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Часто задаваемые вопросы
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Найдите ответы на самые популярные вопросы о нашем сервисе
            </p>
          </div>
        </div>
      </section>

      {/* Поиск */}
      <section className="py-8 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              placeholder="Поиск по вопросам..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-12 h-12 text-lg"
            />
          </div>
        </div>
      </section>

      {/* Категории */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap gap-3 justify-center">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                onClick={() => setSelectedCategory(category.id)}
                className={`${
                  selectedCategory === category.id 
                    ? "bg-red-600 hover:bg-red-700" 
                    : ""
                }`}
              >
                {category.name}
                <Badge variant="secondary" className="ml-2">
                  {category.count}
                </Badge>
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные вопросы */}
      {searchQuery === '' && selectedCategory === 'all' && (
        <section className="py-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Популярные вопросы
              </h2>
              <p className="text-lg text-gray-600">
                Самые часто задаваемые вопросы наших клиентов
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {popularQuestions.map((item) => (
                <Card key={item.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-gray-900 mb-3">
                      {item.question}
                    </h3>
                    <p className="text-gray-600 text-sm line-clamp-3">
                      {item.answer}
                    </p>
                    <div className="flex flex-wrap gap-1 mt-3">
                      {item.tags.slice(0, 2).map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Список вопросов */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredFAQ.length === 0 ? (
            <div className="text-center py-12">
              <MessageCircle className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Вопросы не найдены
              </h3>
              <p className="text-gray-600 mb-6">
                Попробуйте изменить поисковый запрос или выбрать другую категорию
              </p>
              <Button variant="outline">
                Задать свой вопрос
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredFAQ.map((item) => (
                <Card key={item.id}>
                  <CardContent className="p-0">
                    <button
                      onClick={() => toggleExpanded(item.id)}
                      className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center justify-between">
                        <h3 className="font-semibold text-gray-900 pr-4">
                          {item.question}
                        </h3>
                        {expandedItems.includes(item.id) ? (
                          <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        ) : (
                          <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0" />
                        )}
                      </div>
                    </button>
                    
                    {expandedItems.includes(item.id) && (
                      <div className="px-6 pb-6">
                        <div className="border-t pt-4">
                          <p className="text-gray-700 mb-4">
                            {item.answer}
                          </p>
                          <div className="flex flex-wrap gap-2">
                            {item.tags.map((tag, index) => (
                              <Badge key={index} variant="outline" className="text-xs">
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Не нашли ответ */}
      <section className="py-16 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Не нашли ответ на свой вопрос?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Свяжитесь с нами любым удобным способом, и мы обязательно поможем
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <Phone className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Позвонить</h3>
                <p className="text-gray-600 mb-3">+7 (999) 123-45-67</p>
                <p className="text-sm text-gray-500">Круглосуточно</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <MessageCircle className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Онлайн-чат</h3>
                <p className="text-gray-600 mb-3">Быстрые ответы</p>
                <p className="text-sm text-gray-500">9:00 - 23:00</p>
              </CardContent>
            </Card>
            
            <Card className="p-6 text-center">
              <CardContent className="pt-6">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                  <Mail className="h-6 w-6 text-red-600" />
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">Email</h3>
                <p className="text-gray-600 mb-3">support@pizzaexpress.com</p>
                <p className="text-sm text-gray-500">Ответ в течение часа</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-red-600 hover:bg-red-700">
              <MessageCircle className="h-4 w-4 mr-2" />
              Написать в поддержку
            </Button>
            <Button size="lg" variant="outline">
              <Phone className="h-4 w-4 mr-2" />
              Заказать звонок
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQ;