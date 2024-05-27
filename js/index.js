

var abrircrearevento=document.getElementById("abrircrearnuevoevento");
var modalcrear=document.getElementById("modalcrear")
var enviarcrear=document.getElementById("enviarcrear")
abrircrearevento.addEventListener("click",()=>{
    modalcrear.showModal();
})

var fechas_actual= Date.now();
var delta_fechas=new Date(fechas_actual)
var seleccionanterior=delta_fechas.getDate();
var lugar="ninguno";
var seleccionar_anterior_year=mes_a_numero();
var lectura=""
var idactualizar=1;
function cerrarmodalcrear() {
    var hora=document.getElementById("hora").value
    var descripcion=document.getElementById("descripcion")
    var nombres_participantes=document.getElementById("nombres_participantes")
    var minutos=document.getElementById("minutos").value
    var lleno=true;
    if (descripcion.value==""||nombres_participantes.value=="") {
         lleno=false
        alert("llene los espacios en vacios")
    }else{
        modalcrear.close();
        
        delta_fechas.setMinutes(minutos)
        delta_fechas.setHours(hora)
        
        crear()
        read()
        descripcion.value=""
        nombres_participantes.value=""
    }


    
    
    

    
}
function crear() {
    var eventosparse = JSON.parse(localStorage.getItem("eventos") || "[]"); 
    var descripcion=document.getElementById("descripcion").value
    var nombres_participantes=document.getElementById("nombres_participantes").value
    var year=delta_fechas.getFullYear();
    var mes=delta_fechas.getMonth();
    var dia=delta_fechas.getDate();
    var hora=delta_fechas.getHours();
    var minutes=delta_fechas.getMinutes();
    var subireventos= new Evento(year,mes,dia,hora,minutes,descripcion,nombres_participantes);
    eventosparse.push(subireventos)
    localStorage.setItem("eventos",JSON.stringify(eventosparse))
}
function colocarampm(hora) {
    var ampm;
    if (hora>12) {
        ampm="pm"
    }else{
        ampm="am"
    }
    return ampm;
}
function colocarhora(hora) {
    var valor=hora;
    if (hora>12) {
        valor=hora-12
    }

    return valor;
}
function borrar(id) {
    var listaeventos=JSON.parse(localStorage.getItem("eventos") || "[]"); 

   for (let i = 0; i < listaeventos.length; i++) {
        
        if ( i== id) {
            listaeventos.splice(i,2)
            break
        }

    }
    localStorage.setItem("eventos", JSON.stringify(listaeventos))
    read();
    if (lugar=="dia") {
        console.log("hola entre a dia")
        limpiar()
        dias()
    }
 
}
function cerrarmodalactualizar() {
    var modal=document.getElementById("modalactualizar")
    var horaa=document.getElementById("horaa").value
    var descripcion=document.getElementById("descripciona")
    var nombres_participantes=document.getElementById("nombres_participantesa")
    var minutosa=document.getElementById("minutosa").value
    var lleno=true;
    if (descripcion.value==""||nombres_participantes.value=="") {
         lleno=false
        alert("llene los espacios en vacios")
    }else{
        modal.close();
        
        delta_fechas.setMinutes(minutosa)
        delta_fechas.setHours(horaa)
        
        actualizacion()
        read()
        descripciona.value=""
        nombres_participantesa.value=""

    }
    if (lugar=="dia") {
        limpiar()
        dias()
    }
}
function actualizacion() {
    var horaa=document.getElementById("horaa")
    var descripcion=document.getElementById("descripciona")
    var nombres_participantes=document.getElementById("nombres_participantesa")
    var minutosa=document.getElementById("minutosa")
    var listaeventos=JSON.parse(localStorage.getItem("eventos")||"[]")
    
    for (let index = 0; index < listaeventos.length; index++) {

        listaeventos[idactualizar].hora=horaa.value
        listaeventos[idactualizar].descripcion=descripcion.value
        listaeventos[idactualizar].minutos=minutosa.value
        listaeventos[idactualizar].nombres_participantes=nombres_participantes.value
        
    }
    localStorage.setItem("eventos",JSON.stringify(listaeventos))

}
function actualizar(id) {
    var modal=document.getElementById("modalactualizar")
 
    var listaeventos=JSON.parse(localStorage.getItem("eventos")||"[]")
    var horaa=document.getElementById("horaa")
    var descripcion=document.getElementById("descripciona")
    var nombres_participantes=document.getElementById("nombres_participantesa")
    var minutosa=document.getElementById("minutosa")
    idactualizar=parseInt(id,10)
    for (let index = 0; index < listaeventos.length; index++) {
        console.log(idactualizar+"actualizar")
        console.log(index)
        if (idactualizar==index) {
            console.log("uwu")
            horaa.value=listaeventos[index].hora
            descripcion.value=listaeventos[index].descripcion
            nombres_participantes.value=listaeventos[index].nombre_participantes
            minutosa.value=listaeventos[index].minutos
        }
    }
    modal.showModal();
    


    
}
function read() {
    var listaeventos=JSON.parse(localStorage.getItem("eventos")||"[]");

    var eventos_del_dia=document.getElementById("eventos_del_dia")
    
    var contenedor_eventos=document.getElementById("contenedor_eventos")
    eventos_del_dia.removeChild(contenedor_eventos)
        
    var id=0;
    var contenedor_eventos=document.createElement("div")
    contenedor_eventos.setAttribute("id","contenedor_eventos")
    for (let index = 0; index < listaeventos.length; index++) {
        if (delta_fechas.getFullYear()==listaeventos[index].year && delta_fechas.getDate()==listaeventos[index].dia&&delta_fechas.getMonth()==listaeventos[index].mes) {
            var evento=document.createElement("div")
            var color1= Math.floor(Math.random() * 252)+100
            var color2=Math.floor(Math.random() * 252)+100
            var color3=Math.floor(Math.random() * 252)+100
            evento.setAttribute("style","background-color:rgb("+color1+","+color2+","+color3+");")
            var texto=colocarhora(listaeventos[index].hora)+":"+listaeventos[index].minutos+colocarampm(listaeventos[index].hora)+"  "+listaeventos[index].descripcion+"  "+listaeventos[index].nombre_participantes
            id=index;
            
            
            var borrador=document.createElement("button")
            borrador.setAttribute("id",id)
            borrador.setAttribute("onclick","borrar(getAttribute('id'))")
            borrador.appendChild(document.createTextNode("borrador"))
            var actualizar=document.createElement("button")
            actualizar.setAttribute("id",id)
            actualizar.setAttribute("onclick","actualizar(getAttribute('id'))")
            
            actualizar.appendChild(document.createTextNode("actualizar"))

            
            evento.appendChild(document.createTextNode(texto))
            evento.appendChild(borrador)
            evento.appendChild(actualizar)
            contenedor_eventos.appendChild(evento)
        }
        
    }
    eventos_del_dia.appendChild(contenedor_eventos)
    lectura="read";
    if (lugar=="dia") {
        limpiar()
        dias()
    }
}
function hallar_primer_dia(fecha) {
    let nuevafecha=new Date(fecha)
    var primer_dia=nuevafecha.getDay();
        for (var i = nuevafecha.getDate()-1; i > 0; i--) {
            
            if (primer_dia==0) {
                primer_dia=6;
            }else{
               primer_dia--; 
            }
            
        }
        return primer_dia
}
function ultimo_dia(fecha) {
    var acomulador_dias=new Date(fecha)
    for (let index = 1; index < 33; index++) {
        acomulador_dias.setDate(index)
        if (!(acomulador_dias.getMonth()==fecha.getMonth())) {
            acomulador_dias.setDate(acomulador_dias.getDate()-1)
            break;
        }
    }
    return acomulador_dias.getDate();
}
function nombre_mes(mes) {
    var nombre;
    switch (mes) {
        case 0:
            nombre="Enero"
        break;
            
        case 1:
            nombre="Febrero"
        break;

        case 2:
            nombre="Marzo"
        break;

        case 3:
            nombre="Abril"
        break;
                        
        case 4:
            nombre="Mayo"
        break;

        case 5:
            nombre="Junio"
        break;

        case 6:
            nombre="Julio"
        break;

        case 7:
            nombre="Agosto"
        break;

        case 8:
            nombre="Septiembre"
        break;

        case 9:
            nombre="Octubre"
        break;

        case 10:
            nombre="Noviembre"
        break;

        case 11:
            nombre="Diciembre"
        break;
    
        default:
            break;
    }

    return nombre
}
function limpiar() {
    
    
    var visualizaciión_eleccion=document.getElementById("visualizaciión_eleccion")
    var nose=document.getElementById(lugar)
    visualizaciión_eleccion.removeChild(nose)
    
    
    

}
function seleccionmes() {
    limpiar();
    seleccionanterior=delta_fechas.getDate();
    lugar="mes"
    delta_fechas=new Date(fechas_actual);
    hallarmes();
    seleccionar_dia_hoy();
    cambioeventos();
     
}

