var myApp=new Framework7({
animateNavBackIcon:true,
swipePanel: 'left', //Activamos la acción slide para el menú deslizando el dedo desde el lateral
});
var $$=Dom7;
var mainView=myApp.addView('.view-main',{dynamicNavbar:true,domCache:true});
//var mainView=myApp.addView('.view-main');
//Now we add our callback for initial page
myApp.onPageInit('index-1', function (page) {
  //Do something here with home page
bd_iniciar_inicio();
}).trigger(); //And trigger it right away
var hoy = new Date();
var dd = hoy.getDate();
if(dd<9){
	dd='0'+dd;
}
var mm = hoy.getMonth()+1; //hoy es 0!
if(mm<9){
	mm='0'+mm;
}
var yyyy = hoy.getFullYear();
//
var user_id = JSON.parse(localStorage.getItem('usuario_id'));


var version = '1.1.0';
localStorage.setItem('version',JSON.stringify(version));


function escribir_fecha(F){
	var fx=F.split('-');
	var Y=fx[0];
	var M=fx[1];
	var D=fx[2];
	//myApp.alert(Y+'-'+M+'-'+D+'**');
	M=parseInt(M);
	D=parseInt(D);
var meses = ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"];
var diasSemana = ["Domingo","Lunes","Martes","Miércoles","Jueves","Viernes","Sábado"];
var date = new Date(F.replace(/-+/g, '/'));
return diasSemana[date.getDay()] + ", " + D + " de " + meses[M-1] + " de " + Y;
}
 



function cargar_campana(ref){
//myApp.alert('uno:'+ref);
var actual=$$('#campana').val();
var actualB=actual.split('-');
var cp=Number(actualB[1]);
var yr=Number(actualB[0]);

	
if(ref==='prev'){
cp=cp-1;
if(cp===0){
	cp=13;
	yr=yr-1;
	if(yr>=2018){
$$('#year_actual').val(yr);	
	}
}
ref=yr+'-'+cp;	
}else if(ref==='next'){
cp=cp+1;
if(cp===14){
	cp=1;
	yr=yr+1;
	
	if(yr<=2019){
$$('#year_actual').val(yr);	
	}
}
ref=yr+'-'+cp;			
}else{
var actualC=ref.split('-');	
cp=Number(actualC[1]);
yr=Number(actualC[0]);
	
var yr_actual=$$('#year_actual').val();
//myApp.alert(yr+'!=='+yr_actual);
if(yr!==yr_actual){
$$('#year_actual').val(yr);	
}	
}
	
//myApp.alert(yr+'-'+cp+'B');
if(yr>=2018 && yr<=2019){
$$('.zona_campana').hide();
$$('#campana').val(ref);
$$('.C'+ref).show();
//myApp.alert(ref);		
}	
}



function cargar_fecha(fecha){
//myApp.alert(fecha);
	$$('#fecha_cargada').val(fecha);
	// buscamos a que campaña pertenece
var camp='';
var y=2017;
	while(y<2019){
		y++;
		
	var c=0;
		while(c<13){
			c++;
			var inicio=$$('#inicia_'+y+'-'+c).val();
			var fin=$$('#termina_'+y+'-'+c).val();
			//myApp.alert(y+'-'+c+':'+inicio+'/'+fin+'>'+fecha);
			if(fecha>=inicio && fecha<=fin){
				camp=y+'-'+c;
				cargar_campana(camp);
				/// marca la fecha
				$$('.mes td').removeClass('fecha_seleccionada');
				$$('#'+fecha).addClass('fecha_seleccionada');
				//
				var ftx='<div id="fecha_cargada_titulo">Revisando Agenda para:</div>';
				if(fecha===yyyy+'-'+mm+'-'+dd){
				ftx=ftx+'HOY';	
				}else{
				ftx=ftx+escribir_fecha(fecha);	
				}
				$$('#fecha_cargada_texto').html(ftx);
				//myApp.alert('campaña:'+camp);
				//// se cargan los registros hechos
				var h=5;
				while(h<19){
					h++;
					$$('.H'+h+' i .fa-tablet-alt').show();
				//myApp.alert(h);
				var ag=JSON.parse(localStorage.getItem('ID'+user_id+'Agenda'+fecha+'_'+h));
				var ag_id=JSON.parse(localStorage.getItem('ID'+user_id+'Agenda'+fecha+'_'+h+'id'));	
				
				if(ag===null ){
				ag='||||||';	
				}
				if(ag_id===null ){
				ag_id='||';	
				}
					
					
				//myApp.alert(h+'::'+ag);
				var agf = ag.split("|"); 
				var agf_id = ag_id.split("|");
					//
				var Mi=agf[0];
				var AS=agf[1];
				var CT=agf[2];	
				var LG=agf[3];	
				var NT=agf[4];
				var TL=agf[5];	
				var EM=agf[6];	
					
				//var SR=agf[5];
				//
				//myApp.alert(h+':'+NT);
				if((Mi!=='00' && Mi!=='') || AS!==''){
				$$('.H'+h+' .agenda_asuntos').show();
				}else{
				$$('.H'+h+' .agenda_asuntos').hide();	
				}
				if((Mi!=='00' && Mi!=='')){
				$$('.H'+h+' .hora').html(h+':'+Mi);
				$$('#Minutos'+h).val(Mi);	
				}else{
				$$('.H'+h+' .hora').html('');
				$$('#Minutos'+h).val('');	
				}
					//
				if(AS!==''){
					var ic=$$('#asunto_'+AS).val();
				$$('.H'+h+' .asunto_texto').html('<i class="fa fa-'+ic+'"></i> '+AS+' '+agf_id[0]);
					$$('#Asunto'+h).val(AS);
				}else{
				$$('.H'+h+' .asunto_texto').html('');
				$$('#Asunto'+h).val('');	
				}
					//
				if(CT!==''){
				$$('.H'+h+' .agenda_contacto').show();
				}else{
				$$('.H'+h+' .agenda_contacto').hide();
				}
				$$('.H'+h+' .contacto').html(CT);
				$$('#Contacto'+h).val(CT);		
					//
				//myApp.alert(h+'*'+TL+'*');
				if(TL!=='' && TL!==undefined){
				$$('.H'+h+' .agenda_telefono').show();
				}else{
				$$('.H'+h+' .agenda_telefono').hide();
				}
				$$('.H'+h+' .telefono').html(TL);
				$$('#Telefono'+h).val(TL);	
				//
				if(EM!=='' && EM!==undefined){
				$$('.H'+h+' .agenda_email').show();
				}else{
				$$('.H'+h+' .agenda_email').hide();
				}
				$$('.H'+h+' .email').html(EM);
				$$('#Email'+h).val(EM);
					//
				if(LG!==''){
				$$('.H'+h+' .agenda_lugar').show();
				}else{
				$$('.H'+h+' .agenda_lugar').hide();	
				}
				$$('.H'+h+' .lugar').html(LG);
				$$('#Lugar'+h).val(LG);	
					//
									
				$$('.H'+h+' .nota').html(NT);
				$$('#Nota'+h).val(NT);
				
					
				if(agf_id[0]>0 && agf_id[1]==='si'){
					
						$$('.H'+h+' .sincronizar').html('<i class="fa fa-cloud"></i>');
					}else{	
						$$('.H'+h+' .sincronizar').html('<i class="fa fa-tablet-alt"></i>');
					}
					
	
				}				
			
				//// fin de cargar registros
				
			}
		}
	}
 	
//sincronizar(fecha);
myApp.showTab('#view-2');	
}



