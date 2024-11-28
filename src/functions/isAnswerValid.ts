import stringSimilarity from "string-similarity";

export const validasiNamaLagu = (jawaban: string, lagu: string) => {
  // Konversi ke lowercase untuk menghindari perbedaan case
  const normalizedJawaban = jawaban.toLowerCase();
  const normalizedLagu = lagu.toLowerCase();

  // Hitung kemiripan
  const similarity = stringSimilarity.compareTwoStrings(
    normalizedJawaban,
    normalizedLagu
  );

  // Threshold, misal 0.5 untuk mendekati
  return similarity > 0.45;
};
