import React, { createContext, useState } from "react";
import Modals from "~/features/Modals";

import type { ReactNode } from "react";
import type { ModalProps, ModalDispatchAction } from "~/types/components";

export const ModalStatusContext = createContext<ModalProps[]>([]);
export const ModalDispatchContext = createContext<ModalDispatchAction>({
  open: () => {},
  close: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const dispatch: ModalDispatchAction = {
    open: (modal) => {
      setModals((modals) => [...modals, modal]);
    },
    close: (id) => {
      setModals((modals) => modals.filter((modal) => modal.id !== id));
    },
  };

  return (
    <ModalDispatchContext.Provider value={dispatch}>
      <ModalStatusContext.Provider value={modals}>
        {children}
        <Modals />
      </ModalStatusContext.Provider>
    </ModalDispatchContext.Provider>
  );
};

export default ModalProvider;
