import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {foodsApi, tFoodItemDetail, tFoodStatusType} from "../../apis/foods";
import instance from "../../utils/instance";
import {tApiDefault} from "../../utils/types/apiType";

export const useFood = (id: number | null) => {
  const {data: foodItemList} = useQuery({
    queryKey: ["food"],
    queryFn: async () => await foodsApi.getFoodItemList(),
    select: data =>
      data.data.data.map(v => {
        return {
          id: v.id,
          isActive: v.isActive,
          makers: v.makers,
          name: v.name,
          price: v.price,
          supplyPrice: v.supplyPrice,
        };
      }),
  });
  const {data: foodMakersList} = useQuery({
    queryKey: ["food", "makers"],
    queryFn: async () => await foodsApi.getFoodMakersList(),
    select(data) {
      return data.data.data;
    },
  });
  const {
    data: foodItemDetail,
    refetch: foodItemDetailRefetch,
    isLoading: foodDetailLoading,
  } = useQuery({
    queryKey: ["food", "detail", id],
    queryFn: async () => await foodsApi.getFoodItemDetail(id as number),
    enabled: false,
    select: data => {
      return data.data.data;
    },
  });
  const queryClient = useQueryClient();
  const {mutateAsync: intertFood} = useMutation({
    mutationFn: async (params: FormData) => await foodsApi.intertFood(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food"],
      });
    },
  });
  const {mutateAsync: updateFoodStatus} = useMutation({
    mutationFn: async (params: tFoodStatusType) =>
      await foodsApi.updateFoodStatus(params),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["food"],
      });
    },
  });
  return {
    foodItemList,
    foodMakersList,
    foodItemDetail,
    foodItemDetailRefetch,
    foodDetailLoading,
    intertFood,
    updateFoodStatus,
  };
};
