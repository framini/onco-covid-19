import React from 'react';
import { Formik, Form } from 'formik';
import { Button, Text, Box, Stack } from '@chakra-ui/core';

import { CenteredContent } from '../components/centered-content';
import { InputField } from '../components/input-renderer';
import { HeroSplitContent } from '../components/hero';
import { H1 } from '../components/h1';

interface ContactFields {
  name: string;
  email: string;
  dni: string;
  historyNum: string;
  phone: string;
  address: string;
}

const ContactPage = () => {
  const [formStatus, setFormStatus] = React.useState<'' | 'success' | 'error'>(
    '',
  );
  const initialValues: ContactFields = {
    name: '',
    email: '',
    dni: '',
    historyNum: '',
    phone: '',
    address: '',
  };

  return (
    <HeroSplitContent>
      <HeroSplitContent.Col
        backgroundColor="blue.100"
        padding={10}
        display="flex"
        flexDirection="column"
        // alignItems="flex-end"
        alignItems={['flex-start', 'flex-start', 'flex-end']}
      >
        <Box display="flex" flexDirection="column" alignItems={['flex-start']}>
          <Stack spacing={6}>
            <H1 textAlign="left" color="blue.900">
              Nuestra vías de contacto
            </H1>
            <Stack as="address" spacing={2}>
              <Text>Avenida San Martín 1645.</Text>
              <Text>Granadero Baigorria. Santa Fe. Argentina.</Text>
              <Text>Teléfono 0341-4711828 Int 251.</Text>
            </Stack>
          </Stack>
        </Box>
      </HeroSplitContent.Col>
      <HeroSplitContent.Col padding={10} maxW={600}>
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
        >
          {(props) => {
            return (
              <Form>
                <Stack spacing={4}>
                  <InputField id="name" name="Nombre y Apellido" required />

                  <InputField id="email" name="Email" required />

                  <InputField id="dni" name="DNI" required />

                  <InputField id="phone" name="Teléfono" required />

                  <InputField
                    id="historyNum"
                    name="Número de historia clínica (si lo recuerda)"
                  />

                  <InputField id="address" name="Dirección" />

                  <Button
                    mt={4}
                    variantColor="blue"
                    size="lg"
                    isLoading={props.isSubmitting}
                    type="submit"
                  >
                    Enviar
                  </Button>
                </Stack>
              </Form>
            );
          }}
        </Formik>
      </HeroSplitContent.Col>
    </HeroSplitContent>
  );
};

export default ContactPage;
