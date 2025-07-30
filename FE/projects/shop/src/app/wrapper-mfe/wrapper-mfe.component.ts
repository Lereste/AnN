import { Component, ElementRef, inject, Input } from '@angular/core';
import { initWrapperConfig } from './wrapper-config';
import { loadRemoteModule } from '@angular-architects/native-federation';

@Component({
  selector: 'app-wrapper-mfe',
  imports: [],
  templateUrl: './wrapper-mfe.component.html',
  styleUrl: './wrapper-mfe.component.scss'
})
export class WrapperMfeComponent {
  private element = inject(ElementRef);

  @Input() config = initWrapperConfig;

  async ngOnInit() {
    const { remoteEntry, exposedModule, remoteName, elementName } = this.config;
    const root = document.createElement(elementName);

    this.element.nativeElement.appendChild(root);

    await loadRemoteModule({
      remoteEntry,
      remoteName,
      exposedModule
    });
  }
}
