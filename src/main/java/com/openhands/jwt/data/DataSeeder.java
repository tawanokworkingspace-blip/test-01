package com.openhands.jwt.data;

import com.openhands.jwt.model.AppUser;
import com.openhands.jwt.repository.AppUserRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

@Component
public class DataSeeder implements CommandLineRunner {

    private static final Logger LOG = LoggerFactory.getLogger(DataSeeder.class);

    private final AppUserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public DataSeeder(AppUserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public void run(String... args) {
        seedUser("user", "password", "Demo User", "USER");
        seedUser("admin", "admin123", "Administrator", "ADMIN");
    }

    private void seedUser(String username, String rawPassword, String fullName, String role) {
        userRepository.findByUsername(username)
                .orElseGet(() -> {
                    LOG.info("Creating default user '{}'", username);
                    AppUser user = new AppUser(username,
                            passwordEncoder.encode(rawPassword),
                            fullName,
                            role);
                    return userRepository.save(user);
                });
    }
}
