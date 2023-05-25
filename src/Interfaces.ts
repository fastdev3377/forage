export interface ForageButtonProps {
  onClick: () => void
  text: string
  style?: Record<string, any>
  disabled?: boolean
  id?: string
}

export interface NoteModalProps {
  isVisible: boolean
  closeModal: () => void
  editNote: Note | null
  viewNote: Note | null
}

export interface Note {
  title: string
  content: string
  index: number
  unarchived: string
  id: string
}

export interface NoteCardProps {
  note: Note
  refreshNotes: () => void
  editNote: (note: Note) => void
  viewNote: (note: Note) => void
}

export interface HeaderProps {
  refreshNotes: () => void
}

export enum ModalType {
  addModal = 'ADD_MODAL',
  editModal = 'EDIT_MODAL',
  viewModal = 'VIEW_MODAL'
}