//// AQUI
function marcar_calendario(fecha){
	var paquete_enviado='';
	var sincronizar_uno = JSON.parse(localStorage.getItem('sincronizar_uno'));
	var sincronizar_dos = JSON.parse(localStorage.getItem('sincronizar_dos'));
/// hacemos un recorrido por todas las notas guardadas
	if(fecha===''){
var fechaInicio = new Date('2019-12-31');
var fechaFin    = new Date('2018-01-01');
}else{
var fechaInicio = new Date(fecha);
var fechaFin    = new Date(fecha);	
}
	//
while(fechaInicio.getTime() >= fechaFin.getTime()){
fechaInicio.setDate(fechaInicio.getDate() - 1);
var YA=fechaInicio.getFullYear();
var MA=fechaInicio.getMonth() + 1;
var DA=fechaInicio.getDate();
	if(MA<10){
		MA='0'+MA;
	}
	if(DA<10){
		DA='0'+DA;
	}
	//
	var total_notas=0;
	var f=YA+ '-' + MA + '-' + DA;
	var h=5;
	while(h<19){
	h++;
	var name_nota='ID'+user_id+'Agenda'+f+'_'+h;
	var nota_existe=JSON.parse(localStorage.getItem(name_nota));
	//myApp.alert('ID'+user_id+'Agenda'+f+'_'+h+'::'+nota_existe);	
		if(nota_existe!==null && nota_existe!=='' && nota_existe!=='||||' && nota_existe!=='||||||'){
		total_notas++;
			if(total_notas===1){
				var sincronizar_dos = f;
			}
			
			var nt=nota_existe.split("|");
			//myApp.alert(nt[5]);
			/*
			//// se sincronizan solo los nuevos registros
			if(nt[5]>sincronizar_uno || nt[5]==='no'){
			paquete_enviado=paquete_enviado+'~'+user_id+'|'+f+'|'+h+'|'+nota_existe;
			}
			*/
			paquete_enviado=paquete_enviado+'~'+user_id+'|'+f+'|'+h+'|'+nota_existe;
		}
	}
if(total_notas!==0){
var fxx= f.split("-");
var dxx=parseInt(fxx[2]);
$$('#'+f).html('<div class="campana">'+dxx+'<span class="alerta">'+total_notas+'</span></div>');
	
}
	//
}
	
	//myApp.alert(paquete_enviado,'sincronizar enviado');
	if(navigator.onLine){
	/// revisar aqui el proceso
	$$.post('http://yanbal.agendamia.com/conecta.php',{sincronizar_todo:'si', usuario_id:user_id, paquete:paquete_enviado,sincronizar_uno:sincronizar_uno,sincronizar_dos:sincronizar_dos}, function(datax){
	//myApp.alert(datax,'sincronizar recibido');
		var nt=datax.split("~");
		if(nt[0]==='OK'){
			var n=0;
			while(n<1000){
				n++;
			var ntB=nt[n].split("|");
			var valor_final=ntB[3]+'|'+ntB[4]+'|'+ntB[5]+'|'+ntB[6]+'|'+ntB[7]+'|'+ntB[8]+'|'+ntB[9];
localStorage.setItem('ID'+user_id+'Agenda'+ntB[1]+'_'+ntB[2],JSON.stringify(valor_final));
				
			}
	
	}	
		
	});
	
	//
	}
	
}
/// FIN AQUI



function renovar(){
	myApp.showTab('#view-5');
}


