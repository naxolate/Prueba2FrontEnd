function obtenerDatosAPI(){
    //metodo con el que trae toda info
    const options = {method: 'GET'};
    //envian una consulta, busca la ip, el puerto y la api 
    fetch('http://164.90.186.2:1711/api/cliente/', options)
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
        ${element.id_cliente}
        </td>
    
        <td>
        ${element.nom_cliente} 
        </td>

        <td>
        ${element.rut_cliente} 
        </td>

        <td>
        ${element.email_cliente} 
        </td>

        <td>
    
        <button type="button" class="btn btn-danger" onclick="eliminar(${element.id_cliente});"><span class="material-icons">
        delete
        </span></button>
        <button type="button" class="btn btn-warning" onclick="location.href='/pages/cliente/actualizar_cliente.html?id_cliente=${element.id_cliente}'"><span class="material-symbols-outlined">
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
    
    var nom_cliente = document.getElementById('txt_nom_cliente').value;
    var rut_cliente = document.getElementById('txt_rut_cliente').value;
    var email_cliente = document.getElementById('txt_email_cliente').value;
    let error = '';
    if(nom_cliente.trim() == ''|| rut_cliente.trim() == '' || email_cliente.trim() == '')
      error = 'Favor no ingresar datos VACIOS'
    if(error !=''){
      alert(error)
       return false
            
        }
    //pasamos al json cada una de las filas obtenidas
    
    var raw = JSON.stringify({
                "nom_cliente":nom_cliente,
                "rut_cliente":rut_cliente,
                "email_cliente":email_cliente,
    });
    //configuramos la variable opcion con los valores necesarios para nuestra función fetch
    var options = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    }
    //const options = {method: 'POST', body: '{"nombre_tipo_producto": 'nombre_tipo'}'};
  fetch('http://164.90.186.2:1711/api/cliente/', options)
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
  
function eliminar(id_cliente){
        var options = {
            method: 'DELETE',
            redirect: 'follow'
        }
        
    fetch('http://164.90.186.2:1711/api/cliente/'+id_cliente, options)
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
    function obtenerIdCliente_actualizar(){
        var queryString = window.location.search;                                
        var urlParams = new URLSearchParams(queryString);
        var p_id_cliente = urlParams.get("id_cliente");
        g_id_cliente = p_id_cliente
        obtener_datos_cliente(p_id_cliente)
      };
      function obtener_datos_cliente(p_id_cliente){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        fetch('http://164.90.186.2:1711/api/cliente/'+p_id_cliente, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosCliente_actualizar)
          )
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      };
      function mostrarDatosCliente_actualizar(element, index, arr){
        var nom_cliente= element.nom_cliente;
        var rut_cliente = element.rut_cliente;
        var email_cliente = element.email_cliente;
        document.getElementById('txt_nom_cliente').value = element.nombre_cliente
        document.getElementById("txt_rut_cliente").value = element.rut_cliente
        document.getElementById("txt_email_cliente").value = element.email_cliente
      };
      function actualizar_cliente(){
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        var nom_cliente  = document.getElementById('txt_nom_cliente').value;
        var rut_cliente     = document.getElementById("txt_rut_cliente").value; 
        var email_cliente    = document.getElementById("txt_email_cliente").value;
        let error = '';
        if(nom_cliente.trim() == ''|| rut_cliente.trim() == '' || email_cliente.trim() == '')
          error = 'Favor no ingresar datos VACIOS'
        if(error !=''){
          alert(error)
           return false
                
            } 
        var raw = JSON.stringify({
          "nom_cliente": nom_cliente,
          "rut_cliente": rut_cliente,
          "email_cliente": email_cliente,
        });
        var requestOptions = {
          method: 'PATCH',
          headers: myHeaders,
          body: raw,
          redirect: 'follow'                                    
        };
        fetch('http://164.90.186.2:1711/api/cliente/'+g_id_cliente, requestOptions)
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
      function obtenerIdCliente(){
        var queryString = window.location.search;
        var urlParams = new URLSearchParams(queryString);
        var p_id_cliente = urlParams.get("id_cliente");
        g_id_cliente = p_id_cliente
        obtener_datos_cliente(p_id_cliente)
      }
      
      function obtener_datos_cliente(p_id_cliente){
        var requestOptions = {
          method: 'GET',
          redirect: 'follow'
        };
        
        fetch('http://164.90.186.2:1711/api/cliente/'+p_id_cliente, requestOptions)
          .then((response) => response.json())
          .then((json) => json.forEach(mostrarDatosCliente)
          )
      
          .then(result => console.log(result))
          .catch(error => console.log('error', error));
      }    