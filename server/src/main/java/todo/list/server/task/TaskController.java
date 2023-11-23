package todo.list.server.task;

import org.springframework.web.bind.annotation.*;
import todo.list.server.Task;
import java.util.List;
import java.time.Instant;

@CrossOrigin("http://localhost:3000/")
@RestController
@RequestMapping("/tasks")
public class TaskController {

    private final TaskRepository taskRepository;
    public TaskController(TaskRepository taskRepository){
        this.taskRepository = taskRepository;
    }

    @GetMapping
    public List<Task> getAllTasks() {
        return taskRepository.findAll();
    }

    @GetMapping("/{id}")
    public Task getTaskById(@PathVariable Long id){
        return taskRepository.findById(id).get();
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("/update/{id}")
    public Task updateTaskById(@PathVariable Long id, @RequestBody Task task){
        Task existingTask = taskRepository.findById(id).get();
        existingTask.setTaskTitle(task.getTaskTitle());
        existingTask.setTaskDescription(task.getTaskDescription());
        existingTask.setStartDateTime(task.getStartDateTime());
        existingTask.setEndDateTime(task.getEndDateTime());
        existingTask.setPriority(task.getPriority());
        existingTask.setIsDone(task.getIsDone());
        existingTask.setNotificationsEnabled(task.getNotificationsEnabled());
        existingTask.setEmail(task.getEmail());
        return taskRepository.save(existingTask);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTaskById(@PathVariable Long id){
        try{
            taskRepository.deleteById(id);
            return "Task deleted successfully";
        } catch(Exception e){
            return "Task not found";
        }
    }

    @GetMapping("/calendar")
    public List<Task> getTasksForMonth(@RequestParam Instant startDate, @RequestParam Instant endDate) {
        return taskRepository.findByStartDateTimeBetween(startDate, endDate);
    }

//    @GetMapping("/generate-ics")
//    public ResponseEntity<String> generateIcsFileForMonth() {
//
//    }

}

