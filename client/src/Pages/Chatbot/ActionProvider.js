import axios from 'axios';

class ActionProvider {
  constructor(createChatBotMessage, setStateFunc) {
    this.createChatBotMessage = createChatBotMessage;
    this.setState = setStateFunc;
  }

  

 

  createResponse = (data) => {
    const message =  this.createChatBotMessage(data);
    this.addMessageToState(message);
  } 

  addMessageToState = (message) => {
    this.setState((prevState) => ({
      ...prevState,
      messages: [...prevState.messages, message],
    }));
  };


  
  

  
  
  normalMsg(msg){

      axios.post('http://127.0.0.1:8000/api/chat/message', {
        message: msg,
      })
      .then(response => {
          this.createResponse(response.data);
      })
      .catch(function (error) {
        console.log(error);
      });
  
  }


}

export default ActionProvider;