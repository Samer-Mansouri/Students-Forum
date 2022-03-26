class MessageParser {
    constructor(actionProvider) {
      this.actionProvider = actionProvider;
      this.state ={
        data: "",
      }
    }
  
    
  
    parse(message) {
      console.log(message);
      const lowercase = message.toLowerCase();
  
      
      this.actionProvider.normalMsg(lowercase);      
      
     
  
    }
  }
  
  export default MessageParser;