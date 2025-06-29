import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import UniversalTable, { TableColumn, TableAction } from '@/components/universal/UniversalTable';
import UniversalForm, { FormField, FormMode } from '@/components/universal/UniversalForm';

interface User {
  _id: string;
  name: string;
  email: string;
  phone: string;
  role: string;
  addresses: Array<{
    address: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    isDefault: boolean;
  }>;
  createdAt: string;
}

const AdminUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('view');
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Пока нет API для пользователей, используем моковые данные
    const mockUsers: User[] = [
      {
        _id: '1',
        name: 'Иван Петров',
        email: 'ivan@example.com',
        phone: '+7 (999) 123-45-67',
        role: 'customer',
        addresses: [
          {
            address: 'ул. Ленина, 123',
            apartment: '45',
            entrance: '2',
            floor: '5',
            isDefault: true
          }
        ],
        createdAt: new Date().toISOString()
      },
      {
        _id: '2',
        name: 'Мария Сидорова',
        email: 'maria@example.com',
        phone: '+7 (999) 234-56-78',
        role: 'customer',
        addresses: [],
        createdAt: new Date().toISOString()
      },
      {
        _id: '3',
        name: 'Администратор',
        email: 'admin@pizzaexpress.com',
        phone: '+7 (999) 000-00-00',
        role: 'admin',
        addresses: [],
        createdAt: new Date().toISOString()
      }
    ];

    setUsers(mockUsers);
    setLoading(false);
  }, []);

  const handleView = (user: User) => {
    setSelectedUser(user);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleDelete = async (user: User) => {
    if (!confirm(`Вы уверены, что хотите удалить пользователя "${user.name}"?`)) {
      return;
    }

    // Здесь будет API вызов для удаления пользователя
    toast.success('Пользователь удален');
  };

  const handleAdd = () => {
    setSelectedUser(null);
    setFormMode('create');
    setFormOpen(true);
  };

  const handleSubmit = async (data: Record<string, any>) => {
    // Здесь будет API вызов для создания/обновления пользователя
    toast.success(formMode === 'create' ? 'Пользователь создан' : 'Пользователь обновлен');
  };

  const handleFormDelete = async () => {
    if (selectedUser) {
      await handleDelete(selectedUser);
    }
  };

  const columns: TableColumn<User>[] = [
    {
      key: 'name',
      title: 'Имя',
      sortable: true
    },
    {
      key: 'email',
      title: 'Email',
      sortable: true
    },
    {
      key: 'phone',
      title: 'Телефон',
      sortable: true
    },
    {
      key: 'role',
      title: 'Роль',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge variant={value === 'admin' ? 'destructive' : 'secondary'}>
          {value === 'admin' ? 'Администратор' : 'Клиент'}
        </Badge>
      )
    },
    {
      key: 'addresses',
      title: 'Адреса',
      render: (addresses) => (
        <div className="text-sm">
          {addresses.length > 0 ? (
            <div>
              {addresses[0].address}
              {addresses.length > 1 && (
                <div className="text-muted-foreground">
                  +{addresses.length - 1} еще...
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">Нет адресов</span>
          )}
        </div>
      )
    },
    {
      key: 'createdAt',
      title: 'Дата регистрации',
      sortable: true,
      render: (value) => new Date(value).toLocaleDateString('ru-RU')
    }
  ];

  const actions: TableAction<User>[] = [
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
      variant: 'ghost',
      show: (user) => user.role !== 'admin'
    }
  ];

  const formFields: FormField[] = [
    {
      key: 'name',
      label: 'Имя',
      type: 'text',
      required: true,
      placeholder: 'Введите имя пользователя'
    },
    {
      key: 'email',
      label: 'Email',
      type: 'email',
      required: true,
      placeholder: 'user@example.com',
      validation: (value) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(value) ? null : 'Некорректный email адрес';
      }
    },
    {
      key: 'phone',
      label: 'Телефон',
      type: 'text',
      required: true,
      placeholder: '+7 (999) 123-45-67'
    },
    {
      key: 'role',
      label: 'Роль',
      type: 'select',
      required: true,
      options: [
        { value: 'customer', label: 'Клиент' },
        { value: 'admin', label: 'Администратор' }
      ]
    },
    {
      key: 'addresses',
      label: 'Адреса',
      type: 'custom',
      render: (value, onChange) => {
        const addresses = Array.isArray(value) ? value : [];

        return (
          <div className="space-y-3">
            {addresses.map((address: any, index: number) => (
              <div key={index} className="p-3 border rounded-lg space-y-2">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Адрес {index + 1}</span>
                  <button
                    type="button"
                    onClick={() => {
                      const newAddresses = addresses.filter((_: any, i: number) => i !== index);
                      onChange(newAddresses);
                    }}
                    className="text-red-500 hover:text-red-700"
                  >
                    Удалить
                  </button>
                </div>
                <input
                  type="text"
                  value={address.address || ''}
                  onChange={(e) => {
                    const newAddresses = [...addresses];
                    newAddresses[index] = { ...address, address: e.target.value };
                    onChange(newAddresses);
                  }}
                  placeholder="Улица, дом"
                  className="w-full px-3 py-2 border rounded-md"
                />
                <div className="grid grid-cols-3 gap-2">
                  <input
                    type="text"
                    value={address.apartment || ''}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[index] = { ...address, apartment: e.target.value };
                      onChange(newAddresses);
                    }}
                    placeholder="Квартира"
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={address.entrance || ''}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[index] = { ...address, entrance: e.target.value };
                      onChange(newAddresses);
                    }}
                    placeholder="Подъезд"
                    className="px-3 py-2 border rounded-md"
                  />
                  <input
                    type="text"
                    value={address.floor || ''}
                    onChange={(e) => {
                      const newAddresses = [...addresses];
                      newAddresses[index] = { ...address, floor: e.target.value };
                      onChange(newAddresses);
                    }}
                    placeholder="Этаж"
                    className="px-3 py-2 border rounded-md"
                  />
                </div>
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={address.isDefault || false}
                    onChange={(e) => {
                      const newAddresses = addresses.map((addr: any, i: number) => ({
                        ...addr,
                        isDefault: i === index ? e.target.checked : false
                      }));
                      onChange(newAddresses);
                    }}
                    className="rounded"
                  />
                  <span className="text-sm">Основной адрес</span>
                </label>
              </div>
            ))}
            <button
              type="button"
              onClick={() => {
                onChange([...addresses, { address: '', apartment: '', entrance: '', floor: '', isDefault: false }]);
              }}
              className="w-full py-2 border-2 border-dashed border-gray-300 rounded-lg text-gray-500 hover:border-gray-400 hover:text-gray-600"
            >
              + Добавить адрес
            </button>
          </div>
        );
      }
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Управление пользователями</h1>
        <p className="text-muted-foreground">Просматривайте и управляйте пользователями системы</p>
      </div>

      <UniversalTable
        data={users}
        columns={columns}
        actions={actions}
        title="Список пользователей"
        loading={loading}
        onAdd={handleAdd}
        addButtonText="Добавить пользователя"
        emptyMessage="Пользователи не найдены"
      />

      <UniversalForm
        fields={formFields}
        data={selectedUser || {}}
        mode={formMode}
        title="пользователь"
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
        onDelete={handleFormDelete}
      />
    </div>
  );
};

export default AdminUsers;