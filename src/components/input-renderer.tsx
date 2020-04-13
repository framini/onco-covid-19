import React from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Input,
  BoxProps,
} from '@chakra-ui/core';
import { Field, FieldValidator, FieldProps } from 'formik';

type InputFieldProps = {
  id: string;
  name: string;
  placeholder?: string;
  helpText?: string;
  validate?: FieldValidator;
  required?: boolean;
} & BoxProps;

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
  required = false,
  validate: propsValidate,
  ...restProps
}: InputFieldProps) => {
  const validate = React.useMemo(() => {
    return defaultValidate(name);
  }, [name]);

  const validateProp = required
    ? {
        validate: propsValidate ?? validate,
      }
    : {};

  return (
    <Box {...restProps}>
      <Field name={id} {...validateProp}>
        {({ field, form }: FieldProps) => {
          return (
            <FormControl
              // @ts-ignore
              isInvalid={
                typeof form.errors[id] !== 'undefined' && form.touched[id]
              }
            >
              <FormLabel htmlFor={id} color="gray.800">
                {name}
              </FormLabel>
              <Input {...field} id={id} placeholder={placeholder} />
              {helpText && (
                <FormHelperText id={`${name}-helper-text`} color="gray.700">
                  {helpText}
                </FormHelperText>
              )}
              <FormErrorMessage>{form.errors[id]}</FormErrorMessage>
            </FormControl>
          );
        }}
      </Field>
    </Box>
  );
};
