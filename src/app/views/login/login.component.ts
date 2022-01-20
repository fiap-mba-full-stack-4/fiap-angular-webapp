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
        console.log("teste 1");

        const { email, password } = this.loginForm.value;
        let successLogin: boolean = false;
        this.authService.login(email).subscribe(
            data => {
                if (!!data && data.length > 0) {
                    if (password === data[0].password) {
                        successLogin = true;
                        data[0].password = undefined;
                        this.tokenStorage.saveUser(data[0]);

                    }
                }
                if (successLogin) {
                    this.router.navigate(['/']);
                } else {
                    alert("Login ou Senha inválidos")
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
                    this.tokenStorage.saveUser(data[0]);
                    this.router.navigate(['/']);
                }
            }
        )

    }

    loginGithub(): void {

        console.log("teste 2");
        this.authService.loginGithub().subscribe(
            data => {
                if (!!data) {
                    this.tokenStorage.saveUser(data[0]);
                    this.router.navigate(['/']);
                }
            }
        )

    }
}
