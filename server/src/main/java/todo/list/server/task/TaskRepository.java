package todo.list.server.task;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.List;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByStartDateTimeBetween(Instant after, Instant before);

//    @Query(value="select * from tasks where") //tu query sql - przeczytac
//    Void costam();
}
