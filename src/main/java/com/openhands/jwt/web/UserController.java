package com.openhands.jwt.web;

import com.openhands.jwt.model.AppUser;
import com.openhands.jwt.repository.AppUserRepository;
import com.openhands.jwt.web.dto.UserProfileResponse;
import java.util.Map;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping("/api/profile")
public class UserController {

    private final AppUserRepository userRepository;

    public UserController(AppUserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/me")
    public UserProfileResponse me(Authentication authentication) {
        AppUser user = userRepository.findByUsername(authentication.getName())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User not found"));
        return new UserProfileResponse(user.getUsername(), user.getFullName(), user.getRole());
    }

    @GetMapping("/greeting")
    public Map<String, String> greeting(Authentication authentication) {
        return Map.of("message", "Hello " + authentication.getName() + ", welcome back!");
    }
}
