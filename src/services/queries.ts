import {
  keepPreviousData,
  useInfiniteQuery,
  useQueries,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  getProduct,
  getProducts,
  getProjects,
  getTodo,
  getTodosId,
} from "./api";
import { Products } from "../types/Products";

export function useTodosId() {
  return useQuery({
    queryKey: ["todos"],
    queryFn: getTodosId,
  });
}

export function useTodos(id: number[]) {
  return useQueries({
    queries: (id ?? [])?.map((id) => {
      return {
        queryKey: ["todo", { id }],
        queryFn: () => getTodo(id!),
      };
    }),
  });
}

export function useGetProjects(page: number) {
  return useQuery({
    queryKey: ["projects", { page }],
    queryFn: () => getProjects(page),
    placeholderData: keepPreviousData,
  });
}

export function useProducts() {
  return useInfiniteQuery({
    queryKey: ["products"],
    queryFn: ({ pageParam }) => getProducts({ pageParams: pageParam }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, _, lasPageParam) => {
      if (lastPage.length === 0) {
        return undefined;
      }
      return lasPageParam + 1;
    },
    getPreviousPageParam: (_, __, firstPageParam) => {
      if (firstPageParam <= 1) {
        return undefined;
      }
      return firstPageParam - 1;
    },
  });
}

export function useGetProduct(id: number | null) {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["product", { id }],
    queryFn: () => getProduct(id),
    placeholderData: () => {
      const cachedProduct = (
        queryClient.getQueryData(["products"]) as {
          pages: Products[] | undefined;
        }
      )?.pages?.flat(2);

      if (cachedProduct) {
        return cachedProduct.find((product) => product.id === id);
      }
    },
  });
}
