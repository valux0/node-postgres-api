const API_URL = "http://localhost:3300/plantas";
console.log("JS CARGADO");

// 🔍 GET - Obtener plantas
const getPlantas = async () => {
  console.log("CLICK DETECTADO");

  try {
    const response = await fetch(API_URL);
    const data = await response.json();

    const tbody = document.getElementById("tabla-body");
    tbody.innerHTML = "";

    data.plantas.forEach(planta => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${planta.id}</td>
        <td>${planta.nombre}</td>
        <td>${planta.nombre_cientifico}</td>
        <td>${planta.tipo}</td>
        <td>${planta.riego}</td>
        <td>${planta.luz}</td>
        <td>${planta.altura_cm}</td>
        <td>${planta.fecha_registro?.split("T")[0]}</td>
        <td><img src="${planta.imagen}" width="60"></td>
       <td>
          <button onclick="editar(${planta.id})">✏️</button>
          <button onclick="eliminar(${planta.id})">🗑</button>
        </td>       
      `;

      tbody.appendChild(row);
    });

  } catch (error) {
    console.error("Error GET:", error);
  }
};

// ➕ POST - Crear planta
const form = document.getElementById("formPlanta");

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const id = form.dataset.id;

  const formData = new FormData();

  formData.append("nombre", document.getElementById("nombre").value);
  formData.append("nombre_cientifico", document.getElementById("nombre_cientifico").value);
  formData.append("tipo", document.getElementById("tipo").value);
  formData.append("riego", document.getElementById("riego").value);
  formData.append("luz", document.getElementById("luz").value);
  formData.append("altura_cm", document.getElementById("altura_cm").value);
  formData.append("fecha_registro", document.getElementById("fecha_registro").value);

  const fileInput = document.getElementById("imagen");
  console.log("ARCHIVO:", fileInput.files[0]);
  formData.append("imagen", fileInput.files[0]);

  try {
    if (id) {
      // UPDATE
      await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        body: formData
      });

      delete form.dataset.id;

    } else {
      // CREATE
      await fetch(API_URL, {
        method: "POST",
        body: formData
      });
    }

    form.reset();
    getPlantas();

  } catch (error) {
    console.error(error);
  }
});


const eliminar = async (id) => {
  if (!confirm("¿Eliminar planta?")) return;

  try {
    await fetch(`${API_URL}/${id}`, {
      method: "DELETE"
    });

    getPlantas(); // recargar tabla
  } catch (error) {
    console.error("Error DELETE:", error);
  }
};

const editar = async (id) => {
  try {
    const res = await fetch(`${API_URL}/${id}`);
    const data = await res.json();
    const planta = data.planta;

    document.getElementById("nombre").value = planta.nombre;
    document.getElementById("nombre_cientifico").value = planta.nombre_cientifico;
    document.getElementById("tipo").value = planta.tipo;
    document.getElementById("riego").value = planta.riego;
    document.getElementById("luz").value = planta.luz;
    document.getElementById("altura_cm").value = planta.altura_cm;
    form.dataset.id = id;

  } catch (error) {
    console.error(error);
  }
};
