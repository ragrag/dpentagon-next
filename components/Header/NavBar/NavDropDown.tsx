import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretDown } from '@fortawesome/free-solid-svg-icons';
import React from 'react';
import { Menu, MenuItem } from '@material-ui/core';
import { NavDropdown } from 'react-bootstrap';
import { useRouter } from 'next/router';

type Props = {
  label: string;
  onClick?: () => void;
  professions: string[];
};

export default function NavDropDown(props: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const router = useRouter();
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
    if (props.onClick) props.onClick();
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const routeToCustomQuery = (userType: string = null) => {
    // router.query.profession = props.professions.join(';');
    // router.query.userType = userType;
    // console.log(router.query);
    // console.log(router.query.profession);
    let queryString = 'profession=';
    for (let i = 0; i < props.professions.length; i++) {
      queryString += `${props.professions[i]}${i < props.professions.length - 1 ? ';' : ''}`;
    }

    if (userType) router.replace(`/?${queryString}&userType=${userType}`);
    else router.replace(`/?${queryString}`);
  };
  return (
    <>
      <Menu id="simple-menu" style={{ marginTop: '40px' }} anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem
          style={{ backgroundColor: '#FF000' }}
          onClick={() => {
            handleClose();
            routeToCustomQuery('company');
          }}
        >
          Company
        </MenuItem>
        <NavDropdown.Divider />
        <MenuItem
          onClick={() => {
            handleClose();
            routeToCustomQuery('freelancer');
          }}
        >
          Freelancer
        </MenuItem>
      </Menu>

      <span
        className="hoverable"
        style={{ color: '#e9dccc' }}
        onClick={() => {
          routeToCustomQuery();
        }}
      >
        {props.label}
      </span>

      <FontAwesomeIcon
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size="sm"
        color="#e9dccc"
        icon={faCaretDown}
        style={{ marginLeft: '10px' }}
      />
    </>
  );
}
