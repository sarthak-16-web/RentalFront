import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { getContacts, updateContacts } from "../api/contactsApi";

export const useContacts = () =>
  useQuery({
    queryKey: ["contacts"],
    queryFn: getContacts,
    staleTime: 5 * 60 * 1000,
  });

export const useUpdateContacts = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateContacts,
    onSuccess: (saved) => {
      queryClient.setQueryData(["contacts"], saved);
    },
  });
};