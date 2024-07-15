"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";
import { BrowserProvider, Contract } from "ethers";

import { useContract } from "@/store/contract";
import { contractAddress, contractABI } from "../../contract/config";
import Link from "next/link";

const CreateProposal = () => {
  const router = useRouter();
  const defaultProviderInstance = useContract(
    (state) => state.contract.defaultProviderInstance
  );
  const { instance, setInstance } = useContract();
  const { metamaskProviderInstance, setMetamaskProviderInstance } =
    useContract();
  const [creatingInstance, setCreatingInstance] = useState<any>(null);
  const [account, setAccount] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  const handleCreate = async () => {
    console.log("handleCreate - instance", instance);

    creatingInstance
      .createProposal(title, description)
      .then((res: any) => {
        console.log("Proposal created successfully", res);
        router.push("/");
      })
      .catch((error: any) => {
        console.error(error);
        console.log("Error trying to create proposal");
      });
  };

  const handleConnect = async () => {
    if (window.ethereum != undefined) {
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
      setAccount(accounts[0]);
      console.log("accounts", accounts);
    }

    const metamaskProvider = new BrowserProvider(window.ethereum);
    const signer = await metamaskProvider.getSigner();
    const metamaskInstance = new Contract(contractAddress, contractABI, signer);
    setMetamaskProviderInstance(metamaskInstance);
    setCreatingInstance(metamaskInstance);
    console.log("signer", signer);
    console.log("metamaskInstance", metamaskInstance);
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
          {metamaskProviderInstance || creatingInstance
            ? shortAddress()
            : "Connect wallet"}
        </button>
        <p className="text-sm">
          Supports writing to the following contract function information after
          connecting to a wallet
        </p>
        <div className="w-full flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg border border-slate-400">
          <label>Title</label>
          <input
            className="p-2 focus:outline-none border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-500"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter the proposal title..."
            min="0"
          />

          <label>Description</label>
          <input
            className="p-2 focus:outline-none border border-slate-300 rounded-lg focus:ring-1 focus:ring-slate-500"
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter the proposal description..."
            min="0"
          />

          <button
            className="py-1 px-4 bg-black text-white w-fit rounded-lg hover:text-gray-400"
            onClick={handleCreate}
          >
            Create
          </button>
        </div>
        <Link href="/">Back</Link>
      </div>
    </div>
  );
};

export default CreateProposal;
