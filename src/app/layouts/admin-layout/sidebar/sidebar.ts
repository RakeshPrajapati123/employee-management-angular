import { Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class Sidebar {

  employeeMenuOpen = signal(false);

  masterMenuOpen = signal(false);

  reportsMenuOpen = signal(false);

  administrationMenuOpen = signal(false);



  toggleEmployeeMenu() {
    this.employeeMenuOpen.update(value => !value);
  }


  toggleMasterMenu() {
    this.masterMenuOpen.update(value => !value);
  }


  toggleReportsMenu() {
    this.reportsMenuOpen.update(value => !value);
  }


  toggleAdministrationMenu() {
    this.administrationMenuOpen.update(value => !value);
  }

}