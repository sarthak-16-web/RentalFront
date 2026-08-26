import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getDirectorMessage, updateDirectorMessage } from "../api/directorMessageApi";

export const useDirectorMessage = () =>
  useQuery({
    queryKey: ["directorMessage"],
    queryFn: getDirectorMessage,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateDirectorMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateDirectorMessage,
    onSuccess: (saved) => {
      queryClient.setQueryData(["directorMessage"], saved);
    },
  });
};
