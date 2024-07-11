"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { BrowserProvider, Contract } from "ethers";
import { contractAddress, contractABI } from "../contract/config";
import { useContract } from "../store/contract";
import Proposal from "@/components/Proposal";

export default function Home() {
  const router = useRouter();
  const [connected, setConnected] = useState<boolean>(false);
  const { setInstance, setAddress, setAbi } = useContract();
  const [ids, setIds] = useState([]);

  const [proposals, setProposals] = useState<number>(-1);

  const handleConnect = async () => {
    try {
      if (window.ethereum !== "undefined") {
        const accounts = await ethereum.request({
          method: "eth_requestAccounts",
        });
      }

      const provider = new BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const ballot = new Contract(contractAddress, contractABI, signer);
      setInstance(ballot);

      let proposalCount = await ballot.proposalCount();
      proposalCount = Number(proposalCount);
      setProposals(Number(proposalCount));
      for (let i = 0; i < proposalCount; i++) {
        setIds((state) => [...state, i]);
      }

      setConnected(true);
    } catch (error) {
      console.error(error);
      console.log("Failed to connect");
    }
  };

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      {!connected && (
        <button
          className="flex bg-slate-300 p-2 border-zinc-800 rounded-sm"
          onClick={handleConnect}
        >
          Connect wallet
        </button>
      )}

      {connected && (
        <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
          <p># of proposals: {proposals}</p>
          <button
            className="py-1 px-4 bg-black text-white w-fit rounded-lg hover:text-gray-400"
            onClick={() => router.push("/create")}
          >
            Create proposal
          </button>
          {ids.map((id) => (
            <Proposal key={id} id={id} />
          ))}
        </div>
      )}
    </div>
  );
}
