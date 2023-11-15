import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Form from "./components/form/Form";
import TaskList from "./components/taskList/TaskList.js";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { TodoProvider } from "./hooks/TodoContext.js";

function App() {
  return (
    <div className="App m-2">
      <TodoProvider>
        <ToastContainer transition={Slide} />
        <Calendar />
        {/* <Form /> */}
        {/* <TaskList /> */}
      </TodoProvider>
    </div>
  );
}

export default App;
