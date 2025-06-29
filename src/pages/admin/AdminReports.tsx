import { useState } from 'react';
import { Download, FileText, Calendar, TrendingUp, DollarSign, Users, Package } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { DatePickerWithRange } from '@/components/ui/date-picker';
import { Checkbox } from '@/components/ui/checkbox';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';

const AdminReports = () => {
  const [selectedReportType, setSelectedReportType] = useState('sales');
  const [selectedPeriod, setSelectedPeriod] = useState('month');
  const [selectedFormat, setSelectedFormat] = useState('pdf');
  const [isGenerating, setIsGenerating] = useState(false);

  const reportTypes = [
    {
      id: 'sales',
      title: 'Отчет по продажам',
      description: 'Детальная информация о продажах за период',
      icon: DollarSign,
      fields: ['Дата', 'Номер заказа', 'Сумма', 'Способ оплаты', 'Статус']
    },
    {
      id: 'products',
      title: 'Отчет по товарам',
      description: 'Статистика продаж по товарам',
      icon: Package,
      fields: ['Название', 'Количество', 'Выручка', 'Популярность']
    },
    {
      id: 'customers',
      title: 'Отчет по клиентам',
      description: 'Информация о клиентах и их активности',
      icon: Users,
      fields: ['Имя', 'Email', 'Телефон', 'Заказов', 'Сумма']
    },
    {
      id: 'financial',
      title: 'Финансовый отчет',
      description: 'Финансовые показатели и прибыльность',
      icon: TrendingUp,
      fields: ['Выручка', 'Расходы', 'Прибыль', 'Налоги', 'Маржа']
    }
  ];

  const predefinedReports = [
    {
      title: 'Ежедневный отчет',
      description: 'Сводка за сегодня',
      lastGenerated: '2024-01-15 09:30',
      size: '2.3 MB',
      format: 'PDF'
    },
    {
      title: 'Недельный отчет',
      description: 'Итоги недели',
      lastGenerated: '2024-01-14 18:00',
      size: '5.7 MB',
      format: 'Excel'
    },
    {
      title: 'Месячный отчет',
      description: 'Результаты месяца',
      lastGenerated: '2024-01-01 10:00',
      size: '12.4 MB',
      format: 'PDF'
    }
  ];

  const scheduledReports = [
    {
      title: 'Ежедневная сводка',
      schedule: 'Каждый день в 09:00',
      recipients: ['admin@pizzaexpress.com'],
      format: 'PDF',
      active: true
    },
    {
      title: 'Недельный анализ',
      schedule: 'Понедельник в 10:00',
      recipients: ['manager@pizzaexpress.com', 'admin@pizzaexpress.com'],
      format: 'Excel',
      active: true
    },
    {
      title: 'Месячный отчет',
      schedule: '1 число каждого месяца',
      recipients: ['director@pizzaexpress.com'],
      format: 'PDF',
      active: false
    }
  ];

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    
    try {
      // Имитация генерации отчета
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success('Отчет успешно сгенерирован и готов к скачиванию');
      
      // Здесь будет логика скачивания файла
      const link = document.createElement('a');
      link.href = '#'; // URL сгенерированного файла
      link.download = `report-${selectedReportType}-${Date.now()}.${selectedFormat}`;
      // link.click();
      
    } catch (error) {
      toast.error('Ошибка при генерации отчета');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleDownloadReport = (reportTitle: string) => {
    toast.success(`Скачивание отчета "${reportTitle}"`);
    // Здесь будет логика скачивания
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Отчеты</h1>
        <p className="text-muted-foreground">Генерация и управление отчетами</p>
      </div>

      <Tabs defaultValue="generate" className="space-y-6">
        <TabsList>
          <TabsTrigger value="generate">Создать отчет</TabsTrigger>
          <TabsTrigger value="ready">Готовые отчеты</TabsTrigger>
          <TabsTrigger value="scheduled">Автоматические</TabsTrigger>
        </TabsList>

        <TabsContent value="generate" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Настройки отчета */}
            <div className="lg:col-span-2 space-y-6">
              {/* Тип отчета */}
              <Card>
                <CardHeader>
                  <CardTitle>Тип отчета</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {reportTypes.map((type) => (
                      <div
                        key={type.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                          selectedReportType === type.id
                            ? 'border-red-500 bg-red-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setSelectedReportType(type.id)}
                      >
                        <div className="flex items-center space-x-3 mb-2">
                          <type.icon className="h-5 w-5 text-red-600" />
                          <h3 className="font-semibold">{type.title}</h3>
                        </div>
                        <p className="text-sm text-gray-600 mb-3">{type.description}</p>
                        <div className="flex flex-wrap gap-1">
                          {type.fields.map((field, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {field}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Период */}
              <Card>
                <CardHeader>
                  <CardTitle>Период</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="today">Сегодня</SelectItem>
                      <SelectItem value="yesterday">Вчера</SelectItem>
                      <SelectItem value="week">Эта неделя</SelectItem>
                      <SelectItem value="month">Этот месяц</SelectItem>
                      <SelectItem value="quarter">Этот квартал</SelectItem>
                      <SelectItem value="year">Этот год</SelectItem>
                      <SelectItem value="custom">Произвольный период</SelectItem>
                    </SelectContent>
                  </Select>

                  {selectedPeriod === 'custom' && (
                    <div>
                      <label className="block text-sm font-medium mb-2">Выберите даты</label>
                      {/* <DatePickerWithRange /> */}
                      <div className="p-3 border rounded-lg bg-gray-50">
                        <p className="text-sm text-gray-600">Компонент выбора дат будет здесь</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Дополнительные настройки */}
              <Card>
                <CardHeader>
                  <CardTitle>Дополнительные настройки</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-charts" />
                      <label htmlFor="include-charts" className="text-sm">Включить графики</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-details" />
                      <label htmlFor="include-details" className="text-sm">Детализированные данные</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-summary" />
                      <label htmlFor="include-summary" className="text-sm">Сводная информация</label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Checkbox id="include-comparison" />
                      <label htmlFor="include-comparison" className="text-sm">Сравнение с предыдущим периодом</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Предварительный просмотр и генерация */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Формат файла</CardTitle>
                </CardHeader>
                <CardContent>
                  <Select value={selectedFormat} onValueChange={setSelectedFormat}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="pdf">PDF</SelectItem>
                      <SelectItem value="excel">Excel (XLSX)</SelectItem>
                      <SelectItem value="csv">CSV</SelectItem>
                      <SelectItem value="json">JSON</SelectItem>
                    </SelectContent>
                  </Select>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Предварительный просмотр</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Тип:</span>
                      <span>{reportTypes.find(t => t.id === selectedReportType)?.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Период:</span>
                      <span>{selectedPeriod}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Формат:</span>
                      <span>{selectedFormat.toUpperCase()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Размер:</span>
                      <span>~2.5 MB</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Button
                onClick={handleGenerateReport}
                disabled={isGenerating}
                className="w-full bg-red-600 hover:bg-red-700"
                size="lg"
              >
                {isGenerating ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                    Генерация...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4 mr-2" />
                    Сгенерировать отчет
                  </>
                )}
              </Button>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="ready" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Готовые отчеты</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {predefinedReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <FileText className="h-8 w-8 text-red-600" />
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.description}</p>
                        <div className="flex items-center space-x-4 mt-1">
                          <span className="text-xs text-gray-500">
                            <Calendar className="h-3 w-3 inline mr-1" />
                            {report.lastGenerated}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {report.format}
                          </Badge>
                          <span className="text-xs text-gray-500">{report.size}</span>
                        </div>
                      </div>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReport(report.title)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Скачать
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="scheduled" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>Автоматические отчеты</CardTitle>
                <Button className="bg-red-600 hover:bg-red-700">
                  Создать расписание
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {scheduledReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className={`w-3 h-3 rounded-full ${report.active ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <h3 className="font-semibold">{report.title}</h3>
                        <p className="text-sm text-gray-600">{report.schedule}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <span className="text-xs text-gray-500">
                            Получатели: {report.recipients.join(', ')}
                          </span>
                          <Badge variant="secondary" className="text-xs">
                            {report.format}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge variant={report.active ? 'default' : 'secondary'}>
                        {report.active ? 'Активен' : 'Отключен'}
                      </Badge>
                      <Button variant="outline" size="sm">
                        Настроить
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;