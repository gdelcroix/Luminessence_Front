import { useEffect, useState } from 'react';
import { prestaListe, prestaModif, prestaAjout, prestaSupprime } from '../service/ApiCalls';
import { Table, Button } from 'react-bootstrap';

function GestionServices() {
  const [prestations, setPrestations] = useState([]);
  const [edit, setEdit] = useState(null);
  const [modifPresta, setModifPresta] = useState({
    ID_Produit: '',
    Nom_Produit: '',
    Description: '',
    Prix: '',
    Image: '',
    Stock: '',
    Date_Péremption: '',
    Catégorie: '',
    Visible: '',
  });

  useEffect(() => {
    const fetchPresta = async () => {
      try {
        let data = { catégorie: ['massage' , 'formation', ''] };
        const request = await prestaListe(data);
        setPrestations(request);
        console.log('fetcher ', request);
      } catch (error) {
        console.error('Erreur lors de la récupération des prestations :', error);
      }
    };
    fetchPresta();
  }, []);

  const handleEdit = (prestation) => {
    setEdit(prestation.ID_Produit);
    setModifPresta(prestation);
  };

  const handleSave = async () => {
    try {
      const request = await prestaModif(modifPresta);
      console.log('save :', request);
      setEdit(null);
      setPrestations((prev) => prev.map((p) => (p.ID_Produit === modifPresta.ID_Produit ? modifPresta : p)));
    } catch (error) {
      console.error('Erreur lors de la modification de la prestation :', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const request = await prestaSupprime(id);
      console.log('suppression :', request.data);
      setPrestations((prev) => prev.filter((p) => p.ID_Produit !== id));
      setEdit(null);
    } catch (error) {
      console.error('Erreur lors de la suppression de la prestation :', error);
    }
  };

  const handleAdd = async () => {
    try {
      const newPrest = { ...modifPresta, ID_Produit: null };
      const request = await prestaAjout(newPrest);
      console.log('ajout :', request.data);

      const ajout = {
        ID_Produit: request.data.result.insertId,
        ...newPrest,
        date_création: new Date().toISOString().split('T')[0],
        dernière_modification: new Date().toISOString().split('T')[0],
      };
      setPrestations((prev) => [...prev, ajout]);
      setEdit(null);
      setModifPresta({});
    } catch (e) {
      console.error("Erreur lors de l'ajout de la prestation :", e);
    }
  };

  const handleChange = (edit) => {
    const { name, value } = edit.target;
    setModifPresta((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div>
      <h2>liste des Prestations</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Nom du Produit</th>
            <th>Description</th>
            <th>Prix</th>
            <th>image</th>
            <th>Date</th>
            <th>Places</th>
            <th>Catégorie</th>
            <th>Visible</th>
          </tr>
        </thead>
        <tbody>
          {prestations.map((prestation) => (
            <tr key={prestation.ID_Produit}>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='text' name='Nom_Produit' value={modifPresta.Nom_Produit || ''} onChange={handleChange} />
                ) : (
                  prestation.Nom_Produit
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='text' name='Description' value={modifPresta.Description || ''} onChange={handleChange} />
                ) : (
                  prestation.Description
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='number' name='Prix' value={modifPresta.Prix || ''} onChange={handleChange} />
                ) : (
                  prestation.Prix
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='text' name='Image' value={modifPresta.Image || ''} onChange={handleChange} />
                ) : (
                  prestation.Image
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='date' name='Date_Péremption' value={modifPresta.Date_Péremption || ''} onChange={handleChange} />
                ) : (
                  prestation.Date_Péremption
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='number' name='Stock' value={modifPresta.Stock || ''} onChange={handleChange} />
                ) : (
                  prestation.Stock
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <select id='Catégorie' name='Catégorie' value={modifPresta.Catégorie || ''} onChange={handleChange}>
                    <option value=''>choisissez une catégorie</option>
                    <option value='formation'>Formation</option>
                    <option value='massage'>Massage</option>
                  </select>
                ) : (
                  prestation.Catégorie
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <input type='Boolean' name='Visible' value={modifPresta.Visible || ''} onChange={handleChange} />
                ) : (
                  prestation.Stock
                )}
              </td>
              <td>
                {edit === prestation.ID_Produit ? (
                  <Button variant='warning' onClick={() => handleSave(prestation)}>
                    Enregistrer
                  </Button>
                ) : (
                  <Button variant='warning' onClick={() => handleEdit(prestation)}>
                    Éditer
                  </Button>
                )}
                <Button variant='danger' onClick={() => handleDelete(prestation.ID_Produit)}>
                  Supprimer
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      <Button variant='success' onClick={() => setEdit('new')}>
        Ajouter une nouvelle prestation
      </Button>
      {edit === 'new' && (
        <div>
          <h3>Ajouter une nouvelle prestation</h3>
          <input
            type='text'
            name='Nom_Produit'
            placeholder='Nom du Produit'
            value={modifPresta.Nom_Produit || ''}
            onChange={handleChange}
          />
          <input
            type='text'
            name='Description'
            placeholder='Description'
            value={modifPresta.Description || ''}
            onChange={handleChange}
          />
          <input type='text' name='Prix' placeholder='Prix' value={modifPresta.Prix || ''} onChange={handleChange} />
          <input type='text' name='Image' placeholder='Image' value={modifPresta.Image || ''} onChange={handleChange} />
          <input
            type='text'
            name='Date_Péremption'
            placeholder='Date de la prestation'
            value={modifPresta.Date_Péremption || ''}
            onChange={handleChange}
          />
          <input
            type='number'
            name='Stock'
            placeholder='Stock'
            value={modifPresta.Stock || ''}
            onChange={handleChange}
          />
          <input
            type='Boolean'
            name='Visible'
            placeholder='1'
            value={modifPresta.Visible || ''}
            onChange={handleChange}
            />
          <select
            name='Catégorie'
            placeholder='Catégorie'
            value={modifPresta.Catégorie || ''}
            onChange={handleChange}
            >
              <option value='formation'>Formation</option>
              <option value='massage'>Massage</option>
            </select>
          <Button variant='success' onClick={handleAdd}>
            Ajouter
          </Button>
        </div>
      )}
    </div>
  );
}

export default GestionServices;