function hallarmes() {
    
    var visualizaciión_eleccion=document.getElementById("visualizaciión_eleccion")
    var contenedormes=document.createElement("div")
        
        contenedormes.setAttribute("class","mes")
        contenedormes.setAttribute("id","mes")

            var contenedor_nombre_mes=document.createElement("div")
            contenedor_nombre_mes.setAttribute("class","mes_dia")

                var messeleccionado=document.createElement("div")
                messeleccionado.setAttribute("class","nombremes")

                    var menosmes=document.createElement("button")
                    menosmes.appendChild(document.createTextNode("<"))
                    menosmes.setAttribute("onclick","menormes()")

                    var mayormes=document.createElement("button")
                    mayormes.appendChild(document.createTextNode(">"))
                    mayormes.setAttribute("onclick","mayormes()")
                
                messeleccionado.appendChild(menosmes)
                messeleccionado.appendChild(document.createTextNode(nombre_mes(delta_fechas.getMonth())+" de "+delta_fechas.getFullYear()))
                messeleccionado.appendChild(mayormes)

                var dias=document.createElement("div")
                dias.setAttribute("class","dias")

                    var domingo=document.createElement("div")
                    domingo.appendChild(document.createTextNode("domingo"))

                    var lunes=document.createElement("div")
                    lunes.appendChild(document.createTextNode("lunes"))

                    var martes=document.createElement("div")
                    martes.appendChild(document.createTextNode("martes"))

                    var miercoles=document.createElement("div")
                    miercoles.appendChild(document.createTextNode("miercoles"))

                    var jueves=document.createElement("div")
                    jueves.appendChild(document.createTextNode("jueves"))

                    var viernes=document.createElement("div")
                    viernes.appendChild(document.createTextNode("viernes"))

                    var sabado=document.createElement("div")
                    sabado.appendChild(document.createTextNode("sabado"))
                
                dias.appendChild(domingo)
                dias.appendChild(lunes)
                dias.appendChild(martes)
                dias.appendChild(miercoles)
                dias.appendChild(jueves)
                dias.appendChild(viernes)
                dias.appendChild(sabado)

            contenedor_nombre_mes.appendChild(messeleccionado)
            contenedor_nombre_mes.appendChild(dias)

            var dias_del_mes=document.createElement("div")
            dias_del_mes.setAttribute("class","dias_del_mes")
            var inicio=false;
            var diaescogido=1;
            for (let index = 0; index < 42; index++) {
                var cuadrodia=document.createElement("div")
                if (inicio || hallar_primer_dia(delta_fechas)==index) {
                   if (ultimo_dia(delta_fechas)+hallar_primer_dia(delta_fechas)>index) {
                       var contenedorp=document.createElement("p")
                       contenedorp.setAttribute("id","p"+diaescogido)
                        contenedorp.appendChild(document.createTextNode(diaescogido))
                        cuadrodia.appendChild(contenedorp)
                        cuadrodia.setAttribute("id",""+diaescogido)
                     cuadrodia.setAttribute("onclick","seleccion_dia(getAttribute('id'))")
                        diaescogido++     
                    }
                    inicio=true;
                }
                
                dias_del_mes.appendChild(cuadrodia)
         }
        contenedormes.appendChild(contenedor_nombre_mes)
        contenedormes.appendChild(dias_del_mes)
    visualizaciión_eleccion.appendChild(contenedormes)
                       lugar="mes"
}

