import axios, { AxiosRequestConfig } from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = process.env.BAMBOO_API_KEY ?? '';

export interface EmployeeDirectory {
  fields: Field[];
  employees: BambooEmployee[];
}

interface BambooEmployee {
  id: number;
  displayName: string;
  firstName: string;
  lastName: string;
  jobTitle: string;
  workPhone: string;
  mobilePhone: string;
  workEmail: string;
  department: string;
  location: string;
  division: string;
  linkedIn: string;
  instagram: string;
  pronouns: null;
  supervisor: string;
  photoUploaded: boolean;
  photoUrl: string;
  canUploadPhoto: number;
}

export interface Field {
  id: string;
  type: string;
  name: string;
}

export interface BambooEmployeeEmployment {
  id: string;
  employeeId: string;
  date: Date;
  employmentStatus: string;
  comment: string;
  terminationReasonId: string;
  terminationTypeId: string;
  terminationRehireId: string;
  terminationRegrettableId: string;
  benetracStatus: null;
  gusto: null;
}

export type StackOneEmployments = {
  start_date: Date;
  title: string;
  manager_id: string;
}[];

export interface StackOneEmployee {
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
  employments: StackOneEmployments;
  manager?: {
    first_name: string;
    last_name: string;
  };
}

function bamboohrApiRequest(url: string) {
  const options: AxiosRequestConfig = {
    method: 'GET',
    baseURL: 'https://api.bamboohr.com/api/gateway.php/seewhatsondev/v1/',
    url,
    headers: {
      Accept: 'application/json'
    },
    // auth will base64encode the username and password and set to Authorization header. Password is not used here and can be set to anything.
    auth: {
      username: API_KEY,
      password: 'randomstring'
    }
  };

  return axios.request(options);
}

// convert BambooEmployeeEmployments to StackOneEmployments
function convertToStackOneEmployments(bambooEmployeeEmployments: BambooEmployeeEmployment[]): StackOneEmployments {
  return bambooEmployeeEmployments.map((employment) => ({
    start_date: employment.date,
    title: employment.employmentStatus,
    manager_id: employment.terminationTypeId
  }));
}

// Convert BambooHR employee to StackOne employee
function convertToStackOneEmployee(
  bambooEmployee: BambooEmployee,
  employeeEmployment: StackOneEmployments
): StackOneEmployee {
  return {
    id: bambooEmployee.id.toString(),
    first_name: bambooEmployee.firstName,
    last_name: bambooEmployee.lastName,
    name: bambooEmployee.firstName + ' ' + bambooEmployee.lastName,
    display_name: bambooEmployee.displayName,
    personal_phone_number: bambooEmployee.mobilePhone,
    work_email: bambooEmployee.workEmail,
    job_title: bambooEmployee.jobTitle,
    department: bambooEmployee.department,
    employments: employeeEmployment ?? [],
    manager: {
      // Split the supervisor name into first and last name string is in the format "Last, First"
      first_name: bambooEmployee.supervisor.split(' ')[1],
      last_name: bambooEmployee.supervisor.split(' ')[0]
    }
  };
}

function addEmployeePhoto(employee: StackOneEmployee, photo: string) {
  employee.avatar_url = photo;
  return employee;
}

export { bamboohrApiRequest, convertToStackOneEmployments, convertToStackOneEmployee, addEmployeePhoto };
