package todo.list.server.email.service;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.FileSystemResource;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import todo.list.server.email.config.EmailDetails;

import java.io.File;
import java.util.Objects;


@Service
public class EmailServiceImpl implements EmailService {

    private final JavaMailSender javaMailSender;

    @Value("${spring.mail.username}") private String sender;

    public EmailServiceImpl(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    public String sendSimpleMail(EmailDetails details)
    {

        try {

            SimpleMailMessage mailMessage
                    = new SimpleMailMessage();

            mailMessage.setFrom(sender);
            mailMessage.setTo(details.getRecipient());
            mailMessage.setText(details.getMsgBody());
            mailMessage.setSubject(details.getSubject());

            javaMailSender.send(mailMessage);
            return "Mail Sent Successfully...";
        }

        catch (Exception e) {
            return "Error while Sending Mail";
        }
    }

    public String
    sendMailWithAttachment(EmailDetails details)
    {
        MimeMessage mimeMessage
                = javaMailSender.createMimeMessage();
        MimeMessageHelper mimeMessageHelper;

        {
            try {
                mimeMessageHelper
                        = new MimeMessageHelper(mimeMessage, true);
                mimeMessageHelper.setFrom(sender);
                mimeMessageHelper.setTo(details.getRecipient());
                mimeMessageHelper.setText(details.getMsgBody());
                mimeMessageHelper.setSubject(
                        details.getSubject());
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }


            FileSystemResource file
                    = new FileSystemResource(
                    new File(details.getAttachment()));

            try {
                mimeMessageHelper.addAttachment(
                        Objects.requireNonNull(file.getFilename()), file);
            } catch (MessagingException e) {
                throw new RuntimeException(e);
            }

            javaMailSender.send(mimeMessage);
            return "Mail sent Successfully";
        }
    }
}
