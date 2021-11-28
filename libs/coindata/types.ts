export type CoinData_T = {
  rank?: number;
  symbol?: string;
  name?: string;
  maxSupply?: number;
  logo?: string;
  links?: Array<{ name: string; url: string }>;
};

export type CoinData_Attributes =
  | "rank"
  | "symbol"
  | "name"
  | "maxSupply"
  | "logo"
  | "links";
