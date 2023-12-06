import instance from "../../utils/instance";
import {tApiDefault, tApiPostDefault} from "../../utils/types/apiType";

export type tMakersList = {
  id: number;
  isActive: string;
  storeName: string;
  code: string;
  password: string;
  address1: string;
  address2: boolean;
  zipCode: string;
  manager: string;
  phone: string;
  [key: string]: string | number | boolean;
};

export type tMakersDetail = {
  id: number;
  storeName: string;
  code: string;
  password: string;
  phone: string;
  manager: string;
  companyRegistrationNumber: number;
  bank: string;
  depositHolder: string;
  accountNumber: string;
  isActive: boolean;
  description: string;
  zipCode: string;
  address: string;
  address2: string;
  imageLocation: string;
  [key: string]: string | number | boolean;
};

export type tMakersStatus = {
  makersIds: number[];
  status: boolean;
};

interface IMakersApiProps {
  getMakersList: () => Promise<tApiDefault<tMakersList[]>>;
  insertMakers: (params: FormData) => Promise<tApiPostDefault>;
  getMakersDetail: (id: number) => Promise<tApiDefault<tMakersDetail>>;
  updateMakersStatus: (params: tMakersStatus) => Promise<tApiPostDefault>;
}

export const makersApi: IMakersApiProps = {
  getMakersList: async () => await instance.get("/makers"),
  insertMakers: async (params: FormData) =>
    await instance.post("/makers", params, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    }),
  getMakersDetail: async (id: number) => await instance.get(`/makers/${id}`),
  updateMakersStatus: async (params: tMakersStatus) =>
    await instance.patch("/makers/status", params),
};
