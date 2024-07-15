import { FC } from "react";
import { twMerge } from "tailwind-merge";

type VotingButtonProps = {
  disabled: boolean;
  onClick: () => void;
};

const VotingButton: FC<VotingButtonProps> = ({ disabled, onClick }) => {
  return (
    <button
      className={twMerge(
        "py-1 px-4 bg-black text-white text-sm w-fit rounded-lg hover:text-gray-400",
        disabled
          ? "bg-slate-200 text-slate-400 hover:cursor-not-allowed hover:text-slate-400"
          : ""
      )}
      onClick={onClick}
      disabled={disabled}
    >
      Vote
    </button>
  );
};

export default VotingButton;
