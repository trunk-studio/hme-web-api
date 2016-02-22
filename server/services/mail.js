import axios from 'axios'


export default class Mail {
  constructor () {

    this.axios = axios.create({
     baseURL: 'http://www.aquariumlightings.com',
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

  async updateSended({messages}){
    let sendedMessages = messages.map(message => {
      message.sended = true;
      message.to = 'smlsun@gmail.com,lyhcode@gmail.com';
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

    let data = {
      action: 'SendEmail',
      key: 'd3d84e39646bfe257e1334b7d99cb2ce',
      from: 'smlsun@gmail.com',
      to: 'smlsun@gmail.com,lyhcode@gmail.com',
      subject: 'logger report',
      body: content
    }

    let config = {
      method: 'get',
      url: '/cloud/api',
      params: data
    }

    try {
      // let result = await this.axios.request(config)

      await this.updateSended({messages})

    } catch (e) {
      throw e;
    }

  };

}