function bd_iniciar_inicio(){
	
	/////******
//myApp.alert('303');
//comprobar_internet();
	/////******
var hoy = new Date();
var dd = hoy.getDate();
var now=(hoy.getTime())/1000;
if(dd<9){
	dd='0'+dd;
}
var mm = hoy.getMonth()+1; //hoy es 0!
if(mm<9){
	mm='0'+mm;
}
var yyyy = hoy.getFullYear();
	///****
$$('#year_actual').val(yyyy);
//var fecha_hoy=yyyy+'-'+mm+'-'+dd;	
	//myApp.alert('**');
//
var usuario_id = JSON.parse(localStorage.getItem('usuario_id'));
var usuario_email = JSON.parse(localStorage.getItem('usuario_email'));
var usuario_nombre = JSON.parse(localStorage.getItem('usuario_nombre'));
var usuario_vigencia = JSON.parse(localStorage.getItem('usuario_vigencia'));
var version = JSON.parse(localStorage.getItem('version'));
//var estado = JSON.parse(localStorage.getItem('estado'));
var sesion = JSON.parse(localStorage.getItem('sesion'));
//var link = JSON.parse(localStorage.getItem('link'));
var key = JSON.parse(localStorage.getItem('key'));
	//myApp.alert('++');
var enviar_agenda = JSON.parse(localStorage.getItem('enviar_agenda'));
//
	//myApp.alert('--');
	var sincronizar_uno = JSON.parse(localStorage.getItem('sincronizar_uno'));
	var sincronizar_dos = JSON.parse(localStorage.getItem('sincronizar_dos'));
	
	if(sincronizar_uno===null || sincronizar_uno===''){
	sincronizar_uno=0;
	sincronizar_dos=now;
	localStorage.setItem('sincronizar_uno',JSON.stringify(0));
	localStorage.setItem('sincronizar_dos',JSON.stringify(now));	
	}
	//
	var limite = new Date(usuario_vigencia);
	var dias=limite.getTime() - hoy.getTime();
	dias=dias/(24*60*60*1000);
	dias=parseInt(dias);
	//myApp.alert(usuario_vigencia+'>='+yyyy+'-'+mm+'-'+dd);
if(dias<0 && usuario_id!==null){
myApp.confirm('tu suscripción esta vencida, por favor Renuevala','Suscripción Vencida',function(){ renovar(); },'');
$$('.panel').css({'visibility':'hidden'});		
$$('.tabbar-labels').hide();
	return;
	
}else if(dias<=10 && dias>=0  && usuario_id!==null){// avisa si falta 10 dias para caducar
myApp.confirm('tu suscripción esta por vencer en '+dias+' días. Quieres Renovarla?','Renueva tu Suscripción',function(){ renovar(); },'');
$$('.panel').css({'visibility':'hidden'});		
$$('.tabbar-labels').hide();	
}
	//myApp.alert('s:'+sesion); 
	if(sesion==='on'){
		//myApp.dialog.preloader();
//myApp.alert('cargando...'+usuario_nombre+' - Version: '+version,'bienvenido'); 
$$('.identificacion').html(usuario_nombre+' (Vence: '+usuario_vigencia+')');
$$('.nombre_usuario').html(usuario_nombre);
$$('.email_usuario').html(usuario_email);		
$$('.fecha_vigencia').html(usuario_vigencia);
$$('.version_actual').html(version);
$$('#recordatorio').val(enviar_agenda);		
//myApp.alert(md5);
//$$('.nombre_usuario').html(key);		
$$('#renovar_ahora').attr('href','http://indexdream.com/pago.php?tipo=AY&id='+usuario_id+'&cod='+key);	
			
//$$('#zona_calendario').load('campanas2018.html');
$$.post('campanas.html', {}, function (data) {        
$$('#zona_calendario').html(data); 
cargar_fecha(yyyy+'-'+mm+'-'+dd);
	//
marcar_calendario('');		
	//sincronizar('');
    });
$$('.panel').css({'visibility':'visible'});
$$('.tabbar-labels').show();	
//$$('#boton-1').click();
myApp.showTab('#view-2');
	//
//myApp.alert('389');	
//sincronizar();
    }else{
//myApp.alert('ingrese por favor','error'); 
$$('.panel').css({'visibility':'hidden'});		
$$('.tabbar-labels').hide();
	//myApp.alert('395');	
	}
   //
	//myApp.alert('397');
}





function ejecutar(ref){
$$('#tipo_ingreso').val(ref);
	if(ref==='nuevo'){
$$('.confirmar').show();
$$('.nuevo').show();		
$$('.ingreso').show();		
$$('#submmit-register').val('Registrase');
$$('#email').attr('placeholder','Su email');		
	}
	if(ref==='recordar'){
$$('.confirmar').show();
$$('.nuevo').hide();		
$$('.ingreso').show();
$$('#submmit-register').val('Asignar Nueva Clave');
$$('#email').attr('placeholder','Email Registrado');
	}
	
	if(ref==='ingresar'){
$$('.confirmar').hide();
$$('.nuevo').hide();		
$$('.ingreso').show();
$$('#submmit-register').val('Ingresar');
$$('#email').attr('placeholder','Email Registrado');
	}
}


