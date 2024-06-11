import { CommonModule, DOCUMENT } from "@angular/common";
import { Component, ElementRef, ViewChild, AfterViewInit, Inject, HostListener } from "@angular/core";

@Component({
    selector: "app-go-to-top",
    standalone: true,
    imports: [CommonModule      ],
    templateUrl: "./go-to-top.component.html",
    styleUrl: "./go-to-top.component.scss",
})
export class GoToTopComponent implements AfterViewInit {
    @ViewChild("goToTop") goToTop!: ElementRef<any>;

    constructor(@Inject(DOCUMENT) private document: Document) {}

    ngAfterViewInit(): void {
        const scrollHeight = window.pageYOffset;
        console.log("scrollHeight", scrollHeight);

        if (scrollHeight > 500) {
            this.goToTop.nativeElement.classList.add("show-top");
        } else {
            this.goToTop.nativeElement.classList.remove("show-top");
        }
    }

    windowScrolled: boolean | undefined;


    @HostListener("window:scroll", [])
    onWindowScroll() {
        if (
            window.pageYOffset ||
            document.documentElement.scrollTop ||
            document.body.scrollTop > 100
        ) {
            this.windowScrolled = true;
        } else if (
            (this.windowScrolled && window.pageYOffset) ||
            document.documentElement.scrollTop ||
            document.body.scrollTop < 10
        ) {
            this.windowScrolled = false;
        }
    }

    scrollToTop() {
        (function smoothscroll() {
            var currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;

            if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 8);
            }
        })();
    }

    ngOnInit() {}
}
