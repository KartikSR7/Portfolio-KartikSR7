if (s.forceSync) {
    doSubmit();
}
else {
    setTimeout(doSubmit, 10); // this lets dom updates render
}

let data, doc, domCheckCount = 50, callbackProcessed;

function cb(e) {
    if (xhr.aborted || callbackProcessed) {
        return;
    }
    
    doc = getDoc(io);
    if(!doc) {
        log('cannot access response document');
        e = SERVER_ABORT;
    }
    if (io.detachEvent)
        io.detachEvent('onload', cb);
    else
        io.removeEventListener('load', cb, false);

    let status = 'success', errMsg;
    try {
        if (timedOut) {
            throw 'timeout';
        }

        let isXml = s.dataType == 'xml' || doc.XMLDocument || $.isXMLDoc(doc);
        log('isXml='+isXml);
        if (!isXml && window.opera && (doc.body === null || !doc.body.innerHTML)) {
            if (--domCheckCount) {
                // in some browsers (Opera) the iframe DOM is not always traversable when
                // the onload callback fires, so we loop a bit to accommodate
                log('requeing onLoad callback, DOM not available');
                setTimeout(cb, 250);
                return;
            }
            // let this fall through because server response could be an empty document
            //log('Could not access iframe DOM after mutiple tries.');
            //throw 'DOMException: not available';
        }

        //log('response detected');
        let docRoot = doc.body ? doc.body : doc.documentElement;
        xhr.responseText = docRoot ? docRoot.innerHTML : null;
        xhr.responseXML = doc.XMLDocument ? doc.XMLDocument : doc;
        if (isXml)
            s.dataType = 'xml';
        xhr.getResponseHeader = function(header){
            let headers = {'content-type': s.dataType};
            return headers[header];
        };
        // support for XHR 'status' & 'statusText' emulation :
        if (docRoot) {
            xhr.status = Number( docRoot.getAttribute('status') ) || xhr.status;
            xhr.statusText = docRoot.getAttribute('statusText') || xhr.statusText;
        }

        let dt = (s.dataType || '').toLowerCase();
        let scr = /(json|script|text)/.test(dt);
        if (scr || s.textarea) {
            // see if user embedded response in textarea
            let ta = doc.getElementsByTagName('textarea')[0];
            if (ta) {
                xhr.responseText = ta.value;
                // support for XHR 'status' & 'statusText' emulation :
                xhr.status = Number( ta.getAttribute('status') ) || xhr.status;
                xhr.statusText = ta.getAttribute('statusText') || xhr.statusText;
            }
            else if (scr) {
                // account for browsers injecting pre around json response
                let pre = doc.getElementsByTagName('pre')[0];
                let b = doc.getElementsByTagName('body')[0];
                if (pre) {
                    xhr.responseText = pre.textContent ? pre.textContent : pre.innerText;
                }
                else if (b){
                    xhr.responseText = b.textContent ? b.textContent : b.innerText;
                }
            }
        }
        else if (dt == 'xml' && !xhr.responseXML && xhr.responseText) {
            xhr.responseXML = toXml(xhr.responseText);
        }

        try {
            data = httpData(xhr, dt, s);
        }
        catch (err) {
            status = 'parsererror';
            xhr.error = errMsg = (err || status);
        }
    }
    catch (err) {
        log('error caught: ',err);
        status = 'error';
        xhr.error = errMsg = (err || status);
    }

    if (xhr.aborted) {
        log('upload aborted');
        status = null;
    }

    if (xhr.status) { // we've set xhr.status
        status = (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) ? 'success' : 'error';
    }

    // ordering of these callbacks/triggers is odd, but that's how $.ajax does it
    if (status === 'success') {
        if (s.success)
            s.success.call(s.context, data, 'success', xhr);
        deferred.resolve(xhr.responseText, 'success', xhr);
        if (g)
            $.event.trigger("ajaxSuccess", [xhr, s]);
    }
    else if (status) {
        if (errMsg === undefined)
            errMsg = xhr.statusText;
        if (s.error)
            s.error.call(s.context, xhr, status, errMsg);
        deferred.reject(xhr, 'error', errMsg);
        if (g)
            $.event.trigger("ajaxError", [xhr, s, errMsg]);
    }

    if (g)
        $.event.trigger("ajaxComplete", [xhr, s]);

    if (g && ! --$.active) {
        $.event.trigger("ajaxStop");
    }

    if (s.complete)
        s.complete.call(s.context, xhr, status);

    callbackProcessed = true;
    if (s.timeout)
        clearTimeout(timeoutHandle);

    // clean up
    setTimeout(function() {
        if (!s.iframeTarget)
            $io.remove();
        xhr.responseXML = null;
    }, 100);
}

