import { Exercise } from 'src/model/exercise.interface';

export interface FlowChartSnippetMappingErcise extends Exercise {
  originalSnippet: string;
  mutations: string[];
}