function menormes() {
    delta_fechas.setMonth(delta_fechas.getMonth()-1)
    limpiar();
    hallarmes();
    seleccionar_dia_hoy();
    cambioeventos();
    seleccion_dia(1);
}
function mayormes() {
    delta_fechas.setMonth(delta_fechas.getMonth()+1)
    limpiar();
    hallarmes();
    seleccionar_dia_hoy();
    cambioeventos(delta_fechas);
    seleccion_dia(1);
}
function seleccion_dia(id) {
    if (!(id=="escogido")) {
        var ss=document.getElementById("escogido")
ss.removeAttribute("id")
ss.setAttribute("id",seleccionanterior)
var escogido=document.getElementById(id)
escogido.setAttribute("id","escogido")
seleccionanterior=id
delta_fechas.setDate(id)
cambioeventos();

    }


}
function seleccion_dia_year(id) {
    if (!(id=="escogido")) {
        var ss=document.getElementById("escogido")
ss.removeAttribute("id")
ss.setAttribute("id",seleccionar_anterior_year)
var escogido=document.getElementById(id)
escogido.setAttribute("id","escogido")
seleccionar_anterior_year=id
delta_fechas.setMonth(0)
delta_fechas.setDate(id)
cambioeventos();

    }


}
function mes_a_numero() {
    var acomulador_dias=new Date(delta_fechas)
    var acomulador=0;
    for (let index = 1; index < 1000; index++) {
        acomulador_dias.setMonth(0)
        acomulador_dias.setDate(index)
        if (((acomulador_dias.getDate()==delta_fechas.getDate())&&(acomulador_dias.getMonth()==delta_fechas.getMonth()))) {
            acomulador=index;
            break;
        }
    }
    return acomulador;

    
}
function findyear() {
    limpiar();
    lugar="year";
    seleccionar_anterior_year=mes_a_numero();
    year();
    escogido_year();
    delta_fechas=new Date(fechas_actual);
    cambioeventos()
}

