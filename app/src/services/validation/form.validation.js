import * as yup from 'yup';

const emailValidation = {
    email: yup
      .string("Molimo Vas da unesete validnu e-mail adresu.")
      .email("Molimo Vas da unesete validnu e-mail adresu.")
      .required("Molimo Vas da unesete validnu e-mail adresu.")
  };

const passwordValidation = {
    password: yup
        .string("Lozinka je obavezno polje.")
        .min(6, "Lozinka mora da bude minimum 6 karaktera.")
        .required("Lozinka je obavezno polje.")
};

const passwordConfirmValidation = {
    password_confirmation: yup
        .string("Molimo da potvrdite lozinku.")
        .required("Molimo Vas da potvrdite lozinku.")
        .oneOf([yup.ref('password'), null], "Lozinke nisu iste.")
};

const passwordOptionalValidation = {
    password: yup
        .string()
        .min(6, "Lozinka mora da ima minimum 6 karaktera.")
};

const passwordConfirmOptionalValidation = {
    password_confirmation: yup
        .string()
        .when('password', {
            is: value => value && value !== '',
            then: yup
                .string("Molimo Vas da unesete validnu lozinku.")
                .oneOf([yup.ref('password'), null], "Lozinke nisu iste.")
                .required("Morate potvrditi lozinku.")
        })
};
    
const firstNameValidation = {
    first_name: yup
        .string("Ime je obavezno polje.")
        .required("Ime je obavezno polje."),
};

const lastNameValidation = {
    last_name: yup
        .string("Prezime je obavezno polje.")
        .required("Prezime je obavezno polje."),
};

const currentPasswordValidation = {
    password_current: yup
        .string()
        .min(6, "Lozinka mora da bude minimum 6 karaktera.")
        .required("Lozinka je obavezno polje.")
};

const newPasswordValidation = {
    password: yup
        .string()
        .min(6, "Lozinka mora da ima minimum 6 karaktera.")
        .required("Lozinka je obavezno polje.")
};

const newPasswordConfirmValidation = {
    password_confirmation: yup
        .string()
        .required("Molimo Vas da potvrdite lozinku.")
        .oneOf([yup.ref('password'), null], "Lozinke nisu iste.")
};

const nameValidation = {
    name: yup
        .string("Naziv je obavezno polje.")
        .required("Naziv je obavezno polje."),
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