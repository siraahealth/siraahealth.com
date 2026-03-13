import * as yup from "yup";

export const vaccinationBookingSchema = yup.object().shape({
  parent_name: yup.string().required("Parent's name is required"),
  phone_number: yup
    .string()
    .required("Phone number is required")
    .matches(/^\d{10}$/, "Phone number must be exactly 10 digits"),
  child_age: yup.string(),
});
