import { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { 
  Home, 
  ArrowLeft, 
  Search, 
  Pizza, 
  ShoppingCart, 
  Phone, 
  Mail,
  MapPin,
  Clock,
  Star,
  TrendingUp,
  Users,
  Award,
  RefreshCw,
  ExternalLink,
  AlertTriangle,
  Lightbulb,
  MessageCircle,
  ChevronRight,
  Heart,
  Gift,
  Zap,
  Shield,
  Headphones
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { toast } from 'sonner';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [reportSent, setReportSent] = useState(false);
  const [countdown, setCountdown] = useState(10);
  const [autoRedirect, setAutoRedirect] = useState(true);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [errorDetails, setErrorDetails] = useState({
    timestamp: new Date().toISOString(),
    userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    referrer: typeof document !== 'undefined' ? document.referrer : '',
    path: location.pathname
  });

  // Автоматическое перенаправление
  useEffect(() => {
    if (autoRedirect && countdown > 0) {
      const timer = setTimeout(() => {
        setCountdown(countdown - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else if (autoRedirect && countdown === 0) {
      navigate('/');
    }
  }, [countdown, autoRedirect, navigate]);

  // Логирование ошибки и аналитика
  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    
    // Отправка аналитики (в реальном приложении)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', 'page_not_found', {
        page_path: location.pathname,
        page_referrer: document.referrer,
        custom_parameter_1: 'user_navigation_error'
      });
    }

    // Логирование для внутренней аналитики
    const errorLog = {
      type: '404_error',
      path: location.pathname,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      referrer: document.referrer,
      sessionId: sessionStorage.getItem('session_id') || 'anonymous'
    };
    
    // В реальном приложении отправляем на сервер
    console.log('Error logged:', errorLog);
  }, [location.pathname]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/menu?search=${encodeURIComponent(searchQuery.trim())}`);
    } else {
      toast.error('Введите поисковый запрос');
    }
  };

  const handleReportError = () => {
    setReportSent(true);
    toast.success('Спасибо за сообщение! Мы исправим эту проблему.');
    
    // В реальном приложении здесь была бы отправка на сервер
    const errorReport = {
      ...errorDetails,
      reportedAt: new Date().toISOString(),
      userFeedback: 'User reported 404 error'
    };
    
    console.log('Error reported:', errorReport);
    
    // Имитация отправки на сервер
    setTimeout(() => {
      console.log('Error report sent to development team');
    }, 1000);
  };

  const stopAutoRedirect = () => {
    setAutoRedirect(false);
    setCountdown(0);
    toast.info('Автоматическое перенаправление отключено');
  };

  const refreshPage = () => {
    window.location.reload();
  };

  // Популярные страницы с иконками и описаниями
  const popularPages = [
    {
      title: 'Меню пицц',
      description: 'Посмотрите наш полный каталог вкусных пицц',
      path: '/menu',
      icon: Pizza,
      color: 'bg-red-100 text-red-600',
      badge: 'Популярно'
    },
    {
      title: 'Корзина',
      description: 'Проверьте товары в вашей корзине',
      path: '/cart',
      icon: ShoppingCart,
      color: 'bg-blue-100 text-blue-600',
      badge: null
    },
    {
      title: 'Отследить заказ',
      description: 'Узнайте статус вашего заказа',
      path: '/order-tracking',
      icon: MapPin,
      color: 'bg-green-100 text-green-600',
      badge: null
    },
    {
      title: 'О нас',
      description: 'Узнайте больше о нашей компании',
      path: '/about',
      icon: Users,
      color: 'bg-purple-100 text-purple-600',
      badge: null
    },
    {
      title: 'Акции',
      description: 'Актуальные скидки и предложения',
      path: '/promotions',
      icon: Gift,
      color: 'bg-yellow-100 text-yellow-600',
      badge: 'Скидки'
    },
    {
      title: 'Контакты',
      description: 'Свяжитесь с нами любым удобным способом',
      path: '/contacts',
      icon: Phone,
      color: 'bg-orange-100 text-orange-600',
      badge: null
    }
  ];

  // Быстрые действия
  const quickActions = [
    {
      title: 'Заказать пиццу',
      description: 'Перейти к меню и сделать заказ',
      action: () => navigate('/menu'),
      icon: Pizza,
      primary: true,
      color: 'bg-red-600 hover:bg-red-700'
    },
    {
      title: 'Позвонить нам',
      description: '+7 (999) 123-45-67',
      action: () => window.open('tel:+79991234567'),
      icon: Phone,
      primary: false,
      color: 'bg-green-600 hover:bg-green-700'
    },
    {
      title: 'Написать в поддержку',
      description: 'Получить помощь онлайн',
      action: () => navigate('/contact'),
      icon: MessageCircle,
      primary: false,
      color: 'bg-blue-600 hover:bg-blue-700'
    },
    {
      title: 'Посмотреть акции',
      description: 'Актуальные предложения',
      action: () => navigate('/promotions'),
      icon: Gift,
      primary: false,
      color: 'bg-purple-600 hover:bg-purple-700'
    }
  ];

  // Статистика компании
  const stats = [
    { label: 'Лет на рынке', value: '15+', icon: Clock, color: 'text-blue-600' },
    { label: 'Довольных клиентов', value: '50K+', icon: Users, color: 'text-green-600' },
    { label: 'Видов пицц', value: '25+', icon: Pizza, color: 'text-red-600' },
    { label: 'Средний рейтинг', value: '4.8', icon: Star, color: 'text-yellow-600' }
  ];

  // Возможные причины ошибки
  const errorReasons = [
    {
      title: 'Страница была перемещена',
      description: 'Возможно, страница была перенесена в другой раздел сайта',
      icon: ExternalLink,
      solution: 'Воспользуйтесь поиском или навигацией'
    },
    {
      title: 'Неправильная ссылка',
      description: 'Ссылка может содержать опечатку или быть устаревшей',
      icon: AlertTriangle,
      solution: 'Проверьте правильность адреса'
    },
    {
      title: 'Временная недоступность',
      description: 'Страница может быть временно недоступна',
      icon: RefreshCw,
      solution: 'Попробуйте обновить страницу'
    }
  ];

  // Рекомендации на основе пути
  const getPathSuggestions = (path: string) => {
    const suggestions = [];
    
    if (path.includes('pizza')) {
      suggestions.push({ text: 'Возможно, вы искали наше меню?', link: '/menu' });
    }
    if (path.includes('order')) {
      suggestions.push({ text: 'Хотите отследить заказ?', link: '/order-tracking' });
    }
    if (path.includes('contact')) {
      suggestions.push({ text: 'Ищете контакты?', link: '/contacts' });
    }
    if (path.includes('about')) {
      suggestions.push({ text: 'Интересует информация о нас?', link: '/about' });
    }
    
    return suggestions;
  };

  const pathSuggestions = getPathSuggestions(location.pathname);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция с анимацией */}
      <section className="relative bg-gradient-to-br from-red-600 via-red-700 to-red-800 text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-black bg-opacity-20"></div>
        <div className="absolute inset-0">
          <div className="absolute top-10 left-10 w-20 h-20 bg-white bg-opacity-10 rounded-full animate-pulse"></div>
          <div className="absolute top-32 right-20 w-16 h-16 bg-white bg-opacity-10 rounded-full animate-pulse delay-1000"></div>
          <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-white bg-opacity-10 rounded-full animate-pulse delay-2000"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="mb-8">
            <div className="text-8xl md:text-9xl font-bold mb-4 opacity-90">404</div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Упс! Страница не найдена
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-2xl mx-auto mb-8">
              Похоже, эта страница решила заказать пиццу и ушла с нашего сайта. 
              Но не волнуйтесь — мы поможем вам найти то, что нужно!
            </p>
          </div>

          {/* Автоматическое перенаправление */}
          {autoRedirect && (
            <div className="bg-white bg-opacity-20 rounded-lg p-6 mb-8 max-w-md mx-auto">
              <div className="flex items-center justify-center space-x-3 mb-4">
                <Home className="h-5 w-5" />
                <span className="font-medium">Автоматическое перенаправление</span>
              </div>
              <div className="mb-4">
                <Progress value={(10 - countdown) * 10} className="h-2 bg-white bg-opacity-30" />
              </div>
              <p className="text-sm mb-4">
                Перенаправление на главную через {countdown} секунд
              </p>
              <Button 
                onClick={stopAutoRedirect}
                variant="outline" 
                size="sm"
                className="border-white text-white hover:bg-white hover:text-red-600"
              >
                Остаться на странице
              </Button>
            </div>
          )}

          {/* Поиск */}
          <form onSubmit={handleSearch} className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Поиск по сайту..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 bg-white bg-opacity-90 border-0 text-gray-900 placeholder-gray-500"
              />
              <Button 
                type="submit"
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-red-600 hover:bg-red-700"
                size="sm"
              >
                Найти
              </Button>
            </div>
          </form>
        </div>
      </section>

      {/* Быстрые действия */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Что вы хотите сделать?
            </h2>
            <p className="text-lg text-gray-600">
              Выберите одно из популярных действий
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {quickActions.map((action, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={action.action}
              >
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 ${action.color} rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform`}>
                    <action.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {action.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {action.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Популярные страницы */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Популярные разделы
            </h2>
            <p className="text-lg text-gray-600">
              Возможно, вы искали одну из этих страниц
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {popularPages.map((page, index) => (
              <Card 
                key={index} 
                className="hover:shadow-lg transition-all duration-300 cursor-pointer group"
                onClick={() => navigate(page.path)}
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 ${page.color} rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform`}>
                      <page.icon className="h-6 w-6" />
                    </div>
                    {page.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {page.badge}
                      </Badge>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-red-600 transition-colors">
                    {page.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {page.description}
                  </p>
                  <div className="flex items-center text-red-600 text-sm font-medium group-hover:translate-x-1 transition-transform">
                    Перейти
                    <ChevronRight className="h-4 w-4 ml-1" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Умные предложения на основе пути */}
      {pathSuggestions.length > 0 && showSuggestions && (
        <section className="py-12 bg-blue-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Card className="border-blue-200">
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Lightbulb className="h-8 w-8 text-blue-600" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Возможно, вы искали:
                    </h3>
                    <div className="space-y-2">
                      {pathSuggestions.map((suggestion, index) => (
                        <div key={index} className="flex items-center space-x-2">
                          <span className="text-gray-700">{suggestion.text}</span>
                          <Button
                            variant="link"
                            size="sm"
                            onClick={() => navigate(suggestion.link)}
                            className="text-blue-600 hover:text-blue-700 p-0 h-auto"
                          >
                            Перейти
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowSuggestions(false)}
                  >
                    ×
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Возможные причины ошибки */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Почему это произошло?
            </h2>
            <p className="text-lg text-gray-600">
              Возможные причины и способы решения
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {errorReasons.map((reason, index) => (
              <Card key={index} className="text-center">
                <CardContent className="p-6">
                  <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <reason.icon className="h-8 w-8 text-gray-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {reason.title}
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    {reason.description}
                  </p>
                  <Badge variant="outline" className="text-xs">
                    {reason.solution}
                  </Badge>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Статистика компании */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Пока вы здесь, узнайте о нас больше
            </h2>
            <p className="text-lg text-gray-600">
              Мы — ведущая сеть пиццерий в России
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`h-8 w-8 ${stat.color}`} />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Помощь и поддержка */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Техническая поддержка */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Headphones className="h-5 w-5 text-blue-600" />
                  <span>Нужна помощь?</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Наша служба поддержки готова помочь вам 24/7
                </p>
                
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Phone className="h-4 w-4 text-green-600" />
                    <span className="text-gray-700">+7 (999) 123-45-67</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="h-4 w-4 text-blue-600" />
                    <span className="text-gray-700">support@pizzaexpress.com</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <MessageCircle className="h-4 w-4 text-purple-600" />
                    <span className="text-gray-700">Онлайн-чат на сайте</span>
                  </div>
                </div>
                
                <Separator />
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={() => window.open('tel:+79991234567')}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    Позвонить
                  </Button>
                  <Button 
                    onClick={() => navigate('/contact')}
                    variant="outline"
                    className="flex-1"
                  >
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Написать
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Сообщить об ошибке */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <AlertTriangle className="h-5 w-5 text-orange-600" />
                  <span>Сообщить об ошибке</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-gray-600">
                  Помогите нам улучшить сайт — сообщите о проблеме
                </p>
                
                <div className="bg-gray-50 p-4 rounded-lg text-sm">
                  <div className="space-y-2">
                    <div><strong>URL:</strong> {location.pathname}</div>
                    <div><strong>Время:</strong> {new Date(errorDetails.timestamp).toLocaleString('ru-RU')}</div>
                    <div><strong>Откуда пришли:</strong> {errorDetails.referrer || 'Прямой переход'}</div>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  <Button 
                    onClick={handleReportError}
                    disabled={reportSent}
                    className="flex-1 bg-orange-600 hover:bg-orange-700"
                  >
                    {reportSent ? (
                      <>
                        <Shield className="h-4 w-4 mr-2" />
                        Отправлено
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-4 w-4 mr-2" />
                        Сообщить
                      </>
                    )}
                  </Button>
                  <Button 
                    onClick={refreshPage}
                    variant="outline"
                    className="flex-1"
                  >
                    <RefreshCw className="h-4 w-4 mr-2" />
                    Обновить
                  </Button>
                </div>
                
                {reportSent && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                    <div className="flex items-center space-x-2">
                      <Shield className="h-4 w-4 text-green-600" />
                      <span className="text-sm text-green-800">
                        Спасибо! Ваше сообщение отправлено команде разработки.
                      </span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Призыв к действию */}
      <section className="py-16 bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-bold mb-4">
              Не теряйте время — закажите пиццу прямо сейчас!
            </h2>
            <p className="text-xl text-red-100 mb-8">
              Пока мы исправляем техническую проблему, вы можете насладиться нашей вкусной пиццей
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                onClick={() => navigate('/menu')}
                className="bg-white text-red-600 hover:bg-gray-100"
              >
                <Pizza className="h-5 w-5 mr-2" />
                Посмотреть меню
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/promotions')}
                className="border-white text-white hover:bg-white hover:text-red-600"
              >
                <Gift className="h-5 w-5 mr-2" />
                Актуальные акции
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                onClick={() => navigate('/')}
                className="border-white text-white hover:bg-white hover:text-red-600"
              >
                <Home className="h-5 w-5 mr-2" />
                На главную
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default NotFound;