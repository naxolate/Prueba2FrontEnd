function obtenerDatosAPI(){
    //metodo con el que trae toda info
    const options = {method: 'GET'};
    //envian una consulta, busca la ip, el puerto y la api 
    fetch('http://164.90.186.2:1711/api/mascota/', options)
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
        ${element.id_mascota}
        </td>
    
        <td>
        ${element.nombre_mascota} 
        </td>

        <td>
        ${element.animal} 
        </td>

        <td>
        ${element.raza} 
        </td>

        <td>
        ${element.sexo} 
        </td>

        <td>
        ${element.edad} 
        </td>

        <td>
        ${element.id_clientefk} 
        </td>

        <td>
    
        <button type="button" class="btn btn-danger" onclick="eliminar(${element.id_mascota});"><span class="material-icons">
        delete
        </span></button>
        <button type="button" class="btn btn-warning" onclick="location.href='/pages/mascota/actualizar_mascota.html?id_mascota=${element.id_mascota}'"><span class="material-symbols-outlined">
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
    var nombre_mascota = document.getElementById('txt_nom_mascota').value;
    var animal = document.getElementById('txt_animal').value;
    var raza = document.getElementById('txt_raza').value;
    var sexo = document.getElementById('txt_sexo').value;
    var edad = document.getElementById('txt_edad').value;
    var id_clientefk = document.getElementById('txt_id_cliente').value;
    let error = '';
    if(nombre_mascota.trim() == ''|| animal.trim() == '' || raza.trim() == ''|| sexo.trim() == ''|| edad.trim() == ''|| id_clientefk.trim() == '')
      error = 'Favor no ingresar datos VACIOS'
    if(error !=''){
      alert(error)
       return false
            
        }
    //pasamos al json cada una de las filas obtenidas
    var raw = JSON.stringify({
                "nombre_mascota":nombre_mascota,
                "animal":animal,
                "raza":raza,
                "sexo":sexo,
                "edad":edad,
                "id_clientefk":id_clientefk,
    });
    //configuramos la variable opcion con los valores necesarios para nuestra función fetch
    var options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    //const options = {method: 'POST', body: '{"nombre_tipo_producto": 'nombre_tipo'}'};
  fetch('http://164.90.186.2:1711/api/mascota/', options)
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
function eliminar(id_mascota){
        var options = {
            method: 'DELETE',
            redirect: 'follow'
        }
    fetch('http://164.90.186.2:1711/api/mascota/'+id_mascota, options)
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
    function obtenerIdMascota_actualizar(){
        var queryString = window.location.search;                                
        var urlParams = new URLSearchParams(queryString);
        var p_id_mascota = urlParams.get("id_mascota");
        g_id_mascota = p_id_mascota
        obtener_datos_mascota(p_id_mascota)
      };
      function obtener_datos_mascota(p_id_mascota){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch('http://164.90.186.2:1711/api/mascota/'+p_id_mascota, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosMascota_actualizar)
          )
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };
      function mostrarDatosMascota_actualizar(element, index, arr){
        var nombre_mascota= element.nombre_mascota;
        var animal = element.animal;
        var raza = element.raza;
        var sexo = element.sexo;
        var edad = element.edad;
        var id_clientefk = element.id_clientefk;
        document.getElementById('txt_nom_mascota').value = element.nombre_mascota
        document.getElementById("txt_animal").value = element.animal
        document.getElementById("txt_raza").value = element.raza
        document.getElementById("txt_sexo").value = element.sexo
        document.getElementById("txt_edad").value = element.edad
        document.getElementById("txt_id_cliente").value = element.id_clientefk
      };
      function actualizar_mascota(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var nombre_mascota  = document.getElementById('txt_nom_mascota').value;
        var animal    = document.getElementById("txt_animal").value; 
        var raza    = document.getElementById("txt_raza").value; 
        var sexo    = document.getElementById("txt_sexo").value; 
        var edad    = document.getElementById("txt_edad").value; 
        var id_clientefk    = document.getElementById("txt_id_cliente").value;
        let error = '';
        if(nombre_mascota.trim() == ''|| animal.trim() == '' || raza.trim() == ''|| sexo.trim() == ''|| edad.trim() == ''|| id_clientefk.trim() == '')
          error = 'Favor no ingresar datos VACIOS'
        if(error !=''){
          alert(error)
           return false
                
            }
        var raw = JSON.stringify({
          "nombre_mascota": nombre_mascota,
          "animal": animal,
          "raza": raza,
          "sexo": sexo,
          "edad": edad,
          "id_clientefk": id_clientefk,
        });
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'
                                                
        };
        fetch('http://164.90.186.2:1711/api/mascota/'+g_id_mascota, requestOptions)
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
/*       function obtenerIdMascota(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var p_id_mascota = urlParams.get("id_mascota");
        g_id_mascota = p_id_mascota
        obtener_datos_mascota(p_id_mascota)
      }
      function obtener_datos_mascota(p_id_mascota){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch('http://164.90.186.2:3000/api/mascota/'+p_id_mascota, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosMascota)
          )
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
 */
      function obtenerIdMascota(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var p_id_mascota = urlParams.get("id_mascota");
        g_id_mascota = p_id_mascota
        obtener_datos_mascota(p_id_mascota)
      }
      
      function obtener_datos_mascota(p_id_mascota){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch('http://164.90.186.2:1711/api/mascota/'+p_id_mascota, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosCliente)
          )
      
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }
