import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { curriculum } from '@/src/data/curriculum';
import { BookOpen, ArrowRight, Sparkles, FlaskConical, Globe2, Dna } from 'lucide-react';

const icons = [Globe2, FlaskConical, Dna, Sparkles, BookOpen, ArrowRight, Globe2];

export function Home() {
  return (
    <div className="space-y-16 pb-12">
      {/* Hero Section */}
      <section className="relative text-center space-y-8 max-w-4xl mx-auto pt-16 pb-12">
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
          className="text-5xl md:text-7xl font-extrabold tracking-tight text-foreground leading-tight"
        >
          Aprenda Ciências de forma <br className="hidden md:block" />
          <span className="text-gradient">totalmente interativa</span>
        </motion.h1>
        
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          Explore o universo, o corpo humano e a matéria através de simulações 3D, exercícios dinâmicos e aulas imersivas.
        </motion.p>
      </section>

      {/* Curriculum Grid (Bento Box Style) */}
      <section className="max-w-6xl mx-auto">
        <div className="flex items-center justify-between mb-8 px-2">
          <h2 className="text-3xl font-bold flex items-center gap-3">
            <BookOpen className="w-8 h-8 text-primary" />
            Escolha sua série
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[200px]">
          {curriculum.map((grade, index) => {
            const Icon = icons[index % icons.length];
            // Make some cards span 2 columns or rows for a bento box feel
            const isLarge = index === 0 || index === 3;
            
            return (
              <motion.div
                key={grade.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.4 }}
                className={`${isLarge ? 'md:col-span-2' : 'col-span-1'}`}
              >
                <Link to={`/grade/${grade.id}`} className="block h-full">
                  <div className="h-full relative overflow-hidden rounded-3xl glass border border-white/40 p-8 bento-hover group flex flex-col justify-between bg-gradient-to-br from-white/60 to-white/10 dark:from-slate-800/60 dark:to-slate-900/10">
                    
                    {/* Background decorative icon */}
                    <Icon className="absolute -bottom-6 -right-6 w-40 h-40 text-primary/5 group-hover:text-primary/10 transition-colors duration-500 transform group-hover:scale-110 group-hover:-rotate-12" />
                    
                    <div>
                      <div className="w-12 h-12 rounded-2xl bg-primary/10 flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors duration-300">
                        <Icon className="w-6 h-6 text-primary group-hover:text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {grade.title}
                      </h3>
                      <p className="text-muted-foreground font-medium line-clamp-2">
                        {grade.description}
                      </p>
                    </div>

                    <div className="flex items-center text-sm font-bold text-primary mt-4">
                      Explorar módulos 
                      <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Signature Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center pt-8 pb-4"
      >
        <p className="text-sm text-muted-foreground italic">
          "A ciência é a chave para entender o mundo." — <span className="font-bold text-primary not-italic">Thomaz</span>
        </p>
      </motion.section>
    </div>
  );
}
