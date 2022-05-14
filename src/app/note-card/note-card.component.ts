import {
  Component,
  ElementRef,
  Input,
  OnInit,
  Output,
  Renderer2,
  ViewChild,
  EventEmitter,
  AfterViewInit,
} from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss'],
})
export class NoteCardComponent implements OnInit, AfterViewInit {
  @ViewChild('trunc', { static: true }) trunc!: ElementRef<HTMLElement>;
  @ViewChild('bodyText', { static: true }) bodyText!: ElementRef<HTMLElement>;
  @ViewChild('noteP', { static: true }) noteP!: ElementRef<HTMLElement>;

  @Input() body: string = '';
  @Input() title: string = '';
  @Input() link: string = '';

  @Output('delete') deleteEvent: EventEmitter<void> = new EventEmitter<void>();

  constructor(private renderer: Renderer2) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (
      this.noteP.nativeElement.scrollHeight >
      this.bodyText.nativeElement.clientHeight
    ) {
      this.renderer.setStyle(this.trunc.nativeElement, 'display', 'block');
    } else {
      this.renderer.setStyle(this.trunc.nativeElement, 'display', 'none');
    }
  }

  onDelete() {
    this.deleteEvent.emit();
  }
}
