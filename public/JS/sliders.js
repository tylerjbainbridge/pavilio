function displayVal() {
    var one = document.getElementById('points').value;
    document.getElementById("field").innerHTML = one;
}

function fillTextBox(){
    var one = document.getElementById('points').value;
    var fone = document.getElementById('field').value;


    document.getElementById('field').value = one;
}
