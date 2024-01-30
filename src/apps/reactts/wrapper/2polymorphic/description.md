## todo

- [ ] generic wrapper of element
- [ ] support all builtin attribute

## code

<details>
<summary>CourseGoal</summary>

```tsx
import { ReactNode, ComponentPropsWithoutRef, type ElementType } from "react";

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

      <section>
        <Container as="a" href="https://example.com" target="_blank">
          Click me
        </Container>
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
```

</details>
