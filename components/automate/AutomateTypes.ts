export type ActionType = "sell" | "buy";
export type CurrencyType = "$" | "local";
export type ConditionType = "and" | "or" | "single";
export type ComparisonType = "<" | "<=" | "=" | ">=" | ">";
export type DataType = "price" | "marketValue" | "TBD";

export type RemoveSelector = "action" | "group" | "line"

export type Comparison = [DataType, ComparisonType, CurrencyType, Number];

export type ComparisonLineData_T = {
  id:string;
  dataType: DataType;
  comparisonType: ComparisonType;
  comparisonValue: string; //number input
};

export type ActionLineData_T = {
  actionType: ActionType;
  actionValue: string; //number input
  currencyType: CurrencyType;
};

export type ComparisonGroup_T = {
  id: string;
  type: ConditionType;
  comparisonLines: ComparisonLineData_T[];
};

export type Order_T = {
  id: string;
  comparisonGroups: ComparisonGroup_T[];
  conditionBetweenGroups: ConditionType;
  actionData: ActionLineData_T;
};

export type Strategy_T = {

  id: string;
  title: string;
  creationDate: Date;
  lastUpdate: Date;

  totalBuyCap: number;
  orderList: Order_T[];

}
