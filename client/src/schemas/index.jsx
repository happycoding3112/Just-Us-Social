import * as Yup from "yup";

export const registrationSchema = Yup.object({
  name: Yup.string().min(3).required("Please enter your name"),
  username: Yup.string().min(3).required("Please enter a good username"),
  email: Yup.string().email().required("Please enter a valid email address"),
  password: Yup.string().min(6).required("Please enter a valid password"),
});
