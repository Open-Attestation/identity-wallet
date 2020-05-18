// import {
//   NavigationParams,
//   NavigationScreenProp,
//   NavigationRoute
// } from "react-navigation";
// import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp, StackScreenProps } from "@react-navigation/stack";
import { BottomTabScreenProps } from "@react-navigation/bottom-tabs";
import { RxDocument, RxCollection, RxDatabase } from "rxdb";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";
import { VerificationStatuses } from "./hooks/useDocumentVerifier";
export type Document = v2.OpenAttestationDocument;
export type OAWrappedDocument = WrappedDocument<Document>;

export type RootParamList = {
  InitialisationScreen: { q: string | undefined };
  DocumentListScreen: undefined;
  LocalDocumentScreen: { id: string; verifierType: VerifierTypes };
  ValidityCheckScreen: { document: OAWrappedDocument; savable?: boolean };
  ScannedDocumentScreen: {
    document: OAWrappedDocument;
    savable?: boolean;
    statuses: VerificationStatuses;
    issuerName: string;
    verifierType: VerifierTypes;
  };
  QrScannerScreen: undefined;
  SettingsScreen: undefined;
  DocumentListStackScreen: { screen: string; params?: object };
  QrScannerStackScreen: { screen: string; params?: object };
};

export interface NavigationProps {
  navigation: StackNavigationProp<RootParamList>;
}

export type InitialisationScreenProps = BottomTabScreenProps<
  RootParamList,
  "InitialisationScreen"
>;

export type LocalDocumentScreenProps = StackScreenProps<
  RootParamList,
  "LocalDocumentScreen"
>;

export type ScannedDocumentScreenProps = StackScreenProps<
  RootParamList,
  "ScannedDocumentScreen"
>;

export type ValidityCheckScreenProps = StackScreenProps<
  RootParamList,
  "ValidityCheckScreen"
>;

// export interface InitialisationNavigationProps {
//   navigation: StackNavigationProp<RootStackParamList>;
//   route: RouteProp<RootStackParamList, "InitialisationScreen">;
// }

// export interface NavigationProps {
//   navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
// }

export type DocumentProperties = {
  id: string;
  created: number;
  document: OAWrappedDocument;
  verified?: number;
  isVerified?: boolean;
  qrCode?: {
    url: string;
    expiry?: number;
  };
  verifierType?: VerifierTypes;
  issuerName?: string;
};

export type DocumentObject = RxDocument<DocumentProperties>;
export type DatabaseCollections = {
  documents: RxCollection<DocumentProperties>;
};
export type Database = RxDatabase<DatabaseCollections>;

export enum NetworkTypes {
  ropsten = "ropsten",
  mainnet = "mainnet"
}

export enum VerifierTypes {
  OpenAttestation = "OpenAttestation",
  OpenCerts = "OpenCerts"
}