function db_ingresar() {
var nombre=$$('#nombre').val();	
var email=$$('#email').val();
var clave=$$('#clave').val();
var clave2=$$('#clave2').val();	
var tipo=$$('#tipo_ingreso').val();
var version = JSON.parse(localStorage.getItem('version'));
//var conexion = JSON.parse(localStorage.getItem('conexion'));	
//myApp.alert(tipo+'++V'+version);
	//myApp.alert('441'); 
	//
	if(tipo==='ingreso'){
	//myApp.alert('A'); 	
    if(email==='' || clave===''){
     myApp.alert('datos incompletos','error'); 
		return;
    }else{
			
	//myApp.alert('450');
		
		//if(conexion==='on'){
			if(navigator.onLine){
	//myApp.alert('454'); 			
	//
	//myApp.alert('validando','procesando');
	//myApp.alert('enviando','procesando');
	$$.post('http://yanbal.agendamia.com/conecta.php',{ingreso:tipo,email:email,clave:clave,version:version},function(data){
//	
	var respuesta = data.split("|");
	//myApp.alert('data:'+data); 	
	if(respuesta[0]==='OK'){		
    localStorage.setItem('email',JSON.stringify(email));
    localStorage.setItem('usuario_id',JSON.stringify(respuesta[1]));
	localStorage.setItem('usuario_nombre',JSON.stringify(respuesta[2]));
	localStorage.setItem('usuario_email',JSON.stringify(respuesta[3]));	
	localStorage.setItem('usuario_vigencia',JSON.stringify(respuesta[4]));
	
	localStorage.setItem('estado',JSON.stringify(respuesta[6]));
	localStorage.setItem('usuario_clave',JSON.stringify(clave));
	localStorage.setItem('sesion',JSON.stringify('on'));
	localStorage.setItem('link',JSON.stringify(respuesta[7]));	
	localStorage.setItem('key',JSON.stringify(respuesta[8]));
	localStorage.setItem('enviar_agenda',JSON.stringify(respuesta[9]));	
		//
		bd_iniciar_inicio();
		/// si hay una nueva version se da aviso
		if(version!==respuesta[5]){
			myApp('Hay una Nueva versión Disponible. Descargala desde el botón "Actualizar App"','Nueva Versión');
			
		}
		
	
	}else{
		myApp.alert(respuesta[1],respuesta[0]); 
	}
		});
		}else{
		//myApp.alert('Sin Internet');	
			// conexion off
		var mi_email = JSON.parse(localStorage.getItem('usuario_email'));
		var mi_clave = JSON.parse(localStorage.getItem('usuario_clave'));
		//// si estan vacias se indica que se necesita conexion a internet
		if(mi_email!==null || mi_clave!==null){
		myApp.alert('Por favor revise su conexión a internet', 'problema');	
		}else if(email!==mi_email || clave!==mi_clave){
		myApp.alert('Error en su clave o email','error');		
		}else if(email===mi_email || clave===mi_clave){
		localStorage.setItem('sesion',JSON.stringify('on'));
		//
		
			bd_iniciar_inicio();
			
		}
			//myApp.alert('504'); 
		}
		
    }
	}else if(tipo==='nuevo'){
		if(navigator.onLine){
			
		}else {		
			//if(conexion==='off'){
			myApp.alert('Por favor revise su conexión a internet','error en conexión');
			return;
		}
	//myApp.alert(clave+'='+clave2+'**');	
    if(email==='' || clave==='' || clave2==='' || nombre===''){
     myApp.alert('datos incompletos','error'); 
		return;
    }
	
		if(clave!==clave2){
     myApp.alert('las claves no coinciden','error'); 
		return;
    }
		
		
	$$.post('http://yanbal.agendamia.com/conecta.php',{ingreso:tipo,email:email,clave:clave,nombre:nombre},function(data){
//	
	var respuesta = data.split("|");
	if(respuesta[0]==='OK'){		
     myApp.alert(respuesta[1],'Registro Realizado');
	$$('#boton_ingresar').click();
	$$('#clave').val('');
	$$('#clave2').val('');	
	}else{
		myApp.alert(respuesta[1],respuesta[0]); 
	}
		});
    
	}else if(tipo==='recordar'){
		
		if(navigator.onLine){
			
		}else{
		//if(conexion==='off'){
			myApp.alert('Por favor revise su conexión a internet','error en conexión');
			return;
		}
		
    if(email==='' || clave==='' || clave2===''){
     myApp.alert('datos incompletos','error'); 
		return;
    }else if(clave!==clave2){
     myApp.alert('las claves no coinciden','error'); 
		return;
    }else{
	$$.post('http://yanbal.agendamia.com/conecta.php',{ingreso:tipo,email:email,clave:clave},function(data){
//	
	var respuesta = data.split("|");
	if(respuesta[0]==='OK'){		
     myApp.alert(respuesta[1],'importante');	

	}else{
		myApp.alert(respuesta[1],respuesta[0]); 
	}
		});
    }
	}


}





function editar(hora){
	
	var ap='am';
	var hmostrar=Number(hora);
	if(hmostrar>11){
		ap='pm';
	}
	if(hmostrar>12){
		hmostrar=hmostrar-12;
	}
	$$('#editando').val(hora);
	
	var minutos_actual=$$('#Minutos'+hora).val();
	var asunto_actual=$$('#Asunto'+hora).val();
	var contacto_actual=$$('#Contacto'+hora).val();
	var lugar_actual=$$('#Lugar'+hora).val();
	var nota_actual=$$('#Nota'+hora).val();
	var telefono_actual=$$('#Telefono'+hora).val();
	var email_actual=$$('#Email'+hora).val();
	
	//
	$$.post('editar_agenda.html', {}, function (data) {        
	myApp.alert(data,'',function(){
	guardar_agenda_todo();
	});	/// se crea un html para el formulario de edicion de las notas y asi poder cargar los listados de contactos y lugares
	$$('.editar_hora').html(hmostrar+' '+ap);
	$$('#minutos_base').val(minutos_actual);
	$$('#asunto_base').val(asunto_actual);	
	$$('#contacto_base').val(contacto_actual);	
	$$('#lugar_base').val(lugar_actual);	
	$$('.zona_nota').val(nota_actual);
	
	$$('#telefono_base').val(telefono_actual);	
	$$('#email_base').val(email_actual);
		ejecutar('telefono');
		ejecutar('email');
    });

}






