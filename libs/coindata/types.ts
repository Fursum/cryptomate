export type CoinData_T = {
  rank?: number | null;
  symbol?: string | null;
  name?: string | null;
  maxSupply?: number | null;
  logo?: string | null;
  links?: Array<{ name: string | null; url: string | null }> | null;
};

export type CoinData_Attributes =
  | "rank"
  | "symbol"
  | "name"
  | "maxSupply"
  | "logo"
  | "links";
