import "./App.css";
import CalendarGrid from "./components/calendar/CalendarGrid";
import Form from "./components/form/Form";
import Navbar from "./components/common/Navbar";
import { TodoProvider } from "./hooks/TodoContext";
import { Routes, Route } from "react-router-dom";
import { ToastContainer, Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import TaskList from "./components/taskList/TaskList";
import Summary from "./components/summary/Summary";
import SummaryMobile from "./components/summary/SummaryMobile";

function App() {
  return (
    <div className="App m-2">
      <TodoProvider>
        <Navbar />
        <ToastContainer transition={Slide} />
        <Routes>
          <Route path="/" element={<CalendarGrid />} />
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
