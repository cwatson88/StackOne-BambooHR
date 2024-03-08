/*
Tests for the employee API  
https://www.npmjs.com/package/supertest
*/

import { expect, jest, test } from '@jest/globals';
import { app } from '../src/app';
import request from 'supertest';

jest.mock('axios');

describe('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/v1/employees');
    expect(response.statusCode).toBe(200);
  });
});
