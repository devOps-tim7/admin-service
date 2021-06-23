import supertest from 'supertest';
import { createServer } from '../../server';
import connection from '../helpers/Connection';
import User from '../models/User';
import UserService from '../services/UserService';
import { loggedIn } from '../middleware/Auth';
import { mocked } from 'ts-jest/utils';

jest.mock('../middleware/Auth');
const app = createServer();
const approveUserSpy = jest.spyOn(UserService, 'approveUser').mockResolvedValue();

describe('Agent request controller', () => {
  const user = new User({
    id: '3e0c2b1c-8659-462c-80d8-bcf7a99e9d53',
    username: 'admin',
    banned: false,
    fullName: 'Admin Admin',
  });
  beforeEach(async () => {
    await connection.clear();

    mocked(loggedIn, true).mockImplementation((req, _res, next) => {
      req.user = user;
      next();
    });
  });

  it('handle agent request', async () => {
    const persistedUser = await User.save(user);
    await supertest(app).post(`/api/admin/requests/${persistedUser.id}/approve`);
    expect(approveUserSpy).toBeCalled();
  });
});
