import ComparisonGroup from "./actionComponents/comparisonGroup";

export type ActionType = "sell" | "buy";
export type CurrencyType = "$" | "local";
export type ConditionType = "and" | "or" | "single";
export type ComparisonType = "<" | "<=" | "=" | ">=" | ">";
export type DataType = "price" | "marketValue" | "TBD";

export type Comparison = [DataType, ComparisonType, CurrencyType, Number];
export type Action = {
  action: ActionType;
  currency: CurrencyType;
  value: Number;
};

export type Conditions = {
  conditionType: ConditionType;
  conditions: Conditions[] | undefined;
  comparison: Comparison | undefined;
};

export type AutomateData_T = {
  id: string;
  comparisonGroups: ComparisonGroup_T[];
  conditionBetweenGroups: ConditionType;
  actionData: ActionData_T;
};

export type ComparisonGroup_T = {
  id: string;
  type: ConditionType;
  comparisonLines: ComparisonLineData_T[];
};

export type ComparisonLineData_T = {
  id:string;
  dataType: DataType;
  comparisonType: ComparisonType;
  comparisonValue: string; //number input
};

export type ActionData_T = {
  actionType: ActionType;
  actionValue: string; //number input
  currencyType: CurrencyType;
};

export type RemoveSelector = "action" | "group" | "line"