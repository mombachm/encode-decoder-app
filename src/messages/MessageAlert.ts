import { Message } from "./Messages";

export class MessageAlert {
  public static showInfoMessage(message: Message) {
    alert(message);
  }
}