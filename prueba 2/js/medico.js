function obtenerDatosAPI(){
  //metodo con el que trae toda info
  const options = {method: 'GET'};
  //envian una consulta, busca la ip, el puerto y la api 
  fetch('http://164.90.186.2:1711/api/medico/', options)
  //de vuelve un archivo json
    .then(response => response.json())
    //necesitamos recorren el json y loas almacenamos en la funcion mostrarDatos
    .then((json)=>json.forEach(mostrarDatos))
  
    .then(response => console.log(result))
    .catch(err => console.error('error', err));
  }
  
function mostrarDatos(element, index, arr){
      //index el que recorre
      //element es el valor
      //del documento selecciona la clase .data
  arr[index] = document.querySelector('.data').innerHTML += 
  `
  <tr>
      <td>
      ${element.id_medico}
      </td>
  
      <td>
      ${element.nombre_medico} 
      </td>

      <td>
      ${element.rut_medico} 
      </td>

      <td>
      ${element.especialidad} 
      </td>

      <td>
      ${element.id_cliente_fk} 
      </td>

      <td>
  
      <button type="button" class="btn btn-danger" onclick="eliminar(${element.id_medico});"><span class="material-icons">
      delete
      </span></button>
      <button type="button" class="btn btn-warning" onclick="location.href='/pages/medico/actualizar_medico.html?id_medico=${element.id_medico}'"><span class="material-symbols-outlined">
      edit_square
      </span>
      </button>
      </td>

  </tr>
  `;
  }
function agregar(){
  //crear el headders para pasar a json
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
    // campos del formulario
  var nombre_medico = document.getElementById('txt_nom_medico').value;
  var rut_medico = document.getElementById('txt_rut_medico').value;
  var especialidad = document.getElementById('txt_especialidad').value;
  var id_cliente_fk = document.getElementById('txt_id_cliente_medico').value;
  let error = '';
  if(nombre_medico.trim() == ''|| rut_medico.trim() == '' || especialidad.trim() == ''|| id_cliente_fk.trim() == '')
    error = 'Favor no ingresar datos VACIOS'
  if(error !=''){
    alert(error)
     return false
          
      }
  //pasamos al json cada una de las filas obtenidas
  var raw = JSON.stringify({
              "nombre_medico":nombre_medico,
              "rut_medico":rut_medico,
              "especialidad":especialidad,
              "id_cliente_fk":id_cliente_fk
  });
  //configuramos la variable opcion con los valores necesarios para nuestra función fetch
  var options = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
  }
  //const options = {method: 'POST', body: '{"nombre_tipo_producto": 'nombre_tipo'}'};
fetch('http://164.90.186.2:1711/api/medico/', options)
.then(response => {
  if(response.status == 200){
      alert('Se agrego correctamente...');
  }else{
      alert('Error al agregar los datos...');
  }
  })
.then(response => console.log(response))
.catch(err => console.error(err));
  }
function eliminar(id_medico){
      var options = {
          method: 'DELETE',
          redirect: 'follow'
      } 
  fetch('http://164.90.186.2:1711/api/medico/'+id_medico, options)
 .then(response => {
  if(response.status == 200){
      alert('Se elimino correctamente...');
  }else{
      alert('Error al eliminar los datos...');
  }
  })
.then(response => console.log(response))
.catch(err => console.error(err));
  }
  function obtenerIdMedico_actualizar(){
      var queryString = window.location.search;                                
      var urlParams = new URLSearchParams(queryString);
      var p_id_medico = urlParams.get("id_medico");
      g_id_medico = p_id_medico
      obtener_datos_medico_actualizar(p_medico)
    };
    function obtener_datos_medico_actualizar(p_id_medico){
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      fetch('http://164.90.186.2:1711/api/medico/'+p_id_medico, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(mostrarDatosMedico_actualizar)
        )
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    };
    function mostrarDatosMedico_actualizar(element, index, arr){
      var nombre_medico = element.nombre_medico;
      var rut_medico = element.rut_medico;
      var especialidad = element.especialidad;
      var id_cliente_fk = element.id_cliente_fk;
      document.getElementById('txt_nom_medico').value = element.nombre_medico
      document.getElementById("txt_rut_medico").value = element.rut_medico
      document.getElementById("txt_especialidad").value = element.especialidad
      document.getElementById("txt_id_cliente_medico").value = element.id_cliente_fk
    };
    function actualizar_medico(){
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
      var nombre_medico  = document.getElementById('txt_nom_medico').value;
      var rut_medico     = document.getElementById("txt_rut_medico").value; 
      var especialidad     = document.getElementById("txt_especialidad").value; 
      var id_cliente_fk     = document.getElementById("txt_id_cliente_medico").value;
      let error = '';
      if(nombre_medico.trim() == ''|| rut_medico.trim() == '' || especialidad.trim() == ''|| id_cliente_fk.trim() == '')
        error = 'Favor no ingresar datos VACIOS'
      if(error !=''){
        alert(error)
         return false
              
          }
      var raw = JSON.stringify({
        "nombre_medico": nombre_medico,
        "rut_medico": rut_medico,
        "especialidad": especialidad,
        "id_cliente_fk": id_cliente_fk,
      });
      
      var requestOptions = {
        method: 'PATCH',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
                                              
      };
      
      fetch('http://164.90.186.2:1711/api/medico/'+g_id_medico, requestOptions)
      .then(response => {
        if(response.status == 200){
            alert('Se actualizo correctamente...');
        }else{
            alert('Error al actualizar los datos...');
        }
        })
      .then(response => console.log(response))
      .catch(err => console.error(err));
        }
    
    
    function obtenerIdMedico(){
      var queryString = window.location.search;
      var urlParams = new URLSearchParams(queryString);
      var p_id_medico = urlParams.get("id_medico");
      g_id_medico = p_id_medico
      obtener_datos_medico(p_id_medico)
    }
    
    function obtener_datos_medico(p_id_medico){
      var requestOptions = {
        method: 'GET',
        redirect: 'follow'
      };
      
      fetch('http://164.90.186.2:1711/api/medico/'+p_id_medico, requestOptions)
        .then((response) => response.json())
        .then((json) => json.forEach(mostrarDatosTipoProducto)
        )
    
        .then(result => console.log(result))
        .catch(error => console.log('error', error));
    }
    