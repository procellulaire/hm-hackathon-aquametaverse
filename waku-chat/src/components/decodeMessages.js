import { SimpleChatMessage } from "./SimpleChatMessage";

// const proto = new protobuf.decoder()

export function decodeMessage(wakuMessage) {
  if (!wakuMessage.payload) return;

  const { timestamp, name, text } = SimpleChatMessage.decode(
    wakuMessage.payload
  );

  if (!timestamp || !text || !name) return;

  const time = new Date();
  time.setTime(timestamp);

  const utf8Text = Buffer.from(text).toString("utf-8");

  return { text: utf8Text, timestamp: time, name };
}
