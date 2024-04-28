import { createWorker } from "tesseract.js";



const convertor1 = async (img: string) => {
  const worker = await createWorker("eng");
  const ret = await worker.recognize(img);
  const text = ret.data.text;
  await worker.terminate();
  const cleanedText = text.replace(/\n\s*\n/g, '\n').trim();
  const items = cleanedText.split('\n').map(item => item.trim()).filter(item => item !== '');
  return items;
};







export default convertor1;


