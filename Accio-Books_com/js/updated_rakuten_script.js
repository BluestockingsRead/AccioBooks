// Initialize rakutenAutomate object or use existing one
try {
    var rakutenAutomate = window['rakutenAutomate'] || {};
} catch (e) {
    var rakutenAutomate = {
        links: {},
        events: []
    };
}

// Ensure events is an array
if (!Array.isArray(rakutenAutomate.events)) {
    rakutenAutomate.events = [];
}

console.log("rakutenAutomate before setting env:", rakutenAutomate);

// Set environment variables
rakutenAutomate['env'] = {
    catalystURL: 'https://automate.linksynergy.com',
    snippetURL: 'https://automate-frontend.linksynergy.com',
    frontendURL: 'https://automate-prod.storage.googleapis.com',
    applicationKey: 'kAKBleFjFvq2uiV4XZZ2MSXKFVgjK5ji'
};

// Define the run function
rakutenAutomate.run = function (ael) {
    console.log("rakutenAutomate.run function executed");
    if (!this.events || !Array.isArray(this.events)) {
        console.error("Error: this.events is not an array or is undefined");
        return;
    }
    for (var i = 0; i < this.events.length; i++) {
        var event = this.events[i];
        ael(event.type, event.handler, event.capture);
    }
    this.loaded = true;
};

// Assign rakutenAutomate to the window object
window['rakutenAutomate'] = rakutenAutomate;

rakutenAutomate['Sha1'] = {};


rakutenAutomate['Sha1']['hash'] = function (input) {
    input = input['utf8Encode']();
    var constants = [1518500249, 1859775393, 2400959708, 3395469782];
    input += String;
    var chunkCount = Math.ceil((input.length / 4 + 2) / 16);
    var message = new Array(chunkCount);

    for (var i = 0; i < chunkCount; i++) {
        message[i] = new Array(16);
        for (var j = 0; j < 16; j++) {
            message[i][j] = input.charCodeAt(64 * i + 4 * j) << 24 |
                input.charCodeAt(64 * i + 4 * j + 1) << 16 |
                input.charCodeAt(64 * i + 4 * j + 2) << 8 |
                input.charCodeAt(64 * i + 4 * j + 3);
        }
    }

    message[chunkCount - 1][14] = (8 * (input.length - 1)) / Math.pow(2, 32);
    message[chunkCount - 1][14] = Math.floor(message[chunkCount - 1][14]);
    message[chunkCount - 1][15] = (8 * (input.length - 1)) & 4294967295;

    var hashVars = [1732584193, 4023233417, 2562383102, 271733878, 3285377520];

    for (var i = 0; i < chunkCount; i++) {
        var wordArray = new Array(80);
        for (var j = 0; j < 16; j++) {
            wordArray[j] = message[i][j];
        }

        for (var j = 16; j < 80; j++) {
            wordArray[j] = rakutenAutomate['Sha1'].ROTL(wordArray[j - 3] ^ wordArray[j - 8] ^ wordArray[j - 14] ^ wordArray[j - 16], 1);
        }

        var [a, b, c, d, e] = hashVars;

        for (var j = 0; j < 80; j++) {
            var k = Math.floor(j / 20);
            var temp = (rakutenAutomate['Sha1'].ROTL(a, 5) +
                    rakutenAutomate['Sha1'].f(k, b, c, d) +
                    e +
                    constants[k] +
                    wordArray[j]) &
                4294967295;

            e = d;
            d = c;
            c = rakutenAutomate['Sha1'].ROTL(b, 30);
            b = a;
            a = temp;
        }

        hashVars[0] = (hashVars[0] + a) & 4294967295;
        hashVars[1] = (hashVars[1] + b) & 4294967295;
        hashVars[2] = (hashVars[2] + c) & 4294967295;
        hashVars[3] = (hashVars[3] + d) & 4294967295;
        hashVars[4] = (hashVars[4] + e) & 4294967295;
    }

    return hashVars.map(rakutenAutomate['Sha1'].toHexStr).join('');
};

rakutenAutomate['Sha1'].f = function (t, b, c, d) {
    switch (t) {
        case 0:
            return (b & c) ^ (~b & d);
        case 1:
            return b ^ c ^ d;
        case 2:
            return (b & c) ^ (b & d) ^ (c & d);
        case 3:
            return b ^ c ^ d;
    }
};

rakutenAutomate['Sha1'].ROTL = function (x, n) {
    return (x << n) | (x >>> (32 - n));
};

