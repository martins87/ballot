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

  useEffect(() => {
    const getProposals = async () => {
      let defaultProvider = getDefaultProvider(
        `https://polygon-amoy.infura.io/v3/88651f31c40747fe99468a85a1abcc26`
      );
      let ballot = new Contract(contractAddress, contractABI, defaultProvider);
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
    };

    getProposals();
  }, []);

  const handleClick = (id: number) => {
    router.push(`/proposal/${id}`);
  };

  const handleCreate = () => {
    router.push("/create");
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <div className="flex flex-col gap-4 w-[60%] my-10">
        <div className="grid grid-cols-2 gap-4">
          {proposals.map(
            ({ id, title, description, votesFor, votesAgainst, endTime }) => (
              <div
                className="w-full flex items-center justify-center"
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
        <button
          className="py-1 px-4 bg-black text-white w-full rounded-lg hover:text-gray-200"
          onClick={handleCreate}
        >
          Create proposal
        </button>
      </div>
    </div>
  );
}
