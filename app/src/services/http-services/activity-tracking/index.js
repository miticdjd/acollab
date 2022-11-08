import apiClient from '../../axios';

export async function getActivitiesWithPagination(perPage = 10, sort = 'name', direction = 'desc' , page) {
    return apiClient
        .get(`/audit-events/all?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`, {})
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getActivitiesWithFilters(perPage = 10, sort = 'name', direction = 'desc' , page, filters) {
    return apiClient
        .post(`/audit-events/filter?per_page=${perPage}&sort=${sort}&direction=${direction}&page=${page}`, filters)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}
  
export async function getSingleActivity(activityId) {
    return apiClient
        .get(`/audit-event/${activityId}/details`)
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}

export async function getEventTypes() {
    return apiClient
        .get('/audit-events/types/all')
        .then(response => {
            return response;
        })
        .catch(err => err && err);
}


