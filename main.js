'use strict';

$(document).ready(init);

function init() {
	$('#btnSave').on('click', saveContact);

	renderList();

	$('.btn').on('dbclick', removeContact);
	$('.contactList').on('click', updateContact);
}

function removeContact(event) {  
  var index = $(this).index();
  var contactList = ContactStorage.get();
  contactList.splice(index, 1); // modify
  ContactStorage.write(contactList);

  renderList();
}

var g_index = 0;
function updateContact(event) {
  var index = $(this).index();
  var contactList = ContactStorage.get();

  g_index = index;

  var array = contactList[index];
  
  // contactList.splice(index, 1); // modify

  $('#myModal').modal();

	$('#image').val(array[0]);
	$('#name').val(array[1]);
	$('#phone').val(array[2]);
	$('#address').val(array[3]);
	$('#email').val(array[4]);
	$('#birthday').val(array[5]);
	$('#favorite').val(array[6]);

	// contactList.splice(index, 1); // modify
	// contactList.splice(index, 1, contactArray);
  // ContactStorage.write(contactList);

  renderList();
}


var contactArray = [];

function saveContact() {

	console.log("saveContact");

	var image = $('#image').val();

	var name = $('#name').val();
	var phone = $('#phone').val();
	var address = $('#address').val();
	var email = $('#email').val();
	var birthday = $('#birthday').val();
	var favorite = $('#favorite').val();

	contactArray.push(image);
	contactArray.push(name);
	contactArray.push(phone);
	contactArray.push(address);
	contactArray.push(email);
	contactArray.push(birthday);
	contactArray.push(favorite);

	// var $tr = $('<tr>');
	// var $image = $('<img>').attr('src', image).attr('class', 'img-circle');
	// var $imagetd = $('<td>').append($image);
	// var $nametd = $('<td>').text(name);
	// var $phonetd = $('<td>').text(phone);
	// var $addresstd = $('<td>').text(address);
	// var $emailtd = $('<td>').text(email);
	// var $birthdaytd = $('<td>').text(birthday);
	// var $favoritetd = $('<td>').text(favorite);

	// var array = [];
	// array.push($imagetd);
	// array.push($nametd);
	// array.push($phonetd); 
	// array.push($addresstd); 
	// array.push($emailtd);
	// array.push($birthdaytd);
	// array.push($favoritetd);

	// $tr.append(array);

	// $('table').append($tr);

	$('#image').val('');
	$('#name').val('');
	$('#phone').val('');
	$('#address').val('');
	$('#email').val('');
	$('#birthday').val('');
	$('#favorite').val('');

	addContact();

}

function renderList() {

	$('table').empty();

  var contactList = ContactStorage.get();

  	console.log("renderList");

  	var counter = 0;

  	contactList.map(function (c, i, a) {

  		var array = [];

			var $tr = $('<tr>').addClass('contactList');
			var $image = $('<img>').attr('src', c[0]).attr('class', 'img-circle');
			var $imagetd = $('<td>').append($image);
			var $nametd = $('<td>').addClass('contactList').text(c[1]);
			var $phonetd = $('<td>').text(c[2]);
			var $addresstd = $('<td>').text(c[3]);
			var $emailtd = $('<td>').text(c[4]);
			var $birthdaytd = $('<td>').text(c[5]);
			var $favoritetd = $('<td>').text(c[6]);
			var $button = $('<td>').text('delete').addClass('btn');

			array.push($imagetd);
			array.push($nametd);
			array.push($phonetd); 
			array.push($addresstd); 
			array.push($emailtd);
			array.push($birthdaytd);
			array.push($favoritetd);
			array.push($button);

			$tr.append(array);

			$('table').append($tr);

			array = "";
			$tr = "";

			counter++;

  	});

  // var $lis = names.map(name => $('<li>').addClass('name').text(name) );
  // $('.nameList').empty().append($lis);
	
}

function addContact() {
  // var newName = $('.newName').val();
  // $('.newName').val('');

	// contactArray

	console.log("addContact");
	console.log("contactArray", contactArray);


  var contactList = ContactStorage.get();
  contactList.push(contactArray); 		
  ContactStorage.write(contactList);



 //  contactList.splice(g_index, 1); // modify
	// contactList.splice(g_index, 1, contactArray);
  // ContactStorage.write(contactList);


  renderList();

  
}

var ContactStorage = {
  get: function() {
    try {
      var contactList = JSON.parse(localStorage.contactListCRUD);
    } catch(err) {
      var contactList = [];
    }
    return contactList;
  },
  write: function(contactList) {
    localStorage.contactListCRUD = JSON.stringify(contactList);
  }
};



