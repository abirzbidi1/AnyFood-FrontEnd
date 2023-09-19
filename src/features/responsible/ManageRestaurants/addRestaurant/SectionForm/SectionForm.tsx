import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Container,
} from '@mui/material';
import { useAddSectionMutation } from '../../../../../redux/api/menu/menuApi';

const validationSchema = yup.object({
  image:  yup
  .mixed()
  .required('Logo is required'),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  menuId: yup.string().required('Phone Number is required'),
});

type Props = {
  menuId: (number | string);
  getSectionId: (id: number | string) => void
}
const SectionForm: React.FC<Props> = ({ menuId, getSectionId }) => {
  const [addSection, { isLoading }]  = useAddSectionMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      image: '',
      menuId:menuId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
       const result= await addSection(values);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding restaurant', error);
      }
    },
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
         <input
          type="file"
          id="image"
          name="image"
          accept="image/*" 
          onChange={(event) => {
            formik.setFieldValue('image', event.currentTarget.files?.[0]);
          }}
          onBlur={formik.handleBlur} 
        />
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Section name"
          variant="outlined"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />

        <TextField
          fullWidth
          id="description"
          name="description"
          label="Description"
          variant="outlined"
          margin="normal"
          value={formik.values.description}
          onChange={formik.handleChange}
          error={formik.touched.description && Boolean(formik.errors.description)}
          helperText={formik.touched.description && formik.errors.description}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={formik.isSubmitting}
        >
          { isLoading?'Loading':'Add' }
        </Button>
      </form>
    </Container>
  );
};

export default SectionForm;
