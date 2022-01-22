import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/user';
import { AuthService } from 'src/app/services/auth.service';
import { UserService } from 'src/app/services/user.service';

@Component({
    selector: 'app-user',
    templateUrl: './user.component.html',
    styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

    isUserRegister: boolean = false;
    submitBtnLbl: string = "";
    isEditing: boolean = false;
    userProfileForm: FormGroup = this.formBuilder.group({
        name: "",
        email: "",
        password: "",
        passwordConfirmation: ""
    })
    userLogged: User | null = null;

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router, private authService: AuthService, private userService: UserService) {
        this.isUserRegister = this.route.snapshot.data.isUserRegister === undefined ? false : this.route.snapshot.data.isUserRegister;
        this.submitBtnLbl = this.isUserRegister ? "Criar" : "Salvar";
        this.isEditing = this.isUserRegister
    }

    ngOnInit(): void {
        if (!this.isUserRegister) {
            this.userLogged = this.tokenStorage.getUser();
            if (!!this.userLogged) {
                this.userProfileForm.setValue({
                    name: this.userLogged.nome,
                    email: this.userLogged.email,
                    password: "",
                    passwordConfirmation: ""
                })
            }
        }
    }

    onSubmit(): void {
        const { name, email, password, passwordConfirmation } = this.userProfileForm.value;
        if (!name || !email || !password || !passwordConfirmation) {
            alert("Favor preencher os campos obrigatórios");
            return;
        }
        if (this.isUserRegister) {
            if (password === passwordConfirmation) {
                this.authService.register(name, email, password).subscribe(
                    user => {
                        if (user) {
                            this.tokenStorage.saveUser(user);
                            this.router.navigate(['/']);
                        }
                    },
                    err => {
                        alert("Erro para cadastrar usuario: " + err.error.message)
                    }
                )
            } else {
                alert("A confirmação da senha está incorreta");
            }

        } else {
            if (password === passwordConfirmation) {
                if (this.userLogged?.id) {
                    this.userService.update(this.userLogged.id.toString(), name, password).subscribe(
                        user => {
                            if (user) {
                                this.tokenStorage.saveUser(user);
                                this.userProfileForm.setValue({
                                    name: user.nome,
                                    email: user.email,
                                    password: "",
                                    passwordConfirmation: ""
                                });
                                this.toggleEdit(false);
                                alert("Usuário atualizado");
                            } else {
                                alert("Erro para fazer login, tente novamente")
                            }
                        },
                        err => {
                            alert("Erro para atualizar usuario: " + err.error.message)
                        }
                    )
                } else {
                    alert("Usuário não logado");
                }
            } else {
                alert("A confirmação da senha está incorreta");
            }
        }
    }

    logout(): void {
        this.tokenStorage.signOut();
        this.router.navigate(['login']);
    }

    toggleEdit(edit: boolean): void {
        this.isEditing = edit;
    }

    cancelEdit(): void {
        this.userProfileForm.reset({
            name: !!this.userLogged ? this.userLogged.nome : "",
            email: !!this.userLogged ? this.userLogged.email : "",
            password: "",
            passwordConfirmation: ""
        })
        this.toggleEdit(false);
    }
}
