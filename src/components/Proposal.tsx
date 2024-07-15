import { FC } from "react";

type ProposalProps = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endTime: number;
};

const Proposal: FC<ProposalProps> = ({
  id,
  title,
  description,
  votesFor,
  votesAgainst,
  endTime,
}) => {
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
