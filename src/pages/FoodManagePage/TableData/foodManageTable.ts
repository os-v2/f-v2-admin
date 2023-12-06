import {tFoodsItem} from "../../../apis/foods";

export interface IFoodManageTableProps {
  checked: string;
  active: boolean | string;
  image: string;
  makers: string;
  name: string;
  price: string;
  supplyPrice: string;
}
export interface IHeaderTypeProps {
  [key: string]: any;
}

export const foodManageHeader: IHeaderTypeProps = {
  checked: "선택",
  isActive: "활성",
  makers: "메이커스",
  name: "상품명",
  price: "판매가",
  supplyPrice: "공급가",
};

export const dummyItemData: Array<IHeaderTypeProps> = [
  {
    id: 0,
    active: true,
    image: "이미지",
    makers: "우아아",
    name: "김밥",
    price: "35000",
    supplyPrice: "33000",
  },
  {
    id: 1,
    active: true,
    image: "이미지",
    makers: "우아아",
    name: "김밥",
    price: "35000",
    supplyPrice: "33000",
  },
  {
    id: 2,
    active: true,
    image: "이미지",
    makers: "우아아",
    name: "김밥",
    price: "35000",
    supplyPrice: "33000",
  },
  {
    id: 3,
    active: true,
    image: "이미지",
    makers: "우아아",
    name: "김밥",
    price: "35000",
    supplyPrice: "33000",
  },
];
