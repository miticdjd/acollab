import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as generalService from "../../../services/http-services/settings/general";
import { 
  setSettingsData,
  refreshErrors,
  fetchSettings,
  settingsUpdate
} from './generalSlice';
import { toast } from 'react-toastify';

export function* getGeneralSettings() {
    yield put({
      type: setSettingsData.type,
      payload: {
        loadingDetails: true,
      },
    });
  
    const response = yield call(generalService.fetchGeneralSettings);
  
    if (response && response.status === 200) {
      const { data } = response;
  
      yield put({
        type: setSettingsData.type,
        payload: {
          general: data.data
        },
      })
    }
  
    yield put({
      type: setSettingsData.type,
      payload: {
        loadingDetails: false
      },
    })
}
  

export function* updateGenaralSettings({ payload }) {
  const { values } = payload;

  yield put({
    type: setSettingsData.type,
    payload: {
      isSubmitting: true,
    },
  });

  const response = yield call(generalService.updateGenaralSettings, values);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setSettingsData.type,
      payload: {
        general: data.data,
      }
    });
    toast.success(data.message);
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setSettingsData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setSettingsData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* settingsRefreshErrors() {
  yield put({
    type: setSettingsData.type,
    payload: {
      errors: {},
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(settingsUpdate.type, updateGenaralSettings),
    takeEvery(refreshErrors.type, settingsRefreshErrors),
    takeEvery(fetchSettings.type, getGeneralSettings),
  ])
}
