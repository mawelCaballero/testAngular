import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { MatExpansionModule } from "@angular/material/expansion/";
import { MatIconModule } from "@angular/material/icon";
import { AppComponent } from "./app.component";
import { DxcCardModule } from "./components/card/dxc-card.module";
import { DxcAccordionComponent } from "./components/accordion/accordion.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { BackgroundProviderModule } from "./components/bg-provider/bg-provider.module";

@NgModule({
  declarations: [AppComponent, DxcAccordionComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DxcCardModule,
    MatExpansionModule,
    MatIconModule,
    BackgroundProviderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
