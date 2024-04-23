import { PdfPageWithLinks, addLinksToPdf } from "./functions";

const pages: PdfPageWithLinks[] = [
  {
    pageNumber: 4,
    links: [
      {
        position: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
        },
        url: "First URL here",
      },
    ],
  },
  {
    pageNumber: 5,
    links: [
      {
        position: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
        },
        url: "Second URL here",
      },
      {
        position: {
          left: 15,
          right: 15,
          top: 15,
          bottom: 15,
        },
        url: "Third URL here (also on page 5)",
      },
    ],
  },
];
const filenames = [
  "First File Name Here",
  "Second File Name Here",
  "Third File Name Here",
];

async function run() {
  for (const filename of filenames) {
    console.log(`Adding links to ${filename}`);
    await addLinksToPdf(
      `./input/${filename}.pdf`,
      pages,
      `./output/${filename} (with links).pdf`
    );
  }
}
run();
