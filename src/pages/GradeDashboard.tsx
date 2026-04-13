import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '@/src/data/curriculum';
import { Button } from '@/src/components/ui/button';
import { ChevronLeft, PlayCircle, Box, FileText, ArrowRight, ClipboardCheck, BookOpen } from 'lucide-react';

export function GradeDashboard() {
  const { gradeId } = useParams();
  const grade = curriculum.find(g => g.id === gradeId);
  const [activeTab, setActiveTab] = useState<'modules' | 'assessments'>('modules');

  if (!grade) {
    return <div>Série não encontrada.</div>;
  }

  const getIconForType = (type: string) => {
    switch (type) {
      case '3d': return <Box className="w-5 h-5 text-primary" />;
      case '2d': return <PlayCircle className="w-5 h-5 text-emerald-500" />;
      default: return <FileText className="w-5 h-5 text-orange-500" />;
    }
  };

  const getLabelForType = (type: string) => {
    switch (type) {
      case '3d': return 'Simulação 3D';
      case '2d': return 'Interativo 2D';
      default: return 'Leitura';
    }
  };

  return (
    <div className="space-y-12 max-w-5xl mx-auto pb-12">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center gap-6 bg-white/50 dark:bg-slate-900/50 p-6 rounded-3xl border border-white/20 shadow-sm backdrop-blur-md"
      >
        <Button variant="outline" size="icon" className="rounded-full w-12 h-12 shrink-0" asChild>
          <Link to="/">
            <ChevronLeft className="w-6 h-6" />
          </Link>
        </Button>
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-foreground mb-2">{grade.title}</h1>
          <p className="text-lg text-muted-foreground">{grade.description}</p>
        </div>
      </motion.div>

      <div className="flex gap-4 justify-center">
        <button
          onClick={() => setActiveTab('modules')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeTab === 'modules' 
              ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
              : 'glass text-muted-foreground hover:text-foreground hover:scale-105'
          }`}
        >
          <BookOpen className="w-5 h-5" />
          Módulos de Aula
        </button>
        <button
          onClick={() => setActiveTab('assessments')}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all duration-300 ${
            activeTab === 'assessments' 
              ? 'bg-primary text-white shadow-md shadow-primary/20 scale-105' 
              : 'glass text-muted-foreground hover:text-foreground hover:scale-105'
          }`}
        >
          <ClipboardCheck className="w-5 h-5" />
          Avaliações
        </button>
      </div>

      {activeTab === 'modules' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-12"
        >
          {grade.modules.map((module, mIndex) => (
            <div key={module.id} className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="h-px flex-1 bg-border"></div>
                <h2 className="text-2xl font-bold text-foreground px-4 py-2 rounded-full bg-secondary/50 border">
                  {module.title}
                </h2>
                <div className="h-px flex-1 bg-border"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {module.lessons.map((lesson, lIndex) => (
                  <motion.div
                    key={lesson.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: (mIndex * 0.1) + (lIndex * 0.05) }}
                  >
                    <Link to={`/lesson/${grade.id}/${module.id}/${lesson.id}`} className="block h-full">
                      <div className="h-full glass rounded-3xl p-6 bento-hover group flex flex-col justify-between relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full -z-10 group-hover:bg-primary/10 transition-colors duration-500"></div>
                        
                        <div>
                          <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/80 text-xs font-semibold">
                              {getIconForType(lesson.type)}
                              <span>{getLabelForType(lesson.type)}</span>
                            </div>
                          </div>
                          <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                            {lesson.title}
                          </h3>
                          <p className="text-muted-foreground line-clamp-2">
                            {lesson.description}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center justify-between">
                          <span className="text-sm font-bold text-primary opacity-0 -translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                            Iniciar Aula
                          </span>
                          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                            <ArrowRight className="w-5 h-5 text-primary group-hover:text-white" />
                          </div>
                        </div>
                      </div>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      )}

      {activeTab === 'assessments' && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-6"
        >
          {[1, 2].map((bimester) => (
            <Link key={bimester} to={`/grade/${grade.id}/assessment/${bimester}`} className="block h-full">
              <div className="h-full glass rounded-3xl p-8 bento-hover group flex flex-col justify-between relative overflow-hidden bg-gradient-to-br from-white/60 to-white/10 dark:from-slate-800/60 dark:to-slate-900/10">
                <ClipboardCheck className="absolute -bottom-6 -right-6 w-40 h-40 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
                
                <div>
                  <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary transition-colors duration-300">
                    <ClipboardCheck className="w-7 h-7 text-primary group-hover:text-white" />
                  </div>
                  <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                    Avaliação do {bimester}º Bimestre
                  </h3>
                  <p className="text-muted-foreground font-medium">
                    Teste seus conhecimentos sobre os módulos estudados neste bimestre.
                  </p>
                </div>

                <div className="flex items-center text-sm font-bold text-primary mt-8">
                  Iniciar Avaliação 
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </motion.div>
      )}
    </div>
  );
}
