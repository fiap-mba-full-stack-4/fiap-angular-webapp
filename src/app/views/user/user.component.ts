import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TokenStorageService } from 'src/app/services/token-storage.service';
import { User } from 'src/app/models/user';

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

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder, private tokenStorage: TokenStorageService, private router: Router) {
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