function escogido_year(){
    var escogido=document.getElementById(seleccionar_anterior_year)
    escogido.setAttribute("id","escogido")
}
function restyear() {
    delta_fechas.setFullYear(delta_fechas.getFullYear()-1)
    limpiar();
    seleccionar_anterior_year=1;
    year();
    delta_fechas.setDate(1)
    delta_fechas.setMonth(0)
    escogido_year();
    cambioeventos()
}
function plusyear() {
    delta_fechas.setFullYear(delta_fechas.getFullYear()+1)
    limpiar();
    seleccionar_anterior_year=1;
    year();
    delta_fechas.setDate(1)
    delta_fechas.setMonth(0)
    escogido_year();
    cambioeventos()
}
function year() {

    var acomulado=1;
    var visualizaciión_eleccion=document.getElementById("visualizaciión_eleccion")

        var year=document.createElement("div")
        year.setAttribute("class","year")
        year.setAttribute("id","year")
        
            var year_name=document.createElement("div")

                var yearminus=document.createElement("button")
                yearminus.appendChild(document.createTextNode("<"))
                yearminus.setAttribute("onclick","restyear()")

                var yearplus=document.createElement("button")
                yearplus.appendChild(document.createTextNode(">"))
                yearplus.setAttribute("onclick","plusyear()")

                year_name.appendChild(yearminus)
                year_name.appendChild(document.createTextNode(delta_fechas.getFullYear()))
                year_name.appendChild(yearplus)

            var year_mont=document.createElement("div")
            year_mont.setAttribute("class","year_mont")
        for (let mes = 0; mes < 12; mes++) {
            delta_fechas.setMonth(mes)

            var contenedormes=document.createElement("div")
            contenedormes.setAttribute("class","contenedormes")

                var nombresmeses=document.createElement("div")
                nombresmeses.appendChild(document.createTextNode(nombre_mes(delta_fechas.getMonth())))
                nombresmeses.setAttribute("class","nombresmeses")

                var nombresemanal=document.createElement("div")
                nombresemanal.setAttribute("class","nombresemanal")

                    var d=document.createElement("div")
                    d.appendChild(document.createTextNode("d"))

                    var l=document.createElement("div")
                    l.appendChild(document.createTextNode("l"))

                    var m=document.createElement("div")
                    m.appendChild(document.createTextNode("m"))
                    
                    var m1=document.createElement("div")
                    m1.appendChild(document.createTextNode("m"))

                    var j=document.createElement("div")
                    j.appendChild(document.createTextNode("j"))

                    var v=document.createElement("div")
                    v.appendChild(document.createTextNode("v"))

                    var s=document.createElement("div")
                    s.appendChild(document.createTextNode("s"))

                nombresemanal.appendChild(d)
                nombresemanal.appendChild(l)
                nombresemanal.appendChild(m)
                nombresemanal.appendChild(m1)
                nombresemanal.appendChild(j)
                nombresemanal.appendChild(v)
                nombresemanal.appendChild(s)

                
                var month_year=document.createElement("div")
                month_year.setAttribute("class","month_year")
                var inicio=false;
                var diaescogido=1;
                for (let index = 0; index < 42; index++) {

                    var cuadrodia=document.createElement("div")
                    if (inicio || hallar_primer_dia(delta_fechas)==index) {
    
                        if (ultimo_dia(delta_fechas)+hallar_primer_dia(delta_fechas)>index) {
                            var contenedorp=document.createElement("p")
                            contenedorp.appendChild(document.createTextNode(diaescogido))
                            cuadrodia.appendChild(contenedorp)
                            cuadrodia.setAttribute("id",acomulado)
                            cuadrodia.setAttribute("onclick","seleccion_dia_year(getAttribute('id'))")
                            diaescogido++
                            acomulado++     
                        }
                        inicio=true;
                    }
                    
                    month_year.appendChild(cuadrodia)
                }


            contenedormes.appendChild(nombresmeses)
            contenedormes.appendChild(nombresemanal)
            contenedormes.appendChild(month_year)
            year_mont.appendChild(contenedormes)
            
        }
        year.appendChild(year_name)
        year.appendChild(year_mont)

    visualizaciión_eleccion.appendChild(year)
}

