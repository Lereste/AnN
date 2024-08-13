import { ChangeDetectionStrategy, Component, Input } from "@angular/core";
import { timer } from "rxjs";
import 'animate.css'

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
        "Bạn đang muốn tìm gì?",
        "Đàn guitar...",
        "Đàn ukulele...",
        "Đàn piano...",
    ];
    // @Input() textColor = "black";
    // @Input() fontSize = "20px";
    // @Input() blinkWidth = "2px";
    @Input() typingSpeedMilliseconds = 120;
    @Input() deleteSpeedMilliseconds = 90;

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

    onInputText(event: any): void {
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
