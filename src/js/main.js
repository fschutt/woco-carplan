var rpc = {
  invoke : function(arg) { window.external.invoke(JSON.stringify(arg)); },
  init : function() { rpc.invoke({ cmd : 'init' }); },
};

window.onload = function() { rpc.init(); };

// function update_process_table() {
//     rpc.invoke({ cmd : 'update_process_table' , text: "" });
// }

// document.getElementById("end_task").addEventListener("click", update_process_table, false);

