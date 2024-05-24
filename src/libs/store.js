import { create } from 'zustand';

const useStore = create((set) => ({
  isGridOverlayVisible: false,
  toggleGridOverlayVisibility: () =>
    set((state) => ({ isGridOverlayVisible: !state.isGridOverlayVisible })),
}));

export default useStore;
