export enum CheckStatus {
  CHECKING = "CHECKING",
  VALID = "VALID",
  INVALID = "INVALID",
  ERROR = "ERROR"
}

export const CHECK_MESSAGES = {
  TAMPERED_CHECK: {
    [CheckStatus.CHECKING]: {
      message: "Checking if document has been tampered with"
    },
    [CheckStatus.INVALID]: { message: "Document has been tampered with" },
    [CheckStatus.VALID]: { message: "Document has not been tampered with" },
    [CheckStatus.ERROR]: {
      message: "Error when checking if document has been tampered with"
    }
  },
  ISSUED_CHECK: {
    [CheckStatus.CHECKING]: { message: "Checking if document was issued" },
    [CheckStatus.INVALID]: { message: "Document was not issued" },
    [CheckStatus.VALID]: { message: "Document was issued" },
    [CheckStatus.ERROR]: {
      message: "Error when checking if document was issued"
    }
  },
  REVOKED_CHECK: {
    [CheckStatus.CHECKING]: {
      message: "Checking if document has been revoked"
    },
    [CheckStatus.INVALID]: { message: "Document has been revoked" },
    [CheckStatus.VALID]: { message: "Document has not been revoked" },
    [CheckStatus.ERROR]: {
      message: "Error when checking if document has been revoked"
    }
  },
  ISSUER_CHECK: {
    [CheckStatus.CHECKING]: { message: "Checking the document's issuer" },
    [CheckStatus.INVALID]: {
      message: "Could not identity the document's issuer"
    },
    [CheckStatus.VALID]: { message: "Document's issuer has been identified" },
    [CheckStatus.ERROR]: {
      message: "Error when checking the document's issuer"
    }
  }
};
