import api from './api';

class ForumService {
  getForum() {
    return api.get('/forum');
  }

  getQuestionDetails(id){
      return api.get(`/forum/${id}`);
  }

  createQuestion(data){
      return api.post('/forum/create', data);
  }

  createReplyOnQuestion(data, id){
      return api.post(`forum/reply/${id}`, data);
  }

  getQuestionReplies(id){
    return api.get(`forum/replies/${id}`)
  }

  verifyReplyOnComment(data){
      return api.put(`/forum/verifyreply/${data.quest_id}/${data.reply_id}`, data)
  }

  getUserPorfile(id){
    return api.get(`/users/profile/${id}`)
  }


  getUserQuestions(id){
    return api.get(`/forum/userquest/${id}`)
  }
}

export default new ForumService();