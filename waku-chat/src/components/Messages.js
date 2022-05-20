import { formatDate } from "./helpers/formDate";
import { v4 as uuidv4 } from "uuid";

export function Messages(props) {
  return props.messages.map(({ text, timestamp, name }) => {
    return (
      <li key={uuidv4()}>
        {name}{" "}
        <span style={{ fontSize: "10px" }}>({formatDate(timestamp)})</span>:{" "}
        {text}
      </li>
    );
  });
}
