import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Container,
} from '@mui/material';
import { useAddItemMutation } from '../../../../../redux/api/menu/menuApi';

const validationSchema = yup.object({
  image:  yup
  .mixed()
  .required('Logo is required'),
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
  price: yup.string().required('Price is required'),
});

type Props = {
  sectionId: (number | string);
}
const ItemForm: React.FC<Props> = ({ sectionId }) => {
  const [addItem, { isLoading }]  = useAddItemMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      price: '',
      image: '',
      sectionId:sectionId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
       const result= await addItem(values);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding meal', error);
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
          label="Meal name"
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
          {isLoading? 'Loading...': 'Add'}
        </Button>
      </form>
    </Container>
  );
};

export default ItemForm;
