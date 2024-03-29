package com.my_bible_note.my_bible_note.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@EqualsAndHashCode
@Builder
@ToString
public class KakaoDTO {
    private Long id; // 카카오 사용자 ID

    public KakaoDTO(Long id) {
        this.id = id;
    }

}
