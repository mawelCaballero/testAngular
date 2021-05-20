import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { BackgroundProvider } from "./bg-provider.component";
@NgModule({
  imports: [CommonModule],
  declarations: [BackgroundProvider],
  exports: [BackgroundProvider]
})
export class BackgroundProviderModule {}
