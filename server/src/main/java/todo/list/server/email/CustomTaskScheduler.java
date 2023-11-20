package todo.list.server.email;

import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.scheduling.TaskScheduler;
import org.springframework.scheduling.annotation.EnableScheduling;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.scheduling.concurrent.ThreadPoolTaskScheduler;
import todo.list.server.email.config.EmailDetails;
import todo.list.server.email.service.EmailService;
import todo.list.server.task.Task;
import todo.list.server.task.TaskRepository;

import java.time.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;


@Configuration
@EnableScheduling
@AllArgsConstructor
public class CustomTaskScheduler {

    private TaskRepository repository;
    private final EmailService emailService;

    private static String mapPriorityToString(int priority) {
        return switch (priority) {
            case 1 -> "Low";
            case 2 -> "Medium";
            case 3 -> "High";
            default -> "Unknown";
        };
    }

    private static String formatTitlesWithPriority(List<Task> tasks) {
        return IntStream.range(0, tasks.size())
                .mapToObj(index -> (index + 1) + ". " + tasks.get(index).getTaskTitle() + " - Priority: " + mapPriorityToString(tasks.get(index).getPriority()))
                .collect(Collectors.joining("\n"));
    }

    private List<Task> getTasksForTimeRange(LocalDateTime startDateTime, LocalDateTime endDateTime, boolean notificationsEnabled) {
        Instant startInstant = startDateTime.toInstant(ZoneOffset.UTC);
        Instant endInstant = endDateTime.toInstant(ZoneOffset.UTC);
        return repository.findAllByStartDateTimeBetweenAndNotificationsEnabled(startInstant, endInstant, notificationsEnabled);
    }

    @Scheduled(fixedDelay = 10000)
    //    @Scheduled(cron = "0 0 8 * * *", zone = "Europe/Warsaw")
    public void sendPlannedTasksForWholeDay() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        List<Task> tasks = getTasksForTimeRange(startOfDay, endOfDay, true);

        String titlesWithPriority = formatTitlesWithPriority(tasks);

        if (!tasks.isEmpty()) {
            String recipientEmail = tasks.get(0).getEmail();
            EmailDetails details = new EmailDetails();
            details.setRecipient(recipientEmail);
            details.setSubject("Task planned for " + LocalDate.now());
            details.setMsgBody("Hello!\n\n" + "Your fresh task list for today: \n" + titlesWithPriority + "\n\nHave fun!");
            emailService.sendSimpleMail(details);
        }
    }

    @Scheduled(fixedDelay = 10000)
//    @Scheduled(cron = "0 0 20 * * *", zone = "Europe/Warsaw")
    public void sendDailySummary() {
        LocalDateTime startOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(LocalDate.now(), LocalTime.MAX);

        List<Task> tasks = getTasksForTimeRange(startOfDay, endOfDay, true);
        List<Task> tasksDone = getTasksForTimeRange(startOfDay, endOfDay, true);
        List<Task> tasksNotDone = getTasksForTimeRange(startOfDay, endOfDay, false);

        String tasksDoneWithPriority = formatTitlesWithPriority(tasksDone);
        String tasksNotDoneWithPriority = formatTitlesWithPriority(tasksNotDone);

        if (!tasks.isEmpty()) {
            String recipientEmail = tasks.get(0).getEmail();
            EmailDetails details = new EmailDetails();
            details.setRecipient(recipientEmail);
            details.setSubject("Daily tasks summary " + LocalDate.now());
            details.setMsgBody("Good evening! I hope you did well, but let's see..\n\n"
                    + "Tasks finished:\n" + tasksDoneWithPriority + "\n\nTasks unfinished:\n" + tasksNotDoneWithPriority + "\n\n Good night! See you tomorrow. ;)");
            emailService.sendSimpleMail(details);
        }
    }

    @Bean
    public TaskScheduler threadPoolTaskScheduler() {
        ThreadPoolTaskScheduler scheduler = new ThreadPoolTaskScheduler();
        scheduler.setPoolSize(10);
        scheduler.setThreadNamePrefix("scheduled-task-");
        scheduler.initialize();
        return scheduler;
    }
}
