import api from "./api";

// ✅ Define TypeScript Interfaces for Request & Response
interface LoginRequest {
  username: string;
  password: string;
}
interface RegisterRequest {
  username: string;
  password: string;
  name: string;
  email: string;
  avatar: string;
}

interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    id: string;
    name: string;
    username: string;
    email: string;
    avatar: string;
  };
}

// ✅ Login Function
export const loginUser = async (
  credentials: LoginRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "api/v1/user/login",
      credentials,
      {
        withCredentials: true, // ✅ Ensures cookies are sent and received
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Login failed:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Login failed");
  }
};

// ✅ Login Function
export const RegisterUser = async (
  credentials: RegisterRequest
): Promise<LoginResponse> => {
  try {
    const response = await api.post<LoginResponse>(
      "api/v1/user/register",
      credentials,
      {
        withCredentials: true, // ✅ Ensures cookies are sent and received
      }
    );

    return response.data;
  } catch (error: any) {
    console.error(
      "Registration failed:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Registration failed");
  }
};
