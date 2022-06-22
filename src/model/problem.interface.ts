export interface CodeObject {
  type: CodeObjectType;
  leitnerBox: number;
}

export enum CodeObjectType {
  function = 'function'
}
