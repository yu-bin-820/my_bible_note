package com.my_bible_note.my_bible_note.repository;

import com.my_bible_note.my_bible_note.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository

public interface MemberRepository extends JpaRepository<Member, Integer> {
    Member findByMemberId(long memberId);


    Optional<Member> findByMemberNo(int memberNo);


}
