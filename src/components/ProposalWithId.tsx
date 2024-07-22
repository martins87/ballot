"use client";

import { FC, useEffect, useState } from "react";
import { Contract, getDefaultProvider } from "ethers";

import { useContract } from "@/store/contract";
import { contractABI, contractAddress } from "@/contract/config";
import mockedProposals from "../utils/mocked-proposals";

type ProposalWithIdProps = {
  id: number;
};

const ProposalWithId: FC<ProposalWithIdProps> = ({ id }) => {
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [votesFor, setVotesFor] = useState<number>(0);
  const [votesAgainst, setVotesAgainst] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);
  const defaultProviderInstance = useContract(
    (state) => state.contract.defaultProviderInstance
  );

  useEffect(() => {
    let mockedProposal = mockedProposals.filter(
      (p) => p.id == id.toString()
    )[0];
    setTitle(mockedProposal.title);
    setDescription(mockedProposal.description);
    setVotesFor(mockedProposal.votesFor);
    setVotesAgainst(mockedProposal.votesAgainst);
    setEndTime(mockedProposal.endTime);

    // let defaultProvider = getDefaultProvider(
    //   `https://polygon-amoy.infura.io/v3/88651f31c40747fe99468a85a1abcc26`
    // );
    // let ballot = new Contract(contractAddress, contractABI, defaultProvider);
    // ballot.viewProposal(id).then((proposal: any) => {
    //   let proposalValues = Object.values(proposal);
    //   let title = String(proposalValues[0]);
    //   let description = String(proposalValues[1]);
    //   let votesFor = Number(proposalValues[2]);
    //   let votesAgainst = Number(proposalValues[3]);
    //   let endTime = Number(proposalValues[4]);

    //   setTitle(title);
    //   setDescription(description);
    //   setVotesFor(votesFor);
    //   setVotesAgainst(votesAgainst);
    //   setEndTime(endTime);
    // });
  }, []);

  return (
    // <div className="w-full flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border border-slate-300 hover:cursor-pointer hover:border-slate-400 hover:shadow-lg">
    <div className="w-full h-[250px] flex flex-col justify-between p-4 gap-2 bg-gray-100 rounded-2xl hover:cursor-pointer hover:shadow-lg">
      <div className="flex flex-col gap-2 text-2xl">
        <div className="flex items-center gap-2">
          <p className="text-gray-400 font-normal">#{id}</p>
          <p className="flex flex-1 font-bold">{title}</p>
        </div>
        <p className="text-base">{description}</p>
      </div>
      <div className="flex justify-center gap-2">
        <span className="flex items-center justify-center w-10 h-10 bg-green-500 text-white rounded-lg">
          {votesFor}
        </span>
        <span className="flex items-center justify-center w-10 h-10 bg-red-500 text-white rounded-lg">
          {votesAgainst}
        </span>
      </div>
      <div className="flex gap-2 text-sm">
        <p className="text-gray-400">Voting end time:</p>
        <p>{endTime}</p>
      </div>
    </div>
  );
};

export default ProposalWithId;
