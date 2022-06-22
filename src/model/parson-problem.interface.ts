import { CodeObject } from './problem.interface';

export interface FunctionCodeObject extends CodeObject {
  filename: string;
  totalLines: number;
  lines: FunctionLine[];
}


export interface FunctionLine {
   // eslint-disable-next-line @typescript-eslint/naming-convention
  line_number: number;
   // eslint-disable-next-line @typescript-eslint/naming-convention
  line_content: string;
}
