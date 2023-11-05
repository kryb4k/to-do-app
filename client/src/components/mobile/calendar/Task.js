const Task = (props) => {
  const { taskDetails } = props;
  //   console.log(taskDetails);
  return (
    <div>
      <h1>{taskDetails.name}</h1>
    </div>
  );
};

export default Task;
