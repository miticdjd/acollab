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
    return true;
}

export function hasOneOfRoles(userRoles, roles) {
    return true;
}
  