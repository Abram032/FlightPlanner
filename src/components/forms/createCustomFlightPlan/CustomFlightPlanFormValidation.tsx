import * as Yup from "yup";

export const FlightPlanValidationSchema = Yup.object().shape({
  name: Yup.string()
    .max(100, "Name has to be shorter than 100 characters")
    .required("Name is required"),
  date: Yup.date()
    .required("Date is required"),
  description: Yup.string()
    .max(1000, "Description has to be shorter than 1000 characters")
    .optional()
    .nullable(),
  nodes: Yup.array()
    .required()
});

export default FlightPlanValidationSchema;