// import express, service, and middleware
import { Router } from 'express';
import { getEmployees, paramsSchema, getEmployee } from './employees.service';
import { validateParams } from '../../middleware/validations';

const employeesRoute = Router()
  .get('/v1/employees', getEmployees)
  .get('/v1/employee/:id', validateParams(paramsSchema), getEmployee);

export default employeesRoute;
