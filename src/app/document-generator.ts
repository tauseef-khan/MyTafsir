import { Document, HeadingLevel, Paragraph } from 'docx';

export class DocumentGenerator {

    public create(): Document {
        const document = new Document();

        let content = '';
        const heading = new Paragraph ({
            text: "Hello World",
            heading: HeadingLevel.TITLE
        });

        const headingEdu = this.createHeading("Education");

        document.addSection({ children: [heading, headingEdu] });

        return document;
    }

    public createHeading(text: string): Paragraph {
        return new Paragraph ({
            text: text,
            heading: HeadingLevel.HEADING_1
        });
    }
}