let toXml = $.parseXML || function(s, doc) { // use parseXML if available (jQuery 1.5+)
    if (window.ActiveXObject) {
        doc = new ActiveXObject('Microsoft.XMLDOM');
        doc.async = 'false';
        doc.loadXML(s);
    }
    else {
        doc = (new DOMParser()).parseFromString(s, 'text/xml');
    }
    return (doc && doc.documentElement && doc.documentElement.nodeName != 'parsererror') ? doc : null;
};
let parseJSON = $.parseJSON || function(s) {
    /*jslint evil:true */
    return window['eval']('(' + s + ')');
};

let httpData = function( xhr, type, s ) { // mostly lifted from jq1.4.4

    let ct = xhr.getResponseHeader('content-type') || '',
        xml = type === 'xml' || !type && ct.indexOf('xml') >= 0,
        data = xml ? xhr.responseXML : xhr.responseText;

    if (xml && data.documentElement.nodeName === 'parsererror') {
        if ($.error)
            $.error('parsererror');
    }
    if (s &&s.dataFilter) {
        data = s.dataFilter(data, type);
    }
    if (typeof data === 'string') {
        if (type === 'json' || !type && ct.indexOf('json') >= 0) {
            data = parseJSON(data);
        } else if (type === "script" || !type && ct.indexOf("javascript") >= 0) {
            $.globalEval(data);
        }
    }
    return data;
};

return deferred;


/**
* ajaxForm() provides a mechanism for fully automating form submission.
*
* The advantages of using this method instead of ajaxSubmit() are:
*
* 1: This method will include coordinates for <input type="image" /> elements (if the element
*    is used to submit the form).
* 2: This method will include the submit element's name/value data (for the element that was
*    used to submit the form).
* 3: This method binds the submit() method to the form for you.
*
* The options argument for ajaxForm works exactly as it does for ajaxSubmit.  ajaxForm merely
* passes the options argument along after properly binding events for submit elements and
* the form itself.
*/
$.fn.ajaxForm = function(options) {
options = options || {};
options.delegation = options.delegation && $.isFunction($.fn.on);

// in jQuery 1.3+ we can fix mistakes with the ready state
if (!options.delegation && this.length === 0) {
let o = { s: this.selector, c: this.context };
if (!$.isReady && o.s) {
    log('DOM not ready, queuing ajaxForm');
    $(function() {
        $(o.s,o.c).ajaxForm(options);
    });
    return this;
}
// is your DOM ready?  http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
log('terminating; zero elements found by selector' + ($.isReady ? '' : ' (DOM not ready)'));
return this;
}

if ( options.delegation ) {
$(document)
    .off('submit.form-plugin', this.selector, doAjaxSubmit)
    .off('click.form-plugin', this.selector, captureSubmittingElement)
    .on('submit.form-plugin', this.selector, options, doAjaxSubmit)
    .on('click.form-plugin', this.selector, options, captureSubmittingElement);
return this;
}

return this.ajaxFormUnbind()
.bind('submit.form-plugin', options, doAjaxSubmit)
.bind('click.form-plugin', options, captureSubmittingElement);
};

// private event handlers
function doAjaxSubmit(e) {
/*jshint validthis:true */
let options = e.data;
if (!e.isDefaultPrevented()) { // if event has been canceled, don't proceed
e.preventDefault();
$(this).ajaxSubmit(options);
}
}

function captureSubmittingElement(e) {
/*jshint validthis:true */
let target = e.target;
let $el = $(target);
if (!($el.is("[type=submit],[type=image]"))) {
// is this a child element of the submit el?  (ex: a span within a button)
let t = $el.closest('[type=submit]');
if (t.length === 0) {
    return;
}
target = t[0];
}
let form = this;
form.clk = target;
if (target.type == 'image') {
if (e.offsetX !== undefined) {
    form.clk_x = e.offsetX;
    form.clk_y = e.offsetY;
} else if (typeof $.fn.offset == 'function') {
  let offset = $el.offset();
    form.clk_x = e.pageX - offset.left;
    form.clk_y = e.pageY - offset.top;
} else {
    form.clk_x = e.pageX - target.offsetLeft;
    form.clk_y = e.pageY - target.offsetTop;
}
}
// clear form vars
setTimeout(function() { form.clk = form.clk_x = form.clk_y = null; }, 100);
}


// ajaxFormUnbind unbinds the event handlers that were bound by ajaxForm
$.fn.ajaxFormUnbind = function() {
return this.unbind('submit.form-plugin click.form-plugin');
};

