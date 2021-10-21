type ActionType = "sell" | "buy";
type ValueType = "$" | "local";
type ConditionType = "and" | "or" | "single";
type ComparisonType = "<" | "<=" | "=" | ">=" | ">";
type DataType = "price" | "marketValue" | "TBD" ;

type Comparison = [DataType, ComparisonType, ValueType, Number]
type Action = [ActionType, ValueType, Number];

type Conditions = {
    action: Action | undefined,
    conditionType: ConditionType,
    conditions: Conditions | undefined,
    comparison: Comparison | undefined
}

export default Conditions;