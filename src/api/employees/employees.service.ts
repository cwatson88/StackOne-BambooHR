import { z } from 'zod';
import {
  EmployeeDirectory,
  bamboohrApiRequest,
  convertToStackOneEmployee,
  convertToStackOneEmployments
} from '../../utils/bamboohr-api/employees';
import { AxiosError } from 'axios';
import { Response, Request, response } from 'express';

const paramsSchema = z.object({
  id: z.coerce.number()
});

async function getEmployees(req: Request, res: Response): Promise<void> {
  try {
    // get the employee directory
    const response = await bamboohrApiRequest('employees/directory');
    if (!response.data) throw new Error('No employee data');

    console.log(response.data);
    // we only want to send the employees data
    res.send(response.data.employees);
  } catch (error: AxiosError | any) {
    console.error(error);
    if (error.response) {
      // AxiosError
      const { response } = error;
      res.status(response.status).send(response.data);
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send("Service Unavailable. Can't connect to the API.");
    } else {
      res.status(500).send("Internal Server Error. Can't get employees.");
    }
  }
}

async function getEmployee(req: Request, res: Response) {
  const { id } = req.params;

  try {
    // get the employee data by id
    const bambooEmployeeData = await bamboohrApiRequest(
      `employees/${id}?fields=displayName,firstName,lastName,preferredName,jobTitle,workPhone,mobilePhone,workEmail,department,location,division,linkedIn,instagram,pronouns,workPhoneExtension,supervisor,photoUploaded,photoUrl,canUploadPhoto,employmentHistoryStatus`
    );

    if (!bambooEmployeeData.data) {
      throw new Error('No employee data');
    }

    const bambooEmployee = bambooEmployeeData.data;
    const bambooEmploymentHistory = await bamboohrApiRequest(`employees/${bambooEmployee.id}/tables/employmentStatus/`);

    const history = convertToStackOneEmployments(bambooEmploymentHistory?.data ?? []);
    const employee = convertToStackOneEmployee(bambooEmployee, history);

    console.log(employee);
    res.send(employee);
  } catch (error: AxiosError | any) {
    console.error(error);
    if (error.response) {
      // AxiosError
      const { response } = error;
      res.status(response.status).send(response.data);
    } else if (error.code === 'ECONNREFUSED') {
      res.status(503).send("Service Unavailable. Can't connect to the API.");
    } else {
      res.status(500).send("Internal Server Error. Can't get employee data.");
    }
  }
}

export { getEmployees, getEmployee, paramsSchema };
