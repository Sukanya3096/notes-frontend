import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Note } from 'src/app/shared/notes.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-note-details',
  templateUrl: './note-details.component.html',
  styleUrls: ['./note-details.component.scss'],
})
export class NoteDetailsComponent implements OnInit {
  note: Note = new Note();
  noteId!: number;
  new: Boolean = true;

  constructor(
    private noteService: NotesService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((param: Params) => {
      if (param['id']) {
        this.note = this.noteService.get(+param['id']);
        this.noteId = +param['id'];
        this.new = false;
      } else {
        this.new = true;
      }
    });
  }

  onSubmit(form: NgForm) {
    if (this.new) {
      this.noteService.addNote(form.value);
    } else {
      this.noteService.updateNote(
        this.noteId,
        form.value.title,
        form.value.body
      );
    }
    this.router.navigate(['']);
  }

  onCancel() {
    this.router.navigate(['']);
  }
}
