import { create } from "zustand";

const userBearStore = create((set: any) => ({
    bears: 0,
    increasePopulation: () => set((state: any) => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
}))

export { userBearStore };