package com.web.ddajait.model.dto.User;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

public class UserInfoDto {

    @Schema(description = "닉네임", example = "YUN")
    String nickname ;

    @Schema(description = "나이", example = "28")
    private String age="";

    @Schema(description = "성별", example = "여자")
    private String gender="";

    @Schema(description = "관심분야", example = "[정보보안]")
    private List<String> interest;

    @Schema(description = "직업", example = "[학생]")
    private List<String>  job;

    @Schema(description = "자격증", example = "[정보처리기사]")
    private List<String>  qualified_certificate;

}