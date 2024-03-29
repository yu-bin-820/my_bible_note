package com.my_bible_note.my_bible_note.enums;

import com.my_bible_note.my_bible_note.dto.BookDTO;

public enum Book {
    GENESIS(1, "창세기", Testament.OLD, 50),
    EXODUS(2, "출애굽기", Testament.OLD, 40),
    LEVITICUS(3, "레위기", Testament.OLD, 27),
    NUMBERS(4, "민수기", Testament.OLD, 36),
    DEUTERONOMY(5, "신명기", Testament.OLD, 34),
    JOSHUA(6, "여호수아", Testament.OLD, 24),
    JUDGES(7, "사사기", Testament.OLD, 21),
    RUTH(8, "룻기", Testament.OLD, 4),
    SAMUEL_1(9, "사무엘상", Testament.OLD, 31),
    SAMUEL_2(10, "사무엘하", Testament.OLD, 24),
    KINGS_1(11, "열왕기상", Testament.OLD, 22),
    KINGS_2(12, "열왕기하", Testament.OLD, 25),
    CHRONICLES_1(13, "역대상", Testament.OLD, 29),
    CHRONICLES_2(14, "역대하", Testament.OLD, 36),
    EZRA(15, "에스라", Testament.OLD, 10),
    NEHEMIAH(16, "느헤미야", Testament.OLD, 13),
    ESTHER(17, "에스더", Testament.OLD, 10),
    JOB(18, "욥기", Testament.OLD, 42),
    PSALMS(19, "시편", Testament.OLD, 150),
    PROVERBS(20, "잠언", Testament.OLD, 31),
    ECCLESIASTES(21, "전도서", Testament.OLD, 12),
    SONG_OF_SOLOMON(22, "아가", Testament.OLD, 8),
    ISAIAH(23, "이사야", Testament.OLD, 66),
    JEREMIAH(24, "예레미야", Testament.OLD, 52),
    LAMENTATIONS(25, "예레미야애가", Testament.OLD, 5),
    EZEKIEL(26, "에스겔", Testament.OLD, 48),
    DANIEL(27, "다니엘", Testament.OLD, 12),
    HOSEA(28, "호세아", Testament.OLD, 14),
    JOEL(29, "요엘", Testament.OLD, 3),
    AMOS(30, "아모스", Testament.OLD, 9),
    OBADIAH(31, "오바댜", Testament.OLD, 1),
    JONAH(32, "요나", Testament.OLD, 4),
    MICAH(33, "미가", Testament.OLD, 7),
    NAHUM(34, "나훔", Testament.OLD, 3),
    HABAKKUK(35, "하박국", Testament.OLD, 3),
    ZEPHANIAH(36, "스바냐", Testament.OLD, 3),
    HAGGAI(37, "학개", Testament.OLD, 2),
    ZECHARIAH(38, "스가랴", Testament.OLD, 14),
    MALACHI(39, "말라기", Testament.OLD, 4),
    MATTHEW(40, "마태복음", Testament.NEW, 28),
    MARK(41, "마가복음", Testament.NEW, 16),
    LUKE(42, "누가복음", Testament.NEW, 24),
    JOHN(43, "요한복음", Testament.NEW, 21),
    ACTS(44, "사도행전", Testament.NEW, 28),
    ROMANS(45, "로마서", Testament.NEW, 16),
    CORINTHIANS_1(46, "고린도전서", Testament.NEW, 16),
    CORINTHIANS_2(47, "고린도후서", Testament.NEW, 13),
    GALATIANS(48, "갈라디아서", Testament.NEW, 6),
    EPHESIANS(49, "에베소서", Testament.NEW, 6),
    PHILIPPIANS(50, "빌립보서", Testament.NEW, 4),
    COLOSSIANS(51, "골로새서", Testament.NEW, 4),
    THESSALONIANS_1(52, "데살로니가전서", Testament.NEW, 5),
    THESSALONIANS_2(53, "데살로니가후서", Testament.NEW, 3),
    TIMOTHY_1(54, "디모데전서", Testament.NEW, 6),
    TIMOTHY_2(55, "디모데후서", Testament.NEW, 4),
    TITUS(56, "디도서", Testament.NEW, 3),
    PHILEMON(57, "빌레몬서", Testament.NEW, 1),
    HEBREWS(58, "히브리서", Testament.NEW, 13),
    JAMES(59, "야고보서", Testament.NEW, 5),
    PETER_1(60, "베드로전서", Testament.NEW, 5),
    PETER_2(61, "베드로후서", Testament.NEW, 3),
    JOHN_1(62, "요한일서", Testament.NEW, 5),
    JOHN_2(63, "요한이서", Testament.NEW, 1),
    JOHN_3(64, "요한삼서", Testament.NEW, 1),
    JUDE(65, "유다서", Testament.NEW, 1),
    REVELATION(66, "요한계시록", Testament.NEW, 22);

    private final int value;
    private final String description;
    private final Testament testament;
    private final int chapters;


    Book(int value, String description, Testament testament, int chapters) {
        this.value = value;
        this.description = description;
        this.testament = testament;
        this.chapters = chapters;

    }

    public int getValue() {
        return value;
    }

    public String getDescription() {
        return description;
    }

    public Testament getTestament() {
        return testament;
    }

    public int getChapters() { return chapters; }

    public static Book fromValue(int value) {
        for (Book book : Book.values()) {
            if (book.getValue() == value) {
                System.out.println(book.getDescription());
                return book;
            }
        }
        throw new IllegalArgumentException("No Book with value " + value);
    }



}
