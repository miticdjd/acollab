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

const phoneValidation = {
    phone: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.phone') }))
        .nullable()
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

const companyBusinessNameValidation = {
    name_business: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.name_bussines') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.name_business') })),
}

const companyShortNameValidation = {
    name_short: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.name_short') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.name_short') })),
}

const companyNumberValidation = {
    company_id: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.company_number') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.company_number') })),
}

const vatNumberValidation = {
    vat_id: yup
        .number()
        .typeError(i18next.t('validation.must_be_number', { field: i18next.t('label.vat_id') }))
        .positive(i18next.t('validation.must_be_positive_number', { field: i18next.t('label.vat_id') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.vat_id') })),
}

const inVatValidation = {
    in_vat: yup
    .boolean(),
}
const departmentsArrayValidation = {
    departments: yup
    .array()
}

const teamsArrayValidation = {
    teams: yup
    .array()
}

const vatValidation = {
    vat: yup
        .number()
        .when('in_vat', {
            is: value => value && value === true,
            then: yup
        .number()
        .typeError(i18next.t('validation.must_be_number', { field: i18next.t('label.vat') }))
        .positive(i18next.t('validation.must_be_positive_number', { field: i18next.t('label.vat') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.vat') })),
    })
}

const today = new Date();

const incorporationDateValidation = {
    incorporation_date: yup 
        .string()
        .max(today)
        .required(i18next.t('validation.field_required', { field: i18next.t('label.incorporation_date') })),
}

const taxValidation = {
    tax: yup
        .number()
        .typeError(i18next.t('validation.must_be_number', { field: i18next.t('label.tax') }))
        .positive(i18next.t('validation.must_be_positive_number', { field: i18next.t('label.tax') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.tax') })),
}

const codeValidation = {
    code: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.code') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.code') })),
}

const symbolValidation = {
    symbol: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.symbol') }))
        .required(i18next.t('validation.field_required', { field: i18next.t('label.symbol') })),
}
const selectedPositionValidation = {
    position_id: yup
        .string()
        .nullable(),
}

const selectedStatusValidation = {
    status_id: yup
        .string()
        .required(i18next.t('validation.field_required', { field: i18next.t('label.country') }))
        .nullable(),
}

const selectedCountryValidation = {
    country_id: yup
        .string()
        .nullable(),
}

const selectedCityValidation = {
    city_id: yup
        .string()
        .nullable(),
}

const addressStreetValidation = {
    street: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.street') }))
        .nullable()
}

const addressNumberValidation = {
    number: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.address_number') }))
        .nullable()
}

const addressFloorValidation = {
    floor: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.floor') }))
        .nullable()
}

const addressApartmentValidation = {
    apartment: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.apartment') }))
        .nullable()
}

const additionalInfoValidation = {
    additional_info: yup
        .string(i18next.t('validation.must_be_string', { field: i18next.t('label.additional_info') }))
        .nullable()
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
    ...emailValidation,
    ...phoneValidation,
    ...selectedCountryValidation,
    ...selectedCityValidation,
    ...addressStreetValidation,
    ...addressNumberValidation,
    ...addressFloorValidation,
    ...addressApartmentValidation,
});

export const USER_PROFILE_PASSWORD = yup.object({
    ...currentPasswordValidation,
    ...newPasswordValidation,
    ...newPasswordConfirmValidation
});

export const GENERAL_SETTINGS = yup.object({
    ...nameValidation,
    ...taxValidation
});

export const ROLE_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const USER_SETTINGS_FORM = yup.object({
    ...firstNameValidation,
    ...lastNameValidation,
    ...emailValidation,
    ...phoneValidation,
    ...departmentsArrayValidation,
    ...teamsArrayValidation,
    ...selectedPositionValidation,
    ...selectedCountryValidation,
    ...selectedCityValidation,
    ...addressStreetValidation,
    ...addressNumberValidation,
    ...addressFloorValidation,
    ...addressApartmentValidation,
    ...additionalInfoValidation,
    ...passwordOptionalValidation,
    ...passwordConfirmOptionalValidation
});

export const CURRENCY_SETTINGS_FORM = yup.object({
    ...nameValidation,
    ...codeValidation,
    ...symbolValidation
});

export const COUNTRY_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const COMPANY_TYPES_SETTINGS_FORM = yup.object({
    ...nameValidation,
    ...selectedCountryValidation
});

export const DEPARTMENT_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const TEAMS_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const POSITION_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const LANGUAGE_SETTINGS_FORM = yup.object({
    ...nameValidation
});

export const CITY_SETTINGS_FORM = yup.object({
    ...nameValidation,
    ...selectedCountryValidation
});

export const COMPANY_SETTINGS_FORM = yup.object({
    ...nameValidation,
    ...companyBusinessNameValidation,
    ...companyShortNameValidation,
    ...companyNumberValidation,
    ...selectedStatusValidation,
    ...incorporationDateValidation,
    ...vatNumberValidation,
    ...vatValidation,
    ...inVatValidation,
    ...emailValidation,
    ...selectedCountryValidation,
    ...selectedCityValidation,
    ...addressStreetValidation,
    ...addressNumberValidation,
    ...addressFloorValidation,
    ...addressApartmentValidation,
    ...additionalInfoValidation
});
