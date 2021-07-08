function afiseaza_login(){
    document.getElementById("email_log").value = "";
    document.getElementById("password_log").value = "";
    document.getElementById("alerta_log").style.display = "none";
    document.getElementById("mod_log").style.display="block";
}

function login(){

   let loginPayload = {
       Email : document.getElementById("email_log").value,
       Password : document.getElementById("password_log").value
   };

   if (loginPayload.Email.length != 0 && loginPayload.Password != 0)
   {

       let xhr = new XMLHttpRequest();
       xhr.onreadystatechange = function ()
       {

           if (this.readyState == 4 && this.status == 200)
           {
               console.log(this.responseText);
               document.getElementById("mod_log").style.display = "none";
               document.getElementById("reusit_log").style.display = "block";
           }
           if (this.readyState == 4 && this.status == 404)
           {
               console.log(this.responseText);
               document.getElementById("mesaj_eroare_log").textContent = "Email sau parolă incorecte.";
               document.getElementById("mod_log").style.display = "none";
               document.getElementById("alerta_log").style.display = "block";
           }
       };
       xhr.open("POST", "http://localhost:38779/api/account/login", true);
       xhr.setRequestHeader('Content-type', 'application/json');
       xhr.send(JSON.stringify(loginPayload));

   }
   else {
       document.getElementById("mesaj_eroare_log").textContent = "Introduceți toate datele necesare.";
       document.getElementById("mod_log").style.display = "none";
       document.getElementById("alerta_log").style.display = "block";
   }
}

function afiseaza_register(){

    document.getElementById("nume").value = "";
    document.getElementById("prenume").value = "";
    document.getElementById("email_reg").value = "";
    document.getElementById("parola_reg").value = "";
    document.getElementById("confirm").value = "";
    document.getElementById("telefon").value = "";
    document.getElementById("adresa").value = "";
    document.getElementById("alerta_reg").style.display = "none";
    document.getElementById("mod_reg").style.display="block";
}

function register(){

    let registerPayload = {
        FirstName : document.getElementById("nume").value,
        LastName :  document.getElementById("prenume").value,
        Email : document.getElementById("email_reg").value,
        Password: document.getElementById("parola_reg").value,
        ConfirmPassword : document.getElementById("confirm").value,
        Phone : document.getElementById("telefon").value,
        Address : document.getElementById("adresa").value
    };

    if (registerPayload.FirstName.length != 0 &&
        registerPayload.LastName.length != 0 &&
        registerPayload.Email.length != 0 &&
        registerPayload.Password.length != 0 &&
        registerPayload.ConfirmPassword.length != 0 &&
        registerPayload.Phone.length != 0 &&
        registerPayload.Address.length != 0
    ){
        if (registerPayload.Password == registerPayload.ConfirmPassword){

            let xhr = new XMLHttpRequest();
            xhr.onreadystatechange = function ()
            {

                if (this.readyState == 4 && this.status == 200)
                {
                    console.log(this.responseText);
                    document.getElementById("mod_reg").style.display = "none";
                    document.getElementById("reusit_reg").style.display = "block";
                }
                if (this.readyState == 4 && this.status == 404)
                {
                    console.log(this.responseText);
                    document.getElementById("mesaj_eroare_reg").textContent = "Email deja existent.";

                    document.getElementById("mod_reg").style.display = "none";
                    document.getElementById("alerta_reg").style.display = "block";
                }
            };
            xhr.open("POST", "http://localhost:38779/api/account/register", true);
            xhr.setRequestHeader('Content-type', 'application/json');
            xhr.send(JSON.stringify(registerPayload));

        }
        else {
            document.getElementById("mesaj_eroare_reg").textContent = "Parola nu este corectă.";
            document.getElementById("mod_reg").style.display = "none";
            document.getElementById("alerta_reg").style.display = "block";
        }
    }
    else{
        document.getElementById("mesaj_eroare_reg").textContent = "Introduceți toate datele necesare.";
        document.getElementById("mod_reg").style.display = "none";
        document.getElementById("alerta_reg").style.display = "block";
    }
}


let index = 0;
function afiseaza_cos(){


    document.getElementById("produse").value = "default";

    let lista = document.getElementById("produse_adaugate").childNodes;
    let nr = lista.length;

    for (let i = 0; i < nr; i++)
    {
        document.getElementById("produse_adaugate").firstChild.remove();
    }

    index = 0;

    $.ajax({
        type : "GET",
        url : "produse.json",
        dataType : "json",
        success : function (data){

            const modal = document.getElementById('mod_cos').style.display = "block";

            let x = afisez_produse(data);

            var sel = document.getElementById('produse');

            for (let i = 0; i < x.length; i++)
            {

                var opt = document.createElement('option');

                opt.appendChild( document.createTextNode(x[i]) );

                opt.value = x[i];

                sel.appendChild(opt);
            }
        },

        error : function (){
            console.log("fisierul nu exista");
        }
    });
}

function adauga_produs(){

    index ++;

    var select = $("<select></select>").attr("id", "sel"+index);

    select.append($("<option></option>").attr("value", "default").text("Alege un produs"));

    $.ajax({
        type : "GET",
        url : "produse.json",
        dataType : "json",
        success : function (data){

            let string = [];

            for (let i = 0; i < data["db"][0]["produs"].length; i++)
            {
                string.push(data["db"][0]["produs"][i]["info_nume"]);
            }

            for (let i = 0; i < string.length; i++)
            {
                select.append($("<option></option>").attr("value", string[i]).text(string[i]));

            }
            $("#produse_adaugate").append(select);
        },

        error : function (){
            console.log("fisierul nu exista");
        }
    });
}

function sterge_produs(){

    if ($("#produse_adaugate").children().length> 0){

        $("#produse_adaugate").children().last().remove();
        index --;

    }
}

function afisez_produse(data){

    let string = [];

    let colectie = data;

    for (let i = 0; i < colectie["db"][0]["produs"].length; i++)
    {
        string.push(colectie["db"][0]["produs"][i]["info_nume"]);
    }
    return string;
}

function afiseaza(id) {
    let xhr = new XMLHttpRequest();

    xhr.onreadystatechange = function ()
    {
        if (this.readyState == 4 && this.status == 200)
        {
            const modal = document.getElementById('mod_produs').style.display = "block";

            let x = cauta(this.responseText, id);
            document.getElementById('img_info').src = x.info_src;
            document.getElementById("nume_produs").textContent = x.info_nume;
            document.getElementById("pret_produs").textContent = x.info_pret;
            document.getElementById("detalii_produs").textContent= x.info_descriere;
        }

        if (this.readyState == 4 && this.status == 404)
        {
            console.log("fisierul nu exista");
        }
    };

    xhr.open("GET", "produse.json", true);
    xhr.send();
}

function cauta(jsonText, id) {
    let colectie = JSON.parse(jsonText);

    let obj= {
        info_nume : "",
        info_src : "",
        info_pret : "",
        info_descriere : ""
    };

    for (let i = 0; i < colectie["db"][0]["produs"].length; i++)
    {
        if (colectie["db"][0]["produs"][i]["id"] == id)
        {
            obj.info_nume = colectie["db"][0]["produs"][i]["info_nume"];
            obj.info_src = colectie["db"][0]["produs"][i]["info_src"];
            obj.info_descriere = colectie["db"][0]["produs"][i]["info_descriere"];
            obj.info_pret = colectie["db"][0]["produs"][i]["info_pret"];
            return obj;
            break;
        }
    }
}

