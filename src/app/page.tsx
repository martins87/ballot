"use client";

import { useState } from "react";

import { ethers } from "ethers";
import { contractAddress, contractABI } from "../contract/config";

export default function Home() {
  const [instance, setInstance] = useState<any>(null);
  const [proposals, setProposals] = useState<number>(-1);
  const [showProposal, setShowProposal] = useState<boolean>(false);
  const [proposalId, setProposalId] = useState("");

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [votesFor, setVotesFor] = useState<number>(0);
  const [votesAgainst, setVotesAgainst] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  const handleClick = async () => {
    if (window.ethereum !== "undefined") {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const ballot = new ethers.Contract(contractAddress, contractABI, signer);
    setInstance(ballot);

    let proposalCount = await ballot.proposalCount();
    setProposals(Number(proposalCount));
    console.log("proposalCount", Number(proposalCount));
  };

  const handleQuery = async () => {
    let proposal = await instance.viewProposal(proposalId);

    let proposalValues = Object.values(proposal);
    let proposalTitle = String(proposalValues[0]);
    let proposalDescription = String(proposalValues[1]);
    let proposalVotesFor = Number(proposalValues[2]);
    let proposalVotesAgainst = Number(proposalValues[3]);
    let proposalEndTime = Number(proposalValues[4]);

    setTitle(proposalTitle);
    setDescription(proposalDescription);
    setVotesFor(proposalVotesFor);
    setVotesAgainst(proposalVotesAgainst);
    setEndTime(proposalEndTime);
    setShowProposal(true);
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <p># of proposals: {proposals}</p>
      <button
        className="flex bg-slate-300 p-2 border-zinc-800 rounded-sm"
        onClick={handleClick}
      >
        Update
      </button>

      {/* Proposal query by id */}
      <div className="w-[60%] flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border">
        <input
          className="p-2 focus:outline-none border rounded-lg focus:ring-1 focus:ring-gray-500"
          type="text"
          value={proposalId}
          onChange={(e) => setProposalId(e.target.value)}
          placeholder="Enter the proposal id..."
          min="0"
        />
        <button
          className="py-1 px-4 bg-black text-white w-fit rounded-md hover:text-gray-400"
          onClick={handleQuery}
        >
          Query
        </button>
      </div>

      {showProposal && (
        <div className="w-[60%] flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border">
          <div className="flex gap-2">
            <p className="font-bold">Proposal title:</p>
            <p>{title}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Proposal description:</p>
            <p>{description}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Votes for:</p>
            <p>{votesFor}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Votes against:</p>
            <p>{votesAgainst}</p>
          </div>
          <div className="flex gap-2">
            <p className="font-bold">Voting end time:</p>
            <p>{endTime}</p>
          </div>
        </div>
      )}
    </div>
  );
}
