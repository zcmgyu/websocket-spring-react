package com.aptech.config;

import com.aptech.model.Role;
import com.aptech.model.User;
import com.aptech.repository.UserRepository;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class DBLoader implements CommandLineRunner {
    UserRepository repository;

    public DBLoader(UserRepository repository) {
        this.repository = repository;
        repository.deleteAll();;
    }

    @Override
    public void run(String... strings) throws Exception {
        // Encode password
        BCryptPasswordEncoder passEncoder = new BCryptPasswordEncoder();


        User user1 = new User("User 1",
                "user1",
                "user1@example.com",
                "user1",
                true, new ArrayList() {
            {
                add(new Role("USER"));
            }
        });

        User user2 = new User("User 2",
                "user2",
                "user2@example.com",
                "user2",
                true, new ArrayList() {
            {
                add(new Role("USER"));
            }
        });

        List<User> userList = new ArrayList() {
            {
                add(user1);
                add(user2);
            }
        };

        userList.forEach(user -> {
            String hashedPassword = passEncoder.encode(user.getPassword());
            user.setPassword(hashedPassword);
        });

        repository.save(userList);
    }
}
