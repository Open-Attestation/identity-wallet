import React, { FunctionComponent, useState, useRef, useEffect } from "react";
import {
  Animated,
  LayoutChangeEvent,
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from "react-native";
import { BottomSheet } from "../Layout/BottomSheet";
import { Document, SignedDocument, getData } from "@govtechsg/open-attestation";
import QRIcon from "../../../assets/icons/qr.svg";
import { ValidityBanner } from "../Validity/ValidityBanner";
import { useDocumentVerifier } from "../../common/hooks/useDocumentVerifier";
import { CheckStatus } from "../Validity";
import { QrCode } from "./QrCode";
import { useQrGenerator } from "../../common/hooks/useQrGenerator";
import { color, spacing, typeScale, shadow } from "../../common/styles";

interface BackgroundOverlay {
  isVisible: boolean;
}
const BackgroundOverlay: FunctionComponent<BackgroundOverlay> = ({
  isVisible
}) => {
  const [fadeAnim] = useState(new Animated.Value(0));

  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: isVisible ? 0.8 : 0,
      duration: 300
    }).start();
  }, [fadeAnim, isVisible]);

  return (
    <Animated.View
      pointerEvents={isVisible ? "auto" : "none"}
      style={{
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: color("grey", 100),
        opacity: fadeAnim
      }}
    />
  );
};

const styles = StyleSheet.create({
  header: {
    paddingBottom: spacing(4)
  },
  validityBannerWrapper: {
    marginHorizontal: -spacing(3),
    marginBottom: spacing(2.5)
  },
  keyInformationWrapper: {
    flexDirection: "row"
  },
  heading: {
    fontSize: typeScale(-2),
    marginBottom: spacing(1),
    color: color("grey", 40)
  },
  issuerName: {
    fontSize: typeScale(-1),
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: color("grey", 40)
  },
  shareButton: {
    backgroundColor: "white",
    minWidth: spacing(6),
    padding: spacing(1),
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    borderColor: color("grey", 15),
    borderWidth: 1,
    ...shadow(1),
    overflow: "visible"
  },
  shareButtonLabel: {
    marginTop: spacing(0.5),
    fontSize: typeScale(-4),
    fontWeight: "bold",
    textTransform: "uppercase",
    letterSpacing: 0.5,
    color: color("grey", 40)
  },
  qrCodeBg: {
    height: "50%",
    backgroundColor: color("blue", 50),
    marginHorizontal: -spacing(3),
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  qrCodeWrapper: {
    backgroundColor: color("grey", 0),
    borderRadius: 4,
    ...shadow(1)
  },
  contentWrapper: {
    marginHorizontal: -spacing(3),
    marginBottom: -spacing(3),
    paddingTop: spacing(5),
    paddingBottom: spacing(8),
    paddingHorizontal: spacing(3),
    backgroundColor: color("blue", 50),
    flexGrow: 1
  },
  divider: {
    marginTop: spacing(1),
    marginBottom: spacing(4),
    backgroundColor: color("grey", 30),
    height: 1
  }
});

export interface DocumentDetailsSheet {
  document: Document;
  onVerification: (checkStatus: CheckStatus) => void;
}

export const DocumentDetailsSheet: FunctionComponent<DocumentDetailsSheet> = ({
  document,
  onVerification
}) => {
  const [isBackgroundOverlayVisible, setIsBackgroundOverlayVisible] = useState(
    false
  );
  const { qrCode, qrCodeLoading, generateQr } = useQrGenerator();
  const [headerHeight, setHeaderHeight] = useState(0);
  const hasHeaderHeightBeenSet = useRef(false);
  const onHeaderLayout = (event: LayoutChangeEvent): void => {
    if (!hasHeaderHeightBeenSet.current) {
      const { height } = event.nativeEvent.layout;
      setHeaderHeight(height + 56);
      hasHeaderHeightBeenSet.current = true;
    }
  };

  const { issuers } = getData(document);
  const issuedBy =
    issuers[0]?.identityProof?.location || "Issuer's identity not found";

  const {
    tamperedCheck,
    issuedCheck,
    revokedCheck,
    issuerCheck,
    overallValidity
  } = useDocumentVerifier(document as SignedDocument);

  useEffect(() => {
    if (overallValidity !== CheckStatus.CHECKING) {
      onVerification(overallValidity);
    }
  }, [onVerification, overallValidity]);

  return (
    <>
      <BackgroundOverlay isVisible={isBackgroundOverlayVisible} />
      <BottomSheet
        snapPoints={[headerHeight, "86%"]}
        onOpenStart={() => {
          generateQr(document)();
          setIsBackgroundOverlayVisible(true);
        }}
        onCloseEnd={() => setIsBackgroundOverlayVisible(false)}
      >
        {openSheet => (
          <View testID="document-details" style={{ minHeight: "100%" }}>
            <View onLayout={onHeaderLayout} style={styles.header}>
              <View style={styles.validityBannerWrapper}>
                <ValidityBanner
                  tamperedCheck={tamperedCheck}
                  issuedCheck={issuedCheck}
                  revokedCheck={revokedCheck}
                  issuerCheck={issuerCheck}
                  overallValidity={overallValidity}
                />
              </View>
              <View style={styles.keyInformationWrapper}>
                <View style={{ flex: 1 }}>
                  <Text style={styles.heading}>Issued by</Text>
                  <Text style={styles.issuerName}>{issuedBy}</Text>
                </View>
                <TouchableOpacity
                  onPress={openSheet}
                  style={styles.shareButton}
                >
                  <View
                    accessible
                    style={{ justifyContent: "center", alignItems: "center" }}
                  >
                    <QRIcon width={24} height={24} />
                    <Text style={styles.shareButtonLabel}>Share</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ position: "relative" }}>
              <View style={styles.qrCodeBg} />
              <View style={styles.qrCodeWrapper}>
                <QrCode qrCode={qrCode} qrCodeLoading={qrCodeLoading} />
              </View>
            </View>
            <View style={styles.contentWrapper}>
              {(qrCodeLoading || qrCode !== "") && (
                <View style={styles.divider} />
              )}
              <Text style={{ color: color("grey", 0) }}>Metadata</Text>
            </View>
          </View>
        )}
      </BottomSheet>
    </>
  );
};
