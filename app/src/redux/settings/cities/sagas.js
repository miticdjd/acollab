import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as citiesService from "../../../services/http-services/settings/cities";
import { 
    fetchCitiesList,
    fetchAllCitiesList,
    addCity,
    editCity,
    deleteCity,
    refreshErrors,
    setCitiesData } from './citiesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getCitiesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setCitiesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(citiesService.getCitiesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setCitiesData.type,
      payload: {
        citiesList: data.data,
        citiesMeta: data.meta
      },
    })
  }

  yield put({
    type: setCitiesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllCities() {
  yield put({
    type: setCitiesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(citiesService.getCities);

  if (response && response.status === 200) {
    yield put({
      type: setCitiesData.type,
      payload: {
        allCities: response.data.data,
      },
    })
  }

  yield put({
    type: setCitiesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* cityAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setCitiesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(citiesService.addCity, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/cities'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCitiesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCitiesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* cityEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setCitiesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(citiesService.editCity, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/cities'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setCitiesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setCitiesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* cityDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(citiesService.deleteCity, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getCitiesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* citiesRefreshErrors() {
    yield put({
      type: setCitiesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, citiesRefreshErrors),
    takeEvery(fetchCitiesList.type, getCitiesListWithPagination),
    takeEvery(fetchAllCitiesList.type, getAllCities),
    takeEvery(addCity.type, cityAdd),
    takeEvery(editCity.type, cityEdit),
    takeEvery(deleteCity.type, cityDelete),
  ])
}
