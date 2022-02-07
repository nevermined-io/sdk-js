RETRY_COUNT=0
HTTP_CODE=0
GRAPH_NODE_URL=${GRAPH_NODE_URL:-http://localhost:9000}
SUBGRAPH=WhitelistingCondition
SUBGRAPH_URL=$GRAPH_NODE_URL/subgraphs/name/neverminedio/$SUBGRAPH

COMMAND=(curl -g -X POST \
    -H "Content-Type:application/json" \
    -d '{"query":"query{_meta{block{hash}}}"}')

until [ $HTTP_CODE -eq 200 ] || [ $RETRY_COUNT -eq 90 ]; do
  HTTP_CODE=$(${COMMAND[@]} -s -o /dev/null -w ''%{http_code}'' $SUBGRAPH_URL)
  if [ $HTTP_CODE -eq 200 ]; then
    break
  fi
  printf "Waiting for the subgraph ($SUBGRAPH) to be running at $SUBGRAPH_URL\n"
  sleep 10
  let RETRY_COUNT=RETRY_COUNT+1
done

if [ $HTTP_CODE -ne 200 ]; then
  echo "Waited for more than 15 minutes, but the graph node api is still not running"
  exit 1
fi