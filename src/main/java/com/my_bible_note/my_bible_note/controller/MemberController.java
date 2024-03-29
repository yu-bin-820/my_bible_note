package com.my_bible_note.my_bible_note.controller;

import com.my_bible_note.my_bible_note.dto.MemberDto;
import com.my_bible_note.my_bible_note.dto.MemberMarkDto;
import com.my_bible_note.my_bible_note.jwt.JwtTokenProvider;
import com.my_bible_note.my_bible_note.service.MemberService;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
public class MemberController {

    @Autowired
    private MemberService memberService;

    @GetMapping("/login/{memberId}")
    public MemberMarkDto loginCheck(@PathVariable long memberId) {

        MemberMarkDto memberMarkDto = memberService.getMemberMark(memberId);

        if(memberMarkDto==null){



            return memberService.getMemberMark(memberId);

        }

        return memberService.getMemberMark(memberId);
    }

    @GetMapping
    public MemberMarkDto getMemberMark(HttpServletRequest request){
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));

        return memberService.getMemberMarkByMemberNo(memberNo);
    }

    @PutMapping("/mark")
    public MemberMarkDto updateMemberMark(@RequestBody MemberMarkDto memberMarkDto, HttpServletRequest request) {
        int memberNo = JwtTokenProvider.getUserNoFromToken(JwtTokenProvider.resolveToken(request));
        System.out.println(memberMarkDto.getMarkTestament());
        System.out.println(memberMarkDto.getMarkBook());
        System.out.println(memberMarkDto.getMarkChapter());


        return memberService.updateMemberMark(memberMarkDto, memberNo);
    }
}