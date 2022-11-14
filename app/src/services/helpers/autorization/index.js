export function hasPermission(permissions, permission) {
    if (permissions && permissions.length > 0) {
        return permissions.includes(permission);
    }

    return false;
}

export function hasOneOfPermissions(userPermissions, permissions) {
    if (userPermissions && userPermissions.length > 0 && permissions && permissions.length > 0) {
        return (permissions.some(permission => hasPermission(userPermissions, permission))) 
            ? true 
            : false;
    }

    return false;
}

export function hasRole(roles, role) {
    if (roles && roles.length > 0) {
        return roles.includes(role);
    }

    return false;
}

export function hasOneOfRoles(userRoles, roles) {
    if (userRoles && userRoles.length > 0 && roles && roles.length > 0) {
        return (roles.some(role => hasRole(userRoles, role))) 
            ? true 
            : false;
    }

    return false;
}
  