import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom'
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/react';
import { faUser } from '@fortawesome/free-regular-svg-icons';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { logout } from '../redux/auth/authSlice'

const TheHeaderDropdown = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.auth);

  const handleClickOnProfile = () => {
      navigate("/profile");
  }

  const handleLogout = () => {
    dispatch(logout())
  }

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle className="py-0" caret={false}>
        <div className='d-flex align-items-center'>
          <p className='mb-0'>{user.first_name + ' ' + user.last_name}</p>
          <CAvatar src={user.avatar} size="md" className='ms-2'/>
        </div>
      </CDropdownToggle>
      <CDropdownMenu className="py-0 dropdown-inset">
        <CDropdownItem onClick={handleClickOnProfile}>
          <FontAwesomeIcon icon={faUser} className="me-2" />
          Profil
        </CDropdownItem>
        <CDropdownItem onClick={handleLogout}>
          <FontAwesomeIcon icon={faArrowRightFromBracket} className="me-2" />
          Izloguj se
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  )
}

export default TheHeaderDropdown
