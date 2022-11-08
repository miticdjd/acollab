import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as activitiesService from '../../services/http-services/activity-tracking';
import { 
    fetchEventTypes,
    fetchActivitiesList,
    fetchActivityDetails,
    setActivitiesData } from './activitiesSlice';

export function* getActivitiesList({ payload }) {
  const { perPage, key, sortDirection, currentPage, filters} = payload;

  yield put({
    type: setActivitiesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = 
    filters
      ? yield call(activitiesService.getActivitiesWithFilters, perPage , key, sortDirection, currentPage, filters)
      : yield call(activitiesService.getActivitiesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setActivitiesData.type,
      payload: {
        activitiesList: data.data,
        activitiesMeta: data.meta
      },
    })
  }

  yield put({
    type: setActivitiesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getActivityDetails({ payload }) {
    const { id } = payload;
  
    yield put({
      type: setActivitiesData.type,
      payload: {
        loadingDetails: true,
      },
    });
  
    const response = yield call(activitiesService.getSingleActivity, id);
  
    if (response && response.status === 200) {
      const { data } = response;
  
      yield put({
        type: setActivitiesData.type,
        payload: {
            activityDetails: data,
        },
      })
    }
  
    yield put({
      type: setActivitiesData.type,
      payload: {
        loadingDetails: false,
      },
    })
}

export function* getEventTypes() {
  yield put({
    type: setActivitiesData.type,
    payload: {
      loadingEventTypes: true,
    },
  });

  const response = yield call(activitiesService.getEventTypes);

  if (response && response.status === 200) {
    const { data } = response.data;

    yield put({
      type: setActivitiesData.type,
      payload: {
        eventTypes: data,
      },
    })
  }

  yield put({
    type: setActivitiesData.type,
    payload: {
      loadingEventTypes: false,
    },
  })
}
  
export default function* rootSaga() {
  yield all([
    takeEvery(fetchActivitiesList.type, getActivitiesList),
    takeEvery(fetchActivityDetails.type, getActivityDetails),
    takeEvery(fetchEventTypes.type, getEventTypes)
  ])
}
