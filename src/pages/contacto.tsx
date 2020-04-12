import React from 'react';
import { Formik, Form } from 'formik';
import { Button } from '@chakra-ui/core';
import { CenteredContent } from '../components/centered-content';
import { InputField } from '../components/input-renderer';

interface ContactFields {
  name: string;
  email: string;
  dni: string;
}

const ContactPage = () => {
  const [formStatus, setFormStatus] = React.useState<'' | 'success' | 'error'>(
    '',
  );
  const initialValues: ContactFields = {
    name: '',
    email: '',
    dni: '',
  };

  return (
    <CenteredContent maxW={600}>
      <Formik
        initialValues={initialValues}
        onSubmit={(values, actions) => {
          fetch(
            'https://api.formik.com/submit/onco-covid-19/primera-vez-en-oncologia',
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify(values),
            },
          )
            .then((resp) => resp.json())
            .then((resp) => {
              actions.setSubmitting(false);
              if (resp.ok) {
                setFormStatus('success');
              } else {
                setFormStatus('error');
              }
            })
            .catch((e) => {
              setFormStatus('error');
            });
        }}
        render={(props) => {
          return (
            <Form>
              <InputField id="name" name="Nombre y Apellido" />

              <InputField id="email" name="Email" />

              <InputField id="dni" name="DNI" />

              <Button
                mt={4}
                variantColor="teal"
                isLoading={props.isSubmitting}
                type="submit"
              >
                Submit
              </Button>
            </Form>
          );
        }}
      />
    </CenteredContent>
  );
};

export default ContactPage;
