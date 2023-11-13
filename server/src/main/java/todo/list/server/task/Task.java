package todo.list.server.task;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.Instant;


@Entity
@Table(name="tasks")
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Getter @Setter private Long id;

    @Column(name = "taskTitle")
    @Getter @Setter private String taskTitle;

    @Column(name = "taskDescription")
    @Getter @Setter private String taskDescription;

    @Column(name = "startDateTime")
    @Getter @Setter private Instant startDateTime;

//    @Column(name="endDateTime")
//    @Getter @Setter private Instant endDateTime;

    @Column(name="priority")
    @Getter @Setter private Integer priority;

    @Column(name="isDone")
    @Getter @Setter private Boolean isDone;

}

//Data schema: taskTitle, taskDescription, startDateTime, endDateTime, priority, notification(can make it optional but idk)