function guardar_agenda(tipo,valor){
//myApp.alert(tipo+'/'+valor);
var campo=$$('#editando').val();	
if(tipo==='texto'){

$$('#Nota'+campo).val(valor);
	
	$$('.H'+campo+' .nota').html(valor);	
	
}
	
if(tipo==='asunto'){
var icono=$$('#asunto_'+valor).val();
//myApp.alert(icono);
$$('.H'+campo+' .agenda_asuntos i').hide();

	if(valor!==''){
	$$('.H'+campo+' .agenda_asuntos .'+valor).show();	
	$$('.H'+campo+' .agenda_asuntos .asunto_texto').html('<i class="fa '+icono+'"></i> '+valor);	
	}else{
	$$('.H'+campo+' .agenda_asuntos .asunto_texto').html('');	
	}
	
$$('#Asunto'+campo).val(valor);	
}
if(tipo==='minutos'){
var hm=campo;
	if(campo>12){
		hm=campo-12;
	}
	if(valor!=='' && valor!=='00'){
$$('.H'+campo+' .agenda_asuntos .hora').html(hm+':'+valor);	
	}
$$('#Minutos'+campo).val(valor);	
}

	if(tipo==='contacto'){
$$('.H'+campo+' .agenda_contacto .contacto').html(valor);
$$('#Contacto'+campo).val(valor);
		if(valor!==''){
$$('.H'+campo+' .agenda_contacto').show();	
		}else{
	$$('.H'+campo+' .agenda_contacto').hide();		
		}		
}

	
		if(tipo==='telefono'){
$$('.H'+campo+' .agenda_telefono .telefono').html(valor);
$$('#Telefono'+campo).val(valor);
		if(valor!==''){
$$('.H'+campo+' .agenda_telefono').show();	
		}else{
	$$('.H'+campo+' .agenda_telefono').hide();		
		}		
}
	
		if(tipo==='email'){
$$('.H'+campo+' .agenda_email .email').html(valor);
$$('#Email'+campo).val(valor);
		if(valor!==''){
$$('.H'+campo+' .agenda_email').show();	
		}else{
	$$('.H'+campo+' .agenda_email').hide();		
		}		
}
	
	if(tipo==='lugar'){
$$('.H'+campo+' .agenda_lugar .lugar').html(valor);
$$('#Lugar'+campo).val(valor);
		if(valor!==''){
$$('.H'+campo+' .agenda_lugar').show();	
		}else{
	$$('.H'+campo+' .agenda_lugar').hide();		
		}		
}

	
	if($$('#Asunto'+campo).val()!==''){
$$('.H'+campo+' .agenda_asuntos').show();	
	}else{
$$('.H'+campo+' .agenda_asuntos').hide();		
	}
	/// guardamos localmente 
	var fc=$$('#fecha_cargada').val();
	
	//myApp.alert('ok'+fc+'_'+campo);	 
var ag=JSON.parse(localStorage.getItem('ID'+user_id+'Agenda'+fc+'_'+campo));
var ag_id=JSON.parse(localStorage.getItem('ID'+user_id+'Agenda'+fc+'_'+campo+'id'));	
	var minutos=$$('#Minutos'+campo).val();
	var asunto=$$('#Asunto'+campo).val();
	var contacto=$$('#Contacto'+campo).val();
	var lugar=$$('#Lugar'+campo).val();
	var nota=$$('#Nota'+campo).val();
	var telefono=$$('#Telefono'+campo).val();
	var email=$$('#Email'+campo).val();
	//
	if(ag_id!==null){
	var agenda_id=ag_id.split("|");
	var agenda_id0=agenda_id[0];
	} else{
	agenda_id='';	
	agenda_id0='';	
	}
	
	var valor_final=minutos+'|'+asunto+'|'+contacto+'|'+lugar+'|'+nota+'|'+telefono+'|'+email;
	var valor_final_id=agenda_id0+'|no';
	
if(ag===null || ag===''|| ag==='||||||'|| ag==='||||' || ag!==valor_final){
localStorage.setItem('ID'+user_id+'Agenda'+fc+'_'+campo,JSON.stringify(valor_final));
localStorage.setItem('ID'+user_id+'Agenda'+fc+'_'+campo+'id',JSON.stringify(valor_final_id));	
	//myApp.alert('guardado:'+'ID'+user_id+'Agenda'+fc+'_'+campo+'>'+valor_final);
if(ag===null || ag===''|| ag==='||||||'|| ag==='||||'){
	marcar_calendario(fc);
}	
}

}





function guardar_agenda_todo(){
	var t=$$('.zona_nota').val();
	var l=$$('#lugar_base').val();
	var c=$$('#contacto_base').val();
	var a=$$('#asunto_base').val();
	var m=$$('#minutos_base').val();
	//
	var tel=$$('#telefono_base').val();
	var em=$$('#email_base').val();
	
	//myApp.alert('pp'+a);
	
guardar_agenda('texto', t); 
guardar_agenda('lugar', l); 
guardar_agenda('contacto', c); 
guardar_agenda('asunto', a); 
guardar_agenda('minutos', m); 
guardar_agenda('telefono', tel); 
guardar_agenda('email', em); 	
	

var fc=$$('#fecha_cargada').val();
sincronizar(fc);
}



function mostrar_borrar_agenda(){
$$('#boton_borrar').show();
}

