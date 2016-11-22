var skype_integration = skype_integration || {};

skype_integration.user = {
    "admin": {"name":"Admin","email":"admin@confluence-demo.de","metadata":{"skypestatus":"Online","project":"Sicherheitstest Steuergeraet 1"}},
    "max": {"name":"Max Jurik","email":"jurik@business.de","metadata":{"skypestatus":"Offline","project":"Bus 1"}},
    "martin": {"name":"Martin Gypser","email":"gypser@business.de","metadata":{"skypestatus":"DnD","project":"Bus 1"}}
};

skype_integration.statusMap = {
    "Online": "skype-online",
    "Offline": "skype-offline",
    "DnD": "skype-dnd"
};

skype_integration.init = function() {
    var self = this;

    AJS.$("[class*='url fn confluence-userlink").each(function(idx, value) {
        var userUrl = AJS.$(value);

        if(userUrl.parent().find(".skype-status").size() === 0) {
            var span = AJS.$("<span>");

            span.addClass("skype-status");
            span.addClass("skype-offline");
            userUrl.parent().prepend(span);

            setTimeout(function() {
                var data = self.user[AJS.$(value).data("username")];
                if(data !== undefined) {
                    self.setOnlineStatus(userUrl, data);
                }
            }, 1000);
        }
    })
};

skype_integration.setOnlineStatus = function(userUrl, data) {
    var skypeStatusSpan = userUrl.parent().find(".skype-status");
    skypeStatusSpan.removeClass("skype-offline");
    skypeStatusSpan.addClass(this.statusMap[data.metadata.skypestatus]);
};

skype_integration.buildCard = function(card) {
    debugger;
};

AJS.toInit(function() {
    MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

    var observer = new MutationObserver(function(mutations, observer) {
        skype_integration.init();
    });
    observer.observe(document, {
      subtree: true,
      attributes: true
    });
});