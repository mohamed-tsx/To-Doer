import api from "./api";

export interface Todo {
  id: string;
  title: string;
  description: string;
  completed: boolean;
}
interface AllTodoResponse {
  success: true;
  todos: Todo[];
}

export const getAllTodos = async () => {
  try {
    const response = await api.get<AllTodoResponse>("api/v1/todo/todos", {
      withCredentials: true, // ✅ Ensures cookies are sent and received
    });

    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to fetch todos:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Fetching failed");
  }
};

export const createTodo = async (title: string, description: string) => {
  try {
    const response = await api.post(
      "/api/v1/todo/",
      { title, description },
      {
        withCredentials: true,
      }
    );
    return response.data;
  } catch (error: any) {
    console.error(
      "Failed to create todo:",
      error.response?.data?.message || error.message
    );
    throw new Error(error.response?.data?.message || "Creating failed");
  }
};
