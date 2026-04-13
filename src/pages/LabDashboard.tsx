import { motion } from 'framer-motion';
import { Microscope } from 'lucide-react';
import { LabGallery } from '@/src/components/lab/LabGallery';

export function LabDashboard() {
  return (
    <div className="flex flex-col max-w-7xl mx-auto pb-12 px-4 sm:px-6">
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 mb-8 bg-white/50 dark:bg-slate-900/50 p-6 sm:p-8 rounded-3xl border border-white/20 shadow-sm backdrop-blur-md"
      >
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-4 flex items-center gap-3">
          <div className="bg-primary/10 p-3 rounded-2xl text-primary">
            <Microscope className="w-8 h-8" />
          </div>
          Laboratório 3D
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground sm:ml-14">Explore, experimente e divirta-se no nosso ambiente de simulação livre.</p>
      </motion.div>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="w-full"
      >
        <LabGallery />
      </motion.div>
    </div>
  );
}
