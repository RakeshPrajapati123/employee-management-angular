import { Component, inject, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';

import { AuthService } from '../../../core/services/auth/auth.service';
import { LayoutService } from '../../../shared/services/layout.service';

@Component({
selector: 'app-navbar',
imports: [RouterLink],
templateUrl: './navbar.html',
styleUrl: './navbar.css'
})
export class Navbar implements OnDestroy {

private readonly layoutService = inject(LayoutService);
private readonly authService = inject(AuthService);
private readonly router = inject(Router);

userName = '';

private readonly storageListener = (event: StorageEvent): void => {
if (event.key === 'logoutEvent') {
this.router.navigate(['/login']);
}
};

constructor() {
window.addEventListener('storage', this.storageListener);
}

toggleSidebar(): void {
this.layoutService.toggleSidebar();
}

logout(): void {
this.authService.logout();
this.router.navigate(['/login']);
}

ngOnDestroy(): void {
window.removeEventListener('storage', this.storageListener);
}
}