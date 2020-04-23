#!/bin/sh

count=0
echo "Starting..."
while sleep 0.1;
	do
		curl --data '{"method":"personal_unlockAccount","params":["0x00Bd138aBD70e2F00903268F3Db08f2D25677C9e","node0",null],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 &> /dev/null;
		curl --data '{"method":"personal_unlockAccount","params":["0x068Ed00cF0441e4829D9784fCBe7b9e26D4BD8d0","secret",null],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 &> /dev/null;
        curl --data '{"method":"personal_unlockAccount","params":["0xA99D43d86A0758d5632313b8fA3972B6088A21BB","secret",null],"id":1,"jsonrpc":"2.0"}' -H "Content-Type: application/json" -X POST localhost:8545 &> /dev/null;
		count=$((count+1));
		echo -en "\e[1A";
		echo -e "\e[0K\rRequest ${count}";
done


