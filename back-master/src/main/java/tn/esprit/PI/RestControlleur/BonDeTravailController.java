package tn.esprit.PI.RestControlleur;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import tn.esprit.PI.Services.BonDeTravailService;
import tn.esprit.PI.entity.BonDeTravail;

import java.util.List;

@RestController
@RequestMapping("/PI/bon-de-travail")
@RequiredArgsConstructor
public class BonDeTravailController {

    private final BonDeTravailService bonDeTravailService;

    @GetMapping("/recuperer")
    public List<BonDeTravail> getAllBonDeTravail() {
        return bonDeTravailService.getAllBonDeTravail();
    }

    @GetMapping("/recuperer/{id}")
    public BonDeTravail getBonDeTravailById(@PathVariable Long id) {
        return bonDeTravailService.getBonDeTravailById(id);
    }

    @PostMapping("/add")
    public BonDeTravail createBonDeTravail(@RequestBody BonDeTravail bonDeTravail) {
        return bonDeTravailService.createBonDeTravail(bonDeTravail);
    }

    @PutMapping("/update/{id}")
    public BonDeTravail updateBonDeTravail(@PathVariable Long id, @RequestBody BonDeTravail bonDeTravail) {
        return bonDeTravailService.updateBonDeTravail(id, bonDeTravail);
    }

    @DeleteMapping("/delete/{id}")
    public ResponseEntity<?> deleteBonDeTravail(@PathVariable Long id) {
        bonDeTravailService.deleteBonDeTravail(id);
        return ResponseEntity.ok().build();
    }
}
