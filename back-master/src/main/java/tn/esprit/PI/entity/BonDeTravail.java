package tn.esprit.PI.entity;

import jakarta.persistence.*;
import lombok.*;
import lombok.experimental.FieldDefaults;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@FieldDefaults(level = AccessLevel.PRIVATE)
public class BonDeTravail {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;

    @Column(nullable = false)
    String description;

    @Column(nullable = false)
    LocalDate dateCreation;

    @Enumerated(EnumType.STRING)
    @Column(nullable = false)
    StatutBonTravail statut;

    @ManyToOne
    @JoinColumn(name = "technicien_id", nullable = false)
    User technicien;

    @ManyToMany
    @JoinColumn(name = "trart_article", nullable = false)
    List<Component> composants;
}

// Enumération des statuts du Bon de Travail
enum StatutBonTravail {
    EN_ATTENTE,
    EN_COURS,
    TERMINE
}


