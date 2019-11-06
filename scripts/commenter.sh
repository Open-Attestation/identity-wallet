#!/bin/bash
PULL_REQUEST_ID=$(echo $CI_PULL_REQUEST | cut -c 58-)
PUBLISH_TEXT="Published to https://exp.host/@workpasssg/sg-workpass?release-channel=${PULL_REQUEST_ID}"
STORYBOOK_PUBLISH_TEXT="Published to https://exp.host/@workpasssg/sg-workpass?release-channel=storybook-${PULL_REQUEST_ID}"
QR_CODE="https://api.qrserver.com/v1/create-qr-code/?size=250x250&data=exp://exp.host/@workpasssg/sg-workpass?release-channel=${PULL_REQUEST_ID}"

curl -X POST \
  https://${GITHUB_ACCESS_TOKEN_COMMENTER}@api.github.com/repos/Open-Attestation/identity-wallet/issues/${PULL_REQUEST_ID}/comments \
  -H 'Content-Type: application/json' \
  -d '{ "body": "![Expo QR]('"$QR_CODE"')\n'"$STORYBOOK_PUBLISH_TEXT"'" }'

curl -X POST \
  https://${GITHUB_ACCESS_TOKEN_COMMENTER}@api.github.com/repos/Open-Attestation/identity-wallet/issues/${PULL_REQUEST_ID}/comments \
  -H 'Content-Type: application/json' \
  -d '{ "body": "![Expo QR]('"$QR_CODE"')\n'"$PUBLISH_TEXT"'" }'