function seleccionar_dia_hoy() {
    var seleccionador=new Date(fechas_actual);
    var dia_seleccionado= document.getElementById(seleccionador.getDate())
    dia_seleccionado.setAttribute("id","escogido")
}
function cambioeventos() {
    document.querySelector("#fecha_evento").innerHTML=delta_fechas.toDateString()+""
    document.querySelector("#contenedor_eventos").innerHTML="tengo los eventos del dia"+delta_fechas.getDate()
    read()

}
function iniciar() {   
    hallarmes();
    lugar="mes"
    seleccionar_dia_hoy();
    cambioeventos();
    seleccionanterior=delta_fechas.getDate();
     //hallar_primer_dia(fechas.getDay())
}
function hallardias() {
    limpiar();
    
    delta_fechas=new Date(fechas_actual)
    dias()
    cambioeventos();
    lugar="dia"
}
function colocareventosdia() {
    
    for (let index = 0; index < 1440; index+=30) {
        var contenedoreventos=document.getElementById(index)
    
    }
}
function retrodia() {
    limpiar();
    delta_fechas.setDate(delta_fechas.getDate()-1)
    dias()
    cambioeventos();
}
function avandia() {
    limpiar();
    delta_fechas.setDate(delta_fechas.getDate()+1)
    dias()
    cambioeventos();
}
function dias() {
    var a=30
    var  visualizaciión_eleccion=document.getElementById("visualizaciión_eleccion")

        var dias=document.createElement("div")
        dias.setAttribute("class","dia")
        dias.setAttribute("id","dia")
        
        var dia_numero=document.createElement("div")
            var retrodia=document.createElement("button")
            retrodia.appendChild(document.createTextNode("<"))
            retrodia.setAttribute("onclick","retrodia()")
            var avandia=document.createElement("button")
            avandia.appendChild(document.createTextNode(">"))
            avandia.setAttribute("onclick","avandia()")


            dia_numero.appendChild(retrodia)
            dia_numero.appendChild(document.createTextNode(delta_fechas.getDate()))
            dia_numero.appendChild(avandia)


        var contenedor_dias=document.createElement("div")
        contenedor_dias.setAttribute("class","contenedor_dias")
        var contador=1;
        for (let index = 0; index < 1440; index+=30) {
            contador++;
            delta_fechas.setHours(0)
            delta_fechas.setMinutes(index)
            
                var hora=document.createElement("div")
                if (delta_fechas.getHours>12) {
                    delta_fechas.setHours(delta_fechas.getHours-12)
                    hora.appendChild(document.createTextNode(delta_fechas.getHours()))
                    hora.appendChild(document.createTextNode(":"))
                hora.appendChild(document.createTextNode(delta_fechas.getMinutes()+"pm"))
                delta_fechas.setHours(delta_fechas.getHours+12)
                }else{
                    hora.appendChild(document.createTextNode(delta_fechas.getHours()))
                    hora.appendChild(document.createTextNode(":"))
                hora.appendChild(document.createTextNode(delta_fechas.getMinutes()+"am"))
                }
                
                var contenedoreventos=document.createElement("div")
                contenedoreventos.setAttribute("id","contenedoreventos")
                var acomulador=1;
                var listaeventos=JSON.parse(localStorage.getItem("eventos"||"[]"))
                if (listaeventos.length==0) {
                    
                }else{
                for (let index = 0; index < listaeventos.length; index++) {
                    if (listaeventos[index].year==delta_fechas.getFullYear()
                        &&listaeventos[index].mes==delta_fechas.getMonth()
                    &&listaeventos[index].dia==delta_fechas.getDate()
                    &&listaeventos[index].hora==delta_fechas.getHours()
                    &&listaeventos[index].minutos==delta_fechas.getMinutes()) {
                        acomulador++;
                        var eventodia=document.createElement("div")
                        var texto="descripción:"+listaeventos[index].descripcion
                        eventodia.appendChild(document.createTextNode(texto))
                        eventodia.appendChild(document.createTextNode("nombres participantes:"+listaeventos[index].nombre_participantes))
                        contenedoreventos.setAttribute("style","height:"+a*acomulador+"px;")
                        eventodia.setAttribute("id","eventodia")
                        contenedoreventos.appendChild(eventodia)
                        
                    }
                    
                }}
                hora.appendChild(contenedoreventos)




            contenedor_dias.appendChild(hora)



        }

        dias.appendChild(dia_numero)
        dias.appendChild(contenedor_dias)
    visualizaciión_eleccion.appendChild(dias)
}
