import { create } from 'zustand'

export const useNewNoteStore = create((set) => ({
    cat: null,
    book: null,
    bookName: null,
    chapter: null,
    content: null,
    startVerse: null,
    endVerse: null,
    setCat: (cat) => set({ cat: cat }),
    setBook: (book) => set({ book: book }),
    setBookName: (bookName) => set({ bookName: bookName }),
    setChapter: (chapter) => set({ chapter: chapter }),
    setContent: (content) => set({ content: content }),
    setStartVerse: (startVerse) => set({ startVerse: startVerse }),
    setEndVerse: (endVerse) => set({ endVerse: endVerse }),
    resetNewNoteStore: () => {
        set({
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