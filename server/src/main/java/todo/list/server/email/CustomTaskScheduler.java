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
import todo.list.server.Task;
import todo.list.server.task.TaskRepository;

import java.time.*;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import static java.time.LocalDate.*;

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

//        @Scheduled(fixedDelay = 10000)
    @Scheduled(cron = "0 0 8 * * *", zone = "Europe/Warsaw")
    public void sendPlannedTasksForWholeDay() {
        LocalDate currentDate = now();
        LocalDateTime startOfDay = LocalDateTime.of(currentDate, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(currentDate, LocalTime.MAX);
        Instant startOfDayInstant = startOfDay.toInstant(ZoneOffset.UTC);
        Instant endOfDayInstant = endOfDay.toInstant(ZoneOffset.UTC);

        List<Task> tasks = repository.findAllByStartDateTimeBetweenAndNotificationsEnabled(startOfDayInstant,endOfDayInstant, true);

            String titlesWithPriority = formatTitlesWithPriority(tasks);


        if (!tasks.isEmpty()) {
            String recipientEmail = tasks.get(0).getEmail();
            EmailDetails details = new EmailDetails();
            details.setRecipient(recipientEmail);
            details.setSubject("Task planned for " + currentDate);
            details.setMsgBody("Hello!\n\n" + "Your fresh task list for today: \n" + titlesWithPriority + "\n\nHave fun!");
            emailService.sendSimpleMail(details);
            }
    }

//        @Scheduled(fixedDelay = 10000)
    @Scheduled(cron = "0 0 20 * * *", zone = "Europe/Warsaw")
        public void sendDailySummary() {
        LocalDate currentDate = now();
        LocalDateTime startOfDay = LocalDateTime.of(currentDate, LocalTime.MIN);
        LocalDateTime endOfDay = LocalDateTime.of(currentDate, LocalTime.MAX);
        Instant startOfDayInstant = startOfDay.toInstant(ZoneOffset.UTC);
        Instant endOfDayInstant = endOfDay.toInstant(ZoneOffset.UTC);

        List<Task> tasks = repository.findAllByStartDateTimeBetweenAndNotificationsEnabled(startOfDayInstant,endOfDayInstant, true);
        List<Task> tasksDone = repository.findAllByStartDateTimeBetweenAndNotificationsEnabled(startOfDayInstant, endOfDayInstant, true);
        List<Task> tasksNotDone = repository.findAllByStartDateTimeBetweenAndNotificationsEnabled(startOfDayInstant, endOfDayInstant, false);

        String tasksDoneWithPriority = formatTitlesWithPriority(tasksDone);
        String tasksNotDoneWithPriority = formatTitlesWithPriority(tasksNotDone);

        if (!tasks.isEmpty()) {
            String recipientEmail = tasks.get(0).getEmail();
            EmailDetails details = new EmailDetails();
            details.setRecipient(recipientEmail);
            details.setSubject("Daily tasks summary " + currentDate);
            details.setMsgBody("Good evening! I hope you did well, but let's see..\n\n"+ "Tasks finished:\n" + tasksDoneWithPriority + "\n\nTasks unfinished:\n" + tasksNotDoneWithPriority + "\n\n Good night! See you tomorrow. ;)");
            emailService.sendSimpleMail(details);
        }
    }

//    @Scheduled(fixedDelay = 10000)
    @Scheduled(cron = "0 0/5 * * * *", zone = "Europe/Warsaw")
    public void sendTaskCompletionNotification() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime oneHourFromNow = currentDateTime.plusHours(1);
        Instant currentInstant = currentDateTime.toInstant(ZoneOffset.UTC);
        Instant oneHourFromNowInstant = oneHourFromNow.toInstant(ZoneOffset.UTC);

        List<Task> tasksToBeCompleted = repository.findAllByStartDateTimeBetweenAndIsDoneAndNotificationsEnabled(currentInstant, oneHourFromNowInstant, false, true);

        String titlesWithPriority = formatTitlesWithPriority(tasksToBeCompleted);

        for (Task task : tasksToBeCompleted) {
            String recipientEmail = task.getEmail();
            EmailDetails details = new EmailDetails();
            details.setRecipient(recipientEmail);
            details.setSubject("Task Reminder");
            details.setMsgBody("Hello!\n\n" + "Reminder: Your task \n\n" + titlesWithPriority + "\n\nis scheduled to be completed within the next hour.\n\n" +
                    "Have a productive hour!");
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