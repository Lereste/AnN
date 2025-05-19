import { isPlatformBrowser } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, PLATFORM_ID, OnInit, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { concatMap, of, switchMap, takeWhile, timer } from 'rxjs';
// import 'animate.css'

@Component({
    selector: 'app-search',
    imports: [],
    templateUrl: './search.component.html',
    styleUrl: './search.component.scss',
    changeDetection: ChangeDetectionStrategy.Default
})
export class SearchComponent implements OnInit, AfterViewInit {
  textElement: string = '';
  private readonly platformId = inject(PLATFORM_ID);
  private cdr = inject(ChangeDetectorRef); // Inject ChangeDetectorRef

  // @Input() textColor = "black";
  // @Input() fontSize = "20px";
  // @Input() blinkWidth = "2px";
  @Input() wordArray: string[] = ['Bạn đang muốn tìm gì?', 'Đàn guitar...', 'Đàn ukulele...', 'Đàn piano...'];
  @Input() typingSpeedMilliseconds = 120;
  @Input() deleteSpeedMilliseconds = 90;

  private idx: number = 0;

  constructor() {
    console.log('textElement', this.textElement);
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.startTypingEffect();
    }
  }

  private startTypingEffect(): void {
    timer(500).subscribe(() => this.typingEffect());
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
    const word = this.wordArray[this.idx].split('');
    const loopTyping = () => {
      if (word.length > 0) {
        this.textElement += word.shift();
      } else {
        this.deletingEffect();
        return;
      }
      this.cdr.detectChanges(); // Trigger change detection manually

      setTimeout(loopTyping, this.typingSpeedMilliseconds);
    };

    loopTyping();
  }

  private deletingEffect(): void {
    const word = this.wordArray[this.idx].split('');
    const loopDeleting = () => {
      if (word.length > 0) {
        word.pop();
        this.textElement = word.join('');
      } else {
        if (this.wordArray.length > this.idx + 1) {
          this.idx++;
        } else {
          this.idx = 0;
        }
        this.typingEffect();
        return;
      }
      this.cdr.detectChanges(); // Trigger change detection manually
      setTimeout(loopDeleting, this.deleteSpeedMilliseconds);
    };
    if (isPlatformBrowser(this.platformId)) {
      loopDeleting();
    }
  }

  // ============== Two functions under is written by Chat GPT and it working bros, I will loose my job :dead:

  // private typingEffect(): void {
  //   const word = this.wordArray[this.idx];
  //   let currentLength = 0;

  //   timer(0, this.typingSpeedMilliseconds)
  //     .pipe(
  //       takeWhile(() => currentLength <= word.length), // Continue until all characters are typed
  //       switchMap(() => {
  //         this.textElement = word.slice(0, currentLength); // Update textElement incrementally
  //         currentLength++;
  //         this.cdr.detectChanges(); // Trigger change detection manually
  //         return timer(this.typingSpeedMilliseconds); // Delay between each letter
  //       })
  //     )
  //     .subscribe({
  //       complete: () => {
  //         timer(500).subscribe(() => this.deletingEffect());
  //       }
  //     });
  // }

  // private deletingEffect(): void {
  //   const word = this.wordArray[this.idx];
  //   let currentLength = word.length;

  //   timer(0, this.deleteSpeedMilliseconds)
  //     .pipe(
  //       takeWhile(() => currentLength >= 0),
  //       switchMap(() => {
  //         this.textElement = word.slice(0, currentLength);
  //         currentLength--;
  //         this.cdr.detectChanges(); // Trigger change detection manually
  //         return timer(this.deleteSpeedMilliseconds);
  //       })
  //     )
  //     .subscribe({
  //       complete: () => {
  //         this.idx = (this.idx + 1) % this.wordArray.length;
  //         timer(500).subscribe(() => this.typingEffect());
  //       }
  //     });
  // }
}
