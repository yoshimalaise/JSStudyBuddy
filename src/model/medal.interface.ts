export interface Medal {
  type: MedalType;
  name: string;
  current: number;
  next: number;
}

export enum MedalType {
  none = 'none',
  bronze = 'bronze',
  silver = 'silver',
  gold = 'gold',
}
