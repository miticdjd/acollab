import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as userService from '../../services/http-services/userProfile';
import { setUser, profileUpdate, passwordUpdate, refreshErrors } from './userProfileSlice';
import { setAuthData } from '../auth/authSlice';
import { toast } from 'react-toastify';

export function* userProfileUpdate({ payload }) {
  yield put({
    type: setUser.type,
    payload: {
      isProfileSubmitting: true,
    },
  });

  const response = yield call(userService.updateUserProfile, payload);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setAuthData.type,
      payload: {
        user: data.data,
      }
    });
    toast.success(data.message);
  }

  if (response && response.status >= 400 && response.status <= 422) {
    yield put({
      type: setUser.type,
      payload: {
        errors: response.data.errors,
      }
    });
  }

  yield put({
    type: setUser.type,
    payload: {
      isProfileSubmitting: false,
    },
  })
}

export function* userPasswordUpdate({ payload }) {
  const { password_current, password, password_confirmation } = payload;

  yield put({
    type: setUser.type,
    payload: {
      isPasswordSubmitting: true,
      resetPasswordForm: false,
    },
  });

  const response = yield call(userService.updateUserPassword, { password_current, password, password_confirmation });

  if (response && response.status === 200) {
    const { data } = response;
    toast.success(data.message);
    yield put({
      type: setUser.type,
      payload: {
        resetPasswordForm: true,
      }
    });
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setUser.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setUser.type,
    payload: {
      isPasswordSubmitting: false,
    },
  })
}

export function* userRefreshErrors() {
  yield put({
    type: setUser.type,
    payload: {
      errors: {},
    },
  })
}

export default function* rootSaga() {
  yield all([
    takeEvery(profileUpdate.type, userProfileUpdate),
    takeEvery(passwordUpdate.type, userPasswordUpdate),
    takeEvery(refreshErrors.type, userRefreshErrors),
  ])
}
