import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { assessmentsData } from '@/src/data/assessments';
import { curriculum } from '@/src/data/curriculum';
import { Button } from '@/src/components/ui/button';
import { ChevronLeft, CheckCircle2, XCircle, ArrowRight, RotateCcw, Printer, X, ListChecks } from 'lucide-react';

const PrintContent = ({ assessment, grade, compact, showAnswers }: { assessment: any, grade: any, compact: boolean, showAnswers: boolean }) => (
  <div className={`text-black bg-white font-serif ${compact ? 'text-xs' : 'text-sm'}`}>
    <div className="text-center border-b-2 border-black pb-4 mb-6">
      <h1 className="text-2xl font-bold uppercase mb-1">Escola de Ciências - Laboratório 3D</h1>
      <h2 className="text-xl font-semibold mb-4">Avaliação de Ciências</h2>
      
      {!showAnswers && (
        <div className="grid grid-cols-2 gap-y-3 text-left mt-4 border-t border-black pt-4">
          <div className="col-span-2">
            <p className="border-b border-black pb-1">Aluno(a): __________________________________________________________________________</p>
          </div>
          <div>
            <p className="border-b border-black pb-1">Série: <span className="font-bold">{grade.title}</span></p>
          </div>
          <div>
            <p className="border-b border-black pb-1">Data: ____/____/______</p>
          </div>
          <div>
            <p className="border-b border-black pb-1">Professor(a): ___________________________</p>
          </div>
          <div className="flex justify-between items-center">
            <p className="border-b border-black pb-1 flex-1 mr-4">Nº: _________</p>
            <div className="border-2 border-black p-2 w-20 text-center h-12 flex flex-col justify-between">
              <span className="text-[10px] uppercase font-bold leading-none">Nota</span>
              <span className="text-lg"></span>
            </div>
          </div>
        </div>
      )}

      {showAnswers && (
        <div className="mt-2 p-2 bg-gray-100 border border-black inline-block px-8">
          <h3 className="font-bold uppercase tracking-widest">Gabarito do Professor</h3>
          <p className="text-xs mt-1">{grade.title} - {assessment.title}</p>
        </div>
      )}
    </div>

    <div className={`space-y-${compact ? '4' : '8'}`}>
      {assessment.questions.map((q: any, index: number) => (
        <div key={q.id} className="break-inside-avoid">
          <p className="font-bold mb-3 leading-relaxed">
            {index + 1}. {q.text}
          </p>
          <div className="space-y-2 pl-6">
            {q.options.map((opt: string, optIndex: number) => {
              const isCorrect = showAnswers && optIndex === q.correctAnswer;
              return (
                <div key={optIndex} className={`flex gap-3 items-start ${isCorrect ? 'font-bold underline' : ''}`}>
                  <span className="shrink-0">{String.fromCharCode(97 + optIndex)})</span>
                  <span className="leading-snug">{opt}</span>
                </div>
              );
            })}
          </div>
          {showAnswers && (
            <div className="mt-3 text-gray-700 italic text-xs border-l-2 border-gray-300 pl-3 py-1">
              <span className="font-bold not-italic">Explicação:</span> {q.explanation}
            </div>
          )}
        </div>
      ))}
    </div>

    <div className="mt-12 pt-8 border-t border-gray-200 text-[10px] text-gray-400 flex justify-between italic">
      <span>{assessment.title} • {grade.title}</span>
      <span>Gerado via Laboratório 3D - Plataforma de Ciências</span>
    </div>
  </div>
);

