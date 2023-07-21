import { Component } from '@angular/core';
import {Chapitre} from "../../../../common/chapitre";
import {ChapitreService} from "../../../../services/chapitre.service";

@Component({
  selector: 'app-chapitre',
  templateUrl: './chapitre.component.html',
  styleUrls: ['./chapitre.component.css']
})
export class ChapitreComponent {
  selectedChapitre: Chapitre = new Chapitre();
  nouveauChapitre: Chapitre = new Chapitre();
  displayForm: boolean = false;
  chapitres: Chapitre[] = [];

  constructor(private chapitreService: ChapitreService) {
  }

  ngOnInit(): void {
    this.loadChapitres();
  }

  loadChapitres(): void {
    this.chapitreService.getAllChapitres().subscribe(
      (data) => {
        this.chapitres = data;
      },
      (error) => {
        console.log('Une erreur s\'est produite lors du chargement des chapitres :', error);
      }
    );
  }

  afficherFormulaire(chapitre: Chapitre | string) {
    if (typeof chapitre === 'string' && chapitre === 'Nouveau chapitre') {
      // Afficher le formulaire pour ajouter un nouveau chapitre
      this.selectedChapitre = new Chapitre();
      this.selectedChapitre.titre = 'Nouveau chapitre';

      this.selectedChapitre.cours = {id: null };
      this.displayForm = true;

    } else {
      if (typeof chapitre === 'string' && chapitre !== 'Nouveau chapitre') {
        // Réinitialiser le formulaire si le chapitre sélectionné est invalide
        this.displayForm = false;
        return;
      }
      // Afficher le contenu du chapitre sélectionné
      this.selectedChapitre = chapitre as Chapitre;

      if (this.selectedChapitre.titre === 'Nouveau chapitre') {
        // Réinitialiser le formulaire pour ajouter un nouveau chapitre
        this.displayForm = false;
      } else {
        // Afficher le formulaire de mise à jour du chapitre existant
        this.displayForm = true;
      }
    }
  }


  cancelUpdate(): void {
    this.displayForm = false;
  }

  submitUpdate(): void {
    this.chapitreService.updateChapitre(this.selectedChapitre.id, this.selectedChapitre).subscribe(
      (data) => {
        console.log('Chapitre mis à jour avec succès :', data);
        this.displayForm = false;
        // Réinitialiser le formulaire et recharger la liste des chapitres
        this.selectedChapitre = new Chapitre();
        this.loadChapitres();
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la mise à jour du chapitre :', error);
      }
    );
  }

  deleteChapitre(): void {
    // Récupérer l'ID du cours associé au chapitre
    const coursId = this.selectedChapitre.cours?.id;
    if (!coursId) {
      console.log('ID du cours manquant pour le chapitre sélectionné');
      return;
    }
    this.chapitreService.deleteChapitre(this.selectedChapitre.id, coursId).subscribe(
      () => {
        console.log('Chapitre supprimé avec succès');
        this.displayForm = false;
        // Recharger la liste des chapitres après la suppression
        this.loadChapitres();
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de la suppression du chapitre :', error);
      }
    );
  }

  cancelAdd(): void {
    this.displayForm = false;
  }

  submitAdd(): void {
    // Vérifier si l'ID du cours est défini pour le nouveau chapitre
    if (!this.nouveauChapitre.cours || this.nouveauChapitre.cours.id === null) {
      console.log('ID du cours manquant pour le nouveau chapitre');
      return;
    }

    // Récupérer l'ID du cours associé au nouveau chapitre
    const coursId = this.nouveauChapitre.cours.id;

    this.chapitreService.addChapitreToCours(coursId, this.nouveauChapitre).subscribe(
      (data) => {
        console.log('Nouveau chapitre ajouté avec succès :', data);
        this.displayForm = false;
        // Réinitialiser le formulaire et recharger la liste des chapitres
        this.nouveauChapitre = new Chapitre();
        this.loadChapitres();
      },
      (error) => {
        console.log('Une erreur s\'est produite lors de l\'ajout du chapitre :', error);
      }
    );
  }

}
