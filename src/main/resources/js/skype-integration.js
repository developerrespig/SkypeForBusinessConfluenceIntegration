var skype_integration = skype_integration || {};

skype_integration.user = {
    "admin": {"name":"Admin","email":"admin@confluence-demo.de","metadata":{"skypestatus":"Online","project":"Sicherheitstest Steuergeraet 1"}},
    "max": {"name":"Max Jurik","email":"jurik@business.de","metadata":{"skypestatus":"Offline","project":"Bus 1"}},
    "andreas": {"name":"Andreas Rieger","email":"andreas.rieger@communardo.de","metadata":{"skypestatus":"Online","project":"Bus 1"}},
    "martin": {"name":"Martin Gypser","email":"martin.gypser@communardo.de","metadata":{"skypestatus":"DnD","project":"Bus 1"}}
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

            userUrl.hover(function() {
                setTimeout(self.buildCard, 200);
            })
        }
    })
};

skype_integration.setOnlineStatus = function(userUrl, data) {
    var skypeStatusSpan = userUrl.parent().find(".skype-status");
    skypeStatusSpan.removeClass("skype-offline");
    skypeStatusSpan.addClass(this.statusMap[data.metadata.skypestatus]);
};

skype_integration.buildCard = function(card) {
    var vcards = AJS.$("*[id^='content-hover-'] .contents");
    if(vcards.size() !== 0) {
        vcards.each(function(idx, value) {
            var vcard = AJS.$(value);
            var vcardValues = vcard.find(".vcard .values");
            if(!vcardValues.hasClass("skype-integration-added") && vcardValues.size() !== 0) {
                vcardValues.addClass("skype-integration-added");
                vcardValues.append(skype_integration.buildSkypeBar(vcard));
                vcard.show();
            }
        });
    }
};

skype_integration.buildSkypeBar = function(vcard) {
    var bar = AJS.$("<div>");
    var linkBP = AJS.$("<a>");
    var userData = this.user[vcard.find(".userLogoLink").data("username")];

    //https://technet.microsoft.com/de-de/library/gg398376(v=ocs.15).aspx
    bar.append(linkBP.clone().attr("href", "callto:<sip:" + userData.email + ">").text("Call"));
    bar.append(linkBP.clone().attr("href", "IM:<sip:" + userData.email + ">").text("Message"));

    return bar;
}

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