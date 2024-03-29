package com.my_bible_note.my_bible_note.service;

import com.my_bible_note.my_bible_note.dto.KakaoDTO;
import com.my_bible_note.my_bible_note.dto.MemberMarkDto;
import com.my_bible_note.my_bible_note.entity.Member;
import com.my_bible_note.my_bible_note.entity.Note;
import com.my_bible_note.my_bible_note.enums.Book;
import com.my_bible_note.my_bible_note.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    private final KakaoService kakaoService;

    public MemberService(KakaoService kakaoService) {
        this.kakaoService = kakaoService;
    }



    public MemberMarkDto getMemberMark(long memberId) {
        Member member = memberRepository.findByMemberId(memberId);
        return new MemberMarkDto(member.getMemberNo(), member.getMarkTestament(), member.getMarkBook(), member.getMarkChapter(), member.getMarkVerse());
    }

    public MemberMarkDto getMemberMarkByMemberNo(int memberNo) {
        Member member = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid noteNo"));
        return new MemberMarkDto(member.getMemberNo(), member.getMarkTestament(), member.getMarkBook(), member.getMarkChapter(), member.getMarkVerse());
    }

    public MemberMarkDto saveMember(long memberId) {
        // 새로운 멤버 생성
        Member newMember = new Member();
        newMember.setMemberId(memberId);
        newMember.setMarkTestament(1);
        newMember.setMarkBook(1);
        newMember.setMarkChapter(1);
        newMember.setMarkVerse(1);

        // 멤버 저장
        Member savedMember = memberRepository.save(newMember);

        // 저장된 멤버의 정보를 DTO로 변환하여 반환
        return new MemberMarkDto(savedMember.getMemberNo(),
                savedMember.getMarkTestament(), savedMember.getMarkBook(),
                savedMember.getMarkChapter(), savedMember.getMarkVerse());
    }

    public MemberMarkDto updateMemberMark(MemberMarkDto memberMarkDto, int memberNo){

        Member existingMember = memberRepository.findByMemberNo(memberNo)
                .orElseThrow(() -> new IllegalArgumentException("Invalid noteNo"));

        if( existingMember.getMemberNo()!=memberNo ){
            throw new IllegalArgumentException("Not authorized");
        }

        Member member = new Member();

        member.setMemberId(existingMember.getMemberId());
        member.setMarkTestament(Book.fromValue(memberMarkDto.getMarkBook()).getTestament().getValue());
        member.setMarkBook(memberMarkDto.getMarkBook());
        member.setMarkChapter(memberMarkDto.getMarkChapter());
        member.setMarkVerse(memberMarkDto.getMarkVerse());
        member.setMemberNo(memberNo);

        Member updatedMember = memberRepository.save(member);

        // 업데이트된 멤버의 정보를 DTO로 변환하여 반환
        return new MemberMarkDto(updatedMember.getMemberNo(), updatedMember.getMarkTestament(),
                updatedMember.getMarkBook(), updatedMember.getMarkChapter(),
                updatedMember.getMarkVerse());
    }


    public MemberMarkDto getMemberMarkInfoByKakaoCode(String code) throws Exception {

        KakaoDTO kakaoInfo = kakaoService.getKakaoInfo(code);

        Member member = memberRepository.findByMemberId(kakaoInfo.getId());

        if ( member!= null){
            return new MemberMarkDto(member.getMemberNo(), member.getMarkTestament(), member.getMarkBook(), member.getMarkChapter(), member.getMarkVerse());
        }

        return saveMember(kakaoInfo.getId());
    }
}