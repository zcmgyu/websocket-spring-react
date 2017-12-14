package com.example.websocketspring;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping(value="/api")
public class EmployeeController {
    @Autowired
    EmployeeRepository repository;

    @RequestMapping(value = "/employees", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<?> getListEmployee() {
        List<Employee> employees = repository.findAll();
        HashMap<String, Employee> map = new HashMap() {
            {
                put("employees", employees);
            }
        };

        return new ResponseEntity(map, HttpStatus.OK);
    }

}
