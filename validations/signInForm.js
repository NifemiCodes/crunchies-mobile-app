import * as yup from "yup";

export const realUserSchema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(15).required(),
});
