import React from "react";
import { Text } from "react-native";
import { GREEN_30, GREEN_20, RED_30, RED_20, YELLOW_20, DARK } from "./colors";

export enum CheckStatus {
  CHECKING = "CHECKING",
  VALID = "VALID",
  INVALID = "INVALID"
}

type StatusProps<T extends {}> = T & {
  color: string;
  backgroundColor: string;
};

type OverrideStatusProps<T extends {}> = { [status in CheckStatus]: T };

/**
 * Returns the status props for the given checkStatus.
 *
 * @param checkStatus CheckStatus
 */
export function getStatusProps(checkStatus: CheckStatus): StatusProps<{}>;

/**
 * Returns the status props for the given checkStatus.
 * The overrides allows for
 * 1. additional props or
 * 2. overriding the default status props for the corresponding checkStatus.
 *
 * @param checkStatus CheckStatus
 * @param overrides Object with CheckStatus as keys and overriding props as values
 */
export function getStatusProps<T extends {}>(
  checkStatus: CheckStatus,
  overrides: OverrideStatusProps<T>
): StatusProps<T>;
export function getStatusProps<T extends {}>(
  checkStatus: CheckStatus,
  overrides?: OverrideStatusProps<T>
): StatusProps<T | {}> {
  switch (checkStatus) {
    case CheckStatus.VALID:
      return {
        color: GREEN_30,
        backgroundColor: GREEN_20,
        ...overrides?.[CheckStatus.VALID]
      };
    case CheckStatus.INVALID:
      return {
        color: RED_30,
        backgroundColor: RED_20,
        ...overrides?.[CheckStatus.INVALID]
      };
    case CheckStatus.CHECKING:
    default:
      return {
        color: DARK,
        backgroundColor: YELLOW_20,
        ...overrides?.[CheckStatus.CHECKING]
      };
  }
}

export const CHECK_MESSAGES = {
  TAMPERED_CHECK: {
    [CheckStatus.CHECKING]: (
      <Text>Checking if document has been tampered with</Text>
    ),
    [CheckStatus.INVALID]: <Text>Document has been tampered with</Text>,
    [CheckStatus.VALID]: <Text>Document has not been tampered with</Text>
  },
  ISSUED_CHECK: {
    [CheckStatus.CHECKING]: <Text>Checking if document was issued</Text>,
    [CheckStatus.INVALID]: <Text>Document was not issued</Text>,
    [CheckStatus.VALID]: <Text>Document was issued</Text>
  },
  REVOKED_CHECK: {
    [CheckStatus.CHECKING]: <Text>Checking if document has been revoked</Text>,
    [CheckStatus.INVALID]: <Text>Document has been revoked</Text>,
    [CheckStatus.VALID]: <Text>Document has not been revoked</Text>
  },
  ISSUER_CHECK: {
    [CheckStatus.CHECKING]: <Text>{"Checking the document's issuer"}</Text>,
    [CheckStatus.INVALID]: (
      <Text>{"Could not identity the document's issuer"}</Text>
    ),
    [CheckStatus.VALID]: <Text>{"Document's issuer has been identified"}</Text>
  }
};
