export async function GetPrestataireId(id) {
  const url = `http://localhost:8000/api/prestataires/${id}`;
  const res = await fetch(url);
  //const res = await fetch(process.env.API_BASE+'/api/categorie_de_servicess')
  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data');
  }

  return res.json();
};
