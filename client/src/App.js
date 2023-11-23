import "./App.css";
import Calendar from "./components/calendar/Calendar";
import Form from "./components/form/Form";
import Navbar from "./components/utilities/Navbar.js";
import { TodoProvider } from "./hooks/TodoContext.js";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./components/taskList/TaskList";
import Summary from "./components/summary/Summary.js";
import SummaryMobile from "./components/summary/SummaryMobile.js";

function App() {
  return (
    <div className="App m-2">
      <TodoProvider>
        <Navbar />
        <ToastContainer transition={Slide} />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/add-form" element={<Form />} />
          <Route path="/task-list" element={<TaskList />} />
          <Route path="/summary" element={<Summary />} />
          <Route path="/summary-mobile" element={<SummaryMobile />} />
          <Route path="/download" />
        </Routes>
      </TodoProvider>
    </div>
  );
}

export default App;
