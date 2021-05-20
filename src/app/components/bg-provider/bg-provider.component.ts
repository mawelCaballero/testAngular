import { Component, OnInit, Input } from "@angular/core";
import { BackgroundProviderService } from "./service/background-provider.service";
import { TinyColor } from "@ctrl/tinycolor";

@Component({
  selector: "bg-provider",
  template: "<div><ng-content></ng-content></div>",
  providers: [BackgroundProviderService]
})
export class BackgroundProvider implements OnInit {
  @Input() color: string;

  constructor(private bgProviderService: BackgroundProviderService) {}

  ngOnInit() {
    if (this.color) {
      this.setType();
    }
  }

  private setType() {
    const colorType = this.checkColorType(this.color);
    this.bgProviderService.changeBackgroundColor(colorType ? colorType : null);
  }

  private checkColorType(color: string): string {
    const colorInstance = new TinyColor(color);
    return colorInstance.isDark() ? "dark" : "light";
  }
}
