import { z } from 'zod';
import { bamboohrApiRequest } from '../../utils/bamboohr-api/employees';
import { AxiosError } from 'axios';
import { Response, Request } from 'express';

const paramsSchema = z.object({
  id: z.string()
});

const getEmployeeDirectory = () => bamboohrApiRequest('employees/directory');
const getEmployee = (id: string) =>
  bamboohrApiRequest(
    `employees/${id}?fields=displayName,firstName,lastName,preferredName,jobTitle,workPhone,mobilePhone,workEmail,department,location,division,linkedIn,instagram,pronouns,workPhoneExtension,supervisor,photoUploaded,photoUrl,canUploadPhoto,employmentHistoryStatus`
  );
const getEmployeeEmployment = (id: string) => bamboohrApiRequest(`employees/${id}tables/employmentStatus/`);
const getEmployeePhoto = (id: string) => bamboohrApiRequest(`employees/${id}/photo/small`);

async function getEmployees(req: Request, res: Response) {
  try {
    const response = await getEmployeeDirectory();
    if (!response.data) {
      res.status(204).send('No Content');
    }

    const data = response?.data as EmployeeDirectory;
    console.log(data);
    // we only want to send the employees data
    res.send(data.employees);
  } catch (error: AxiosError | any) {
    console.error(error);
    if (error.response) {
      // AxiosError
      const { response } = error;
      res.status(response.status).send(response.data);
    } else {
      res.status(500).send("Internal Server Error. Can't get employees.");
    }
  }
}

async function getEmployee(req: Request, res: Response) {
  try {
    const response = await getEmployee();
    if (!response.data) {
      res.status(204).send('No Content');
    }

    const data = response?.data as EmployeeDirectory;
    console.log(data);
    // we only want to send the employees data
    res.send(data.employees);
  } catch (error: AxiosError | any) {
    console.error(error);
    if (error.response) {
      // AxiosError
      const { response } = error;
      res.status(response.status).send(response.data);
    } else {
      res.status(500).send("Internal Server Error. Can't get employee data.");
    }
  }
}

export { getEmployees, paramsSchema };
