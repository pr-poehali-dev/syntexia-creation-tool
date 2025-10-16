export interface Project {
  id: string;
  title: string;
  description: string;
  status: 'in-progress' | 'drafting' | 'completed';
  progress: number;
  color: string;
  deletedAt?: number;
}

export interface PlotLine {
  id: string;
  name: string;
  color: string;
  deletedAt?: number;
}

export interface Scene {
  id: string;
  plotLineId: string;
  chapterId: string;
  title: string;
  description: string;
  content?: string;
  deletedAt?: number;
}

export interface Chapter {
  id: string;
  name: string;
  order: number;
  deletedAt?: number;
}

export const getStatusInfo = (status: Project['status']) => {
  switch (status) {
    case 'in-progress':
      return { label: 'В работе', color: 'bg-amber-500' };
    case 'drafting':
      return { label: 'Черновик', color: 'bg-blue-500' };
    case 'completed':
      return { label: 'Завершено', color: 'bg-green-500' };
  }
};
