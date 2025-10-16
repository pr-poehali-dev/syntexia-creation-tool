import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import type { Project } from '@/types/project';
import { getStatusInfo } from '@/types/project';

interface LibraryViewProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

const LibraryView = ({ projects, onSelectProject }: LibraryViewProps) => {
  return (
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
              onClick={() => onSelectProject(project)}
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
  );
};

export default LibraryView;
