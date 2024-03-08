// import express, service, and middleware
import { Router } from 'express';
import { getEmployees, paramsSchema } from './employees.service';
import { validateParams } from '../../middleware/validations';

const usersRoute = Router().get('/v1/employees/:id', validateParams(paramsSchema), getEmployees);

export default usersRoute;
