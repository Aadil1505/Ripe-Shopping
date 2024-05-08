import { createWorker } from "tesseract.js";



const convertor1 = async (img: File) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(img);
  const text = ret.data.text;
  await worker.terminate();
  const cleanedText = text.replace(/\n\s*\n/g, '\n').trim();
  const items = cleanedText.split('\n').map((item: string) => item.trim()).filter((item: string) => item !== '');
  return items;
};







export default convertor1;


