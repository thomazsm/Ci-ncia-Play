export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface Assessment {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export interface GradeAssessments {
  bimester1: Assessment;
  bimester2: Assessment;
}
