import Icon from '@/components/ui/icon';

interface SidebarProps {
  activeView: 'home' | 'library' | 'assistant' | 'settings' | 'editor';
  setActiveView: (view: 'home' | 'library' | 'assistant' | 'settings' | 'editor') => void;
  hasSelectedProject: boolean;
}

const Sidebar = ({ activeView, setActiveView, hasSelectedProject }: SidebarProps) => {
  return (
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

      {hasSelectedProject && (
        <button
          onClick={() => setActiveView('editor')}
          className={`w-12 h-12 rounded-xl flex items-center justify-center transition-colors ${
            activeView === 'editor' ? 'bg-purple-600' : 'hover:bg-gray-800'
          }`}
        >
          <Icon name="FileEdit" size={20} />
        </button>
      )}
      
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
  );
};

export default Sidebar;
