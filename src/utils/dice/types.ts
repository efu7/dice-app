export type DiceTerm = {
  sign: number;
  type: "dice";
  count: number;
  sides: number;
};

export type NumberTerm = {
  type: "number";
  value: number;
};

export type Term = DiceTerm | NumberTerm;

export type DiceCommand = {
  terms: Term[];
  target?: number;
};

export type RollDetail = {
  count: number;
  sides: number;
  rolls: number[];
  total: number;
};

export type DiceResult = {
  command: string;

  details: RollDetail[];

  modifier: number;

  total: number;

  target?: number;
  success?: boolean;
  critical?: boolean;
  fumble?: boolean;
};