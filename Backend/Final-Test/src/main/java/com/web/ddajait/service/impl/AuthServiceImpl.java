package com.web.ddajait.service.impl;

import org.springframework.stereotype.Service;

import com.web.ddajait.model.repository.AuthRepository;
import com.web.ddajait.service.AuthService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
@RequiredArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final AuthRepository authRepository;

    @Override
    public void initializeRoles() throws Exception {
        log.info("[AuthServiceImpl][initializeRoles] Start");
        authRepository.insertRoleAdmin();
    }

}
