//              speed reader app logic



$(function(){
    
    //declare variables
    //   array to store the text as words.
    var myarray;
    //variable to store the text array legnth.
    var inputlength;
    // boolean variable. initially false. 
    var reading = false;
    //a counter
    
    var counter;
    
    //variable to store the output of the setinterval function
    var action;
    
    //the frequency variable....
    var freq = 200;
    
    //percentage of progress
    
    var percentagevalue;
    
    //upon starting the app, some elements will be hidden...
    
       $("#sliders").hide();
       $("#result").hide();
       $("#error").hide();
       $("#new").hide();
       $("#pause").hide();
       $("#resume").hide();
    
    //clicking the Satrt Reading button.. 
    
    $("#start").click(function(){
    
     //     \s matches spaces, tabs , new lines and + means one or more.
    
         myarray = $("#userinput").val().split(/\s+/);
        
        
         inputlength =  myarray.length; // number of words
        
        
        
        //checking if the text area is empty or the number of words is too small 
       if(inputlength > 1){
           
           //reading mode is true
           reading = true;
           
           //show the controls(sliders, and buttons ) and reading box.
           $("#start").hide();
           $("#userinput").hide();
           $("#error").hide();
           $("#sliders").show();
           $("#result").show();
           $("#new").show();
           $("#pause").show();
           
           //set the progress slider max
           
           $("#progressslider").attr("max" , inputlength - 1);
           
           //start the counter at zero.
           
           counter = 0;
           
           //putting the first word in the result box
           
           $("#result").text(myarray[counter]);
           
           //starting reading from the first word
           
           action = setInterval(read,freq);
           
           
           
           
           
           
       }
        
//        array is empty
        else{
            
            $("#error").show();
            
            
            
            
        }
        
     
        //clicking on new button 
        
        
        $("#new").click(function(){
            
            //reload the page
            
            location.reload();
            
            
            
        });
        
        
        //clicking on the pause button 
        
        $("#pause").click(function(){
            
            //stop reading the switch to non-reading mode
            
            clearInterval(action);
            reading = false;
            
            
            //hide pause and show resume 
            
            $("#pause").hide();
            $("#resume").show();
            
            
            
            
            
        });
        
        
//        clicking on the rusume button
        
        $("#resume").click(function(){
            
            //start reading again
        
            action = setInterval(read,freq);
            reading = true;
            
            //hide resume and show pause
            
            
            $("#resume").hide();
            $("#pause").show();
            
            
        });
        
        
        
        //change fontsize....
        
        $("#fontsizeslider").on("slidestop", function(event,ui){
            
            
            //refresh the slider...
            $("#fontsizeslider").slider("refresh");
            
            //get the value of the slider
            //the val() method returns a string . we use the parseInt function to change the string to integer..
            var slidervalue = parseInt($("#fontsizeslider").val());
            
            //changing the font size in the result box.....
            
            $("#result").css("fontSize" , slidervalue);
            
            //changing the text of the slider span element
            
            $("#fontsize").text(slidervalue);
            
            
            
            
            
            
            
        });
        
        
        ///changing the speed using the slider 
        
        
        
        $("#speedslider").on("slidestop",function(event,ui){
            
//            refresh the slider
            $("#speedslider").slider('refresh');
            
            //get the value of the slider
            //the val() method returns a string . we use the parseInt function to change the string to integer..
            var slidervalue = parseInt($("#speedslider").val());
            
            
            
            //changing the text of the slider span element
            
            $("#speed").text(slidervalue);
            
            //stop reading
            clearInterval(action);
            
            //change the frequency
            
            freq = 60000/slidervalue;
            
            
            //resume reading if we are in reading mode
            
            if(reading){
                
                action =setInterval(read,freq);
                
            }
            
            
            
            
            
            
            
        });
        
        
    //progress slider ......
        
        
          
        $("#progressslider").on("slidestop",function(event,ui){
            
//            refresh the slider
            $("#progressslider").slider('refresh');
            
            //get the value of the slider
            //the val() method returns a string . we use the parseInt function to change the string to integer..
            var slidervalue = parseInt($("#progressslider").val());
               
            //stop reading
            clearInterval(action);
            
            //change the counter 
            
            
            counter = slidervalue;
            
            //change the word
            
            $("#result").text(myarray[counter])
            
            
            
            //changing the span element
            
            
            $("#percentage").text(Math.floor(counter/(inputlength-1)));
            
        
            
            
            
            
            
            //resume reading if we are in reading mode
            
            if(reading){
                
                action =setInterval(read,freq);
                
            }
            
            
            
            
            
            
            
        });
        
        
        
        
        
        
        
        
        
        
        
        
        //function declarations......
        
        function read(){
            
            if(counter == inputlength -1){//this is last word
               
               //stop reading
                
                clearInterval(action);
               
               //reading mode is false
                
                reading = false;
                
                //hiding the pause button
                
                $("#pause").hide();
                
                
                
               }
            else { // not last word
                
                //changing the counter to change the word
                counter++;
               
                //showing the next word 
                $("#result").text(myarray[counter]);
                
                //changing the progress slider value..
                
                $("#progressslider").val(counter).slider('refresh');
                
//               $("#progressslider").slider('refresh');
                
                
                //change text of percentage..
                
                percentagevalue = Math.floor((counter/(inputlength-1))*100);
                
                $("#percentage").text(percentagevalue);
                
                
                
                
                
                
            }
            
            
            
            
            
        }
        
        
        
        
        
        
        
        
    });
    
    
    
    
    
    
    
    
    
    
});
