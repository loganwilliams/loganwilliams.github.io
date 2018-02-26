$ ->
  files1 = for num in range(0,39,1)
    "img/f_#{num}.jpg"
  refocus1 = refocus(files1, "#container1")
  #files2 = for num in range(20,446,5)
  #  "img/focus#{pad(num, 4)}.jpg"
  #refocus2 = refocus(files2, "#container2")

  progressMonitor = setInterval (->
    num_loaded = refocus1.numImgLoaded() #+ refocus2.numImgLoaded()
    num_total  = refocus1.numImgTotal()  #+ refocus2.numImgTotal()
    $("#progress").val(num_loaded / num_total * 100)
    if num_loaded == num_total
      $("#go").click ->
        $("#info-mode").css("z-index", "0")
      $("#go").removeAttr('disabled')
    ), 100

  $('#selector input').change ->
    if $(this).val() == 'Peripheral'
      $('#container1').css('z-index', 2)
    else
      $('#container1').css('z-index', 0)

  $("#info-link").click ->
    $("#info-mode").css("z-index", "2")
