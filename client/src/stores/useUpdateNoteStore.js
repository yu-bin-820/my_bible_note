import { create } from 'zustand'

export const useUpdateNoteStore = create((set) => ({
    noteNo: null,
    cat: null,
    book: null,
    bookName: null,
    chapter: null,
    content: null,
    startVerse: null,
    endVerse: null,
    setNoteNo: (noteNo) => set({ noteNo: noteNo }),
    setCat: (cat) => set({ cat: cat }),
    setBook: (book) => set({ book: book }),
    setBookName: (bookName) => set({ bookName: bookName }),
    setChapter: (chapter) => set({ chapter: chapter }),
    setContent: (content) => set({ content: content }),
    setStartVerse: (startVerse) => set({ startVerse: startVerse }),
    setEndVerse: (endVerse) => set({ endVerse: endVerse }),
    resetUpdateNoteStore: () => {
        set({
            noteNo: null,
            cat: null,
            book: null,
            bookName: null,
            chapter: null,
            content: null,
            startVerse: null,
            endVerse: null,
        });
    },


}))