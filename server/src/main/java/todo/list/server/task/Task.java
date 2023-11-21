package todo.list.server.task;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.ToString;

import java.time.Instant;


@Entity
@ToString
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

    @Column(name="priority")
    @Getter @Setter private Integer priority;

    @Column(name="isDone")
    @Getter @Setter private Boolean isDone;

    @Column(name="notificationsEnabled")
    @Getter @Setter private Boolean notificationsEnabled;

    @Column(name="email")
    @Getter @Setter private String email;

}

