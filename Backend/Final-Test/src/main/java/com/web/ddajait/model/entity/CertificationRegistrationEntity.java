package com.web.ddajait.model.entity;

import java.sql.Timestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity(name = "CertificationRegistrationEntity")
@Table(name = "certificateRegistration")
public class CertificationRegistrationEntity {
    @Id
    @Column(nullable = false)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long registration_id;

    @Column(nullable = false, length = 255)
    private String certificateName;

    @Column(nullable = false, length = 50)
    private String types;

    @Column(nullable = false)
    private String round;

    @Column(nullable = false)
    private String testDay;

    @Column(nullable = false)
    private Timestamp receptionStart;

    @Column(nullable = false)
    private Timestamp receptionEnd;

    @Column(nullable = false)
    private String resultDay;

    @ManyToOne
    @JoinColumn(name = "certificate_id")
    private CertificateInfoEntity certificateInfo;

}