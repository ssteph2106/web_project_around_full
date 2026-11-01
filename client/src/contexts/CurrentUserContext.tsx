import { createContext } from "react";
import type { CurrentUserContextType } from "../interfaces/CurrentUserContextType";

export const CurrentUserContext = createContext <CurrentUserContextType>({} as CurrentUserContextType);