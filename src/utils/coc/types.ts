export type CocCommand = {
  type: "ccb";
  target: number;
};

export type CocResult = {
  command: string;

  roll: number;

  target: number;

  success: boolean;

  rank:
    | "critical"
    | "extreme"
    | "hard"
    | "success"
    | "failure"
    | "fumble";
};