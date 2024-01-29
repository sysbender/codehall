import { type ReactNode, type PropsWithChildren } from "react";

export default function App() {
  return (
    <main>
      <Header>
        <h1>Your Course Goals</h1>
      </Header>
      <CourseGoal title="Learn React + TS">
        <p>Learn it from the ground up</p>
      </CourseGoal>
    </main>
  );
}
// Header
type HeaderProps = {
  children: ReactNode;
};

function Header({ children }: HeaderProps) {
  return <header>{children}</header>;
}

// CourseGoal
type CourseGoalProps = PropsWithChildren<{ title: string }>;

function CourseGoal({ title, children }: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button>Delete</button>
    </article>
  );
}
