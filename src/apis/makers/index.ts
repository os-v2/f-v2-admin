import instance from "../../utils/instance";
import {tApiDefault, tApiPostDefault} from "../../utils/types/apiType";

export type tMakersList = {
  id: number;
  storeName: string;
  code: string;
  password: string;
  phone: string;
  manager: string;
  isActive: boolean;
  zipCode: string;
  address: string;
  address2: string;
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

interface IMakersApiProps {
  getMakersList: () => Promise<tApiDefault<tMakersList[]>>;
  insertMakers: (params: FormData) => Promise<tApiPostDefault>;
  getMakersDetail: (id: number) => Promise<tApiDefault<tMakersDetail>>;
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
};
