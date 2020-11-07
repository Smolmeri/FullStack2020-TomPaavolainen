import React from "react";

const Header = (props) => {
  return <h1>{props.course.name}</h1>;
};

const Total = (props) => {
  const parts = props.course.parts.map((course) => course.exercises);
  console.log("parsts", parts);

  const sum = parts.reduce((s, p) => s + p);

  return <p>Number of exercises {sum}</p>;
};

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.course.parts.map((part) => (
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      ))}
    </div>
  );
};

const Course = (props) => {
  return (
    <div>
      <Header course={props.course} />
      <Content course={props.course} />
      <Total course={props.course} />
    </div>
  );
};

export default Course;
