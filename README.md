[![CircleCI](https://circleci.com/gh/Open-Attestation/identity-wallet.svg?style=svg)](https://circleci.com/gh/Open-Attestation/identity-wallet)

[![Quality Gate Status](https://sonarcloud.io/api/project_badges/measure?project=Open-Attestation_identity-wallet&metric=alert_status)](https://sonarcloud.io/dashboard?id=Open-Attestation_identity-wallet) [![Bugs](https://sonarcloud.io/api/project_badges/measure?project=Open-Attestation_identity-wallet&metric=bugs)](https://sonarcloud.io/dashboard?id=Open-Attestation_identity-wallet) [![Code Smells](https://sonarcloud.io/api/project_badges/measure?project=Open-Attestation_identity-wallet&metric=code_smells)](https://sonarcloud.io/dashboard?id=Open-Attestation_identity-wallet) [![Coverage](https://sonarcloud.io/api/project_badges/measure?project=Open-Attestation_identity-wallet&metric=coverage)](https://sonarcloud.io/dashboard?id=Open-Attestation_identity-wallet)

# Identity Wallet

This is a wallet built to hold OpenAttestation-compatible documents

## Resources on Open Attestation

https://openattestation.com/docs/getting-started
https://github.com/Open-Attestation/open-attestation

## Deployed Application

![Expo QR](https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=exp://exp.host/@dlt/identitywallet)

## Deployed Storybook

![Expo QR](https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=exp://exp.host/@dlt/identitywallet?release-channel=storybook-default)

# Development

### Install required dependencies

```
npm i
```

### To run storybook

```
npm run storybook
```

### Test

```
npm run test
```

# To run application

```
npm start
```

Expo CLI starts Metro Bundler, which is an HTTP server that serves it to the Expo app. It also pops up Expo Dev Tools, a control panel for developing your app, in your default web browser.

### To open the app in your phone:

- Download “Expo” from the App Store/Play Store
- Scan the QR code that is shown on the Expo Dev Tools page
- For more details: https://docs.expo.io/versions/v34.0.0/workflow/up-and-running/

### Open documents

To find files to view and store using the wallet, head to https://gallery.openattestation.com/

# Related Resources

### Figma:

Wireframe (App - Figma Mirror): https://www.figma.com/file/jhkqMeLYVuR72CfdgsmIO2/OA-Mobile-Wallet?node-id=42%3A781

### Schema:

https://github.com/Open-Attestation/open-attestation/blob/master/src/schema/2.0/schema.json
