import { Component, ElementRef, Input, OnInit, Renderer2, ViewChild } from '@angular/core';

@Component({
  selector: 'app-note-card',
  templateUrl: './note-card.component.html',
  styleUrls: ['./note-card.component.scss']
})
export class NoteCardComponent implements OnInit {

  @ViewChild('trunc', {static: true}) trunc!: ElementRef<HTMLElement>
  @ViewChild('bodyText', {static: true}) bodyText!: ElementRef<HTMLElement>

  @Input() body: string = '';
  @Input() title: string = '';

  constructor(private renderer: Renderer2) { }

  ngOnInit(): void {
    let style = window.getComputedStyle(this.bodyText.nativeElement, null);
    let viewHeight = +style.getPropertyValue('height');

    if(this.bodyText.nativeElement.scrollHeight > viewHeight){
      this.renderer.setStyle(this.trunc.nativeElement, 'display','block')
    } else {
      this.renderer.setStyle(this.trunc.nativeElement, 'display','none')
    }
  }

}
