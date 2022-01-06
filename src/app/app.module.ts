import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { TopBarComponent } from './views/top-bar/top-bar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatCardModule } from '@angular/material/card'
import { CursoCardComponent, } from './views/curso-card/curso-card.component'
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { CursoDetailsComponent } from './views/curso-details/curso-details.component';
import { UserComponent } from './views/user/user.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';

@NgModule({
    declarations: [
        AppComponent,
        HomeComponent,
        TopBarComponent,
        CursoCardComponent,
        CursoDetailsComponent,
        UserComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatToolbarModule,
        MatIconModule,
        MatCardModule,
        FlexLayoutModule,
        BrowserModule,
        BrowserAnimationsModule,
        FlexLayoutModule,
        HttpClientModule,
        MatExpansionModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatButtonModule,
        FormsModule,
        MatInputModule
    ],
    providers: [],
    bootstrap: [AppComponent]

})
export class AppModule { }
