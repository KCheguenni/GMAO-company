package tn.esprit.PI.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;

import java.io.Serializable;
import java.util.Date;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Inheritance(strategy = InheritanceType.SINGLE_TABLE)
@DiscriminatorColumn(name = "type_demande", discriminatorType = DiscriminatorType.STRING)
public class DemandeIntervention implements Serializable {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(insertable = false, updatable = false)
    private String type_demande;

    private String description;
    private Date dateDemande;

    @Enumerated(EnumType.STRING)
    private StatutDemande statut;

    private String priorite;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "demandeur")
    @JsonBackReference
    private User demandeur;
}

