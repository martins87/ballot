import { create } from "zustand";

export const useContract = create((set) => ({
  contract: {
    instance: null,
    address: "",
    abi: null,
  },

  setInstance: (instance) =>
    set((state) => ({ contract: { ...state.contract, instance: instance } })),
  setAddress: (address) =>
    set((state) => ({ contract: { ...state.contract, address: address } })),
  setAbi: (abi) =>
    set((state) => ({ contract: { ...state.contract, abi: abi } })),
}));
