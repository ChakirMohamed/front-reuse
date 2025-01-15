import { Component, OnInit } from '@angular/core';


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
    children?: RouteInfo[]; // support for submenus
    expanded?: boolean; // Optional property for tracking submenu state

}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-bank',       class: '' },
    {
      path: '/courriers',   title: 'Courriers',         icon:'nc-email-85',   class: '',
      expanded: false,
      children: [
          { path: '/courriers/conventions',    title: 'Conventions',    icon: '', class: '' },
          { path: '/courriers/demande-appui',  title: 'Demande d\'appui', icon: '', class: '' },
          { path: '/courriers/autre',          title: 'Autre',          icon: '', class: '' },
      ]
    },
    /*{ path: '/icons',         title: 'Icons',             icon:'nc-diamond',    class: '' },
    { path: '/maps',          title: 'Maps',              icon:'nc-pin-3',      class: '' },
    { path: '/notifications', title: 'Notifications',     icon:'nc-bell-55',    class: '' },
    { path: '/user',          title: 'User Profile',      icon:'nc-single-02',  class: '' },
    { path: '/table',         title: 'Table List',        icon:'nc-tile-56',    class: '' },
    { path: '/typography',    title: 'Typography',        icon:'nc-caps-small', class: '' },
    { path: '/upgrade',       title: 'Upgrade to PRO',    icon:'nc-spaceship',  class: 'active-pro' },*/
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }
    toggleSubmenu(menuItem: RouteInfo): void {
      menuItem.expanded = !menuItem.expanded; // Toggle expanded state
  }
}
