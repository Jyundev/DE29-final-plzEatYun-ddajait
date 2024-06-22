package com.web.ddajait.config.jwt;

import java.io.IOException;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.GenericFilterBean;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@RequiredArgsConstructor

public class JwtFilter extends GenericFilterBean {

    private static final Logger logger = LoggerFactory.getLogger(JwtFilter.class);
    public static final String AUTHORIZATION_HEADER = "Authorization";
    private final TokenProvider tokenProvider;

    // 실제 필터릴 로직
    // 토큰의 인증정보를 SecurityContext에 저장하는 역할 수행
    // 클라이언트는 로그인 후 발급받은 JWT 토큰을 각 요청의 Authorization 헤더에 포함 
    // 이를 통해 서버는 토큰을 통해 사용자를 식별하고 요청을 처리
    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain chain)
            throws IOException, ServletException {
        log.info("[JwtFilter][doFilter] Start");

        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        String requestURI = httpServletRequest.getRequestURI();

        // Swagger 관련 경로 예외 처리
        // 정적 리소스 및 Swagger 관련 경로 예외 처리
        if (isStaticResource(requestURI)) {
            chain.doFilter(request, response);
            return;
        }

        //  Authorization 헤더에서 JWT를 추출합니다.
        String jwt = resolveToken(httpServletRequest);

        if (StringUtils.hasText(jwt) && tokenProvider.validateToken(jwt)) {
            Authentication authentication = tokenProvider.getAuthentication(jwt);
            SecurityContextHolder.getContext().setAuthentication(authentication);

            logger.debug("Security Context에 '{}' 인증 정보를 저장했습니다, uri: {}", authentication.getName(), requestURI);
        } else {
            logger.debug("유효한 JWT 토큰이 없습니다, uri: {}", requestURI);
        }

        chain.doFilter(request, response);
    }

    // Request Header 에서 토큰 정보를 꺼내오기 위한 메소드
    // HTTP 요청의 Authorization 헤더에서 JWT 토큰을 추출하는 메소드
    // Bearer 로 시작하는 JWT 토큰을 찾아서 반환

    private String resolveToken(HttpServletRequest request) {
        log.info("[JwtFilter][resolveToken] Start : " + request);
        String bearerToken = request.getHeader(AUTHORIZATION_HEADER);

        log.info("[JwtFilter][resolveToken] hasText(bearerToken) : " + StringUtils.hasText(bearerToken));

        if (StringUtils.hasText(bearerToken) && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }

        return null;
    }


    private static final String[] WHITELIST = {
            "/swagger-ui.html",
            "/swagger-ui/**",
            "/v3/api-docs/**",
            "/swagger-resources/**",
            "/webjars/**",
            "/swagger-ui/index.html",
            "/swagger-ui/swagger-ui.css",
            "/swagger-ui/swagger-ui-bundle.js",
            "/swagger-ui/swagger-ui-standalone-preset.js",
            "/swagger-ui/index.css",
            "/swagger-ui/swagger-initializer.js",
            "/swagger-ui/favicon-32x32.png",
            "/api-docs/swagger-config",
            "/static/**",
            "/favicon.ico",
            "/api-docs",

    };

    private boolean isStaticResource(String requestURI) {
        for (String path : WHITELIST) {
            if (requestURI.startsWith(path)) {
                return true;
            }
        }
        return false;
    }

}