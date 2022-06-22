export interface CodeObject {
  type: CodeObjectType;
  leitner_box: number;
}

export enum CodeObjectType {
  function = 'function'
}
