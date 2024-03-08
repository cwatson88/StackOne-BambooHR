import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';
import { Request, Response } from 'express';

dotenv.config();

const API_KEY = process.env.BAMBOO_API_KEY ?? '';

export interface EmployeeDirectory {
  fields: Field[];
  employees: BambooEmployee[];
}

export interface BambooEmployee {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  gender: string;
  jobTitle: string;
  workPhone: string;
  workPhoneExtension: null;
  skypeUsername: string;
  facebook: string;
}

export interface Field {
  id: string;
  type: string;
  name: string;
}

interface StackOneEmployee {
  id: string;
  first_name: string;
  last_name: string;
  name: string;
  display_name: string;
  date_of_birth?: Date;
  avatar_url?: string;
  personal_phone_number: string;
  work_email: string;
  job_title?: string;
  department: string;
  hire_date?: Date;
  tenure?: number;
  work_anniversary?: Date;
  employments: {
    start_date: number;
    title: number;
    manager_id: string;
  }[];
}

const options: AxiosRequestConfig = {
  method: 'GET',
  url: 'https://api.bamboohr.com/api/gateway.php/seewhatsondev/v1/employees/directory',
  headers: {
    Accept: 'application/json'
  },
  // auth will base64encode the username and password and set to Authorization header. Password is not used here and can be set to anything.
  auth: {
    username: API_KEY,
    password: 'randomstring'
  }
};

async function getEmployees(req: Request, res: Response) {
  try {
    const response = await axios.request(options);
    console.log(response.data);
    res.send(response.data);
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

export { getEmployees };
