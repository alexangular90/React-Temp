import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PizzaCard from '@/components/PizzaCard';

interface Pizza {
  _id: string;
  name: string;
  description: string;
  ingredients: string[];
  sizes: Array<{
    size: string;
    price: number;
    diameter: number;
  }>;
  category: string;
  image: string;
  rating: number;
  reviewCount: number;
}

const Menu = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [filteredPizzas, setFilteredPizzas] = useState<Pizza[]>([]);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState('name');
  const [priceRange, setPriceRange] = useState([0, 2000]);
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [minRating, setMinRating] = useState(0);

  // Расширенные категории
  const extendedCategories = [
    'Все',
    'Классические',
    'Острые', 
    'Мясные',
    'Вегетарианские',
    'С морепродуктами',
    'Сезонные',
    'Детские',
    'Фирменные',
    'Сырные'
  ];

  useEffect(() => {
    fetchPizzas();
    fetchCategories();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [pizzas, selectedCategory, searchQuery, sortBy, priceRange, selectedIngredients, minRating]);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pizzas');
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Ошибка при загрузке пицц:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pizzas/categories/list');
      const data = await response.json();
      setCategories(extendedCategories);
    } catch (error) {
      console.error('Ошибка при загрузке категорий:', error);
      setCategories(extendedCategories);
    }
  };

  const applyFilters = () => {
    let filtered = [...pizzas];

    // Фильтр по категории
    if (selectedCategory !== 'Все') {
      filtered = filtered.filter(pizza => pizza.category === selectedCategory);
    }

    // Поиск
    if (searchQuery) {
      filtered = filtered.filter(pizza =>
        pizza.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        pizza.ingredients.some(ingredient => 
          ingredient.toLowerCase().includes(searchQuery.toLowerCase())
        )
      );
    }

    // Фильтр по цене
    filtered = filtered.filter(pizza => {
      const minPrice = Math.min(...pizza.sizes.map(size => size.price));
      return minPrice >= priceRange[0] && minPrice <= priceRange[1];
    });

    // Фильтр по ингредиентам
    if (selectedIngredients.length > 0) {
      filtered = filtered.filter(pizza =>
        selectedIngredients.every(ingredient =>
          pizza.ingredients.some(pizzaIngredient =>
            pizzaIngredient.toLowerCase().includes(ingredient.toLowerCase())
          )
        )
      );
    }

    // Фильтр по рейтингу
    if (minRating > 0) {
      filtered = filtered.filter(pizza => pizza.rating >= minRating);
    }

    // Сортировка
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'price-asc':
          return Math.min(...a.sizes.map(s => s.price)) - Math.min(...b.sizes.map(s => s.price));
        case 'price-desc':
          return Math.min(...b.sizes.map(s => s.price)) - Math.min(...a.sizes.map(s => s.price));
        case 'rating':
          return b.rating - a.rating;
        case 'popular':
          return b.reviewCount - a.reviewCount;
        default:
          return a.name.localeCompare(b.name);
      }
    });

    setFilteredPizzas(filtered);
  };

  const getAllIngredients = () => {
    const ingredients = new Set<string>();
    pizzas.forEach(pizza => {
      pizza.ingredients.forEach(ingredient => {
        ingredients.add(ingredient);
      });
    });
    return Array.from(ingredients).sort();
  };

  const toggleIngredient = (ingredient: string) => {
    setSelectedIngredients(prev =>
      prev.includes(ingredient)
        ? prev.filter(i => i !== ingredient)
        : [...prev, ingredient]
    );
  };

  const clearFilters = () => {
    setSelectedCategory('Все');
    setSearchQuery('');
    setSortBy('name');
    setPriceRange([0, 2000]);
    setSelectedIngredients([]);
    setMinRating(0);
  };

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Сортировка */}
      <div>
        <h3 className="font-semibold mb-3">Сортировка</h3>
        <Select value={sortBy} onValueChange={setSortBy}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="name">По названию</SelectItem>
            <SelectItem value="price-asc">По цене (возрастание)</SelectItem>
            <SelectItem value="price-desc">По цене (убывание)</SelectItem>
            <SelectItem value="rating">По рейтингу</SelectItem>
            <SelectItem value="popular">По популярности</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Цена */}
      <div>
        <h3 className="font-semibold mb-3">Цена</h3>
        <div className="px-2">
          <Slider
            value={priceRange}
            onValueChange={setPriceRange}
            max={2000}
            min={0}
            step={50}
            className="mb-2"
          />
          <div className="flex justify-between text-sm text-gray-600">
            <span>{priceRange[0]}₽</span>
            <span>{priceRange[1]}₽</span>
          </div>
        </div>
      </div>

      {/* Рейтинг */}
      <div>
        <h3 className="font-semibold mb-3">Минимальный рейтинг</h3>
        <Select value={minRating.toString()} onValueChange={(value) => setMinRating(Number(value))}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="0">Любой</SelectItem>
            <SelectItem value="3">3+ звезды</SelectItem>
            <SelectItem value="4">4+ звезды</SelectItem>
            <SelectItem value="4.5">4.5+ звезды</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Ингредиенты */}
      <div>
        <h3 className="font-semibold mb-3">Ингредиенты</h3>
        <div className="max-h-48 overflow-y-auto space-y-2">
          {getAllIngredients().slice(0, 10).map((ingredient) => (
            <div key={ingredient} className="flex items-center space-x-2">
              <Checkbox
                id={ingredient}
                checked={selectedIngredients.includes(ingredient)}
                onCheckedChange={() => toggleIngredient(ingredient)}
              />
              <label htmlFor={ingredient} className="text-sm cursor-pointer">
                {ingredient}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Button onClick={clearFilters} variant="outline" className="w-full">
        Сбросить фильтры
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Наше меню</h1>
          <p className="text-lg text-gray-600">
            Выберите свою любимую пиццу из нашего разнообразного меню
          </p>
        </div>

        {/* Поиск и фильтры */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder="Поиск пиццы, ингредиентов..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          {/* Мобильные фильтры */}
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="sm:hidden">
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Фильтры
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Фильтры</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <FilterPanel />
              </div>
            </SheetContent>
          </Sheet>
        </div>

        {/* Категории */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                className={selectedCategory === category ? "bg-red-600 hover:bg-red-700" : ""}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Боковые фильтры для десктопа */}
          <div className="hidden lg:block">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Filter className="h-5 w-5" />
                  <span>Фильтры</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <FilterPanel />
              </CardContent>
            </Card>
          </div>

          {/* Список пицц */}
          <div className="lg:col-span-3">
            {/* Информация о результатах */}
            <div className="flex justify-between items-center mb-6">
              <p className="text-gray-600">
                Найдено {filteredPizzas.length} из {pizzas.length} пицц
              </p>
              {(selectedCategory !== 'Все' || searchQuery || selectedIngredients.length > 0 || minRating > 0) && (
                <div className="flex flex-wrap gap-2">
                  {selectedCategory !== 'Все' && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setSelectedCategory('Все')}>
                      {selectedCategory} ×
                    </Badge>
                  )}
                  {selectedIngredients.map(ingredient => (
                    <Badge key={ingredient} variant="secondary" className="cursor-pointer" onClick={() => toggleIngredient(ingredient)}>
                      {ingredient} ×
                    </Badge>
                  ))}
                  {minRating > 0 && (
                    <Badge variant="secondary" className="cursor-pointer" onClick={() => setMinRating(0)}>
                      {minRating}+ звезд ×
                    </Badge>
                  )}
                </div>
              )}
            </div>

            {loading ? (
              <div className="text-center py-12">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-red-600"></div>
                <p className="mt-2 text-gray-600">Загрузка пицц...</p>
              </div>
            ) : filteredPizzas.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 mb-4">Пиццы не найдены</p>
                <Button onClick={clearFilters} variant="outline">
                  Сбросить фильтры
                </Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredPizzas.map((pizza) => (
                  <PizzaCard key={pizza._id} pizza={pizza} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;