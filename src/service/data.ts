import { Note } from "../Interfaces"
import { v4 as uuidv4 } from 'uuid';

export const readNotes = (): Note[] | null => {
  const notesString = localStorage.getItem('notes')
    if (notesString === null) return null
    return JSON.parse(notesString)
}

export const createNote = (
  title: string,
  content: string
) => {
  const notesString = localStorage.getItem('notes')
    if (notesString === null) {
      const newNote = JSON.stringify(
        [
          {
            title: title,
            content: content,
            index: 0,
            unarchived: 'true',
          }
        ]
      )
      localStorage.setItem('notes', newNote)
    } else {
      const notes = JSON.parse(notesString) as Note[]
      notes.push(
        {
          title: title,
          content: content,
          index: notes.length,
          unarchived: 'true',
          id: uuidv4()
        }
      )
      localStorage.setItem('notes', JSON.stringify(notes))
    }
}

export const updateNote = (
  title: string,
  content: string,
  oldNote: Note | null,
  unarchive?: string,
) => {
  const notesString = localStorage.getItem('notes')
    if (!notesString || !oldNote) {
      console.warn('The note has somehow been deleted!')
    } else {
      const notes = JSON.parse(notesString) as Note[]
      notes[oldNote.index] = {
        title: title,
        content: content,
        index: oldNote.index,
        unarchived: unarchive ?? oldNote.unarchived,
        id: oldNote.id
      }
      localStorage.setItem('notes', JSON.stringify(notes))
    }
}

export const deleteNote = (
  index: number
) => {
  const notesString = localStorage.getItem('notes')
  if (notesString === null) {
    console.warn('The note was already deleted!')
    return
  }
  const notes = JSON.parse(notesString)
  notes.splice(index, 1)
  notes.map((note: Note, indexInArray: number) => {
    if (indexInArray < index) return note
    return {
      ...note,
      index: note.index - 1
    }
  })
  localStorage.setItem('notes', JSON.stringify(notes))
}
