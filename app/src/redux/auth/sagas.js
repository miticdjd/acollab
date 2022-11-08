import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as authService from '../../services/http-services/auth';
import { login, logout, forgotPassword, resetPassword, setAuthData } from './authSlice';
import { push } from "redux-first-history";
import { toast } from 'react-toastify';

export function* userLogin({ payload }) {
  const { email, password } = payload;

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: true,
    },
  });

  const response = yield call(authService.login, email, password);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setAuthData.type,
      payload: {
        user: data.data.user,
        permissions: data.data.permissions,
        isAuthenticated: true,
      }
    });

    yield put(push('/dashboard'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setAuthData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: false,
    },
  })
}

export function* userLogout() {
  yield call(authService.logout);

  yield put({
    type: setAuthData.type,
    payload: {
      user: {},
      isAuthenticated: false,
      loadingDetails: false,
    },
  })
}

export function* userForgotPassword({ payload }) {
  const { email } = payload;

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: true,
    },
  });

  const response = yield call(authService.forgotPassword, email);

  if (response && response.status === 200) {
    const { data } = response;

    toast.success(data.message);

    yield put({
      type: setAuthData.type,
      payload: {
        loadingDetails: false,
      },
    });

    yield put(push('/auth/login'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setAuthData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: false,
    },
  })
}

export function* userResetPassword({ payload }) {
  const { token, password, password_confirmation } = payload;
  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: true,
    },
  });

  const response = yield call(authService.resetPassword, token, password, password_confirmation);

  if (response && response.status === 200) {
    const { data } = response;

    toast.success(data.message);

    yield put(push('/auth/login'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.success(response.data.message);
    if (response.data.errors) {
     
      yield put({
        type: setAuthData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: false,
    },
  });
}

export function* fetchWho() {
  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: true,
    },
  });

  const response = yield call(authService.fetchWho);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setAuthData.type,
      payload: {
        user: data.data.user,
        permissions: data.data.permissions,
        isAuthenticated: true
      },
    })
  }

  yield put({
    type: setAuthData.type,
    payload: {
      loadingDetails: false
    },
  })
}

// export function* userRefreshErrors() {
//   yield put({
//     type: setAuthData.type,
//     payload: {
//       errors: {},
//     },
//   })
// }

export default function* rootSaga() {
  yield all([
    takeEvery(login.type, userLogin),
    takeEvery(logout.type, userLogout),
    takeEvery(forgotPassword.type, userForgotPassword),
    takeEvery(resetPassword.type, userResetPassword),
    fetchWho()
  ])
}
