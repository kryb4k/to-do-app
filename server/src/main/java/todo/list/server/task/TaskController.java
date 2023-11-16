package todo.list.server.task;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.lang.NonNull;
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
        existingTask.setPriority(task.getPriority());
        existingTask.setIsDone(task.getIsDone());
        return taskRepository.save(existingTask);
    }


//    java.lang.IllegalArgumentException: The HTTP header line [{: ] does not conform to RFC 7230. The request has been rejected.
//            at org.apache.coyote.http11.Http11InputBuffer.skipLine(Http11InputBuffer.java:1080) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.coyote.http11.Http11InputBuffer.parseHeader(Http11InputBuffer.java:911) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.coyote.http11.Http11InputBuffer.parseHeaders(Http11InputBuffer.java:591) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.coyote.http11.Http11Processor.service(Http11Processor.java:287) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.coyote.AbstractProcessorLight.process(AbstractProcessorLight.java:63) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.coyote.AbstractProtocol$ConnectionHandler.process(AbstractProtocol.java:896) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.tomcat.util.net.NioEndpoint$SocketProcessor.doRun(NioEndpoint.java:1744) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.tomcat.util.net.SocketProcessorBase.run(SocketProcessorBase.java:52) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.tomcat.util.threads.ThreadPoolExecutor.runWorker(ThreadPoolExecutor.java:1191) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.tomcat.util.threads.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:659) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at org.apache.tomcat.util.threads.TaskThread$WrappingRunnable.run(TaskThread.java:61) ~[tomcat-embed-core-10.1.15.jar:10.1.15]
//        at java.base/java.lang.Thread.run(Thread.java:842) ~[na:na]

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


}

// Controllers: create, read, update, delete, find specific one, find all in given date, sort by priority(idk if here or on client side)
