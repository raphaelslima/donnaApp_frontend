import * as SecureStore from "expo-secure-store";

const authTokenKey = "donna-auth-token";

export const saveAuthToken = (token: string) =>
  SecureStore.setItemAsync(authTokenKey, token);

export const clearAuthToken = () =>
  SecureStore.deleteItemAsync(authTokenKey);
