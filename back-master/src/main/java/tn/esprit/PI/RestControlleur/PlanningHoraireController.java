package tn.esprit.PI.RestControlleur;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.PI.Services.PlanningHoraireService;
import tn.esprit.PI.entity.PlanningHoraire;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/PI/planningHoraire")
public class PlanningHoraireController {

    @Autowired
    private PlanningHoraireService planningHoraireService;

    // Méthode pour ajouter un planning horaire
    @PostMapping("/add")
    public ResponseEntity<?> addPlanningHoraire(@RequestBody PlanningHoraire planningHoraire) {
        try {
            PlanningHoraire savedPlanningHoraire = planningHoraireService.savePlanningHoraire(planningHoraire);
            return ResponseEntity.ok().body(Map.of(
                    "message", "Planning ajouté avec succès",
                    "planning", savedPlanningHoraire
            ));
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Méthode pour mettre à jour un planning horaire
    @PutMapping("/update/{id}")
    public ResponseEntity<?> updatePlanningHoraire(@PathVariable Long id, @RequestBody PlanningHoraire planningHoraire) {
        try {
            Optional<PlanningHoraire> existingPlanningHoraire = planningHoraireService.findById(id);
            if (existingPlanningHoraire.isPresent()) {
                planningHoraire.setId(id);
                PlanningHoraire updatedPlanningHoraire = planningHoraireService.savePlanningHoraire(planningHoraire);
                return ResponseEntity.ok().body(Map.of(
                        "message", "Planning mis à jour avec succès",
                        "planning", updatedPlanningHoraire
                ));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Méthode pour supprimer un planning horaire
    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deletePlanningHoraire(@PathVariable Long id) {
        try {
            Optional<PlanningHoraire> existingPlanningHoraire = planningHoraireService.findById(id);
            if (existingPlanningHoraire.isPresent()) {
                planningHoraireService.deletePlanningHoraire(id);
                return ResponseEntity.ok().body(Map.of("message", "Planning supprimé avec succès"));
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    // Méthode pour afficher tous les plannings horaires
    @GetMapping("/all")
    public ResponseEntity<?> getAllPlanningHoraires() {
        try {
            List<PlanningHoraire> allPlanningHoraires = planningHoraireService.findAllPlanningHoraires();
            return ResponseEntity.ok().body(allPlanningHoraires);
        } catch (Exception e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }
}
