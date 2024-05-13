import React, { Children, useState } from 'react';
import Button from '@mui/material/Button';
import KeyboardDoubleArrowDownIcon from '@mui/icons-material/KeyboardDoubleArrowDown';
import KeyboardDoubleArrowUpIcon from '@mui/icons-material/KeyboardDoubleArrowUp';
export default function ToggleButton(props: { children?: JSX.Element | JSX.Element[] }) {

  const [showInfo, setShowInfo] = useState(false);

  const handleToggle = () => {
    setShowInfo(!showInfo);
  };

  return (
    <div>
      <Button onClick={handleToggle} sx={{width:'100%', color:'rgb(255,69,0)'}}>Faça o login
        {showInfo ? <KeyboardDoubleArrowUpIcon/> : <KeyboardDoubleArrowDownIcon/> }
      </Button>
      {showInfo && <div>{props.children}</div>}
    </div>
  );
};
