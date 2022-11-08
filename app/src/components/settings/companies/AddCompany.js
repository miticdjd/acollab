import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Formik, Form } from "formik";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
  CRow,
} from "@coreui/react";

import InputText from "../../common/form/InputText";
import DropdownSelect from "../../common/form/DropdownSelect";
import InputDatePicker from "../../common/form/InputDatePicker";
import Spinner from "../../common/spinner/Spinner";
import { hasPermission } from "../../../services/helpers/autorization";
import { PERMISSION_SETTINGS_WRITE } from "../../../constants/permissions";
import { COMPANY_SETTINGS_FORM } from "../../../services/validation/form.validation";
import {
  refreshErrors,
  addCompany,
} from "../../../redux/settings/companies/companiesSlice";
import { fetchAllCitiesList } from "../../../redux/settings/cities/citiesSlice";
import Checkbox from "../../common/form/Checkbox";
import { returnDefaultMomentFormatForDB } from "../../../services/helpers/date-helper";
import AddressInputGroup from "../../common/form/AddressInputGroup";

const AddCompany = () => {
  const addCompanyForm = useRef();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { permissions } = useSelector((state) => state.auth);
  const { errors, isSubmitting } = useSelector((state) => state.companies);
  const { allCities } = useSelector((state) => state.cities);
  const [expireDate, setExpireDate] = useState();
  const statuses = [
    { id: 1, name: "Active", bgColor: "bg-success" },
    { id: 2, name: "Paused", bgColor: "bg-warning" },
    { id: 3, name: "Closed", bgColor: "bg-danger" },
  ];

  const canWriteCompany = hasPermission(permissions, PERMISSION_SETTINGS_WRITE);

  const handleAddCompanyFormSave = () => addCompanyForm.current.submitForm();
  const handleAddCompanyFormSubmit = (values) => {
    const reqBody = {
      name: values.name,
      name_business: values.name_business,
      name_short: values.name_short,
      company_id: values.company_id,
      incorporation_date: values.incorporation_date,
      in_vat: values.in_vat,
      vat: values.vat,
      vat_id: values.vat_id,
      email: values.email,
      address: {
        country_id: values.country_id,
        city_id: values.city_id,
        street: values.street,
        number: values.number,
        apartment: values.apartment ? values.apartment : undefined,
        floor: values.floor ? values.floor : undefined,
        additional_info: values.additional_info
          ? values.additional_info
          : undefined,
      },
    };

    dispatch(addCompany({ reqBody }));
  };

  const handleCancel = () => navigate("/settings/companies");
  const onCitySelected = (e) => {
    addCompanyForm.current.setFieldValue("city_id", e.target.value);
    const selectedCityObject = allCities.find((city) => {
      return city.id.toString() === e.target.value.toString();
    });
    addCompanyForm.current.setFieldValue(
      "country_id",
      selectedCityObject.country_id
    );
  };

  const handleRadioChange = (e) => {
    e.target.value === "true"
      ? addCompanyForm.current.setFieldValue("in_vat", true)
      : addCompanyForm.current.setFieldValue("in_vat", false);
  };

  useEffect(() => {
    if (errors && Object.keys(errors).length > 0) {
      addCompanyForm.current.setSubmitting(false);
      addCompanyForm.current.setErrors(errors);

      dispatch(refreshErrors());
    }
  }, [errors, dispatch]);

  useEffect(() => {
    dispatch(fetchAllCitiesList());
  }, [dispatch]);

  return (
    <CRow>
      <CCol>
        <CCard>
          <CCardHeader className="bg-white">
            {t("label.create_new_company")}
          </CCardHeader>
          <CCardBody className="mb-100">
            <Formik
              innerRef={addCompanyForm}
              validationSchema={COMPANY_SETTINGS_FORM}
              onSubmit={handleAddCompanyFormSubmit}
              enableReinitialize={true}
              initialValues={{
                name: "",
                name_business: "",
                name_short: "",
                company_id: "",
                status_id: "",
                incorporation_date: "",
                in_vat: false,
                vat: "",
                vat_id: "",
                email: "",
                country_id: "",
                city_id: "",
                street: "",
                number: "",
                floor: "",
                apartment: "",
                additional_info: "",
              }}
            >
              {({ handleSubmit, touched, errors, values, handleChange }) => (
                <Form noValidate onSubmit={handleSubmit}>
                  <InputText
                    field="name"
                    placeholder={t("placeholder.name")}
                    label={t("label.name")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <InputText
                    field="name_business"
                    placeholder={t("placeholder.name_business")}
                    label={t("label.name_business")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <InputText
                    field="name_short"
                    placeholder={t("placeholder.name_short")}
                    label={t("label.name_short")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <InputText
                    field="company_id"
                    placeholder={t("placeholder.company_number")}
                    label={t("label.company_number")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  {statuses?.length && (
                    <DropdownSelect
                      field="status_id"
                      options={statuses}
                      placeholder={t("placeholder.please_select_status")}
                      label={t("label.status")}
                      values={values}
                      touched={touched}
                      errors={errors}
                      handleChange={handleChange}
                    ></DropdownSelect>
                  )}
                  <InputDatePicker
                    date={expireDate}
                    maxDate={new Date()}
                    handleDateChange={(date) => {
                      addCompanyForm.current.setFieldValue(
                        "incorporation_date",
                        date ? returnDefaultMomentFormatForDB(date) : ""
                      );
                      setExpireDate(date);
                    }}
                    label={t("label.incorporation_date")}
                    field="incorporation_date"
                    placeholder={t("placeholder.incorporation_date")}
                    errors={errors}
                    touched={touched}
                  />
                  <InputText
                    field="vat_id"
                    placeholder={t("placeholder.vat_id")}
                    label={t("label.vat_id")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <Checkbox
                    type="radio"
                    options={[
                      { id: false, name: "false" },
                      { id: true, name: "true" },
                    ]}
                    field="in_vat"
                    label={t("label.in_vat")}
                    touched={touched}
                    errors={errors}
                    values={values}
                    handleChange={handleRadioChange}
                    className="mb-3"
                  />
                  <InputText
                    field="vat"
                    placeholder={t("placeholder.vat")}
                    label={t("label.vat")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    disabled={!values.in_vat}
                    handleChange={handleChange}
                  />
                  <InputText
                    field="email"
                    placeholder={t("placeholder.email")}
                    label={t("label.email")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                  />
                  <AddressInputGroup
                    titleLabel={t("address")}
                    values={values}
                    touched={touched}
                    errors={errors}
                    handleChange={handleChange}
                    handleCityChange={onCitySelected}
                    countryField="country_id"
                    cityField="city_id"
                    streetField="street"
                    numberField="number"
                    floorField="floor"
                    apartmentField="apartment"
                    additionalInfoField="additional_info"
                  />
                </Form>
              )}
            </Formik>
          </CCardBody>
          {canWriteCompany && (
            <CCardFooter className="bg-white">
              <CButton
                type="button"
                color="primary"
                className="is-btn me-3"
                onClick={handleAddCompanyFormSave}
                disabled={isSubmitting}
              >
                {isSubmitting ? <Spinner smallSize={true} /> : ""}
                {t("label.save")}
              </CButton>
              <CButton
                type="reset"
                color="danger"
                className="is-btn"
                onClick={handleCancel}
              >
                {t("label.cancel")}
              </CButton>
            </CCardFooter>
          )}
        </CCard>
      </CCol>
    </CRow>
  );
};

export default AddCompany;
