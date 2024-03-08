## Setup and Run Instructions

To set up and run the project, follow these steps:

1. Make sure you have Node.js installed. The project uses Node.js version 20.10.0 or later (but may run on earlier versions).

2. Install the project dependencies by running the following command:

   ```
   npm install
   ```

3. Create an `.env` file in the root directory of the project.

4. Add the following line to the `.env` file, replacing `yourkeyhere` with your actual API key:

   ```
   BAMBOO_API_KEY = "yourkeyhere"
   ```

5. Start the project by running the following command:

   ```
   npm start
   ```

6. Once the project is running, you can access it at [http://localhost:3000](http://localhost:3000)

That's it! You have successfully set up and run the project.

# Usage

The HR User Retrieval API provides access to employee information from the Bamboo HR system in StackOne Format. It allows for retrieving details of all employees or a specific employee by their ID.

## Prerequisites

Before you begin, ensure you have the following:

- Access to the Bamboo HR system.
- API keys or authentication credentials, if authentication is required.

## Configuration

To configure the API for use, set up your base URL and authentication credentials (if needed). The base URL for the API is `https://localhost:3000/v1`.

### Base URL

```text
https://localhost:3000/v1
```

## Using the API

### Get All Employees

To retrieve information on all employees:

```
GET /employees
```

#### Response

The response will be an array of employee objects in JSON format.

### Get Specific Employee

To retrieve information on a specific employee by their ID:

```
GET /employee/{id}
```

Replace `{id}` with the employee's ID.

#### Response

The response will be a single employee object in JSON format.

## Examples

### Request

Retrieve specific employee (ID: 5):

```curl
curl -X GET "https://localhost:3000/v1/employee/5"
```

### Response

```json
{
  "id": "5",
  "first_name": "Ashley",
  "last_name": "Adams",
  "name": "Ashley Adams",
  "display_name": "Ashley Adams",
  "personal_phone_number": "+44 207 555 6671",
  "work_email": "aadams@efficientoffice.com",
  "job_title": "HR Administrator",
  "department": "Human Resources",
  "employments": [
    {
      "start_date": "2023-11-08",
      "title": "Full-Time",
      "manager_id": ""
    }
  ],
  "manager": {
    "first_name": "Jennifer",
    "last_name": "Caldwell,"
  }
}
```
