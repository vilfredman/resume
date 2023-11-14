import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ResumeComponent } from './pages/resume/resume.component';
import { WatchesComponent } from './pages/watches/watches.component';
import { CalculatorComponent } from './pages/calculator/calculator.component';
import { TodoComponent } from './pages/todo-list/todo.component';
import { MoviesComponent } from './pages/movie/movies.component';
import { SnakeGameComponent } from './pages/snake/snake-board/snake-game.component';

const routes: Routes = [
  {
    path: '',
    component: ResumeComponent,
  },
  {
    path: 'watches',
    component: WatchesComponent,
  },
  {
    path: 'calculator',
    component: CalculatorComponent,
  },
  {
    path: 'todo',
    component: TodoComponent,
  },
  {
    path: 'movies',
    component: MoviesComponent,
  },
  {
    path: 'snake',
    component: SnakeGameComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
