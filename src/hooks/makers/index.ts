import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {makersApi, tMakersStatus} from "../../apis/makers";

export const useMakers = (id: number) => {
  const {data: makersList} = useQuery({
    queryKey: ["makers", "manage"],
    queryFn: async () => {
      return await makersApi.getMakersList();
    },
    select(data) {
      return data.data.data.map(makers => {
        return {
          id: makers.id,
          isActive: makers.isActive,
          storeName: makers.storeName,
          code: makers.code,
          password: makers.password,
          address1: makers.address1,
          address2: makers.address2,
          zipCode: makers.zipCode,
          manager: makers.manager,
          phone: makers.phone,
        };
      });
    },
  });
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
      select(data) {
        return data.data.data;
      },
      enabled: false,
    },
    queryClient,
  );

  const {mutateAsync: insertMakers} = useMutation({
    mutationFn: async (params: FormData) =>
      await makersApi.insertMakers(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["makers"],
      });
    },
  });

  const {mutateAsync: updateMakersStatus} = useMutation({
    mutationFn: async (params: tMakersStatus) =>
      await makersApi.updateMakersStatus(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["makers"],
      });
    },
  });

  return {
    updateMakersStatus,
    makersList,
    insertMakers,
    makersDetail,
    detailRefetch,
    isLoading,
    isFetching,
    isPending,
  };
};
