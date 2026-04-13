import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCcw } from 'lucide-react';
import { Button } from '@/src/components/ui/button';

const questions = [
  {
    id: 1,
    subject: 'Biologia',
    question: 'Qual organela celular é responsável pela respiração celular e produção de energia (ATP)?',
    options: ['Complexo de Golgi', 'Ribossomo', 'Mitocôndria', 'Lisossomo'],
    correct: 2,
    explanation: 'As mitocôndrias são as "usinas de energia" da célula, responsáveis pela respiração celular e produção de ATP.'
  },
  {
    id: 2,
    subject: 'Física',
    question: 'De acordo com a Primeira Lei de Newton (Inércia), um corpo em movimento retilíneo uniforme tende a:',
    options: ['Parar gradualmente', 'Acelerar constantemente', 'Mudar de direção', 'Manter seu estado de movimento'],
    correct: 3,
    explanation: 'A inércia é a tendência dos corpos de manterem seu estado de repouso ou de movimento retilíneo uniforme, a menos que uma força resultante atue sobre eles.'
  },
  {
    id: 3,
    subject: 'Química',
    question: 'Qual é o tipo de ligação química que ocorre através do compartilhamento de elétrons entre átomos?',
    options: ['Ligação Iônica', 'Ligação Covalente', 'Ligação Metálica', 'Ligação de Hidrogênio'],
    correct: 1,
    explanation: 'A ligação covalente ocorre quando átomos não-metálicos compartilham pares de elétrons para atingir a estabilidade.'
  },
  {
    id: 4,
    subject: 'Biologia',
    question: 'Na genética mendeliana, o cruzamento entre dois indivíduos heterozigotos (Aa x Aa) resulta em qual proporção fenotípica esperada (considerando dominância completa)?',
    options: ['1:1', '3:1', '9:3:3:1', '1:2:1'],
    correct: 1,
    explanation: 'O cruzamento Aa x Aa gera genótipos na proporção 1 AA : 2 Aa : 1 aa. Como AA e Aa têm o mesmo fenótipo dominante, a proporção fenotípica é 3 dominantes para 1 recessivo (3:1).'
  },
  {
    id: 5,
    subject: 'Geografia/Ciências',
    question: 'Qual bioma brasileiro é caracterizado por árvores de troncos retorcidos, cascas grossas e é conhecido como a "caixa d\'água do Brasil"?',
    options: ['Amazônia', 'Caatinga', 'Cerrado', 'Mata Atlântica'],
    correct: 2,
    explanation: 'O Cerrado possui vegetação adaptada a queimadas naturais e longos períodos de seca (troncos retorcidos e cascas grossas), e abriga as nascentes das principais bacias hidrográficas do país.'
  }
];

export function Quiz() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [score, setScore] = useState(0);
  const [showResults, setShowResults] = useState(false);

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);
    if (index === questions[currentQuestion].correct) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(c => c + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  if (showResults) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-8 bg-slate-50 dark:bg-slate-900 rounded-xl text-center">
        <Trophy className="w-24 h-24 text-yellow-500 mb-6" />
        <h2 className="text-3xl font-bold mb-2 text-slate-800 dark:text-slate-100">Simulado Concluído!</h2>
        <p className="text-xl text-slate-600 dark:text-slate-400 mb-8">
          Você acertou <span className="font-bold text-primary">{score}</span> de {questions.length} questões.
        </p>
        
        <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-slate-500">Desempenho</span>
            <span className="text-sm font-bold text-primary">{Math.round((score / questions.length) * 100)}%</span>
          </div>
          <div className="w-full bg-slate-100 dark:bg-slate-700 rounded-full h-3">
            <div 
              className="bg-primary h-3 rounded-full transition-all duration-1000" 
              style={{ width: `${(score / questions.length) * 100}%` }}
            />
          </div>
        </div>

        <Button onClick={handleRestart} size="lg" className="gap-2">
          <RefreshCcw className="w-5 h-5" /> Tentar Novamente
        </Button>
      </div>
    );
  }

  const q = questions[currentQuestion];

  return (
    <div className="flex flex-col h-full p-6 bg-slate-50 dark:bg-slate-900 rounded-xl max-w-3xl mx-auto w-full">
      <div className="flex justify-between items-center mb-8">
        <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-semibold">
          {q.subject}
        </span>
        <span className="text-sm font-medium text-slate-500">
          Questão {currentQuestion + 1} de {questions.length}
        </span>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentQuestion}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="flex-1 flex flex-col"
        >
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100 mb-8 leading-relaxed">
            {q.question}
          </h2>

          <div className="space-y-3 mb-8">
            {q.options.map((opt, i) => {
              let btnClass = "w-full text-left p-4 rounded-xl border-2 transition-all ";
              
              if (!isAnswered) {
                btnClass += "border-slate-200 dark:border-slate-700 hover:border-primary hover:bg-primary/5 bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300";
              } else {
                if (i === q.correct) {
                  btnClass += "border-emerald-500 bg-emerald-50 dark:bg-emerald-900/20 text-emerald-700 dark:text-emerald-400";
                } else if (i === selectedOption) {
                  btnClass += "border-red-500 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400";
                } else {
                  btnClass += "border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800/50 text-slate-400 opacity-50";
                }
              }

              return (
                <button
                  key={i}
                  disabled={isAnswered}
                  onClick={() => handleSelect(i)}
                  className={btnClass}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{opt}</span>
                    {isAnswered && i === q.correct && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                    {isAnswered && i === selectedOption && i !== q.correct && <XCircle className="w-5 h-5 text-red-500" />}
                  </div>
                </button>
              );
            })}
          </div>

          {isAnswered && (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className={`p-4 rounded-lg mb-8 ${selectedOption === q.correct ? 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-200' : 'bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200'}`}
            >
              <h4 className="font-bold mb-1">{selectedOption === q.correct ? 'Correto!' : 'Explicação:'}</h4>
              <p className="text-sm">{q.explanation}</p>
            </motion.div>
          )}

          <div className="mt-auto flex justify-end">
            <Button 
              size="lg" 
              onClick={handleNext} 
              disabled={!isAnswered}
              className="w-full sm:w-auto"
            >
              {currentQuestion < questions.length - 1 ? 'Próxima Questão' : 'Ver Resultados'}
            </Button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
