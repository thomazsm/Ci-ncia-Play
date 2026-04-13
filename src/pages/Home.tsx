import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '@/src/data/curriculum';
import { BookOpen, ArrowRight, Sparkles, FlaskConical, Globe2, Dna, Microscope, Atom } from 'lucide-react';

const icons = [Globe2, FlaskConical, Dna, Microscope, Atom, BookOpen, Sparkles];

export function Home() {
  const ensinoFundamental = curriculum.filter(g => g.id.startsWith('ef'));
  const ensinoMedio = curriculum.filter(g => g.id.startsWith('em'));

  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 max-w-4xl mx-auto pt-16 pb-12 px-4">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-background to-background blur-3xl"></div>
        
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass text-sm font-medium text-primary mb-4"
        >
          <Sparkles className="w-4 h-4" />
          <span>Alinhado à BNCC 2026</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-4xl sm:text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          Aprenda Ciências de forma <br className="hidden md:block" />
          <span className="text-gradient">totalmente interativa</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Explore o universo, o corpo humano e a matéria através de simulações 3D, exercícios dinâmicos e aulas imersivas.
        </motion.p>
      </section>

      {/* Curriculum Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Ensino Fundamental */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-primary/10 rounded-xl">
              <BookOpen className="w-6 h-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Ensino Fundamental II</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ensinoFundamental.map((grade, index) => {
              const Icon = icons[index % icons.length];
              return (
                <motion.div
                  key={grade.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link to={`/grade/${grade.id}`} className="block h-full">
                    <div className="h-full relative overflow-hidden rounded-3xl glass border border-white/40 p-6 sm:p-8 bento-hover group flex flex-col justify-between bg-gradient-to-br from-white/60 to-white/10 dark:from-slate-800/60 dark:to-slate-900/10">
                      <Icon className="absolute -bottom-4 -right-4 w-32 h-32 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
                      
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                          {grade.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium line-clamp-3">
                          {grade.description}
                        </p>
                      </div>

                      <div className="flex items-center text-sm font-bold text-primary mt-6">
                        Explorar módulos 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Ensino Médio */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-500/10 rounded-xl">
              <Microscope className="w-6 h-6 text-emerald-500" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold">Ensino Médio</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {ensinoMedio.map((grade, index) => {
              const Icon = icons[(index + 4) % icons.length];
              return (
                <motion.div
                  key={grade.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <Link to={`/grade/${grade.id}`} className="block h-full">
                    <div className="h-full relative overflow-hidden rounded-3xl glass border border-white/40 p-6 sm:p-8 bento-hover group flex flex-col justify-between bg-gradient-to-br from-white/60 to-white/10 dark:from-slate-800/60 dark:to-slate-900/10">
                      <Icon className="absolute -bottom-4 -right-4 w-32 h-32 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
                      
                      <div>
                        <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                          <Icon className="w-6 h-6 text-emerald-500 group-hover:text-white" />
                        </div>
                        <h3 className="text-xl sm:text-2xl font-bold mb-2 group-hover:text-emerald-500 transition-colors">
                          {grade.title}
                        </h3>
                        <p className="text-sm sm:text-base text-muted-foreground font-medium line-clamp-3">
                          {grade.description}
                        </p>
                      </div>

                      <div className="flex items-center text-sm font-bold text-emerald-500 mt-6">
                        Explorar módulos 
                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Signature Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-12 pb-4 px-4"
      >
        <p className="text-sm text-muted-foreground italic">
          "A ciência é a chave para entender o mundo." — <span className="font-bold text-primary not-italic">Thomaz</span>
        </p>
      </motion.section>
    </div>
  );
}
