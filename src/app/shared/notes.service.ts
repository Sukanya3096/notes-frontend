import { Injectable } from '@angular/core';
import { Note } from './notes.model';

@Injectable({
  providedIn: 'root',
})
export class NotesService {
  notes: Note[] = new Array<Note>();

  constructor() {}

  get(id: number) {
    return this.notes[id];
  }

  getAll() {
    return this.notes;
  }

  getId(note: Note) {
    return this.notes.indexOf(note);
  }

  addNote(note: Note) {
    let newLength = this.notes.push(note);
    return newLength - 1;
  }

  updateNote(id: number, title: string, body: string) {
    let note = this.notes[id];
    note.title = title;
    note.body = body;
  }

  deleteNote(id: number) {
    this.notes.splice(id, 1);
  }
}
