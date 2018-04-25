import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

// Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { ProveedorAddComponent } from './components/proveedores/proveedor-add/proveedor-add.component';
import { ProveedorEditComponent } from './components/proveedores/proveedor-edit/proveedor-edit.component';
import { ProveedorListComponent } from './components/proveedores/proveedor-list/proveedor-list.component';
import { NotFoundComponent } from './components/notfound/notfound.component';

// Directivas
import { AutofocusDirective } from './directives/autofocus.directive';

// Servicios
import { ClientesService } from '../app/services/clientes.service';
import { LicenciasService } from '../app/services/licencias.service';
import { ProveedoresService } from '../app/services/proveedores.service';
import { SoftwareService } from '../app/services/software.service';
import { TextosService } from '../app/services/textos.service';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProveedorAddComponent,
    ProveedorEditComponent,
    ProveedorListComponent,
    NotFoundComponent,
    AutofocusDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
  ],
  providers: [
    ClientesService, 
    LicenciasService, 
    ProveedoresService, 
    SoftwareService,
    TextosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
