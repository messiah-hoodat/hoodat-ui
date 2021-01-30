import * as SecureStore from 'expo-secure-store';

import { UserContext } from '../contexts/UserContext';
import HoodatService from './HoodatService';

interface Credentials {
  email: string;
  password: string;
}

class SecureStoreService {
  async trySignInWithStoredCredentials(
    context: UserContext | null
  ): Promise<void> {
    const creds = await this.tryGetStoredCredentials();
    if (!creds) {
      console.log('Unable to retrieve stored credentials');
      return;
    }

    try {
      const res = await HoodatService.signIn(creds.email, creds.password);
      context?.setValue({ token: res.token, userId: res.userId });
    } catch {
      console.log('Unable to sign in with stored credentials');
    }
  }

  async tryGetStoredCredentials(): Promise<Credentials | undefined> {
    let email, password;
    try {
      email = await SecureStore.getItemAsync('email');
      password = await SecureStore.getItemAsync('password');
    } catch {
      return undefined;
    }
    if (!email || !password) {
      return undefined;
    }

    return {
      email,
      password,
    };
  }

  async storeCredentials(email: string, password: string): Promise<void> {
    try {
      await Promise.all([
        SecureStore.setItemAsync('email', email),
        SecureStore.setItemAsync('password', password),
      ]);
    } catch {
      console.log('Unable to store credentials');
    }
  }

  async deleteStoredCredentials(): Promise<void> {
    try {
      await Promise.all([
        SecureStore.deleteItemAsync('email'),
        SecureStore.deleteItemAsync('password'),
      ]);
    } catch {
      console.log('Unable to delete stored credentials');
    }
  }
}

export default new SecureStoreService();
