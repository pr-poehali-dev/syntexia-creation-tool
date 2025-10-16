import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import Icon from '@/components/ui/icon';

const AssistantView = () => {
  return (
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
  );
};

export default AssistantView;
