import { useState, useEffect } from 'react';
import { Search, Filter, SlidersHorizontal, Grid, List, ChevronLeft, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Pagination, PaginationContent, PaginationItem, PaginationLink, PaginationNext, PaginationPrevious } from '@/components/ui/pagination';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import PizzaCard from '@/components/PizzaCard';
import { Link } from 'react-router-dom';

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
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(12);

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

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredPizzas]);

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
        case 'name-desc':
          return b.name.localeCompare(a.name);
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

  // Пагинация
  const totalPages = Math.ceil(filteredPizzas.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPizzas = filteredPizzas.slice(startIndex, endIndex);

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
            <SelectItem value="name">По названию (А-Я)</SelectItem>
            <SelectItem value="name-desc">По названию (Я-А)</SelectItem>
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
          {getAllIngredients().slice(0, 15).map((ingredient) => (
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

  const PizzaListItem = ({ pizza }: { pizza: Pizza }) => (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="flex">
        <div className="relative w-48 h-32">
          <img
            src={pizza.image}
            alt={pizza.name}
            className="w-full h-full object-cover"
          />
          <Badge className="absolute top-2 left-2 bg-red-600">
            {pizza.category}
          </Badge>
        </div>
        <div className="flex-1 p-4">
          <div className="flex justify-between items-start mb-2">
            <Link to={`/pizza/${pizza._id}`}>
              <h3 className="text-lg font-semibold hover:text-red-600 transition-colors">
                {pizza.name}
              </h3>
            </Link>
            <div className="flex items-center space-x-1">
              <span className="text-yellow-400">★</span>
              <span className="text-sm text-gray-600">
                {pizza.rating} ({pizza.reviewCount})
              </span>
            </div>
          </div>
          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {pizza.description}
          </p>
          <div className="flex justify-between items-center">
            <div className="text-xl font-bold text-red-600">
              от {Math.min(...pizza.sizes.map(s => s.price))} ₽
            </div>
            <Link to={`/pizza/${pizza._id}`}>
              <Button size="sm" className="bg-red-600 hover:bg-red-700">
                Подробнее
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Заголовок */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Каталог пиццы</h1>
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
          
          {/* Переключатель вида */}
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List className="h-4 w-4" />
            </Button>
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
                Показано {startIndex + 1}-{Math.min(endIndex, filteredPizzas.length)} из {filteredPizzas.length} пицц
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
              <>
                {/* Сетка или список */}
                {viewMode === 'grid' ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {currentPizzas.map((pizza) => (
                      <PizzaCard key={pizza._id} pizza={pizza} />
                    ))}
                  </div>
                ) : (
                  <div className="space-y-4">
                    {currentPizzas.map((pizza) => (
                      <PizzaListItem key={pizza._id} pizza={pizza} />
                    ))}
                  </div>
                )}

                {/* Пагинация */}
                {totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <Pagination>
                      <PaginationContent>
                        <PaginationItem>
                          <PaginationPrevious 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            className={currentPage === 1 ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                        
                        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                          let pageNum;
                          if (totalPages <= 5) {
                            pageNum = i + 1;
                          } else if (currentPage <= 3) {
                            pageNum = i + 1;
                          } else if (currentPage >= totalPages - 2) {
                            pageNum = totalPages - 4 + i;
                          } else {
                            pageNum = currentPage - 2 + i;
                          }
                          
                          return (
                            <PaginationItem key={pageNum}>
                              <PaginationLink
                                onClick={() => setCurrentPage(pageNum)}
                                isActive={currentPage === pageNum}
                                className="cursor-pointer"
                              >
                                {pageNum}
                              </PaginationLink>
                            </PaginationItem>
                          );
                        })}
                        
                        <PaginationItem>
                          <PaginationNext 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            className={currentPage === totalPages ? 'pointer-events-none opacity-50' : 'cursor-pointer'}
                          />
                        </PaginationItem>
                      </PaginationContent>
                    </Pagination>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Menu;