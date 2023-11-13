import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Form from "./components/form/Form";
import TaskList from "./components/taskList/TaskList";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App m-2">
      <ToastContainer transition={Slide} />
      <Calendar />
      {/* <Form /> */}
      {/* <TaskList /> */}
    </div>
  );
}

export default App;
