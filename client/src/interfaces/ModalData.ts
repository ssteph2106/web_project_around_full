import type { ReactNode } from "react";

export interface ModalData {
    id: string;
    title: string;
    children: ReactNode;
}