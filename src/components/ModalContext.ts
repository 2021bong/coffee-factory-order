import { createContext } from 'react';

export const ModalContext = createContext<ModalContextType>({} as ModalContextType);

export interface ModalContextType {
  show: boolean;
  openModal: () => void;
  closeModal: () => void;
  orderableStatus: boolean;
  setDisableOrder: () => void;
}
