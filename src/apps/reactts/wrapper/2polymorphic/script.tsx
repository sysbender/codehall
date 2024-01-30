import { ReactNode, ComponentPropsWithoutRef } from "react";

function App() {
  return (
    <main>
      <section>
        <h1>Let's get started!</h1>
        <Input id="email" label="email" disabled />
        <Input id="email" label="email" type="number" />
      </section>
      <section>
        <Button el="button">Button</Button>
        <Button
          el="anchor"
          href="https://example.com/"
          target="_blank"
          rel="noopener noreferrer"
        >
          example
        </Button>
      </section>
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

// button or link

type ButtonProps = {
  el: "button";
} & ComponentPropsWithoutRef<"button">;

type AnchorProps = {
  el: "anchor";
} & ComponentPropsWithoutRef<"a">;

function Button(props: ButtonProps | AnchorProps) {
  if (props.el === "button") {
    const { el, ...otherProps } = props;
    return <button className="button" {...otherProps}></button>;
  }
  const { el, ...otherProps } = props;
  return <a className="button" {...otherProps}></a>;
}
