
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './theme/shared/shared.module';
import { AppComponent } from './app.component';
import { AdminComponent } from './theme/layout/admin/admin.component';


import { AuthComponent } from './theme/layout/auth/auth.component';
import { NavigationComponent } from './theme/layout/admin/navigation/navigation.component';
import { NavContentComponent } from './theme/layout/admin/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './theme/layout/admin/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './theme/layout/admin/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './theme/layout/admin/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './theme/layout/admin/nav-bar/nav-bar.component';
import { NavLeftComponent } from './theme/layout/admin/nav-bar/nav-left/nav-left.component';
import { NavSearchComponent } from './theme/layout/admin/nav-bar/nav-left/nav-search/nav-search.component';
import { NavRightComponent } from './theme/layout/admin/nav-bar/nav-right/nav-right.component';
import { HttpClientModule } from '@angular/common/http';
import { ConfigurationComponent } from './theme/layout/admin/configuration/configuration.component';
import { ToggleFullScreenDirective } from './theme/shared/full-screen/toggle-full-screen';

/* Menu Items */
import { NavigationItem } from './theme/layout/admin/navigation/navigation';
import { NgbButtonsModule, NgbDropdownModule, NgbTabsetModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from './pages/auth/service/auth.service';
import { TokenInterceptorProvider } from './pages/auth/service/token.interceptor';
import { StorageService } from './pages/auth/service/storage.service';
import { UsuarioService } from './pages/usuarios/service/usuario.service';
import { AuthGuard } from './pages/auth/guards';
import { ChecklistResolver } from './pages/pacientes/guards/checklist.resolver';
import { PacienteService } from './pages/pacientes/service/paciente.service';
import { NgxMaskModule, IConfig } from 'ngx-mask';
import { PerfilAdminComponent } from './pages/usuarios/perfil-admin/perfil-admin.component';
import { PerfilEnfermeiroComponent } from './pages/usuarios/perfil-enfermeiro/perfil-enfermeiro.component';
import { CommonModule } from '@angular/common';

export const options: Partial<IConfig> | (() => Partial<IConfig>) = null;


@NgModule({
  declarations: [
    AppComponent,
    AdminComponent,
    AuthComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent,
    NavLeftComponent,
    NavSearchComponent,
    NavRightComponent,
    ConfigurationComponent,
    ToggleFullScreenDirective,
    PerfilAdminComponent,
    PerfilEnfermeiroComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    NgbDropdownModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule,
    NgbDropdownModule,
    NgbTooltipModule,
    NgbButtonsModule,
    NgbTabsetModule,
    HttpClientModule,
    NgxMaskModule.forRoot({
      dropSpecialCharacters: true // ao salvar, vai manter a mascara
    }),
      ],
    providers: [
      UsuarioService,
      StorageService,
      TokenInterceptorProvider,
      AuthService,
      AuthGuard,
      NavigationItem
    ],
    bootstrap: [AppComponent]
  })
  export class AppModule { }
