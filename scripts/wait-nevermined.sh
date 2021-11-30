#!/bin/bash

# Wait for contracts migration and extract Keeper artifacts

RETRY_COUNT=0
COMMAND_STATUS=1

printf '\n\e[33m◯ Waiting for contracts to be generated...\e[0m\n'

until [ $COMMAND_STATUS -eq 0 ] || [ $RETRY_COUNT -eq 120 ]; do
  nevermined_keeper_docker_id=$(docker container ls | grep nevermined-keeper-node | awk '{print $1}')
  docker cp ${nevermined_keeper_docker_id}:/nevermined-contracts/artifacts/ready node_modules/@nevermined-io/contracts/artifacts/
  COMMAND_STATUS=$?
  sleep 5
  let RETRY_COUNT=RETRY_COUNT+1
done


if [ $COMMAND_STATUS -ne 0 ]; then
  echo "Waited for more than two minutes, but nevermined contracts have not been migrated yet. Did you run an Ethereum RPC client and the migration script?"
  exit 1
fi

printf '\e[32m✔ Found new contract artifacts.\e[0m\n'

docker cp ${nevermined_keeper_docker_id}:/nevermined-contracts/artifacts/. node_modules/@nevermined-io/contracts/artifacts/

printf '\e[32m✔ Copied new contract artifacts.\e[0m\n'

for i in node_modules/@nevermined-io/contracts/artifacts/*.spree.json; do
  echo $i
  cp $i ${i%.spree.json}.development.json
done

cp node_modules/@nevermined-io/contracts/artifacts/EpochLibrary.mainnet.json node_modules/@nevermined-io/contracts/artifacts/EpochLibrary.development.json
cp node_modules/@nevermined-io/contracts/artifacts/DIDRegistryLibrary.mainnet.json node_modules/@nevermined-io/contracts/artifacts/DIDRegistryLibrary.development.json

ls node_modules/@nevermined-io/contracts/artifacts