function borrar_agenda(){
$$('#minutos_base').val('00');
$$('#asunto_base').val('');
$$('#contacto_base').val('');
$$('#lugar_base').val('');
$$('.zona_nota').val('');
$$('#telefono_base').val('');
$$('#email_base').val('');	
ejecutar('telefono');
ejecutar('email');
	//
	var hx=$$('#editando').val();
$$('#Minutos'+hx).val('');
$$('#Asunto'+hx).val('');
$$('#Contacto'+hx).val('');
$$('#Lugar'+hx).val('');
$$('#Nota'+hx).val('');	
$$('#Telefono'+hx).val('');
$$('#Email'+hx).val('');		
$$('.H'+hx+' .nota').html('');
	//
$$('.H'+hx+' .agenda_asuntos').hide();
$$('.H'+hx+' .agenda_contacto').hide();	
$$('.H'+hx+' .agenda_lugar').hide();
$$('.H'+hx+' .agenda_telefono').hide();	
$$('.H'+hx+' .agenda_email').hide();	
	
//
	var fx=$$('#fecha_cargada').val();
	localStorage.removeItem('ID'+user_id+'Agenda'+fx+'_'+hx);
	/*
guardar_agenda('texto','');
guardar_agenda('asunto','');	
guardar_agenda('minulos','');
guardar_agenda('contacto','');	
guardar_agenda('lugar','');	
	*/
//
	
	marcar_calendario(fx);
}



///////////************************
function sincronizar(fecha){
	//myApp.preloader.show();
	//myApp.alert(fecha);
	//var conexion = JSON.parse(localStorage.getItem('conexion'));
//if(conexion==='on'){	
	if(navigator.onLine){
/// hacemos un recorrido por todas las notas guardadas
if(fecha===''){
var fechaInicio = new Date('2018-01-01');
var fechaFin    = new Date('2019-12-31');
}else{
var fechaInicio = new Date(fecha);
var fechaFin    = new Date(fecha);	
}
	//
while(fechaFin.getTime() >= fechaInicio.getTime()){
fechaInicio.setDate(fechaInicio.getDate() + 1);
var YA=fechaInicio.getFullYear();
var MA=fechaInicio.getMonth() + 1;
var DA=fechaInicio.getDate();
	if(MA<10){
		MA='0'+MA;
	}
	if(DA<10){
		DA='0'+DA;
	}
	//
	var total_notas=0;
	var f=YA+ '-' + MA + '-' + DA;
	var h=5;
	while(h<19){
	h++;
	var name_nota='ID'+user_id+'Agenda'+f+'_'+h;
	var nota_existe=JSON.parse(localStorage.getItem(name_nota));
	//
	var name_nota_id='ID'+user_id+'Agenda'+f+'_'+h+'id';
	var nota_existe_id=JSON.parse(localStorage.getItem(name_nota_id));
	
		//var conexion = JSON.parse(localStorage.getItem('conexion'));
		
		if(nota_existe!==null){
			
			if(nota_existe_id!==null){
			agf_id=nota_existe_id.split('|');	
			}else{
			agf_id='';	
			}
	///////////////////////////////////////***
		
						//myApp.alert(f+'/'+h+'>'+agf_id[0]);
						/// primero tratamos de enviar a la nube
					
						//conexion='off';
						//if(conexion==='on'){
							if(navigator.onLine){
						//myApp.alert('sincronizando...','');
							///OJO con Nota
						var agenda_id=agf_id[0];
						var agenda_time=agf_id[2];
						//myApp.alert('HAA:'+h+' S:'+agenda_time);	
						if(agenda_time===null || agenda_time==='' || agenda_time===undefined ){
							var tmpDate = new Date(); 
						agenda_time= tmpDate.getTime();	
						agenda_time=parseInt(agenda_time/1000);	
						}	
						
						//myApp.alert('HA:'+h+' S:'+agenda_time);
						//$$('.H'+h+' .sincronizar').html('<i class="fa fa-cloud"></i>');	
						
						$$.post('http://yanbal.agendamia.com/conecta.php',{sincronizar_nota:'si', usuario_id:user_id, fecha:f, hora:h, nota:nota_existe, agenda_id:agenda_id, agenda_time:agenda_time}, function(datax){
//	
			//myApp.alert(f+'/'+h+':'+datax);				
							
		//myApp.alert('HB:'+h);				
	var rx = datax.split("|");
							
					if(rx[0]==='OK'){
					//myApp.alert('nube:'+h);	
					var nt_id=rx[1]+'|'+rx[2]+'|'+rx[3];
					localStorage.setItem('ID'+user_id+'Agenda'+fecha+'_'+h+'id',JSON.stringify(nt_id));
					$$('.H'+hx+' .sincronizar').html('<i class="fa fa-cloud"></i>');
					}else{
						//myApp.alert('local:'+hx);	
						$$('.H'+h+' .sincronizar').html('<i class="fa fa-tablet-alt"></i>');
					}		
					
						});
							
							
							
							//myApp.alert('HC:'+h);
						//	
						}else {
						//if(conexion!=='on'){
							$$('.H'+h+' .sincronizar').html('<i class="fa fa-tablet-alt"></i>');
						}
					
		////////////////////////////////////****
		}else if(nota_existe===null){
		/// se envia consulta para verifiar que no haya registro desde otro dispositivo	
				//if(conexion==='on'){
					if(navigator.onLine){	
						$$.post('http://yanbal.agendamia.com/conecta.php',{sincronizar_nota:'si', usuario_id:user_id, fecha:f, hora:h, nota:'', agenda_id:'', agenda_time:0}, function(datax){
//	
		//myApp.alert('HB:'+h);				
	var rx = datax.split("|");
							
					if(rx[0]==='ACTUALIZAR'){
					//myApp.alert('nube:'+h);	
					var nt_id=rx[1]+'|'+rx[2]+'|'+rx[3];
					localStorage.setItem('ID'+user_id+'Agenda'+fecha+'_'+h+'id',JSON.stringify(nt_id));
					localStorage.setItem('ID'+user_id+'Agenda'+fecha+'_'+h,JSON.stringify(rx[4]));	
						//
						$$('#editando').val(h);
guardar_agenda('texto', rx[9]); 
guardar_agenda('lugar', rx[8]); 
guardar_agenda('contacto', rx[7]);
guardar_agenda('telefono', rx[10]);						
guardar_agenda('email', rx[11]);						
guardar_agenda('asunto', rx[6]); 
guardar_agenda('minutos', rx[5]);
						
						
					$$('.H'+hx+' .sincronizar').html('<i class="fa fa-cloud"></i>');
					}		
					
						});

						//	
						}
				/////++++
		}
	}

	//
}
}
//myApp.preloader.hide();	
}
////*************


