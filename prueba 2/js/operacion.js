function obtenerDatosAPI(){
    //metodo con el que trae toda info
    const options = {method: 'GET'};
    //envian una consulta, busca la ip, el puerto y la api 
    fetch('http://164.90.186.2:1711/api/operacion/', options)
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
        ${element.id_operacion}
        </td>
    
        <td>
        ${element.nom_operacion} 
        </td>

        <td>
        ${element.clase_operacion} 
        </td>

        <td>
        ${element.area_operacion} 
        </td>

        <td>
        ${element.costo_operacion} 
        </td>

        <td>
        ${element.tiempo_operacion} 
        </td>

        <td>
        ${element.id_medico_fk} 
        </td>

        <td>
    
        <button type="button" class="btn btn-danger" onclick="eliminar(${element.id_operacion});"><span class="material-icons">
        delete
        </span></button>
        <button type="button" class="btn btn-warning" onclick="location.href='/pages/operacion/actualizar_operacion.html?id_operacion=${element.id_operacion}'"><span class="material-symbols-outlined">
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
    
    var nom_operacion = document.getElementById('txt_nom_operacion').value;
    var clase_operacion = document.getElementById('txt_clase_operacion').value;
    var area_operacion = document.getElementById('txt_area_operacion').value;
    var costo_operacion = document.getElementById('txt_costo_operacion').value;
    var tiempo_operacion = document.getElementById('txt_tiempo_operacion').value;
    var id_medico_fk = document.getElementById('txt_id_cliente_medico').value;
    let error = '';
    if(nom_operacion.trim() == ''|| clase_operacion.trim() == '' || area_operacion.trim() == ''|| costo_operacion.trim() == ''|| tiempo_operacion.trim() == ''|| id_medico_fk.trim() == '')
      error = 'Favor no ingresar datos VACIOS'
    if(error !=''){
      alert(error)
       return false
            
        }

    //pasamos al json cada una de las filas obtenidas
    var raw = JSON.stringify({
                "nom_operacion":nom_operacion,
                "clase_operacion":clase_operacion,
                "area_operacion":area_operacion,
                "costo_operacion":costo_operacion,
                "tiempo_operacion":tiempo_operacion,
                "id_medico_fk":id_medico_fk,
    });
    //configuramos la variable opcion con los valores necesarios para nuestra función fetch
    var options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    //const options = {method: 'POST', body: '{"nombre_tipo_producto": 'nombre_tipo'}'};
  fetch('http://164.90.186.2:1711/api/operacion/', options)
  .then(response => {
    if(response.status == 200){
        alert('Se agrego  correctamente...');
    }else{
        alert('Error al agregar los datos...');
    }
    })
  .then(response => console.log(response))
  .catch(err => console.error(err));
    }
function eliminar(id_operacion){
        var options = {
            method: 'DELETE',
            redirect: 'follow'
        }
    fetch('http://164.90.186.2:1711/api/operacion/'+id_operacion, options)
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
    function obtenerIdOperacion_actualizar(){
        var queryString = window.location.search;                                
        var urlParams = new URLSearchParams(queryString);
        var p_id_operacion = urlParams.get("id_operacion");
        g_id_operacion = p_id_operacion
        obtener_datos_operacion(p_id_operacion)
      };
      function obtener_datos_operacion(p_id_operacion){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch('http://164.90.186.2:1711/api/operacion/'+p_id_operacion, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosOperacion_actualizar)
          )
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };
      function mostrarDatosOperacion_actualizar(element, index, arr){
        var nom_operacion= element.nom_operacion;
        var clase_operacion = element.clase_operacion;
        var area_operacion = element.area_operacion;
        var costo_operacion = element.costo_operacion;
        var tiempo_operacion = element.tiempo_operacion;
        var id_medico_fk = element.id_medico_fk;
        document.getElementById('txt_nom_operacion').value = element.nom_operacion
        document.getElementById("txt_clase_operacion").value = element.clase_operacion
        document.getElementById("txt_area_operacion").value = element.area_operacion
        document.getElementById("txt_costo_operacion").value = element.costo_operacion
        document.getElementById("txt_tiempo_operacion").value = element.tiempo_operacion
        document.getElementById("txt_id_cliente_medico").value = element.id_medico_fk
      };
      function actualizar_operacion(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var nom_operacion  = document.getElementById('txt_nom_operacion').value;
        var clase_operacion    = document.getElementById("txt_clase_operacion").value; 
        var area_operacion    = document.getElementById("txt_area_operacion").value; 
        var costo_operacion    = document.getElementById("txt_costo_operacion").value; 
        var tiempo_operacion    = document.getElementById("txt_tiempo_operacion").value; 
        var id_medico_fk    = document.getElementById("txt_id_cliente_medico").value; 
        let error = '';
        if(nom_operacion.trim() == ''|| clase_operacion.trim() == '' || area_operacion.trim() == ''|| costo_operacion.trim() == ''|| tiempo_operacion.trim() == ''|| id_medico_fk.trim() == '')
          error = 'Favor no ingresar datos VACIOS'
        if(error !=''){
          alert(error)
           return false
                
            }
        var raw = JSON.stringify({
          "nom_operacion": nom_operacion,
          "clase_operacion": clase_operacion,
          "area_operacion": area_operacion,
          "costo_operacion": costo_operacion,
          "tiempo_operacion": tiempo_operacion,
          "id_medico_fk": id_medico_fk,
        });
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
                                                
        };
        fetch('http://164.90.186.2:1711/api/operacion/'+g_id_operacion, requestOptions)
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

      function obtenerIdOperacion(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var p_id_operacion = urlParams.get("id_operacion");
        g_id_operacion = p_id_operacion
        obtener_datos_operacion(p_id_operacion)
      }
      
      function obtener_datos_operacion(p_id_operacion){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch('http://164.90.186.2:1711/api/operacion/'+p_id_operacion, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosOperacion)
          )
      
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
