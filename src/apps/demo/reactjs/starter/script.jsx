import { useState } from "react";

function Hello(props) {
  const [count, setCount] = useState(0);
  return (
    <div className="container">
      <h1>Hello, {props.name}!</h1>
    </div>
  );
}

export default function App() {
  return <Hello name="React" />;
}
