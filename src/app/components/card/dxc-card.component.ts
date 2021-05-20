import {
  Component,
  OnInit,
  Output,
  HostBinding,
  ViewChild,
  ElementRef,
  EventEmitter,
  SimpleChanges,
  ChangeDetectorRef,
  Optional,
  Inject
} from "@angular/core";
import { css } from "@emotion/css";
import { BehaviorSubject } from "rxjs";
import { BackgroundProviderService } from "./../bg-provider/service/background-provider.service";

@Component({
  selector: "dxc-card",
  templateUrl: "./dxc-card.component.html",
  styleUrls: [],
  providers: []
})
export class DxcCardComponent implements OnInit {
  @Output() onClick = new EventEmitter<any>();
  @HostBinding("class") className;
  @ViewChild("content", { static: false }) content: ElementRef;

  defaultInputs = new BehaviorSubject<any>({
    imageSrc: null,
    imagePosition: "before",
    imagePadding: null,
    backgroundColor: null,
    imageCover: false,
    imageBgColor: "black",
    margin: null,
    linkHref: null,
    tabIndexValue: 0
  });

  public ngOnChanges(changes: SimpleChanges): void {
    const inputs = Object.keys(changes).reduce((result, item) => {
      result[item] = changes[item].currentValue;
      return result;
    }, {});
    this.defaultInputs.next({ ...this.defaultInputs.getValue(), ...inputs });
    this.className = `${this.getDynamicStyle(this.defaultInputs.getValue())}`;
  }

  constructor(
    private cdRef: ChangeDetectorRef,
    @Optional()
    public bgProviderService?: BackgroundProviderService
  ) {}

  ngOnInit() {
    this.className = `${this.getDynamicStyle(this.defaultInputs.getValue())}`;
    this.bgProviderService?.$changeColor?.subscribe((resp) => {
      this.defaultInputs.next({
        ...this.defaultInputs.getValue(),
        ...{ backgroundColor: resp }
      });
      this.className = `${this.getDynamicStyle(this.defaultInputs.getValue())}`;
      this.applyTheme(resp);
    });
  }

  ngAfterContentChecked() {
    if (
      this.content &&
      this.content.nativeElement &&
      this.content.nativeElement.children.length > 0
    ) {
      this.content.nativeElement.classList.add("childComponents");
      this.content.nativeElement.parentElement.classList.add("hasChildren");
    }

    this.cdRef.detectChanges();
  }

  public onClickHandler($event: any): void {
    this.onClick.emit($event);
  }

  applyTheme(background?: string) {
    console.log(background);
    return css`
      mat-card {
        ${background !== null && background !== ""
          ? background === "light"
            ? "background-color: black; color: white;"
            : "background-color: white;color: black;"
          : "background-color: red; color: white"}
        border-radius: $size / 2;
      }
    `;
  }

  getCursor(href) {
    if (this.onClick.observers.length > 0 || href) {
      return css`
        cursor: pointer;
      `;
    } else {
      return css``;
    }
  }

  getShadowDepthOnHover(href) {
    if (this.onClick.observers.length > 0 || href) {
      return "2";
    } else {
      return "1";
    }
  }

  getDynamicStyle(inputs) {
    return css`
      display: inline-flex;
      mat-card {
        border: 10px;
        ${this.getCursor(inputs.linkHref)}
        font-family: var(--fontFamily);
        font-size: 14px;
        display: inline-flex;
        width: 400px;
        height: 220px;
        padding: 0px;

        .content {
          overflow: hidden;
          width: 260px;
        }
        img,
        svg {
          height: 100%;

          ${inputs.imageCover
            ? css`
                object-fit: cover;
              `
            : css`
                object-fit: contain;
              `};
        }

        .imageContainer {
          display: inline-flex;
          background-color: ${inputs.imageBgColor};
        }
      }

      mat-card.after {
        flex-direction: row-reverse;
        align-items: stretch;
      }

      mat-card.before {
        flex-direction: row;
        align-items: stretch;
      }

      mat-card.above {
        flex-direction: column;
        align-items: center;
      }

      mat-card.below {
        flex-direction: column-reverse;
        align-items: center;
      }

      mat-card.before {
        .imageContainer {
          img,
          svg {
            border-top-left-radius: 4px;
            border-bottom-left-radius: 4px;
          }
          border-top-left-radius: 4px;
          border-bottom-left-radius: 4px;
        }
      }

      mat-card.after {
        .imageContainer {
          img,
          svg {
            border-top-right-radius: 4px;
            border-bottom-right-radius: 4px;
          }
          border-top-right-radius: 4px;
          border-bottom-right-radius: 4px;
        }
      }

      ${this.applyTheme(inputs.backgroundColor)}
    `;
  }
}
