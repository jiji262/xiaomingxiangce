
window.dpm ?= {}

class window.dpm.IUpload
  
  constructor:(params) ->
    
    #default params if they are not all passed in...
    @params = 
      container:  "#uploadContainer"
      iframe_src:  "iupload/iframe.html"
      action:     "upload.php"
      label:      "Upload a File"
      file_name:  "iuploadFile"
      extra_html: ""
    
    for key of params
      @params[key] = params[key]
    
    @container = $( @params.container )
    @build()
    return
      
  build:->
    
    @frame_id = "iupload_#{Math.floor(Math.random()*1100000)}"
    @iframe = $("<iframe id=\"#{@frame_id}\" name=\"#{@frame_id}\" frameborder=\"no\" src=\"#{@params.iframe_src}\" width=\"#{@container.width()}\" height=\"#{@container.height()}\" scrolling=\"no\"></iframe>")
    @container.children().remove()
    @container.append( @iframe )
    
    @iframe.bind "load", =>
      @hijackForm()
      
    return
  
  hijackForm:->

    @iframe.unbind( "load" ).bind "load", =>
      @uploadResponse()
    #     
    @status = @iframe.contents().find("#status")
    
    @upload_form = @iframe.contents().find("form").first()
    
    if @params.action != null
      @upload_form.attr('action',@params.action)

    @upload_form.prepend(@params.extra_html)
    
    
    @file_field = @upload_form.find("input[type=file]") 

    if @params.file_name != null
      @file_field.attr('name',@params.file_name)
    
    @btn = @upload_form.find("input[type=button]")
    @btn.val(@params.label)
    
    @btn.click =>
      @file_field.click()
      return false
    
    @file_field.change =>
      @uploadStart(@file_field.val())
      @upload_form.hide().submit()
      return false
      
    return
  
  destroy:->
    @iframe.remove()
    return
  
  uploadResponse:->
    if typeof window[@frame_id].response == "undefined"
      console.error('you must respond with a window.response object!!')
      
    response = window[@frame_id].response
    @build()
    @uploadComplete(response)
    return
  
  uploadStart:(filename)->
    
    
  uploadComplete:(serverResponse)->
    
    
    
