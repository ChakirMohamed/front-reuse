import { Component, OnInit } from '@angular/core';
import { CourrierService } from '../services/courrier.service';

export interface RouteInfo {
    path: string;
    title: string;
    navTitle: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; // Support for submenus
    expanded?: boolean; // Optional property for tracking submenu state
}

export const ROUTES: RouteInfo[] = [
  { path: "/Dashboard", title: "Dashboard", icon: "nc-bank", class: "",navTitle:"Dashboard" },
  {
    path: "/conventions",
    title: "Conventions",
    navTitle: "Conventions",
    icon: "nc-book-bookmark",
    class: "",
    expanded: false,
    children: [
      { path: `/ajouter-convention`, navTitle: "Nouvelle convention", class: "", icon: null,title:"Ajouter" },
      { path: `/conventions`, navTitle: "Les conventions", class: "", icon: null,title:"Afficher" },
    ],
  },
  {
    path: "/courriers",
    title: "Courriers",
    navTitle: "Courriers",
    icon: "nc-email-85",
    class: "",
    expanded: false,
    children: [], // Start with an empty array, to be populated dynamically
  },
  {
    path: "/steps",
    title: "STEPs",
    navTitle: "STEPs",
    icon: "nc-atom",
    class: "",
    expanded: false,
    children: [
      { path: `/ajouter-step`, title: "Ajouter",navTitle: "Nounelle STEP", class: "", icon: null },
      { path: `/list-steps`, navTitle: "Liste des STEP",title:"Afficher", class: "", icon: null },
    ],
  },
  {
    path: "/404",
    title: " Golfs",
    navTitle: " Golfs",
    icon: "nc-pin-3",
    class: "",
  },
  {
    path: "/collectivites",
    title: " Collectivités",
    navTitle: " Collectivités",
    icon: "nc-world-2",
    class: "",
  },



  //{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
  // { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
  //{ path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
  // { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
  // { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
  // { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
  // { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})
export class SidebarComponent implements OnInit {
    public menuItems: RouteInfo[] = [];

    constructor(private courrierService: CourrierService) {}

    ngOnInit() {
        this.initializeMenu();
    }

    // Toggle submenu expanded state
    toggleSubmenu(menuItem: RouteInfo): void {
      this.menuItems.forEach(i => i.expanded = i === menuItem ? !i.expanded : false);
    }

    // Initialize menu with dynamic data
    initializeMenu(): void {
        this.menuItems = ROUTES.filter((menuItem) => menuItem); // Start with predefined menu structure

        const courriersMenu = this.menuItems.find((item) => item.path === '/courriers');
        if (courriersMenu) {
            this.courrierService.getTypes().subscribe(
                (types) => {
                    courriersMenu.children = types.map((type: any) => ({
                        path: `/courriers/type/${type.nom}`,
                        navTitle: "Courriers: "+type.nom,
                        title: type.nom,

                        class: '',
                    }));
                },
                (error) => {
                    console.error('Error fetching types-courrier:', error);
                }
            );
        }


    }
}




/*{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },*/
