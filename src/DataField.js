import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { DaEditor } from "./DaEditor"

// Componente de la lista
function DataFieldList({ items, onItemClick }) {
  const handleDragStart = (event, fieldname) => {
    // Configura el contenido que se va a arrastrar
    event.dataTransfer.setData('text/plain', fieldname);
  };

  return (
    <ul>
      {items.map((item, index) => (
        <li
          key={item.id}
          draggable={true}
          onDragStart={(e) => handleDragStart(e, item.fieldname)}
          onClick={() => onItemClick(item.fieldname)}
        >
          {item.fieldname}
        </li>
      ))}
    </ul>
  );
}

// Componente principal
export function DataField() {
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);

  useEffect(() => {
    // Simular una llamada a la API (cambia esto por tu llamada real)
    axios.get('URL_DE_TU_API')
      .then((response) => {
        if (response.data.length > 0) {
          setItems(response.data.slice(0, 20));
        } else {
          const dummyItems = Array.from({ length: 20 }, (_, index) => ({
            id: `item-${index}`,
            fieldname: `DataField${index + 1}`,
            debe: '',
          }));
          setItems(dummyItems);
        }
      })
      .catch((error) => {
        console.error('Error al obtener los datos:', error);
        const dummyItems = Array.from({ length: 20 }, (_, index) => ({
          id: `item-${index}`,
          fieldname: `{DataField${index + 1}}`,
          debe: '',
        }));
        setItems(dummyItems);
      });
  }, []);

  const handleSearch = (searchTerm) => {
    const filtered = items.filter((item) =>
      item.fieldname.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredItems(filtered);
  };

  const handleItemClick = (fieldname) => {
    setSelectedItem(fieldname);
  };

  const handleDragOver = (event) => {
    // Evitar el comportamiento predeterminado que evita que se pueda soltar contenido en DaEditor
    event.preventDefault();
  };

  const handleDrop = (event) => {
    // Manejar el evento de soltar y establecer el contenido arrastrado en DaEditor
    const droppedContent = event.dataTransfer.getData('text/plain');
    setSelectedItem(droppedContent);
  };

  return (
    <div>
      <DaEditor content={selectedItem} onDragOver={handleDragOver} onDrop={handleDrop} />
      <div>
        <input
          type="text"
          placeholder="Buscar"
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div style={{ display: 'flex' }}>
        <DataFieldList
          items={filteredItems.length > 0 ? filteredItems : items}
          onItemClick={handleItemClick}
        />
      </div>
    </div>
  );
}

export default DataField;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import { DaEditor } from "./DaEditor"

// // Componente de la lista
// function DataFieldList({ items, onItemClick }) {
//   return (
//     <ul>
//       {items.map((item, index) => (
//                 <li
//                 onClick={() => onItemClick(item.fieldname)}
//                 >
//                 {item.fieldname}
//                 </li>
//       ))}
//     </ul>
//   );
// }

// // Componente principal
// export function DataField() {
    
//         const [items, setItems] = useState([]);
//         const [filteredItems, setFilteredItems] = useState([]);
//         const [selectedItem, setSelectedItem] = useState(null);
      
//         useEffect(() => {
//           // Simular una llamada a la API (cambia esto por tu llamada real)
//           axios.get('URL_DE_TU_API')
//             .then((response) => {
//               if (response.data.length > 0) {
//                 setItems(response.data.slice(0, 20)); // Obtener los primeros 20 ítems del API
//               } else {
//                 // En caso de respuesta vacía o excepción, crea un array de 20 items con nombres aleatorios
//                 const dummyItems = Array.from({ length: 20 }, (_, index) => ({
//                   id: `item-${index}`,
//                   fieldname: `DataField${index + 1}`, // Nombres aleatorios con el prefijo "DataField"
//                   debe: '', // Agrega el valor por defecto deseado
//                 }));
//                 setItems(dummyItems);
//               }
//             })
//             .catch((error) => {
//               console.error('Error al obtener los datos:', error);
      
//               // En caso de excepción, también puedes crear los datos ficticios
//               const dummyItems = Array.from({ length: 20 }, (_, index) => ({
//                 id: `item-${index}`,
//                 fieldname: `DataField${index + 1}`, // Nombres aleatorios con el prefijo "DataField"
//                 debe: '', // Agrega el valor por defecto deseado
//               }));
//               setItems(dummyItems);
//             });
//         }, []);

