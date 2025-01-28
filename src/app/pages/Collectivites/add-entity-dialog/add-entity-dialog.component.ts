import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CollectivitesService } from '../../../services/collectivites/collectivites.service';

@Component({
  selector: 'app-add-entity-dialog',
  templateUrl: './add-entity-dialog.component.html',
})
export class AddEntityDialogComponent {
  nom = ''; // Name of the new entity
  loading = false;

  constructor(
    private collectivitesService: CollectivitesService,
    private dialogRef: MatDialogRef<AddEntityDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { type: string; parentId: number | null }
  ) {}

  save(): void {
    this.loading = true;
    const payload = { nom: this.nom, id_region: this.data.parentId, id_province: this.data.parentId };

    if (this.data.type === 'region') {
      this.collectivitesService.addRegion(payload).subscribe(() => this.closeDialog());
    } else if (this.data.type === 'province') {
      this.collectivitesService.addProvince(payload).subscribe(() => this.closeDialog());
    } else if (this.data.type === 'commune') {
      this.collectivitesService.addCommune(payload).subscribe(() => this.closeDialog());
    }
  }

  closeDialog(): void {
    this.dialogRef.close(true); // Close dialog and trigger refresh
  }
}
