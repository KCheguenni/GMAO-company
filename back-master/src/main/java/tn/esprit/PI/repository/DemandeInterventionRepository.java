package tn.esprit.PI.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import tn.esprit.PI.entity.DemandeIntervention;

@Repository
public interface DemandeInterventionRepository extends JpaRepository<DemandeIntervention, Long> {
}
