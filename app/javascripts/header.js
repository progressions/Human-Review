/*
LOCAL NAMESPACES/CONSTANTS

// This page is not cached across the whole app so it is safe to use the
// @view instance variable here.

*/

YAHOO.oib.page_loaded = false;

var View = {
  name: "<%= @view %>"
};

YAHOO.namespace(View.name);

$(document).ready(YAHOO.oib.init);