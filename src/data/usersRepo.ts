import { useSQLiteContext } from 'expo-sqlite';

export function useUsersRepo() {
  const db = useSQLiteContext();

  const register = async (name: string, email: string, password: string, favourites: string) => {
    await db.runAsync(
      'INSERT INTO users (name, email, password, favourites) VALUES (?, ?, ?, ?)',
      [name, email, password, favourites]
    );
  };

  const findByEmail = async (email: string) => {
    return await db.getFirstAsync<{ id: number; name: string; email: string; password: string }>(
      'SELECT * FROM users WHERE email = ?',
      [email]
    );
  };

  const login = async (email: string, password: string) => {
    return await db.getFirstAsync<{ id: number; name: string; email: string; favourites: string }>(
      'SELECT id, name, email, favourites FROM users WHERE email = ? AND password = ?',
      [email, password]
    );
  };

  const listAll = async () => {
    return await db.getAllAsync<{ id: number; name: string; email: string }>(
      'SELECT id, name, email FROM users'
    );
  };

  const getFavourites = async (id: number) => {
    return await db.getFirstAsync<{ favourites: string }>(
      'SELECT favourites FROM users WHERE id = ?',
      [id]
    );
  }

  const addFavourites = async (id: number, favourites: string) => {
    await db.runAsync(
      'UPDATE users SET favourites = ? WHERE id = ?',
      [favourites, id]
    );
  }

  const updateProfile = async (id: number, name: string, email: string) => {
    await db.runAsync(
      'UPDATE users SET name = ?, email = ? WHERE id = ?',
      [name, email, id]
    );
  }

  return { register, findByEmail, login, listAll, getFavourites, addFavourites, updateProfile };
}
