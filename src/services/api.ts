import axios from "axios";
import { Todo } from "../types/todo";
import { Projects } from "../types/projects";
import { Products } from "../types/Products";

const API_URL = "http://localhost:8080";
const axiosInstance = axios.create({ baseURL: API_URL });

export const getTodosId = async () => {
  return (await axiosInstance.get<Todo[]>("todos")).data.map((todo) => todo.id);
};

export const getTodo = async (id: number) => {
  const res = (await axiosInstance.get<Todo>(`todos/${id}`)).data;

  return res;
};

export const createTodo = async (data: Todo) => {
  await axiosInstance.post("todos", data);
};

export const updateTodo = async (data: Todo) => {
  await axiosInstance.put(`todos/${data.id}`, data);
};

export const deleteTodo = async (id: number) => {
  await axiosInstance.delete(`todos/${id}`);
};

export const getProjects = async (page = 1) => {
  const res = (
    await axiosInstance.get<Projects[]>(`projects?_page=${page}&_limit=3`)
  ).data;

  return res;
};

export const getProducts = async ({ pageParams }: { pageParams: number }) => {
  return (
    await axiosInstance.get<Products[]>(`products?_page=${pageParams}&_limit=3`)
  ).data;
};

export const getProduct = async (id: number | null) => {
  if (id) {
    return (await axiosInstance.get<Products>(`products/${id}`)).data;
  } else {
    return null;
  }
};
