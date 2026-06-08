package com.openhands.jwt.web.dto;

public record LoginResponse(String accessToken, long expiresIn, String tokenType) {
}
