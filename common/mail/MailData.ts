
import { Http } from '../index/Http';
export type MailData = {
  receiver: string  ,
  subject : string, 
  body: string,
  replyTo: string,
  fullName?: string
 }

 export const SendMail = async (FormData: new (...args: any[]) => any, axios: any,MAIL_EP: string ,  data: MailData )  => {
  return new Promise((resolve, err) => {
    try {
    const formData = new FormData();
    formData.append('receiver',data.receiver);
    formData.append('replyTo',data.replyTo);
    formData.append('postulant', data.fullName?   data.fullName : "");
    formData.append('subject',data.subject);
    formData.append('body',data.body);
    const http = new Http(axios, "");
    const h = formData.getHeaders();
    console.log(data);
    http.formaData(MAIL_EP+"", formData, h ).then((res: any) => {
      console.log(res);
    }).catch((e: any) => {
      console.log(e);
    });
    resolve(true);
    } catch(e){
      console.error('Error uploading file:', e);
      err(e);
    }

  })
}