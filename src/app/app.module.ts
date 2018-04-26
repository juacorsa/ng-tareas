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
import { ClienteAddComponent } from './components/clientes/cliente-add/cliente-add.component';
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component';
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component';
import { SoftwareAddComponent } from './components/software/software-add/software-add.component';
import { SoftwareEditComponent } from './components/software/software-edit/software-edit.component';
import { SoftwareListComponent } from './components/software/software-list/software-list.component';
import { LicenciaAddComponent } from './components/licencias/licencia-add/licencia-add.component';
import { LicenciaEditComponent } from './components/licencias/licencia-edit/licencia-edit.component';
import { LicenciaListComponent } from './components/licencias/licencia-list/licencia-list.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ProveedorAddComponent,
    ProveedorEditComponent,
    ProveedorListComponent,
    NotFoundComponent,
    AutofocusDirective,
    ClienteAddComponent,
    ClienteEditComponent,
    ClienteListComponent,
    SoftwareAddComponent,
    SoftwareEditComponent,
    SoftwareListComponent,
    LicenciaAddComponent,
    LicenciaEditComponent,
    LicenciaListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    CommonModule,
    BrowserAnimationsModule, 
    ToastrModule.forRoot() 
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
