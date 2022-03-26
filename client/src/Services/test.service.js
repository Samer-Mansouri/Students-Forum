import api from './api';

class TestService {
  getTestContent() {
    return api.get('/users/test');
  }
}

export default new TestService();