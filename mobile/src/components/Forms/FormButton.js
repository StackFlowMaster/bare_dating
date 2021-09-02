import React from 'react';
import { useFormikContext } from 'formik';

import AppButton from '../AppButton';

export default function FormButton({ title, style, isLoading }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} style={style} isLoading={isLoading} onPress={handleSubmit} />;
}
