import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makersApi} from "../../apis/makers";

export const useMakersListManage = () => {
  const {data: makersList} = useQuery({
    queryKey: ["makers", "manage"],
    queryFn: async () => {
      return await makersApi.getMakersList();
    },
  });
  const result = makersList?.data.data;

  return {makersList: result};
};

export const useMakersDetail = (id: number) => {
  const queryClient = useQueryClient();
  const {
    data: makersDetail,
    refetch: detailRefetch,
    isPending,
    isFetching,
    isLoading,
  } = useQuery(
    {
      queryKey: ["makers", "detail"],
      queryFn: async () => {
        return await makersApi.getMakersDetail(id);
      },
      enabled: false,
    },
    queryClient,
  );

  const result = makersDetail?.data.data;
  return {
    makersDetail: result,
    detailRefetch,
    isLoading,
    isFetching,
    isPending,
  };
};
export const useInsertMakers = () => {
  const queryClient = useQueryClient();
  const {mutateAsync: insertMakers} = useMutation({
    mutationFn: async (params: FormData) =>
      await makersApi.insertMakers(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["makers"],
      });
    },
  });
  return {insertMakers};
};
