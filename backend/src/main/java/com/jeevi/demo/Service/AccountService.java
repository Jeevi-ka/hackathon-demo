package com.jeevi.demo.service;

import com.jeevi.demo.model.Account;
import com.jeevi.demo.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository repo;

    // ✅ Create Account
    public Account createAccount(Account acc) {
        acc.setBalance(0);
        return repo.save(acc);
    }

    // ✅ Deposit / Withdraw
    public Account transact(Long id, double amount, String type) {
        Optional<Account> optional = repo.findById(id);

        if (optional.isPresent()) {
            Account acc = optional.get();

            if (type.equalsIgnoreCase("deposit")) {
                acc.setBalance(acc.getBalance() + amount);

            } else if (type.equalsIgnoreCase("withdraw")) {

                // 🔥 Extra validation (IMPORTANT)
                if (acc.getBalance() < amount) {
                    throw new RuntimeException("Insufficient Balance");
                }

                acc.setBalance(acc.getBalance() - amount);
            }

            return repo.save(acc);
        }

        throw new RuntimeException("Account not found");
    }

    // ✅ Get all accounts
    public List<Account> getAllAccounts() {
        return repo.findAll();
    }
}