import { useInfiniteQuery } from "@tanstack/react-query";

export default function useInfiniteDiplomas() {
  return useInfiniteQuery({
    queryKey: ["diplomas"],
    queryFn: async ({ pageParam = 1 }) => {
      const res = await fetch(`/api/diplomas?page=${pageParam}&limit=6`);
      if (!res.ok) throw new Error("Failed to fetch diplomas");
      return res.json();
    },
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      const { currentPage, numberOfPages } = lastPage.metadata;
      return currentPage < numberOfPages ? currentPage + 1 : undefined;
    },
  });
}
