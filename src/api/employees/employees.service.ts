import { z } from 'zod';
import {
  bamboohrApiRequest,
  convertToStackOneEmployee,
  convertToStackOneEmployments
} from '../../utils/bamboohr-api/employees';
import { AxiosError, AxiosResponse } from 'axios';
import { Response, Request } from 'express';
import { EmployeeDirectory, BambooEmployee, BambooEmployeeEmployment } from '../../utils/interfaces/employees';
import {
  bambooEmployeeDirectorySchema,
  bambooEmployeeEmploymentSchema,
  bambooEmployeeSchema
} from '../../utils/zod-schemas/employees.zod';

const paramsSchema = z.object({
  id: z.coerce.number()
});

async function getEmployees(req: Request, res: Response): Promise<void> {
  try {
    // get the employee directory
    const response: AxiosResponse<EmployeeDirectory> = await bamboohrApiRequest('employees/directory');

    if (!response.data) throw new Error('No employee data');

    // validate the response data using zod schema
    bambooEmployeeDirectorySchema.parse(response.data);
    console.log(response.data);
    // we only want to send the employees data
    res.send(response.data.employees);
  } catch (error) {
    handleApiError(error, res);
  }
}

async function getEmployee(req: Request, res: Response): Promise<void> {
  const { id } = req.params;
  try {
    // get the employee data by id
    const response: AxiosResponse<BambooEmployee> = await bamboohrApiRequest(
      `employees/${id}?fields=displayName,firstName,lastName,preferredName,jobTitle,workPhone,mobilePhone,workEmail,department,location,division,linkedIn,instagram,pronouns,workPhoneExtension,supervisor,photoUploaded,photoUrl,canUploadPhoto,employmentHistoryStatus`
    );

    if (!response.data) throw new Error('No employee data');

    // validate the response data using zod schema
    bambooEmployeeSchema.parse(response.data);

    const bambooEmployee = response.data;

    const employmentHistory = await getEmploymentHistory(bambooEmployee);

    const employee = convertToStackOneEmployee(bambooEmployee, employmentHistory);
    console.log(employee);
    res.send(employee);
  } catch (error) {
    handleApiError(error, res);
  }
}

// get the employment history of the employee
async function getEmploymentHistory(bambooEmployee: BambooEmployee) {
  const bambooEmploymentHistory: AxiosResponse<BambooEmployeeEmployment[]> = await bamboohrApiRequest(
    `employees/${bambooEmployee.id}/tables/employmentStatus/`
  );

  if (!bambooEmploymentHistory.data) throw new Error('No employee employment history data');

  // validate the response data using zod schema
  bambooEmployeeEmploymentSchema.parse(bambooEmploymentHistory.data);

  const history = convertToStackOneEmployments(bambooEmploymentHistory?.data ?? []);

  return history;
}

// handle errors from the BambooHR API
function handleApiError(error: AxiosError | any, res: Response): void {
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

export { getEmployees, getEmployee, paramsSchema };
