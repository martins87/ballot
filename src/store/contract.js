import { create } from "zustand";

export const useContract = create((set) => ({
  contract: {
    defaultProviderInstance: null,
    metamaskProviderInstance: null,
    address: "",
    abi: null,
    zProposals: [],
  },

  setDefaultProviderInstance: (instance) =>
    set((state) => ({
      contract: { ...state.contract, defaultProviderInstance: instance },
    })),
  setMetamaskProviderInstance: (instance) =>
    set((state) => ({
      contract: { ...state.contract, metamaskProviderInstance: instance },
    })),
  setAddress: (address) =>
    set((state) => ({ contract: { ...state.contract, address: address } })),
  setAbi: (abi) =>
    set((state) => ({ contract: { ...state.contract, abi: abi } })),
  setZProposals: (proposals) =>
    set((state) => ({ ...state.contract, proposals })),
}));
