import { useState } from 'react';
import { Save, Bell, Globe, Shield, Palette } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { toast } from 'sonner';

const AdminSettings = () => {
  const [settings, setSettings] = useState({
    // Общие настройки
    siteName: 'PizzaExpress',
    siteDescription: 'Лучшая пицца в городе с доставкой на дом',
    contactPhone: '+7 (999) 123-45-67',
    contactEmail: 'info@pizzaexpress.com',
    address: 'г. Москва, ул. Примерная, 123',
    
    // Настройки доставки
    freeDeliveryThreshold: 1000,
    deliveryFee: 200,
    deliveryTime: 45,
    workingHours: {
      start: '10:00',
      end: '23:00'
    },
    
    // Уведомления
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    
    // Безопасность
    requireEmailVerification: false,
    maxLoginAttempts: 5,
    sessionTimeout: 24,
    
    // Интеграции
    analyticsEnabled: true,
    chatEnabled: true,
    socialMediaLinks: {
      vk: '',
      telegram: '',
      instagram: ''
    }
  });

  const [loading, setLoading] = useState(false);

  const handleInputChange = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section as keyof typeof prev] === 'object' 
        ? { ...prev[section as keyof typeof prev] as any, [field]: value }
        : value
    }));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      // Здесь будет API вызов для сохранения настроек
      await new Promise(resolve => setTimeout(resolve, 1000)); // Имитация API вызова
      toast.success('Настройки сохранены');
    } catch (error) {
      toast.error('Ошибка при сохранении настроек');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Настройки системы</h1>
          <p className="text-muted-foreground">Управляйте настройками пиццерии</p>
        </div>
        <Button onClick={handleSave} disabled={loading} className="bg-red-600 hover:bg-red-700">
          {loading ? (
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
          ) : (
            <Save className="h-4 w-4 mr-2" />
          )}
          Сохранить
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Общие настройки */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Globe className="h-5 w-5" />
              <span>Общие настройки</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="siteName">Название сайта</Label>
              <Input
                id="siteName"
                value={settings.siteName}
                onChange={(e) => setSettings(prev => ({ ...prev, siteName: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="siteDescription">Описание</Label>
              <Textarea
                id="siteDescription"
                value={settings.siteDescription}
                onChange={(e) => setSettings(prev => ({ ...prev, siteDescription: e.target.value }))}
                rows={3}
              />
            </div>
            
            <div>
              <Label htmlFor="contactPhone">Телефон</Label>
              <Input
                id="contactPhone"
                value={settings.contactPhone}
                onChange={(e) => setSettings(prev => ({ ...prev, contactPhone: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="contactEmail">Email</Label>
              <Input
                id="contactEmail"
                type="email"
                value={settings.contactEmail}
                onChange={(e) => setSettings(prev => ({ ...prev, contactEmail: e.target.value }))}
              />
            </div>
            
            <div>
              <Label htmlFor="address">Адрес</Label>
              <Input
                id="address"
                value={settings.address}
                onChange={(e) => setSettings(prev => ({ ...prev, address: e.target.value }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Настройки доставки */}
        <Card>
          <CardHeader>
            <CardTitle>Настройки доставки</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label htmlFor="freeDeliveryThreshold">Сумма для бесплатной доставки (₽)</Label>
              <Input
                id="freeDeliveryThreshold"
                type="number"
                value={settings.freeDeliveryThreshold}
                onChange={(e) => setSettings(prev => ({ ...prev, freeDeliveryThreshold: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <Label htmlFor="deliveryFee">Стоимость доставки (₽)</Label>
              <Input
                id="deliveryFee"
                type="number"
                value={settings.deliveryFee}
                onChange={(e) => setSettings(prev => ({ ...prev, deliveryFee: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <Label htmlFor="deliveryTime">Время доставки (минут)</Label>
              <Input
                id="deliveryTime"
                type="number"
                value={settings.deliveryTime}
                onChange={(e) => setSettings(prev => ({ ...prev, deliveryTime: Number(e.target.value) }))}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="workingStart">Начало работы</Label>
                <Input
                  id="workingStart"
                  type="time"
                  value={settings.workingHours.start}
                  onChange={(e) => handleInputChange('workingHours', 'start', e.target.value)}
                />
              </div>
              <div>
                <Label htmlFor="workingEnd">Конец работы</Label>
                <Input
                  id="workingEnd"
                  type="time"
                  value={settings.workingHours.end}
                  onChange={(e) => handleInputChange('workingHours', 'end', e.target.value)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Уведомления */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="h-5 w-5" />
              <span>Уведомления</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Email уведомления</Label>
                <p className="text-sm text-muted-foreground">Отправлять уведомления на email</p>
              </div>
              <Switch
                checked={settings.emailNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, emailNotifications: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>SMS уведомления</Label>
                <p className="text-sm text-muted-foreground">Отправлять SMS уведомления</p>
              </div>
              <Switch
                checked={settings.smsNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, smsNotifications: checked }))}
              />
            </div>
            
            <Separator />
            
            <div className="flex items-center justify-between">
              <div>
                <Label>Push уведомления</Label>
                <p className="text-sm text-muted-foreground">Браузерные уведомления</p>
              </div>
              <Switch
                checked={settings.pushNotifications}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, pushNotifications: checked }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Безопасность */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <span>Безопасность</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label>Подтверждение email</Label>
                <p className="text-sm text-muted-foreground">Требовать подтверждение email при регистрации</p>
              </div>
              <Switch
                checked={settings.requireEmailVerification}
                onCheckedChange={(checked) => setSettings(prev => ({ ...prev, requireEmailVerification: checked }))}
              />
            </div>
            
            <Separator />
            
            <div>
              <Label htmlFor="maxLoginAttempts">Максимум попыток входа</Label>
              <Input
                id="maxLoginAttempts"
                type="number"
                value={settings.maxLoginAttempts}
                onChange={(e) => setSettings(prev => ({ ...prev, maxLoginAttempts: Number(e.target.value) }))}
              />
            </div>
            
            <div>
              <Label htmlFor="sessionTimeout">Время сессии (часы)</Label>
              <Input
                id="sessionTimeout"
                type="number"
                value={settings.sessionTimeout}
                onChange={(e) => setSettings(prev => ({ ...prev, sessionTimeout: Number(e.target.value) }))}
              />
            </div>
          </CardContent>
        </Card>

        {/* Интеграции */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Интеграции и социальные сети</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex items-center justify-between">
                <div>
                  <Label>Аналитика</Label>
                  <p className="text-sm text-muted-foreground">Включить сбор аналитики</p>
                </div>
                <Switch
                  checked={settings.analyticsEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, analyticsEnabled: checked }))}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div>
                  <Label>Онлайн чат</Label>
                  <p className="text-sm text-muted-foreground">Включить чат поддержки</p>
                </div>
                <Switch
                  checked={settings.chatEnabled}
                  onCheckedChange={(checked) => setSettings(prev => ({ ...prev, chatEnabled: checked }))}
                />
              </div>
            </div>
            
            <Separator />
            
            <div>
              <Label className="text-base font-medium">Социальные сети</Label>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-3">
                <div>
                  <Label htmlFor="vk">ВКонтакте</Label>
                  <Input
                    id="vk"
                    placeholder="https://vk.com/..."
                    value={settings.socialMediaLinks.vk}
                    onChange={(e) => handleInputChange('socialMediaLinks', 'vk', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="telegram">Telegram</Label>
                  <Input
                    id="telegram"
                    placeholder="https://t.me/..."
                    value={settings.socialMediaLinks.telegram}
                    onChange={(e) => handleInputChange('socialMediaLinks', 'telegram', e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="instagram">Instagram</Label>
                  <Input
                    id="instagram"
                    placeholder="https://instagram.com/..."
                    value={settings.socialMediaLinks.instagram}
                    onChange={(e) => handleInputChange('socialMediaLinks', 'instagram', e.target.value)}
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminSettings;