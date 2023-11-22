import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Response {
  id?: string;
  err?: boolean;
  error?: string;
}

@Component({
  selector: 'app-callback',
  templateUrl: './callback.component.html',
  styles: [
  ]
})
export class CallbackComponent implements OnInit {
  constructor(public auth: AuthService, private router: Router, private http: HttpClient) {}

  ngOnInit(): void {
    this.auth.isAuthenticated$.subscribe(loggedIn => {
      console.log('user has logged in');
      this.auth.user$.subscribe(async user => {
        const data = { id: user?.sub, email: user?.email, name: user?.name };
        this.http.post("http://localhost:3007/post-login", data)
          .subscribe({
            next: (response: Response) => {
              if (response.err) {
                console.log(response.error);
              } else {
                this.router.navigate(['/list']);
              } 
            },
            error: error => {
              console.log({error});
            }
          });        
      });
    });
  }
}
