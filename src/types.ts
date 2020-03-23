import {
  NavigationParams,
  NavigationScreenProp,
  NavigationRoute
} from "react-navigation";
import { RxDocument, RxCollection, RxDatabase } from "rxdb";
import { v2, WrappedDocument } from "@govtechsg/open-attestation";

export type Document = v2.OpenAttestationDocument;
export type OAWrappedDocument = WrappedDocument<Document>;

export interface NavigationProps {
  navigation: NavigationScreenProp<NavigationRoute, NavigationParams>;
}

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
