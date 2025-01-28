import { Component, OnInit } from '@angular/core';
import { CollectivitesService } from '../../../services/collectivites/collectivites.service';
import { MatDialog } from '@angular/material/dialog';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { AddEntityDialogComponent } from '../add-entity-dialog/add-entity-dialog.component';

export interface HierarchyNode {
  id: number;
  nom: string;
  type: 'region' | 'province' | 'commune';
  children?: HierarchyNode[];
}

export interface FlatNode {
  id: number;
  nom: string;
  type: 'region' | 'province' | 'commune';
  level: number;
  expandable: boolean;
}

@Component({
  selector: 'app-all-collectivites',
  templateUrl: './all-collectivites.component.html',
  styleUrls: ['./all-collectivites.component.scss'],
})
export class AllCollectivitesComponent implements OnInit {
  treeControl: FlatTreeControl<FlatNode>;
  treeFlattener: MatTreeFlattener<HierarchyNode, FlatNode>;
  dataSource: MatTreeFlatDataSource<HierarchyNode, FlatNode>;

  constructor(
    private collectivitesService: CollectivitesService,
    private dialog: MatDialog
  ) {
    this.treeFlattener = new MatTreeFlattener<HierarchyNode, FlatNode>(
      (node, level) => ({
        id: node.id,
        nom: node.nom,
        type: node.type,
        level,
        expandable: !!node.children && node.children.length > 0,
      }),
      (node) => node.level,
      (node) => node.expandable,
      (node) => node.children || []
    );

    this.treeControl = new FlatTreeControl<FlatNode>(
      (node) => node.level,
      (node) => node.expandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );
  }

  ngOnInit(): void {
    this.fetchCollectivites();
  }

  fetchCollectivites(): void {
    this.collectivitesService.getCollectivites().subscribe((data: any[]) => {
      const transformedData = this.transformData(data);
      this.dataSource.data = transformedData;

      console.log('Transformed Data:', transformedData); // Debugging
    });
  }

  private transformData(data: any[]): HierarchyNode[] {
    return data.map((region) => ({
      id: region.id,
      nom: region.nom,
      type: 'region',
      children: region.provinces.map((province) => ({
        id: province.id,
        nom: province.nom,
        type: 'province',
        children: province.communes.map((commune) => ({
          id: commune.id,
          nom: commune.nom,
          type: 'commune',
          children: [], // No further nesting for communes
        })),
      })),
    }));
  }

  hasChild = (_: number, node: FlatNode) => node.expandable;

  openAddDialog(type: 'region' | 'province' | 'commune', parentId: number | null = null): void {
    const dialogRef = this.dialog.open(AddEntityDialogComponent, {
      width: '400px',
      data: { type, parentId },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.fetchCollectivites(); // Refresh data after adding
      }
    });
  }
}
