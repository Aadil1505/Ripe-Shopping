import { createWorker } from "tesseract.js";

const convertor1 = async (img: string) => {
  const worker = await createWorker("eng");
  try {
    const ret = await worker.recognize(img);
    const text = ret.data.text;
    const cleanedText = text.replace(/\n\s*\n/g, '\n').trim();
    const items = cleanedText.split('\n').map(item => item.trim()).filter(item => item !== '');
    return items;
  } catch (error) {
    console.error("Error in OCR processing:", error);
    throw error;
  } finally {
    await worker.terminate();
  }
};

export default convertor1;


