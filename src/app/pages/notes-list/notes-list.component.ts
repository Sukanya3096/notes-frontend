import {
  animate,
  query,
  stagger,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { filter } from 'rxjs';
import { Note } from 'src/app/shared/notes.model';
import { NotesService } from 'src/app/shared/notes.service';

@Component({
  selector: 'app-notes-list',
  templateUrl: './notes-list.component.html',
  styleUrls: ['./notes-list.component.scss'],
  animations: [
    trigger('itemAnim', [
      transition('void => *', [
        style({
          height: 0,
          opacity: 0,
          transform: 'scale(0.85)',
          'margin-bottom': 0,
          paddingTop: 0,
          paddingBottom: 0,
          paddingRight: 0,
          paddingLeft: 0,
        }),

        animate(
          '50ms',
          style({
            height: '*',
            'margin-bottom': '*',
            paddingTop: '*',
            paddingBottom: '*',
            paddingLeft: '*',
            paddingRight: '*',
          })
        ),
        animate(100),
      ]),

      transition('* => void', [
        animate(
          50,
          style({
            transform: 'scale(1.05)',
          })
        ),
        animate(
          50,
          style({
            transform: 'scale(1)',
            opacity: 0.75,
          })
        ),
        animate(
          '120ms ease-out',
          style({
            opacity: 0,
            transform: 'scale(0.68)',
          })
        ),
        animate(
          '150ms ease-out',
          style({
            height: 0,
            'margin-bottom': 0,
            paddingTop: 0,
            paddingBottom: 0,
            paddingRight: 0,
            paddingLeft: 0,
          })
        ),
      ]),
    ]),

    trigger('listAnim', [
      transition('* => *', [
        query(
          ':enter',
          [
            style({
              opacity: 0,
              height: 0,
            }),
            stagger(100, [animate('0.2s ease')]),
          ],
          {
            optional: true,
          }
        ),
      ]),
    ]),
  ],
})
export class NotesListComponent implements OnInit {
  timerId: any = null;
  notes: Note[] = new Array<Note>();
  filteredNotes: Note[] = new Array<Note>();

  constructor(private noteService: NotesService) {}

  ngOnInit(): void {
    this.notes = this.noteService.getAll();
    this.filteredNotes = this.notes;
  }
  deleteNote(id: number) {
    this.noteService.deleteNote(id);
  }
  filter = (searchParam: string) => {
    searchParam = searchParam?.toLowerCase().trim();
    let allResults: Note[] = new Array<Note>();
    let terms: string[] = searchParam.split(' ');
    let uniqArr = [...new Set(terms)];
    uniqArr.forEach(
      (word) => (allResults = [...allResults, ...this.relevantNotes(word)])
    );

    this.filteredNotes = [...new Set(allResults)];

    this.sortByRelevance(allResults);
  };

  relevantNotes(query: string): Array<Note> {
    query = query.toLowerCase().trim();
    let relevantNotes = this.notes.filter((note) => {
      if (
        note.body?.toLowerCase().includes(query) ||
        note.title.toLowerCase().includes(query)
      ) {
        return true;
      } else {
        return false;
      }
    });
    return relevantNotes;
  }

  //debouncing to lessen keyup calls
  filterResults(event: Event) {
    if (this.timerId !== null) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.filter((event.target as HTMLInputElement).value);
      this.timerId = null;
    }, 400);
  }

  sortByRelevance(searchResults: Note[]) {
    let noteCountObj: any = {};
    searchResults.forEach((note) => {
      let noteId = this.noteService.getId(note);

      if (noteCountObj[noteId]) {
        noteCountObj[noteId] += 1;
      } else {
        noteCountObj[noteId] = 1;
      }
    });

    this.filteredNotes = this.filteredNotes.sort((a: Note, b: Note) => {
      let aId = this.noteService.getId(a);
      let bId = this.noteService.getId(b);

      let aCount = noteCountObj[aId];
      let bCount = noteCountObj[bId];

      return bCount - aCount;
    });
  }
}
