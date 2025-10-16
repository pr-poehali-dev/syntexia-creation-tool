import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';
import ProjectGrid from '@/components/ProjectGrid';
import type { Project, PlotLine, Chapter, Scene } from '@/types/project';
import { getStatusInfo } from '@/types/project';

interface HomeViewProps {
  projects: Project[];
  selectedProject: Project | null;
  setSelectedProject: (project: Project | null) => void;
  isGridExpanded: boolean;
  plotLines: PlotLine[];
  chapters: Chapter[];
  scenes: Scene[];
  setIsGridExpanded: (expanded: boolean) => void;
  addChapter: () => void;
  addPlotLine: () => void;
  addScene: (plotLineId: string, chapterId: string) => void;
  deleteScene: (sceneId: string) => void;
  deleteChapter: (chapterId: string) => void;
  deletePlotLine: (plotLineId: string) => void;
  updateScene: (sceneId: string, updates: Partial<Scene>) => void;
}

const HomeView = ({
  projects,
  selectedProject,
  setSelectedProject,
  isGridExpanded,
  plotLines,
  chapters,
  scenes,
  setIsGridExpanded,
  addChapter,
  addPlotLine,
  addScene,
  deleteScene,
  deleteChapter,
  deletePlotLine,
  updateScene
}: HomeViewProps) => {
  return (
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

            <ProjectGrid
              plotLines={plotLines}
              chapters={chapters}
              scenes={scenes}
              isGridExpanded={isGridExpanded}
              setIsGridExpanded={setIsGridExpanded}
              addChapter={addChapter}
              addPlotLine={addPlotLine}
              addScene={addScene}
              deleteScene={deleteScene}
              deleteChapter={deleteChapter}
              deletePlotLine={deletePlotLine}
              updateScene={updateScene}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default HomeView;