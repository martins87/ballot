"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Contract, getDefaultProvider } from "ethers";

import { contractAddress, contractABI } from "../contract/config";
import { useContract } from "../store/contract";
import ProposalCard, { Proposal } from "@/components/ProposalCard";

export default function Home() {
  const router = useRouter();
  const { _, setDefaultProviderInstance } = useContract();
  const { zProposals, setZProposals } = useContract();
  const [count, setCount] = useState<number>(-1);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [ids, setIds] = useState<number[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    // setCount(mockedProposals.length);
    // return;
    console.log("main page");
    let defaultProvider = getDefaultProvider(
      `https://polygon-amoy.infura.io/v3/88651f31c40747fe99468a85a1abcc26`
    );
    let ballot = new Contract(contractAddress, contractABI, defaultProvider);
    setDefaultProviderInstance(ballot);

    setLoading(true);
    ballot.proposalCount().then((c) => {
      setCount(Number(c));

      let proposalsArr: Proposal[] = [];
      for (let id = 0; id < Number(c); id++) {
        // setIds((state) => [...state, id]);
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
          setZProposals([...proposalsArr, p]);
          proposalsArr.push(p);
        });
      }
      setLoading(false);
    });
  }, []);

  const handleClick = (id: number) => {
    router.push(`/proposal/${id}`);
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center mt-14">
      <div className="flex flex-col gap-4 w-[80%]">
        <header className="flex items-center justify-center text-6xl font-bold text-gray-700 my-20">
          Proposals
        </header>
        {loading && <p>Loading proposals...</p>}
        {!loading && (
          <div className="grid grid-cols-3 gap-4">
            {proposals
              .slice(-count)
              .map(
                ({
                  id,
                  title,
                  description,
                  votesFor,
                  votesAgainst,
                  endTime,
                }) => (
                  <div
                    className="w-full flex items-center justify-center"
                    key={id}
                    onClick={() => handleClick(id)}
                  >
                    <ProposalCard
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
        )}
      </div>
    </div>
  );
}
