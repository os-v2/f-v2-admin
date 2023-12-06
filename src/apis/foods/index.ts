import instance from "../../utils/instance";
import {tApiDefault, tApiPostDefault} from "../../utils/types/apiType";

export type tFoodsItem = {
  id: number;
  name: string;
  price: number;
  supplyPrice: number;
  isActive: boolean;
  makersId?: number;
  makers: string;
  [key: string]: string | number | boolean | Array<string> | undefined;
};

export type tFoodMakersItem = {
  id: number;
  name: string;
};
export type tFoodItemDetail = {
  name: string;
  price: number;
  supplyPrice: number;
  makersId: number;
  makers: string;
  calories: number;
  carbohydrates: number;
  protein: number;
  fat: number;
  description: string;
  images?: Array<string>;
};
export type tFoodStatusType = {
  foodIds: number[];
  status: boolean;
};
interface IFoodsApiProps {
  getFoodItemList: () => Promise<tApiDefault<tFoodsItem[]>>;
  getFoodItemDetail: (id: number) => Promise<tApiDefault<tFoodItemDetail>>;
  getFoodMakersList: () => Promise<tApiDefault<tFoodMakersItem[]>>;
  intertFood: (params: FormData) => Promise<tApiPostDefault>;
  updateFoodStatus: (params: tFoodStatusType) => Promise<tApiPostDefault>;
}

export const foodsApi: IFoodsApiProps = {
  getFoodItemList: async () => await instance.get("/food"),
  getFoodItemDetail: async (id: number) => await instance.get(`/food/${id}`),
  getFoodMakersList: async () => await instance.get("/public/makers"),
  intertFood: async (params: FormData) =>
    await instance.post("/food", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  updateFoodStatus: async (params: tFoodStatusType) =>
    await instance.patch("/food/status", params),
};
