import { WakuMessage } from "js-waku";
import { SimpleChatMessage } from "./SimpleChatMessage";

const ContentTopic = `/waku-chat/1/chat/proto`;

export function sendMessage(message, waku, timestamp) {
  const time = timestamp.getTime();

  const protoMsg = SimpleChatMessage.create({
    timestamp: time,
    text: message,
  });

  const payload = SimpleChatMessage.encode(protoMsg).finish();

  return WakuMessage.fromBytes(payload, ContentTopic).then((wakuMessage) => {
    waku.relay.send(wakuMessage);
  });
}
