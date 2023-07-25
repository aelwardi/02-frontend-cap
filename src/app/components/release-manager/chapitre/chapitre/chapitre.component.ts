import {Component} from '@angular/core';
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

  submitUpdate(coursId: number, chapitreId: number, theChapitre: Chapitre): void {
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

  submitAdd(coursId: number): void {
    //Appelez le service pour ajouter le chapitre
    this.chapitreService.addChapitreToCours(coursId, this.nouveauChapitre).subscribe(
      chapitre => {
        // Mettez à jour la liste des chapitres après l'ajout
        this.chapitres.push(chapitre);
        // Réinitialisez l'objet "nouveauChapitre" pour le formulaire
        this.nouveauChapitre = new Chapitre();
      },
      error => {
        console.log('Erreur lors de l\'ajout du chapitre :', error);
      }
    );
  }

}
