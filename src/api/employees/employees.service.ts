import { z } from 'zod';
import { EmployeeDirectory, getEmployeeDirectory } from '../../utils/bamboohr-api/employees';
import { AxiosError } from 'axios';
import { Response, Request } from 'express';

const paramsSchema = z.object({
  id: z.string()
});

async function getEmployees(req: Request, res: Response) {
  try {
    const response = await getEmployeeDirectory();
    if (!response) {
      throw new Error('No response from BambooHR API');
    }
    const data = response?.data as EmployeeDirectory | {};

    console.log(data);
    res.send(data);
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

export { getEmployees, paramsSchema };
