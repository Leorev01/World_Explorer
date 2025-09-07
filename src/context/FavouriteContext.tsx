import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from 'expo-sqlite/kv-store';
import { useUsersRepo } from '../data/usersRepo';

type FavouriteContextType = {
  favourites: string[];
  addFavourite: (code: string) => Promise<void>;
  removeFavourite: (code: string) => Promise<void>;
  isFavourite: (code: string) => boolean;
};

const FavouriteContext = createContext<FavouriteContextType | undefined>(undefined);

export const FavouriteProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [favourites, setFavourites] = useState<string[]>([]);
  const [user, setUser] = useState<any>(null);
  const {addFavourites, getFavourites} = useUsersRepo();

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('user');
      const user = userString ? JSON.parse(userString) : null;
      setUser(user);
      setFavourites(user && user.favourites ? JSON.parse(user.favourites) : []);
    };
    fetchUser();
  }, []);

  const saveFavourites = async (newFavs: string[]) => {
    setFavourites(newFavs);
    await addFavourites(user.id, JSON.stringify(newFavs));
    const updatedUser = { ...user, favourites: JSON.stringify(newFavs) };
    await AsyncStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const addFavourite = async (code: string) => {
    if (!favourites.includes(code)) {
      saveFavourites([...favourites, code]);
    }
  };

  const removeFavourite = async (code: string) => {
    await saveFavourites(favourites.filter(fav => fav !== code));
  };

  const isFavourite = (code: string) => favourites.includes(code);

  return (
    <FavouriteContext.Provider value={{ favourites, addFavourite, removeFavourite, isFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};

export const useFavouriteContext = () => {
  const ctx = useContext(FavouriteContext);
  if (!ctx) throw new Error('useFavouriteContext must be used within a FavouriteProvider');
  return ctx;
};