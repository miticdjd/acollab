import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as positionsService from "../../../services/http-services/settings/positions";
import { 
    fetchPositionsList,
    fetchAllPositionsList,
    addPosition,
    editPosition,
    deletePosition,
    refreshErrors,
    setPositionsData } from './positionsSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getPositionsListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setPositionsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(positionsService.getPositionsWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setPositionsData.type,
      payload: {
        positionsList: data.data,
        positionsMeta: data.meta
      },
    })
  }

  yield put({
    type: setPositionsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllPositions() {
  yield put({
    type: setPositionsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(positionsService.getPositions);

  if (response && response.status === 200) {
    yield put({
      type: setPositionsData.type,
      payload: {
        allPositions: response.data.data,
      },
    })
  }

  yield put({
    type: setPositionsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* positionAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setPositionsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(positionsService.addPosition, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/positions'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setPositionsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setPositionsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* positionEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setPositionsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(positionsService.editPosition, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/positions'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setPositionsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setPositionsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* positionDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(positionsService.deletePosition, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getPositionsListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* positionsRefreshErrors() {
    yield put({
      type: setPositionsData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, positionsRefreshErrors),
    takeEvery(fetchPositionsList.type, getPositionsListWithPagination),
    takeEvery(fetchAllPositionsList.type, getAllPositions),
    takeEvery(addPosition.type, positionAdd),
    takeEvery(editPosition.type, positionEdit),
    takeEvery(deletePosition.type, positionDelete),
  ])
}
