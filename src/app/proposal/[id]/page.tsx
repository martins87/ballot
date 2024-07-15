"use client";

import { FC, useEffect, useState } from "react";
import Link from "next/link";
import { BrowserProvider, Contract } from "ethers";

import { useContract } from "@/store/contract";
import { contractAddress, contractABI } from "../../../contract/config";
import VotingButton from "@/components/VotingButton";

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
    defaultProviderInstance.viewProposal(params.id).then((proposal: any) => {
      let proposalValues = Object.values(proposal);
      let title = String(proposalValues[0]);
      let description = String(proposalValues[1]);
      let votesFor = Number(proposalValues[2]);
      let votesAgainst = Number(proposalValues[3]);
      let endTime = Number(proposalValues[4]);

      setTitle(title);
      setDescription(description);
      setVotesFor(votesFor);
      setVotesAgainst(votesAgainst);
      setEndTime(endTime);
    });
  }, []);

  const handleConnect = async () => {
    if (window.ethereum != undefined) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
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
            <VotingButton
              disabled={!(metamaskProviderInstance || votingInstance)}
              onClick={() => handleVote(true)}
            />
          </div>
          <div className="flex items-center gap-2">
            <p className="font-bold">Votes against:</p>
            <p>{votesAgainst}</p>
            <VotingButton
              disabled={!(metamaskProviderInstance || votingInstance)}
              onClick={() => handleVote(false)}
            />
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
