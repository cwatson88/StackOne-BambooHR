/*
test the employee API  */

import { Request, Response } from 'express';
import { expect, jest, test } from '@jest/globals';
import { app } from '../src/app';
import request from 'supertest';

jest.mock('axios');

test('Test the root path', () => {
  test('It should response the GET method', async () => {
    const response = await request(app).get('/');
    expect(response.statusCode).toBe(200);
  });
});