function sincronizar_todo(){
	if(navigator.onLine){	
	marcar_calendario('');
	}else{
	myApp.alert('revisa tu conexión a internet','error');	
	}

}


function actualizar_fecha_vencimiento(){
//var conexion = JSON.parse(localStorage.getItem('conexion'));
	//
	//if(conexion==='on'){
		if(navigator.onLine){
	var usuario_id = JSON.parse(localStorage.getItem('usuario_id'));
		$$.post('http://yanbal.agendamia.com/conecta.php',{actualizar_vencimiento:'si',usuario_id:usuario_id},function(dataV){
		 	var respuestaV = dataV.split("|");
			if(respuestaV[0]==='OK'){
				localStorage.setItem('usuario_vigencia',JSON.stringify(respuestaV[1]));
				$$('.fecha_vigencia').html(respuestaV[1]);
				myApp.alert('Se ha actualizado la fecha de vencimiento, si tiene algún problema o duda, por favor contactenos a soporte@indexdream.com','actualización');
			}else{
				myApp.alert(respuestaV[1],respuestaV[0]);
			}
		});
	}else {
		// if(conexion==='off')
		myApp.alert('Por favor revisa tu conexión a internet','error en conexión');
	}
}

function salir(){
myApp.confirm('Desea Salir?', 'cerrar sesión', function () {
//JSON.parse(localStorage.removeItem('usuario'));
localStorage.removeItem('sesion');
window.location='index.html';
});
}


function borrar_todo(){
myApp.confirm('Desea Borra todos los datos locales?', 'Borrar y Salir', function () {
localStorage.clear();
window.location='index.html';
            });
	
	//

}

function buscar(tipo,texto){
$('.icono_buscar').removeClass('icono_buscar_on');	
if(tipo==='asunto'){
$$('#titulo_busqueda').html('Buscando Asunto: '+texto);	
$('.icono_'+texto).addClass('icono_buscar_on');	
}
if(tipo==='texto'){
texto=$$('#campo_buscar').val();	
$$('#titulo_busqueda').html('Buscando "'+texto+'":');
	
}	
	
var resultado='';	


/// hacemos un recorrido por todas las notas guardadas
var fechaInicio = new Date('2019-12-31');
var fechaFin    = new Date('2018-01-01');

	//
while(fechaFin.getTime() <= fechaInicio.getTime()){
fechaInicio.setDate(fechaInicio.getDate() - 1);
var YA=fechaInicio.getFullYear();
var MA=fechaInicio.getMonth() + 1;
var DA=fechaInicio.getDate();
	if(MA<10){
		MA='0'+MA;
	}
	if(DA<10){
		DA='0'+DA;
	}
	//
	var total_notas=0;
	var f=YA+ '-' + MA + '-' + DA;
	var h=5;
	var ampm='';
	var hm='';
	while(h<19){
	h++;
	var name_nota='ID'+user_id+'Agenda'+f+'_'+h;
	var nota_existe=JSON.parse(localStorage.getItem(name_nota));
		
		if(nota_existe!==null && nota_existe!=='' && nota_existe!=='||||'){
			if(tipo==='asunto'){
				
		var datos=nota_existe.split('|');
			if(datos[1]===texto){
				if(h<12){
			ampm='am';
			hm=h;
		}else if(h===12){
			ampm='pm';
			hm=h;
		}else{
			ampm='pm';
			hm=h-12;
		}
		//
		if(datos[0]===''){
		datos[0]='00';	
		}
				
			resultado=resultado+'<span  onClick="cargar_fecha(this.title);" title="'+f+'"><strong>'+f+', '+hm+':'+datos[0]+' '+ampm+':</strong><br> '+datos[2]+' '+datos[3];
				if(datos[4]!==''){
					resultado=resultado+'<br>'+datos[4];
					}
				resultado=resultado+'<br></span>';
			}
			}else if(tipo==='texto'){
				
				/// pasamos todo a mayusculas para hacer la busqueda y no afecte como se escribe
var ntexto=texto.toUpperCase();
var nnota=nota_existe.toUpperCase();				
//myApp.alert(ntexto);
   
			
				///
			var nx=nnota.includes( ntexto );
		
			if(nx===true){
				var datos=nota_existe.split('|');
				
				if(h<12){
			ampm='am';
			hm=h;
		}else if(h===12){
			ampm='pm';
			hm=h;
		}else{
			ampm='pm';
			hm=h-12;
		}
		//
		if(datos[0]===''){
		datos[0]='00';	
		}
				
			resultado=resultado+'<span  onClick="cargar_fecha(this.title);" title="'+f+'"><strong>'+f+', '+hm+':'+datos[0]+' '+ampm+':</strong><br> '+datos[1]+' '+datos[2]+' '+datos[3];
				if(datos[4]!==''){
					resultado=resultado+'<br>'+datos[4];
					}
				resultado=resultado+'<br></span>';
			}
			
				/**/
			}
			
		}
	}

	//
}
	
	

	$$('#zona_resultados_busqueda').html(resultado);
	myApp.showTab('#view-9');
}



