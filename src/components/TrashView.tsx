import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

interface TrashViewProps {
  deletedItems: any[];
  onRestore: (item: any) => void;
  onPermanentDelete: (item: any) => void;
  onExtendStorage: (item: any) => void;
}

const TrashView = ({ deletedItems, onRestore, onPermanentDelete, onExtendStorage }: TrashViewProps) => {
  const getDaysRemaining = (deletedAt: number) => {
    const now = Date.now();
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    const deleteDate = deletedAt + thirtyDays;
    const remaining = Math.ceil((deleteDate - now) / (24 * 60 * 60 * 1000));
    return Math.max(0, remaining);
  };

  return (
    <div className="p-8 animate-fade-in">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Корзина</h1>
          <p className="text-gray-400">
            Удалённые элементы хранятся 30 дней, после чего автоматически удаляются навсегда
          </p>
        </div>

        {deletedItems.length === 0 ? (
          <Card className="bg-[#1E1E1E] border-gray-800">
            <CardContent className="py-20 text-center">
              <Icon name="Trash2" size={64} className="mx-auto mb-4 text-gray-600" />
              <h3 className="text-xl font-bold mb-2">Корзина пуста</h3>
              <p className="text-gray-400">Удалённых элементов нет</p>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {deletedItems.map((item) => {
              const daysRemaining = getDaysRemaining(item.deletedAt);
              const isExpiringSoon = daysRemaining <= 7;

              return (
                <Card key={item.id} className="bg-[#1E1E1E] border-gray-800">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <CardTitle className="text-xl">{item.title || item.name}</CardTitle>
                          <Badge className={isExpiringSoon ? 'bg-red-600' : 'bg-gray-600'}>
                            {daysRemaining === 0 ? 'Удаляется сегодня' : `${daysRemaining} дней`}
                          </Badge>
                        </div>
                        <CardDescription className="text-gray-400">
                          {item.description || 'Элемент проекта'}
                        </CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => onRestore(item)}
                        className="bg-green-600 hover:bg-green-700"
                      >
                        <Icon name="RotateCcw" size={16} className="mr-2" />
                        Восстановить
                      </Button>
                      <Button
                        onClick={() => onExtendStorage(item)}
                        variant="outline"
                        className="border-gray-700"
                      >
                        <Icon name="Clock" size={16} className="mr-2" />
                        Продлить +30 дней
                      </Button>
                      <Button
                        onClick={() => onPermanentDelete(item)}
                        variant="outline"
                        className="border-red-700 text-red-500 hover:bg-red-900/20"
                      >
                        <Icon name="X" size={16} className="mr-2" />
                        Удалить навсегда
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default TrashView;
