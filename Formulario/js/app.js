//Se ejecuta una vez ya se haya descargado el documento HTML
document.addEventListener('DOMContentLoaded',function(){
    //Objeto vacio, para despues llenralo con el formulario
    const email = {
        email:'',
        asunto:'',
        mensaje:''
    }
    //Seleccionar los elementos de la interfaz
    const inputEmail = document.querySelector('#email');
    const inputCC = document.querySelector('#cc');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const formulario = document.querySelector('#formulario');
    const btnSubmit = document.querySelector('#formulario button[type="submit"]');
    const btnReset = document.querySelector('#formulario button[type="reset"]');
    const spinner = document.querySelector('#spinner');

    //Asiganar eventos 
    inputEmail.addEventListener('input', validar);
    inputCC.addEventListener('input', validar);
    inputAsunto.addEventListener('input', validar);
    inputMensaje.addEventListener('input', validar);
    formulario.addEventListener('submit', enviarEmail);
    btnReset.addEventListener('click',function(evt){
        evt.preventDefault();
        //LLamado de la funcion de resetear el formulario
        resetFormulario();
    })

    //Funcion del Spinner
    function enviarEmail(evt){
        //Previene eventos por default "Saltos"
        evt.preventDefault() 
            spinner.classList.add('grid');
            spinner.classList.remove('hidden');
        setTimeout(() => {  //Tiempo de espera para quitar el spinner
            spinner.classList.remove('grid');
            spinner.classList.add('hidden');
            //LLamado de la funcio de sesetear el formulario
            resetFormulario();
            //Alerta de éxito
            envioExito();
        }, 3000);
    }
    function envioExito(){
        const alertaExito = document.createElement('P');
        alertaExito.classList.add('bg-green-500', 'text-white', 'uppercase', 
                                    'p-2', 'text-center', 'font-semibold', 'rounded-xl','shadow-xl');
        alertaExito.textContent = 'Mensaje Enviado con exito.';
        formulario.appendChild(alertaExito);
        setTimeout(() => {
            alertaExito.remove()
        }, 3000);
}
    //Funcion que valida cada uno de los inputs y evitar código repetido
    function validar(evt){   
        console.log(evt.target.value)
        //Primer Validación en donde ningun campo este vacio
        //Agregando un AND en donde el "evt.target.id sea diferente de 'cc'
        if((evt.target.value.trim() === '') && (evt.target.id !== 'cc')){
             //Llamado de la funcion con dos parametros - "mensaje", "referencia"
            mostrarAlerta(`El campo ${evt.target.id} esta vacío.`, evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return; //Detiene la ejecucion del codigo
        }
        //Segunda Validación - correo valido
        if(evt.target.type === 'email' && !validaEmail(evt.target.value) && evt.target.value !== '') {
            //Llamado de la funcion con dos parametros - "mensaje", "referencia"
            mostrarAlerta('El correo no es valido.', evt.target.parentElement);
            email[evt.target.name] = '';
            comprobarEmail();
            return;
        }
        //Tercer validación 'destinatario'
        if(evt.target.id === 'cc' && (evt.target.value === '')) {
            // console.log('Desde funcion')
            limpiarAlerta(evt.target.parentElement);
            delete(email.cc);
            comprobarEmail();
            return;
        }
        //Funcion con argumento
        limpiarAlerta(evt.target.parentElement);
        //Se agregan los valores al objeto eliminado espacios con trim y convitiendolos a minusculas con toLowerCase
        email[evt.target.name] = evt.target.value.trim().toLowerCase();
        comprobarEmail();
    }

    function mostrarAlerta(mensaje, referencia){
        //Compureba si ya existe una alerta
        limpiarAlerta(referencia);
        //Generar una alerta en HTML
        const error = document.createElement('P');
        error.textContent = mensaje;
        error.classList.add('bg-red-600','p-2','text-white','uppercase','font-semibold',
                            'text-center','shadow-2xl','rounded-lg','md:text-base','text-sm','alerta');
        //Inyectar el error en el formulario
        referencia.appendChild(error);
    }
    //Limpiar Alerta
    function limpiarAlerta(referencia){
        const alerta = referencia.querySelector('.alerta');
        alerta?.remove();
    }
    //Funcion que valida una función
    function validaEmail(email){
        //Expresión Regular
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
        
    }
    //Funcion que comprueba un email
    function comprobarEmail(){
        console.log(email)
        if(Object.values(email).includes('')){
            //Añade la clase de opacidad
            btnSubmit.classList.add('opacity-50');
            //Habilita el disabled
            btnSubmit.disabled = true;
            return;
        }
            //Elimina la clase de opacidad
            btnSubmit.classList.remove('opacity-50');
            //Desabilita el disabled
            btnSubmit.disabled = false;
    }

    function resetFormulario(){
        //Reset del Formulario
        //Elimina los elemetos dentro del objeto
        email.email = '';
        email.asunto = '';
        email.mensaje = '';
        delete(email.cc); //Eliminando un elemento del objeto
            formulario.reset(); //Reset del formulario
            comprobarEmail();
    }
})