#!/bin/sh

cd /cryptopurr

echo 'REACT_APP_INTERFACE_VALUE="https://cryptopurr.co"
REACT_APP_BASENAME="/"' > .env.local

yarn build
yarn firebase deploy -P default --token $FIREBASE_TOKEN --message \"Release $CI_COMMIT_MESSAGE $CI_COMMIT_ID\"
