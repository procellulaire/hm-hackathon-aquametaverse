import protobuf from "protobufjs";

export const SimpleChatMessage = new protobuf.Type("SimpleChatMessage")
  .add(new protobuf.Field("timestamp", 1, "uint64"))
  .add(new protobuf.Field("name", 2, "string"))
  .add(new protobuf.Field("text", 3, "string"));
