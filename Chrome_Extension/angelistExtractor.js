var AngelistExtractor={};


AngelistExtractor.angellist_details=function(name){

    var result;
    var review={};
    name="Ben Lang";
    var url = "https://api.angel.co/1/search?query=" + name + "&callback=parse&client_id=ID%20f1b889bdfdef6736ee350f6047773c54947a7f7d0adb60fc&access_token=07b6d69f0a41aec4d513a2232e28d86ad80ddfdf68b53298";
    var xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    //search for user by name
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {
            // WARNING! Might be evaluating an evil script!
            //var resp = eval("(" + xhr.responseText + ")");
            result =JSON.parse(JSON.stringify(eval(xhr.responseText.substring(5))));
            if(result[0]["name"]==name){
                var angelist_id=result[0]["id"];
                // now we got angelist id so we will do another request with Users model.
                url="https://api.angel.co/1/users/"+angelist_id+"?callback=parse&client_id=ID%20f1b889bdfdef6736ee350f6047773c54947a7f7d0adb60fc&access_token=07b6d69f0a41aec4d513a2232e28d86ad80ddfdf68b53298";
                xhr.open("GET", url, true);
                // get user profile by angellist_id
                xhr.onreadystatechange = function () {
                    if (xhr.readyState == 4) {

                        //parse result and store in review object
                        result=JSON.parse(JSON.stringify(eval(xhr.responseText.substring(5))));
                        if(Object.keys( result).indexOf("bio") ){
                            review["Bio"]="";
                            if (result["bio"]!=null) {
                                review["Bio"] = result["bio"];
                            }
                        }

                        if(Object.keys( result).indexOf("what_ive_built") ){
                            review["What_ive_built"]="";
                            if (result["what_ive_built"]!=null) {
                                review["What_ive_built"] = result["what_ive_built"];
                            }
                        }
                        if(Object.keys( result).indexOf("what_i_do") ){
                            review["What_i_do"]="";
                            if (result["what_i_do"]!=null) {
                                review["What_i_do"] = result["what_i_do"];
                            }
                        }
                        if(Object.keys( result).indexOf("resume_url") ){
                            review["Resume_url"]="";
                            if (result["resume_url"]!=null) {
                                review["Resume_url"] =  "<a  target='_blank' href='"+result["resume_url"]+"'>"+result["resume_url"]+"</a>";
                            }
                        }
                        if(Object.keys( result).indexOf("locations") ){
                            review["Locations"]="";
                            if (result["locations"]!=null) {
                                for (ele in result["locations"]){
                                    review["Locations"]+=result["locations"][ele]["display_name"]+". "
                                }

                            }
                        }
                        if(Object.keys( result).indexOf("roles") ){
                            review["Roles"]="";
                            if (result["roles"]!=null) {
                                for (ele in result["roles"] ){
                                    review["Roles"] +=result["roles"][ele]["display_name"]+". ";
                                }
                                //review["Roles"] = JSON.stringify(result["roles"]);
                            }
                        }
                        if(Object.keys( result).indexOf("skills") ){
                            if (result["skills"]!=null) {
                                review["Skills"]="";
                                for (ele in result["skills"] ){
                                    review["Skills"] +=result["skills"][ele]["display_name"]+". ";
                                }
                            }
                        }
                        if(Object.keys( result).indexOf("investor") ){
                            review["Investor"]="";
                            if (result["investor"]!=null) {
                                review["Investor"] = result["investor"];
                            }
                        }
                        if(Object.keys( result).indexOf("angellist_url")  ){
                            review["Angellist_url"]="";
                            if (result["angellist_url"]!=null) {
                                review["Angellist_url"] = "<a  target='_blank' href='"+result["angellist_url"]+"'>"+result["angellist_url"]+"</a>";
                            }
                        }
                        if(Object.keys( result).indexOf("facebook_url") ){
                            review["Facebook_url"]="";
                            if (result["facebook_url"]!=null) {
                                review["Facebook_url"] = "<a  target='_blank' href='"+result["facebook_url"]+"'>"+result["facebook_url"]+"</a>";
                            }
                        }
                        if(Object.keys( result).indexOf("linkedin_url") ){
                            review["Linkedin_url"]="";
                            if (result["linkedin_url"]!=null) {
                                review["Linkedin_url"] = "<a  target='_blank' href='"+result["linkedin_url"]+"'>"+result["linkedin_url"]+"</a>";
                            }
                        }
                        if(Object.keys( result).indexOf("github_url") ){
                            review["Github_url"]="";
                            if (result["github_url"]!=null) {
                                review["Github_url"] =  "<a  target='_blank' href='"+result["github_url"]+"'>"+result["github_url"]+"</a>";
                            }
                        }


                        var review_html="<ul>";
                        for (ele in review){
                            if(review[ele]!="") {
                                review_html += "<li>" + ele + ': ' + review[ele] + "</li>________________________________________________"
                            }
                        }
                        review_html+="</ul>";
                        $( ".menu_item_twitter_insights_content" ).append(review_html );


                    }
                };
                xhr.send();
            }

        }
    };
    xhr.send();
};
