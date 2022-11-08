import React, {useEffect} from "react";
import InputText from "./InputText";
import { useSelector, useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import InputGroupTitle from "./InputGroupTitle";
import DropdownSelect from "./DropdownSelect";
import InputTextarea from "./InputTextarea";
import { fetchAllCountriesList } from "../../../redux/settings/countries/countriesSlice";
import { fetchAllCitiesList } from "../../../redux/settings/cities/citiesSlice";

const AddressInputGroup = ({
  values,
  touched,
  errors,
  handleChange,
  streetField,
  numberField,
  floorField,
  apartmentField,
  countryField,
  cityField,
  additionalInfoField,
  titleLabel,
  handleCityChange
}) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { allCountries } = useSelector(state => state.countries);
  const { allCities } = useSelector(state => state.cities);


useEffect(() => {
    dispatch(fetchAllCountriesList());
}, [dispatch])

useEffect(() => {
    dispatch(fetchAllCitiesList());
}, [dispatch])
  return (
    <>
      <InputGroupTitle label={titleLabel}/>
      { allCountries?.length > 0 && 
          <DropdownSelect
              field={countryField}
              options={allCountries}
              placeholder={t('placeholder.please_select_country')}
              label={t('label.country')}
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleChange}>
          </DropdownSelect>
      }

      { allCities?.length > 0 && 
          <DropdownSelect
              field={cityField}
              options={allCities}
              placeholder={t('placeholder.please_select_city')}
              label={t('label.city')}
              values={values}
              touched={touched}
              errors={errors}
              handleChange={handleCityChange}>
          </DropdownSelect>
      }
      <InputText
        field={streetField}
        placeholder={t("placeholder.street")}
        label={t("label.street")}
        values={values}
        touched={touched}
        errors={errors}
        handleChange={handleChange}
      />
      <InputText
        field={numberField}
        placeholder={t("placeholder.address_number")}
        label={t("label.address_number")}
        values={values}
        touched={touched}
        errors={errors}
        handleChange={handleChange}
      />
      <InputText
        field={floorField}
        placeholder={t("placeholder.floor")}
        label={t("label.floor")}
        values={values}
        touched={touched}
        errors={errors}
        handleChange={handleChange}
      />
      <InputText
        field={apartmentField}
        placeholder={t("placeholder.apartment")}
        label={t("label.apartment")}
        values={values}
        touched={touched}
        errors={errors}
        handleChange={handleChange}
      />
      <InputTextarea
          field={additionalInfoField}
          placeholder={t('placeholder.additional_info')}
          label={t('label.additional_info')}
          values={values}
          touched={touched}
          errors={errors}
          handleChange={handleChange}
      />
    </>
  );
};

export default React.memo(AddressInputGroup);
