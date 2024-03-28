import React, { createContext, useState } from "react";
import Modals from "~/features/Modals";

import type { ReactNode } from "react";
import type { ModalProps, ModalDispatchProps } from "~/types/features";

export const ModalStatusContext = createContext<ModalProps[]>([]);
export const ModalDispatchContext = createContext<ModalDispatchProps>({
  open: () => {},
  close: () => {},
});

const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [modals, setModals] = useState<ModalProps[]>([]);

  const dispatch: ModalDispatchProps = {
    open: (alert) => {
      return new Promise((resolve) =>
        setModals((modals) => [...modals, { ...alert, resolve }])
      );
    },
    close: (id) => {
      setModals((modals) => modals.filter((alert) => alert.id !== id));
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
