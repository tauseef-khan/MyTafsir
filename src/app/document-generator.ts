import { AlignmentType, Document, HeadingLevel, Paragraph, TextRun, Underline } from 'docx';
import { StorageService } from 'ngx-webstorage-service';
import { Word } from './word';

export class DocumentGenerator {

    public create(ayahs: Word[], storage: StorageService): Document {
        const document = new Document();

        let content = '';
        const heading = new Paragraph ({
            text: "Surah An-Nas notes",
            heading: HeadingLevel.TITLE,
            alignment: AlignmentType.CENTER
        });

        const formatNotes = this.createNotes(ayahs, storage);
        //const headingEdu = this.createHeading("Education");

        document.addSection({ children: [heading, formatNotes] });

        return document;
    }

    public createHeading(text: string): Paragraph {
        return new Paragraph ({
            text: text,
            heading: HeadingLevel.HEADING_1
        });
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

                    let abc = new Paragraph({
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

                    // let cde = new Paragraph({
                    //     text: userNotes,
                    //     spacing: {
                    //         after: 200
                    //     }
                    // });

                    notes.addChildElement(abc);
                    //notes.addChildElement(cde);
                }
            }
        }

        return notes;
    }
}
