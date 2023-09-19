import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Container,
} from '@mui/material';
import { useAddSupplementMutation } from '../../../../../redux/api/menu/menuApi';

const validationSchema = yup.object({
  image:  yup
  .mixed()
  .required('Image is required'),
  name: yup.string().required('Name is required'),
  price: yup.string().required('Price is required'),
});

type Props = {
  sectionId: (number | string);
}
const SupplementForm: React.FC<Props> = ({ sectionId }) => {
  const [addSupplement, { isLoading }]  = useAddSupplementMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      price: '',
      image: '',
      sectionId:sectionId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
       const result= await addSupplement(values);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding supplement', error);
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
          label="Supplement name"
          variant="outlined"
          margin="normal"
          value={formik.values.name}
          onChange={formik.handleChange}
          error={formik.touched.name && Boolean(formik.errors.name)}
          helperText={formik.touched.name && formik.errors.name}
        />
  <TextField
          fullWidth
          id="price"
          name="price"
          label="Price"
          variant="outlined"
          margin="normal"
          value={formik.values.price}
          onChange={formik.handleChange}
          error={formik.touched.price && Boolean(formik.errors.price)}
          helperText={formik.touched.price && formik.errors.price}
        />
        <Button
          type="submit"
          variant="contained"
          color="success"
          disabled={formik.isSubmitting}
        >
          {isLoading? 'Loading...': 'Add'}
        </Button>
      </form>
    </Container>
  );
};

export default SupplementForm;