/**
* formToArray() gathers form element data into an array of objects that can
* be passed to any of the following ajax functions: $.get, $.post, or load.
* Each object in the array has both a 'name' and 'value' property.  An example of
* an array for a simple login form might be:
*
*  [ { name: 'username', value: 'jresig' }, { name: 'password', value: 'secret' } ]
*
* It is this array that is passed to pre-submit callback functions provided to the
* ajaxSubmit() and ajaxForm() methods.
*/
$.fn.formToArray = function(semantic, elements) {
let a = [];
if (this.length === 0) {
return a;
}

let form = this[0];
let els = semantic ? form.getElementsByTagName('*') : form.elements;
if (!els) {
return a;
}

let i,j,n,v,el,max,jmax;
for(i=0, max=els.length; i < max; i++) {
el = els[i];
n = el.name;
if (!n || el.disabled) {
    continue;
}

if (semantic && form.clk && el.type == "image") {
    // handle image inputs on the fly when semantic == true
    if(form.clk == el) {
        a.push({name: n, value: $(el).val(), type: el.type });
        a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
    }
    continue;
}

v = $.fieldValue(el, true);
if (v && v.constructor == Array) {
    if (elements)
        elements.push(el);
    for(j=0, jmax=v.length; j < jmax; j++) {
        a.push({name: n, value: v[j]});
    }
}
else if (feature.fileapi && el.type == 'file') {
    if (elements)
        elements.push(el);
    let files = el.files;
    if (files.length) {
        for (j=0; j < files.length; j++) {
            a.push({name: n, value: files[j], type: el.type});
        }
    }
    else {
        // #180
        a.push({ name: n, value: '', type: el.type });
    }
}
else if (v !== null && typeof v != 'undefined') {
    if (elements)
        elements.push(el);
    a.push({name: n, value: v, type: el.type, required: el.required});
}
}

if (!semantic && form.clk) {
// input type=='image' are not found in elements array! handle it here
let $input = $(form.clk), input = $input[0];
n = input.name;
if (n && !input.disabled && input.type == 'image') {
    a.push({name: n,value: $input.val()});
    a.push({name: n+'.x', value: form.clk_x}, {name: n+'.y', value: form.clk_y});
}
}
return a;
};

/**
* Serializes form data into a 'submittable' string. This method will return a string
* in the format: name1=value1&amp;name2=value2
*/
$.fn.formSerialize = function(semantic) {
//hand off to jQuery.param for proper encoding
return $.param(this.formToArray(semantic));
};

/**
* Serializes all field elements in the jQuery object into a query string.
* This method will return a string in the format: name1=value1&amp;name2=value2
*/
$.fn.fieldSerialize = function(successful) {
var a = [];
this.each(function() {
var n = this.name, t = this.type, tag = this.tagName.toLowerCase();
if (successful === undefined) {
    successful = true;
}

if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
    (t == 'checkbox' || t == 'radio') && !el.checked ||
    (t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
    tag == 'select' && el.selectedIndex == -1)) {
        return;
}

if (tag == 'select') {
    var index = el.selectedIndex;
    if (index < 0) {
        return;
    }
    var a = [], ops = el.options;
    var one = (t == 'select-one');
    var max = (one ? index+1 : ops.length);
    for(var i=(one ? index : 0); i < max; i++) {
        var op = ops[i];
        if (op.selected) {
            var v = op.value;
            if (!v) { // extra pain for IE...
                v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
            }
            if (one) {
                return v;
            }
            a.push(v);
        }
    }
    return a;
}
return $(this).val();
});
//hand off to jQuery.param for proper encoding
return $.param(a);
};

/**
* Returns the value(s) of the element in the matched set.  For example, consider the following form:
*
*  <form><fieldset>
*      <input name="A" type="text" />
*      <input name="A" type="text" />
*      <input name="B" type="checkbox" value="B1" />
*      <input name="B" type="checkbox" value="B2"/>
*      <input name="C" type="radio" value="C1" />
*      <input name="C" type="radio" value="C2" />
*  </fieldset></form>
*
*  var v = $('input[type=text]').fieldValue();
*  // if no values are entered into the text inputs
*  v == ['','']
*  // if values entered into the text inputs are 'foo' and 'bar'
*  v == ['foo','bar']
*
*  var v = $('input[type=checkbox]').fieldValue();
*  // if neither checkbox is checked
*  v === undefined
*  // if both checkboxes are checked
*  v == ['B1', 'B2']
*
*  var v = $('input[type=radio]').fieldValue();
*  // if neither radio is checked
*  v === undefined
*  // if first radio is checked
*  v == ['C1']
*
* The successful argument controls whether or not the field element mustbe 'successful'
* (per http://www.w3.org/TR/html4/interact/forms.html#successful-controls).
* The default value of the successful argument is true.  If this value is false the value(s)
* for each element is returned.
*
* Note: This method *always* returns an array.  If no valid value can be determined the
*    array will be empty, otherwise it will contain one or more values.
*/
$.fn.fieldValue = function(successful) {
for (var val=[], i=0, max=this.length; i < max; i++) {
var el = this[i];
var v = $.fieldValue(el, successful);
if (v === null || typeof v == 'undefined' || (v.constructor == Array && !v.length)) {
    continue;
}
if (v.constructor == Array)
    $.merge(val, v);
else
    val.push(v);
}
return val;
};

