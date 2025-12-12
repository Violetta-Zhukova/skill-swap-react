import type {
  IApiUser,
  ILoginResponse,
  IUserResponse,
  ILoginCredentials,
} from "../entities/types";

const API_BASE_URL = "http://89.169.134.231:8000/api/v1";

async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = `${API_BASE_URL}${endpoint}`;

  const defaultHeaders = {
    "Content-Type": "application/json",
    ...options.headers,
  };

  const response = await fetch(url, {
    ...options,
    headers: defaultHeaders,
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(
      `HTTP error! status: ${response.status}, message: ${errorText}`,
    );
  }

  return response.json();
}

export const authApi = {
  async login(credentials: ILoginCredentials): Promise<ILoginResponse> {
    return apiRequest<ILoginResponse>("/auth/login", {
      method: "POST",
      body: JSON.stringify(credentials),
    });
  },

  async getUser(token: string): Promise<IApiUser> {
    const response = await apiRequest<IUserResponse>("/user/", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.user;
  },

  async loginAndGetUser(credentials: ILoginCredentials): Promise<{
    user: IApiUser;
    token: string;
  }> {
    const loginResponse = await this.login(credentials);

    if (loginResponse.status === 200 && loginResponse.data.access_token) {
      localStorage.setItem("access_token", loginResponse.data.access_token);

      return {
        user: loginResponse.data.user,
        token: loginResponse.data.access_token,
      };
    } else {
      throw new Error(loginResponse.error || "Ошибка авторизации");
    }
  },
};
