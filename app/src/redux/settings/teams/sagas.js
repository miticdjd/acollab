import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as teamsService from "../../../services/http-services/settings/teams";
import { 
    fetchTeamsList,
    fetchAllTeamsList,
    addTeam,
    editTeam,
    deleteTeam,
    refreshErrors,
    setTeamsData } from './teamsSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getTeamsListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setTeamsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(teamsService.getTeamsWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setTeamsData.type,
      payload: {
        teamsList: data.data,
        teamsMeta: data.meta
      },
    })
  }

  yield put({
    type: setTeamsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* getAllTeams() {
  yield put({
    type: setTeamsData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(teamsService.getTeams);

  if (response && response.status === 200) {
    yield put({
      type: setTeamsData.type,
      payload: {
        allTeams: response.data.data,
      },
    })
  }

  yield put({
    type: setTeamsData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* teamAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setTeamsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(teamsService.addTeam, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/teams'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setTeamsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setTeamsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* teamEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setTeamsData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(teamsService.editTeam, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/teams'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setTeamsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setTeamsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* teamDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(teamsService.deleteTeam, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getTeamsListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* teamsRefreshErrors() {
    yield put({
      type: setTeamsData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, teamsRefreshErrors),
    takeEvery(fetchTeamsList.type, getTeamsListWithPagination),
    takeEvery(fetchAllTeamsList.type, getAllTeams),
    takeEvery(addTeam.type, teamAdd),
    takeEvery(editTeam.type, teamEdit),
    takeEvery(deleteTeam.type, teamDelete),
  ])
}
