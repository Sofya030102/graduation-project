@echo off

echo ������ ����� ���� � 䠩�� genesis.json � ������ ENTER
echo ��� ��⠢�� ���� ����� � ������ ENTER ��� ���祭�� �� 㬮�砭�� (C:\JS\voting\genesis.json)

set /P new_gen=""

echo ������ ����� ���� � ࠡ�祩 ����� geth � ������ ENTER
echo ��� ��⠢�� ���� ����� � ������ ENTER ��� ���祭�� �� 㬮�砭�� (C:\JS\voting\accounts)

set /P new_path=""

IF NOT "%new_gen%" == "" (
	IF NOT "%new_path%" == "" (
		geth init "%new_gen%" --datadir "%new_path%"
		geth --rpc -rpcaddr "127.0.0.1" --rpcapi "net, web3, personal, miner, eth, admin" --networkid 15 --datadir "%new_path%" --allow-insecure-unlock --rpccorsdomain "*" console
	} ELSE (
		geth init "%new_gen%" --datadir "C:\JS\voting\accounts"
		geth --rpc -rpcaddr "127.0.0.1" --rpcapi "net, web3, personal, miner, eth, admin" --networkid 15 --datadir "C:\JS\voting\accounts" --allow-insecure-unlock --rpccorsdomain "*" console
	)
) ELSE (
	IF NOT "%new_path%" == "" (
		geth init "C:\JS\voting\genesis.json" --datadir "%new_path%"
		geth --rpc -rpcaddr "127.0.0.1" --rpcapi "net, web3, personal, miner, eth, admin" --networkid 15 --datadir "%new_path%" --allow-insecure-unlock --rpccorsdomain "*" console
	) ELSE (
		geth init "C:\JS\voting\genesis.json" --datadir "C:\JS\voting\accounts"
		geth --rpc -rpcaddr "127.0.0.1" --rpcapi "net, web3, personal, miner, eth, admin" --networkid 15 --datadir "C:\JS\voting\accounts" --allow-insecure-unlock --rpccorsdomain "*" console
	)
)

pause

::geth init "C:\JS\voting\genesis.json" --datadir "C:\JS\voting\accounts" 
::���樠������ ������� ����� � ����� � �஥�⮬

::geth -rpc -rpcaddr "127.0.0.1" -rpcapi "net, web3, miner, eth, admin, personal" -networkid 15 --datadir "C:\JS\voting\accounts" console
::-allow-insecure-unlock -rpccorsdomain "*" console
