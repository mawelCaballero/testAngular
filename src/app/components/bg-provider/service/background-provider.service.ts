import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs/internal/BehaviorSubject";
@Injectable({
  providedIn: "any"
})
export class BackgroundProviderService {
  $changeColor = new BehaviorSubject("");

  changeBackgroundColor(color) {
    if (color) {
      console.info("Sending a change of color");
      this.$changeColor.next(color);
    }
  }
}
