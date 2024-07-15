"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Contract, getDefaultProvider } from "ethers";

import { contractAddress, contractABI } from "../contract/config";
import { useContract } from "../store/contract";
import Proposal from "@/components/Proposal";

type Proposal = {
  id: number;
  title: string;
  description: string;
  votesFor: number;
  votesAgainst: number;
  endTime: number;
};

export default function Home() {
  const router = useRouter();
  const { _, setDefaultProviderInstance } = useContract();
  const [count, setCount] = useState<number>(-1);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [filled, setFilled] = useState<boolean>(false);

  useEffect(() => {
    const getProposals = async (isArrFilled: boolean) => {
      if (!isArrFilled) {
        let defaultProvider = getDefaultProvider(
          `https://polygon-amoy.infura.io/v3/88651f31c40747fe99468a85a1abcc26`
        );
        let ballot = new Contract(
          contractAddress,
          contractABI,
          defaultProvider
        );
        setDefaultProviderInstance(ballot);

        ballot.proposalCount().then((c) => {
          setCount(Number(c));

          let proposalsArr: Proposal[] = [];
          for (let id = 0; id < Number(c); id++) {
            ballot.viewProposal(id).then((proposal: any) => {
              let proposalValues = Object.values(proposal);
              let title = String(proposalValues[0]);
              let description = String(proposalValues[1]);
              let votesFor = Number(proposalValues[2]);
              let votesAgainst = Number(proposalValues[3]);
              let endTime = Number(proposalValues[4]);
              let p: Proposal = {
                id,
                title,
                description,
                votesFor,
                votesAgainst,
                endTime,
              };
              setProposals((state) => [...state, p]);
              proposalsArr.push(p);
            });
          }
        });
        setFilled(true);
      }
    };

    getProposals(filled);
  }, []);

  const handleClick = (id: number) => {
    router.push(`/proposal/${id}`);
  };

  const handleCreate = () => {
    router.push("/create");
  };

  return (
    <div className="w-screen flex items-center">
      <div className="w-full flex flex-col gap-4 items-center justify-center">
        <button
          className="py-1 px-4 bg-black text-white w-fit rounded-lg hover:text-gray-400"
          onClick={handleCreate}
        >
          Create proposal
        </button>

        {proposals.map(
          ({ id, title, description, votesFor, votesAgainst, endTime }) => (
            <div
              className="w-full flex items-center justify-center hover:cursor-pointer"
              key={id}
              onClick={() => handleClick(id)}
            >
              <Proposal
                id={id}
                title={title}
                description={description}
                votesFor={votesFor}
                votesAgainst={votesAgainst}
                endTime={endTime}
              />
            </div>
          )
        )}
      </div>
    </div>
  );
}
