import { Injectable } from '@angular/core';

export interface ChildrenItems {
  state: string;
  name: string;
  type?: string;
}

export interface Menu {
  state: string;
  name: string;
  type: string;
  icon: string;
  children?: ChildrenItems[];
}

const MENUITEMS = [
  {
    state: 'dashboard',
    name: 'Mon contrat',
    type: 'link',
    icon: 'icon-speedometer icons',
  },
  {
    state: 'infos',
    name: 'Mes informations contrats',
    type: 'link',
    icon: 'icon-calendar icons',
  },
  {
    state: 'document',
    name: 'Mes documents',
    type: 'link',
    icon: 'icon-book-open icons',
  }
];

@Injectable()
export class MenuItems {
  getAll(): Menu[] {
    return MENUITEMS;
  }
  add(menu: any) {
    MENUITEMS.push(menu);
  }
}
