package com.aptech.controller;

import com.aptech.repository.UserRepository;
import com.aptech.service.NotificationService;
import com.aptech.model.Notification;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class NotificationController {
    @Autowired
    private NotificationService notificationService;


    /**
     * GET  /notifications  -> show the notifications page.
     */
    @RequestMapping("/notifications")
    public String notifications() {
        return "notifications";
    }

    /**
     * POST  /some-action  -> do an action.
     *
     * After the action is performed will be notified UserA.
     */
    @RequestMapping(value = "/some-action", method = RequestMethod.POST)
    @ResponseBody
    public ResponseEntity<?> someAction() {

        // Do an action here
        // ...


        // Send the notification to "UserA" (by username)
        notificationService.notify(
                new Notification("Hello, World!"), // notification object
                "admin"                    // username
        );

        // Return an http 200 status code
        return new ResponseEntity<>(HttpStatus.OK);
    }
}
