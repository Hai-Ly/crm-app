import { Component } from '@angular/core';
import { AuthService } from './core';

@Component({
  selector: 'crm-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'LogiGear CRM';
  
  constructor(private authService: AuthService) {

  }

  ngOnInit() {
    this.authService.populate();
  }
}