rakutenAutomate['Sha1'].toHexStr = function (n) {
    var s = '',
        v;
    for (var i = 7; i >= 0; i--) {
        v = (n >>> (i * 4)) & 0x0f;
        s += v.toString(16);
    }
    return s;
};

if (typeof String['prototype']['utf8Encode'] === 'undefined') {
    String['prototype']['utf8Encode'] = function () {
        return unescape(encodeURIComponent(this));
    };
}

if (typeof String['prototype']['utf8Decode'] === 'undefined') {
    String['prototype']['utf8Decode'] = function () {
        try {
            return decodeURIComponent(escape(this));
        } catch (t) {
            return this;
        }
    };
}

if (typeof module !== 'undefined' && module['exports']) {
    module['exports'] = rakutenAutomate['Sha1'];
}

if (typeof define === 'function' && define['amd']) {
    define([], function () {
        return rakutenAutomate['Sha1'];
    });
}

// Define other functions like sendPing, sendClick, etc...

rakutenAutomate['sendPing'] = function () {
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('POST', rakutenAutomate['env']['catalystURL'] + '/wake' + rakutenAutomate['widgetKey'], true);
    xhr.send(null);
};

rakutenAutomate['sendClick'] = function (params, element) {
    var url = rakutenAutomate['env']['catalystURL'] + '/click' + rakutenAutomate['serialize'](params);
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.open('GET', url, true);
    xhr.send(null);
};

rakutenAutomate['serialize'] = function (obj) {
    var first = true,
        query = '';
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {
            if (first) {
                first = false;
                query += '?' + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
            } else {
                query += '&' + encodeURIComponent(key) + '=' + encodeURIComponent(obj[key]);
            }
        }
    }
    return query;
};

rakutenAutomate['extractDomain'] = function (url) {
    var domain;
    if (url.indexOf('://') > -1) {
        domain = url.split('/')[2];
    } else {
        domain = url.split('/')[0];
    }
    return domain.replace(':', '');
};

rakutenAutomate['isInternalLink'] = function (url, currentUrl) {
    return rakutenAutomate['extractDomain'](currentUrl) === rakutenAutomate['extractDomain'](url);
};

rakutenAutomate['generateUUID'] = function () {
    var uuid = rakutenAutomate['uuidv4']();
    return typeof rakutenAutomate['links'][uuid] === 'undefined' ? uuid : rakutenAutomate['generateUUID']();
};

rakutenAutomate['uuidv4'] = function () {
    var d = new Date().getTime();
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = (d + Math.random() * 16) % 16 | 0;
        d = Math.floor(d / 16);
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
};

rakutenAutomate['walkUp'] = function (element) {
    var anchors;
    if (typeof element === 'undefined') {
        anchors = document.getElementsByTagName('a');
    } else if (element.getElementsByTagName) {
        anchors = element.getElementsByTagName('a');
    } else {
        anchors = [];
    }

    for (var i = 0, len = anchors.length; i < len; i++) {
        var anchor = anchors[i];
        if (!anchor.hasAttribute('data-uuid')) {
            var uuid = rakutenAutomate['generateUUID']();
            rakutenAutomate['links'][uuid] = anchor.href;
            anchor.setAttribute('data-uuid', uuid);
        }
    }
};

rakutenAutomate['getCleanDomain'] = function (url) {
    var cleanDomain = false;
    if (url.indexOf('data:') > -1) {
        return null;
    }

    while (!cleanDomain) {
        if (rakutenAutomate['events'][rakutenAutomate['Sha1']['hash'](url)]) {
            cleanDomain = true;
        } else {
            var parts = url.split('.');
            if (parts.length === 1) {
                return null;
            }
            url = parts.join('.');
        }
    }
    return url;
};

rakutenAutomate['sendEventLog'] = function () {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', rakutenAutomate['env']['snippetURL'] + '/event' + rakutenAutomate['widgetKey'], true);
    xhr.send(null);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                rakutenAutomate['parseEventLog'](xhr.responseText);
            } else {
                console.log('Error: Failed to send event log.');
            }
        }
    };
};

rakutenAutomate['parseEventLog'] = function (response) {
    rakutenAutomate['events'] = JSON.parse(response);
    if (rakutenAutomate['storageEnabled']) {
        localStorage.setItem(rakutenAutomate['storageKey'], JSON.stringify(rakutenAutomate['events']));
    }
};

