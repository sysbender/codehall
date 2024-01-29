import { useState, type ReactNode, type PropsWithChildren } from "react";

type CourseGoalType = {
  id: number;
  title: string;
  description: string;
};

export default function App() {
  const [goals, setGoals] = useState<CourseGoalType[]>([]);

  function handleAddGoal(): void {
    const id = Math.floor(Math.random() * 1000);
    const newGoal: CourseGoalType = {
      id: id,
      title: `title ${id}`,
      description: `description ${id}`,
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
      <button onClick={handleAddGoal}>Add Goal</button>
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
  return (
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
