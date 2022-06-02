import { atom } from "recoil";

export interface AuthModalState {
    isOpen: boolean;
    view: "login" | "signup" | "resetPassword";
};

const defaultModalState: AuthModalState = {
    isOpen: false,
    view: "login",
};

export const authModalState = atom<AuthModalState>({
    key: "authModalState",
    default: defaultModalState,
});