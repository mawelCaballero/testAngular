import {
  Component,
  Host,
  HostBinding,
  Inject,
  OnInit,
  Optional,
  Self
} from "@angular/core";
import { css } from "@emotion/css";
import { BackgroundProviderService } from "./components/bg-provider/service/background-provider.service";
@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
  providers: []
})
export class AppComponent implements OnInit {
  title = "CodeSandbox";
  isExpanded = false;

  @HostBinding("class") css;

  constructor(@Optional() private bgService: BackgroundProviderService) {}
  ngOnInit(): void {
    this.css = this.applyTheme();
    this.bgService?.$changeColor.subscribe((res) => {
      console.log("Retrieving type of background ", res);
      this.css = this.applyTheme(res);
    });
  }

  changeIsExpanded($event) {
    this.isExpanded = $event;
    console.log($event);
  }

  applyTheme(type?) {
    console.log("binding styles: ", type);
    return css`
      .text-accordion {
        background-color: ${type && type === "light" ? "black" : "white"};
      }
    `;
  }
}
