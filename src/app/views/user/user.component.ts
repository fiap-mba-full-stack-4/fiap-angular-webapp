import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';

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

    constructor(private route: ActivatedRoute, private formBuilder: FormBuilder) {
        this.isUserRegister = this.route.snapshot.data.isUserRegister === undefined ? false : this.route.snapshot.data.isUserRegister;
        this.submitBtnLbl = this.isUserRegister ? "Criar" : "Salvar";
        this.isEditing = this.isUserRegister
    }

    ngOnInit(): void { }

    onSubmit(): void {
        alert("Submit");
    }

    toggleEdit(edit: boolean): void {
        this.isEditing = edit;
    }

}
