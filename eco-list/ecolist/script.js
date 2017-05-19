
var count =0;
var c = 0;
var a;


$(function () {

    //buttonclick to call add row
    $("#btnAdd").bind("click", function () {
        addRow("","");
		updateList();
    });
    
    //removes individual rows
    $("body").on("click", ".remove", function () {
        var id = $(this).attr('id');
        //alert(id);
        var toAdd = $("#" + id + "item").val();
		if(toAdd != "" && toAdd != null){
			listref.child(toAdd).remove();
		}
        //alert(toAdd);
        $(this).closest("tr").fadeTo(280,0.4, function(){
            $(this).remove();
        })
    });

    //shopping cart button that removes row and adds to new list
    $(document).ready(
    function(){
      $("body").on("click",".list", function (){
                var id = $(this).attr('id');
                a = parseInt(id);
                var toAdd = $("#" + a + "item").val();
                var toAdd2 = $('#' + a + "quantity").val();
				if(toAdd2 == "" || toAdd2 == null){
					toAdd2 = 0;
				}
				toAdd2 = parseInt(toAdd2);
				listref.child(toAdd).remove();
				cartref.update({[toAdd] : toAdd2});
                 addToCart(toAdd,toAdd2);
                 $(this).closest("tr").remove();
                 var patt = /easter\s?egg/ig;
                 if(patt.test(toAdd)) {
                  $('body').css('background-image', 'url(../images/easteregg.jpg)');
                 }
                 else{
                  $('body').css('background-image', 'url(../images/background2.jpg)');  
                 } 
                  $('#cTitle').html('Cart').hide().fadeIn("fast");
                  $(".list-group li").find(":button").hide();
            });
        
    //cart title and clear transitions only once 
    $("body").one("click",".list", function(){
			loadCartButtons();
        })

    //View cart button scrolls down to cart list
    $('#btnCart').on("click", function(){
        $('html, body').animate({
            scrollTop: $("#cartTitle").offset().top
        }, 1000);
    });

    //delete prompt when hovering over list item
    $(document).ready(function(){
        $('[data-toggle="tooltip"]').tooltip({
          trigger:'hover'
        });   
    });

    //mouse hover shows button and hides when leaving
    $(document).ready(function () {
      $(document).on('mouseenter', '.list-group li', function () {
            $(this).find(":button").show();
        }).on('mouseleave', '.list-group li', function () {
            $(this).find(":button").hide();
        });
    });

      //click to remove shoppingcart item
    $("body").on('click','.btnCartRemove', function(){
        $(this).toggleClass('strike').fadeOut("fast", function(){
			var item = $(this).parent()[0].innerText;
			item = item.replace(/^\d+\s/,'');
			console.log(item);
			cartref.child(item).remove();
          $(this).parent().remove();
          if($(".list-group-item").text().length === 0){
              $('#cTitle').html('Your cart is empty!').hide().fadeIn("fast");
            };
            if($(".list-group-item").text().length > 0){
              $('#cTitle').html('Cart');
            };
          $('.list-group').tooltip('hide');
              });    
          });
      }); 

    //removes all rows 
    $("#btnRemove").on("click", function () {
            $("#TextBoxContainer").children().remove();
			listref.remove();
    });

    //clears cart
     $("#btnClear").on("click", function () {
            $(".list-group").children().remove();
			cartref.remove();
            $('#cTitle').html('Your cart is empty!').hide().fadeIn("fast");
    });
      
  //end tag    
});
//
	function addToCart(item, qnty) {
		$('.list-group').append('<li class="list-group-item">' + qnty + " " + item + '<button class="btnCartRemove">'+'X'+'</button></li>');
		loadCartButtons();
	}

//button adds new rows to table 1
	function addRow(value1, value2){
		if(value1 == null){
			value1 = "";
		};
		if(value2 == null){
			value2 = "";
		};
		var div = $("<tr>");
        div.fadeIn("slow");
        div.html(GetDynamicTextBox(value1, value2));
        $("#TextBoxContainer").prepend(div);
        $('#btnRemove').css('visibility', 'visible');
	}
	function loadCartButtons() {
		$('#btnClear').css('visibility', 'visible').hide().fadeIn("fast");
		$('#btnCart').css('visibility', 'visible').hide().fadeIn("slow");
		$('#btnSave').css('visibility', 'visible').hide().fadeIn("fast");
	}

function GetDynamicTextBox(value1, value2) {
    count++;
    c++;
    return '<td><button type="button" id="'+c+'btn" class="btn btn-info list"><span class="glyphicon glyphicon-shopping-cart"></span></button></td>'
    + '<td><input name = "DynamicTextBox" id="'+count+'item" type="text" value = "' + value1 + '" class="form-control" placeholder="Name of item"onChange="updateList()"/></td>' 
    + '<td><input name = "DynamicTextBox" id="'+count+'quantity" type="number" value = "' + value2 + '"  class="form-control" placeholder="#"onChange="updateList()"/></td>' 
    + '<td><button type="button" id="'+c+'" class="btn btn-danger remove"><i class="glyphicon glyphicon-minus-sign"></i></button></td>'
}


function dbUpdate(){
    if(c !== 0){
        for (i = 0; i <= count; i++){

        }
    }
}