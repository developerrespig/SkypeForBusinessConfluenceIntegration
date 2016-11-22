var skype_integration = skype_integration || {};

skype_integration.init = function() {
    conosle.log("Hello World");
};

AJS.$(document).ready() {
    skype_integration.init();
};