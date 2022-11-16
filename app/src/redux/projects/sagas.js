import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as projectsService from "../../services/http-services/projects";
import { 
    setProjectsData,
    refreshErrors,
    fetchProjectsList,
    fetchAllProjectsList,
    addProject,
    editProject,
    deleteProject,
} from './projectsSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getProjectsListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setProjectsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(projectsService.getProjectsWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setProjectsData.type,
      payload: {
        projectsList: data.data,
        projectsMeta: data.meta
      },
    })
  }

  yield put({
    type: setProjectsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllProjects() {
  yield put({
    type: setProjectsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(projectsService.getProjects);

  if (response && response.status === 200) {
    yield put({
      type: setProjectsData.type,
      payload: {
        allProjects: response.data.data,
      },
    })
  }

  yield put({
    type: setProjectsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* projectAdd({ payload }) {
  const {reqBody} = payload;

  yield put({
    type: setProjectsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(projectsService.addProject, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/projects'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setProjectsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setProjectsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* projectEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setProjectsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(projectsService.editProject, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/projects'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setProjectsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setProjectsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* projectDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(projectsService.deleteProject, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getProjectsListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* projectsRefreshError() {
    yield put({
        type: setProjectsData.type,
        payload: {
        errors: {},
        },
    })
}

export default function* rootSaga() {
  yield all([
    takeEvery(fetchProjectsList.type, getProjectsListWithPagination),
    takeEvery(fetchAllProjectsList.type, getAllProjects),
    takeEvery(addProject.type, projectAdd),
    takeEvery(editProject.type, projectEdit),
    takeEvery(deleteProject.type, projectDelete),
    takeEvery(refreshErrors.type, projectsRefreshError),
  ])
}
