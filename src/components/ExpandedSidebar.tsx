import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

interface ExpandedSidebarProps {
  onClose: () => void;
}

const ExpandedSidebar = ({ onClose }: ExpandedSidebarProps) => {
  return (
    <aside className="w-1/3 bg-[#1E1E1E] border-r border-gray-800 overflow-auto p-6">
      <div className="flex items-center gap-3 mb-6">
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="flex-shrink-0"
        >
          <Icon name="Menu" size={20} />
        </Button>
        <h2 className="text-xl font-bold">Инструменты</h2>
      </div>

      <div className="space-y-6">
        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">Проект</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="FileText" size={16} className="mr-2" />
              Детали проекта
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="Save" size={16} className="mr-2" />
              Сохранить
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
          </CardContent>
        </Card>

        <Card className="bg-gray-900 border-gray-800">
          <CardHeader>
            <CardTitle className="text-lg">AI Помощник</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="Sparkles" size={16} className="mr-2" />
              Генерировать сцену
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="Wand2" size={16} className="mr-2" />
              Улучшить диалоги
            </Button>
            <Button variant="outline" className="w-full justify-start" size="sm">
              <Icon name="BookOpen" size={16} className="mr-2" />
              Развить персонажа
            </Button>
          </CardContent>
        </Card>
      </div>
    </aside>
  );
};

export default ExpandedSidebar;
