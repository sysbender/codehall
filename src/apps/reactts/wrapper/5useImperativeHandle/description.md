## todo

- [ ] expose clear form api from from ,

## code

<details>
<summary>CourseGoal</summary>

```tsx
import {
  ReactNode,
  ComponentPropsWithoutRef,
  type ElementType,
  type FormEvent,
  forwardRef,
  useRef,
  useState,
  useEffect,
  useImperativeHandle,
} from "react";

function App() {
  const [text, setText] = useState("");
  const textRef = useRef<HTMLInputElement>(null);
  const customForm = useRef<formClearHandle>(null);

  function handleInput() {
    setText(textRef.current.value);
  }

  function handleSave(data: unknown) {
    const extractedData = data as { name: string; age: string };
    console.dir(extractedData);
    customForm.current?.clear();
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

      <section>
        <Form onSave={handleSave} ref={customForm}>
          <Input2 type="text" label="Name" id="name" />
          <Input2 type="number" label="Age" id="age" />
          <Button el="button"> Save</Button>
        </Form>
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
      <input id={id} {...props} ref={ref} name={id} />
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

type FormProps = ComponentPropsWithoutRef<"form"> & {
  onSave: (value: unknown) => void;
};

type formClearHandle = {
  clear: () => void;
};
const Form = forwardRef<formClearHandle, FormProps>(function Form(
  { onSave, children, ...otherProps },
  ref
) {
  const formRef = useRef<HTMLFormElement>(null);

  // expose api from component
  useImperativeHandle(ref, () => {
    return {
      clear() {
        console.log("clearing form...");
        formRef?.current.reset();
      },
    };
  });

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    // need the input has name attribute
    const formData = new FormData(event.currentTarget);

    // formDate.get('') , convert to object in order to access by name
    const data = Object.fromEntries(formData);

    onSave(data);
    //formRef.current?.reset();
  }
  return (
    <form onSubmit={handleSubmit} {...otherProps} ref={formRef}>
      {children}
    </form>
  );
});
```

</details>
