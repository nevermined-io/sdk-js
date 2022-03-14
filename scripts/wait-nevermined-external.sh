#!/bin/bash

# Wait for contracts migration and extract Keeper artifacts

printf '\n\e[33m◯ Waiting for contracts to be generated...\e[0m\n'

while [ ! -f "$HOME/.nevermined/nevermined-contracts/artifacts/ready" ]; do
  sleep 2
done

printf '\e[32m✔ Found new contract artifacts.\e[0m\n'

rm $HOME/.nevermined/nevermined-contracts/artifacts/*.kovan.json
mmv $HOME/.nevermined/nevermined-contracts/artifacts/\*.spree.json $HOME/.nevermined/nevermined-contracts/artifacts/\#1.kovan.json
cp -rf $HOME/.nevermined/nevermined-contracts/artifacts/* node_modules/@nevermined-io/contracts/artifacts/

printf '\e[32m✔ Copied new contract artifacts.\e[0m\n'
