package com.my_bible_note.my_bible_note.jwt;

import com.my_bible_note.my_bible_note.dto.MemberDto;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.SignatureAlgorithm;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.stereotype.Component;

import java.util.Collections;
import java.util.Date;
import java.util.List;

@Component
public class JwtTokenProvider {

    @Value("${jwt.access.token.expiration.seconds}")
    private long accessTokenExpirationInSeconds;

    private static String secretKey = "itsepguyitsepguyitsepgyitsitsits";

    public String createToken(int memberNo) {
        long now = System.currentTimeMillis();
        Date validity = new Date(now + accessTokenExpirationInSeconds * 1000); // 초를 밀리초로 변환

        return Jwts.builder()
                .setSubject(String.valueOf(memberNo))
                .setIssuedAt(new Date(now))
                .setExpiration(validity)
                .signWith(SignatureAlgorithm.HS256, secretKey.getBytes())
                .compact();
    }

    // Header에서 Access Token 가져오기
    public static String resolveToken(HttpServletRequest request){
        String bearerToken = request.getHeader("Authorization");
        if (bearerToken != null && bearerToken.startsWith("Bearer ")) {
            return bearerToken.substring(7);
        }
        return null;
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token);
            return true;
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Expired or invalid JWT token");
        }
    }

    public static int getUserNoFromToken(String token) {
        return Integer.parseInt(Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token).getBody().getSubject());
    }

    public Authentication getAuthentication(String token) {
        Claims claims = Jwts.parser().setSigningKey(secretKey.getBytes()).parseClaimsJws(token).getBody();
        long memberId = Long.parseLong(claims.getSubject());

        MemberDto member = new MemberDto(); // MemberDto 인스턴스 생성
        member.setMemberId(memberId);
        // 필요한 추가 로직

        List<SimpleGrantedAuthority> authorities = Collections.singletonList(new SimpleGrantedAuthority("ROLE_USER"));

        return new UsernamePasswordAuthenticationToken(member, null, authorities);
    }
}
