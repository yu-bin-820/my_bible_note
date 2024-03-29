package com.my_bible_note.my_bible_note.dto;

import lombok.*;

@Data
@Builder
public class KakaoDTO {
    private Long id; // 카카오 사용자 ID

    public KakaoDTO(Long id) {
        this.id = id;
    }

}
