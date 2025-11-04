let inMemoryAccessToken = null;
export const setAccessToken = (token, persist = true) => {
  if (persist) {
    try {
      localStorage.setItem("accessToken", token);
    } catch (e) {
      console.error("Failed to save access token to localStorage", e);
    }
  }
};

export function getAccessToken() {
  if (inMemoryAccessToken) {
    return inMemoryAccessToken;
  }
  try {
    const t = localStorage.getItem("accessToken");
    inMemoryAccessToken = t;
    return t;
  } catch (e) {
    return null;
  }
}

export function clearAccessToken() {
  inMemoryAccessToken = null;
  try {
    localStorage.removeItem("accessToken");
  } catch (e) {
    console.error("Failed to remove access token from localStorage", e);
  }
}
