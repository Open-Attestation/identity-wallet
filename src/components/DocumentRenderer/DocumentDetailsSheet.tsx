import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import { LayoutChangeEvent, View, Text } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { BottomSheet } from "../Layout/BottomSheet";
import { Document, SignedDocument } from "@govtechsg/open-attestation";
import QRIcon from "../../../assets/icons/qr.svg";
import { ValidityBanner, CheckStatus } from "./ValidityBanner";
import { checkValidity } from "../../services/DocumentVerifier";

interface DocumentDetailsSheet {
  document: Document;
}

export const DocumentDetailsSheet: FunctionComponent<DocumentDetailsSheet> = ({
  document
}) => {
  const [headerHeight, setHeaderHeight] = useState(0);
  const hasHeaderHeightBeenSet = useRef(false);
  const onHeaderLayout = (event: LayoutChangeEvent): void => {
    if (!hasHeaderHeightBeenSet.current) {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height + 56);
      hasHeaderHeightBeenSet.current = true;
    }
  };

  const { name } = document.data.issuers[0];
  const issuerName = name.split(":")[2];

  const [tamperedCheck, setTamperedCheck] = useState<CheckStatus>("checking");
  const [issuedCheck, setIssuedCheck] = useState<CheckStatus>("checking");
  const [revokedCheck, setRevokedCheck] = useState<CheckStatus>("checking");
  const [issuerCheck, setIssuerCheck] = useState<CheckStatus>("checking");

  useEffect(() => {
    const [verifyHashIssuedRevoked, verifyIdentity] = checkValidity(
      document as SignedDocument
    );

    verifyHashIssuedRevoked.then(v => {
      setTamperedCheck(v.hash.checksumMatch ? "valid" : "invalid");
      setIssuedCheck(v.issued.issuedOnAll ? "valid" : "invalid");
      setRevokedCheck(v.revoked.revokedOnAny ? "invalid" : "valid");
    });

    verifyIdentity.then(v => {
      setIssuerCheck(v.identifiedOnAll ? "valid" : "invalid");
    });
  }, [document]);

  return (
    <BottomSheet snapPoints={[headerHeight, "83%"]}>
      {openSheet => (
        <View testID="document-details">
          <View
            onLayout={onHeaderLayout}
            style={{
              paddingBottom: 32
            }}
          >
            <View style={{ marginHorizontal: -24, marginBottom: 20 }}>
              <ValidityBanner
                tamperedCheck={tamperedCheck}
                issuedCheck={issuedCheck}
                revokedCheck={revokedCheck}
                issuerCheck={issuerCheck}
              />
            </View>
            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={{ fontSize: 12, marginBottom: 8 }}>Issued by</Text>
                <Text
                  style={{
                    fontSize: 14,
                    fontWeight: "bold",
                    textTransform: "uppercase",
                    letterSpacing: 0.5
                  }}
                >
                  {issuerName}
                </Text>
              </View>
              <RectButton
                onPress={openSheet}
                style={{
                  backgroundColor: "#F2F2F2",
                  height: 48,
                  width: 48,
                  borderRadius: 8,
                  justifyContent: "center",
                  alignItems: "center"
                }}
              >
                <View accessible>
                  <QRIcon width={24} height={24} />
                </View>
              </RectButton>
            </View>
          </View>
          <View
            style={{
              width: "100%",
              aspectRatio: 1,
              backgroundColor: "#f2f2f2",
              marginBottom: 24
            }}
          />
        </View>
      )}
    </BottomSheet>
  );
};
