import React, { ReactElement, useEffect } from "react";
import { render } from "@testing-library/react-native";
import { VerifiedLabel } from "./VerifiedLabel";

jest.mock("@expo/vector-icons", () => ({ Feather: "Feather Icons" }));

describe("VerifiedLabel", () => {
  it("should show VERIFIED when isVerified is true", async () => {
    const { queryByText } = render(
      <VerifiedLabel isVerified={true} lastVerification={1} />
    );
    expect(queryByText("VERIFIED")).not.toBeNull();
  });

  it("should show INVALID when isVerified is false and lastVerification is set", async () => {
    const { queryByText } = render(
      <VerifiedLabel isVerified={false} lastVerification={1} />
    );
    expect(queryByText("INVALID")).not.toBeNull();
  });

  it("should show UNKNOWN when isVerified is false and lastVerification is falsey", async () => {
    const { queryByText } = render(<VerifiedLabel isVerified={false} />);
    expect(queryByText("UNKNOWN")).not.toBeNull();
  });
});
