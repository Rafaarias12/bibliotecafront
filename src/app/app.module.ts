import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LibrosComponent } from './libros/libros.component';
import { LoginComponent } from './login/login.component';
import { PrestamosComponent } from './prestamos/prestamos.component';
import { UsuariosComponent } from './usuarios/usuarios.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AccesoInterceptor } from './acceso.interceptos';
import { librosReducer } from './libros/store/libros.reducer';
import { LibrosEffects } from './libros/store/libros.effects';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    LibrosComponent,
    LoginComponent,
    PrestamosComponent,
    UsuariosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    
    StoreModule.forRoot({libros: librosReducer}, {}),
    EffectsModule.forRoot([LibrosEffects]),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule 
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AccesoInterceptor, multi: true},
    
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
