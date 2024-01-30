import { ReactNode, ComponentPropsWithoutRef } from "react";

function App() {
  return (
    <main>
      <h1>Let's get started!</h1>
      <Input id="email" label="email" disabled />
      <Input id="email" label="email" type="number" />
    </main>
  );
}

export default App;

type InputProps = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

// get all build props for input

function Input({ id, label, ...props }: InputProps) {
  return (
    <p>
      <label htmlFor={id}>label</label>
      <input id="id1" {...props} />
    </p>
  );
}
