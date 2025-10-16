import { useState, useEffect } from 'react';
import Sidebar from '@/components/Sidebar';
import ExpandedSidebar from '@/components/ExpandedSidebar';
import HomeView from '@/components/HomeView';
import LibraryView from '@/components/LibraryView';
import AssistantView from '@/components/AssistantView';
import SettingsView from '@/components/SettingsView';
import EditorView from '@/components/EditorView';
import TrashView from '@/components/TrashView';
import type { Project, PlotLine, Chapter, Scene } from '@/types/project';

const Index = () => {
  const [activeView, setActiveView] = useState<'home' | 'library' | 'assistant' | 'settings' | 'editor' | 'trash'>('home');
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
  ]);

  const [projects, setProjects] = useState<Project[]>([
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
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const thirtyDays = 30 * 24 * 60 * 60 * 1000;

      setScenes(prev => prev.filter(s => !s.deletedAt || (now - s.deletedAt < thirtyDays)));
      setChapters(prev => prev.filter(c => !c.deletedAt || (now - c.deletedAt < thirtyDays)));
      setPlotLines(prev => prev.filter(p => !p.deletedAt || (now - p.deletedAt < thirtyDays)));
      setProjects(prev => prev.filter(proj => !proj.deletedAt || (now - proj.deletedAt < thirtyDays)));
    }, 60000);

    return () => clearInterval(interval);
  }, []);

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
    setScenes(scenes.map(s => s.id === sceneId ? { ...s, deletedAt: Date.now() } : s));
  };

  const deleteChapter = (chapterId: string) => {
    setChapters(chapters.map(c => c.id === chapterId ? { ...c, deletedAt: Date.now() } : c));
    setScenes(scenes.map(s => s.chapterId === chapterId ? { ...s, deletedAt: Date.now() } : s));
  };

  const deletePlotLine = (plotLineId: string) => {
    setPlotLines(plotLines.map(p => p.id === plotLineId ? { ...p, deletedAt: Date.now() } : p));
    setScenes(scenes.map(s => s.plotLineId === plotLineId ? { ...s, deletedAt: Date.now() } : s));
  };

  const updateScene = (sceneId: string, updates: Partial<Scene>) => {
    setScenes(scenes.map(scene => 
      scene.id === sceneId ? { ...scene, ...updates } : scene
    ));
  };

  const handleSelectProject = (project: Project) => {
    setSelectedProject(project);
    setActiveView('home');
  };

  const getDeletedItems = () => {
    return [
      ...scenes.filter(s => s.deletedAt),
      ...chapters.filter(c => c.deletedAt),
      ...plotLines.filter(p => p.deletedAt),
      ...projects.filter(p => p.deletedAt)
    ];
  };

  const handleRestore = (item: any) => {
    if ('plotLineId' in item && 'chapterId' in item) {
      setScenes(scenes.map(s => s.id === item.id ? { ...s, deletedAt: undefined } : s));
    } else if ('order' in item) {
      setChapters(chapters.map(c => c.id === item.id ? { ...c, deletedAt: undefined } : c));
    } else if ('color' in item && 'name' in item) {
      setPlotLines(plotLines.map(p => p.id === item.id ? { ...p, deletedAt: undefined } : p));
    } else if ('status' in item) {
      setProjects(projects.map(p => p.id === item.id ? { ...p, deletedAt: undefined } : p));
    }
  };

  const handlePermanentDelete = (item: any) => {
    if ('plotLineId' in item && 'chapterId' in item) {
      setScenes(scenes.filter(s => s.id !== item.id));
    } else if ('order' in item) {
      setChapters(chapters.filter(c => c.id !== item.id));
    } else if ('color' in item && 'name' in item) {
      setPlotLines(plotLines.filter(p => p.id !== item.id));
    } else if ('status' in item) {
      setProjects(projects.filter(p => p.id !== item.id));
    }
  };

  const handleExtendStorage = (item: any) => {
    const newDeletedAt = Date.now();
    if ('plotLineId' in item && 'chapterId' in item) {
      setScenes(scenes.map(s => s.id === item.id ? { ...s, deletedAt: newDeletedAt } : s));
    } else if ('order' in item) {
      setChapters(chapters.map(c => c.id === item.id ? { ...c, deletedAt: newDeletedAt } : c));
    } else if ('color' in item && 'name' in item) {
      setPlotLines(plotLines.map(p => p.id === item.id ? { ...p, deletedAt: newDeletedAt } : p));
    } else if ('status' in item) {
      setProjects(projects.map(p => p.id === item.id ? { ...p, deletedAt: newDeletedAt } : p));
    }
  };

  const activeScenes = scenes.filter(s => !s.deletedAt);
  const activeChapters = chapters.filter(c => !c.deletedAt);
  const activePlotLines = plotLines.filter(p => !p.deletedAt);
  const activeProjects = projects.filter(p => !p.deletedAt);

  return (
    <div className="min-h-screen bg-[#1E1E1E] text-white">
      <div className="flex">
        {!isGridExpanded && (
          <Sidebar 
            activeView={activeView} 
            setActiveView={setActiveView}
            hasSelectedProject={!!selectedProject}
          />
        )}

        <div className={`flex-1 flex ${isGridExpanded ? 'flex-row' : 'flex-col'}`}>
          {isGridExpanded && (
            <ExpandedSidebar onClose={() => setIsGridExpanded(false)} />
          )}

          <main className="flex-1 overflow-auto">
            {activeView === 'home' && (
              <HomeView
                projects={activeProjects}
                selectedProject={selectedProject}
                setSelectedProject={setSelectedProject}
                isGridExpanded={isGridExpanded}
                plotLines={activePlotLines}
                chapters={activeChapters}
                scenes={activeScenes}
                setIsGridExpanded={setIsGridExpanded}
                addChapter={addChapter}
                addPlotLine={addPlotLine}
                addScene={addScene}
                deleteScene={deleteScene}
                deleteChapter={deleteChapter}
                deletePlotLine={deletePlotLine}
                updateScene={updateScene}
              />
            )}

            {activeView === 'library' && (
              <LibraryView
                projects={activeProjects}
                onSelectProject={handleSelectProject}
              />
            )}

            {activeView === 'editor' && (
              <EditorView
                selectedProject={selectedProject}
                chapters={activeChapters}
                scenes={activeScenes}
                updateScene={updateScene}
              />
            )}

            {activeView === 'assistant' && (
              <AssistantView selectedProject={selectedProject} />
            )}

            {activeView === 'settings' && <SettingsView />}

            {activeView === 'trash' && (
              <TrashView
                deletedItems={getDeletedItems()}
                onRestore={handleRestore}
                onPermanentDelete={handlePermanentDelete}
                onExtendStorage={handleExtendStorage}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default Index;
