import { Problem } from './problem.interface';

export interface ParsonsProblem extends Problem {
  filename: string;
  totalLines: number;
  lines: ParsonsLine[];
}


export interface ParsonsLine {
  currentLineNumber: number;
   // eslint-disable-next-line @typescript-eslint/naming-convention
  line_number: number;
   // eslint-disable-next-line @typescript-eslint/naming-convention
  line_content: string;
}
