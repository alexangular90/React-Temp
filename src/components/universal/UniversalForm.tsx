import React, { useState, useEffect } from 'react';
import { X, Save, Eye, Edit, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export type FormFieldType = 
  | 'text' 
  | 'email' 
  | 'password' 
  | 'number' 
  | 'textarea' 
  | 'select' 
  | 'checkbox' 
  | 'array'
  | 'custom';

export interface FormField {
  key: string;
  label: string;
  type: FormFieldType;
  required?: boolean;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  validation?: (value: any) => string | null;
  render?: (value: any, onChange: (value: any) => void, field: FormField) => React.ReactNode;
  disabled?: boolean;
  description?: string;
}

export type FormMode = 'view' | 'create' | 'edit';

interface UniversalFormProps {
  fields: FormField[];
  data?: Record<string, any>;
  mode: FormMode;
  title?: string;
  open: boolean;
  onClose: () => void;
  onSubmit?: (data: Record<string, any>) => Promise<void> | void;
  onDelete?: () => Promise<void> | void;
  loading?: boolean;
}

const UniversalForm: React.FC<UniversalFormProps> = ({
  fields,
  data = {},
  mode,
  title,
  open,
  onClose,
  onSubmit,
  onDelete,
  loading = false
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (open) {
      setFormData(data);
      setErrors({});
    }
  }, [open, data]);

  const handleFieldChange = (key: string, value: any) => {
    setFormData(prev => ({ ...prev, [key]: value }));
    
    // Очищаем ошибку для этого поля
    if (errors[key]) {
      setErrors(prev => ({ ...prev, [key]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    fields.forEach(field => {
      const value = formData[field.key];

      // Проверка обязательных полей
      if (field.required && (!value || (Array.isArray(value) && value.length === 0))) {
        newErrors[field.key] = `${field.label} обязательно для заполнения`;
        return;
      }

      // Кастомная валидация
      if (field.validation && value) {
        const error = field.validation(value);
        if (error) {
          newErrors[field.key] = error;
        }
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (mode === 'view') return;

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      await onSubmit?.(formData);
      onClose();
    } catch (error) {
      console.error('Ошибка при сохранении:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!onDelete) return;

    setIsSubmitting(true);
    try {
      await onDelete();
      onClose();
    } catch (error) {
      console.error('Ошибка при удалении:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderField = (field: FormField) => {
    const value = formData[field.key] || '';
    const isDisabled = mode === 'view' || field.disabled;

    if (field.render) {
      return field.render(value, (newValue) => handleFieldChange(field.key, newValue), field);
    }

    switch (field.type) {
      case 'text':
      case 'email':
      case 'password':
      case 'number':
        return (
          <Input
            type={field.type}
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
          />
        );

      case 'textarea':
        return (
          <Textarea
            value={value}
            onChange={(e) => handleFieldChange(field.key, e.target.value)}
            placeholder={field.placeholder}
            disabled={isDisabled}
            rows={3}
          />
        );

      case 'select':
        return (
          <Select
            value={value}
            onValueChange={(newValue) => handleFieldChange(field.key, newValue)}
            disabled={isDisabled}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {field.options?.map(option => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case 'checkbox':
        return (
          <div className="flex items-center space-x-2">
            <Checkbox
              checked={!!value}
              onCheckedChange={(checked) => handleFieldChange(field.key, checked)}
              disabled={isDisabled}
            />
            <span className="text-sm">{field.label}</span>
          </div>
        );

      case 'array':
        const arrayValue = Array.isArray(value) ? value : [];
        return (
          <div className="space-y-2">
            {mode === 'view' ? (
              <div className="flex flex-wrap gap-1">
                {arrayValue.map((item, index) => (
                  <Badge key={index} variant="secondary">
                    {item}
                  </Badge>
                ))}
              </div>
            ) : (
              <div>
                {arrayValue.map((item, index) => (
                  <div key={index} className="flex items-center space-x-2 mb-2">
                    <Input
                      value={item}
                      onChange={(e) => {
                        const newArray = [...arrayValue];
                        newArray[index] = e.target.value;
                        handleFieldChange(field.key, newArray);
                      }}
                      placeholder={field.placeholder}
                    />
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        const newArray = arrayValue.filter((_, i) => i !== index);
                        handleFieldChange(field.key, newArray);
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    handleFieldChange(field.key, [...arrayValue, '']);
                  }}
                >
                  Добавить
                </Button>
              </div>
            )}
          </div>
        );

      default:
        return <div>Неподдерживаемый тип поля</div>;
    }
  };

  const getModeIcon = () => {
    switch (mode) {
      case 'view': return <Eye className="h-4 w-4" />;
      case 'edit': return <Edit className="h-4 w-4" />;
      default: return null;
    }
  };

  const getModeTitle = () => {
    switch (mode) {
      case 'view': return `Просмотр: ${title}`;
      case 'edit': return `Редактирование: ${title}`;
      case 'create': return `Создание: ${title}`;
      default: return title;
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            {getModeIcon()}
            <span>{getModeTitle()}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {fields.map((field) => (
            <div key={field.key} className="space-y-2">
              {field.type !== 'checkbox' && (
                <Label htmlFor={field.key} className="flex items-center space-x-1">
                  <span>{field.label}</span>
                  {field.required && <span className="text-red-500">*</span>}
                </Label>
              )}
              
              {renderField(field)}
              
              {field.description && (
                <p className="text-sm text-muted-foreground">{field.description}</p>
              )}
              
              {errors[field.key] && (
                <p className="text-sm text-red-500">{errors[field.key]}</p>
              )}
            </div>
          ))}
        </div>

        <DialogFooter className="flex justify-between">
          <div>
            {mode !== 'create' && onDelete && (
              <Button
                variant="destructive"
                onClick={handleDelete}
                disabled={isSubmitting}
              >
                <Trash2 className="h-4 w-4 mr-2" />
                Удалить
              </Button>
            )}
          </div>
          
          <div className="flex space-x-2">
            <Button variant="outline" onClick={onClose} disabled={isSubmitting}>
              {mode === 'view' ? 'Закрыть' : 'Отмена'}
            </Button>
            
            {mode !== 'view' && (
              <Button 
                onClick={handleSubmit} 
                disabled={isSubmitting}
                className="bg-red-600 hover:bg-red-700"
              >
                {isSubmitting ? (
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                ) : (
                  <Save className="h-4 w-4 mr-2" />
                )}
                {mode === 'create' ? 'Создать' : 'Сохранить'}
              </Button>
            )}
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default UniversalForm;