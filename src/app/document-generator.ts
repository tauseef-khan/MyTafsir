import { AlignmentType, Document, HeadingLevel, Paragraph, TextRun } from 'docx';
import { StorageService } from 'ngx-webstorage-service';
import { Word } from './word';

export class DocumentGenerator {

    public create(ayahs: Word[], storage: StorageService): Document {
        const document = new Document();

        const heading = new Paragraph ({
            text: "Surah Al-Humazah notes",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER
        });

        const formatNotes = this.createNotes(ayahs, storage);

        document.addSection({ children: [heading, formatNotes] });

        return document;
    }

    public createNotes(ayahs: Word[], storage: StorageService): Paragraph {

        let notes = new Paragraph({
            text: "",
            heading: HeadingLevel.TITLE,
            spacing: {
                after: 200
            },
            children: [
                new TextRun("").break()
            ]
        });
        
        for (let ayah of ayahs) {

            let ayahNumberInSurah = ayah.ayahNumberInSurah;
            let overallVersenumber = ayah.overallVersenumber;

            for (let word of ayah.splitWord) {
                let storageKey = ayahNumberInSurah + ":" + overallVersenumber + ":" + word;
                let userNotes = storage.get(storageKey);

                if(userNotes != undefined) {
                    console.log('notes : ' + userNotes);

                    let wordNotes = new Paragraph({
                        spacing: {
                            after: 200
                        },
                        children: [
                            new TextRun("").break(),
                            new TextRun({
                                text: 'Ayah Number - ' + ayahNumberInSurah + ', Word - ' + word,
                                underline: {},
                                bold: true,
                                size: 36
                            }),
                            new TextRun("").break(),
                            new TextRun({
                                text: userNotes,
                                size: 28
                            }),
                            new TextRun("").break(),
                        ]
                    });

                    notes.addChildElement(wordNotes);
                }
            }
        }

        return notes;
    }
}