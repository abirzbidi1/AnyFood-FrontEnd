import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Button,
  TextField,
  Typography,
  Card,
  CardHeader,
  CardContent,
} from '@mui/material';
import { useAddRestaurantMutation } from '../../../../../redux/api/restaurant/restoApi';

const validationSchema = yup.object({
  logo: yup
    .mixed()
    .required('Logo is required'),
  name: yup.string().required('Name is required'),
  address: yup.string().required('Address is required'),
  description: yup.string().required('Description is required'),
  phoneNumber: yup.string().required('Phone Number is required'),
});
type Props = {
  getRestaurantId: (id: number | string) => void
}
const RestaurantForm: React.FC<Props> = ({ getRestaurantId }) => {
  const [addRestaurant, { isLoading }] = useAddRestaurantMutation();
  const formik = useFormik({
    initialValues: {
      logo: '',
      name: '',
      address: '',
      description: '',
      phoneNumber: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const result = await addRestaurant(values);
        getRestaurantId(result?.data.results.id);
        formik.resetForm();
      } catch (error) {
        console.error('Error adding restaurant', error);
      }
    },
  });
  return (
    <Card>
      <CardHeader>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <input
            type="file"
            id="logo"
            name="logo"
            accept="image/*"
            onChange={(event) => {
              formik.setFieldValue('logo', event.currentTarget.files?.[0]);
            }}
            onBlur={formik.handleBlur}
          />
          <TextField
            fullWidth
            id="name"
            name="name"
            label="Restaurant name"
            variant="outlined"
            margin="normal"
            value={formik.values.name}
            onChange={formik.handleChange}
            error={formik.touched.name && Boolean(formik.errors.name)}
            helperText={formik.touched.name && formik.errors.name}
          />
          <TextField
            fullWidth
            id="address"
            name="address"
            label="Address"
            variant="outlined"
            margin="normal"
            value={formik.values.address}
            onChange={formik.handleChange}
            error={formik.touched.address && Boolean(formik.errors.address)}
            helperText={formik.touched.address && formik.errors.address}
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
          <TextField
            fullWidth
            id="phoneNumber"
            name="phoneNumber"
            label="Phone number"
            variant="outlined"
            margin="normal"
            value={formik.values.phoneNumber}
            onChange={formik.handleChange}
            error={formik.touched.phoneNumber && Boolean(formik.errors.phoneNumber)}
            helperText={formik.touched.phoneNumber && formik.errors.phoneNumber}
          />
          <Button
            type="submit"
            variant="contained"
            color="success"
            disabled={formik.isSubmitting}
          >
           {isLoading?'Loading...':'Add'}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default RestaurantForm;
