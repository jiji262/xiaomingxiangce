(function() {
  var _ref;
  var __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; };
    if ((_ref = window.dpm) != null) {
    _ref;
  } else {
    window.dpm = {};
  };
  window.dpm.IUpload = (function() {
    function IUpload(params) {
      var key;
      this.params = {
        container: "#uploadContainer",
        iframe_src: "iupload/iframe.html",
        action: "upload.php",
        label: "Upload a File",
        file_name: "iuploadFile",
        extra_html: ""
      };
      for (key in params) {
        this.params[key] = params[key];
      }
      this.container = $(this.params.container);
      this.build();
      return;
    }
    IUpload.prototype.build = function() {
      this.frame_id = "iupload_" + (Math.floor(Math.random() * 1100000));
      this.iframe = $("<iframe id=\"" + this.frame_id + "\" name=\"" + this.frame_id + "\" frameborder=\"no\" src=\"" + this.params.iframe_src + "\" width=\"" + (this.container.width()) + "\" height=\"" + (this.container.height()) + "\" scrolling=\"no\"></iframe>");
      this.container.children().remove();
      this.container.append(this.iframe);
      this.iframe.bind("load", __bind(function() {
        return this.hijackForm();
      }, this));
    };
    IUpload.prototype.hijackForm = function() {
      this.iframe.unbind("load").bind("load", __bind(function() {
        return this.uploadResponse();
      }, this));
      this.status = this.iframe.contents().find("#status");
      this.upload_form = this.iframe.contents().find("form").first();
      if (this.params.action !== null) {
        this.upload_form.attr('action', this.params.action);
      }
      this.upload_form.prepend(this.params.extra_html);
      this.file_field = this.upload_form.find("input[type=file]");
      if (this.params.file_name !== null) {
        this.file_field.attr('name', this.params.file_name);
      }
      this.btn = this.upload_form.find("input[type=button]");
      this.btn.val(this.params.label);
      this.btn.click(__bind(function() {
        this.file_field.click();
        return false;
      }, this));
      this.file_field.change(__bind(function() {
        this.uploadStart(this.file_field.val());
        this.upload_form.hide().submit();
        return false;
      }, this));
    };
    IUpload.prototype.destroy = function() {
      this.iframe.remove();
    };
    IUpload.prototype.uploadResponse = function() {
      var response;
      if (typeof window[this.frame_id].response === "undefined") {
        console.error('you must respond with a window.response object!!');
      }
      response = window[this.frame_id].response;
      this.build();
      this.uploadComplete(response);
    };
    IUpload.prototype.uploadStart = function(filename) {};
    IUpload.prototype.uploadComplete = function(serverResponse) {};
    return IUpload;
  })();
}).call(this);
