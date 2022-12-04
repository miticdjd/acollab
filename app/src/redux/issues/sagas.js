import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as issuesService from "../../services/http-services/issues";
import { 
    setIssuesData,
    refreshErrors,
    fetchIssuesList,
    fetchAllIssuesList,
    addIssue,
    editIssue,
    deleteIssue,
    fetchIssuesTypes,
    fetchIssuesStatuses,
} from './issuesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getIssuesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage, filters} = payload;

  yield put({
    type: setIssuesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response =
    filters
      ? yield call(issuesService.getIssuesWithFilters, perPage , key, sortDirection, currentPage, filters)
      : yield call(issuesService.getIssuesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setIssuesData.type,
      payload: {
        issuesList: data.data,
        issuesMeta: data.meta
      },
    })
  }

  yield put({
    type: setIssuesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllIssues() {
  yield put({
    type: setIssuesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(issuesService.getIssues);

  if (response && response.status === 200) {
    yield put({
      type: setIssuesData.type,
      payload: {
        allIssues: response.data.data,
      },
    })
  }

  yield put({
    type: setIssuesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllIssuesTypes() {
  const response = yield call(issuesService.getIssuesTypes);

  if (response && response.status === 200) {
    yield put({
      type: setIssuesData.type,
      payload: {
        issuesTypes: response.data.data,
      },
    })
  }
}

export function* getAllIssuesStatuses() {
  const response = yield call(issuesService.getIssuesStatuses);

  if (response && response.status === 200) {
    yield put({
      type: setIssuesData.type,
      payload: {
        issuesStatuses: response.data.data,
      },
    })
  }
}

export function* issueAdd({ payload }) {
  const {reqBody} = payload;

  yield put({
    type: setIssuesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(issuesService.addIssue, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/issues'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setIssuesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setIssuesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* issueEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setIssuesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(issuesService.editIssue, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/issues'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setIssuesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setIssuesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* issueDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(issuesService.deleteIssue, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getIssuesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* issuesRefreshError() {
    yield put({
        type: setIssuesData.type,
        payload: {
        errors: {},
        },
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchIssuesStatuses.type, getAllIssuesStatuses),
    takeEvery(fetchIssuesTypes.type, getAllIssuesTypes),
    takeEvery(fetchIssuesList.type, getIssuesListWithPagination),
    takeEvery(fetchAllIssuesList.type, getAllIssues),
    takeEvery(addIssue.type, issueAdd),
    takeEvery(editIssue.type, issueEdit),
    takeEvery(deleteIssue.type, issueDelete),
    takeEvery(refreshErrors.type, issuesRefreshError),
  ])
}
