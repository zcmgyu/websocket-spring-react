package com.example.websocketspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class DatabaseLoader implements CommandLineRunner {

    private final EmployeeRepository repository;

    @Autowired
    public DatabaseLoader(EmployeeRepository repository) {
        this.repository = repository;
    }

    @Override
    public void run(String... strings) throws Exception {
        repository.deleteAll();
        repository.save(new Employee("Frodo", "Baggins", "ring bearer"));
        repository.save(new Employee("Long", "Nguyen", "ring bearer"));

        List<Employee> employees = repository.findAll();
        System.out.println(employees.toString());
    }
}

