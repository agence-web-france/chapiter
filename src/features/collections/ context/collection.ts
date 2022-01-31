import React from "react";

type CollectionContextProps = {
  modal: {
    new: {
      showNewModal: boolean,
      setShowNewModal: React.Dispatch<React.SetStateAction<boolean>>
    }
  }
}

export const CollectionContext = React.createContext<CollectionContextProps>({
  modal: {
    new: {
      showNewModal: false,
      setShowNewModal: () => { }
    }
  }
});