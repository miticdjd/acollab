import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';
import { hasOneOfRoles } from '../services/helpers/autorization';


export const TheSidebarNav = ({ items }) => {
  const authUserRoles = useSelector(state => state.auth.roles);
  const location = useLocation()
  const navLink = (name, icon) => {
    return (
      <>
        {icon && icon}
        {name}
      </>
    )
  }

  const navItem = (item, index) => {
    const { component, roles, name, icon, ...rest } = item
    const Component = component

    return (
      (!roles.length || hasOneOfRoles(authUserRoles, roles)) &&
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
    const { component, roles, name, icon, to, ...rest } = item
    const Component = component
    
    return (
     (!roles.length || hasOneOfRoles(authUserRoles, roles)) &&
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
