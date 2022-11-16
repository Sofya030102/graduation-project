const abi = [
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			}
		],
		"name": "Auditor_change",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "avatar_path",
				"type": "string"
			}
		],
		"name": "Change_avatar",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "Change_email",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			}
		],
		"name": "Change_name",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			}
		],
		"name": "EC_change",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "EC_check",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			}
		],
		"name": "EC_voting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Get_voting_info",
		"outputs": [
			{
				"internalType": "string",
				"name": "voters_type",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "agreements",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "disagreements",
				"type": "uint256"
			},
			{
				"internalType": "address[]",
				"name": "logins",
				"type": "address[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "Get_voting_results",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "agreements",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "disagreements",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "bool",
				"name": "open_voting",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "ec_voting",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isDone",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isChecked",
				"type": "bool"
			}
		],
		"name": "Get_votings",
		"outputs": [
			{
				"internalType": "string[]",
				"name": "questions_list",
				"type": "string[]"
			},
			{
				"internalType": "uint256[]",
				"name": "id_list",
				"type": "uint256[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "open_voting",
				"type": "bool"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			}
		],
		"name": "New_voting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			},
			{
				"internalType": "string",
				"name": "name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "Registration",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			}
		],
		"name": "Role_change",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "voting",
				"type": "uint256"
			},
			{
				"internalType": "bool",
				"name": "choice",
				"type": "bool"
			}
		],
		"name": "Vote",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"name": "Votings",
		"outputs": [
			{
				"internalType": "string",
				"name": "question",
				"type": "string"
			},
			{
				"internalType": "bool",
				"name": "open_voting",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "ec_voting",
				"type": "bool"
			},
			{
				"internalType": "bool",
				"name": "isCommited",
				"type": "bool"
			},
			{
				"internalType": "string",
				"name": "voters",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "time",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "agreements_quantity",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "disagreements_quantity",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "commitVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "id",
				"type": "uint256"
			}
		],
		"name": "deleteVoting",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			}
		],
		"name": "getUser",
		"outputs": [
			{
				"components": [
					{
						"internalType": "string",
						"name": "name",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "login",
						"type": "address"
					},
					{
						"internalType": "string",
						"name": "email",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "role",
						"type": "string"
					},
					{
						"internalType": "bool",
						"name": "EC",
						"type": "bool"
					},
					{
						"internalType": "bool",
						"name": "auditor",
						"type": "bool"
					},
					{
						"internalType": "string",
						"name": "avatar_path",
						"type": "string"
					}
				],
				"internalType": "struct Voting_system.User",
				"name": "user",
				"type": "tuple"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "string",
				"name": "email",
				"type": "string"
			}
		],
		"name": "getUserAddress",
		"outputs": [
			{
				"internalType": "address",
				"name": "login",
				"type": "address"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

export default abi;