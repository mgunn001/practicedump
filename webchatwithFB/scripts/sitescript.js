var lastStateOfLastSpan="";
function start(){
	$(document).ready(function(){

		// var contents = $('.editablediv').html();
		// $('.editablediv').blur(function() {
		//     if (contents!=$(this).html()){
		//         alert('Handler for .change() called.');
		//         contents = $(this).html();
		//     }
		// });

		$('body').on('focus', '.editablediv', function() {

		  	 lastStateOfLastSpan = $(".editablediv .currentline").find("span").eq(-1).html();
		  	 if(lastStateOfLastSpan == undefined){
		  	 	lastStateOfLastSpan = "";
		  	 }

		}).on('blur keypress paste input', '.editablediv', function(e) {

			 if (e.keyCode === 13) {
			 	$("#message").val("<br>");
			 	$(".editablediv").find(".currentline").removeClass(".currentline");
				//$(".editablediv").find("div:last").remove()
			    $("#submit").trigger("click");
			 }
			 if (e.keyCode === 0 || e.keyCode === 32) {
			    var currentStateOfLastSpan = $(".editablediv .currentline").find("span").eq(-1).html();
				    if(currentStateOfLastSpan == undefined){
				    	currentStateOfLastSpan = $.trim($(".editablediv").text());
				    }
			    	
			    	currentStateOfLastSpan = $.trim(currentStateOfLastSpan);
			    	var currentStringToSend = $.trim(getDifference(lastStateOfLastSpan,currentStateOfLastSpan));

			    	if(currentStringToSend!="" && currentStringToSend.indexOf(" ") == -1){

			    		//alert("changed:"+$.trim(currentStringToSend));

			    		$("#message").val($.trim(currentStringToSend));
			    		var spanToRemoveFromUI = $(".editablediv .currentline").find("span").eq(-1).attr("id");
			    		$("#"+spanToRemoveFromUI).html(lastStateOfLastSpan);
			    		lastStateOfLastSpan = currentStringToSend;

			    		$("#submit").trigger("click");
			    	}

			    
			}
		});

	});
}

start();

function getDifference(a, b)
{
    var i = 0;
    var j = 0;
    var result = "";
    
    while (j < b.length)
    {
        if (a[i] != b[j] || i == a.length)
            result += b[j];
        else
            i++;
        j++;
    }
    return result;
}


// for moving the cursor to the end
function setEndOfContenteditable(contentEditableElement)
{
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        selection.removeAllRanges();//remove any selections already made
        selection.addRange(range);//make the range you have just created the visible selection
    }
    else if(document.selection)//IE 8 and lower
    { 
        range = document.body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(contentEditableElement);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
}

function placeCaretAtEnd(el) {
    el.focus();
    if (typeof window.getSelection != "undefined"
            && typeof document.createRange != "undefined") {
        var range = document.createRange();
        range.selectNodeContents(el);
        range.collapse(false);
        var sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(range);
    } else if (typeof document.body.createTextRange != "undefined") {
        var textRange = document.body.createTextRange();
        textRange.moveToElementText(el);
        textRange.collapse(false);
        textRange.select();
    }
}