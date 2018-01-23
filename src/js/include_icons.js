// after adjusting the path to the icons,
// use this to call the sprite onto the HTML page
var pe_ajax = new XMLHttpRequest();                                     
pe_ajax.open("GET", "../../icons/p-icons-sprite-1.1.svg", true);                        
pe_ajax.responseType = "document";                                                 
pe_ajax.onload = function(e) {                                                     
  document.body.insertBefore(                                                   
    pe_ajax.responseXML.documentElement,                                           
    document.body.childNodes[0]                                                 
  );                                                                            
}                                                                               
pe_ajax.send();
