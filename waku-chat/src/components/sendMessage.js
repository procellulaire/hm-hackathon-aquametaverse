import { WakuMessage } from "js-waku";
import { uniqueNamesGenerator, starWars, colors } from "unique-names-generator";
import { SimpleChatMessage } from "./SimpleChatMessage";

const ContentTopic = `/waku-chat/1/chat/proto`;

const shortname = uniqueNamesGenerator({
  dictionaries: [starWars, colors],
});

console.log(shortname);

export function sendMessage(message, waku, timestamp) {
  const time = timestamp;

  const protoMsg = SimpleChatMessage.create({
    timestamp: time,
    name: shortname,
    text: message,
  });

  const payload = SimpleChatMessage.encode(protoMsg).finish();

  return WakuMessage.fromBytes(payload, ContentTopic).then((wakuMessage) => {
    waku.relay.send(wakuMessage);
  });
}
