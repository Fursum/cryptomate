import { Symbol_T, CoinData_T, CoinData_Attributes } from "./types";
import Data from "./data.json";

// TODO Add tests later
class CoinData {
  data: Array<CoinData_T>;
  constructor() {
    this.data = Data;
  }

  getAll() {
    return this.data;
  }

  getCoin(symbol: Symbol_T, attribute?: CoinData_Attributes) {
    let coin = this.data.find(
      (c: CoinData_T) => c.symbol!.toLowerCase() == symbol.toLowerCase()
    );

    if (typeof coin === "undefined") return null;

    if (typeof attribute === "undefined") return coin;

    return coin[attribute];
  }
}

export default new CoinData();
