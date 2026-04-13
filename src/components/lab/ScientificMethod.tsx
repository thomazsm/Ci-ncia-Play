import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, HelpCircle, Lightbulb, FlaskConical, BarChart3, CheckCircle2, ArrowRight } from 'lucide-react';

const steps = [
  { id: 'obs', title: 'Observação', icon: <Search size={32} />, desc: 'Notar algo interessante ou um problema no mundo ao redor.', example: 'A planta na janela está murchando, mas a planta da mesa está saudável.' },
  { id: 'pergunta', title: 'Pergunta', icon: <HelpCircle size={32} />, desc: 'Formular uma pergunta clara sobre o que foi observado.', example: '"Por que a planta da janela está murchando?"' },
  { id: 'hipotese', title: 'Hipótese', icon: <Lightbulb size={32} />, desc: 'Propor uma explicação possível (um palpite educado) que possa ser testada.', example: '"Acho que a planta da janela está recebendo muito sol direto e secando."' },
  { id: 'experimento', title: 'Experimento', icon: <FlaskConical size={32} />, desc: 'Criar um teste justo para verificar se a hipótese está correta.', example: 'Colocar duas plantas iguais na janela, mas proteger uma delas do sol direto com uma tela.' },
  { id: 'analise', title: 'Análise', icon: <BarChart3 size={32} />, desc: 'Coletar os dados do experimento e ver o que aconteceu.', example: 'A planta protegida pela tela voltou a ficar verde. A planta sem tela continuou murcha.' },
  { id: 'conclusao', title: 'Conclusão', icon: <CheckCircle2 size={32} />, desc: 'Decidir se a hipótese estava certa ou errada com base nos dados.', example: 'Minha hipótese estava certa! O excesso de sol direto estava secando a planta.' },
];

export function ScientificMethod() {
  const [currentStep, setCurrentStep] = useState(0);

  const nextStep = () => {
    if (currentStep < steps.length - 1) setCurrentStep(c => c + 1);
  };

  const reset = () => setCurrentStep(0);

  return (
    <div className="flex flex-col items-center justify-center p-8 h-full bg-slate-100 dark:bg-slate-900 rounded-2xl">
      <h2 className="text-3xl font-bold mb-2 text-foreground">O Método Científico</h2>
      <p className="text-muted-foreground mb-8 font-medium text-center max-w-2xl">
        A ciência não é apenas um conjunto de fatos, mas uma <strong>forma de pensar e investigar</strong> o mundo. Siga os passos para resolver um problema.
      </p>

      {/* Progress Bar */}
      <div className="w-full max-w-4xl flex items-center justify-between mb-12 relative">
        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-2 bg-slate-300 dark:bg-slate-700 rounded-full z-0" />
        <motion.div 
          className="absolute left-0 top-1/2 -translate-y-1/2 h-2 bg-primary rounded-full z-0"
          initial={{ width: 0 }}
          animate={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
          transition={{ duration: 0.5 }}
        />

        {steps.map((step, idx) => {
          const isActive = idx === currentStep;
          const isPast = idx < currentStep;
          return (
            <div key={step.id} className="relative z-10 flex flex-col items-center gap-2">
              <motion.div 
                className={`w-16 h-16 rounded-full flex items-center justify-center border-4 transition-colors duration-300 ${
                  isActive ? 'bg-primary border-primary text-white scale-110 shadow-lg shadow-primary/30' : 
                  isPast ? 'bg-primary border-primary text-white' : 
                  'bg-white dark:bg-slate-800 border-slate-300 dark:border-slate-600 text-slate-400'
                }`}
                animate={isActive ? { y: [0, -10, 0] } : {}}
                transition={{ duration: 2, repeat: Infinity }}
              >
                {step.icon}
              </motion.div>
              <span className={`text-xs font-bold uppercase tracking-wider hidden md:block ${isActive ? 'text-primary' : isPast ? 'text-foreground' : 'text-muted-foreground'}`}>
                {step.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Active Step Content */}
      <div className="w-full max-w-2xl bg-white dark:bg-slate-800 rounded-3xl shadow-xl border border-border p-8 min-h-[250px] flex flex-col">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentStep}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="flex-1 flex flex-col"
          >
            <div className="flex items-center gap-4 mb-4 text-primary">
              {steps[currentStep].icon}
              <h3 className="text-2xl font-bold">{steps[currentStep].title}</h3>
            </div>
            
            <p className="text-lg text-foreground mb-6 font-medium">
              {steps[currentStep].desc}
            </p>
            
            <div className="mt-auto bg-slate-100 dark:bg-slate-900 p-4 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-bold uppercase text-muted-foreground block mb-1">Exemplo Prático:</span>
              <p className="text-foreground italic">
                {steps[currentStep].example}
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Controls */}
      <div className="mt-8 flex gap-4">
        {currentStep < steps.length - 1 ? (
          <button 
            onClick={nextStep}
            className="px-8 py-4 bg-primary text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30"
          >
            Próximo Passo <ArrowRight size={20} />
          </button>
        ) : (
          <button 
            onClick={reset}
            className="px-8 py-4 bg-emerald-600 text-white rounded-full font-bold text-lg flex items-center gap-2 hover:bg-emerald-500 transition-colors shadow-lg shadow-emerald-600/30"
          >
            Iniciar Nova Investigação
          </button>
        )}
      </div>

    </div>
  );
}
