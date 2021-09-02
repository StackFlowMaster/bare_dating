import React from 'react';
import { useFormikContext } from 'formik';

import AppTextInput from '../AppTextInput';
import FormErrorMessage from './FormErrorMessage';

export default function FormField({ name, width, multi, ...otherProps }) {
  const {
    setFieldTouched,
    setFieldValue,
    values,
    errors,
    touched
  } = useFormikContext();

  return (
    <React.Fragment>
      <AppTextInput
        value={values[name]}
        onChangeText={text => setFieldValue(name, text)}
        onBlur={() => setFieldTouched(name)}
        width={width}
        multi={multi}
        {...otherProps}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </React.Fragment>
  );
}
