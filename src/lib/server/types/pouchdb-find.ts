export interface IConditionOperators {
  $lt?: any;
  $gt?: any;
  $lte?: any;
  $gte?: any;
  $eq?: any;
  $ne?: any;
  $exists?: boolean;
  $type?: 'null' | 'boolean' | 'number' | 'string' | 'array' | 'object';
  $in?: any[];
  $nin?: any[];
  $size?: number;
  $mod?: [number, number];
  $regex?: string;
  $all?: any[];
  $elemMatch?: IConditionOperators;
}

export interface ICombinationOperators {
  $and?: ISelector[];
  $or?: ISelector[];
  $not?: ISelector;
  $nor?: ISelector[];
}

export interface ISelector extends ICombinationOperators {
  [field: string]: ISelector | ISelector[] | IConditionOperators | any;

  _id?: IConditionOperators;
}
