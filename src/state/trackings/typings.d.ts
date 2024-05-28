interface ITrackingsState {
  lastOpenedFlyerId: number | undefined;
  setLastOpenedFlyerId: (flyerId: number | undefined) => void;
}

export { ITrackingsState };
