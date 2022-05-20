import { Waku } from "js-waku";
import { useState, useEffect, useCallback } from "react";
import { sendMessage } from "./components/sendMessage";
import { SimpleChatMessage } from "./components/SimpleChatMessage";
import "./App.css";

const ContentTopic = `/waku-chat/1/chat/proto`;

function App() {
  const [waku, setWaku] = useState(undefined);
  const [wakuStatus, setWakuStatus] = useState("None");

  const [sendCounter, setSendCounter] = useState(0);

  const [messages, setMessages] = useState([]);

  const [text, setText] = useState("");

  const updateInput = (e) => {
    setText(e.target.value);
  };

  const sendMessageOnClick = () => {
    if (wakuStatus !== "Ready") return;

    sendMessage(text, waku, new Date()).then(() => console.log("Message sent"));

    setSendCounter(sendCounter + 1);
    setText("");
  };

  const processIncomingMessage = useCallback((wakuMessage) => {
    if (!wakuMessage.payload) return;

    const { name, text } = SimpleChatMessage.decode(wakuMessage.payload);

    const time = new Date();
    // time.setTime(timestamp);

    const message = { name, text, timestamp: time.toLocaleDateString("pt-PT") };

    setMessages((messages) => {
      return [message].concat(messages);
    });

    console.log(`Message received at ${time.toString()}: ${text}`);
  }, []);

  useEffect(() => {
    if (waku !== undefined) return;
    if (wakuStatus !== "None") return;

    setWakuStatus("Starting");

    Waku.create({ bootstrap: { default: true } }).then((waku) => {
      setWaku(waku);
      setWakuStatus("Connecting");

      waku.waitForRemotePeer().then(() => {
        setWakuStatus("Ready");
      });
      console.log("Waku", waku);
      waku.relay.addObserver(processIncomingMessage, [ContentTopic]);
    });
  }, [waku, wakuStatus, processIncomingMessage]);

  return (
    <div className="App">
      <header className="App-Header">
        <p>Waku node's status: {wakuStatus}</p>
        <input
          type="input"
          value={text}
          placeholder="type message..."
          onChange={updateInput}
        />
        <button
          type="button"
          onClick={sendMessageOnClick}
          disabled={wakuStatus !== "Ready"}
        >
          Send Message
        </button>
        <ul>
          {messages.map((msg, key) => {
            return (
              <li key={key}>
                <p>
                  {msg.name}{" "}
                  <span style={{ fontSize: "10px" }}>
                    {msg.timestamp.toString()}
                  </span>
                  : {msg.text}
                </p>
              </li>
            );
          })}
        </ul>
      </header>
    </div>
  );
}

export default App;
