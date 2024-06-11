import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { timer } from "rxjs";

@Component({
    selector: "app-search",
    standalone: true,
    imports: [],
    templateUrl: "./search.component.html",
    styleUrl: "./search.component.scss",
    changeDetection: ChangeDetectionStrategy.Default,
})
export class SearchComponent {
    textElement: string = "";

    @Input() wordArray: string[] = [
        "What are you looking for?   ",
        "Latop gaming Asus...",
        "Laptop gaming Msi...",
    ];
    // @Input() textColor = "black";
    // @Input() fontSize = "20px";
    // @Input() blinkWidth = "2px";
    @Input() typingSpeedMilliseconds = 120;
    @Input() deleteSpeedMilliseconds = 100;

    private idx = 0;

    constructor() {
        console.log("textElement", this.textElement);
    }

    ngAfterViewInit(): void {
        // this.initVariables();

        timer(500).subscribe(() => {
            // your code here
            this.typingEffect();
          })
        
    }

    onClick(event: any): void {
        console.log('clicked', event.target.value.length);
        // timer(500).subscribe(() => {
        //     // your code here
        //     this.typingEffect();
        //   })

        if (event.target.value === '') {
            console.log('rỗng');
            
        } else {
            console.log('có');
            
        }
    }

    // private initVariables(): void {
    //     this.renderer.setStyle(
    //         this.textElement.nativeElement,
    //         "color",
    //         this.textColor
    //     );
    //     this.renderer.setStyle(
    //         this.textElement.nativeElement,
    //         "font-size",
    //         this.fontSize
    //     );
    //     this.renderer.setStyle(
    //         this.textElement.nativeElement,
    //         "padding",
    //         "0.1em"
    //     );

    //     this.renderer.setStyle(
    //         this.blinkElement.nativeElement,
    //         "border-right-width",
    //         this.blinkWidth
    //     );
    //     this.renderer.setStyle(
    //         this.blinkElement.nativeElement,
    //         "border-right-color",
    //         this.textColor
    //     );
    //     this.renderer.setStyle(
    //         this.blinkElement.nativeElement,
    //         "font-size",
    //         this.fontSize
    //     );
    // }

    private typingEffect(): void {
        const word = this.wordArray[this.idx].split("");
        const loopTyping = () => {
            if (word.length > 0) {
                this.textElement += word.shift();
            } else {
                this.deletingEffect();
                return;
            }
            setTimeout(loopTyping, this.typingSpeedMilliseconds);
        };
        loopTyping();
    }

    private deletingEffect(): void {
        const word = this.wordArray[this.idx].split("");
        const loopDeleting = () => {
            if (word.length > 0) {
                word.pop();
                this.textElement = word.join("");
            } else {
                if (this.wordArray.length > this.idx + 1) {
                    this.idx++;
                } else {
                    this.idx = 0;
                }
                this.typingEffect();
                return;
            }
            setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
        };
        loopDeleting();
    }
}
