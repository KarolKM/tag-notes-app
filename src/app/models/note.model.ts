export interface Note {
  id: string; // unikalny identyfikator (np. UUID)
  title: string;
  content: string;
  tags: string[]; // lista nazw tagów przypisanych do notatki
  createdAt: Date;
  updatedAt: Date;
}