import {
  ReactNode,
  ComponentPropsWithoutRef,
  type ElementType,
  forwardRef,
  useRef,
  useState,
  useEffect,
} from "react";

function App() {
  const [text, setText] = useState("");
  const textRef = useRef<HTMLInputElement>(null);

  function handleInput() {
    setText(textRef.current.value);
  }

  //useEffect( ()=> {textRef.current.focus() }, [])
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

      <section>
        <Container as="a" href="https://example.com" target="_blank">
          Click me
        </Container>
      </section>

      <section>
        <Input2 id="2" label="ref" ref={textRef} onChange={handleInput} />
        <p> input={text}</p>
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
      <input id={id} {...props} />
    </p>
  );
}

// input with forward

type Input2Props = {
  id: string;
  label: string;
} & ComponentPropsWithoutRef<"input">;

const Input2 = forwardRef<HTMLInputElement, Input2Props>(function Input2(
  { id, label, ...props },
  ref
) {
  return (
    <p>
      <label htmlFor={id}> {label}</label>
      <input id={id} {...props} ref={ref} />
    </p>
  );
});

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

//  polymorphic container
type ContainerProps<T extends ElementType> = {
  as: T;
  children: ReactNode;
} & ComponentPropsWithoutRef<T>;

function Container<C extends ElementType>({
  as,
  children,
  ...props
}: ContainerProps<C>) {
  const Component = as || "div";
  return <Component {...props}> {children}</Component>;
}
