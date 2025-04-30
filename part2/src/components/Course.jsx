
const Part = ({part}) => (<li>{part.name}: {part.exercises}</li>)

const Content = ({parts}) => {
  const totalExercises = parts.reduce((sum, part) => sum + part.exercises, 0);
  
  return (
    <div>
      <ul>
        {parts.map(part => <Part key={part.id} part={part} />)}
      </ul>
      <p><strong>Total of exercises: {totalExercises}</strong></p>
    </div>
  );
}


const Course = ({course }) => {
  return (
    <div>
      <h2>{course.name}</h2>
      <Content parts = {course.parts}/>
    </div>
  )
}

const Courses = ({courses}) => {
  return(
    <div>
      {courses.map(course => <Course key={course.id} course={course}/>)}
    </div>
  )
}

export  { Courses, Course, Content, Part }