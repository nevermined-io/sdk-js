#!/usr/bin/env bash
# Usage: ./download-artifacts.sh <version> <network> [<tag>]
set -e

VERSION=$1
NETWORK=$2
TAG=$3

if [[ -z "$VERSION" ]]; then
  echo "ERROR: Asset not provided. Usage: ./download-artifacts.sh <version> <network> [<tag>]. Version format as vx.y.z"
  exit 1
fi
if [[ -z "$NETWORK" ]]; then
  echo "ERROR: Network not provided. Usage: ./download-artifacts.sh <version> <network> [<tag>]"
  exit 1
fi
if [ -z "$TAG" ]; then
  TAG="common"
fi

REPO_URL=http://artifacts-nevermined-rocks.s3.amazonaws.com
declare -A NETWORKS_MAP
NETWORKS_MAP=( ["mainnet"]="1" ["rinkeby"]="4" ["kovan"]="42" ["matic"]="137" ["mumbai"]="80001" ["celo-alfajores"]="44787" ["celo"]="42220" ["aurora"]="1313161554" ["aurora-testnet"]="1313161555" )

SCRIPT_DIR=$(cd -- "$( dirname -- "${BASH_SOURCE[0]}" )" &> /dev/null && pwd)
UNPACK_DIR="$SCRIPT_DIR/../node_modules/@nevermined-io/contracts/artifacts"
mkdir -p $UNPACK_DIR

# Return numerical chainId given a network name (considering networks names from our hardhat config)
function get_network_id_from_name {
  local network_id
  network_id="${NETWORKS_MAP[$NETWORK]}"
  if [ -z "$network_id" ]; then
    echo "ERROR: NetworkID for network ${NETWORK} not found. Please review the mapping in the scripts"
    echo exit 1
  fi
  echo "$network_id"
}

NETWORK_ID=$(get_network_id_from_name)
DOWNLOAD_URL=$REPO_URL/$NETWORK_ID/$TAG/contracts_$VERSION.tar.gz
curl -s -L -o /tmp/nvm_temp_artifacts.tar.gz $DOWNLOAD_URL
tar xzf /tmp/nvm_temp_artifacts.tar.gz --directory $UNPACK_DIR
rm -f /tmp/nvm_temp_artifacts.tar.gz
exit 0

