export const collectIdAndDocs = doc => {
  return { id: doc.id, ...doc.data() };
}