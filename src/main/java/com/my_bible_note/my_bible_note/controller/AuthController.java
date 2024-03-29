package com.my_bible_note.my_bible_note.controller;

import com.my_bible_note.my_bible_note.dto.MemberMarkDto;
import com.my_bible_note.my_bible_note.jwt.JwtTokenProvider;
import com.my_bible_note.my_bible_note.service.KakaoService;
import com.my_bible_note.my_bible_note.service.MemberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/kakao")
public class AuthController {

    private final KakaoService kakaoService;

    private final MemberService memberService;
    private final JwtTokenProvider jwtTokenProvider; // JwtTokenProvider 주입



    public AuthController(KakaoService kakaoService, MemberService memberService, JwtTokenProvider jwtTokenProvider) {
        this.kakaoService = kakaoService;
        this.memberService = memberService;
        this.jwtTokenProvider = jwtTokenProvider;
    }

    @GetMapping("/login/{code}")
    public ResponseEntity<Map<String, Object>> callback(@PathVariable String code) throws Exception {

        //로그인(멤벙DTO리턴)
        MemberMarkDto memberMarkInfo = memberService.getMemberMarkInfoByKakaoCode(code);

        // JwtTokenProvider 인스턴스를 통해 토큰 생성
        String token = jwtTokenProvider.createToken(memberMarkInfo.getMemberNo());

        Map<String, Object> response = new HashMap<>();
        response.put("member", memberMarkInfo);
        response.put("token", token);

        System.out.println("token: "+ token);



        return ResponseEntity.ok(response);
    }


}


