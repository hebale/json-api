import React, { useState, useEffect } from 'react';
import { Stack, ToggleButtonGroup, ToggleButton } from '@mui/material';

type MenuBarProps = {
  datas: string[];
  onChange: (menus: string[]) => void;
};

const MenuBar = ({ datas = [], onChange }: MenuBarProps) => {
  const [menus, setMenus] = useState(datas);

  useEffect(() => {
    onChange(menus);
  }, [menus]);

  const onChangeMenu = (
    e: React.MouseEvent<HTMLElement>,
    newMenus: string[]
  ) => {
    setMenus(newMenus);
  };

  return (
    datas.length > 1 && (
      <Stack alignItems="center">
        <ToggleButtonGroup
          color="primary"
          value={menus}
          onChange={onChangeMenu}
        >
          {datas.map((data) => (
            <ToggleButton key={data} value={data}>
              ({menus.indexOf(data) + 1}) {data} {/* 레이아웃 순서 표시 */}
            </ToggleButton>
          ))}
        </ToggleButtonGroup>
      </Stack>
    )
  );
};

export default MenuBar;
