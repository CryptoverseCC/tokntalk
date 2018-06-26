#!/bin/sh

cd /cryptoverse

# echo 'REACT_APP_INTERFACE_VALUE="https://cryptoverse.co"> .env.local

yarn build
yarn firebase deploy -P default --token $FIREBASE_TOKEN --message "$CI_COMMIT_ID"
