package com.example.websocketspring;

import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

//http://javasampleapproach.com/spring-framework/spring-websocket/create-spring-websocket-application-springboot-sockjs-stomp
//https://www.callicoder.com/spring-boot-websocket-chat-example/
@RestController
public class GreetingController {
    @MessageMapping("/hello")
    @SendTo("/topic/greetings")
    public Greeting greeting(Message message) throws Exception {
        return new Greeting("Hello, " + message.getName() + "!");
    }
}
