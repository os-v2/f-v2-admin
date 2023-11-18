/* eslint-disable @typescript-eslint/no-empty-function */
import styled, { useTheme } from "styled-components";
import {
  Outlet,
  useMatch,
  Navigate,
  useLocation,
  useNavigate,
} from "react-router-dom";
import jwtUtils from "../utils/JwtUtil";
import { Dropdown, DropdownItemProps, Menu, Segment } from "semantic-ui-react";
import { useState } from "react";

export default function RouteLayout(): JSX.Element {
  const match = useMatch("/login");
  const token = localStorage.getItem("token");
  const location = useLocation();
  const [menuHeight, setMenuHegiht] = useState(200);
  const themeApp = useTheme();
  const navigate = useNavigate();
  const [activeItem, setActiveItem] = useState<boolean | undefined>(false);
  const isAuth = jwtUtils.isAuth(token);
  const handleItemClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation();
    setActiveItem(!activeItem);
  };
  const handleDropdownClick = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
    e.stopPropagation();
    setActiveItem(!activeItem);
  };

  // if (!isAuth && match?.pathname !== "/login") {
  //   return <Navigate to="/login" replace={true} />;
  // }
  const onItemClickEvent = (event: React.MouseEvent<HTMLDivElement, MouseEvent>, data: DropdownItemProps) => {
    event.stopPropagation();
    setActiveItem(false);
    if (data.value)
      navigate(data.value as string);
  };
  const handleBackgroundClick = () => {
    setActiveItem(false);
  };

  return (
    <RootWrap onClick={handleBackgroundClick}>
      <RootWrapContainer >
        {location?.pathname !== "/login" && (
          <Header onClick={handleItemClick} >
            <Menu style={{ margin: 0 }} pointing secondary fluid widths={"10"} >
              <Menu.Menu style={{ width: 40, marginLeft: 24 }} position="left" >
                <Menu.Item
                  style={{ width: "100%" }}
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    e.stopPropagation();
                    console.log("홈으로");
                    setActiveItem(false);
                    navigate("/");
                  }}
                  name='홈'
                />
              </Menu.Menu>
              <Dropdown
                onClick={handleDropdownClick}
                text='메이커스'
                labeled
                open={activeItem}
                className='link item'
                icon={null}
                style={{
                  border: "none",
                  marginLeft: 0,
                  marginRight: 0,
                  zIndex: 99
                }}>
                <Dropdown.Menu
                  style={{
                    border: "none",
                    boxShadow: "none",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    backgroundColor: themeApp.colors.grey[8],
                  }}>
                  <Dropdown.Item
                    value={"/makers/manage"}
                    onClick={onItemClickEvent}
                  >
                    메이커스 관리
                  </Dropdown.Item>
                  <Dropdown.Item
                    value={"/makers/item"}
                    onClick={onItemClickEvent}
                  >
                    상품 관리
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
              <Dropdown
                onClick={handleDropdownClick}
                text='아무거나'
                labeled open={activeItem}
                className='link item'
                icon={null}
                style={{
                  border: "none",
                  marginLeft: 0,
                  marginRight: 0,
                  zIndex: 99
                }}>
                <Dropdown.Menu

                  style={{
                    border: "none",
                    boxShadow: "none",
                    borderBottomLeftRadius: 0,
                    borderBottomRightRadius: 0,
                    marginLeft: 0,
                    marginRight: 0,
                    backgroundColor: themeApp.colors.grey[8]
                  }}>
                  <Dropdown.Item
                    value={"/makers/amu"}
                    onClick={onItemClickEvent}
                  >
                    아무거나 관리
                  </Dropdown.Item>
                  <Dropdown.Item
                    onClick={onItemClickEvent}
                  >
                    아무 관리
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>


              <Menu.Menu position='right'>
                <Menu.Item
                  onClick={(e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
                    e.stopPropagation();
                    setActiveItem(false);
                    console.log("로그아웃");
                  }}
                  name="로그아웃"
                  style={{ display: "flex", flexWrap: "nowrap", whiteSpace: "nowrap" }}
                />
              </Menu.Menu>
            </Menu>
            {activeItem && <Segment style={{
              margin: 0,
              border: "none",
              boxShadow: "none",
              height: menuHeight,
              backgroundColor: themeApp.colors.grey[8],
              zIndex: 98
            }}>
            </Segment>
            }
          </Header>
        )}
        <MainWrap>
          <Outlet />
        </MainWrap>
      </RootWrapContainer>
    </RootWrap >
  );
}

const RootWrap = styled.div`
  width: 100dvw;
  height: 100vh;
`;
const RootWrapContainer = styled.div`
  width: 100%;
  margin: 0 auto;
  padding: 0;
`;
const Header = styled.header`
  width: 100dvw;
  margin: 0 auto;
  height: 48px;
  cursor: pointer;
`;

const MainWrap = styled.main`
  display: flex;
  margin: 0px auto;
`;

