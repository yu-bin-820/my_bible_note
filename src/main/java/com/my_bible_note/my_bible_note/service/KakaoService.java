package com.my_bible_note.my_bible_note.service;

import com.my_bible_note.my_bible_note.dto.KakaoDTO;
import net.minidev.json.JSONObject;
import net.minidev.json.parser.JSONParser;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;

@Service
public class KakaoService {

    @Value("${kakao.client.id}")
    private String KAKAO_CLIENT_ID;

    @Value("${kakao.client.secret}")
    private String KAKAO_CLIENT_SECRET;

    @Value("${kakao.redirect.url}")
    private String KAKAO_REDIRECT_URL;

    private final String tokenInfoUrl = "https://kauth.kakao.com/oauth/token";
    private final String userInfoUrl = "https://kapi.kakao.com/v2/user/me";


    // 카카오 인증 코드를 사용하여 사용자 정보를 가져오는 메서드
    public KakaoDTO getKakaoInfo(String code) throws Exception {
        // 인증 코드가 null인 경우 예외 발생
        if (code == null) throw new Exception("Failed get authorization code");

        // 액세스 토큰과 리프레시 토큰을 저장할 변수 선언
        String accessToken = "";
        String refreshToken = "";

        try {

            // HTTP 헤더 설정: 요청 데이터 타입
            HttpHeaders headers = new HttpHeaders();
            headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

            // HTTP 요청 본문에 포함될 파라미터 설정
            MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
            params.add("grant_type", "authorization_code"); // authorization_code로 고정
            params.add("client_id", KAKAO_CLIENT_ID); // 앱 REST API 키
            params.add("client_secret", KAKAO_CLIENT_SECRET); // 토큰 발급 시, 보안을 강화하기 위해 추가 확인하는 코드
            params.add("code", code); // 인가 코드 받기 요청으로 얻은 인가 코드
            params.add("redirect_uri", KAKAO_REDIRECT_URL); // 인가 코드가 리다이렉트된 URI

            RestTemplate restTemplate = new RestTemplate();
            HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(params, headers);

            // 카카오 토큰 인증 URL에 POST 요청을 보내 액세스 토큰 요청
            ResponseEntity<String> response = restTemplate.exchange(
                    tokenInfoUrl, // 카카오 토큰 인증 URL
                    HttpMethod.POST, // HTTP 메서드
                    httpEntity, // 요청 엔티티 (헤더 + 파라미터)
                    String.class // 응답 타입
            );

            System.out.println(response.getBody());

            // 응답 본문(JSON 문자열)을 파싱하여 JSONObject로 변환
            JSONParser jsonParser = new JSONParser();
            JSONObject jsonObj = (JSONObject) jsonParser.parse(response.getBody());

            // JSONObject에서 액세스 토큰과 리프레시 토큰 추출
            accessToken = (String) jsonObj.get("access_token");
            refreshToken = (String) jsonObj.get("refresh_token");
        } catch (Exception e) {
            throw new Exception("API call failed");
        }

        // 액세스 토큰을 사용하여 사용자 정보를 조회한 후, 결과를 반환
        return getUserInfoWithToken(accessToken);
    }

    private KakaoDTO getUserInfoWithToken(String accessToken) throws Exception {
        //HttpHeader 생성
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-type", "application/x-www-form-urlencoded;charset=utf-8");

        //HttpHeader 담기
        RestTemplate rt = new RestTemplate();
        HttpEntity<MultiValueMap<String, String>> httpEntity = new HttpEntity<>(headers);
        ResponseEntity<String> response = rt.exchange(
                userInfoUrl,
                HttpMethod.POST,
                httpEntity,
                String.class
        );

        //Response 데이터 파싱
        JSONParser jsonParser = new JSONParser();
        JSONObject jsonObj    = (JSONObject) jsonParser.parse(response.getBody());

        long id = (long) jsonObj.get("id");

        return KakaoDTO.builder()
                .id(id).build();
    }


}
