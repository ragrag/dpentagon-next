import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { NavDropdown } from 'react-bootstrap';

type Props = {
  label: string;
  onClick?: () => void;
};

export default function NavDropDown(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    if (props.onClick) props.onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <Menu id="simple-menu" style={{ marginTop: '40px' }} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem style={{ backgroundColor: '#FF000' }} onClick={handleClose}>
          Company
        </MenuItem>
        <NavDropdown.Divider />
        <MenuItem onClick={handleClose}>Freelancer</MenuItem>
      </Menu>
      <div aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}>
        <span style={{ color: '#FFFFFF' }}>{props.label}</span>
        <FontAwesomeIcon size="sm" color="#FFFFFF" icon={faCaretDown} style={{ marginLeft: '3px' }} />
      </div>
    </>
  );
}