rakutenAutomate['findAnchor'] = function (element) {
    if (element === null || typeof element === 'undefined') {
        return null;
    }
    if (element.nodeType === 'NODE') {
        return element;
    }
    return rakutenAutomate['findAnchor'](element.parentElement);
};

rakutenAutomate['initializeStorage'] = function () {
    try {
        localStorage.setItem('test', 'test');
        localStorage.removeItem('test');
        rakutenAutomate['storageEnabled'] = true;
        console.log('Local storage available.');
    } catch (e) {
        rakutenAutomate['storageEnabled'] = false;
        console.log('Local storage not available.');
    }

    if (rakutenAutomate['storageEnabled']) {
        var now = new Date();
        rakutenAutomate['storageKey'] = 'automate-affiliate-domain-info-' + now.getFullYear() + '-' + (now.getMonth() + 1) + '-' + now.getDate() + 'T' + now.getHours();
        rakutenAutomate['events'] = JSON.parse(localStorage.getItem(rakutenAutomate['storageKey'])) || {};
        console.log('Local storage key set.');

        for (var key in localStorage) {
            if (key !== rakutenAutomate['storageKey'] && key.indexOf('automate-affiliate-domain-info-') > -1) {
                localStorage.removeItem(key);
            }
        }
    } else {
        rakutenAutomate['events'] = {};
    }
};

rakutenAutomate['processResponse'] = function (url, domain, currentUrl, element) {
    var cleanDomain = rakutenAutomate['getCleanDomain'](domain);
    var clickData = {
        origin: currentUrl,
        link: url,
        u1: rakutenAutomate['u1'],
        widget_key: rakutenAutomate['widgetKey']
    };

    console.log('Sending click to ' + url + ' with clean domain ' + cleanDomain);

    if (cleanDomain !== null) {
        var event = rakutenAutomate['events'][rakutenAutomate['Sha1']['hash'](cleanDomain)];
        clickData['domain'] = cleanDomain;

        if (event && event['events'] && event['events'].length > 0) {
            var firstEvent = event['events'][0];
            clickData['code'] = 0;
            clickData['event'] = firstEvent;
            console.log('Event found in storage.');

            var protocol = 'http://';
            if (event['protocol']) {
                protocol = ['https:', event['protocol'], ':'].join('');
            }

            var clickUrl = protocol + rakutenAutomate['events']['trackingDomain'] + '/click?mid=' + firstEvent + '&murl=' + encodeURIComponent(url);
            if (rakutenAutomate['u1'] === '') {
                clickUrl += '&m=';
            } else if (rakutenAutomate['u1']) {
                clickUrl += '&u1=' + encodeURIComponent(rakutenAutomate['u1']);
            }

            element.href = clickUrl;

            setTimeout(function () {
                element.href = url;
            }, 100);
        } else {
            clickData['code'] = 1;
            console.log('Event not found in storage.');
        }
    } else {
        clickData['code'] = 2;
        clickData['domain'] = domain;
        console.log('Clean domain not found.');
    }
    return clickData;
};

rakutenAutomate['initialize'] = function (initCallback) {
    rakutenAutomate['sendPing']();
    rakutenAutomate['initializeStorage']();

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const observerCallback = function(mutationsList, observer) {
        for (let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                rakutenAutomate['walkUp']();
            }
        }
    };

    const observer = new MutationObserver(observerCallback);
    observer.observe(targetNode, config);

    console.log('Initialization complete.');
    rakutenAutomate['walkUp']();
    rakutenAutomate['sendEventLog']();
    rakutenAutomate['initialized'] = true;
    rakutenAutomate['ready'] = true;

    initCallback('containerAnchorElement', function (event) {
        var containerAnchorElement = rakutenAutomate['findAnchor'](event.currentTarget);
        if (containerAnchorElement !== null) {
            var element = containerAnchorElement;
            var link = rakutenAutomate['links'][element.getAttribute('data-uuid')];
            var currentUrl = window.location.href;

            if (rakutenAutomate['isInternalLink'](link, currentUrl)) {
                return;
            }

            var domain = rakutenAutomate['extractDomain'](link);
            var response = rakutenAutomate['processResponse'](link, domain, currentUrl, element);
            rakutenAutomate['sendClick'](response);
        }
    }, true);

    for (var i = 0; i < rakutenAutomate['events'].length; i++) {
        var event = rakutenAutomate['events'][i];
        initCallback(event['type'], event['target'], event['handler']);
    }
};

try {
    module.exports = rakutenAutomate;
} catch (e) {}
