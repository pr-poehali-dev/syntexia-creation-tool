import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'drafting' | 'completed';
  progress: number;
  color: string;
}

interface PlotLine {
  id: string;
  name: string;
  color: string;
}

interface Scene {
  id: string;
  plotLineId: string;
  chapterId: string;
  title: string;
  description: string;
}

interface Chapter {
  id: string;
  name: string;
  order: number;
}

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'library' | 'assistant' | 'settings'>('home');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isGridExpanded, setIsGridExpanded] = useState(false);
  
  const [plotLines, setPlotLines] = useState<PlotLine[]>([
    { id: '1', name: 'Основной сюжет', color: 'bg-green-600' },
    { id: '2', name: 'Романтическая линия', color: 'bg-red-600' },
    { id: '3', name: 'Линия антагониста', color: 'bg-orange-600' },
    { id: '4', name: 'Технологический конфликт', color: 'bg-blue-600' },
    { id: '5', name: 'Личный конфликт', color: 'bg-teal-600' },
  ]);

  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 'ch1', name: 'Глава 1', order: 1 },
    { id: 'ch2', name: 'Глава 2', order: 2 },
    { id: 'ch3', name: 'Глава 3', order: 3 },
  ]);

  const [scenes, setScenes] = useState<Scene[]>([
    { id: 's1', plotLineId: '1', chapterId: 'ch1', title: 'Экспозиция героя', description: 'Знакомство с главным героем в обычном мире' },
    { id: 's2', plotLineId: '2', chapterId: 'ch1', title: 'Первая встреча', description: 'Герой встречает любовный интерес' },
    { id: 's3', plotLineId: '3', chapterId: 'ch1', title: 'Появление угрозы', description: 'Намек на антагониста' },
    { id: 's4', plotLineId: '1', chapterId: 'ch2', title: 'Призыв к приключению', description: 'Событие, которое запускает историю' },
    { id: 's5', plotLineId: '4', chapterId: 'ch2', title: 'Технологическое открытие', description: 'Герой узнает о новой технологии' },
    { id: 's6', plotLineId: '2', chapterId: 'ch2', title: 'Развитие отношений', description: 'Герои сближаются' },
    { id: 's7', plotLineId: '5', chapterId: 'ch3', title: 'Внутренний конфликт', description: 'Герой сталкивается с личными демонами' },
  ];

  const projects: Project[] = [
    {
      id: '1',
      title: 'Fantasy Novel Outline',
      description: 'Developing the world and character arcs for a new fantasy series.',
      status: 'in-progress',
      progress: 35,
      color: 'from-purple-500 via-green-500 to-amber-500'
    },
    {
      id: '2',
      title: 'Sci-Fi Short Story',
      description: 'A dystopian tale about AI consciousness.',
      status: 'drafting',
      progress: 65,
      color: 'from-blue-500 via-purple-500 to-pink-500'
    },
    {
      id: '3',
      title: 'Mystery Thriller',
      description: 'Detective story set in 1920s Paris.',
      status: 'completed',
      progress: 100,
      color: 'from-amber-500 via-red-500 to-purple-500'
    }
  ];

  const getStatusInfo = (status: Project['status']) => {
    switch (status) {
      case 'in-progress':
        return { label: 'В работе', color: 'bg-amber-500' };
      case 'drafting':
        return { label: 'Черновик', color: 'bg-blue-500' };
      case 'completed':
        return { label: 'Завершено', color: 'bg-green-500' };
    }
  };

  const addChapter = () => {
    const newChapter: Chapter = {
      id: `ch${chapters.length + 1}`,
      name: `Глава ${chapters.length + 1}`,
      order: chapters.length + 1
    };
    setChapters([...chapters, newChapter]);
  };

  const addPlotLine = () => {
    const colors = ['bg-purple-600', 'bg-pink-600', 'bg-yellow-600', 'bg-indigo-600'];
    const newPlotLine: PlotLine = {
      id: `${plotLines.length + 1}`,
      name: `Новая линия ${plotLines.length + 1}`,
      color: colors[plotLines.length % colors.length]
    };
    setPlotLines([...plotLines, newPlotLine]);
  };

  const addScene = (plotLineId: string, chapterId: string) => {
    const newScene: Scene = {
      id: `s${scenes.length + 1}`,
      plotLineId,
      chapterId,
      title: 'Новая сцена',
      description: ''
    };
    setScenes([...scenes, newScene]);
  };

  const deleteScene = (sceneId: string) => {
    setScenes(scenes.filter(s => s.id !== sceneId));
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.filter(c => c.id !== chapterId));
    setScenes(scenes.filter(s => s.chapterId !== chapterId));
  };

  const deletePlotLine = (plotLineId: string) => {
    setPlotLines(plotLines.filter(p => p.id !== plotLineId));
    setScenes(scenes.filter(s => s.plotLineId !== plotLineId));
  };

  const ProjectGrid = () => (
    <div className="mt-8 bg-[#1E1E1E] border border-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Визуальная сетка проекта</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsGridExpanded(!isGridExpanded)}
            className="border-gray-700"
          >
            <Icon name={isGridExpanded ? "Minimize2" : "Maximize2"} size={20} />
          </Button>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-2 mb-4">
          <div className="w-32 text-sm font-semibold text-gray-400">Сюжетные линии:</div>
          <div className="flex-1 flex gap-2 flex-wrap">
            {plotLines.map((plotLine) => (
              <div key={plotLine.id} className="group relative">
                <Badge className={`${plotLine.color} text-white px-3 py-1`}>
                  {plotLine.name}
                </Badge>
                <button
                  onClick={() => deletePlotLine(plotLine.id)}
                  className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-5 h-5 bg-red-600 rounded-full text-xs"
                >
                  ×
                </button>
              </div>
            ))}
            <Button
              variant="outline"
              size="sm"
              onClick={addPlotLine}
              className="border-gray-700 h-7"
            >
              <Icon name="Plus" size={14} className="mr-1" />
              Добавить
            </Button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-max">
            <div className="flex border-b border-gray-800 pb-2 mb-2">
              <div className="w-32 flex-shrink-0"></div>
              {chapters.map((chapter) => (
                <div key={chapter.id} className="w-48 flex-shrink-0 px-2 group relative">
                  <div className="font-semibold text-center bg-gray-800 rounded py-2 px-3">
                    {chapter.name}
                  </div>
                  <button
                    onClick={() => deleteChapter(chapter.id)}
                    className="absolute -top-2 -right-0 hidden group-hover:flex items-center justify-center w-6 h-6 bg-red-600 rounded-full text-sm"
                  >
                    ×
                  </button>
                </div>
              ))}
              <div className="w-48 flex-shrink-0 px-2">
                <Button
                  variant="outline"
                  onClick={addChapter}
                  className="w-full border-gray-700 border-dashed"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Глава
                </Button>
              </div>
            </div>

            {plotLines.map((plotLine) => (
              <div key={plotLine.id} className="flex items-start border-b border-gray-800 py-2">
                <div className="w-32 flex-shrink-0 pr-4">
                  <Badge className={`${plotLine.color} text-white text-xs w-full justify-center`}>
                    {plotLine.name}
                  </Badge>
                </div>
                {chapters.map((chapter) => {
                  const chapterScenes = scenes.filter(
                    s => s.plotLineId === plotLine.id && s.chapterId === chapter.id
                  );
                  return (
                    <div key={chapter.id} className="w-48 flex-shrink-0 px-2">
                      <div className="space-y-2">
                        {chapterScenes.map((scene) => (
                          <div
                            key={scene.id}
                            className={`${plotLine.color} bg-opacity-20 border-l-4 ${plotLine.color.replace('bg-', 'border-')} rounded p-2 text-xs group relative hover:bg-opacity-30 transition-all cursor-pointer`}
                          >
                            <div className="font-semibold mb-1">{scene.title}</div>
                            <div className="text-gray-400 line-clamp-2">{scene.description}</div>
                            <button
                              onClick={() => deleteScene(scene.id)}
                              className="absolute -top-2 -right-2 hidden group-hover:flex items-center justify-center w-5 h-5 bg-red-600 rounded-full text-xs"
                            >
                              ×
                            </button>
                          </div>
                        ))}
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => addScene(plotLine.id, chapter.id)}
                          className="w-full border border-dashed border-gray-700 h-8 text-xs"
                        >
                          <Icon name="Plus" size={12} />
                        </Button>
                      </div>
                    </div>
                  );
                })}
                <div className="w-48 flex-shrink-0 px-2"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex">
        {!isGridExpanded && (
          <aside className="w-20 bg-[#1E1E1E] border-r border-gray-800 flex flex-col items-center py-6 space-y-6">
            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-purple-400 rounded-lg flex items-center justify-center mb-4">
              <span className="text-xl font-bold">S</span>
            </div>
            
            <button
              onClick={() => setActiveView('home')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                activeView === 'home' ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon name="Home" size={20} />
            </button>
            
            <button
              onClick={() => setActiveView('library')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                activeView === 'library' ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon name="Library" size={20} />
            </button>
            
            <button
              onClick={() => setActiveView('assistant')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
                activeView === 'assistant' ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon name="Sparkles" size={20} />
            </button>
            
            <button
              onClick={() => setActiveView('settings')}
              className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors mt-auto ${
                activeView === 'settings' ? 'bg-purple-600' : 'hover:bg-gray-800'
              }`}
            >
              <Icon name="Settings" size={20} />
            </button>
          </aside>
        )}

        <div className={`flex-1 flex ${isGridExpanded ? 'flex-row' : 'flex-col'}`}>
          {isGridExpanded && (
            <aside className="w-1/3 bg-[#1E1E1E] border-r border-gray-800 overflow-auto p-6">
              <div className="flex items-center gap-3 mb-6">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsGridExpanded(false)}
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
          )}

          <main className={`flex-1 overflow-auto ${isGridExpanded ? '' : ''}`}>
            {activeView === 'home' && (
              <div className="p-8 animate-fade-in">
                <div className={isGridExpanded ? 'max-w-full' : 'max-w-6xl mx-auto'}>
                  {!selectedProject ? (
                    <>
                      <div className="mb-12">
                        <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                          SYNTEXIA
                        </h1>
                        <p className="text-xl text-gray-400">AI Ассистент для авторов</p>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                        <Card className="bg-[#1E1E1E] border-gray-800 hover-scale">
                          <CardHeader>
                            <Icon name="BookOpen" size={32} className="mb-2 text-purple-500" />
                            <CardTitle>Библиотека</CardTitle>
                            <CardDescription className="text-gray-400">
                              {projects.length} активных проектов
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="bg-[#1E1E1E] border-gray-800 hover-scale">
                          <CardHeader>
                            <Icon name="Sparkles" size={32} className="mb-2 text-purple-500" />
                            <CardTitle>AI Помощник</CardTitle>
                            <CardDescription className="text-gray-400">
                              Генерация идей и текстов
                            </CardDescription>
                          </CardHeader>
                        </Card>

                        <Card className="bg-[#1E1E1E] border-gray-800 hover-scale">
                          <CardHeader>
                            <Icon name="Download" size={32} className="mb-2 text-purple-500" />
                            <CardTitle>Экспорт</CardTitle>
                            <CardDescription className="text-gray-400">
                              Сохранение произведений
                            </CardDescription>
                          </CardHeader>
                        </Card>
                      </div>

                      <div>
                        <h2 className="text-2xl font-bold mb-6">Последние проекты</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          {projects.slice(0, 2).map((project) => (
                            <Card
                              key={project.id}
                              className="bg-[#1E1E1E] border-gray-800 hover-scale cursor-pointer"
                              onClick={() => setSelectedProject(project)}
                            >
                              <CardHeader>
                                <div className="flex items-start justify-between mb-3">
                                  <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
                                    <Icon name="FileText" size={24} />
                                  </div>
                                  <Badge className={getStatusInfo(project.status).color}>
                                    {getStatusInfo(project.status).label}
                                  </Badge>
                                </div>
                                <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-4`}></div>
                                <CardTitle className="text-xl">{project.title}</CardTitle>
                                <CardDescription className="text-gray-400">
                                  {project.description}
                                </CardDescription>
                              </CardHeader>
                              <CardContent>
                                <div className="space-y-2">
                                  <div className="flex justify-between text-sm text-gray-400">
                                    <span>Прогресс</span>
                                    <span>{project.progress}%</span>
                                  </div>
                                  <Progress value={project.progress} className="h-2" />
                                </div>
                              </CardContent>
                            </Card>
                          ))}
                        </div>
                      </div>
                    </>
                  ) : (
                    <div>
                      <div className="flex items-center gap-4 mb-8">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => setSelectedProject(null)}
                        >
                          <Icon name="ArrowLeft" size={20} />
                        </Button>
                        <div>
                          <h1 className="text-3xl font-bold">{selectedProject.title}</h1>
                          <p className="text-gray-400">{selectedProject.description}</p>
                        </div>
                      </div>

                      <ProjectGrid />
                    </div>
                  )}
                </div>
              </div>
            )}

            {activeView === 'library' && (
              <div className="p-8 animate-fade-in">
                <div className="max-w-6xl mx-auto">
                  <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold">Библиотека проектов</h1>
                    <Button className="bg-purple-600 hover:bg-purple-700">
                      <Icon name="Plus" size={20} className="mr-2" />
                      Создать проект
                    </Button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.map((project) => (
                      <Card
                        key={project.id}
                        className="bg-[#1E1E1E] border-gray-800 hover-scale cursor-pointer"
                        onClick={() => {
                          setSelectedProject(project);
                          setActiveView('home');
                        }}
                      >
                        <CardHeader>
                          <div className="flex items-start justify-between mb-3">
                            <div className="w-12 h-12 rounded-lg bg-purple-600 flex items-center justify-center">
                              <Icon name="FileText" size={24} />
                            </div>
                            <Button variant="ghost" size="icon" className="h-8 w-8">
                              <Icon name="MoreVertical" size={16} />
                            </Button>
                          </div>
                          <div className={`h-2 rounded-full bg-gradient-to-r ${project.color} mb-4`}></div>
                          <CardTitle className="text-xl mb-2">{project.title}</CardTitle>
                          <CardDescription className="text-gray-400 mb-4">
                            {project.description}
                          </CardDescription>
                          
                          <div className="flex flex-wrap gap-2 mb-4">
                            <Badge variant="outline" className={getStatusInfo(project.status).color}>
                              {getStatusInfo(project.status).label}
                            </Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <Button variant="outline" className="w-full border-purple-600 text-purple-400 hover:bg-purple-600/10">
                            Открыть
                          </Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeView === 'assistant' && (
              <div className="p-8 animate-fade-in">
                <div className="max-w-4xl mx-auto">
                  <h1 className="text-4xl font-bold mb-8">AI Ассистент</h1>

                  <Tabs defaultValue="style" className="w-full">
                    <TabsList className="grid grid-cols-4 lg:grid-cols-7 gap-2 bg-[#1E1E1E] p-1 mb-8">
                      <TabsTrigger value="style">Стиль</TabsTrigger>
                      <TabsTrigger value="characters">Персонажи</TabsTrigger>
                      <TabsTrigger value="description">Описание</TabsTrigger>
                      <TabsTrigger value="ideas">Идеи</TabsTrigger>
                      <TabsTrigger value="plot">Сюжет</TabsTrigger>
                      <TabsTrigger value="scenes">Сцены</TabsTrigger>
                      <TabsTrigger value="generate">Генерация</TabsTrigger>
                    </TabsList>

                    <TabsContent value="style" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Стиль текста</CardTitle>
                          <CardDescription className="text-gray-400">
                            Определите тон и стиль вашего произведения
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Icon name="Feather" size={24} className="mb-2" />
                              Классический
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Icon name="Zap" size={24} className="mb-2" />
                              Динамичный
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Icon name="BookOpen" size={24} className="mb-2" />
                              Литературный
                            </Button>
                            <Button variant="outline" className="h-20 flex flex-col items-center justify-center">
                              <Icon name="MessageCircle" size={24} className="mb-2" />
                              Разговорный
                            </Button>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="characters" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Персонажи</CardTitle>
                          <CardDescription className="text-gray-400">
                            Создайте и развивайте персонажей
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Input placeholder="Имя персонажа" className="bg-gray-900 border-gray-700" />
                          <Textarea 
                            placeholder="Описание персонажа: характер, мотивация, предыстория..." 
                            className="bg-gray-900 border-gray-700 min-h-32"
                          />
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Icon name="Sparkles" size={20} className="mr-2" />
                            Развить персонажа с AI
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="description" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Базовое описание</CardTitle>
                          <CardDescription className="text-gray-400">
                            Опишите основную концепцию вашего произведения
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Textarea 
                            placeholder="О чем ваше произведение? Опишите основную идею, жанр, настроение..." 
                            className="bg-gray-900 border-gray-700 min-h-40"
                          />
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            Анализировать с AI
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="ideas" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Элементы и идеи</CardTitle>
                          <CardDescription className="text-gray-400">
                            Соберите ключевые элементы истории
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <div className="flex gap-2">
                            <Input placeholder="Добавить элемент идеи" className="bg-gray-900 border-gray-700" />
                            <Button size="icon" className="bg-purple-600 hover:bg-purple-700">
                              <Icon name="Plus" size={20} />
                            </Button>
                          </div>
                          <div className="flex flex-wrap gap-2">
                            <Badge className="bg-purple-600 text-white">Магия</Badge>
                            <Badge className="bg-blue-600 text-white">Технологии</Badge>
                            <Badge className="bg-green-600 text-white">Природа</Badge>
                          </div>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="plot" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Сюжетные линии</CardTitle>
                          <CardDescription className="text-gray-400">
                            Определите ключевые точки сюжета
                          </CardDescription>
                        </CardHeader>
                        <CardContent>
                          <Accordion type="single" collapsible className="w-full">
                            <AccordionItem value="act1" className="border-gray-700">
                              <AccordionTrigger className="text-purple-400">Акт I - Завязка</AccordionTrigger>
                              <AccordionContent>
                                <Textarea 
                                  placeholder="Опишите начало истории..." 
                                  className="bg-gray-900 border-gray-700"
                                />
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="act2" className="border-gray-700">
                              <AccordionTrigger className="text-purple-400">Акт II - Развитие</AccordionTrigger>
                              <AccordionContent>
                                <Textarea 
                                  placeholder="Опишите развитие конфликта..." 
                                  className="bg-gray-900 border-gray-700"
                                />
                              </AccordionContent>
                            </AccordionItem>
                            <AccordionItem value="act3" className="border-gray-700">
                              <AccordionTrigger className="text-purple-400">Акт III - Развязка</AccordionTrigger>
                              <AccordionContent>
                                <Textarea 
                                  placeholder="Опишите финал..." 
                                  className="bg-gray-900 border-gray-700"
                                />
                              </AccordionContent>
                            </AccordionItem>
                          </Accordion>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="scenes" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Сцены</CardTitle>
                          <CardDescription className="text-gray-400">
                            Разработайте отдельные сцены
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Input placeholder="Название сцены" className="bg-gray-900 border-gray-700" />
                          <Textarea 
                            placeholder="Описание сцены: место, время, действия, эмоции..." 
                            className="bg-gray-900 border-gray-700 min-h-32"
                          />
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Icon name="Wand2" size={20} className="mr-2" />
                            Улучшить сцену с AI
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>

                    <TabsContent value="generate" className="space-y-6">
                      <Card className="bg-[#1E1E1E] border-gray-800">
                        <CardHeader>
                          <CardTitle>Генерация текста</CardTitle>
                          <CardDescription className="text-gray-400">
                            Создайте текст на основе ваших идей
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                          <Textarea 
                            placeholder="Введите запрос для генерации текста..." 
                            className="bg-gray-900 border-gray-700 min-h-32"
                          />
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="text-sm text-gray-400 mb-2 block">Длина текста</label>
                              <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2">
                                <option>Короткий (100-300 слов)</option>
                                <option>Средний (300-800 слов)</option>
                                <option>Длинный (800+ слов)</option>
                              </select>
                            </div>
                            <div>
                              <label className="text-sm text-gray-400 mb-2 block">Креативность</label>
                              <select className="w-full bg-gray-900 border border-gray-700 rounded-md p-2">
                                <option>Низкая</option>
                                <option>Средняя</option>
                                <option>Высокая</option>
                              </select>
                            </div>
                          </div>
                          <Button className="w-full bg-purple-600 hover:bg-purple-700">
                            <Icon name="Sparkles" size={20} className="mr-2" />
                            Генерировать текст
                          </Button>
                        </CardContent>
                      </Card>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}

            {activeView === 'settings' && (
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
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