function compartir(){
	
var amigo=$$('#compartir_nombre').val();
var amigo_email=$$('#compartir_email').val();	
var amigo_texto=$$('#compartir_texto').val();
	//
	if(amigo==='' || amigo_email==='' || amigo_texto===''){
		myApp.alert('complete los datos por favor','error');
	}else{
	if(navigator.onLine){	
	$$.post('http://yanbal.agendamia.com/conecta.php',{compartir:'si', usuario_id:user_id, amigo:amigo, email:amigo_email, texto:amigo_texto}, function(respuesta){
	var rs=respuesta.split('|');
	myApp.alert(rs[1],rs[0]);	
	});
	}else{
	myApp.alert('revisa tu conexión a internet','error');	
	}
		}
			
}


function calcular_regalo(){
var cantidad=Number($$('#regalar').val());
var descuento=0;
	if(cantidad>9){
		descuento=5;
	}
var total_regalo=(cantidad*12000)*((100-descuento)/100);
$$('#precio_regalo').html('$ '+total_regalo);
$$('#total_regalo').val(total_regalo);
	regalar_suscripcion();
}

function regalar_suscripcion(){
//
var usuario_id = JSON.parse(localStorage.getItem('usuario_id'));
var key = JSON.parse(localStorage.getItem('key'));
var cantidad=$$('#regalar').val();
//
	if(cantidad==='' || cantidad===0){
	myApp.alert('falta la cantidad de suscripciones que deseas obsequiar','error');
	}else{
		if(navigator.onLine){
$$('#regalar_ahora').attr('href','http://indexdream.com/pago.php?tipo=AY&id='+usuario_id+'&cod='+key+'&regalo='+cantidad);	
		}else{
	myApp.alert('revisa tu conexión a internet','error');		
		}
//
//
	}
	/**/
}


function buscar_actualizacion(){
var version = JSON.parse(localStorage.getItem('version'));
	//myApp.alert(version);
if(navigator.onLine){	
	$$.post('http://yanbal.agendamia.com/conecta.php',{actualizar:'si', version_actual:version}, function(respuesta){
	//myApp.alert(respuesta);	
	var rs=respuesta.split('|');
	if(rs[0]==='OK'){
	$$('#zona_actualizacion').show();
	$$('#zona_no_actualizacion').hide();	
	$$('.version_nueva').html(rs[1]);
	$$('#notas_nueva_version').html(rs[2]);	
	}else{
	$$('#zona_actualizacion').hide();
	$$('#zona_no_actualizacion').show();
	}	
	});
	}else{
	myApp.alert('revisa tu conexión a internet','error');	
	}	
}


/*
function regalar_suscripcion(){
	
var cantidad=$$('#regalar_cantidad').val();
var amigo_email=$$('#compartir_email').val();	
var amigo_texto=$$('#compartir_texto').val();
	//
	if(amigo==='' || amigo_email==='' || amigo_texto===''){
		myApp.alert('complete los datos por favor','error');
	}else{
	myApp.alert('procesando ...','espera un momento');	
	$$.post('http://yanbal.agendamia.com/conecta.php',{compartir:'si', usuario_id:user_id, amigo:amigo, email:amigo_email, texto:amigo_texto}, function(respuesta){
	var rs=respuesta.split('|');
	myApp.alert(rs[1],rs[0]);	
	});
		}
			
}
*/

function cambiar_recordatorio(valor){
if(navigator.onLine){
	var usuario_id = JSON.parse(localStorage.getItem('usuario_id'));
	$$.post('http://yanbal.agendamia.com/conecta.php',{recordatorio:'si', valor:valor, usuario_id:usuario_id}, function(respuesta){
	
	if(respuesta==='OK'){
	localStorage.setItem('enviar_agenda',JSON.stringify(valor));
	myApp.alert('cambio realizado','actualizacion');	
	}else{
	myApp.alert(respuesta,'error');
	}	
	});
	}else{
	myApp.alert('revisa tu conexión a internet','error');	
	}	
}




function pulsar(obj,name,valor,base) {
    if (!obj.checked) return
	$$('#'+base+'_1').val(valor);
    elem=document.getElementsByName(name);
    for(i=0;i<elem.length;i++) 
        elem[i].checked=false;
    obj.checked=true;
} 


function contactos(){
	navigator.contacts.pickContact(function(contact){
		if(JSON.stringify(contact['displayName'])!=null){
		var contacto_nombre=JSON.stringify(contact['displayName']);
			contacto_nombre = contacto_nombre.replace(/["']/g, ""); //quita doble comillas
		$$('#contacto_base').val(contacto_nombre);	
		}
		
		
		if(JSON.stringify(contact['phoneNumbers'][0]['value'])!=null){
		var contacto_telefono1=JSON.stringify(contact['phoneNumbers'][0]['value']);
			contacto_telefono1 = contacto_telefono1.replace(/["']/g, ""); //quita doble comillas
		$$('#telefono_base').val(contacto_telefono1);
			ejecutar('telefono');
		}
		
		if(JSON.stringify(contact['emails'][0]['value'])!=null){
		var contacto_email=JSON.stringify(contact['emails'][0]['value']);
			contacto_email = contacto_email.replace(/["']/g, ""); //quita doble comillas
		$$('#email_base').val(contacto_email);
			ejecutar('email');
		}
		
 //myApp.alert('The following contact has been selected:' + JSON.stringify(contact['emails'][0]['value']) );
		//contact['displayName'] // contact['phoneNumbers'][0]['value']  // contact['phoneNumbers'][1]['value'] //// contact['emails'][0]['value'] /// ver todos los datos: contact
},function(err){
 myApp.alert('Error: ' + err);
});
}


function ejecutar(ref){
	if(ref=='telefono'){
	var tll=$$('#telefono_base').val();
		$$('#link_telefono').attr('href','tel:'+tll);
		//myApp.alert(tll);
	}else if(ref=='email'){
	var mll=$$('#email_base').val();
		$$('#link_email').attr('href','mailto:'+mll);
		//myApp.alert(tll);
	}
}

///********************
