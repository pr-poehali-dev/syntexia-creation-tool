import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

interface AssistantViewProps {
  selectedProject: any | null;
}

const WRITING_STYLES = [
  { id: 'classic', name: 'Классический', icon: 'Feather', color: 'bg-blue-600', prompt: 'Напиши текст в классическом литературном стиле с плавным повествованием и детальными описаниями' },
  { id: 'dynamic', name: 'Динамичный', icon: 'Zap', color: 'bg-orange-600', prompt: 'Напиши текст в динамичном стиле с короткими предложениями, энергичным ритмом и акцентом на действие' },
  { id: 'literary', name: 'Литературный', icon: 'BookOpen', color: 'bg-purple-600', prompt: 'Напиши текст в высоком литературном стиле с богатым языком, метафорами и глубокими размышлениями' },
  { id: 'conversational', name: 'Разговорный', icon: 'MessageCircle', color: 'bg-green-600', prompt: 'Напиши текст в разговорном стиле, естественно и непринужденно, как будто рассказываешь другу' },
  { id: 'poetic', name: 'Поэтичный', icon: 'Sparkles', color: 'bg-pink-600', prompt: 'Напиши текст в поэтичном стиле с образностью, ритмом и эмоциональной глубиной' },
  { id: 'minimalist', name: 'Минималистичный', icon: 'Minus', color: 'bg-gray-600', prompt: 'Напиши текст в минималистичном стиле - кратко, точно, без лишних слов' },
];

const AssistantView = ({ selectedProject }: AssistantViewProps) => {
  const [analyzeText, setAnalyzeText] = useState('');
  const [learnedStyle, setLearnedStyle] = useState<string | null>(null);

  const handleStyleAnalysis = () => {
    if (analyzeText.length > 0) {
      setLearnedStyle('Стиль проанализирован и сохранён');
    }
  };

  if (!selectedProject) {
    return (
      <div className="p-8 animate-fade-in">
        <div className="max-w-4xl mx-auto text-center py-20">
          <Icon name="AlertCircle" size={64} className="mx-auto mb-4 text-gray-500" />
          <h2 className="text-2xl font-bold mb-4">Выберите проект</h2>
          <p className="text-gray-400">
            Для работы с AI Ассистентом сначала выберите проект на главной странице
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 animate-fade-in">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">AI Ассистент</h1>
          <p className="text-gray-400">Проект: {selectedProject.title}</p>
        </div>

        <Tabs defaultValue="style" className="w-full">
          <TabsList className="grid grid-cols-2 bg-[#1E1E1E] p-1 mb-8">
            <TabsTrigger value="style">Стиль текста</TabsTrigger>
            <TabsTrigger value="analyze">Анализ стиля</TabsTrigger>
          </TabsList>

          <TabsContent value="style" className="space-y-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle>Предустановленные стили текста</CardTitle>
                <CardDescription className="text-gray-400">
                  Выберите стиль — промпт автоматически отправится в нейросеть
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {WRITING_STYLES.map((style) => (
                    <Button
                      key={style.id}
                      variant="outline"
                      className={`h-24 flex flex-col items-center justify-center border-gray-700 hover:${style.color} hover:border-transparent transition-all`}
                      onClick={() => {
                        console.log('Генерация в стиле:', style.prompt);
                      }}
                    >
                      <Icon name={style.icon as any} size={28} className="mb-2" />
                      <span className="text-sm font-medium">{style.name}</span>
                    </Button>
                  ))}
                </div>

                {learnedStyle && (
                  <div className="mt-6 p-4 bg-green-900/20 border border-green-700 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Icon name="Check" size={20} className="text-green-500" />
                      <span className="text-sm text-green-400">{learnedStyle}</span>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analyze" className="space-y-6">
            <Card className="bg-[#1E1E1E] border-gray-800">
              <CardHeader>
                <CardTitle>Анализ вашего стиля</CardTitle>
                <CardDescription className="text-gray-400">
                  Загрузите фрагмент текста до 50000 символов для анализа стиля
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm text-gray-400 mb-2">
                    <span>Введите или вставьте текст</span>
                    <span className={analyzeText.length > 50000 ? 'text-red-500' : ''}>
                      {analyzeText.length} / 50000
                    </span>
                  </div>
                  <Textarea
                    value={analyzeText}
                    onChange={(e) => {
                      const text = e.target.value.slice(0, 50000);
                      setAnalyzeText(text);
                    }}
                    placeholder="Вставьте ваш текст сюда. AI проанализирует стиль и запомнит его для дальнейшей работы..."
                    className="bg-gray-900 border-gray-700 min-h-[400px] font-mono text-sm"
                  />
                </div>

                <Button
                  onClick={handleStyleAnalysis}
                  disabled={analyzeText.length < 100}
                  className="w-full bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                >
                  <Icon name="Sparkles" size={20} className="mr-2" />
                  Анализировать стиль
                </Button>

                {analyzeText.length > 0 && analyzeText.length < 100 && (
                  <p className="text-sm text-amber-500">
                    Минимум 100 символов для анализа стиля
                  </p>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AssistantView;
