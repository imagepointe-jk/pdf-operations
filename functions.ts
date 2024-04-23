import { PDFDocument, rgb, PDFString, PDFName, PDFObject } from "pdf-lib";
import fs from "fs";

//TODO: Refactor to allow spreadsheet-based input of links and their positions.
//This will make it easier for non-developers to use this tool if necessary.
//Might also want to move the functionality into a web service so that the user
//doesn't need to worry about node installation, etc.
export async function addLinksToPdf(
  inputPath: string,
  pagesWithLinks: PdfPageWithLinks[],
  outputPath: string
) {
  const file = fs.readFileSync(inputPath);
  const doc = await PDFDocument.load(file);
  for (const pageWithLinks of pagesWithLinks) {
    const page = doc.getPage(pageWithLinks.pageNumber - 1);
    const { width: pageWidth, height: pageHeight } = page.getSize();
    //Code is from package developer at https://github.com/Hopding/pdf-lib/issues/555
    const refs = pageWithLinks.links.map((link) =>
      page.doc.context.register(
        page.doc.context.obj({
          Type: "Annot",
          Subtype: "Link",
          Rect: [
            link.position.left,
            link.position.bottom,
            pageWidth - link.position.right,
            pageHeight - link.position.top,
          ],
          Border: [0, 0, 2],
          C: [0.5, 0.5, 0.5],
          A: {
            Type: "Action",
            S: "URI",
            URI: PDFString.of(link.url),
          },
        })
      )
    );
    page.node.set(PDFName.of("Annots"), doc.context.obj(refs));
  }
  const pdfBytes = await doc.save();
  fs.writeFileSync(outputPath, pdfBytes);
}

type PdfLink = {
  position: {
    left: number;
    top: number;
    right: number;
    bottom: number;
  };
  url: string;
};
export type PdfPageWithLinks = {
  pageNumber: number;
  links: PdfLink[];
};
