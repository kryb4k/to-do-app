package todo.list.server.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import todo.list.server.Task;

import java.time.Instant;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStartDateTimeBetween(Instant after, Instant before);
    List<Task> findAllByStartDateTimeBetweenAndNotificationsEnabled(Instant startDateTime, Instant startDateTime2, Boolean notificationsEnabled);
    List<Task> findAllByStartDateTimeBetweenAndIsDoneAndNotificationsEnabled(Instant after, Instant before, Boolean isDone, Boolean notificationsEnabled);
}
