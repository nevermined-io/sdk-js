#!/bin/bash

# Wait for contracts migration and extract Keeper artifacts

RETRY_COUNT=0
COMMAND_STATUS=1

printf '\n\e[33m◯ Waiting for contracts to be generated...\e[0m\n'

mkdir -p artifacts

until [ $COMMAND_STATUS -eq 0 ] || [ $RETRY_COUNT -eq 120 ]; do
  cat ~/.nevermined/nevermined-contracts/artifacts/ready
  COMMAND_STATUS=$?
  if [ $COMMAND_STATUS -eq 0 ]; then
    break
  fi
  sleep 5
  let RETRY_COUNT=RETRY_COUNT+1
done

printf '\e[32m✔ Found new contract artifacts.\e[0m\n'

rm -rf ./artifacts/

if [ $COMMAND_STATUS -ne 0 ]; then
  echo "Waited for more than two minutes, but nevermined contracts have not been migrated yet. Did you run an Ethereum RPC client and the migration script?"
  exit 1
fi

cp -r ~/.nevermined/nevermined-contracts/artifacts/. node_modules/@nevermined-io/contracts/artifacts/

printf '\e[32m✔ Copied new contract artifacts.\e[0m\n'
