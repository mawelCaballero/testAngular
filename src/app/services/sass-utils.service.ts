import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root"
})
export class SassUtilsService {
  readProperty(name: string): string {
    const bodyStyles = window.getComputedStyle(document.body);
    return bodyStyles.getPropertyValue(name);
  }
}
