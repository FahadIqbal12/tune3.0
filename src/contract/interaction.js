export const contract_address = '0xf6D2eF28562B28fF1177Fd2403e8a106234c8267';
export const abi = [
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_song_id",
				"type": "uint256"
			},
			{
				"internalType": "string",
				"name": "_song_name",
				"type": "string"
			},
			{
				"internalType": "string",
				"name": "_ipfs_url",
				"type": "string"
			},
			{
				"internalType": "uint256",
				"name": "_price",
				"type": "uint256"
			}
		],
		"name": "addSong",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "_song_id",
				"type": "uint256"
			}
		],
		"name": "buySong",
		"outputs": [],
		"stateMutability": "payable",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getArtistSong",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "artist_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "song_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "song_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfs_url",
						"type": "string"
					}
				],
				"internalType": "struct Tune3.artist[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "getPurchases",
		"outputs": [
			{
				"components": [
					{
						"internalType": "address",
						"name": "buyer_address",
						"type": "address"
					},
					{
						"internalType": "uint256",
						"name": "song_id",
						"type": "uint256"
					},
					{
						"internalType": "string",
						"name": "song_name",
						"type": "string"
					},
					{
						"internalType": "string",
						"name": "ipfs_url",
						"type": "string"
					},
					{
						"internalType": "address",
						"name": "artist_address",
						"type": "address"
					}
				],
				"internalType": "struct Tune3.buyer[]",
				"name": "",
				"type": "tuple[]"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
]