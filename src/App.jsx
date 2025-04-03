import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [state, setState] = useState({});
  useEffect(() => {
    window.parent.postMessage(
      {
        type: "readyForPreview",
      },
      "*",
    );
    window.parent.postMessage(
      {
        height: document.body.scrollHeight,
        type: "previewResized",
      },
      "*",
    );

    const listenToParent = (event) => {
      setState(JSON.parse(event.data));
    };

    window.addEventListener("message", (event) => console.log(event.data));

    return () => {
      window.removeEventListener("message", listenToParent);
    };
  }, []);

  return (
    <div
      style={{
        height: "600px",
      }}
    >
      <div className="card">{JSON.stringify(state)}</div>
      {state?.logo && (
        <div>
          <img src={state.logo} />
        </div>
      )}
    </div>
  );
}

export default App;
