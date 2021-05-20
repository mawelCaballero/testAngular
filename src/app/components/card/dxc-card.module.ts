import { NgModule } from "@angular/core";
import { MatCardModule } from "@angular/material/card";
import { CommonModule } from "@angular/common";
import { DxcCardComponent } from "./dxc-card.component";
import { BackgroundProviderModule } from "../bg-provider/bg-provider.module";

@NgModule({
  declarations: [DxcCardComponent],
  imports: [CommonModule, MatCardModule, BackgroundProviderModule],
  exports: [DxcCardComponent]
})
export class DxcCardModule {}
