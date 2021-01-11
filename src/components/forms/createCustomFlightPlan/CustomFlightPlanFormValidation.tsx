import * as Yup from "yup";
import { CoordinateType } from "../../../models/FlightPlan";

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

export const NodeValidationSchema = Yup.object().shape({
  type: Yup.string().max(10, "Type has to be shorter than 10 characters").required(),
  ident: Yup.string().max(10, "ID has to be shorter than 10 characters").required(),
  name: Yup.string().max(100, "Name has to be shorter than 100 characters").required(),
  altitude: Yup.number().max(99999, "Altitude has to be below 100000").required(),
  tot: Yup.date().optional(),
  startDTOT: Yup.date().optional(),
  endDTOT: Yup.date().optional(),
  viaType: Yup.string().max(10, "Via type has to be shorter than 10 characters").optional(),
  viaIdent: Yup.string().max(10, "Via ID has to be shorter than 10 characters").optional(),
  coordinateType: Yup.number().required(),
  description: Yup.string().max(1000, "Description has to be shorter than 1000 characters").optional(),
  latitude: Yup.lazy(value => typeof value === 'number' ? 
    Yup.number().when('coordinateType', {
      is: CoordinateType.GPS,
      then: Yup.number().required(),
      otherwise: Yup.number().notRequired()
    }) : 
    Yup.string().when('coordinateType', {
      is: CoordinateType.LATLON,
      then: Yup.string().required(),
      otherwise: Yup.number().notRequired()
    })),
  longitude: Yup.lazy(value => typeof value === 'number' ? 
    Yup.number().when('coordinateType', {
      is: CoordinateType.GPS,
      then: Yup.number().required(),
      otherwise: Yup.number().notRequired()
    }) : 
    Yup.string().when('coordinateType', {
      is: CoordinateType.LATLON,
      then: Yup.string().required(),
      otherwise: Yup.number().notRequired()
    })),
  mgrs: Yup.string().when('coordinateType', {
    is: CoordinateType.MGRS,
    then: Yup.string().required(),
    otherwise: Yup.string().notRequired()
  })
});

export default NodeValidationSchema;