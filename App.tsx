import React, { useEffect, useState } from 'react';
import { ApolloProvider } from '@apollo/client';
import { client } from './src/apollo/client';
import RootNavigator from './src/navigation';
import Toast from 'react-native-toast-message';
import { SQLiteProvider } from 'expo-sqlite';
import { FavouriteProvider } from './src/context/FavouriteContext';

export default function App() {

  async function migrateDbAsync(db: any) {
  // idempotent table creation (safe to run every start)
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
   CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT UNIQUE NOT NULL,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      favourites TEXT
    );
  `);
}

  return (
    <SQLiteProvider databaseName="world.db" onInit={migrateDbAsync}>
      <ApolloProvider client={client}>
        <FavouriteProvider>
          <RootNavigator />
          <Toast />
        </FavouriteProvider>
      </ApolloProvider>
    </SQLiteProvider>
  );
}