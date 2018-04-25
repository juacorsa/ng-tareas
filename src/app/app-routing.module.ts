import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { ProveedorAddComponent } from './components/proveedores/proveedor-add/proveedor-add.component'
import { ProveedorEditComponent } from './components/proveedores/proveedor-edit/proveedor-edit.component'
import { ProveedorListComponent } from './components/proveedores/proveedor-list/proveedor-list.component'
import { NotFoundComponent } from './components/notfound/notfound.component'

const routes: Routes = [
	{ path: 'proveedores', component: ProveedorListComponent },
	{ path: 'proveedores-add', component: ProveedorAddComponent },
	{ path: 'proveedores-edit/:id', component: ProveedorEditComponent },
	{ path: '', redirectTo: 'proveedores', pathMatch: 'full'},
	{ path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
