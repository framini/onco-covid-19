import React from 'react';
import { Formik, Form } from 'formik';
import {
  Button,
  Text,
  Box,
  Stack,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
} from '@chakra-ui/core';

import { InputField } from '../components/input-field';
import { HeroSplitContent } from '../components/hero';
import { H1 } from '../components/h1';
import { Metatags } from '../components/metatags';
import { SelectField } from '../components/select-field';

type FormStatus = '' | 'success' | 'error';

interface ConfirmationProps {
  status: FormStatus;
}

const Confirmation = (props: ConfirmationProps) => {
  const [showConfirmation, setShowConfirmation] = React.useState(false);
  const onClose = React.useCallback(() => {
    setShowConfirmation(false);
  }, []);
  const { status } = props;

  React.useEffect(() => {
    if (status === 'error' || status === 'success') {
      setShowConfirmation(true);
    }
  }, [status]);

  const title =
    status === 'error' ? 'La consulta no pudo ser enviada' : 'Consulta enviada';
  const message =
    status === 'error'
      ? 'Lo sentimos. Su consulta no ha podido ser enviada. Por favor intente más tarde o envíenos directamente un email a: hddevaperon@gmail.com'
      : 'Su consulta ha sido enviada con éxito!';

  return (
    <Modal
      closeOnOverlayClick={false}
      isOpen={showConfirmation}
      onClose={onClose}
    >
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{title}:</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>{message}</ModalBody>

        <ModalFooter>
          <Button onClick={onClose}>Cerrar</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

interface ContactFields {
  name: string;
  email: string;
  dni: string;
  historyNum: string;
  phone: string;
  address: string;
  reason: string;
}

const ContactPage = () => {
  const [formStatus, setFormStatus] = React.useState<FormStatus>('');

  const initialValues: ContactFields = {
    name: '',
    email: '',
    dni: '',
    historyNum: '',
    phone: '',
    address: '',
    reason: '',
  };

  return (
    <>
      <Metatags
        title="Contacto - Hospital Escuela Eva Perón"
        description="Información general para pacientes en tratamiento oncológico"
      />

      <Confirmation status={formStatus} />

      <HeroSplitContent>
        <HeroSplitContent.Col
          backgroundColor="blue.100"
          padding={10}
          display="flex"
          flexDirection="column"
          // alignItems="flex-end"
          alignItems={['flex-start', 'flex-start', 'flex-end']}
        >
          <Box
            display="flex"
            flexDirection="column"
            alignItems={['flex-start']}
          >
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
                    actions.resetForm();
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
                    <SelectField
                      id="reason"
                      name="Motivo de la consulta"
                      required
                    >
                      <option value="Receta">Receta</option>
                      <option value="Banco de drogas">Banco de drogas</option>
                      <option value="Turno Quimioterapia">
                        Turno Quimioterapia
                      </option>
                      <option value="Turno para evaluación médica.">
                        Turno para evaluación médica.
                      </option>
                    </SelectField>

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
    </>
  );
};

export default ContactPage;
