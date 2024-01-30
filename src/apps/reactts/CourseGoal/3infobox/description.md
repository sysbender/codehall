## todo

add header component
add course goal component

- [ ] add infobox ,
- [ ] mode= hint , goall num=0
- [ ] mode= warning , goal num >=4
- [ ] warning has 3 severity : low medium high

## code

<details>
<summary>CourseGoal</summary>

```tsx
import {
  useState,
  useRef,
  type ReactNode,
  type PropsWithChildren,
  type FormEvent,
} from "react";

type CourseGoalType = {
  id: number;
  title: string;
  description: string;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoalType[]>([]);

  function handleAddGoal(title: string, description: string): void {
    const id = Math.floor(Math.random() * 1000);
    const newGoal: CourseGoalType = {
      id,
      title,
      description,
    };
    setGoals((prevGoals) => [...prevGoals, newGoal]);
  }

  function handleDeleteGoal(id: number) {
    setGoals((prevGoals) => prevGoals.filter((goal) => goal.id !== id));
  }

  return (
    <main>
      <Header>
        <h1>Your Course Goals</h1>
      </Header>
      <NewGoal handleAddGoal={handleAddGoal} />
      <CourseGoalList goals={goals} handleDeleteGoal={handleDeleteGoal} />
    </main>
  );
}

//CourseGoalList component
type CourseGoalListProps = {
  goals: CourseGoalType[];
  handleDeleteGoal: (id: string) => void;
};
function CourseGoalList({ goals, handleDeleteGoal }) {
  if (goals.length == 0) {
    return (
      <InfoBox mode="hint">
        You dont have no goals yet. Start adding some.
      </InfoBox>
    );
  }

  let warningBox: ReactNode;
  if (goals.length >= 4) {
    let severity: "low" | "medium" | "high" = "low";
    if (goals.length >= 6) severity = "medium";
    if (goals.length >= 8) severity = "high";
    warningBox = (
      <InfoBox mode="warning" severity={severity}>
        You have too much goals.
      </InfoBox>
    );
  }

  return (
    <>
      {warningBox}
      <ul>
        {goals.map((goal) => {
          return (
            <li key={goal.id}>
              <CourseGoal
                id={goal.id}
                title={goal.title}
                handleDeleteGoal={handleDeleteGoal}
              >
                <p> {goal.description}</p>
              </CourseGoal>
            </li>
          );
        })}
      </ul>
    </>
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
type CourseGoalProps = PropsWithChildren<{
  id: number;
  title: string;
  handleDeleteGoal: (id: number) => void;
}>;

function CourseGoal({
  id,
  title,
  handleDeleteGoal,
  children,
}: CourseGoalProps) {
  return (
    <article>
      <div>
        <h2>{title}</h2>
        {children}
      </div>
      <button
        onClick={() => {
          handleDeleteGoal(id);
        }}
      >
        Delete
      </button>
    </article>
  );
}

// New Goal
type NewGoalProps = {
  handleAddGoal: (title: string, description: string) => void;
};

function NewGoal({ handleAddGoal }: NewGoalProps) {
  const goal = useRef<HTMLInputElement>(null);
  const summary = useRef<HTMLInputElement>(null);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    //new FormData(event.currentTarget)
    const enteredGoal = goal.current.value;
    const enteredSummary = summary.current.value;
    handleAddGoal(enteredGoal, enteredSummary);

    event.currentTarget.reset();
  }

  return (
    <form onSubmit={handleSubmit}>
      <p>
        <label htmlFor="goal">Your Goal</label>
        <input type="text" id="goal" ref={goal} />
      </p>
      <p>
        <label htmlFor="summary">Short Summary</label>
        <input type="text" id="summary" ref={summary} />
      </p>
      <button>Add Goal</button>
    </form>
  );
}

// discriminated union
type HintInfoBoxProps = {
  mode: "hint";
  children: ReactNode;
};

type WarningInfoBoxProps = {
  mode: "warning";
  severity: "low" | "medium" | "high";
  children: ReactNode;
};

function InfoBox(props: HintInfoBoxProps | WarningInfoBoxProps) {
  const { mode, children } = props;
  if (mode === "hint") {
    return (
      <aside className="infobox infobox-hint">
        <p>{children}</p>
      </aside>
    );
  }

  // warning infobox
  const { severity } = props;
  const severityClassName = `warning--${severity}`;
  return (
    <aside className={`infobox infobox-warning ${severityClassName}`}>
      <h2>Warning</h2>
      <p>{children}</p>
    </aside>
  );
}
```

</details>
