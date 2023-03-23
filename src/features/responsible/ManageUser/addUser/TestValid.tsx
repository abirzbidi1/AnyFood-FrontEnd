import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: yup.string().required().email(),
    password: yup.string().required().min(6),
   // image: yup.mixed().required(),
    phoneNumber: yup.string().required(),
  //  isResponsible: yup.boolean().required(),
}).required();
type FormData = yup.InferType<typeof schema>;

export default function TestValid() {
    const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
        resolver: yupResolver(schema)
    });
    const onSubmit = (data: FormData) => console.log(data);

    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <input {...register("firstName")} />
            <p>{errors.firstName?.message}</p>

            <input {...register("lastName")} />
            <p>{errors.lastName?.message}</p>

            <input {...register("email")} />
            <p>{errors.email?.message}</p>

            <input {...register("password")} />
            <p>{errors.password?.message}</p>

            <input {...register("phoneNumber")} />
            <p>{errors.phoneNumber?.message}</p>

            <input type="submit" value='add' />
        </form>
    );
}