/**
* Returns the value of the field element.
*/
$.fieldValue = function(el, successful) {
let n = el.name, t = el.type, tag = el.tagName.toLowerCase();
if (successful === undefined) {
successful = true;
}

if (successful && (!n || el.disabled || t == 'reset' || t == 'button' ||
(t == 'checkbox' || t == 'radio') && !el.checked ||
(t == 'submit' || t == 'image') && el.form && el.form.clk != el ||
tag == 'select' && el.selectedIndex == -1)) {
    return null;
}

if (tag == 'select') {
let index = el.selectedIndex;
if (index < 0) {
    return null;
}
let a = [], ops = el.options;
let one = (t == 'select-one');
let max = (one ? index+1 : ops.length);
for(let i=(one ? index : 0); i < max; i++) {
    let op = ops[i];
    if (op.selected) {
        let v = op.value;
        if (!v) { // extra pain for IE...
            v = (op.attributes && op.attributes['value'] && !(op.attributes['value'].specified)) ? op.text : op.value;
        }
        if (one) {
            return v;
        }
        a.push(v);
    }
}
return a;
}
return $(el).val();
};

/**
* Clears the form data.  Takes the following actions on the form's input fields:
*  - input text fields will have their 'value' property set to the empty string
*  - select elements will have their 'selectedIndex' property set to -1
*  - checkbox and radio inputs will have their 'checked' property set to false
*  - inputs of type submit, button, reset, and hidden will *not* be effected
*  - button elements will *not* be effected
*/
$.fn.clearForm = function(includeHidden) {
return this.each(function() {
$('input,select,textarea', this).clearFields(includeHidden);
});
};

/**
* Clears the selected form elements.
*/
$.fn.clearFields = $.fn.clearInputs = function(includeHidden) {
let re = /^(?:color|date|datetime|email|month|number|password|range|search|tel|text|time|url|week)$/i; // 'hidden' is not in this list
return this.each(function() {
let t = this.type, tag = this.tagName.toLowerCase();
if (re.test(t) || tag == 'textarea') {
    this.value = '';
}
else if (t == 'checkbox' || t == 'radio') {
    this.checked = false;
}
else if (tag == 'select') {
  this.selectedIndex = -1;
}
else if (t == "file") {
if (/MSIE/.test(navigator.userAgent)) {
    $(this).replaceWith($(this).clone(true));
} else {
    $(this).val('');
}
}
else if (includeHidden) {
    // includeHidden can be the value true, or it can be a selector string
    // indicating a special test; for example:
    //  $('#myForm').clearForm('.special:hidden')
    // the above would clean hidden inputs that have the class of 'special'
    if ( (includeHidden === true && /hidden/.test(t)) ||
         (typeof includeHidden == 'string' && $(this).is(includeHidden)) )
        this.value = '';
}
});
};

/**
* Resets the form data.  Causes all form elements to be reset to their original value.
*/
$.fn.resetForm = function() {
return this.each(function() {
// guard against an input with the name of 'reset'
// note that IE reports the reset function as an 'object'
if (typeof this.reset == 'function' || (typeof this.reset == 'object' && !this.reset.nodeType)) {
    this.reset();
}
});
};

/**
* Enables or disables any matching elements.
*/
$.fn.enable = function(b) {
if (b === undefined) {
b = true;
}
return this.each(function() {
this.disabled = !b;
});
};

/**
* Checks/unchecks any matching checkboxes or radio buttons and
* selects/deselects and matching option elements.
*/
$.fn.selected = function(select) {
if (select === undefined) {
select = true;
}
return this.each(function() {
let t = this.type;
if (t == 'checkbox' || t == 'radio') {
    this.checked = select;
}
else if (this.tagName.toLowerCase() == 'option') {
    let $sel = $(this).parent('select');
    if (select && $sel[0] && $sel[0].type == 'select-one') {
        // deselect all other options
        $sel.find('option').selected(false);
    }
    this.selected = select;
}
});
};

// expose debug var
$.fn.ajaxSubmit.debug = false;

// helper fn for console logging
function log() {
if (!$.fn.ajaxSubmit.debug)
return;
let msg = '[jquery.form] ' + Array.prototype.join.call(arguments,'');
if (window.console && window.console.log) {
window.console.log(msg);
}
else if (window.opera && window.opera.postError) {
window.opera.postError(msg);
}
}