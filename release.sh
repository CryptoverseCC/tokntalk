#!/bin/sh

cd /cryptoverse

yarn firebase deploy -P default --token $FIREBASE_TOKEN --message "$CI_COMMIT_ID" --debug
