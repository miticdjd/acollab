import React from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { hasOneOfPermissions } from '../services/helpers/autorization';


export const TheSidebarNav = ({ items }) => {
  const { t } = useTranslation();
  const authUserPermissions = useSelector(state => state.auth.permissions);
  const location = useLocation()
  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name && t(name)}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, permissions, name, icon, ...rest } = item
    const Component = component

    return (
      (!permissions.length || hasOneOfPermissions(authUserPermissions, permissions)) &&
      <Component
        {...(rest.to &&
          !rest.items && {
            component: NavLink,
          })}
        key={index}
        {...rest}
      >
        {navLink(name, icon)}
      </Component>
    )
  }
  const navGroup = (item, index) => {
    const { component, permissions, name, icon, to, ...rest } = item
    const Component = component
    
    return (
     (!permissions.length || hasOneOfPermissions(authUserPermissions, permissions)) &&
      <Component
        idx={String(index)}
        key={index}
        toggler={navLink(name, icon)}
        visible={location.pathname.startsWith(to)}
        {...rest}
      >
        {item.items?.map((item, index) =>
          item.items ? navGroup(item, index) : navItem(item, index),
        )}
      </Component>
      )
  }

  return (
    <React.Fragment>
      {items &&
        items.map((item, index) => (item.items ? navGroup(item, index) : navItem(item, index)))}
    </React.Fragment>
  )
}

TheSidebarNav.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
}
