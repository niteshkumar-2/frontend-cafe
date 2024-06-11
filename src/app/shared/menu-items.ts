import { Injectable } from '@angular/core';

export interface Menu {
  state: string;
  name: string;
  icon: string;
  role: string;
}

const MENUITEMS = [
  { state: 'dashboard', name: 'Dashboard', icon: 'dashboard', role: '' },
];

@Injectable()
export class MenuItems {
  role: any;
  getMenuitem(): Menu[] {
    return MENUITEMS;
  }
}
