import { ReactNode } from "react";

function Header(props: { children: ReactNode }) {
  return <h1>{props.children}</h1>;
}

export default function App() {
  return <Header> This is header</Header>;
}
