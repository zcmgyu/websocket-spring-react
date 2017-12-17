package com.aptech.controller;

import com.aptech.model.User;
import com.aptech.repository.UserRepository;
import com.aptech.service.NotificationService;
import com.aptech.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService notificationService;

    // The SimpMessagingTemplate is used to send Stomp over WebSocket messages.
    @Autowired
    private SimpMessagingTemplate messagingTemplate;


    /**
     * GET  /notifications  -> show the notifications page.
     */
    @RequestMapping("/notifications")
    public String notifications() {
        return "notifications";
    }

    /**
     * POST  /some-action  -> do an action.
     * <p>
     * After the action is performed will be notified UserA.
     */
    @RequestMapping(value = "/some-action", method = RequestMethod.POST)
    @ResponseBody
//    public ResponseEntity<?> someAction(@RequestParam String target) {
    public ResponseEntity<?> someAction(@RequestBody User target) {

        // Do an action here
        // ...

        Notification notification = new Notification("Hello, World!");


        // Send the notification to "UserA" (by username)
//        notificationService.notify(
//                notification, // notification object
//                target.getUsername()                    // username
//        );

        messagingTemplate.convertAndSendToUser(
                target.getUsername(),
                "/queue/notify",
                notification
        );

        // Return an http 200 status code
        return new ResponseEntity<>(notification.getContent(), HttpStatus.OK);
    }
}
