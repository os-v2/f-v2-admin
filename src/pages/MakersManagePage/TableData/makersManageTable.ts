export interface IMakersManageTableProps {
  checked: string;
  active: boolean | string;
  makersName: string;
  code: string;
  password: string;
  address: string;
  address2: string;
  zip: string;
  manager: string;
  phone: string;
}
export interface IHeaderTypeProps {
  [key: string]: any;
}
export const makersManageHeader: IHeaderTypeProps = {
  checked: "선택",
  active: "활성",
  makersName: "메이커스이름",
  code: "코드",
  password: "비밀번호",
  address: "주소",
  address2: "상세주소",
  zip: "우편번호",
  manager: "담당자",
  phone: "전화번호",
};

export const dummyData: Array<IHeaderTypeProps> = [
  {
    id: 0,
    active: true,
    makersName: "메이커스이름",
    code: "코드1",
    password: "비밀번호",
    address: "주소",
    address2: "상세주소",
    zip: "우편번호",
    manager: "담당자",
    phone: "전화번호",
  },
  {
    id: 1,
    active: true,
    makersName: "메이커스이름",
    code: "코드2",
    password: "비밀번호",
    address: "주소",
    address2: "상세주소",
    zip: "우편번호",
    manager: "담당자",
    phone: "전화번호",
  },
  {
    id: 2,
    active: true,
    makersName: "메이커스이름",
    code: "코드3",
    password: "비밀번호",
    address: "주소",
    address2: "상세주소",
    zip: "우편번호",
    manager: "담당자",
    phone: "전화번호",
  },
  {
    id: 3,
    active: true,
    makersName: "메이커스이름",
    code: "코드4",
    password: "비밀번호",
    address: "주소",
    address2: "상세주소",
    zip: "우편번호",
    manager: "담당자",
    phone: "전화번호",
  },
  {
    id: 4,
    active: true,
    makersName: "메이커스이름",
    code: "코드5",
    password: "비밀번호",
    address: "주소",
    address2: "상세주소",
    zip: "우편번호",
    manager: "담당자",
    phone: "전화번호",
  },
];
