"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { BrowserProvider, Contract } from "ethers";

import { useContract } from "@/store/contract";
import { contractAddress, contractABI } from "../../../contract/config";

type ProposalPageProps = {
  params: any;
};

const ProposalPage: FC<ProposalPageProps> = ({ params }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [votesFor, setVotesFor] = useState<number>(0);
  const [votesAgainst, setVotesAgainst] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const defaultProviderInstance = useContract(
    (state) => state.contract.defaultProviderInstance
  );
  const { metamaskProviderInstance, setMetamaskProviderInstance } =
    useContract();
  const [votingInstance, setVotingInstance] = useState<any>(null);
  const [account, setAccount] = useState<string>("");

  useEffect(() => {
    console.log("metamaskProviderInstance", metamaskProviderInstance);
    const getProposal = async () => {
      let proposal = await defaultProviderInstance.viewProposal(params.id);
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
    };

    getProposal();
  }, []);

  const handleConnect = async () => {
    if (window.ethereum != undefined) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("accounts", accounts);
    }

    const metamaskProvider = new BrowserProvider(window.ethereum);
    const signer = await metamaskProvider.getSigner();
    const metamaskInstance = new Contract(contractAddress, contractABI, signer);
    setMetamaskProviderInstance(metamaskInstance);
    setVotingInstance(metamaskInstance);
  };

  const handleVote = (support: boolean) => {
    votingInstance.vote(params.id, support).then((res: any) => {
      console.log("result", res);
      // TODO handle user feedback
    });
  };

  const shortAddress = () => {
    return (
      account.substring(0, 7) + "..." + account.substring(account.length - 5)
    );
  };

  return (
    <div className="w-screen h-screen flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-[60%]">
        <button
          className="py-1 px-4 bg-slate-100 w-fit rounded-lg border border-slate-300 text-sm hover:bg-slate-200"
          onClick={handleConnect}
        >
          {metamaskProviderInstance || votingInstance
            ? shortAddress()
            : "Connect wallet"}
        </button>
        <p className="text-sm">
          Supports writing to the following contract function information after
          connecting to a wallet
        </p>
        <div className="w-full flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border border-slate-400">
          <div className="flex items-center gap-2">
            <p className="font-bold">Proposal title:</p>
            <p>{title}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Proposal description:</p>
            <p>{description}</p>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Votes for:</p>
            <p>{votesFor}</p>
            <button
              className="py-1 px-4 bg-black text-white w-fit rounded-lg hover:text-gray-400"
              onClick={() => handleVote(true)}
            >
              Vote
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Votes against:</p>
            <p>{votesAgainst}</p>
            <button
              className="py-1 px-4 bg-black text-white w-fit rounded-lg hover:text-gray-400"
              onClick={() => handleVote(false)}
            >
              Vote
            </button>
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Voting end time:</p>
            <p>{endTime}</p>
          </div>
        </div>
        <Link href="/">Back</Link>
      </div>
    </div>
  );
};

export default ProposalPage;
