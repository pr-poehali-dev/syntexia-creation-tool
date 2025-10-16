import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import Icon from '@/components/ui/icon';

const SettingsView = () => {
  return (
    <div className="p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">Настройки</h1>

        <div className="space-y-6">
          <Card className="bg-[#1E1E1E] border-gray-800">
            <CardHeader>
              <CardTitle>Подключение LM Studio</CardTitle>
              <CardDescription className="text-gray-400">
                Настройте подключение к локальной языковой модели
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm text-gray-400 mb-2 block">API Endpoint</label>
                <Input 
                  placeholder="http://localhost:1234/v1" 
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">API Key (опционально)</label>
                <Input 
                  type="password"
                  placeholder="••••••••" 
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <div>
                <label className="text-sm text-gray-400 mb-2 block">Модель</label>
                <Input 
                  placeholder="local-model" 
                  className="bg-gray-900 border-gray-700"
                />
              </div>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Проверить подключение
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-[#1E1E1E] border-gray-800">
            <CardHeader>
              <CardTitle>Экспорт произведений</CardTitle>
              <CardDescription className="text-gray-400">
                Настройки экспорта ваших работ
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-gray-700">
                  <Icon name="FileText" size={24} className="mb-2" />
                  Экспорт в TXT
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-gray-700">
                  <Icon name="FileType" size={24} className="mb-2" />
                  Экспорт в DOCX
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-gray-700">
                  <Icon name="FileJson" size={24} className="mb-2" />
                  Экспорт в JSON
                </Button>
                <Button variant="outline" className="h-20 flex flex-col items-center justify-center border-gray-700">
                  <Icon name="FileDown" size={24} className="mb-2" />
                  Экспорт в PDF
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SettingsView;
