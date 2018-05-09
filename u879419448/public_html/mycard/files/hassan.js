var pages = [];
var jsond = [];
var gurl = "";
var gtbl = "";

//$("#header").hide();
//$("#content").hide();
var loadingpageurl = "<div align='center'><h3>Loading....</h3></div>";


function displayme(){
$("#loading").hide();
$("#content").fadeIn("slow");
}//displ

function set_tbl_url($url,$tbl){
gtbl = $tbl;
gurl = $url;
}//set tabel

function go_to($url,$ptype,$tbl){
    $("#content").html("");
    $("#content").hide();
    $("#content").html(pages[$url]);    
        if ($ptype == "grid") {
            $('#mytable').bootstrapTable({data: jsond[$url]});
            $('#mytable').bootstrapTable('load', jsond[$url]);  
            gurl = $url;
            gtbl = $tbl;                    
        };
        
    displayme();
}// to to

function load_mytable_data(){
console.log("refresh grid:"+gurl);   
$('#mytable').bootstrapTable({data: jsond[gurl]});
$('#mytable').bootstrapTable('load', jsond[gurl]);                      
}//load mytable data

function checkme(){  
  var xx = $("#password").val();
  if (xx=="") {
    alert("Please Enter Password!");
  } 
  else{
  $("#login_button").button('loading');  
  $.ajax({
    url: 'http://myraseed.com/cards/index.php/secure_data/check_me/'+xx,
    type:'GET',
    dataType: 'json',
    context: this,
    success: function(values)
            {               
                if (values.sts=="true") {
                 $( "#all_page" ).show();
                 $( "#login_form" ).hide();
                 //load_all_pages();                        
                 go_to("welcome_page","");

                }                 
                if (values.sts=="false") {
                 alert("Wrong Password !");                 
                }                                                             
            $("#login_button").button('reset');
            } 
  });
};
}//check me

function loadp(){
$("#content").fadeOut();
load_all_pages();
load_progress_bar(1000,false);
}//loadp

function get_page2($url){
var scriptUrl ="http://myraseed.com/cards/index.php/secure_data/"+$url;
$.ajax({
        url: scriptUrl,
        type: 'get',
        dataType: 'html',
        async: true,
        success: function(data) {
            result = data;
            pages[$url] = result;            
            console.log("Loading_html:"+$url);
            //console.log("Loading_html");
        },
        error: function(){
          console.log("Loading_ARR ERROR:"+$url); 
        } 
     });
}// get page2

function getJsond($url, $tbl){
var scriptUrl ="http://myraseed.com/cards/index.php/frontpage/get/"+$tbl;
$.ajax({
        url: scriptUrl,        
        dataType: 'json',
        async: true,
        success: function(data) {
            result = data;
            jsond[$url] = result;      
            console.log("Loading Json:"+$tbl);     
            //console.log("Loading Json");     
        },
        error: function(){
          console.log("Loading_Json ERROR:"+$url);  
        } 
     });  
}// JSON LOAD
function load_all_pages(){
get_page2("welcome_page");

get_page2("show_cards");    getJsond("show_cards","cards");
get_page2("show_logs");     getJsond("show_logs","op_log");
get_page2("show_ipn");      getJsond("show_ipn","ipn_table");
get_page2("show_offer");    getJsond("show_offer","nas");
get_page2("show_feedback");   getJsond("show_feedback","people");
get_page2("show_payments");   getJsond("show_payments","payments");

get_page2("count_cards"); 
get_page2("show_my_card_via_paypal_id");
get_page2("send_card_form");
get_page2("add_offer_form");
get_page2("add_card_form");
get_page2("report1/2015");
get_page2("report1/2014");
get_page2("report1/2013");
get_page2("report2");

}//load all pages 

function load_all_json(){
    getJsond("show_cards","cards");
    getJsond("show_logs","op_log");
    getJsond("show_ipn","ipn_table");
    getJsond("show_offer","nas");
    getJsond("show_feedback","people");
    getJsond("show_payments","payments");
}//load all json

$( document ).ready(function() {
load_all_pages();
$.notify("BOOM!", "error");
//load_progress_bar(500,true);
});

function load_progress_bar($ms,$page){
$("#loading").show();
$("#loading").html('<div class="progress progress-striped active"><div id="bar" class="progress-bar" style="width: 0%"></div></div>');
var progression = 0;
    progress = setInterval(function() 
    {
        $('#bar').html(progression + '%');
        $('#bar').css({'width':progression+'%'});
        if(progression >= 100) {
            clearInterval(progress);            
            //$("#loading").html("");
            //displayme();
            if ($page) {$( '#login_form' ).hide();$( '#all_page' ).fadeIn();} 
            else{go_to('welcome_page','','');};
            
        } else
            progression += 2;

    }, $ms); 
}// load p b

$( "#password" ).keypress(function( event ) {
  if ( event.which == 13 ) {
   checkme();  
  }  
});
