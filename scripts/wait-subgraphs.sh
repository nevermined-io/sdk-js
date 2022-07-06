NETWORK=$1

RETRY_COUNT=0
HTTP_CODE=0
GRAPH_NODE_URL=${GRAPH_NODE_URL:-http://localhost:9000}

# get contract version
VERSION=$(jq ".version" node_modules/@nevermined-io/contracts/artifacts/DIDRegistry.$NETWORK.json)
# remove dots and quotes
VERSION=$(echo ${VERSION//./} | tr -d '"')

SUBGRAPH=whitelistingcondition
SUBGRAPH_URL=$GRAPH_NODE_URL/subgraphs/name/nevermined-io/development$NETWORK$VERSION$SUBGRAPH
SUBGRAPH_CAN_QUERY=false

COMMAND=(curl -g -X POST \
    -H "Content-Type:application/json" \
    -d '{"query":"query{ownershipTransferreds{id}}"}')

until [ $HTTP_CODE -eq 200 ] || [ $RETRY_COUNT -eq 90 ]; do
  HTTP_CODE=$(${COMMAND[@]} -s -o /dev/null -w ''%{http_code}'' $SUBGRAPH_URL)
  if [ $HTTP_CODE -eq 200 ]; then
    break
  fi
  printf "Waiting for the subgraph ($SUBGRAPH) to be running at $SUBGRAPH_URL\n"
  sleep 10
  let RETRY_COUNT=RETRY_COUNT+1
done

until [ "$SUBGRAPH_CAN_QUERY" = true ] || [ $RETRY_COUNT -eq 90 ]; do
  SUBGRAPH_CAN_QUERY=$(${COMMAND[@]} $SUBGRAPH_URL | jq 'has("data")')
  if [ "$SUBGRAPH_CAN_QUERY" = true ]; then
    break
  fi
  printf "Waiting for the subgraph ($SUBGRAPH) to be running at $SUBGRAPH_URL\n"
  sleep 10
  let RETRY_COUNT=RETRY_COUNT+1
done

if [ "$SUBGRAPH_CAN_QUERY" != true ]; then
  echo "Waited for more than 15 minutes, but the graph node api is still not running"
  exit 1
fi