import { Component, OnInit } from '@angular/core';
import { CourrierService } from '../services/courrier.service';

export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; // Support for submenus
    expanded?: boolean; // Optional property for tracking submenu state
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard', title: 'Dashboard', icon: 'nc-bank', class: '' },
    {
        path: '/courriers',
        title: 'Courriers',
        icon: 'nc-email-85',
        class: '',
        expanded: false,
        children: [], // Start with an empty array, to be populated dynamically
    },
    /* Add other menu items here if necessary */
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
        menuItem.expanded = !menuItem.expanded;
    }

    // Initialize menu with dynamic data
    initializeMenu(): void {
        this.menuItems = ROUTES.filter((menuItem) => menuItem); // Start with predefined menu structure

        const courriersMenu = this.menuItems.find((item) => item.path === '/courriers');
        if (courriersMenu) {
            this.courrierService.getTypes().subscribe(
                (types) => {
                    courriersMenu.children = types.map((type: any) => ({
                        path: `/courriers/${type.id}`,
                        title: type.nom,
                        icon: '', // Add specific icons if needed
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
