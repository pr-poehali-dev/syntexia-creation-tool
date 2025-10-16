import { useState, useCallback, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';
import type { Scene, Chapter } from '@/types/project';

interface EditorViewProps {
  selectedProject: any | null;
  chapters: Chapter[];
  scenes: Scene[];
  updateScene: (sceneId: string, updates: Partial<Scene>) => void;
}

const EditorView = ({ selectedProject, chapters, scenes, updateScene }: EditorViewProps) => {
  const [activeChapter, setActiveChapter] = useState<string | null>(null);
  const [activeScene, setActiveScene] = useState<string | null>(null);
  const [editorContent, setEditorContent] = useState('');

  useEffect(() => {
    if (chapters.length > 0 && !activeChapter) {
      setActiveChapter(chapters[0].id);
    }
  }, [chapters, activeChapter]);

  useEffect(() => {
    if (activeChapter) {
      const chapterScenes = scenes.filter(s => s.chapterId === activeChapter);
      if (chapterScenes.length > 0 && !activeScene) {
        setActiveScene(chapterScenes[0].id);
        setEditorContent(chapterScenes[0].content || '');
      }
    }
  }, [activeChapter, scenes, activeScene]);

  const autoSave = useCallback(() => {
    if (activeScene) {
      updateScene(activeScene, { content: editorContent });
    }
  }, [activeScene, editorContent, updateScene]);

  useEffect(() => {
    const timer = setTimeout(() => {
      autoSave();
    }, 2000);

    return () => clearTimeout(timer);
  }, [editorContent, autoSave]);

  const handleSceneSelect = (sceneId: string) => {
    const scene = scenes.find(s => s.id === sceneId);
    if (scene) {
      setActiveScene(sceneId);
      setEditorContent(scene.content || '');
    }
  };

  const getFullText = () => {
    return chapters
      .map(chapter => {
        const chapterScenes = scenes.filter(s => s.chapterId === chapter.id);
        const scenesText = chapterScenes
          .map(scene => scene.content || '')
          .filter(content => content.length > 0)
          .join('\n\n');
        
        return scenesText ? `${chapter.name}\n\n${scenesText}` : '';
      })
      .filter(text => text.length > 0)
      .join('\n\n\n');
  };

  if (!selectedProject) {
    return (
      <div className="p-8 animate-fade-in">
        <div className="max-w-7xl mx-auto text-center py-20">
          <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-2xl font-bold mb-4">Выберите проект</h2>
          <p className="text-gray-400">
            Для работы с редактором сначала выберите проект на главной странице
          </p>
        </div>
      </div>
    );
  }

  const chapterScenes = activeChapter ? scenes.filter(s => s.chapterId === activeChapter) : [];

  return (
    <div className="flex h-screen bg-[#1E1E1E]">
      <div className="w-64 border-r border-gray-800 overflow-y-auto">
        <div className="p-4 border-b border-gray-800">
          <h2 className="font-bold text-lg mb-1">{selectedProject.title}</h2>
          <p className="text-xs text-gray-500">Структура произведения</p>
        </div>

        <div className="p-2">
          {chapters.map((chapter) => {
            const chScenes = scenes.filter(s => s.chapterId === chapter.id);
            return (
              <div key={chapter.id} className="mb-2">
                <button
                  onClick={() => setActiveChapter(chapter.id)}
                  className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                    activeChapter === chapter.id ? 'bg-purple-600' : 'hover:bg-gray-800'
                  }`}
                >
                  <div className="font-medium">{chapter.name}</div>
                  <div className="text-xs text-gray-400">{chScenes.length} сцен</div>
                </button>

                {activeChapter === chapter.id && chScenes.length > 0 && (
                  <div className="ml-3 mt-1 space-y-1">
                    {chScenes.map((scene) => (
                      <button
                        key={scene.id}
                        onClick={() => handleSceneSelect(scene.id)}
                        className={`w-full text-left px-3 py-1.5 rounded text-sm transition-colors ${
                          activeScene === scene.id ? 'bg-purple-700' : 'hover:bg-gray-800'
                        }`}
                      >
                        {scene.title}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      <div className="flex-1 flex flex-col">
        <div className="border-b border-gray-800 p-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl font-bold">Редактор</h1>
            {activeScene && (
              <p className="text-sm text-gray-400">
                {scenes.find(s => s.id === activeScene)?.title}
              </p>
            )}
          </div>
          <div className="flex gap-2">
            <span className="text-xs text-gray-500 flex items-center gap-2">
              <Icon name="Check" size={14} />
              Автосохранение
            </span>
            <Button variant="outline" size="sm" className="border-gray-700">
              <Icon name="Download" size={16} className="mr-2" />
              Экспорт
            </Button>
          </div>
        </div>

        <div className="flex-1 overflow-hidden p-6">
          <Card className="h-full bg-gray-900 border-gray-800">
            <CardHeader>
              <CardTitle className="text-sm flex items-center justify-between">
                <span>Текст сцены</span>
                <span className="text-gray-500 font-normal">
                  {editorContent.length} символов
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="h-[calc(100%-5rem)]">
              <Textarea
                value={editorContent}
                onChange={(e) => setEditorContent(e.target.value)}
                placeholder="Начните писать текст сцены..."
                className="w-full h-full bg-transparent border-0 focus-visible:ring-0 resize-none text-base leading-relaxed"
              />
            </CardContent>
          </Card>
        </div>
      </div>

      <div className="w-80 border-l border-gray-800 overflow-y-auto p-4">
        <h3 className="font-bold mb-4">Полное произведение</h3>
        <div className="text-sm text-gray-400 space-y-4 whitespace-pre-wrap">
          {getFullText() || 'Текст произведения появится здесь...'}
        </div>
      </div>
    </div>
  );
};

export default EditorView;
