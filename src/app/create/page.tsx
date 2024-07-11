"use client";

import { useEffect, useState } from "react";
import { redirect, useRouter } from "next/navigation";

import { useContract } from "@/store/contract";

const CreateProposal = () => {
  const router = useRouter();
  const instance = useContract((state) => state.contract.instance);
  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");

  useEffect(() => {
    if (!instance) {
      redirect("/");
    }
  }, []);

  const handleCreate = async () => {
    console.log("title", title);
    console.log("description", description);

    instance
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

  return (
    <div className="w-screen h-screen flex flex-col gap-4 items-center justify-center">
      <div className="w-[60%] flex flex-col justify-start p-4 gap-2 bg-slate-100 rounded-lg ">
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
    </div>
  );
};

export default CreateProposal;
