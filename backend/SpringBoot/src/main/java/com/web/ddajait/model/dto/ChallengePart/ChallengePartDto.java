package com.web.ddajait.model.dto.ChallengePart;

import com.web.ddajait.model.entity.ChallengePartEntity;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ChallengePartDto {

    @NotBlank
    private int day;

    @NotBlank
    private int partNum;

    @NotBlank
    private String partName;

    @NotBlank
    private String chapterName;

    @NotBlank
    private String sectionName;

    private String partLink;

    @NotBlank
    private String partMission;

    private String memo;

    private boolean randomQuestion;

    @NotBlank
    private Long certificateId;

    public static ChallengePartDto from(ChallengePartEntity entity) {
        if (entity == null)
            return null;

        return ChallengePartDto.builder()
                .certificateId(entity.getCertificateInfo().getCertificateId())
                .chapterName(entity.getChapterName())
                .day(entity.getDay())
                .memo(entity.getMemo())
                .partLink(entity.getPartLink())
                .partName(entity.getPartName())
                .partNum(entity.getPartNum())
                .sectionName(entity.getSectionName())
                .randomQuestion(entity.isRandomQuestion())
                .build();

    }
}
