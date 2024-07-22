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
    // <div className="w-full flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border border-slate-300 hover:cursor-pointer hover:border-slate-400 hover:shadow-lg">
    //   <div className="">
    //     <p>#{id}</p>
    //   </div>
    //   <div className="flex gap-2">
    //     <p className="font-bold">Proposal title:</p>
    //     <p>{title}</p>
    //   </div>
    //   <div className="flex gap-2">
    //     <p className="font-bold">Proposal description:</p>
    //     <p>{description}</p>
    //   </div>
    //   <div className="flex gap-2">
    //     <p className="font-bold">Votes for:</p>
    //     <p>{votesFor}</p>
    //   </div>
    //   <div className="flex gap-2">
    //     <p className="font-bold">Votes against:</p>
    //     <p>{votesAgainst}</p>
    //   </div>
    //   <div className="flex gap-2">
    //     <p className="font-bold">Voting end time:</p>
    //     <p>{endTime}</p>
    //   </div>
    // </div>
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

export default Proposal;