export function AssessmentView() {
  const { gradeId, bimester } = useParams();
  const navigate = useNavigate();
  
  const grade = curriculum.find(g => g.id === gradeId);
  const gradeAssessments = gradeId ? assessmentsData[gradeId] : null;
  const assessment = bimester === '1' ? gradeAssessments?.bimester1 : gradeAssessments?.bimester2;

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState<Record<number, number>>({});
  const [isFinished, setIsFinished] = useState(false);
  const [printMode, setPrintMode] = useState<'none' | 'full' | 'half'>('none');
  const [showPrintModal, setShowPrintModal] = useState(false);
  const [showAnswerKey, setShowAnswerKey] = useState(false);
  const [includeAnswersInPrint, setIncludeAnswersInPrint] = useState(false);

  // Check for print parameter on mount
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const printParam = params.get('print');
    const bimesterParam = params.get('bimester');
    const answersParam = params.get('answers');

    if (printParam === 'full' || printParam === 'half') {
      if (answersParam === 'true') setShowAnswerKey(true);
      setPrintMode(printParam as 'full' | 'half');
    }
  }, []);

  useEffect(() => {
    if (printMode !== 'none') {
      // Pequeno delay para garantir que o conteúdo de impressão foi renderizado no DOM
      const printTimer = setTimeout(() => {
        try {
          window.focus();
          window.print();
        } catch (e) {
          console.error("Erro ao tentar imprimir:", e);
        }
        
        // Se estivermos em uma aba de impressão (via URL param), não resetamos o modo
        // para permitir que o usuário tente imprimir novamente se falhar
        const params = new URLSearchParams(window.location.search);
        if (!params.get('print')) {
          const resetTimer = setTimeout(() => {
            setPrintMode('none');
          }, 1000);
          return () => clearTimeout(resetTimer);
        }
      }, 800);
      
      return () => clearTimeout(printTimer);
    }
  }, [printMode]);

  const handlePrint = (mode: 'full' | 'half') => {
    setShowPrintModal(false);
    setPrintMode(mode);
  };

  const openInNewTab = (mode: 'full' | 'half') => {
    setShowPrintModal(false);
    const url = new URL(window.location.href);
    url.searchParams.set('print', mode);
    if (includeAnswersInPrint) {
      url.searchParams.set('answers', 'true');
    }
    window.open(url.toString(), '_blank');
  };

  const handleOpenPrintModal = () => {
    setIncludeAnswersInPrint(showAnswerKey);
    setShowPrintModal(true);
  };

  if (!grade || !assessment) {
    return (
      <div className="flex flex-col items-center justify-center h-[50vh] space-y-4">
        <h2 className="text-2xl font-bold">Avaliação não encontrada</h2>
        <Button onClick={() => navigate(`/grade/${gradeId}`)}>Voltar</Button>
      </div>
    );
  }

  const currentQuestion = assessment.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === assessment.questions.length - 1;
  const hasAnsweredCurrent = selectedAnswers[currentQuestionIndex] !== undefined;

  const handleAnswerSelect = (optionIndex: number) => {
    if (hasAnsweredCurrent) return; // Prevent changing answer after selection
    setSelectedAnswers(prev => ({ ...prev, [currentQuestionIndex]: optionIndex }));
  };

  const handleNext = () => {
    if (isLastQuestion) {
      setIsFinished(true);
    } else {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  };

  const calculateScore = () => {
    let correct = 0;
    assessment.questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correctAnswer) {
        correct++;
      }
    });
    return correct;
  };

  if (isFinished && !showAnswerKey) {
    const score = calculateScore();
    const total = assessment.questions.length;
    const percentage = (score / total) * 100;

    return (
      <div className="max-w-3xl mx-auto space-y-8 pb-12">
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass rounded-3xl p-8 text-center space-y-6"
        >
          <div className="w-24 h-24 mx-auto rounded-full flex items-center justify-center bg-primary/10">
            {percentage >= 60 ? (
              <CheckCircle2 className="w-12 h-12 text-emerald-500" />
            ) : (
              <XCircle className="w-12 h-12 text-destructive" />
            )}
          </div>
          <div>
            <h2 className="text-3xl font-bold mb-2">Avaliação Concluída!</h2>
            <p className="text-xl text-muted-foreground">
              Você acertou <span className="font-bold text-foreground">{score}</span> de <span className="font-bold text-foreground">{total}</span> questões.
            </p>
          </div>
          
          <div className="flex justify-center gap-4 pt-4">
            <Button variant="outline" onClick={() => navigate(`/grade/${gradeId}`)}>
              Voltar para a Série
            </Button>
            <Button variant="outline" onClick={handleOpenPrintModal}>
              <Printer className="w-4 h-4 mr-2" />
              Imprimir Resultado
            </Button>
            <Button onClick={() => {
              setSelectedAnswers({});
              setCurrentQuestionIndex(0);
              setIsFinished(false);
            }}>
              <RotateCcw className="w-4 h-4 mr-2" />
              Refazer Avaliação
            </Button>
          </div>
        </motion.div>

        <div className="space-y-6">
          <h3 className="text-2xl font-bold px-2">Revisão das Respostas</h3>
          {assessment.questions.map((q, index) => {
            const userAnswer = selectedAnswers[index];
            const isCorrect = userAnswer === q.correctAnswer;
            
            return (
              <motion.div 
                key={q.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass rounded-2xl p-6 border-l-4 ${isCorrect ? 'border-l-emerald-500' : 'border-l-destructive'}`}
              >
                <h4 className="font-bold mb-4">{index + 1}. {q.text}</h4>
                <div className="space-y-2 mb-4">
                  {q.options.map((opt, optIndex) => {
                    let bgClass = "bg-secondary/50";
                    if (optIndex === q.correctAnswer) bgClass = "bg-emerald-500/20 border-emerald-500/50 border";
                    else if (optIndex === userAnswer && !isCorrect) bgClass = "bg-destructive/20 border-destructive/50 border";
                    
                    return (
                      <div key={optIndex} className={`p-3 rounded-xl text-sm ${bgClass}`}>
                        {opt}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-sm">
                  <span className="font-bold">Explicação: </span>{q.explanation}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8 pb-12 print:hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-4">
            <Button variant="outline" size="icon" className="rounded-full shrink-0" onClick={() => navigate(`/grade/${gradeId}`)}>
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <div>
              <h1 className="text-2xl font-bold">{assessment.title}</h1>
              <p className="text-muted-foreground">{grade.title}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button 
              variant={showAnswerKey ? "default" : "outline"} 
              onClick={() => setShowAnswerKey(!showAnswerKey)}
              className="shrink-0"
            >
              <ListChecks className="w-4 h-4 mr-2" />
              {showAnswerKey ? 'Ocultar Gabarito' : 'Ver Gabarito'}
            </Button>
            <Button variant="outline" onClick={handleOpenPrintModal} className="shrink-0">
              <Printer className="w-4 h-4 mr-2" />
              Imprimir {showAnswerKey ? 'Gabarito' : ''}
            </Button>
          </div>
        </div>

        {showAnswerKey ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass rounded-3xl p-8 space-y-8"
          >
            <div className="flex items-center gap-3 mb-6">
              <div className="p-3 rounded-xl bg-primary/10">
                <ListChecks className="w-6 h-6 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Gabarito da Avaliação</h2>
            </div>
            
            {assessment.questions.map((q: any, index: number) => (
              <div key={q.id} className="space-y-4 pb-8 border-b border-border last:border-0 last:pb-0">
                <h3 className="font-bold text-lg">{index + 1}. {q.text}</h3>
                <div className="space-y-2">
                  {q.options.map((opt: string, optIndex: number) => {
                    const isCorrect = optIndex === q.correctAnswer;
                    return (
                      <div key={optIndex} className={`p-4 rounded-xl text-sm flex items-center justify-between ${isCorrect ? 'bg-emerald-500/10 border-emerald-500/50 border-2 font-medium' : 'bg-secondary/50 border-2 border-transparent'}`}>
                        <span>{String.fromCharCode(97 + optIndex)}) {opt}</span>
                        {isCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />}
                      </div>
                    );
                  })}
                </div>
                <div className="bg-primary/5 p-4 rounded-xl text-sm mt-4">
                  <span className="font-bold text-primary">Explicação: </span>
                  <span className="text-muted-foreground">{q.explanation}</span>
                </div>
              </div>
            ))}
          </motion.div>
        ) : (
          <div className="glass rounded-3xl p-8 relative overflow-hidden">
            {/* Progress bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-secondary">
              <motion.div 
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((currentQuestionIndex) / assessment.questions.length) * 100}%` }}
              />
            </div>

            <div className="mb-8 mt-4">
              <span className="text-sm font-bold text-primary mb-2 block">
                Questão {currentQuestionIndex + 1} de {assessment.questions.length}
              </span>
              <h2 className="text-2xl font-bold leading-tight">{currentQuestion.text}</h2>
            </div>

            <div className="space-y-3 mb-8">
              {currentQuestion.options.map((option: string, index: number) => {
                const isSelected = selectedAnswers[currentQuestionIndex] === index;
                const showCorrect = hasAnsweredCurrent && index === currentQuestion.correctAnswer;
                const showWrong = hasAnsweredCurrent && isSelected && index !== currentQuestion.correctAnswer;
                
                let buttonClass = "w-full text-left p-4 rounded-2xl border-2 transition-all duration-300 ";
                
                if (!hasAnsweredCurrent) {
                  buttonClass += "border-transparent bg-secondary/50 hover:bg-secondary hover:border-primary/30";
                } else if (showCorrect) {
                  buttonClass += "border-emerald-500 bg-emerald-500/10";
                } else if (showWrong) {
                  buttonClass += "border-destructive bg-destructive/10";
                } else {
                  buttonClass += "border-transparent bg-secondary/30 opacity-50";
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(index)}
                    disabled={hasAnsweredCurrent}
                    className={buttonClass}
                  >
                    <div className="flex items-center justify-between">
                      <span>{option}</span>
                      {showCorrect && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
                      {showWrong && <XCircle className="w-5 h-5 text-destructive" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {hasAnsweredCurrent && (
              <motion.div 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-end"
              >
                <Button onClick={handleNext} size="lg" className="rounded-full px-8">
                  {isLastQuestion ? 'Finalizar Avaliação' : 'Próxima Questão'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </div>
        )}
      </div>

      {/* Print Modal */}
      {showPrintModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm print:hidden">
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-background p-6 rounded-3xl shadow-xl max-w-md w-full border border-border mx-4"
          >
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold">Opções de Impressão</h3>
              <Button variant="ghost" size="icon" onClick={() => setShowPrintModal(false)}>
                <X className="w-5 h-5" />
              </Button>
            </div>

            <div className="mb-6 p-4 rounded-2xl bg-primary/5 border border-primary/10">
              <p className="text-sm font-medium mb-3 text-primary">O que você deseja imprimir?</p>
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => setIncludeAnswersInPrint(false)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!includeAnswersInPrint ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                >
                  Apenas a Prova
                </button>
                <button
                  onClick={() => setIncludeAnswersInPrint(true)}
                  className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${includeAnswersInPrint ? 'bg-primary text-white shadow-md' : 'bg-secondary text-muted-foreground hover:bg-secondary/80'}`}
                >
                  Prova + Gabarito
                </button>
              </div>
            </div>
            
            <div className="space-y-4">
              <div className="grid grid-cols-1 gap-3">
                <button 
                  onClick={() => openInNewTab('full')}
                  className="w-full flex flex-col items-start p-4 rounded-2xl border-2 border-primary/20 bg-primary/5 hover:bg-primary/10 hover:border-primary/40 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-lg text-primary">Folha Inteira</span>
                    <Printer className="w-5 h-5 text-primary group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">Impressão padrão (1 por página).</span>
                </button>
                
                <button 
                  onClick={() => openInNewTab('half')}
                  className="w-full flex flex-col items-start p-4 rounded-2xl border-2 border-emerald-500/20 bg-emerald-500/5 hover:bg-emerald-500/10 hover:border-emerald-500/40 transition-all text-left group"
                >
                  <div className="flex items-center justify-between w-full">
                    <span className="font-bold text-lg text-emerald-600">Duas Partes (Economia)</span>
                    <Printer className="w-5 h-5 text-emerald-600 group-hover:scale-110 transition-transform" />
                  </div>
                  <span className="text-sm text-muted-foreground mt-1">Imprime 2 cópias por página para economizar papel.</span>
                </button>
              </div>

              <div className="pt-4 border-t border-border">
                <p className="text-xs text-center text-muted-foreground">
                  A janela de impressão do seu navegador será aberta.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      )}

      {/* Print View - Only visible during print */}
      {printMode !== 'none' && (
        <div className="hidden print:block bg-white text-black w-full">
          {printMode === 'full' ? (
            <PrintContent assessment={assessment} grade={grade} compact={false} showAnswers={showAnswerKey} />
          ) : (
            <div className="flex w-full gap-8">
              <div className="w-1/2 border-r border-dashed border-gray-400 pr-4">
                <PrintContent assessment={assessment} grade={grade} compact={true} showAnswers={showAnswerKey} />
              </div>
              <div className="w-1/2 pl-4">
                <PrintContent assessment={assessment} grade={grade} compact={true} showAnswers={showAnswerKey} />
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
