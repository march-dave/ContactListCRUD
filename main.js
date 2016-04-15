'use strict';

// $( ()=> )

$(document).ready(init);

function init() {
	$('#btnSave').on('click', saveContact);
}

function saveContact() {

	var image = $('#image').val();

	var name = $('#name').val();
	var phone = $('#phone').val();
	var address = $('#address').val();
	var email = $('#email').val();
	var birthday = $('#birthday').val();
	var favorite = $('#favorite').val();

	var $tr = $('<tr>');
	var $image = $('<img>').attr('src', image).attr('class', 'img-circle');
	var $imagetd = $('<td>').append($image);
	var $nametd = $('<td>').text(name);
	var $phonetd = $('<td>').text(phone);
	var $addresstd = $('<td>').text(address);
	var $emailtd = $('<td>').text(email);
	var $birthdaytd = $('<td>').text(birthday);
	var $favoritetd = $('<td>').text(favorite);

	var array = [];
	array.push($imagetd);
	array.push($nametd);
	array.push($phonetd); 
	array.push($addresstd); 
	array.push($emailtd);
	array.push($birthdaytd);
	array.push($favoritetd);

	$tr.append(array);

	$('table').append($tr);

	$('#image').val('');
	$('#name').val('');
	$('#phone').val('');
	$('#address').val('');
	$('#email').val('');
	$('#birthday').val('');
	$('#favorite').val('');

}