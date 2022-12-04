export function transformForSelect(statuses) {

    return statuses.map(status => ({ name: status, id: status }));
};