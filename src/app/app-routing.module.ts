import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProveedorAddComponent } from './components/proveedores/proveedor-add/proveedor-add.component'
import { ProveedorEditComponent } from './components/proveedores/proveedor-edit/proveedor-edit.component'
import { ProveedorListComponent } from './components/proveedores/proveedor-list/proveedor-list.component'
import { ClienteAddComponent } from './components/clientes/cliente-add/cliente-add.component'
import { ClienteEditComponent } from './components/clientes/cliente-edit/cliente-edit.component'
import { ClienteListComponent } from './components/clientes/cliente-list/cliente-list.component'
import { SoftwareAddComponent } from './components/software/software-add/software-add.component'
import { SoftwareEditComponent } from './components/software/software-edit/software-edit.component'
import { SoftwareListComponent } from './components/software/software-list/software-list.component'

import { LicenciaAddComponent } from './components/licencias/licencia-add/licencia-add.component'
import { LicenciaEditComponent } from './components/licencias/licencia-edit/licencia-edit.component'
import { LicenciaListComponent } from './components/licencias/licencia-list/licencia-list.component'

import { NotFoundComponent } from './components/notfound/notfound.component'

const routes: Routes = [
	{ path: 'proveedores', component: ProveedorListComponent },	
	{ path: 'proveedores/:id/edit', component: ProveedorEditComponent },
	{ path: 'proveedores/add', component: ProveedorAddComponent },
	{ path: 'clientes', component: ClienteListComponent },	
	{ path: 'clientes/:id/edit', component: ClienteEditComponent },
	{ path: 'clientes/add', component: ClienteAddComponent },
	{ path: 'software', component: SoftwareListComponent },	
	{ path: 'software/:id/edit', component: SoftwareEditComponent },
	{ path: 'software/add', component: SoftwareAddComponent },
	{ path: 'licencias', component: LicenciaListComponent },	
	{ path: 'licencias/:id/edit', component: LicenciaEditComponent },
	{ path: 'licencias/add', component: LicenciaAddComponent },
	{ path: '', redirectTo: 'proveedores', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
