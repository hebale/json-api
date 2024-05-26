import React from 'react';
import { createRoot } from 'react-dom/client';
import QueryProvider from '~/contexts/QeuryContext';
import AlertProvider from '~/contexts/AlertContext';
import ModalProvider from '~/contexts/ModalContext';
import DialogProvider from '~/contexts/DialogContext';
import Layout from '~/layout';
import '~/assets/style.scss';

if (document.querySelector('#app') !== null) {
  createRoot(document.querySelector('#app') as HTMLElement).render(
    <QueryProvider>
      <AlertProvider>
        <ModalProvider>
          <DialogProvider>
            <Layout />
          </DialogProvider>
        </ModalProvider>
      </AlertProvider>
    </QueryProvider>
  );
}
