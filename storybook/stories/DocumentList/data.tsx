import { DocumentItem } from "../../../src/components/DocumentList/DocumentList";
import { VerifierTypes } from "../../../src/types";

export const documents: DocumentItem[] = [
  {
    id: "#1",
    title: "UAPL",
    isVerified: true,
    verifierType: VerifierTypes.OpenAttestation
  },
  {
    id: "#2",
    title:
      "Bachelor of Biological Sciences with a Second Major in Medicinal Chemistry and Pharmacology",
    isVerified: false,
    verifierType: VerifierTypes.OpenAttestation
  },
  {
    id: "#3",
    title: "Bachelor of Computer Science",
    isVerified: false,
    lastVerification: Date.now(),
    verifierType: VerifierTypes.OpenAttestation
  }
];
