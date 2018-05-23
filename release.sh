#!/bin/sh

cd /cryptopurr

echo 'REACT_APP_INTERFACE_VALUE="https://cryptopurr.co"
REACT_APP_BASENAME=""' > .env.local

yarn build
yarn firebase deploy -P default --token $FIREBASE_TOKEN --message "$CI_COMMIT_ID"
