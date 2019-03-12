"use strict";

var rpc = {
  invoke : function(arg) { window.external.invoke(JSON.stringify(arg)); },
  init : function() { rpc.invoke({ cmd : 'init' }); },
  log : function(text_to_log) {
    if (typeof text_to_log !== 'string') {
      text_to_log = JSON.stringify(text_to_log);
    }
    rpc.invoke({cmd: 'log', text: text_to_log });
  },
  update_process_table_view: function(table_string) {
    document.getElementById("process_table").innerHTML = table_string;
  }
};

window.onload = function() { rpc.init(); };

// function update_process_table() {
//     rpc.invoke({ cmd : 'update_process_table' , text: "" });
// }

// document.getElementById("end_task").addEventListener("click", update_process_table, false);

