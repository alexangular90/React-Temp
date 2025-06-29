import { useState, useEffect } from 'react';
import { Eye, Edit, Trash2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import UniversalTable, { TableColumn, TableAction } from '@/components/universal/UniversalTable';
import UniversalForm, { FormField, FormMode } from '@/components/universal/UniversalForm';

interface Order {
  _id: string;
  orderNumber: string;
  customer: {
    name: string;
    phone: string;
    email: string;
  };
  delivery: {
    address: string;
    apartment?: string;
    entrance?: string;
    floor?: string;
    comment?: string;
  };
  items: Array<{
    pizza: {
      name: string;
      image: string;
    };
    size: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  deliveryFee: number;
  status: string;
  paymentMethod: string;
  estimatedDeliveryTime: string;
  createdAt: string;
}

const AdminOrders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [formOpen, setFormOpen] = useState(false);
  const [formMode, setFormMode] = useState<FormMode>('view');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Ошибка при загрузке заказов:', error);
      toast.error('Ошибка при загрузке заказов');
    } finally {
      setLoading(false);
    }
  };

  const handleView = (order: Order) => {
    setSelectedOrder(order);
    setFormMode('view');
    setFormOpen(true);
  };

  const handleEdit = (order: Order) => {
    setSelectedOrder(order);
    setFormMode('edit');
    setFormOpen(true);
  };

  const handleSubmit = async (data: Record<string, any>) => {
    try {
      const response = await fetch(`http://localhost:5000/api/orders/${selectedOrder?._id}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: data.status })
      });

      if (response.ok) {
        toast.success('Статус заказа обновлен');
        fetchOrders();
      } else {
        throw new Error('Ошибка при обновлении статуса');
      }
    } catch (error) {
      console.error('Ошибка при обновлении заказа:', error);
      toast.error('Ошибка при обновлении заказа');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Новый': return 'bg-blue-100 text-blue-800';
      case 'Подтвержден': return 'bg-yellow-100 text-yellow-800';
      case 'Готовится': return 'bg-orange-100 text-orange-800';
      case 'В пути': return 'bg-purple-100 text-purple-800';
      case 'Доставлен': return 'bg-green-100 text-green-800';
      case 'Отменен': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const columns: TableColumn<Order>[] = [
    {
      key: 'orderNumber',
      title: 'Номер заказа',
      sortable: true,
      render: (value) => <span className="font-mono text-sm">{value}</span>
    },
    {
      key: 'customer',
      title: 'Клиент',
      render: (customer) => (
        <div className="text-sm">
          <div className="font-medium">{customer.name}</div>
          <div className="text-muted-foreground">{customer.phone}</div>
        </div>
      )
    },
    {
      key: 'items',
      title: 'Товары',
      render: (items) => (
        <div className="text-sm">
          {items.slice(0, 2).map((item: any, index: number) => (
            <div key={index}>
              {item.pizza.name} ({item.size}) x{item.quantity}
            </div>
          ))}
          {items.length > 2 && (
            <div className="text-muted-foreground">
              +{items.length - 2} еще...
            </div>
          )}
        </div>
      )
    },
    {
      key: 'totalAmount',
      title: 'Сумма',
      sortable: true,
      render: (value) => <span className="font-medium">{value} ₽</span>
    },
    {
      key: 'status',
      title: 'Статус',
      sortable: true,
      filterable: true,
      render: (value) => (
        <Badge className={getStatusColor(value)}>
          {value}
        </Badge>
      )
    },
    {
      key: 'createdAt',
      title: 'Дата создания',
      sortable: true,
      render: (value) => new Date(value).toLocaleString('ru-RU')
    }
  ];

  const actions: TableAction<Order>[] = [
    {
      label: 'Просмотр',
      icon: Eye,
      onClick: handleView,
      variant: 'ghost'
    },
    {
      label: 'Изменить статус',
      icon: Edit,
      onClick: handleEdit,
      variant: 'ghost',
      show: (order) => order.status !== 'Доставлен' && order.status !== 'Отменен'
    }
  ];

  const formFields: FormField[] = [
    {
      key: 'orderNumber',
      label: 'Номер заказа',
      type: 'text',
      disabled: true
    },
    {
      key: 'customer.name',
      label: 'Имя клиента',
      type: 'text',
      disabled: true,
      render: (_, __, field) => (
        <input
          type="text"
          value={selectedOrder?.customer.name || ''}
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
        />
      )
    },
    {
      key: 'customer.phone',
      label: 'Телефон',
      type: 'text',
      disabled: true,
      render: (_, __, field) => (
        <input
          type="text"
          value={selectedOrder?.customer.phone || ''}
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
        />
      )
    },
    {
      key: 'delivery.address',
      label: 'Адрес доставки',
      type: 'text',
      disabled: true,
      render: (_, __, field) => (
        <input
          type="text"
          value={selectedOrder?.delivery.address || ''}
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
        />
      )
    },
    {
      key: 'items',
      label: 'Состав заказа',
      type: 'custom',
      disabled: true,
      render: () => (
        <div className="space-y-2">
          {selectedOrder?.items.map((item, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 border rounded-lg bg-gray-50">
              <img
                src={item.pizza.image}
                alt={item.pizza.name}
                className="w-12 h-12 object-cover rounded"
              />
              <div className="flex-1">
                <div className="font-medium">{item.pizza.name}</div>
                <div className="text-sm text-muted-foreground">
                  {item.size} • Количество: {item.quantity}
                </div>
              </div>
              <div className="font-medium">{item.price * item.quantity} ₽</div>
            </div>
          ))}
        </div>
      )
    },
    {
      key: 'totalAmount',
      label: 'Общая сумма',
      type: 'text',
      disabled: true,
      render: (_, __, field) => (
        <input
          type="text"
          value={`${selectedOrder?.totalAmount || 0} ₽`}
          disabled
          className="w-full px-3 py-2 border rounded-md bg-gray-50"
        />
      )
    },
    {
      key: 'status',
      label: 'Статус заказа',
      type: 'select',
      required: true,
      options: [
        { value: 'Новый', label: 'Новый' },
        { value: 'Подтвержден', label: 'Подтвержден' },
        { value: 'Готовится', label: 'Готовится' },
        { value: 'В пути', label: 'В пути' },
        { value: 'Доставлен', label: 'Доставлен' },
        { value: 'Отменен', label: 'Отменен' }
      ],
      disabled: formMode === 'view'
    }
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Управление заказами</h1>
        <p className="text-muted-foreground">Просматривайте и управляйте заказами клиентов</p>
      </div>

      <UniversalTable
        data={orders}
        columns={columns}
        actions={actions}
        title="Список заказов"
        loading={loading}
        emptyMessage="Заказы не найдены"
      />

      <UniversalForm
        fields={formFields}
        data={selectedOrder || {}}
        mode={formMode}
        title="заказ"
        open={formOpen}
        onClose={() => setFormOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default AdminOrders;