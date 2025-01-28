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
