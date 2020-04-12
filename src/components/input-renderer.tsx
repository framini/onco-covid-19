import React from 'react';
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
} from '@chakra-ui/core';
import { Field, FieldValidator, FieldProps } from 'formik';

interface InputFieldProps {
  id: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  validate?: FieldValidator;
}

const defaultValidate = (name: string) => (value: string) => {
  let error;

  if (!value) {
    error = `${name} es requerido.`;
  }

  return error;
};

export const InputField = ({
  id,
  name,
  helpText,
  placeholder = '',
  validate: propsValidate,
}: InputFieldProps) => {
  const validate = React.useMemo(() => {
    return defaultValidate(name);
  }, [name]);

  return (
    <Field name={id} validate={propsValidate ?? validate}>
      {({ field, form }: FieldProps) => (
        <FormControl
          // @ts-ignore
          isInvalid={typeof form.errors.name !== undefined && form.touched.name}
        >
          <FormLabel htmlFor={id}>{name}</FormLabel>
          <Input {...field} id={id} placeholder={placeholder} />
          {helpText && (
            <FormHelperText id={`${name}-helper-text`}>
              {helpText}
            </FormHelperText>
          )}
          <FormErrorMessage>{form.errors.name}</FormErrorMessage>
        </FormControl>
      )}
    </Field>
  );
};
