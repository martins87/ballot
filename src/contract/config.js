export const contractAddress = "0xF30068791c8A43204E6f5B3896AfF6F2748C29dF";

export const contractABI = [
  {
    inputs: [
      {
        internalType: "string",
        name: "_title",
        type: "string",
      },
      {
        internalType: "string",
        name: "_description",
        type: "string",
      },
    ],
    name: "createProposal",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "_support",
        type: "bool",
      },
    ],
    name: "vote",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "proposalCount",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "_proposalId",
        type: "uint256",
      },
    ],
    name: "viewProposal",
    outputs: [
      {
        internalType: "string",
        name: "title",
        type: "string",
      },
      {
        internalType: "string",
        name: "description",
        type: "string",
      },
      {
        internalType: "int256",
        name: "votesFor",
        type: "int256",
      },
      {
        internalType: "int256",
        name: "votesAgainst",
        type: "int256",
      },
      {
        internalType: "uint256",
        name: "endtime",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
