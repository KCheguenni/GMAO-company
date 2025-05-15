package tn.esprit.PI.Services;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import tn.esprit.PI.entity.BonDeTravail;
import tn.esprit.PI.repository.BonDeTravailRepository;

import java.util.List;

@Service
@RequiredArgsConstructor
public class BonDeTravailService {
    private final BonDeTravailRepository bonDeTravailRepository;

    public List<BonDeTravail> getAllBonDeTravail() {
        return bonDeTravailRepository.findAll();
    }

    public BonDeTravail getBonDeTravailById(Long id) {
        return bonDeTravailRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Bon de Travail non trouvé"));
    }

    public BonDeTravail createBonDeTravail(BonDeTravail bonDeTravail) {
        return bonDeTravailRepository.save(bonDeTravail);
    }

    public BonDeTravail updateBonDeTravail(Long id, BonDeTravail bonDeTravailDetails) {
        BonDeTravail bonDeTravail = getBonDeTravailById(id);
        bonDeTravail.setDescription(bonDeTravailDetails.getDescription());
        bonDeTravail.setStatut(bonDeTravailDetails.getStatut());
        bonDeTravail.setTechnicien(bonDeTravailDetails.getTechnicien());
        bonDeTravail.setComposants(bonDeTravailDetails.getComposants());
        return bonDeTravailRepository.save(bonDeTravail);
    }

    public void deleteBonDeTravail(Long id) {
        bonDeTravailRepository.deleteById(id);
    }

}
