jQuery(document).ready(function()
{
	localStorage.clear()
	$("#login").on('click', function(event) {
		var email = $("#email").val(),
			password = $("#password").val(),
			role = $("#role").val()

		var regex = /[\w-\.]{2,}@([\w-]{2,}\.)*([\w-]{2,}\.)[\w-]{2,4}/;
		if (regex.test( email.trim() ) ) 
		{
			if(email != '' && password != '' && role != '')
			{
				$.ajax({
					url: 'api/login',
					type: 'POST',
					data: {email: email, password: password},
				})
				.done(function(response) {
					console.log(response);
					if (response.token != '' && response.user.role == role)
					{
						
						localStorage.setItem('token', response.token)
						localStorage.setItem('name', response.user.name)
						localStorage.setItem('role', response.user.role)	

						window.location.href = "/clients"
					}else
					{
						toastr.warning("Sus credenciales son incorrectas")
					}
				})
				.fail(function(response) {
					console.log(response.responseJSON);
					if(response.responseJSON.error == 'invalid_credentials')
					{
						toastr.warning("Sus credenciales son incorrectas")
					}
				})
			}else
			{
				toastr.warning("Todos los campos son obligatorios")
			}
			
	    } 
	    else {
	        toastr.warning("Asegurese de escribir un correo valido")
	    }		
		
	});
});