//   const handleSearch = (searchTerm) => {
//     // Filtrar los ítems según el término de búsqueda
//     const filtered = items.filter((item) =>
//       item.fieldname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   const handleItemClick = (fieldname) => {
//     // Agregar el campo seleccionado al editor
//     setSelectedItem(fieldname);
//   };

//   const handleDragEnd = (result) => {
//     // Manejar el evento de arrastrar y soltar
//     if (!result.destination) {
//       return;
//     }
//     // Realizar acciones adicionales según sea necesario
//   };

//   return (
//     <div>
//       <DaEditor></DaEditor>
//       <div>
//         <input
//           type="text"
//           placeholder="Buscar"
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </div>
//       <div style={{ display: 'flex' }}>
//       <DataFieldList
//                 items={filteredItems.length > 0 ? filteredItems : items}
//                 onItemClick={handleItemClick}
//               />
//       </div>
//     </div>
//   );
// }

// export default DataField;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
// import {DaEditor} from "./DaEditor"

// Componente de la lista
// function DataFieldList({ items, onItemClick }) {
//   return (
//     <ul>
//       {items.map((item, index) => (
//         <Draggable key={item.id} draggableId={item.id.toString()} index={index}>
//           {(provided) => (
//             <li
//               ref={provided.innerRef}
//               {...provided.draggableProps}
//               {...provided.dragHandleProps}
//               onClick={() => onItemClick(item.fieldname)}
//             >
//               {item.fieldname}
//             </li>
//           )}
//         </Draggable>
//       ))}
//     </ul>
//   );
// }

// Componente principal
// export function DataField() {
//   const [items, setItems] = useState([]);
//   const [filteredItems, setFilteredItems] = useState([]);
//   const [selectedItem, setSelectedItem] = useState(null);

//   useEffect(() => {
//     Simular una llamada a la API (cambia esto por tu llamada real)
//     axios.get('URL_DE_TU_API')
//       .then((response) => {
//         if (response.data.length > 0) {
//           setItems(response.data.slice(0, 20)); // Obtener los primeros 20 ítems del API
//         } else {
//           En caso de respuesta vacía, crea un array de 20 items con la estructura deseada
//           const dummyItems = Array.from({ length: 20 }, (_, index) => ({
//             id: `item-${index}`,
//             fieldname: `Field ${index + 1}`,
//             debe: '', // Agrega el valor por defecto deseado
//           }));
//           setItems(dummyItems);
//         }
//       })
//       .catch((error) => {
//         console.error('Error al obtener los datos:', error);
      
//               En caso de excepción, también puedes crear los datos ficticios
//               const dummyItems = Array.from({ length: 20 }, (_, index) => ({
//                 id: `item-${index}`,
//                 fieldname: `DataField${index + 1}`, // Nombres aleatorios con el prefijo "DataField"
//                 debe: '', // Agrega el valor por defecto deseado
//               }));
//                setItems(dummyItems);

//       });
//   }, []);
  

//   const handleSearch = (searchTerm) => {
//     Filtrar los ítems según el término de búsqueda
//     const filtered = items.filter((item) =>
//       item.fieldname.toLowerCase().includes(searchTerm.toLowerCase())
//     );
//     setFilteredItems(filtered);
//   };

//   const handleItemClick = (fieldname) => {
//     Agregar el campo seleccionado al editor
//     setSelectedItem(fieldname);
//   };

//   const handleDragEnd = (result) => {
//     Manejar el evento de arrastrar y soltar
//     if (!result.destination) {
//       return;
//     }
//     Realizar acciones adicionales según sea necesario
//   };

//   return (
//     <div>
//         <DaEditor></DaEditor>
//       <div>
//         <input
//           type="text"
//           placeholder="Buscar"
//           onChange={(e) => handleSearch(e.target.value)}
//         />
//       </div>
//       <div style={{ display: 'flex' }}>
//         <Droppable droppableId="item-list" direction="horizontal">
//           {(provided) => (
//             <div
//               ref={provided.innerRef}
//               {...provided.droppableProps}
//               style={{ flex: 1 }}
//             >
//               <DataFieldList
//                 items={filteredItems.length > 0 ? filteredItems : items}
//                 onItemClick={handleItemClick}
//               />
//             </div>
//           )}
//         </Droppable>
//         {selectedItem && (
//           <div style={{ flex: 1 }}>
//             <DaEditor selectedItem={selectedItem} />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DataField;
