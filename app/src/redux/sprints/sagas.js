import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as sprintsService from "../../services/http-services/sprints";
import { 
    setSprintsData,
    refreshErrors,
    fetchSprintsList,
    fetchAllSprintsList,
    addSprint,
    editSprint,
    deleteSprint
} from './sprintsSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getSprintsListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setSprintsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(sprintsService.getSprintsWithPagination, perPage , key, sortDirection, currentPage)

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setSprintsData.type,
      payload: {
        sprintsList: data.data,
        sprintsMeta: data.meta
      },
    })
  }

  yield put({
    type: setSprintsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllSprints() {
  yield put({
    type: setSprintsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(sprintsService.getSprints);

  if (response && response.status === 200) {
    yield put({
      type: setSprintsData.type,
      payload: {
        allSprints: response.data.data,
      },
    })
  }

  yield put({
    type: setSprintsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* sprintAdd({ payload }) {
  const {reqBody} = payload;

  yield put({
    type: setSprintsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(sprintsService.addSprint, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/sprints'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setSprintsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setSprintsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* sprintEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setSprintsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(sprintsService.editSprint, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/sprints'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setSprintsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setSprintsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* sprintDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(sprintsService.deleteSprint, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getSprintsListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* sprintsRefreshError() {
    yield put({
        type: setSprintsData.type,
        payload: {
        errors: {},
        },
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchSprintsList.type, getSprintsListWithPagination),
    takeEvery(fetchAllSprintsList.type, getAllSprints),
    takeEvery(addSprint.type, sprintAdd),
    takeEvery(editSprint.type, sprintEdit),
    takeEvery(deleteSprint.type, sprintDelete),
    takeEvery(refreshErrors.type, sprintsRefreshError),
  ])
}
