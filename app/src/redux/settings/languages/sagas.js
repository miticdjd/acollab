import { all, takeEvery, put, call } from 'redux-saga/effects';
import * as languagesService from "../../../services/http-services/settings/languages";
import { 
    fetchLanguagesList,
    addLanguage,
    editLanguage,
    deleteLanguage,
    refreshErrors,
    setLanguagesData } from './languagesSlice';
import { toast } from 'react-toastify';
import { push } from "redux-first-history";

export function* getLanguagesListWithPagination({ payload }) {
  const { perPage, key, sortDirection, currentPage} = payload;

  yield put({
    type: setLanguagesData.type,
    payload: {
      loadingList: true,
    },
  });

  const response = yield call(languagesService.getLanguagesWithPagination, perPage , key, sortDirection, currentPage);

  if (response && response.status === 200) {
    const { data } = response;

    yield put({
      type: setLanguagesData.type,
      payload: {
        languagesList: data.data,
        languagesMeta: data.meta
      },
    })
  }

  yield put({
    type: setLanguagesData.type,
    payload: {
      loadingList: false,
    },
  })
}

export function* languageAdd({ payload }) {
  const {values} = payload;

  yield put({
    type: setLanguagesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(languagesService.addLanguage, values);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/languages'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setLanguagesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setLanguagesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* languageEdit({ payload }) {
  const { id, reqBody } = payload;

  yield put({
    type: setLanguagesData.type,
    payload: {
      isSubmitting: true,
    },
  })

  const response = yield call(languagesService.editLaanguage, id, reqBody);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;

    toast.success(data.message);
    yield put(push('/settings/languages'));
  }

  if (response && response.status >= 400 && response.status <= 422) {
    if (response.data.errors) {
      yield put({
        type: setLanguagesData.type,
        payload: {
          errors: response.data.errors,
        }
      });
    }
  }

  yield put({
    type: setLanguagesData.type,
    payload: {
      isSubmitting: false,
    },
  })
}

export function* languageDelete({ payload }) {
  const { id, perPage, key, sortDirection, currentPage } = payload;

  const response = yield call(languagesService.deleteLanguage, id);

  if (response && response.status >= 200 && response.status <= 201) {
    const { data } = response;
    toast.success(data.message);
    return yield call(getLanguagesListWithPagination.bind(null, { payload: { perPage, key, sortDirection, currentPage }}))
  }

  if (response && response.status >= 400 && response.status <= 422) {
    toast.error(response.data.message);
  }
}

export function* languagesRefreshErrors() {
    yield put({
      type: setLanguagesData.type,
      payload: {
        errors: {},
      },
    })
  }
  

export default function* rootSaga() {
  yield all([
    takeEvery(refreshErrors.type, languagesRefreshErrors),
    takeEvery(fetchLanguagesList.type, getLanguagesListWithPagination),
    takeEvery(addLanguage.type, languageAdd),
    takeEvery(editLanguage.type, languageEdit),
    takeEvery(deleteLanguage.type, languageDelete),
  ])
}
