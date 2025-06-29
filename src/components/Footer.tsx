import { Pizza, Phone, MapPin, Clock, Mail, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'О компании',
      links: [
        { name: 'О нас', href: '/about' },
        { name: 'Наша команда', href: '/team' },
        { name: 'История компании', href: '/history' },
        { name: 'Вакансии', href: '/careers' },
        { name: 'Наши рестораны', href: '/locations' }
      ]
    },
    {
      title: 'Клиентам',
      links: [
        { name: 'Меню', href: '/menu' },
        { name: 'Доставка и оплата', href: '/delivery' },
        { name: 'Акции', href: '/promotions' },
        { name: 'Отследить заказ', href: '/order-tracking' },
        { name: 'Программа лояльности', href: '/loyalty' }
      ]
    },
    {
      title: 'Поддержка',
      links: [
        { name: 'Часто задаваемые вопросы', href: '/faq' },
        { name: 'Обратная связь', href: '/contact' },
        { name: 'Отзывы', href: '/reviews' },
        { name: 'Как мы работаем', href: '/how-we-work' },
        { name: 'Контакты', href: '/contacts' }
      ]
    },
    {
      title: 'Правовая информация',
      links: [
        { name: 'Пользовательское соглашение', href: '/terms' },
        { name: 'Политика конфиденциальности', href: '/privacy' },
        { name: 'Публичная оферта', href: '/offer' },
        { name: 'Возврат и обмен', href: '/returns' },
        { name: 'Франчайзинг', href: '/franchise' }
      ]
    }
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/pizzaexpress' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/pizzaexpress' },
    { name: 'Twitter', icon: Twitter, href: 'https://twitter.com/pizzaexpress' },
    { name: 'YouTube', icon: Youtube, href: 'https://youtube.com/pizzaexpress' }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8">
          {/* Логотип и описание */}
          <div className="lg:col-span-2">
            <Link to="/" className="flex items-center space-x-2 mb-4">
              <Pizza className="h-8 w-8 text-red-500" />
              <span className="text-xl font-bold">PizzaExpress</span>
            </Link>
            <p className="text-gray-300 mb-6 leading-relaxed">
              Лучшая пицца в России с доставкой на дом. Свежие ингредиенты, 
              традиционные рецепты и быстрая доставка в более чем 25 городах.
            </p>
            
            {/* Контактная информация */}
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="h-4 w-4 text-red-500" />
                <span>+7 (999) 123-45-67</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="h-4 w-4 text-red-500" />
                <span>info@pizzaexpress.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="h-4 w-4 text-red-500" />
                <span>г. Москва, ул. Тверская, 15</span>
              </div>
              <div className="flex items-center space-x-3">
                <Clock className="h-4 w-4 text-red-500" />
                <span>Ежедневно с 10:00 до 23:00</span>
              </div>
            </div>
          </div>

          {/* Разделы ссылок */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h3 className="text-lg font-semibold mb-4">{section.title}</h3>
              <ul className="space-y-2">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      to={link.href}
                      className="text-gray-300 hover:text-white transition-colors text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Социальные сети и приложения */}
        <div className="border-t border-gray-800 mt-12 pt-8">
          <div className="flex flex-col lg:flex-row justify-between items-center space-y-6 lg:space-y-0">
            <div>
              <h4 className="text-lg font-semibold mb-4">Мы в социальных сетях</h4>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => (
                  <a
                    key={index}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center hover:bg-red-600 transition-colors"
                    aria-label={social.name}
                  >
                    <social.icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">Скачайте наше приложение</h4>
              <div className="flex space-x-4">
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-black text-xs font-bold">A</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Загрузить в</div>
                    <div className="text-sm font-semibold">App Store</div>
                  </div>
                </a>
                <a
                  href="#"
                  className="bg-gray-800 hover:bg-gray-700 px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
                >
                  <div className="w-6 h-6 bg-white rounded flex items-center justify-center">
                    <span className="text-black text-xs font-bold">G</span>
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-gray-400">Загрузить в</div>
                    <div className="text-sm font-semibold">Google Play</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Нижняя часть */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-center md:text-left">
              <p className="text-gray-400 text-sm">
                &copy; {currentYear} PizzaExpress. Все права защищены.
              </p>
              <p className="text-gray-500 text-xs mt-1">
                ООО "ПиццаЭкспресс" | ИНН: 7701234567 | ОГРН: 1027700123456
              </p>
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-gray-400">
              <Link to="/privacy" className="hover:text-white transition-colors">
                Конфиденциальность
              </Link>
              <Link to="/terms" className="hover:text-white transition-colors">
                Условия использования
              </Link>
              <Link to="/sitemap" className="hover:text-white transition-colors">
                Карта сайта
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;