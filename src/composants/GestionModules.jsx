import { useEffect, useState } from 'react';
import { Container } from 'react-bootstrap';
import { modulesListe, modulesChanger } from '../service/ApiCalls';

const GestionModules = () => {
  const [sections, setSections] = useState([]);

  useEffect(() => {
    const modulesData = localStorage.getItem('modulesData');
    if (modulesData) {
      setSections(JSON.parse(modulesData));
    } else {
      modulesListe().then((data) => {
        setSections(data);
        localStorage.setItem('modulesData', JSON.stringify(data));
      });
    }
  }, []);

  const handleChange = (id) => {
    // écrire la modification en base et localStorage
    const updatedSections = sections.map(section => {
        if (section.ID === id) {
          return {...section, active:!section.active };
        }
        return section;
      });
      setSections(updatedSections);
    localStorage.setItem('modulesData', JSON.stringify(updatedSections));
    // Obtenir la section mise à jour
  const updatedSection = updatedSections.find(section => section.ID === id);

  
    modulesChanger(id, {status: updatedSection.active} );

    };



  return (
    <Container>
      <h2 className='text-center'>Liste des modules actifs</h2>
      {/* Afficher les modules */}
      <ul className='text-start'>
        {sections.map((section) => (
          <li key={section.ID}>
            <label>
              <input type='checkbox' checked={section.active} onChange={() => handleChange(section.ID)} />
              {section.nomSection}
            </label>
          </li>
        ))}
      </ul>
    </Container>
  );
};
export default GestionModules;
