import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import UniversalTable, { TableColumn, TableAction } from '@/components/universal/UniversalTable';
import UniversalForm, { FormField, FormMode } from '@/components/universal/UniversalForm';

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
  isAvailable: boolean;
  rating: number;
  reviewCount: number;
}

const AdminPizzas = () => {
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('view');
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);

  useEffect(() => {
    fetchPizzas();
  }, []);

  const fetchPizzas = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/pizzas');
      const data = await response.json();
      setPizzas(data);
    } catch (error) {
      console.error('Ошибка при загрузке пицц:', error);
      toast.error('Ошибка при загрузке пицц');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleEdit = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = async (pizza: Pizza) => {
    if (!confirm(`Вы уверены, что хотите удалить пиццу "${pizza.name}"?`)) {
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/pizzas/${pizza._id}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        toast.success('Пицца удалена');
        fetchPizzas();
      } else {
        throw new Error('Ошибка при удалении');
      }
    } catch (error) {
      console.error('Ошибка при удалении пиццы:', error);
      toast.error('Ошибка при удалении пиццы');
    }
  };

  const handleAdd = () => {
    setSelectedPizza(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const url = formMode === 'create' 
        ? 'http://localhost:5000/api/pizzas'
        : `http://localhost:5000/api/pizzas/${selectedPizza?._id}`;
      
      const method = formMode === 'create' ? 'POST' : 'PUT';

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        toast.success(formMode === 'create' ? 'Пицца создана' : 'Пицца обновлена');
        fetchPizzas();
      } else {
        throw new Error('Ошибка при сохранении');
      }
    } catch (error) {
      console.error('Ошибка при сохранении пиццы:', error);
      toast.error('Ошибка при сохранении пиццы');
    }
  };

  const handleFormDelete = async () => {
    if (selectedPizza) {
      await handleDelete(selectedPizza);
    }
  };

  const columns: TableColumn<Pizza>[] = [
    {
      key: 'image',
      title: 'Фото',
      render: (value) => (
        <img src={value} alt="Pizza" className="w-12 h-12 object-cover rounded" />
      ),
      width: '80px'
    },
    {
      key: 'name',
      title: 'Название',
      sortable: true
    },
    {
      key: 'category',
      title: 'Категория',
      sortable: true,
      filterable: true,
      render: (value) => <Badge variant="secondary">{value}</Badge>
    },
    {
      key: 'sizes',
      title: 'Цены',
      render: (sizes) => (
        <div className="text-sm">
          {sizes.map((size: any, index: number) => (
            <div key={index}>
              {size.size}: {size.price} ₽
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'rating',
      title: 'Рейтинг',
      sortable: true,
      render: (value, item) => (
        <div className="text-sm">
          ⭐ {value} ({item.reviewCount})
        </div>
      )
    },
    {
      key: 'isAvailable',
      title: 'Доступность',
      filterable: true,
      render: (value) => (
        <Badge variant={value ? 'default' : 'destructive'}>
          {value ? 'Доступна' : 'Недоступна'}
        </Badge>
      )
    }
  ];

  const actions: TableAction<Pizza>[] = [
    {
      label: 'Просмотр',
      icon: Eye,
      onClick: handleView,
      variant: 'ghost'
    },
    {
      label: 'Редактировать',
      icon: Edit,
      onClick: handleEdit,
      variant: 'ghost'
    },
    {
      label: 'Удалить',
      icon: Trash2,
      onClick: handleDelete,
      variant: 'ghost'
    }
  ];

  const formFields: FormField[] = [
    {
      key: 'name',
      label: 'Название',
      type: 'text',
      required: true,
      placeholder: 'Введите название пиццы'
    },
    {
      key: 'description',
      label: 'Описание',
      type: 'textarea',
      required: true,
      placeholder: 'Описание пиццы'
    },
    {
      key: 'ingredients',
      label: 'Ингредиенты',
      type: 'array',
      required: true,
      placeholder: 'Добавьте ингредиент'
    },
    {
      key: 'category',
      label: 'Категория',
      type: 'select',
      required: true,
      options: [
        { value: 'Мясные', label: 'Мясные' },
        { value: 'Вегетарианские', label: 'Вегетарианские' },
        { value: 'Острые', label: 'Острые' },
        { value: 'Сырные', label: 'Сырные' },
        { value: 'Фирменные', label: 'Фирменные' }
      ]
    },
    {
      key: 'image',
      label: 'URL изображения',
      type: 'text',
      required: true,
      placeholder: 'https://example.com/image.jpg'
    },
    {
      key: 'sizes',
      label: 'Размеры и цены',
      type: 'custom',
      required: true,
      render: (value, onChange) => {
        const sizes = Array.isArray(value) ? value : [
          { size: 'Маленькая', price: 0, diameter: 25 },
          { size: 'Средняя', price: 0, diameter: 30 },
          { size: 'Большая', price: 0, diameter: 35 }
        ];

        return (
          <div className="space-y-2">
            {sizes.map((size: any, index: number) => (
              <div key={index} className="grid grid-cols-3 gap-2">
                <div>
                  <label className="text-sm font-medium">{size.size}</label>
                  <input
                    type="number"
                    value={size.price}
                    onChange={(e) => {
                      const newSizes = [...sizes];
                      newSizes[index].price = Number(e.target.value);
                      onChange(newSizes);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Цена"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium">Диаметр (см)</label>
                  <input
                    type="number"
                    value={size.diameter}
                    onChange={(e) => {
                      const newSizes = [...sizes];
                      newSizes[index].diameter = Number(e.target.value);
                      onChange(newSizes);
                    }}
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Диаметр"
                  />
                </div>
              </div>
            ))}
          </div>
        );
      }
    },
    {
      key: 'isAvailable',
      label: 'Доступна для заказа',
      type: 'checkbox'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Управление пиццами</h1>
        <p className="text-muted-foreground">Добавляйте, редактируйте и управляйте пиццами в меню</p>
      </div>

      <UniversalTable
        data={pizzas}
        columns={columns}
        actions={actions}
        title="Список пицц"
        loading={loading}
        onAdd={handleAdd}
        addButtonText="Добавить пиццу"
        emptyMessage="Пиццы не найдены"
      />

      <UniversalForm
        fields={formFields}
        data={selectedPizza || {}}
        mode={formMode}
        title="пицца"
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleFormDelete}
      />
    </div>
  );
};

export default AdminPizzas;