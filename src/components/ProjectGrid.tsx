import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { PlotLine, Chapter, Scene } from '@/types/project';

interface ProjectGridProps {
  plotLines: PlotLine[];
  chapters: Chapter[];
  scenes: Scene[];
  isGridExpanded: boolean;
  setIsGridExpanded: (expanded: boolean) => void;
  addChapter: () => void;
  addPlotLine: () => void;
  addScene: (plotLineId: string, chapterId: string) => void;
  deleteScene: (sceneId: string) => void;
  deleteChapter: (chapterId: string) => void;
  deletePlotLine: (plotLineId: string) => void;
}

const ProjectGrid = ({
  plotLines,
  chapters,
  scenes,
  isGridExpanded,
  setIsGridExpanded,
  addChapter,
  addPlotLine,
  addScene,
  deleteScene,
  deleteChapter,
  deletePlotLine
}: ProjectGridProps) => {
  return (
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
};

export default ProjectGrid;
