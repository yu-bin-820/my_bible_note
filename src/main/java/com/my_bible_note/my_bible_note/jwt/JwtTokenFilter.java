package com.my_bible_note.my_bible_note.jwt;

import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.ServletRequest;
import jakarta.servlet.ServletResponse;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.GenericFilterBean;

import java.io.IOException;

@Component
public class JwtTokenFilter extends GenericFilterBean {

    private JwtTokenProvider jwtTokenProvider;


    @Override
    public void doFilter(ServletRequest request, ServletResponse response, FilterChain filterChain) throws IOException, ServletException {
        System.out.println("doFilter");
        HttpServletRequest httpServletRequest = (HttpServletRequest) request;
        HttpServletResponse httpServletResponse = (HttpServletResponse) response;
        String requestURI = httpServletRequest.getRequestURI();

        // 특정 경로에 대한 요청인 경우 필터의 나머지 로직을 건너뛰고 필터 체인을 계속 진행
        if (!requestURI.startsWith("/notes")) {
            filterChain.doFilter(httpServletRequest, response);
            return; // 메소드 종료
        }

        try {
            String token = JwtTokenProvider.resolveToken(httpServletRequest);
            //토큰의 존재 여부 검사 및  유효성 검사
            if (token != null && jwtTokenProvider.validateToken(token)) {
                Authentication auth = jwtTokenProvider.getAuthentication(token);
                SecurityContextHolder.getContext().setAuthentication(auth);
            } else {
                // 토큰이 유효하지 않을 경우 여기서 처리(401)
                httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
                httpServletResponse.getWriter().write("유효하지 않은 토큰");
                return;
            }
        } catch (Exception e) {
            // 예외 처리(401)
            httpServletResponse.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            httpServletResponse.getWriter().write("Invalid token or error occurred");
            return;
        }

        filterChain.doFilter(httpServletRequest, response);
    }
}

