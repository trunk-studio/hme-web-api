import axios from 'axios'


export default class Mail {
  constructor () {
    this.axios = axios.create({
     timeout: 1000
    })

  }

  async sendInfoReport(){
    let infoMessages = await models.Message.findAll({
      where: {
        type: 'info',
        sended: false
      }
    })

    await this.send({messages: infoMessages});

  }

  async sendErrorReport(){
    let errorMessages = await models.Message.findAll({
      where: {
        type: 'error',
        sended: false
      }
    })

    await this.send({messages: errorMessages});

  }

  async updateSended({messages,data}){
    let sendedMessages = messages.map(message => {
      message.sended = true;
      message.to = data.to;
      return message;
    });
    await Promise.all(
      sendedMessages.map( message => message.save())
    );

  }

  async send({messages}){

    let messagesString = messages.map(
      message => `${message.createdAt} [${message.type}] ${message.title}`
    );

    let content = messagesString.join('<br />');

    console.log('=== content ===', content);
    let iniConfig =  await services.deviceControl.getSetting();
    console.log(iniConfig);
    let data = {
      action: 'SendEmail',
      key: iniConfig.SMTP.KEY,
      from: iniConfig.SMTP.FROM,
      to: iniConfig.SMTP.TO,
      subject: 'logger report',
      body: content
    }

    let config = {
      baseURL: iniConfig.SMTP.URL,
      method: 'get',
      url: '/cloud/api',
      params: data
    }

    try {
      let result = await this.axios.request(config);

      await this.updateSended({messages,data})

    } catch (e) {
      throw e;
    }

  };

}
