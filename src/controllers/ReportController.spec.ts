import supertest from 'supertest';
import { createServer } from '../../server';
import connection from '../helpers/Connection';
import Report from '../models/Report';
import Post from '../models/Post';
import PostService from '../services/PostService';
import UserService from '../services/UserService';

const app = createServer();

const removePostSpy = jest.spyOn(PostService, 'removePost').mockResolvedValue();
const banUserSpy = jest.spyOn(UserService, 'banUser').mockResolvedValue();

describe('Report controller', () => {
  const post = new Post({ id: null, user: null, removed: false });
  const report = new Report({ post: post });

  beforeEach(async () => {
    await connection.clear();
  });

  it('handle report request for remove', async () => {
    const persisted = await Report.save(report);
    await supertest(app).post(`/api/admin/reports/${persisted.id}/2`);
    expect(removePostSpy).toBeCalled();
  });

  it('handle report request for ban', async () => {
    const persisted = await Report.save(report);
    await supertest(app).post(`/api/admin/reports/${persisted.id}/3`);
    expect(banUserSpy).toBeCalled();
  });
});
