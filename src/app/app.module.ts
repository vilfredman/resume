import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ResumeComponent } from './pages/resume/resume.component';
import { HeaderComponent } from './pages/resume/components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from './pages/resume/components/home/home.component';
import { AboutComponent } from './pages/resume/components/about/about.component';
import { ContactComponent } from './pages/resume/components/contact/contact.component';
import { AppRoutingModule } from './app-routing.module';
import { ProjectsComponent } from './pages/resume/components/projects/projects.component';
import { FooterComponent } from './pages/resume/components/footer/footer.component';
import { SkillsComponent } from './pages/resume/components/skills/skills.component';
import { WatchesComponent } from './pages/watches/watches.component';
import { DigitalComponent } from './pages/watches/components/digital/digital.component';
import { AnalogComponent } from './pages/watches/components/analog/analog.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { EnumPipePipe } from './pages/calculator/shared/pipes/enum.pipe.pipe';
import { GeneralButtonComponent } from './pages/calculator/components/general-button/general-button.component';
import { DisplayComponent } from './pages/calculator/components/display/display.component';
import { ActionButtonComponent } from './pages/calculator/components/action-button/action-button.component';
import { NumericButtonComponent } from './pages/calculator/components/numeric-button/numeric-button.component';
import { OperationButtonComponent } from './pages/calculator/components/operation-button/operation-button.component';
import { TodoComponent } from './pages/todo-list/todo.component';
import { ToastModule } from 'primeng/toast';
import { ToolbarModule } from 'primeng/toolbar';
import { TableModule } from 'primeng/table';
import { RatingModule } from 'primeng/rating';
import { TagModule } from 'primeng/tag';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MoviesComponent } from './pages/movie/movies.component';
import { HeaderMoviesComponent } from './pages/movie/components/header-movies/header-movies.component';
import { MovieComponent } from './pages/movie/components/movie/movie.component';
import { PaginatorComponent } from './pages/movie/components/paginator/paginator.component';
import { PaginatorModule } from 'primeng/paginator';
import { PopupComponent } from './pages/movie/components/popup/popup.component';
import { SnakeGameComponent } from './pages/snake/snake-board/snake-game.component';

@NgModule({
  declarations: [
    AppComponent,
    ResumeComponent,
    HeaderComponent,
    HomeComponent,
    AboutComponent,
    ContactComponent,
    ProjectsComponent,
    FooterComponent,
    SkillsComponent,
    WatchesComponent,
    DigitalComponent,
    AnalogComponent,
    CalculatorComponent,
    EnumPipePipe,
    GeneralButtonComponent,
    DisplayComponent,
    ActionButtonComponent,
    NumericButtonComponent,
    OperationButtonComponent,
    TodoComponent,
    MoviesComponent,
    HeaderMoviesComponent,
    MovieComponent,
    PaginatorComponent,
    PopupComponent,
    SnakeGameComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterOutlet,
    AppRoutingModule,
    ToastModule,
    ToolbarModule,
    TableModule,
    RatingModule,
    TagModule,
    InputTextModule,
    ButtonModule,
    RippleModule,
    FormsModule,
    DropdownModule,
    DialogModule,
    ConfirmDialogModule,
    PaginatorModule,
  ],
  providers: [MessageService, ConfirmationService],
  bootstrap: [AppComponent],
})
export class AppModule {}
