// https://github.com/prisma/prisma-engines/blob/bc00f40f17ea2d691411eb7b529ca1529b68dc80/libs/user-facing-errors/src/query_engine.rs

type DatabaseConstraintFields_ = readonly string[];
type DatabaseContraintIndex_ = string;
type DatabaseConstraint = DatabaseConstraintFields_ | DatabaseContraintIndex_;

export type PrismaError = { readonly meta: object; readonly clientVersion: string } & PrismaErrors;

type PrismaErrors =
  | InputValueTooLong
  | RecordNotFound
  | UniqueKeyViolation
  | ForeignKeyViolation
  | ConstraintViolation
  | StoredValueIsInvalid
  | TypeMismatch
  | TypeMismatchInvalidCustomType
  | QueryParsingFailed
  | QueryValidationFailed
  | RawQueryFailed
  | NullConstraintViolation
  | MissingRequiredValue
  | MissingRequiredArgument
  | RelationViolation
  | RelatedRecordNotFound
  | InterpretationError
  | RecordsNotConnected
  | ConnectedRecordsNotFound
  | InputError
  | ValueOutOfRange
  | TableDoesNotExist
  | ColumnDoesNotExist;

/**
 * @description The provided value for the column is too long for the column's type. Column: {column_name}
 */
type InputValueTooLong = {
  readonly code: 'P2000';
  readonly column_name: string;
};

/**
 * @description The record searched for in the where condition (`{model_name}.{argument_name} = {argument_value}`) does not exist
 */
type RecordNotFound = {
  readonly code: 'P2001';
  /**
   * @description Model name from Prisma schema
   */
  readonly model_name: string;

  /**
   * @description Argument name from a supported query on a Prisma schema model
   */
  readonly argument_name: string;

  /**
   * @description Concrete value provided for an argument on a query. Should be peeked/truncated if too long
   */
  /**
   * @description to display in the error message
   */
  readonly argument_value: string;
};

/**
 * @description Unique constraint failed on the {constraint}
 */
type UniqueKeyViolation = {
  readonly code: 'P2002';
  /**
   * @description Field name from one model from Prisma schema
   */
  readonly constraint: DatabaseConstraint;
};

/**
 * @description Foreign key constraint failed on the field: `{field_name}`
 */
type ForeignKeyViolation = {
  readonly code: 'P2003';
  /**
   * @description Field name from one model from Prisma schema
   */
  readonly field_name: string;
};

/**
 * @description A constraint failed on the database: `{database_error}`
 */
type ConstraintViolation = {
  readonly code: 'P2004';
  /**
   * @description Database error returned by the underlying data source
   */
  readonly database_error: string;
};

/**
 * @description The value `{field_value}` stored in the database for the field `{field_name}` is invalid for the field's type
 */
type StoredValueIsInvalid = {
  readonly code: 'P2005';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   */
  readonly field_value: string;

  /**
   * @description Field name from one model from Prisma schema
   */
  readonly field_name: string;
};

/**
 * @description The provided value `{field_value}` for `{model_name}` field `{field_name}` is not valid
 */
type TypeMismatch = {
  readonly code: 'P2006';
  /**
   * @description Concrete value provided for a field on a model in Prisma schema. Should be peeked/truncated if too long to display in the error message
   */
  readonly field_value: string;

  /**
   * @description Model name from Prisma schema
   */
  readonly model_name: string;

  /**
   * @description Field name from one model from Prisma schema
   */
  readonly field_name: string;
};

/**
 * @description Data validation error `{database_error}`
 */
type TypeMismatchInvalidCustomType = {
  readonly code: 'P2007';
  /**
   * @description Database error returned by the underlying data source
   */
  readonly database_error: string;
};

/**
 * @description Failed to parse the query `{query_parsing_error}` at `{query_position}`
 */
type QueryParsingFailed = {
  readonly code: 'P2008';
  /**
   * @description Error(s) encountered when trying to parse a query in the query engine
   */
  readonly query_parsing_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   */
  readonly query_position: string;
};

/**
 * @description Failed to validate the query: `{query_validation_error}` at `{query_position}`
 */
type QueryValidationFailed = {
  readonly code: 'P2009';
  /**
   * @description Error(s) encountered when trying to validate a query in the query engine
   */
  readonly query_validation_error: string;

  /**
   * @description Location of the incorrect parsing, validation in a query. Represented by tuple or object with (line, character)
   */
  readonly query_position: string;
};

/**
 * @description Raw query failed. Code: `{code}`. Message: `{message}`
 */
type RawQueryFailed = {
  readonly code: 'P2010';
  readonly message: string;
};

/**
 * @description Null constraint violation on the {constraint}
 */
type NullConstraintViolation = {
  readonly code: 'P2011';
  readonly constraint: DatabaseConstraint;
};

/**
 * @description Missing a required value at `{path}`
 */
type MissingRequiredValue = {
  readonly code: 'P2012';
  readonly path: string;
};

/**
 * @description Missing the required argument `{argument_name}` for field `{field_name}` on `{object_name}`.
 */
type MissingRequiredArgument = {
  readonly code: 'P2013';
  readonly argument_name: string;
  readonly field_name: string;
  readonly object_name: string;
};

/**
 * @description The change you are trying to make would violate the required relation '{relation_name}' between the `{model_a_name}` and `{model_b_name}` models.
 */
type RelationViolation = {
  readonly code: 'P2014';
  readonly relation_name: string;
  readonly model_a_name: string;
  readonly model_b_name: string;
};

/**
 * @description A related record could not be found. {details}
 */
type RelatedRecordNotFound = {
  readonly code: 'P2015';
  readonly details: string;
};

/**
 * @description Query interpretation error. {details}
 */
type InterpretationError = {
  readonly code: 'P2016';
  readonly details: string;
};

/**
 * @description The records for relation `{relation_name}` between the `{parent_name}` and `{child_name}` models are not connected.
 */
type RecordsNotConnected = {
  readonly code: 'P2017';
  readonly relation_name: string;
  readonly parent_name: string;
  readonly child_name: string;
};

/**
 * @description The required connected records were not found. {details}
 */
type ConnectedRecordsNotFound = {
  readonly code: 'P2018';
  readonly details: string;
};

/**
 * @description Input error. {details}
 */
type InputError = {
  readonly code: 'P2019';
  readonly details: string;
};

/**
 * @description Value out of range for the type. {details}
 */
type ValueOutOfRange = {
  readonly code: 'P2020';
  readonly details: string;
};

/**
 * @description The table `{table}` does not exist in the current database.
 */
type TableDoesNotExist = {
  readonly code: 'P2021';
  readonly table: string;
};

/**
 * @description The column `{column}` does not exist in the current database.
 */
type ColumnDoesNotExist = {
  readonly code: 'P2022';
  readonly column: string;
};
