package todo.list.server.task;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.bind.annotation.*;


import java.time.ZoneId;
import java.util.List;
import java.time.Instant;
import java.util.Date;

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
        return taskRepository.findById(id).get(); // exception handling .orElse(exceptionHandling); ??
    }

    @PostMapping
    public Task createTask(@RequestBody Task task){
        return taskRepository.save(task);
    }

    @PutMapping("/update/{id}")
    public Task updateTaskById(@PathVariable Long id, @RequestBody Task task){
        Task existingTask = taskRepository.findById(id).get(); // exception handling .orElse(exceptionHandling); ??
        //taskTitle, taskDescription, startDateTime, endDateTime, priority
        existingTask.setTaskTitle(task.getTaskTitle());
        existingTask.setTaskDescription(task.getTaskDescription());
        existingTask.setStartDateTime(task.getStartDateTime());
//        existingTask.setEndDateTime(task.getEndDateTime());
        existingTask.setPriority(task.getPriority());
        return taskRepository.save(existingTask);
    }

    @DeleteMapping("/delete/{id}")
    public String deleteTaskById(@PathVariable Long id){
        try{
            taskRepository.deleteById(id);
            return "User deleted successfully";
        } catch(Exception e){
            return "User not found";
        }
    }

    @GetMapping("/calendar")
    public List<Task> getTasksForMonth(@RequestParam @DateTimeFormat(pattern = "yyyy-MM") Date month) {
        Instant startOfMonth = month.toInstant();
        Instant endOfMonth = startOfMonth.atZone(ZoneId.systemDefault()).plusMonths(1).toInstant();

        return taskRepository.findByStartDateTimeBetween(startOfMonth, endOfMonth);
    }


}

// Controllers: create, read, update, delete, find specific one, find all in given date, sort by priority(idk if here or on client side)
