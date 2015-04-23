$(document).ready(function(){

	var signInData;

	$("#signup").on("submit",function(e){
		e.preventDefault();
		signInData = $(e.target).serializeArray();
		jsonConverter(signInData);
	});

	function jsonConverter(data){
		var results = {"form": {}};
		$.each(data,function(){
			results["form"][this.name] = [this.value];
		});
		var output = JSON.stringify(results);
		ajaxForm(output);
		console.log(output); // I believe this is how the formdata is supposed to look?
	}

	function ajaxForm(formData){
		$.ajax({
			url: "https://web-dev-test.herokuapp.com/forms",
			type: "POST",
			data: formData,
			dataType: "json",
			success: function(data){
				console.log(data); // comes back as undefined which I guess means I didn't quite get the layout of the data right
				appendData();
			}
		});
	}

	function appendData(){
		$(".form").replaceWith("<p> Hello " + signInData[1]["value"] + " " + signInData[2]["value"]  + " or should I call you " + signInData[0]["value"] + ". It is nice to meet someone who is the same age as me, " + signInData[3]["value"]  + " is a very speical number." );
	}
});