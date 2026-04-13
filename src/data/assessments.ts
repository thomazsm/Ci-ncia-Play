import { Question, Assessment, GradeAssessments } from './types';
import { grade6Assessments } from './assessments/6-ano';
import { grade7Assessments } from './assessments/7-ano';
import { grade8Assessments } from './assessments/8-ano';
import { grade9Assessments } from './assessments/9-ano';

export * from './types';

// Helper para criar avaliações padrão rapidamente
const createDefaultAssessment = (bimester: 1 | 2, gradeName: string): Assessment => ({
  id: `bim${bimester}`,
  title: `Avaliação do ${bimester}º Bimestre`,
  description: `Teste seus conhecimentos sobre os assuntos estudados no ${bimester}º bimestre do ${gradeName}.`,
  questions: [
    {
      id: 'q1',
      text: 'Qual é o principal objetivo do método científico?',
      options: [
        'Provar que todas as teorias antigas estão erradas.',
        'Criar fatos inquestionáveis.',
        'Investigar fenômenos, adquirir novos conhecimentos ou corrigir e integrar conhecimentos prévios.',
        'Apenas realizar experimentos em laboratórios.'
      ],
      correctAnswer: 2,
      explanation: 'O método científico é um processo sistemático de investigação usado para entender a natureza e adquirir conhecimento.'
    },
    {
      id: 'q2',
      text: 'Sobre a matéria, é correto afirmar que:',
      options: [
        'É tudo aquilo que tem massa e ocupa lugar no espaço.',
        'É apenas o que podemos ver e tocar.',
        'A energia é um tipo de matéria.',
        'O vácuo é considerado matéria.'
      ],
      correctAnswer: 0,
      explanation: 'Matéria é definida na física como qualquer coisa que tenha massa e volume (ocupe espaço).'
    }
  ]
});

export const assessmentsData: Record<string, GradeAssessments> = {
  'ef6': grade6Assessments,
  'ef7': grade7Assessments,
  'ef8': grade8Assessments,
  'ef9': grade9Assessments,
};

// Preencher as séries que não têm dados específicos com dados padrão
['em1', 'em2', 'em3'].forEach(gradeId => {
  assessmentsData[gradeId] = {
    bimester1: createDefaultAssessment(1, gradeId),
    bimester2: createDefaultAssessment(2, gradeId)
  };
});

