import type { UserData } from "./UserData";

export interface CurrentUserContextType {
  currentUser: UserData | null;
  handleUpdateAvatar: (data: { avatar: string }) => Promise<void>;
  handleUpdateUser: (data: { name: string; about: string }) => Promise<void>;
  handleAddPlaceSubmit: (data: { name: string; link: string }) => Promise<void>;
}

