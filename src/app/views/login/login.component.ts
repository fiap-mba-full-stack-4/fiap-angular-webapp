import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { faGoogle, faGithub, IconDefinition } from '@fortawesome/free-brands-svg-icons';
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    isLoggedIn: boolean = false;
    faGoogle: IconDefinition = faGoogle;
    faGithub: IconDefinition = faGithub;
    faSignInAlt: IconDefinition = faSignInAlt;

    loginForm: FormGroup = this.formBuilder.group({
        email: '',
        password: ''
    });

    constructor(private formBuilder: FormBuilder, private authService: AuthService, private tokenStorage: TokenStorageService, private router: Router) { }

    ngOnInit(): void {
    }

    onSubmit(): void {
        const { email, password } = this.loginForm.value;
        if (!email || !password) {
            alert("Informa email e senha para logar.");
            return;
        }
        this.authService.login(email, password).subscribe(
            data => {
                if (data) {
                    this.tokenStorage.saveUser(data);
                    this.router.navigate(['/']);
                }
            },
            err => {
                alert("Erro no login: " + err.error.message);
                this.loginForm.reset();
            }
        )
    }

    loginGoogle(): void {
        this.authService.loginGoogle().subscribe(
            data => {
                if (!!data) {
                    this.tokenStorage.saveUser(data);
                    this.router.navigate(['/']);
                }
            }
        )

    }

    loginGithub(): void {
        this.authService.loginGithub().subscribe(
            data => {
                if (!!data) {
                    this.tokenStorage.saveUser(data);
                    this.router.navigate(['/']);
                }
            }
        )

    }
}
