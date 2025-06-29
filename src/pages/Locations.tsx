import { MapPin, Phone, Clock, Car, Navigation, Star } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useState } from 'react';

const Locations = () => {
  const [searchCity, setSearchCity] = useState('');
  const [selectedCity, setSelectedCity] = useState('all');

  const locations = [
    {
      id: 1,
      name: 'PizzaExpress Тверская',
      city: 'Москва',
      address: 'ул. Тверская, 15',
      phone: '+7 (495) 123-45-67',
      hours: 'Ежедневно 10:00 - 23:00',
      rating: 4.8,
      reviews: 245,
      features: ['Доставка', 'Самовывоз', 'Зал', 'Парковка'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: true,
      deliveryZones: ['Центральный район', 'Тверской район', 'Арбат'],
      coordinates: { lat: 55.7558, lng: 37.6176 }
    },
    {
      id: 2,
      name: 'PizzaExpress Невский',
      city: 'Санкт-Петербург',
      address: 'Невский проспект, 85',
      phone: '+7 (812) 234-56-78',
      hours: 'Ежедневно 10:00 - 23:00',
      rating: 4.7,
      reviews: 189,
      features: ['Доставка', 'Самовывоз', 'Зал'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: false,
      deliveryZones: ['Центральный район', 'Адмиралтейский район'],
      coordinates: { lat: 59.9311, lng: 30.3609 }
    },
    {
      id: 3,
      name: 'PizzaExpress Арбат',
      city: 'Москва',
      address: 'ул. Арбат, 42',
      phone: '+7 (495) 345-67-89',
      hours: 'Ежедневно 10:00 - 24:00',
      rating: 4.6,
      reviews: 156,
      features: ['Доставка', 'Самовывоз', 'Зал', 'Терраса'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: false,
      deliveryZones: ['Арбат', 'Хамовники', 'Центральный район'],
      coordinates: { lat: 55.7522, lng: 37.5927 }
    },
    {
      id: 4,
      name: 'PizzaExpress Екатеринбург Центр',
      city: 'Екатеринбург',
      address: 'ул. Ленина, 28',
      phone: '+7 (343) 456-78-90',
      hours: 'Ежедневно 10:00 - 23:00',
      rating: 4.5,
      reviews: 98,
      features: ['Доставка', 'Самовывоз', 'Зал'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: false,
      deliveryZones: ['Центр', 'Уралмаш', 'ВИЗ'],
      coordinates: { lat: 56.8431, lng: 60.6454 }
    },
    {
      id: 5,
      name: 'PizzaExpress Новосибирск',
      city: 'Новосибирск',
      address: 'ул. Красный проспект, 156',
      phone: '+7 (383) 567-89-01',
      hours: 'Ежедневно 10:00 - 23:00',
      rating: 4.4,
      reviews: 87,
      features: ['Доставка', 'Самовывоз', 'Зал', 'Детская зона'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: false,
      deliveryZones: ['Центральный район', 'Заельцовский район'],
      coordinates: { lat: 55.0084, lng: 82.9357 }
    },
    {
      id: 6,
      name: 'PizzaExpress Казань',
      city: 'Казань',
      address: 'ул. Баумана, 74',
      phone: '+7 (843) 678-90-12',
      hours: 'Ежедневно 10:00 - 23:00',
      rating: 4.6,
      reviews: 134,
      features: ['Доставка', 'Самовывоз', 'Зал', 'Wi-Fi'],
      image: 'https://images.pexels.com/photos/1566837/pexels-photo-1566837.jpeg',
      isMain: false,
      deliveryZones: ['Вахитовский район', 'Приволжский район'],
      coordinates: { lat: 55.7887, lng: 49.1221 }
    }
  ];

  const cities = ['all', ...Array.from(new Set(locations.map(loc => loc.city)))];

  const filteredLocations = locations.filter(location => {
    const matchesCity = selectedCity === 'all' || location.city === selectedCity;
    const matchesSearch = searchCity === '' || 
      location.name.toLowerCase().includes(searchCity.toLowerCase()) ||
      location.city.toLowerCase().includes(searchCity.toLowerCase()) ||
      location.address.toLowerCase().includes(searchCity.toLowerCase());
    
    return matchesCity && matchesSearch;
  });

  const stats = [
    { label: 'Городов', value: '25' },
    { label: 'Ресторанов', value: '100+' },
    { label: 'Регионов', value: '15' },
    { label: 'Зон доставки', value: '200+' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero секция */}
      <section className="relative bg-gradient-to-r from-red-600 to-red-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Наши рестораны
            </h1>
            <p className="text-xl md:text-2xl text-red-100 max-w-3xl mx-auto">
              Найдите ближайший ресторан PizzaExpress в вашем городе
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
                <div className="text-3xl font-bold text-red-600 mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Поиск и фильтры */}
      <section className="py-8 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <Input
                placeholder="Поиск по городу или адресу..."
                value={searchCity}
                onChange={(e) => setSearchCity(e.target.value)}
                className="w-full"
              />
            </div>
            <div className="w-full md:w-48">
              <Select value={selectedCity} onValueChange={setSelectedCity}>
                <SelectTrigger>
                  <SelectValue placeholder="Выберите город" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Все города</SelectItem>
                  {cities.slice(1).map((city) => (
                    <SelectItem key={city} value={city}>
                      {city}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </section>

      {/* Список ресторанов */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {filteredLocations.length === 0 ? (
            <div className="text-center py-12">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Рестораны не найдены
              </h3>
              <p className="text-gray-600">
                Попробуйте изменить параметры поиска
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {filteredLocations.map((location) => (
                <Card key={location.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative">
                    <img
                      src={location.image}
                      alt={location.name}
                      className="w-full h-48 object-cover"
                    />
                    {location.isMain && (
                      <Badge className="absolute top-2 left-2 bg-yellow-500 text-black">
                        Флагманский
                      </Badge>
                    )}
                    <div className="absolute top-2 right-2 bg-white/90 rounded-lg px-2 py-1 flex items-center space-x-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium">{location.rating}</span>
                      <span className="text-xs text-gray-600">({location.reviews})</span>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                      <span>{location.name}</span>
                      <Badge variant="outline">{location.city}</Badge>
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="space-y-4">
                    <div className="space-y-3">
                      <div className="flex items-center space-x-3">
                        <MapPin className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{location.address}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Phone className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{location.phone}</span>
                      </div>
                      
                      <div className="flex items-center space-x-3">
                        <Clock className="h-4 w-4 text-gray-400" />
                        <span className="text-gray-700">{location.hours}</span>
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Услуги:</h4>
                      <div className="flex flex-wrap gap-2">
                        {location.features.map((feature, index) => (
                          <Badge key={index} variant="secondary" className="text-xs">
                            {feature}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">Зоны доставки:</h4>
                      <p className="text-sm text-gray-600">
                        {location.deliveryZones.join(', ')}
                      </p>
                    </div>
                    
                    <div className="flex space-x-2 pt-4">
                      <Button variant="outline" className="flex-1">
                        <Navigation className="h-4 w-4 mr-2" />
                        Маршрут
                      </Button>
                      <Button className="flex-1 bg-red-600 hover:bg-red-700">
                        <Phone className="h-4 w-4 mr-2" />
                        Позвонить
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Карта (заглушка) */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Найдите нас на карте</h2>
            <p className="text-lg text-gray-600">
              Интерактивная карта со всеми нашими ресторанами
            </p>
          </div>
          
          <div className="bg-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <MapPin className="mx-auto h-12 w-12 text-gray-400 mb-4" />
              <p className="text-gray-600">Интерактивная карта</p>
              <p className="text-sm text-gray-500">Здесь будет отображаться карта с локациями</p>
            </div>
          </div>
        </div>
      </section>

      {/* Планы расширения */}
      <section className="py-16 bg-red-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Скоро в новых городах!</h2>
          <p className="text-xl text-red-100 mb-8">
            Мы активно расширяемся и планируем открытие в новых городах
          </p>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-8">
            {['Краснодар', 'Воронеж', 'Самара', 'Ростов-на-Дону'].map((city, index) => (
              <div key={index} className="text-center">
                <div className="text-2xl font-bold mb-2">{city}</div>
                <div className="text-red-200 text-sm">2025 год</div>
              </div>
            ))}
          </div>
          
          <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-red-600">
            Узнать о планах расширения
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Locations;