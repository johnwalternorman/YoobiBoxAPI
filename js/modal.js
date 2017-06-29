        $(document).ready(function()
            {
                //### Open Modal PopUp
                $("#myBtn").click(function()
                 {
                     $("#ModalPopUp").show();
                 });
                 //### Close Modal PopUp when Close button is clicked
                 $("#btnClose").click(function()
                 {
                     $("#ModalPopUp").hide();
                 });
                 //### Close Modal PopUp when anywhere but the PopUp is clicked.
                 $(window).click(function(e) {
                     if(e.target.id == "ModalPopUp")
                     {
                         $("#ModalPopUp").hide();
                     }
                });
			});

        