import { createContext, PropsWithChildren, useCallback, useState } from "react";
import { User } from "../../../api";

const LOCALSTORAGE_USER_KEY = "currentUser";

const getUserFromLocalStorage = () => {
  try {
    const currentUser = localStorage.getItem(LOCALSTORAGE_USER_KEY);
    if (currentUser) {
      return JSON.parse(currentUser);
    }

    return null;
  } catch (e) {}
};

const setUserInLocalStorage = (user: User | null) => {
  try {
    if (user) {
      const stringified = JSON.stringify(user);
      localStorage.setItem(LOCALSTORAGE_USER_KEY, stringified);
    } else {
      localStorage.removeItem(LOCALSTORAGE_USER_KEY);
    }
  } catch (e) {}
};

export const UserContext = createContext<User | null>(null);

export const SetUserContext = createContext<(user: User | null) => void>(
  () => {},
);

export const UserContextProvider: React.FC<PropsWithChildren> = ({
  children,
}) => {
  const [user, _setUser] = useState<User | null>(getUserFromLocalStorage());
  const setUser = useCallback((user: User | null) => {
    _setUser(user);
    setUserInLocalStorage(user);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <SetUserContext.Provider value={setUser}>
        {children}
      </SetUserContext.Provider>
    </UserContext.Provider>
  );
};
