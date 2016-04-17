'use strict';

$(document).ready(init);

function init() {
	$('#btnSave').on('click', saveContact);

	renderList();

	$('table').on('click', '.btnDelete', eventSplit);
	$('table').on('click', '.contactList', eventSplit);
	$('#btnUpdate').on('click', saveContact);

	$('#myModal').on('hidden.bs.modal', function (e) {
    $(this).find('input,textarea,select').val('').end();
	})
}

function eventSplit(event) {

	if (typeof event != 'undefined') {

		if (  $('button').is(event.target) ){
			removeContact(event);
		} else if ( $('img.img-circle').is(event.target) ) {
			updateContact(event, $(this).index() );
		}
	}
}

var contactArray = [];
function saveContact() {

	var image = $('#image').val();

	var name = $('#name').val();
	var phone = $('#phone').val();
	var address = $('#address').val();
	var email = $('#email').val();
	var birthday = $('#birthday').val();
	var favorite = $('#favorite').val();

	if (contactArray.length > 0) {
		contactArray = [];	
	}

	contactArray.push(image);
	contactArray.push(name);
	contactArray.push(phone);
	contactArray.push(address);
	contactArray.push(email);
	contactArray.push(birthday);
	contactArray.push(favorite);

	$('#image').val('');
	$('#name').val('');
	$('#phone').val('');
	$('#address').val('');
	$('#email').val('');
	$('#birthday').val('');
	$('#favorite').val('');

  $('#btnSave').show();
  $('#btnUpdate').hide();

	addContact();

}

function renderList() {

	$('table').empty();

  var contactList = ContactStorage.get();

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
			var $button = $('<td>').append('<button>Delete').addClass('btnDelete');

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
}

function addContact() {
  
  var contactList = ContactStorage.get();
	if (g_index > 0) {
		// Update
		contactList.splice(g_index, 1, contactArray);
	  g_index = -1;

	} else {
	  contactList.push(contactArray); 		
	}

  ContactStorage.write(contactList);
  renderList();
}

function removeContact(event) {
  var index = $(this).closest('tr').index();
  var contactList = ContactStorage.get();
  contactList.splice(index, 1);
  ContactStorage.write(contactList);

  renderList();
}

var g_index = -1;
function updateContact(event, index) {
  // var index = $(this).index();
  var index = index;
	
  var contactList = ContactStorage.get();

  g_index = index;

  var array = contactList[index];

	$('#image').val(array[0]);
	$('#name').val(array[1]);
	$('#phone').val(array[2]);
	$('#address').val(array[3]);
	$('#email').val(array[4]);
	$('#birthday').val(array[5]);
	$('#favorite').val(array[6]);

	contactList.splice(index, 1, contactArray);
  ContactStorage.write(contactList);

  renderList();

  $('#myModal').modal();
  
  if (index > 0) {
	  $('#btnSave').hide();
	  $('#btnUpdate').show();
  } else {
	  $('#btnUpdate').hide();
  }

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



