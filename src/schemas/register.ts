import * as Yup from "yup";

const RegisterSchema = Yup.object({
  name: Yup.string()
    .required("Please provide your name")
    .min(2, "Name should be at least 2 characters long")
    .max(30, "Name cannot be more than 30 characters long"),
  email: Yup.string()
    .email()
    .matches(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please provide valid email",
    )
    .required("Please enter valid email"),
  password: Yup.string()
    .required("Please enter valid password")
    .min(1, "password should be at least one character long"),
});

export default RegisterSchema;
