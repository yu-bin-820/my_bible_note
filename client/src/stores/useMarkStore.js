import { create } from 'zustand'

export const useMarkStore = create((set) => ({
    markTestament: 1,
    markBook: 1,
    markBookName: '창세기',
    markChapter: 1,
    markMaxChapter: 50,
    markVerse : 1,
    setMarkTestament: (markTestament) => set({ markTestament: markTestament }),
    setMarkBook: (markBook) => set({ markBook: markBook }),
    setMarkBookName: (markBookName) => set({ markBookName: markBookName }),
    setMarkChapter: (markChapter) => set({ markChapter: markChapter }),
    setMarkMaxChapter: (markMaxChapter) => set({ markMaxChapter: markMaxChapter }),
    setMarkVerse: (markVerse) => set({ markVerse: markVerse }),

}))