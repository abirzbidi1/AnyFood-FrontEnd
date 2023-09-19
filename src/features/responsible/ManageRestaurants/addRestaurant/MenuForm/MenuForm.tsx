import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Button, TextField, Container } from '@mui/material';
import { useAddMenuMutation } from '../../../../../redux/api/menu/menuApi';

const validationSchema = yup.object({
  name: yup.string().required('Name is required'),
  description: yup.string().required('Description is required'),
});
type Props = {
  restoId: (number | string);
  getMenuId: (id: number | string) => void
}
const MenuForm: React.FC<Props> = ({ restoId, getMenuId }) => {


  const [addMenu, { isLoading }] = useAddMenuMutation();
  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      restaurantId: restoId,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await addMenu(values);
        getMenuId(result?.data.results.id);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding menu', error);
      }
    },
  });
  return (
    <Container>
      <form onSubmit={formik.handleSubmit}>
        <TextField
          fullWidth
          id="name"
          name="name"
          label="Menu name"
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
          {isLoading? 'Loading':'Add'}
        </Button>
      </form>
    </Container>
  );
};

export default MenuForm;
