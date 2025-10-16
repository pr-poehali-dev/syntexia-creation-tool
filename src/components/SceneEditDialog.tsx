import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import type { Scene, PlotLine } from '@/types/project';

interface SceneEditDialogProps {
  scene: Scene | null;
  plotLine: PlotLine | null;
  open: boolean;
  onClose: () => void;
  onSave: (sceneId: string, updates: Partial<Scene>) => void;
}

const SceneEditDialog = ({ scene, plotLine, open, onClose, onSave }: SceneEditDialogProps) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');

  useEffect(() => {
    if (scene) {
      setTitle(scene.title);
      setDescription(scene.description);
      setContent(scene.content || '');
    }
  }, [scene]);

  const handleSave = () => {
    if (scene) {
      onSave(scene.id, { title, description, content });
      onClose();
    }
  };

  if (!scene || !plotLine) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto bg-[#1E1E1E] border-gray-800 text-white">
        <DialogHeader>
          <div className="flex items-center gap-3">
            <DialogTitle className="text-2xl">Редактирование сцены</DialogTitle>
            <Badge className={`${plotLine.color} text-white`}>
              {plotLine.name}
            </Badge>
          </div>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Название сцены
            </label>
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Введите название сцены"
              className="bg-gray-900 border-gray-700"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Краткое описание
            </label>
            <Textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Краткое описание сцены для визуальной сетки"
              className="bg-gray-900 border-gray-700 min-h-[80px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-400 mb-2 block">
              Содержание сцены
            </label>
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Напишите полный текст сцены или заметки..."
              className="bg-gray-900 border-gray-700 min-h-[300px] font-mono text-sm"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose} className="border-gray-700">
            Отмена
          </Button>
          <Button onClick={handleSave} className="bg-purple-600 hover:bg-purple-700">
            Сохранить
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default SceneEditDialog;
