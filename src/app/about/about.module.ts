import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AboutComponent } from './about.component';
import { AboutRoutingModule } from './about.routing.module';



@NgModule({
  imports: [FormsModule, CommonModule, AboutRoutingModule],
  declarations: [AboutComponent]
})
export class AboutModule {}
