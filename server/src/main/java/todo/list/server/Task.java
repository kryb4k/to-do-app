package todo.list.server;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;


@Entity
@ToString
@Table(name="tasks")
@Getter @Setter
public class Task {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "taskTitle")
    private String taskTitle;

    @Column(name = "taskDescription")
    private String taskDescription;

    @Column(name = "startDateTime")
    private Instant startDateTime;

    @Column(name="endDateTime")
    private Instant endDateTime;

    @Column(name="priority")
    private Integer priority;

    @Column(name="isDone")
    private Boolean isDone;

    @Column(name="notificationsEnabled")
    private Boolean notificationsEnabled;

    @Column(name="email")
    private String email;

}

