export interface EmployeeDirectory {
  fields: Field[];
  employees: BambooEmployee[];
}

export interface BambooEmployee {
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
  canUploadPhoto: boolean;
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
