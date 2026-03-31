package com.jeevi.demo.controller;

import com.jeevi.demo.model.Account;
import com.jeevi.demo.service.AccountService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@CrossOrigin(origins = "*")
public class AccountController {

    @Autowired
    private AccountService service;

    @PostMapping("/api/account")
    public Account createAccount(@RequestBody Account acc) {
        return service.createAccount(acc);
    }

    @PostMapping("/api/transaction/{id}")
    public Account transact(@PathVariable Long id,
                            @RequestParam double amount,
                            @RequestParam String type) {
        return service.transact(id, amount, type);
    }

    @GetMapping("/api/account")
    public java.util.List<Account> getAll() {
        return service.getAllAccounts();
    }
}