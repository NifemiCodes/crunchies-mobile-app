import * as yup from "yup";

export const newUserSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});
