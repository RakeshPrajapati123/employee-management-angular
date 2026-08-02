import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LayoutService } from '../../../core/services/layout.service';


@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.html',
  styleUrl: './navbar.css',
})
export class Navbar {


  private layoutService = inject(LayoutService);


  toggleSidebar(){

    this.layoutService.toggleSidebar();

  }

}