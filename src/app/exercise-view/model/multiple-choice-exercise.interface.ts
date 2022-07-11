import { Exercise } from 'src/model/exercise.interface';


export interface MultipleChoiceExercise extends Exercise{
    question: string;
    codeSnippet: string;
    allowMultiple: boolean;
    answers: MultipleChoiceAnswer[];
}

export interface MultipleChoiceAnswer {
    message: string;
    isCorrect: boolean;
    isChecked?: boolean;
}