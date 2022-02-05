import { Collection } from "@prisma/client";
import React from "react";

type CollectionContextProps = {
  modal: {
    new: {
      showNewModal: boolean,
      setShowNewModal: React.Dispatch<React.SetStateAction<boolean>>
    },
    delete: {
      showDeleteModal: boolean,
      setShowDeleteModal: React.Dispatch<React.SetStateAction<boolean>>,
      deleteCollection: null | Collection,
      setDeleteCollection: React.Dispatch<React.SetStateAction<Collection | null>>
    }
  }
}

export const CollectionContext = React.createContext<CollectionContextProps>({
  modal: {
    new: {
      showNewModal: false,
      setShowNewModal: () => { }
    },
    delete: {
      showDeleteModal: false,
      setShowDeleteModal: () => { },
      deleteCollection: null,
      setDeleteCollection: () => { }
    }
  }
});