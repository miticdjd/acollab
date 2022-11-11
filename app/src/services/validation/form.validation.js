import * as yup from 'yup';
import i18next from '../../i18n';

const emailValidation = {
    email: yup
      .string(i18next.t('validation.must_be_string', { field: i18next.t('email') }))
      .email(i18next.t('validation.enter_valid_email'))
      .required(i18next.t('validation.field_required', { field: i18next.t('email') }))
  };

const passwordValidation = {
    password: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.password') }))
        .min(6, i18next.t('validation.minimum_characters', { number: 6, field: i18next.t('label.password') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.password') }))
};

const passwordConfirmValidation = {
    password_confirmation: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.confirm_password') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.confirm_password') }))
        .oneOf([yup.ref('password'), null], i18next.t('validation.passwords_must_match'))
};

const passwordOptionalValidation = {
    password: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.password') }))
        .min(6, i18next.t('validation.minimum_characters', { number: 6, field: i18next.t('label.password') }))
};

const passwordConfirmOptionalValidation = {
    password_confirmation: yup
        .string()
        .when('password', {
            is: value => value && value !== '',
            then: yup
                .string(i18next.t('validation.must_be_string', { field: i18next.t('label.confirm_password') }))
                .oneOf([yup.ref('password'), null], i18next.t('validation.passwords_must_match'))
                .required(i18next.t('validation.field_required', { field: i18next.t('label.confirm_password') }))
        })
};
    
const firstNameValidation = {
    first_name: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.first_name') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.first_name') })),
};

const lastNameValidation = {
    last_name: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.last_name') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.last_name') })),
};

const currentPasswordValidation = {
    password_current: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.password') }))
        .min(6, i18next.t('validation.minimum_characters', { number: 6, field: i18next.t('label.password') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.password') }))
};

const newPasswordValidation = {
    password: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.password') }))
        .min(6, i18next.t('validation.minimum_characters', { number: 6, field: i18next.t('label.password') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.password') }))
};

const newPasswordConfirmValidation = {
    password_confirmation: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.confirm_password') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.confirm_password') }))
        .oneOf([yup.ref('password'), null], i18next.t('validation.passwords_must_match'))
};

const nameValidation = {
    name: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.name') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.name') })),
}

//auth forms validation
export const LOGIN = yup.object({
    ...emailValidation,
    ...passwordValidation
});

export const FORGOT_PASSWORD = yup.object({
    ...emailValidation
});

export const RESET_PASSWORD = yup.object({
    ...passwordValidation,
    ...passwordConfirmValidation
});


//user profile forms validation
export const USER_PROFILE = yup.object({
    ...firstNameValidation,
    ...lastNameValidation,
    ...emailValidation
});

export const USER_PROFILE_PASSWORD = yup.object({
    ...currentPasswordValidation,
    ...newPasswordValidation,
    ...newPasswordConfirmValidation
});

export const GENERAL_SETTINGS = yup.object({
    ...nameValidation
});

export const ROLE_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const USER_SETTINGS_FORM = yup.object({
    ...firstNameValidation,
    ...lastNameValidation,
    ...emailValidation,
    ...passwordOptionalValidation,
    ...passwordConfirmOptionalValidation
});