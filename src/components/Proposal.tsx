import { FC, useEffect, useState } from "react";

import { useContract } from "@/store/contract";

type ProposalProps = {
  id: number;
};

const Proposal: FC<ProposalProps> = ({ id }) => {
  const instance = useContract((state) => state.contract.instance);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [votesFor, setVotesFor] = useState<number>(0);
  const [votesAgainst, setVotesAgainst] = useState<number>(0);
  const [endTime, setEndTime] = useState<number>(0);

  useEffect(() => {
    const getProposal = async () => {
      let proposal = await instance.viewProposal(id);
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

  return (
    <div className="w-[60%] flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border border-slate-400">
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
  );
};

export default Proposal;
